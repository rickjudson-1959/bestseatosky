import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

    // Email notification (stub — swap in Resend or similar later)
    try {
      console.log(`[Get Listed] New request from ${contact_name} <${email}> for "${business_name}"`);
      // TODO: Send email via Resend
      // await resend.emails.send({ from: '...', to: '...', subject: '...', html: '...' });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
