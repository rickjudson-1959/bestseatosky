import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Resend reports API and network failures as { error } instead of throwing.
    // A failed send must not return success.
    try {
      const emailResult = await resend.emails.send({
        from: 'Best Sea to Sky <noreply@bestseatosky.com>',
        to: 'hello@bestseatosky.com',
        replyTo: email.trim(),
        subject: `Contact Form: ${subject.trim()}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${name.trim()}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;">${email.trim()}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Subject</td><td style="padding:6px 12px;">${subject.trim()}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Message</td><td style="padding:6px 12px;">${message.trim()}</td></tr>
          </table>
        `,
      });

      if (emailResult.error || !emailResult.data) {
        console.error('Email notification failed:', emailResult.error ?? emailResult);
        return NextResponse.json(
          { success: false, error: 'Failed to send message. Please try again.' },
          { status: 502 }
        );
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      return NextResponse.json(
        { success: false, error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
