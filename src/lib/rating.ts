/** Listing fields used to decide whether a Google star rating is real. */
export type RatingFields = {
  google_rating?: number | null;
  google_review_count?: number | null;
};

/**
 * True when a listing has a Google rating backed by at least one review.
 * A rating with a 0 or null review count is not shown.
 */
export function hasRealRating<T extends RatingFields>(
  listing: T | null | undefined,
): listing is T & { google_rating: number; google_review_count: number } {
  if (!listing) return false;
  const rating = listing.google_rating;
  const count = listing.google_review_count;
  return typeof rating === 'number' && rating > 0 && typeof count === 'number' && count >= 1;
}

/**
 * Drop a top-level aggregateRating when this listing has no real reviews.
 * Stored schema_json can carry a rating even when the review count is 0 or null.
 */
export function withoutUnratedAggregateRating<T extends Record<string, unknown>>(
  schema: T,
  listing: RatingFields | null | undefined,
): T {
  if (hasRealRating(listing) || !Object.prototype.hasOwnProperty.call(schema, 'aggregateRating')) {
    return schema;
  }
  const next = { ...schema };
  delete next.aggregateRating;
  return next;
}

function aggregateReviewCount(value: unknown): number | null {
  if (!value || typeof value !== 'object' || !('reviewCount' in value)) return null;
  const count = (value as { reviewCount?: unknown }).reviewCount;
  if (typeof count === 'number') return count;
  if (typeof count === 'string' && count.trim() !== '') {
    const parsed = Number(count);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

/**
 * Walk structured data and drop aggregateRating nodes whose reviewCount is 0 or null.
 * Covers stored schema_json that bypasses the per-listing builder.
 */
export function omitEmptyAggregateRatings<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => omitEmptyAggregateRatings(item)) as T;
  }
  if (!value || typeof value !== 'object') return value;
  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (key === 'aggregateRating') {
      const count = aggregateReviewCount(child);
      if (count == null || count < 1) continue;
    }
    next[key] = omitEmptyAggregateRatings(child);
  }
  return next as T;
}
