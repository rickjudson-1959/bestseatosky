import { supabase, Category, Town, Tag, Listing, SeoPage, BlogPost, ListingRequest, ListingFeature } from './supabase';

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

  query = query
    .order('featured', { ascending: false })
    .order('google_rating', { ascending: false });

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

export async function submitListingRequest(
  request: Omit<ListingRequest, 'id' | 'status' | 'created_at' | 'updated_at'>
): Promise<ListingRequest> {
  const { data, error } = await supabase
    .from('listing_requests')
    .insert({ ...request, status: 'new' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getGuidesForListing(
  categoryId: string,
  townId: string,
  tagIds: string[],
): Promise<SeoPage[]> {
  const townQuery = supabase
    .from('seo_pages')
    .select('*')
    .eq('status', 'published')
    .eq('category_id', categoryId)
    .eq('town_id', townId)
    .limit(5);

  const tagQuery = tagIds.length > 0
    ? supabase
        .from('seo_pages')
        .select('*')
        .eq('status', 'published')
        .in('tag_id', tagIds)
        .limit(3)
    : null;

  const [{ data: byTown }, tagResult] = await Promise.all([
    townQuery,
    tagQuery ?? Promise.resolve({ data: null }),
  ]);
  const byTag = (tagResult.data || []) as SeoPage[];

  const seen = new Set<string>();
  const results: SeoPage[] = [];
  for (const guide of [...(byTown || []), ...byTag]) {
    if (!seen.has(guide.slug)) {
      seen.add(guide.slug);
      results.push(guide as SeoPage);
    }
    if (results.length >= 4) break;
  }
  return results;
}

export async function getListingFeatures(listingId: string): Promise<ListingFeature[]> {
  const { data, error } = await supabase
    .from('listing_features')
    .select('*')
    .eq('listing_id', listingId);
  if (error) return [];
  return data || [];
}

export async function getFeaturesAvailableInCategory(
  categorySlug: string,
): Promise<{ slug: string; name: string; count: number }[]> {
  const cat = await getCategoryBySlug(categorySlug);
  if (!cat) return [];

  const { data: listingIds } = await supabase
    .from('listings')
    .select('id')
    .eq('status', 'published')
    .eq('category_id', cat.id);
  if (!listingIds || listingIds.length === 0) return [];

  const { data, error } = await supabase
    .from('listing_features')
    .select('feature_slug, feature_name')
    .in('listing_id', listingIds.map((l) => l.id));
  if (error || !data) return [];

  const counts = new Map<string, { slug: string; name: string; count: number }>();
  for (const row of data as Pick<ListingFeature, 'feature_slug' | 'feature_name'>[]) {
    const existing = counts.get(row.feature_slug);
    if (existing) existing.count += 1;
    else counts.set(row.feature_slug, { slug: row.feature_slug, name: row.feature_name, count: 1 });
  }
  return Array.from(counts.values()).sort((a, b) => b.count - a.count);
}

export async function getListingsByFeature(
  categorySlug: string,
  featureSlug: string,
): Promise<Listing[]> {
  const cat = await getCategoryBySlug(categorySlug);
  if (!cat) return [];

  const { data: matches } = await supabase
    .from('listing_features')
    .select('listing_id')
    .eq('feature_slug', featureSlug);
  if (!matches || matches.length === 0) return [];

  const { data, error } = await supabase
    .from('listings')
    .select('*, categories(*), towns(*), listing_tags(tags(*))')
    .eq('status', 'published')
    .eq('category_id', cat.id)
    .in('id', matches.map((m) => m.listing_id))
    .order('featured', { ascending: false })
    .order('google_rating', { ascending: false });

  if (error) return [];
  return data || [];
}

export async function getAllCategoryFeaturePaths(): Promise<{ categorySlug: string; featureSlug: string }[]> {
  const { data: catData } = await supabase
    .from('categories')
    .select('id, slug');
  if (!catData) return [];

  const { data: listingData } = await supabase
    .from('listings')
    .select('id, category_id')
    .eq('status', 'published');
  if (!listingData) return [];

  const { data: featureData } = await supabase
    .from('listing_features')
    .select('listing_id, feature_slug');
  if (!featureData) return [];

  const catById = new Map(catData.map((c) => [c.id, c.slug]));
  const listingCat = new Map(listingData.map((l) => [l.id, l.category_id]));

  const pairs = new Set<string>();
  for (const row of featureData) {
    const catId = listingCat.get(row.listing_id);
    if (!catId) continue;
    const catSlug = catById.get(catId);
    if (!catSlug) continue;
    pairs.add(`${catSlug}|${row.feature_slug}`);
  }

  return Array.from(pairs).map((p) => {
    const [categorySlug, featureSlug] = p.split('|');
    return { categorySlug, featureSlug };
  });
}

async function getAllEatListings(): Promise<Listing[]> {
  const cat = await getCategoryBySlug('eat');
  if (!cat) return [];
  const { data, error } = await supabase
    .from('listings')
    .select('*, categories(*), towns(*), listing_tags(tags(*))')
    .eq('status', 'published')
    .eq('category_id', cat.id);
  if (error) return [];
  return data || [];
}

export async function getListingsForCuisine(cuisineSlug: string): Promise<Listing[]> {
  const { CUISINE_BY_SLUG, listingMatchesCuisine } = await import('./cuisines');
  const cuisine = CUISINE_BY_SLUG[cuisineSlug];
  if (!cuisine) return [];
  const eat = await getAllEatListings();
  return eat
    .filter((l) => listingMatchesCuisine(l, cuisine))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (b.google_rating || 0) - (a.google_rating || 0);
    });
}

export async function getCuisineCounts(): Promise<Record<string, number>> {
  const { CUISINES, listingMatchesCuisine } = await import('./cuisines');
  const eat = await getAllEatListings();
  const counts: Record<string, number> = {};
  for (const c of CUISINES) {
    counts[c.slug] = eat.filter((l) => listingMatchesCuisine(l, c)).length;
  }
  return counts;
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
