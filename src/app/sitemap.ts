import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bestseatosky.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/eat`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/stay`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/play`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/visit`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ];

  // Dynamic listing pages
  const { data: listings } = await supabase
    .from('listings')
    .select('slug, updated_at, categories(slug)')
    .eq('status', 'published');

  const listingPages: MetadataRoute.Sitemap = (listings || []).map((listing) => ({
    url: `${baseUrl}/${(listing.categories as { slug: string })?.slug || 'eat'}/${listing.slug}`,
    lastModified: new Date(listing.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...listingPages];
}
