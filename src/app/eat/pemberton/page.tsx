import { Metadata } from 'next';
import Link from 'next/link';
import { getListings, getTagsByCategory, getCategoryBySlug } from '@/lib/data';
import { Listing } from '@/lib/supabase';
import FallbackImage from '@/components/FallbackImage';
import NewsletterSignup from '@/components/NewsletterSignup';
import { TrustStrip } from '@/components/SocialProof';
import TagFilterGrid from '@/components/TagFilterGrid';

export const metadata: Metadata = {
  title: 'Best Restaurants in Pemberton (2026) — A Local\'s Guide',
  description:
    'Pemberton\'s food scene is small but mighty. Here are the restaurants worth the drive past Whistler — farm-to-table dining, great bakeries, and proper pub food.',
  alternates: { canonical: '/eat/pemberton' },
  openGraph: {
    title: 'Best Restaurants in Pemberton (2026) — A Local\'s Guide',
    description:
      'Pemberton\'s food scene is small but mighty. Here are the restaurants worth the drive past Whistler — farm-to-table dining, great bakeries, and proper pub food.',
    url: 'https://bestseatosky.com/eat/pemberton',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Restaurants in Pemberton (2026) — A Local\'s Guide',
    description:
      'Pemberton\'s food scene is small but mighty. Here are the restaurants worth the drive past Whistler — farm-to-table dining, great bakeries, and proper pub food.',
  },
};

// --- Curated editorial content ---

const TOP_PICKS: { name: string; take: string }[] = [
  { name: 'Mile One Eating House', take: 'Farm-to-table pioneer — the reason food lovers drive past Whistler' },
  { name: 'The Pony', take: 'Classic Pemberton gathering spot, solid pub fare and cold beer' },
  { name: 'Blackbird Bakery', take: 'Best pastries and coffee in town, worth the stop alone' },
  { name: 'Grimm\'s Deli & Gourmet', take: 'Great sandwiches and local goods — a Pemberton institution' },
];

const BEST_BY_CATEGORY: {
  title: string;
  emoji: string;
  picks: { name: string; desc: string }[];
}[] = [
  {
    title: 'Best After a Day Out',
    emoji: '🥾',
    picks: [
      { name: 'The Pony', desc: 'Cold beer, hearty pub food, and the kind of atmosphere where muddy boots are welcome' },
      { name: 'Mile One Eating House', desc: 'If you want to reward yourself properly after Joffre Lakes or Nairn Falls' },
    ],
  },
  {
    title: 'Best for Brunch',
    emoji: '🥞',
    picks: [
      { name: 'Blackbird Bakery', desc: 'Fresh pastries, great coffee, and a relaxed small-town morning vibe' },
      { name: 'Mile One Eating House', desc: 'Weekend brunch with farm-fresh ingredients from the Pemberton Valley' },
    ],
  },
  {
    title: 'Best Date Night',
    emoji: '🕯️',
    picks: [
      { name: 'Mile One Eating House', desc: 'The best dinner in Pemberton, full stop — seasonal menu, local ingredients, thoughtful wine list' },
    ],
  },
  {
    title: 'Best Coffee & Bakeries',
    emoji: '☕',
    picks: [
      { name: 'Blackbird Bakery', desc: 'The go-to morning stop — locals line up for the fresh bread and pastries' },
      { name: 'Grimm\'s Deli & Gourmet', desc: 'Good coffee plus sandwiches and local specialty goods to take home' },
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

export default async function PembertonEatPage() {
  const category = await getCategoryBySlug('eat');
  const listings = await getListings({ categorySlug: 'eat', townSlug: 'pemberton' });
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
    name: 'Best Restaurants in Pemberton (2026)',
    description: 'Hand-picked by locals — the best restaurants in Pemberton, BC.',
    numberOfItems: sortedListings.length,
    itemListElement: sortedListings.slice(0, 20).map((listing, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Restaurant',
        name: listing.name,
        description: listing.short_description || listing.description?.slice(0, 155),
        address: listing.address,
        ...(listing.google_rating && listing.google_review_count > 0 && {
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
        <span className="text-slate-600">Pemberton</span>
      </nav>

      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        Best Restaurants in Pemberton — A Local&apos;s Guide
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Last updated: March 2026 · {sortedListings.length} restaurants ranked
      </p>

      {/* Intro */}
      <div className="prose prose-slate max-w-none mb-10 space-y-4">
        <p className="text-slate-600 leading-relaxed text-base">
          Pemberton&apos;s food scene is small but mighty. Most visitors blow right through on
          their way to Joffre Lakes — their loss. The restaurants here punch well above their
          weight, with farm-to-table ingredients from the valley and a laid-back atmosphere
          you won&apos;t find in Whistler.
        </p>
        <p className="text-slate-600 leading-relaxed text-base">
          It&apos;s a short list because Pemberton is a small town. Every spot on it is here for a reason.
        </p>
      </div>

      {/* Trust Strip */}
      <div className="mb-10">
        <TrustStrip />
      </div>

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
                {listing?.featured_image_url ? (
                  <FallbackImage
                    src={listing.featured_image_url}
                    alt={pick.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    fallbackEmoji="🍽️"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl opacity-20 saturate-0 brightness-200">🍽️</span>
                  </div>
                )}
              </div>

              <div className="flex-1 py-4 pr-5">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight">
                    <span className="sm:hidden text-slate-400 font-sans text-sm mr-1.5">{i + 1}.</span>
                    {pick.name}
                  </h3>
                  {listing?.google_rating && (
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
                    {listing?.featured_image_url ? (
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-orange-500 to-red-600">
                        <FallbackImage
                          src={listing.featured_image_url}
                          alt={pick.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          fallbackEmoji="🍽️"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg shrink-0 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                        <span className="text-2xl opacity-20 saturate-0 brightness-200">🍽️</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-serif font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                          {pick.name}
                        </h4>
                        {listing?.google_rating && (
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
      <div className="border-t border-slate-200 pt-12 mb-16">
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
          All Pemberton Restaurants
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          The complete list, filterable by type. Sorted by rating.
        </p>

        <TagFilterGrid listings={sortedListings} tags={tags} />
      </div>

      {/* Back to all restaurants */}
      <div className="text-center mb-12">
        <Link
          href="/eat"
          className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800 transition-colors"
        >
          ← See all Sea to Sky restaurants
        </Link>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">
          Get the Free Sea to Sky Trip Planner
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Local restaurant picks, must-do trails, and insider tips — delivered to your inbox.
        </p>
        <NewsletterSignup source="eat-pemberton" />
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
              { '@type': 'ListItem', position: 3, name: 'Pemberton Restaurants', item: 'https://bestseatosky.com/eat/pemberton' },
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
