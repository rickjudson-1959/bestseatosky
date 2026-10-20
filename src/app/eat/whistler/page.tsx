import { Metadata } from 'next';
import Link from 'next/link';
import { getListings, getTagsByCategory, getCategoryBySlug } from '@/lib/data';
import { Listing, getPlaceholderImage } from '@/lib/supabase';
import { getListingImageAlt, isTownFallbackImage } from '@/lib/listingImage';
import { hasRealRating } from '@/lib/rating';
import FallbackImage from '@/components/FallbackImage';
import TagFilterGrid from '@/components/TagFilterGrid';
import HubPageConversion from '@/components/HubPageConversion';

export const metadata: Metadata = {
  title: 'Best Restaurants in Whistler (2026): A Local\'s Guide',
  description:
    'Restaurants in Whistler picked by our editors, with Google ratings: apres ski, brunch, date night, coffee and sushi.',
  alternates: { canonical: '/eat/whistler' },
  openGraph: {
    title: 'Best Restaurants in Whistler (2026): A Local\'s Guide',
    description:
      'Restaurants in Whistler picked by our editors, with Google ratings: apres ski, brunch, date night, coffee and sushi.',
    url: 'https://bestseatosky.com/eat/whistler',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Restaurants in Whistler (2026): A Local\'s Guide',
    description:
      'Restaurants in Whistler picked by our editors, with Google ratings: apres ski, brunch, date night, coffee and sushi.',
  },
};

// --- Curated editorial content ---

const TOP_PICKS: { name: string; take: string }[] = [
  { name: 'Araxi Restaurant & Oyster Bar', take: 'Fine dining and an oyster bar in Whistler Village' },
  { name: 'Sushi Village', take: 'Sushi on Sundial Crescent; expect a wait at peak times' },
  { name: 'Splitz Grill', take: 'Burgers on Main Street, quick and casual' },
  { name: 'Purebread', take: 'Bakery and coffee; go early for the best selection' },
  { name: 'Peaked Pies', take: 'Australian style meat pies on Main Street' },
  { name: '21 Steps Kitchen + Bar', take: 'Small plates and cocktails in the village' },
  { name: 'Rimrock Café', take: 'Seafood and game near Creekside' },
  { name: 'Hunter Gather', take: 'Smoked meats and local ingredients on Main Street' },
  { name: 'La Brasserie des Artistes', take: 'French bistro on the Village Stroll' },
];

const BEST_BY_CATEGORY: {
  title: string;
  emoji: string;
  picks: { name: string; desc: string }[];
}[] = [
  {
    title: 'Best Apres-Ski',
    emoji: '⛷️',
    picks: [
      { name: 'Splitz Grill', desc: 'Burgers and fries after a day on the hill' },
      { name: 'Peaked Pies', desc: 'Hot meat pies, easy to grab on the way out of the village' },
      { name: 'La Brasserie des Artistes', desc: 'French comfort food and beer in the village' },
    ],
  },
  {
    title: 'Best for Brunch',
    emoji: '🥞',
    picks: [
      { name: 'Purebread', desc: 'Not a sit down brunch, but the pastries make a good breakfast' },
      { name: '21 Steps Kitchen + Bar', desc: 'Sit down brunch with creative plates' },
      { name: 'Hunter Gather', desc: 'Breakfast with local ingredients in a relaxed room' },
    ],
  },
  {
    title: 'Best Date Night',
    emoji: '🕯️',
    picks: [
      { name: 'Araxi Restaurant & Oyster Bar', desc: 'Fine dining with an oyster bar; book ahead' },
      { name: 'Rimrock Café', desc: 'Seafood and game in a small, upscale room' },
      { name: '21 Steps Kitchen + Bar', desc: 'Small plates to share and a wine list, a bit more casual' },
    ],
  },
  {
    title: 'Best Coffee',
    emoji: '☕',
    picks: [
      { name: 'Purebread', desc: 'Coffee and a wide range of baked goods' },
    ],
  },
  {
    title: 'Best Sushi',
    emoji: '🍣',
    picks: [
      { name: 'Sushi Village', desc: 'Lively sushi spot in the village; book ahead' },
    ],
  },
];

// --- Helpers ---

