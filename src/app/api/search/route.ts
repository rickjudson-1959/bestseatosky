import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      categories(*),
      towns(*),
      listing_tags(tags(*))
    `)
    .eq('status', 'published')
    .ilike('name', `%${q}%`)
    .order('google_rating', { ascending: false })
    .limit(12);

  if (error) {
    return NextResponse.json([], { status: 500 });
  }

  return NextResponse.json(data || []);
}
