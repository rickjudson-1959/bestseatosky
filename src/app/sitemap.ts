import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bestseatosky.com';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/eat`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/stay`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/play`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/visit`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ];

  const { data: listings } = await supabase
    .from('listings')
    .select('slug, updated_at, category_id, categories(slug)')
    .eq('status', 'published');

  const listingPages: MetadataRoute.Sitemap = (listings || []).map((listing: Record<string, unknown>) => {
    const cat = Array.isArray(listing.categories) ? listing.categories[0] : listing.categories;
    const catSlug = (cat as { slug?: string })?.slug || 'eat';
    return {
      url: `${baseUrl}/${catSlug}/${listing.slug}`,
      lastModified: new Date(listing.updated_at as string),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  const { data: seoPages } = await supabase
    .from('seo_pages')
    .select('slug')
    .eq('status', 'published');

  const guidePages: MetadataRoute.Sitemap = (seoPages || []).map((page: Record<string, unknown>) => ({
    url: `${baseUrl}/guide/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...staticPages, ...listingPages, ...guidePages];
}
