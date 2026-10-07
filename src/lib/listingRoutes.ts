const LISTING_CATEGORIES = new Set(['eat', 'stay', 'play', 'visit', 'shop', 'services']);

/** Town guides that use /category/slug but are site pages, not a business listing. */
const SITE_CATEGORY_PAGES = new Set([
  'eat/squamish',
  'eat/whistler',
  'eat/pemberton',
  'stay/squamish',
  'stay/whistler',
]);

/** True for a business listing detail URL, such as /play/black-diamond-bike-rentals-whistler. */
export function isListingDetailPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length !== 2) return false;
  const [category, slug] = parts;
  if (!LISTING_CATEGORIES.has(category)) return false;
  if (SITE_CATEGORY_PAGES.has(`${category}/${slug}`)) return false;
  return true;
}
