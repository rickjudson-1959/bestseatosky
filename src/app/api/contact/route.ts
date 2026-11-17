import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

function resendFailureLog(error: unknown): { name: string; message: string } {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }
  if (error && typeof error === 'object') {
    const name = 'name' in error && typeof error.name === 'string' ? error.name : 'Error';
    const message =
      'message' in error && typeof error.message === 'string' ? error.message : 'Resend send failed';
    return { name, message };
  }
  return { name: 'Error', message: 'Resend send failed' };
}

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

    const id = crypto.randomUUID();
    let saved = false;

    try {
      const { error: insertError } = await supabase.from('contact_messages').insert({
        id,
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });

      if (insertError) {
        console.error('Contact message insert error:', insertError.code, insertError.message);
      } else {
        saved = true;
      }
    } catch (insertError) {
      console.error(
        'Contact message insert error:',
        insertError instanceof Error ? insertError.message : 'Contact message insert failed'
      );
    }

    // Resend reports API and network failures as { error } instead of throwing.
    // A failed send must not return success unless the message was saved.
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
        console.error('Email notification failed:', resendFailureLog(emailResult.error));
        if (saved) {
          return NextResponse.json({ success: true });
        }
        return NextResponse.json(
          { success: false, error: 'Failed to send message. Please try again.' },
          { status: 502 }
        );
      }
    } catch (emailError) {
      console.error('Email notification failed:', resendFailureLog(emailError));
      if (saved) {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json(
        { success: false, error: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }

    if (saved) {
      const { error: updateError } = await supabase
        .from('contact_messages')
        .update({ email_sent: true })
        .eq('id', id);

      if (updateError) {
        console.error('Contact message email_sent update error:', updateError.code, updateError.message);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
