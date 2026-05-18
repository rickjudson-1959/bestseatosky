// Cuisine catalog for the Eat category. Matching is keyword-based against
// the listing name, short_description, description, and tag names because
// the listings table has no dedicated cuisine column and Google category
// data is not populated. Patterns are lowercase substrings; a listing
// matches a cuisine if any pattern appears in the combined haystack.

export type CuisineDef = {
  slug: string;
  name: string;
  icon: string;
  patterns: string[];
};

export const CUISINES: CuisineDef[] = [
  {
    slug: 'thai',
    name: 'Thai',
    icon: '🥡',
    patterns: ['thai ', ' thai', 'pad thai', 'tom yum', 'tom kha', 'thaï'],
  },
  {
    slug: 'japanese-sushi',
    name: 'Japanese & Sushi',
    icon: '🍣',
    patterns: [
      'japanese', 'ramen', 'izakaya', 'yakitori', 'tempura', 'donburi', 'soba', 'udon',
      'sushi', 'sashimi', 'omakase', 'maki ',
    ],
  },
  {
    slug: 'italian',
    name: 'Italian',
    icon: '🍝',
    patterns: ['italian', 'italiano', 'trattoria', 'ristorante', 'osteria', 'gelato', 'gelateria'],
  },
  {
    slug: 'mexican',
    name: 'Mexican',
    icon: '🌮',
    patterns: ['mexican', 'taqueria', 'taquería', 'taco', 'burrito', 'tamale', 'cantina'],
  },
  {
    slug: 'vietnamese',
    name: 'Vietnamese',
    icon: '🍜',
    patterns: ['vietnamese', 'pho ', ' pho', 'banh mi', 'bánh mì', 'vermicelli'],
  },
  {
    slug: 'greek',
    name: 'Greek',
    icon: '🥙',
    patterns: ['greek', 'gyro', 'gyros', 'souvlaki', 'tzatziki', 'spanakopita', 'moussaka'],
  },
  {
    slug: 'korean',
    name: 'Korean',
    icon: '🍲',
    patterns: ['korean', 'bibimbap', 'bulgogi', 'kimchi', 'korean bbq', 'k-bbq', 'kbbq'],
  },
  {
    slug: 'indian',
    name: 'Indian',
    icon: '🍛',
    patterns: ['indian', 'curry', 'tandoori', 'tandoor', 'naan', 'biryani', 'masala', 'dosa'],
  },
  {
    slug: 'chinese',
    name: 'Chinese',
    icon: '🥟',
    patterns: ['chinese', 'szechuan', 'sichuan', 'cantonese', 'dim sum', 'mandarin cuisine', 'hot pot'],
  },
  {
    slug: 'canadian',
    name: 'Canadian',
    icon: '🍁',
    patterns: ['canadian', 'canadiana', 'pacific northwest', 'west coast cuisine', 'farm to table', 'farm-to-table'],
  },
  {
    slug: 'seafood',
    name: 'Seafood',
    icon: '🦞',
    patterns: ['seafood', 'oyster', 'oysters', 'lobster', 'crab shack', 'fish & chips', 'fish and chips', 'salmon'],
  },
  {
    slug: 'pizza',
    name: 'Pizza',
    icon: '🍕',
    patterns: ['pizza', 'pizzeria', 'wood-fired', 'wood fired'],
  },
  {
    slug: 'brunch',
    name: 'Brunch & Breakfast',
    icon: '🥞',
    patterns: ['brunch', 'breakfast', 'eggs benedict', 'all-day breakfast', 'all day breakfast'],
  },
  {
    slug: 'bakery-coffee',
    name: 'Bakery & Coffee',
    icon: '🥐',
    patterns: [
      'bakery', 'bake shop', 'pâtisserie', 'patisserie', 'boulangerie', 'croissant', 'sourdough',
      'coffee', 'café', ' cafe', 'cafe ', 'espresso', 'roastery', 'roasters', 'coffeehouse', 'coffee house',
    ],
  },
];

export const CUISINE_BY_SLUG: Record<string, CuisineDef> = Object.fromEntries(
  CUISINES.map((c) => [c.slug, c]),
);

export function getCuisine(slug: string): CuisineDef | null {
  return CUISINE_BY_SLUG[slug] ?? null;
}

type CuisineMatchable = {
  name?: string | null;
  short_description?: string | null;
  description?: string | null;
  listing_tags?: { tags: { name?: string | null; slug?: string | null } | null }[] | null;
};

function buildHaystack(listing: CuisineMatchable): string {
  const parts: string[] = [];
  if (listing.name) parts.push(listing.name);
  if (listing.short_description) parts.push(listing.short_description);
  if (listing.description) parts.push(listing.description.replace(/<[^>]+>/g, ' '));
  for (const lt of listing.listing_tags || []) {
    if (lt?.tags?.name) parts.push(lt.tags.name);
    if (lt?.tags?.slug) parts.push(lt.tags.slug);
  }
  return parts.join(' · ').toLowerCase();
}

export function listingMatchesCuisine(listing: CuisineMatchable, cuisine: CuisineDef): boolean {
  const hay = buildHaystack(listing);
  return cuisine.patterns.some((p) => hay.includes(p));
}

export function cuisinesForListing(listing: CuisineMatchable): CuisineDef[] {
  const hay = buildHaystack(listing);
  return CUISINES.filter((c) => c.patterns.some((p) => hay.includes(p)));
}
