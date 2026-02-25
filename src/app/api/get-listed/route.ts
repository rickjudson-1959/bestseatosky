import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { business_name, contact_name, email, phone, website, category_id, town_id, message } =
      body;

    // Validate required fields
    if (!business_name?.trim() || !contact_name?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'Business name, contact name, and email are required.' },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const { error } = await supabase.from('listing_requests').insert({
      business_name: business_name.trim(),
      contact_name: contact_name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      website: website?.trim() || null,
      category_id: category_id || null,
      town_id: town_id || null,
      message: message?.trim() || null,
      status: 'new',
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to submit request. Please try again.' }, { status: 500 });
    }

    // Send email notification
    try {
      await resend.emails.send({
        from: 'Best Sea to Sky <noreply@bestseatosky.com>',
        to: 'rjudson@protonmail.com',
        subject: `New Listing Request: ${business_name.trim()}`,
        html: `
          <h2>New Listing Request</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:6px 12px;font-weight:bold;">Business</td><td style="padding:6px 12px;">${business_name.trim()}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Contact</td><td style="padding:6px 12px;">${contact_name.trim()}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;">${email.trim()}</td></tr>
            ${phone ? `<tr><td style="padding:6px 12px;font-weight:bold;">Phone</td><td style="padding:6px 12px;">${phone.trim()}</td></tr>` : ''}
            ${website ? `<tr><td style="padding:6px 12px;font-weight:bold;">Website</td><td style="padding:6px 12px;">${website.trim()}</td></tr>` : ''}
            ${message ? `<tr><td style="padding:6px 12px;font-weight:bold;">Message</td><td style="padding:6px 12px;">${message.trim()}</td></tr>` : ''}
          </table>
        `,
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
