import { supabase, Category, Town, Tag, Listing } from './supabase';

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
