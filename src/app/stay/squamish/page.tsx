import { Metadata } from 'next';
import Link from 'next/link';
import { getListings, getTagsByCategory, getCategoryBySlug } from '@/lib/data';
import { Listing, getPlaceholderImage } from '@/lib/supabase';
import FallbackImage from '@/components/FallbackImage';
import NewsletterSignup from '@/components/NewsletterSignup';
import { TrustStrip } from '@/components/SocialProof';
import TagFilterGrid from '@/components/TagFilterGrid';
import AffiliateCard from '@/components/AffiliateCard';

export const metadata: Metadata = {
  title: 'Where to Stay in Squamish (2026) — Best Hotels, Cabins & Campgrounds',
  description:
    'Find the best places to stay in Squamish — from riverfront hotels to cozy cabins and campgrounds near the Chief. Compare prices and book your accommodation.',
  alternates: { canonical: '/stay/squamish' },
  openGraph: {
    title: 'Where to Stay in Squamish (2026) — Best Hotels, Cabins & Campgrounds',
    description:
      'Find the best places to stay in Squamish — from riverfront hotels to cozy cabins and campgrounds near the Chief. Compare prices and book your accommodation.',
    url: 'https://bestseatosky.com/stay/squamish',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where to Stay in Squamish (2026) — Best Hotels, Cabins & Campgrounds',
    description:
      'Find the best places to stay in Squamish — from riverfront hotels to cozy cabins and campgrounds near the Chief. Compare prices and book your accommodation.',
  },
};

// --- Curated editorial content ---

const AREAS: {
  name: string;
  bestFor: string;
  description: string;
  emoji: string;
}[] = [
  {
    name: 'Downtown Squamish',
    bestFor: 'Restaurants, breweries, walkability',
    description:
      'Cleveland Ave is the heart of town — walking distance to restaurants, coffee shops, and breweries. Most hotels and B&Bs are here or nearby.',
    emoji: '🏘️',
  },
  {
    name: 'Garibaldi Highlands',
    bestFor: 'Quiet stays, families, mountain views',
    description:
      'Residential neighbourhood up the hill with stunning views of the Chief and Garibaldi Range. Great Airbnbs and vacation rentals, but you\'ll need a car.',
    emoji: '🏔️',
  },
  {
    name: 'Valleycliffe',
    bestFor: 'Climbers, hikers, Chief access',
    description:
      'Right at the base of the Stawamus Chief. Walk to the trailhead. The neighbourhood of choice for serious climbers and anyone who wants to be first on the trail.',
    emoji: '🧗',
  },
  {
    name: 'Brackendale',
    bestFor: 'Nature, eagles, river access, budget',
    description:
      'Ten minutes north of downtown on the Squamish River. Quieter, more rural, and home to one of the world\'s largest bald eagle populations in winter. Good camping nearby.',
    emoji: '🦅',
  },
];

