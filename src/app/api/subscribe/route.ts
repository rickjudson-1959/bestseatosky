import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
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

    // Store subscriber in database
    const { error: dbError } = await supabase.from('subscribers').insert({
      email: trimmedEmail,
      source: source || 'website',
    });

    if (dbError) {
      // Duplicate email — still a success from the user's perspective
      if (dbError.code !== '23505') {
        console.error('Subscriber insert error:', dbError);
      }
      // Don't fail — still sync to Brevo (welcome is owned by Brevo list-join automation)
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
          <p><strong>Source:</strong> ${source || 'website'}</p>
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