function findListing(listings: Listing[], name: string): Listing | undefined {
  const lower = name.toLowerCase();
  return listings.find((l) => l.name.toLowerCase() === lower)
    || listings.find((l) => l.name.toLowerCase().includes(lower) || lower.includes(l.name.toLowerCase()));
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-px">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-sm ${i < Math.floor(rating) ? 'text-amber-400' : 'text-slate-200'}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

// --- Page ---

export default async function WhistlerEatPage() {
  const category = await getCategoryBySlug('eat');
  const listings = await getListings({ categorySlug: 'eat', townSlug: 'whistler' });
  const tags = category ? await getTagsByCategory(category.id) : [];

  const sortedListings = [...listings].sort(
    (a, b) => (b.google_rating || 0) - (a.google_rating || 0)
  );

  const topPicks = TOP_PICKS.map((pick) => ({
    ...pick,
    listing: findListing(listings, pick.name),
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Restaurants in Whistler (2026)',
    description: 'Editor picks for restaurants in Whistler, BC.',
    numberOfItems: sortedListings.length,
    itemListElement: sortedListings.slice(0, 20).map((listing, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Restaurant',
        name: listing.name,
        description: listing.short_description || listing.description?.slice(0, 155),
        address: listing.address,
        ...(hasRealRating(listing) && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: listing.google_rating,
            reviewCount: listing.google_review_count,
          },
        }),
        ...(listing.website && { url: listing.website }),
      },
    })),
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <Link href="/eat" className="hover:text-slate-600 transition-colors">Eat</Link>
        <span>›</span>
        <span className="text-slate-600">Whistler</span>
      </nav>

      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        Best Restaurants in Whistler: A Local&apos;s Guide
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Last updated: October 19, 2026 · {sortedListings.length} restaurants ranked
      </p>

      {/* Intro */}
      <div className="prose prose-slate max-w-none mb-10 space-y-4">
        <p className="text-slate-600 leading-relaxed text-base">
          Whistler has a lot of places to eat, and resort prices are common. These are our
          editors&apos; picks, each with at least 10 Google reviews, checked October 19, 2026.
        </p>
        <p className="text-slate-600 leading-relaxed text-base">
          From meat pies to oyster bars, here&apos;s where to eat in Whistler.
        </p>
      </div>

      <HubPageConversion
        townSlug="whistler"
        townName="Whistler"
        primaryCta={{ href: '#all-restaurants', label: 'Browse Whistler restaurants' }}
        source="eat-whistler-hero"
        omitCategory="eat"
      />

      {/* ============ OUR TOP PICKS ============ */}
      <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Our Top Picks</h2>

      <div className="flex flex-col gap-5 mb-16">
        {topPicks.map((pick, i) => {
          const listing = pick.listing;
          const href = listing ? `/eat/${listing.slug}` : undefined;

          const inner = (
            <div className="flex gap-5 bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="hidden sm:flex items-center justify-center w-14 shrink-0 bg-slate-50 border-r border-slate-100">
                <span className="font-serif text-2xl font-bold text-slate-300">{i + 1}</span>
              </div>

              <div className="w-32 sm:w-40 shrink-0 bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden">
                <FallbackImage
                  src={listing?.featured_image_url || getPlaceholderImage('eat')}
                  alt={listing && isTownFallbackImage(listing.featured_image_url) ? getListingImageAlt(listing) : pick.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  fallbackEmoji="🍽️"
                  placeholderUrl={getPlaceholderImage('eat')}
                />
              </div>

              <div className="flex-1 py-4 pr-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight">
                    <span className="sm:hidden text-slate-400 font-sans text-sm mr-1.5">{i + 1}.</span>
                    {pick.name}
                  </h3>
                  {hasRealRating(listing) && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Stars rating={listing.google_rating} />
                      <span className="text-sm font-bold text-slate-700">
                        {listing.google_rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-amber-700 font-medium mb-2">{pick.take}</p>

                {listing?.short_description && (
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-2">
                    {listing.short_description}
                  </p>
                )}

                {listing?.address && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <span>📍</span> {listing.address}
                  </span>
                )}
              </div>
            </div>
          );

          return href ? (
            <Link key={pick.name} href={href} className="group">
              {inner}
            </Link>
          ) : (
            <div key={pick.name} className="group">
              {inner}
            </div>
          );
        })}
      </div>

      {/* ============ BEST BY CATEGORY ============ */}
      <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8">Best By Category</h2>

      <div className="space-y-10 mb-16">
        {BEST_BY_CATEGORY.map((cat) => (
          <div key={cat.title}>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">
              <span className="mr-2">{cat.emoji}</span>{cat.title}
            </h3>
            <div className="space-y-3">
              {cat.picks.map((pick) => {
                const listing = findListing(listings, pick.name);
                const href = listing ? `/eat/${listing.slug}` : undefined;

                const inner = (
                  <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative bg-gradient-to-br from-orange-500 to-red-600">
                      <FallbackImage
                        src={listing?.featured_image_url || getPlaceholderImage('eat')}
                        alt={listing && isTownFallbackImage(listing.featured_image_url) ? getListingImageAlt(listing) : pick.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        fallbackEmoji="🍽️"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-serif font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                          {pick.name}
                        </h4>
                        {hasRealRating(listing) && (
                          <span className="text-xs font-bold text-slate-500">
                            ★ {listing.google_rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{pick.desc}</p>
                    </div>
                  </div>
                );

                return href ? (
                  <Link key={pick.name} href={href} className="block group">
                    {inner}
                  </Link>
                ) : (
                  <div key={pick.name} className="group">
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ============ FULL LIST ============ */}
      <div id="all-restaurants" className="border-t border-slate-200 pt-12 mb-16">
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
          All Whistler Restaurants
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          The complete list, filterable by type. Sorted by rating.
        </p>

        <TagFilterGrid listings={sortedListings} tags={tags} />
      </div>

      {/* Cross-links */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link
          href="/eat"
          className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800 transition-colors"
        >
          ← See all Sea to Sky restaurants
        </Link>
        <span className="text-slate-300">|</span>
        <Link
          href="/stay/whistler"
          className="inline-flex items-center gap-2 text-indigo-700 font-semibold hover:text-indigo-800 transition-colors"
        >
          Where to stay in Whistler →
        </Link>
      </div>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bestseatosky.com' },
              { '@type': 'ListItem', position: 2, name: 'Eat', item: 'https://bestseatosky.com/eat' },
              { '@type': 'ListItem', position: 3, name: 'Whistler Restaurants', item: 'https://bestseatosky.com/eat/whistler' },
            ],
          }),
        }}
      />

      {/* ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
