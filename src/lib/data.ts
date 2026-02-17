import { supabase, Category, Town, Tag, Listing, SeoPage, BlogPost } from './supabase';

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order');
  if (error) throw error;
  return data || [];
}

export async function getTowns(): Promise<Town[]> {
  const { data, error } = await supabase
    .from('towns')
    .select('*')
    .order('display_order');
  if (error) throw error;
  return data || [];
}

export async function getTagsByCategory(categoryId: string): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('category_id', categoryId)
    .order('name');
  if (error) throw error;
  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function getListings(options?: {
  categorySlug?: string;
  townSlug?: string;
  tagSlug?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Listing[]> {
  let query = supabase
    .from('listings')
    .select(`
      *,
      categories(*),
      towns(*),
      listing_tags(tags(*))
    `)
    .eq('status', 'published');

  if (options?.categorySlug) {
    const cat = await getCategoryBySlug(options.categorySlug);
    if (cat) query = query.eq('category_id', cat.id);
  }

  if (options?.townSlug) {
    const { data: town } = await supabase
      .from('towns')
      .select('id')
      .eq('slug', options.townSlug)
      .single();
    if (town) query = query.eq('town_id', town.id);
  }

  if (options?.featured) {
    query = query.eq('featured', true);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  query = query.order('google_rating', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const { data, error } = await supabase
    .from('listings')
    .select(`
      *,
      categories(*),
      towns(*),
      listing_tags(tags(*))
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (error) return null;
  return data;
}

export async function getListingCount(categorySlug?: string): Promise<number> {
  let query = supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'published');

  if (categorySlug) {
    const cat = await getCategoryBySlug(categorySlug);
    if (cat) query = query.eq('category_id', cat.id);
  }

  const { count, error } = await query;
  if (error) return 0;
  return count || 0;
}

export async function getAllSeoPages(): Promise<(SeoPage & { categories?: Category })[]> {
  const { data, error } = await supabase
    .from('seo_pages')
    .select('*, categories(*)')
    .eq('status', 'published')
    .order('title');
  if (error) return [];
  return data || [];
}

export async function getSeoPageBySlug(slug: string): Promise<SeoPage | null> {
  const { data, error } = await supabase
    .from('seo_pages')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (error) return null;
  return data;
}

export async function getRelatedListings(
  listingId: string,
  townId: string,
  categoryId: string,
  limit = 4
): Promise<Listing[]> {
  const { data, error } = await supabase
    .from('listings')
    .select('*, categories(*), towns(*), listing_tags(tags(*))')
    .eq('status', 'published')
    .eq('town_id', townId)
    .eq('category_id', categoryId)
    .neq('id', listingId)
    .order('google_rating', { ascending: false })
    .limit(limit);
  if (error) return [];
  return data || [];
}

export async function getCrossCategoryListings(
  listingId: string,
  townId: string,
  categoryId: string,
  limit = 3
): Promise<Listing[]> {
  const { data, error } = await supabase
    .from('listings')
    .select('*, categories(*), towns(*), listing_tags(tags(*))')
    .eq('status', 'published')
    .eq('town_id', townId)
    .neq('category_id', categoryId)
    .neq('id', listingId)
    .order('google_rating', { ascending: false })
    .limit(limit);
  if (error) return [];
  return data || [];
}

export async function getGuideListings(page: SeoPage): Promise<Listing[]> {
  if (page.tag_id) {
    // Filter through listing_tags junction table
    const { data: taggedListingIds } = await supabase
      .from('listing_tags')
      .select('listing_id')
      .eq('tag_id', page.tag_id);

    if (!taggedListingIds || taggedListingIds.length === 0) return [];

    let query = supabase
      .from('listings')
      .select('*, categories(*), towns(*), listing_tags(tags(*))')
      .eq('status', 'published')
      .in('id', taggedListingIds.map(t => t.listing_id));

    if (page.category_id) query = query.eq('category_id', page.category_id);
    if (page.town_id) query = query.eq('town_id', page.town_id);

    query = query
      .order('google_rating', { ascending: false })
      .order('google_review_count', { ascending: false })
      .limit(15);

    const { data, error } = await query;
    if (error) return [];
    return data || [];
  }

  // No tag filter — just category and/or town
  let query = supabase
    .from('listings')
    .select('*, categories(*), towns(*), listing_tags(tags(*))')
    .eq('status', 'published');

  if (page.category_id) query = query.eq('category_id', page.category_id);
  if (page.town_id) query = query.eq('town_id', page.town_id);

  query = query
    .order('google_rating', { ascending: false })
    .order('google_review_count', { ascending: false })
    .limit(15);

  const { data, error } = await query;
  if (error) return [];
  return data || [];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (error) return null;
  return data;
}
