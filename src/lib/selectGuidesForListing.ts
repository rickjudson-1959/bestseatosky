export type GuideForListing = {
  slug: string;
  tag_id: string | null;
};

/**
 * Reverse-link "Featured in" guides to a listing.
 * Tagged guides (best-cafes-*, best-breweries-*) only attach when the listing
 * has that tag. Untagged town/category guides (best-restaurants-*) still match.
 * Tag matches are preferred, then untagged town guides. Cap at `limit`.
 */
export function selectGuidesForListing<T extends GuideForListing>(
  byTag: T[],
  byTown: T[],
  tagIds: string[],
  limit = 4,
): T[] {
  const tagIdSet = new Set(tagIds);
  const seen = new Set<string>();
  const results: T[] = [];

  for (const guide of [...byTag, ...byTown]) {
    if (guide.tag_id && !tagIdSet.has(guide.tag_id)) continue;
    if (seen.has(guide.slug)) continue;
    seen.add(guide.slug);
    results.push(guide);
    if (results.length >= limit) break;
  }
  return results;
}
