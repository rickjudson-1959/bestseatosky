export type GuideForListing = {
  slug: string;
  tag_id: string | null;
  town_id: string | null;
  category_id: string | null;
};

/**
 * Reverse-link "Featured in" guides to a listing.
 * Tagged guides only attach when the listing has that tag AND the guide is
 * for the listing's town. If the guide has a category_id, it must match too.
 * Untagged town/category guides (best-restaurants-*) still match.
 * Tag matches are preferred, then untagged town guides. Cap at `limit`.
 */
export function selectGuidesForListing<T extends GuideForListing>(
  byTag: T[],
  byTown: T[],
  tagIds: string[],
  listingTownId: string,
  listingCategoryId: string,
  limit = 4,
): T[] {
  const tagIdSet = new Set(tagIds);
  const seen = new Set<string>();
  const results: T[] = [];

  for (const guide of [...byTag, ...byTown]) {
    if (guide.tag_id) {
      if (!tagIdSet.has(guide.tag_id)) continue;
      // Tagged guides must be the listing's town (Whistler cafés ≠ Squamish café).
      if (guide.town_id !== listingTownId) continue;
    }
    if (guide.category_id && guide.category_id !== listingCategoryId) continue;
    if (seen.has(guide.slug)) continue;
    seen.add(guide.slug);
    results.push(guide);
    if (results.length >= limit) break;
  }
  return results;
}
