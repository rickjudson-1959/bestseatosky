/**
 * Listings Google shows as "Temporarily closed". They stay published and
 * listed, with a label. Verified on Google Oct 19, 2026; recheck by Nov 18, 2026.
 * Remove a slug here when the place reopens (or archive it if permanently closed).
 */
export const TEMPORARILY_CLOSED_SLUGS: ReadonlySet<string> = new Set([
  'creekbread-whistler',
  'blackbird-bakery-pemberton',
]);

export function isTemporarilyClosed(slug: string | null | undefined): boolean {
  return !!slug && TEMPORARILY_CLOSED_SLUGS.has(slug);
}
