// Hand-entered partner offers, keyed by listing slug.
// Only add facts the business has confirmed. No invented expiry dates.
export type ListingOffer = {
  code: string;
  text: string;
  badge: string;
  disclosure: string;
};

export const LISTING_OFFERS: Record<string, ListingOffer> = {
  'escape-whistler-whistler': {
    code: 'BESTSEA2SKY',
    badge: 'Code BESTSEA2SKY: $5 off',
    text: 'Use code BESTSEA2SKY for $5 off your booking.',
    disclosure: 'We may earn a commission if you book through this link or code.',
  },
};

export function getListingOffer(slug: string | null | undefined): ListingOffer | null {
  if (!slug) return null;
  return LISTING_OFFERS[slug] ?? null;
}
