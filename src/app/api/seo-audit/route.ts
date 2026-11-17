import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { business_name, contact_name, email, website, source } = body;

    if (!business_name?.trim() || !contact_name?.trim() || !email?.trim() || !website?.trim()) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Save to Supabase
    const { error: dbError } = await supabase.from('audit_requests').insert({
      business_name: business_name.trim(),
      contact_name: contact_name.trim(),
      email: email.trim().toLowerCase(),
      website_url: website.trim(),
    });

    if (dbError) {
      console.error('Audit request insert error:', dbError);
    }

    // Send email notification. The row is already saved, so a Resend
    // failure still returns success. Log name and message only.
    try {
      const { error: sendError } = await resend.emails.send({
        from: 'Best Sea to Sky <noreply@bestseatosky.com>',
        to: 'hello@bestseatosky.com',
        replyTo: email.trim(),
        subject: `SEO Audit Request: ${business_name.trim()}`,
        html: `
          <h2>New SEO Audit Request</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:6px 12px;font-weight:bold;">Business</td><td style="padding:6px 12px;">${business_name.trim()}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Contact</td><td style="padding:6px 12px;">${contact_name.trim()}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;">${email.trim()}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Website</td><td style="padding:6px 12px;"><a href="${website.trim()}">${website.trim()}</a></td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Source</td><td style="padding:6px 12px;">${source || 'seo-audit'}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Time</td><td style="padding:6px 12px;">${new Date().toISOString()}</td></tr>
          </table>
        `,
      });
      if (sendError) {
        console.error('Audit notification email failed:', {
          name: sendError.name,
          message: sendError.message,
        });
      }
    } catch (emailError) {
      console.error('Audit notification email failed:', {
        name: emailError instanceof Error ? emailError.name : 'Error',
        message: emailError instanceof Error ? emailError.message : 'Audit notification email failed',
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
