/** Dollar marks already used on listing cards and detail pages. */
const FILLED_DOLLAR_CLASS = 'text-slate-800 font-bold';
const MUTED_DOLLAR_CLASS = 'text-slate-300';

/** JSON-LD priceRange values already used for levels 1–4. */
const PRICE_RANGE_LABELS = {
  1: '$',
  2: '$$',
  3: '$$$',
  4: '$$$$',
} as const;

export type RealPriceLevel = keyof typeof PRICE_RANGE_LABELS;

/**
 * True when price_level is an integer from 1 to 4.
 * 0, null, and anything else are missing prices, not a free listing.
 */
export function hasRealPriceLevel(level: unknown): level is RealPriceLevel {
  return level === 1 || level === 2 || level === 3 || level === 4;
}

/** Schema.org priceRange for a real price level. Null hides the field. */
export function priceRangeLabel(level: unknown): (typeof PRICE_RANGE_LABELS)[RealPriceLevel] | null {
  if (!hasRealPriceLevel(level)) return null;
  return PRICE_RANGE_LABELS[level];
}

/**
 * Class for each of the four dollar marks shown today.
 * Null means render no price label.
 */
export function priceDollarMarks(level: unknown): string[] | null {
  if (!hasRealPriceLevel(level)) return null;
  return [0, 1, 2, 3].map((i) => (i < level ? FILLED_DOLLAR_CLASS : MUTED_DOLLAR_CLASS));
}

/**
 * Drop a top-level priceRange when this listing has no real price level.
 * Stored schema_json can carry priceRange even when price_level is 0 or null.
 */
export function withoutUnpricedPriceRange<T extends Record<string, unknown>>(
  schema: T,
  level: unknown,
): T {
  if (hasRealPriceLevel(level) || !Object.prototype.hasOwnProperty.call(schema, 'priceRange')) {
    return schema;
  }
  const next = { ...schema };
  delete next.priceRange;
  return next;
}
