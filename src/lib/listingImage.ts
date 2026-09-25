const SITE_ORIGIN = 'https://bestseatosky.com';

/** Alt text for /images/towns/<file>, keyed by filename. */
const TOWN_FALLBACK_ALT: Record<string, string> = {
  'squamish.jpg': 'Scenic view of Squamish, BC',
  'whistler.jpg': 'Whistler Village, BC',
  'pemberton.jpg': 'Mount Currie near Pemberton, BC',
  'britannia-beach.jpg': 'Howe Sound view near Britannia Beach, BC',
  'sea-to-sky.jpg': 'Sea to Sky corridor, BC',
};

type ListingImageSource = {
  name: string;
  featured_image_url?: string | null;
};

function listingImagePath(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('https://www.bestseatosky.com/')) {
    return url.slice('https://www.bestseatosky.com'.length);
  }
  if (url.startsWith('https://bestseatosky.com/')) {
    return url.slice(SITE_ORIGIN.length);
  }
  return url;
}

export function isTownFallbackImage(url: string | null | undefined): boolean {
  return listingImagePath(url).startsWith('/images/towns/');
}

/**
 * Alt text for a listing image. Town fallback files describe the town.
 * Any other photo keeps the business name.
 * Pass imageUrl for a gallery frame that is not featured_image_url.
 */
export function getListingImageAlt(
  listing: ListingImageSource,
  imageUrl?: string | null,
): string {
  const path = listingImagePath(imageUrl ?? listing.featured_image_url);
  if (!path.startsWith('/images/towns/')) return listing.name;
  const filename = path.slice('/images/towns/'.length).split(/[?#]/)[0];
  return TOWN_FALLBACK_ALT[filename] ?? 'Sea to Sky corridor, BC';
}

/** schema.org Image values must be absolute. Relative site paths become https://bestseatosky.com URLs. */
export function absoluteSiteImageUrl(url: string): string {
  const path = listingImagePath(url);
  if (path.startsWith('/')) return `${SITE_ORIGIN}${path}`;
  return url;
}

function absoluteImageValue(image: unknown): unknown {
  if (typeof image === 'string') return absoluteSiteImageUrl(image);
  if (Array.isArray(image)) return image.map(absoluteImageValue);
  if (image && typeof image === 'object' && 'url' in image) {
    const record = image as { url?: unknown };
    if (typeof record.url === 'string') {
      return { ...record, url: absoluteSiteImageUrl(record.url) };
    }
  }
  return image;
}

export function withAbsoluteSchemaImage<T extends Record<string, unknown>>(schema: T): T {
  if (!('image' in schema)) return schema;
  return { ...schema, image: absoluteImageValue(schema.image) };
}
