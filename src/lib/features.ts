// Canonical list of features used across the site. Adding a feature here
// makes it appear in filter UIs and become a valid /[category]/with/[slug]
// route. Rows still need to be inserted into the listing_features table
// to actually attach a feature to a listing.

export type FeatureDef = {
  slug: string;
  name: string;
  icon: string;
};

export const FEATURES: FeatureDef[] = [
  { slug: 'kid-friendly', name: 'Kid friendly', icon: '👶' },
  { slug: 'dog-friendly', name: 'Dog friendly', icon: '🐕' },
  { slug: 'outdoor-seating', name: 'Outdoor seating', icon: '☀️' },
  { slug: 'wheelchair-accessible', name: 'Wheelchair accessible', icon: '♿' },
  { slug: 'free-parking', name: 'Free parking', icon: '🅿️' },
  { slug: 'wifi', name: 'Wi-Fi', icon: '📶' },
  { slug: 'takeout', name: 'Takeout', icon: '🥡' },
  { slug: 'delivery', name: 'Delivery', icon: '🛵' },
  { slug: 'reservations-required', name: 'Reservations required', icon: '📅' },
];

export const FEATURE_BY_SLUG: Record<string, FeatureDef> = Object.fromEntries(
  FEATURES.map((f) => [f.slug, f]),
);

export function getFeature(slug: string): FeatureDef | null {
  return FEATURE_BY_SLUG[slug] ?? null;
}
