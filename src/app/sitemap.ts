const listingPages: MetadataRoute.Sitemap = (listings || []).map((listing) => {
    const cat = Array.isArray(listing.categories) ? listing.categories[0] : listing.categories;
    return {
      url: `${baseUrl}/${(cat as unknown as { slug: string })?.slug || 'eat'}/${listing.slug}`,
      lastModified: new Date(listing.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });
```

Or even simpler — let me just give you the whole fixed file. Delete the old one and create it fresh:
```
cat > src/app/sitemap.ts << 'ENDOFFILE'
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

  return [...staticPages, ...listingPages];
}
ENDOFFILE
```