const BUDGET_PICKS: {
  tier: string;
  range: string;
  emoji: string;
  picks: { name: string; note: string }[];
}[] = [
  {
    tier: 'Hotels & Inns',
    range: '$150–300/night',
    emoji: '🏨',
    picks: [
      { name: 'Sandman Hotel', note: 'Reliable highway hotel with a pool — solid for families passing through or staying a few nights' },
      { name: 'Executive Suites Hotel & Resort', note: 'Full kitchen suites on the Mamquam River — great value for longer stays' },
      { name: 'Sea to Sky Hotel', note: 'No-frills and affordable, right off Highway 99 with easy access to everything' },
    ],
  },
  {
    tier: 'Boutique & B&Bs',
    range: '$120–250/night',
    emoji: '🏡',
    picks: [
      { name: 'Howe Sound Inn', note: 'Downtown location with the Howe Sound brewpub downstairs — can\'t beat the convenience' },
      { name: 'Squamish Adventure Inn', note: 'Backpacker-friendly with private rooms available — social vibe, good for solo travelers' },
    ],
  },
  {
    tier: 'Camping & Cabins',
    range: '$30–150/night',
    emoji: '⛺',
    picks: [
      { name: 'Alice Lake Provincial Park', note: 'The best campground in Squamish — lakeside sites, great trails, book months ahead in summer' },
      { name: 'Klahanie Campground', note: 'Walk-in riverside sites near Brackendale — quieter and easier to get than Alice Lake' },
      { name: 'Airbnb / Vrbo cabins', note: 'Best selection in Garibaldi Highlands and Brackendale — look for places with hot tubs and mountain views' },
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

export default async function SquamishStayPage() {
  const category = await getCategoryBySlug('stay');
  const listings = await getListings({ categorySlug: 'stay', townSlug: 'squamish' });
  const tags = category ? await getTagsByCategory(category.id) : [];

  const sortedListings = [...listings].sort(
    (a, b) => (b.google_rating || 0) - (a.google_rating || 0)
  );

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Where to Stay in Squamish (2026)',
    description: 'Best hotels, cabins, and campgrounds in Squamish, BC.',
    numberOfItems: sortedListings.length,
    itemListElement: sortedListings.slice(0, 20).map((listing, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'LodgingBusiness',
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
        <Link href="/stay" className="hover:text-slate-600 transition-colors">Stay</Link>
        <span>›</span>
        <span className="text-slate-600">Squamish</span>
      </nav>

      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        Where to Stay in Squamish — A Local&apos;s Guide
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Last updated: March 2026 · {sortedListings.length} accommodations ranked
      </p>

      {/* Intro */}
      <div className="prose prose-slate max-w-none mb-10 space-y-4">
        <p className="text-slate-600 leading-relaxed text-base">
          Squamish isn&apos;t just a pit stop on the way to Whistler anymore. Whether you&apos;re
          here to climb the Chief, mountain bike the trails, or just eat and drink your way through
          downtown, you need somewhere to crash. The options range from highway hotels to riverside
          campgrounds to Airbnb cabins with hot tubs and mountain views.
        </p>
        <p className="text-slate-600 leading-relaxed text-base">
          Here&apos;s where to stay based on what you&apos;re here to do.
        </p>
      </div>

      {/* Trust Strip */}
      <div className="mb-10">
        <TrustStrip />
      </div>

      {/* ============ COMPARE HOTELS ============ */}
      <div className="mb-16">
        <AffiliateCard
          title="Compare All Squamish Hotels"
          description="Not sure where to start? Compare prices across all booking sites in one search."
          linkText="Compare Squamish Hotel Prices on Trivago"
          linkUrl="https://www.awin1.com/cread.php?awinmid=66030&awinaffid=2823352&ued=https%3A%2F%2Fwww.trivago.ca%2F%3Fsearch%3DSquamish%252C%2BBC"
          disclaimerText="This is an affiliate link. Best Sea to Sky may earn a commission at no extra cost to you."
        />
      </div>

      {/* Cross-link to eat/squamish */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/eat/squamish"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 hover:border-amber-300 hover:text-amber-800 transition-colors shadow-sm"
        >
          See Squamish restaurants <span className="text-amber-600">&rarr;</span>
        </Link>
      </div>

      {/* ============ BEST AREAS TO STAY ============ */}
      <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Best Areas to Stay</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {AREAS.map((area) => (
          <div
            key={area.name}
            className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{area.emoji}</span>
              <h3 className="font-serif text-lg font-bold text-slate-900">{area.name}</h3>
            </div>
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">
              Best for: {area.bestFor}
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">{area.description}</p>
          </div>
        ))}
      </div>

      {/* ============ TOP PICKS BY TYPE ============ */}
      <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8">Our Top Picks</h2>

      <div className="space-y-10 mb-16">
        {BUDGET_PICKS.map((tier) => (
          <div key={tier.tier}>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
              <span className="mr-2">{tier.emoji}</span>{tier.tier}
              <span className="text-sm font-normal text-slate-400 ml-2">({tier.range})</span>
            </h3>
            <div className="space-y-3 mt-4">
              {tier.picks.map((pick) => {
                const listing = findListing(listings, pick.name);
                const href = listing ? `/stay/${listing.slug}` : undefined;

                const inner = (
                  <div className="flex items-start gap-4 bg-white rounded-xl p-4 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative bg-gradient-to-br from-indigo-500 to-purple-600">
                      <FallbackImage
                        src={listing?.featured_image_url || getPlaceholderImage('stay')}
                        alt={pick.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        fallbackEmoji="🏔️"
                        placeholderUrl={getPlaceholderImage('stay')}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-serif font-bold text-slate-900 group-hover:text-indigo-800 transition-colors">
                          {pick.name}
                        </h4>
                        {listing?.google_rating && (
                          <span className="text-xs font-bold text-slate-500">
                            ★ {listing.google_rating.toFixed(1)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{pick.note}</p>
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

      {/* ============ READY TO BOOK CTA ============ */}
      <div className="mb-16">
        <AffiliateCard
          title="Ready to Book?"
          description="Compare Squamish hotel prices across every major booking site in one search."
          linkText="Compare Squamish Hotel Prices on Trivago"
          linkUrl="https://www.awin1.com/cread.php?awinmid=66030&awinaffid=2823352&ued=https%3A%2F%2Fwww.trivago.ca%2F%3Fsearch%3DSquamish%252C%2BBC"
          disclaimerText="This is an affiliate link. Best Sea to Sky may earn a commission at no extra cost to you."
        />
      </div>

      {/* ============ FULL LIST ============ */}
      <div className="border-t border-slate-200 pt-12 mb-16">
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
          All Squamish Accommodation
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          The complete list, filterable by type. Sorted by rating.
        </p>

        <TagFilterGrid listings={sortedListings} tags={tags} />
      </div>

      {/* Cross-links */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <Link
          href="/stay"
          className="inline-flex items-center gap-2 text-indigo-700 font-semibold hover:text-indigo-800 transition-colors"
        >
          ← See all Sea to Sky accommodation
        </Link>
        <span className="text-slate-300">|</span>
        <Link
          href="/eat/squamish"
          className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-800 transition-colors"
        >
          Squamish restaurants →
        </Link>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">
          Get the Free Sea to Sky Trip Planner
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Local hotel picks, must-do trails, and insider tips — delivered to your inbox.
        </p>
        <NewsletterSignup source="stay-squamish" />
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
              { '@type': 'ListItem', position: 2, name: 'Stay', item: 'https://bestseatosky.com/stay' },
              { '@type': 'ListItem', position: 3, name: 'Squamish Hotels', item: 'https://bestseatosky.com/stay/squamish' },
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
