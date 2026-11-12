import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  CONSENT_TEXT_V1,
  CONSENT_VERSION,
  consentIp,
  consentSourceUrl,
  consentUserAgent,
  isMissingConsentColumnError,
} from '@/lib/consent';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const sourceKey = typeof source === 'string' && source.trim() ? source.trim() : 'website';
    const sourceUrl = consentSourceUrl(body.source_url, request.headers.get('referer'));
    const ip = consentIp(request.headers.get('x-forwarded-for'), request.headers.get('x-real-ip'));
    const userAgent = consentUserAgent(request.headers.get('user-agent'));

    // Store subscriber in database. Consent columns may not exist until the migration is applied.
    const { error: dbError } = await supabase.from('subscribers').insert({
      email: trimmedEmail,
      source: sourceKey,
      consent_text: CONSENT_TEXT_V1,
      consent_version: CONSENT_VERSION,
      source_url: sourceUrl,
      ip,
      user_agent: userAgent,
      consent_at: new Date().toISOString(),
    });

    if (dbError && isMissingConsentColumnError(dbError)) {
      console.warn('Subscriber consent columns are missing. Retrying with email and source only.');
      const { error: fallbackError } = await supabase.from('subscribers').insert({
        email: trimmedEmail,
        source: sourceKey,
      });
      if (fallbackError && fallbackError.code !== '23505') {
        console.error('Subscriber insert error:', fallbackError.code ?? 'unknown');
      }
    } else if (dbError && dbError.code !== '23505') {
      // Duplicate email is still a success from the user's perspective.
      // Don't fail. Still sync to Brevo (welcome is owned by Brevo list-join automation).
      console.error('Subscriber insert error:', dbError.code ?? 'unknown');
    }

    // Add to Brevo contact list (always — handles both new and existing contacts)
    if (process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID) {
      try {
        const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email: trimmedEmail,
            listIds: [Number(process.env.BREVO_LIST_ID)],
            updateEnabled: true,
          }),
        });
        const brevoBody = await brevoRes.text();
        if (!brevoRes.ok) {
          console.error(`Brevo API error (${brevoRes.status}):`, brevoBody);
        } else {
          console.log(`Brevo sync OK for ${trimmedEmail}:`, brevoBody);
        }
      } catch (brevoError) {
        console.error('Brevo sync failed (network):', brevoError);
      }
    } else {
      console.warn('Brevo env vars missing — BREVO_API_KEY:', !!process.env.BREVO_API_KEY, 'BREVO_LIST_ID:', !!process.env.BREVO_LIST_ID);
    }

    // Notify you of new subscriber
    try {
      await resend.emails.send({
        from: 'Best Sea to Sky <noreply@bestseatosky.com>',
        to: 'hello@bestseatosky.com',
        subject: `New subscriber: ${trimmedEmail}`,
        html: `
          <h2>New Newsletter Subscriber</h2>
          <p><strong>Email:</strong> ${trimmedEmail}</p>
          <p><strong>Source:</strong> ${sourceKey}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      });
    } catch {
      // Non-critical
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
