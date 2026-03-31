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
      if (dbError.code === '23505') {
        return NextResponse.json({ success: true });
      }
      console.error('Subscriber insert error:', dbError);
      // Don't fail — still send the welcome email
    }

    // Send welcome email with lead magnet
    try {
      await resend.emails.send({
        from: 'Best Sea to Sky <noreply@bestseatosky.com>',
        to: trimmedEmail,
        subject: 'Your Sea to Sky Trip Planner is here',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
            <img src="https://bestseatosky.com/icon.svg" alt="Best Sea to Sky" style="width: 40px; height: 40px; margin-bottom: 24px;" />

            <h1 style="font-size: 24px; color: #0f172a; margin-bottom: 16px;">
              Your Sea to Sky Trip Planner
            </h1>

            <p style="font-size: 15px; color: #475569; line-height: 1.7; margin-bottom: 20px;">
              Thanks for subscribing! Here are the local picks to get you started:
            </p>

            <h2 style="font-size: 17px; color: #0f172a; margin-bottom: 8px;">Where to Eat</h2>
            <ul style="font-size: 14px; color: #475569; line-height: 1.8; padding-left: 20px; margin-bottom: 20px;">
              <li><strong>Squamish:</strong> Howe Sound Brewing, Locavore, Crabapple Caf&eacute;</li>
              <li><strong>Whistler:</strong> Handlebar, Rimrock Caf&eacute;, Purebread</li>
              <li><strong>Pemberton:</strong> Mile One, The Pony, Blackbird Bakery</li>
            </ul>

            <h2 style="font-size: 17px; color: #0f172a; margin-bottom: 8px;">Must-Do Trails</h2>
            <ul style="font-size: 14px; color: #475569; line-height: 1.8; padding-left: 20px; margin-bottom: 20px;">
              <li>Stawamus Chief (1st Peak) &mdash; 1.5 hrs, iconic granite summit</li>
              <li>Garibaldi Lake &mdash; 4-5 hrs, turquoise alpine lake</li>
              <li>Train Wreck Falls &mdash; 30 min, easy suspension bridge walk</li>
              <li>Joffre Lakes &mdash; 2-3 hrs, three glacial lakes (day pass needed)</li>
            </ul>

            <h2 style="font-size: 17px; color: #0f172a; margin-bottom: 8px;">Local Tips</h2>
            <ul style="font-size: 14px; color: #475569; line-height: 1.8; padding-left: 20px; margin-bottom: 24px;">
              <li>Gas up in Squamish &mdash; cheapest between Vancouver and Whistler</li>
              <li>Check BC Parks day passes before driving to Garibaldi or Joffre</li>
              <li>Weekday mornings are best for the Chief &mdash; empty before 8 AM</li>
              <li>Pemberton is 30 min past Whistler and half the crowds</li>
            </ul>

            <a href="https://bestseatosky.com/guide" style="display: inline-block; background: #047857; color: white; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: bold;">
              Explore All Guides &rarr;
            </a>

            <p style="font-size: 12px; color: #94a3b8; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
              You&rsquo;re receiving this because you signed up at bestseatosky.com.<br/>
              <a href="mailto:hello@bestseatosky.com?subject=Unsubscribe" style="color: #94a3b8;">Unsubscribe</a>
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
    }

    // Add to Brevo contact list
    if (process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID) {
      try {
        await fetch('https://api.brevo.com/v3/contacts', {
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
      } catch (brevoError) {
        console.error('Brevo sync failed:', brevoError);
      }
    }

    // Notify you of new subscriber
    try {
      await resend.emails.send({
        from: 'Best Sea to Sky <noreply@bestseatosky.com>',
        to: 'rjudson@protonmail.com',
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
