import { Metadata } from 'next';
import Link from 'next/link';
import { getListings, getTagsByCategory, getCategoryBySlug } from '@/lib/data';
import { Listing } from '@/lib/supabase';
import FallbackImage from '@/components/FallbackImage';
import NewsletterSignup from '@/components/NewsletterSignup';
import { TrustStrip } from '@/components/SocialProof';
import TagFilterGrid from '@/components/TagFilterGrid';
import AffiliateCard from '@/components/AffiliateCard';

export const metadata: Metadata = {
  title: 'Where to Stay in Whistler (2026) — Best Hotels & Lodges',
  description:
    'Find the best places to stay in Whistler — from ski-in/ski-out resorts to budget-friendly lodges. Compare prices and book your accommodation.',
  alternates: { canonical: '/stay/whistler' },
  openGraph: {
    title: 'Where to Stay in Whistler (2026) — Best Hotels & Lodges',
    description:
      'Find the best places to stay in Whistler — from ski-in/ski-out resorts to budget-friendly lodges. Compare prices and book your accommodation.',
    url: 'https://bestseatosky.com/stay/whistler',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where to Stay in Whistler (2026) — Best Hotels & Lodges',
    description:
      'Find the best places to stay in Whistler — from ski-in/ski-out resorts to budget-friendly lodges. Compare prices and book your accommodation.',
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
    name: 'Whistler Village',
    bestFor: 'Nightlife, restaurants, easy gondola access',
    description:
      'Walk to everything — bars, restaurants, ski lifts. Most expensive but most convenient.',
    emoji: '🏘️',
  },
  {
    name: 'Creekside',
    bestFor: 'Families, quieter vibe, ski-in/ski-out',
    description:
      'Less crowded than the main village. Direct gondola access. Better value.',
    emoji: '🌲',
  },
  {
    name: 'Upper Village',
    bestFor: 'Luxury, Blackcomb access',
    description:
      'High-end hotels and ski-in/ski-out properties near Blackcomb base.',
    emoji: '⛷️',
  },
  {
    name: 'Outside the Village',
    bestFor: 'Budget travelers, road trippers',
    description:
      'Cheaper rates but you\'ll need a car. Good for summer visits.',
    emoji: '🚗',
  },
];

const BUDGET_PICKS: {
  tier: string;
  range: string;
  emoji: string;
  picks: { name: string; note: string }[];
}[] = [
  {
    tier: 'Luxury',
    range: '$400+/night',
    emoji: '✨',
    picks: [
      { name: 'Four Seasons Resort Whistler', note: 'The gold standard — ski concierge, heated pool, and service that justifies the price' },
      { name: 'Fairmont Chateau Whistler', note: 'Iconic ski-in/ski-out at the base of Blackcomb, massive rooms and world-class spa' },
      { name: 'Nita Lake Lodge', note: 'Boutique lakeside retreat in Creekside — quieter, romantic, feels like a hidden gem' },
    ],
  },
  {
    tier: 'Mid-Range',
    range: '$200–400/night',
    emoji: '🏔️',
    picks: [
      { name: 'Summit Lodge Boutique Hotel', note: 'Great location, kitchen suites, solid value for the village' },
      { name: 'Crystal Lodge', note: 'Right in the heart of the village — walk to everything' },
      { name: 'Aava Whistler Hotel', note: 'Modern rooms, rooftop hot tub, reliable mid-range pick' },
    ],
  },
  {
    tier: 'Budget',
    range: 'Under $200/night',
    emoji: '🎒',
    picks: [
      { name: 'Pangea Pod Hotel', note: 'Japanese-style pod hotel in the village — surprisingly comfortable and ultra-affordable' },
      { name: 'HI Whistler Hostel', note: 'Classic hostel on the lake, great for solo travelers and groups on a budget' },
      { name: 'Airbnb / Vrbo', note: 'Best deals are outside the village — check Cheakamus Crossing and Function Junction' },
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

export default async function WhistlerStayPage() {
  const category = await getCategoryBySlug('stay');
  const listings = await getListings({ categorySlug: 'stay', townSlug: 'whistler' });
  const tags = category ? await getTagsByCategory(category.id) : [];

  const sortedListings = [...listings].sort(
    (a, b) => (b.google_rating || 0) - (a.google_rating || 0)
  );

  // Collect all curated picks for matching
  const allPickNames = BUDGET_PICKS.flatMap((t) => t.picks.map((p) => p.name));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Where to Stay in Whistler (2026)',
    description: 'Best hotels, lodges, and accommodation in Whistler, BC.',
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
        <span className="text-slate-600">Whistler</span>
      </nav>

      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        Where to Stay in Whistler — A Local&apos;s Guide
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Last updated: March 2026 · {sortedListings.length} accommodations ranked
      </p>

      {/* Intro */}
      <div className="prose prose-slate max-w-none mb-10">
        <p className="text-slate-600 leading-relaxed text-base">
          Whistler has everything from luxury ski-in/ski-out resorts to cozy budget lodges.
          Where you stay depends on what you&apos;re here for — skiing, summer hiking, village
          nightlife, or a quiet mountain escape.
        </p>
        <p className="text-slate-600 leading-relaxed text-base">
          We&apos;ve broken it down so you can find the right fit.
        </p>
      </div>

      {/* Trust Strip */}
      <div className="mb-10">
        <TrustStrip />
      </div>

      {/* ============ QUICK PICK — TRIVAGO ============ */}
      <div className="mb-16">
        <AffiliateCard
          title="Quick Pick: Compare All Whistler Hotels"
          description="Not sure where to start? Compare prices across all booking sites in one search."
          linkText="Compare Whistler Hotel Prices on Trivago"
          linkUrl="TRIVAGO_AFFILIATE_LINK"
          disclaimerText="This is an affiliate link. Best Sea to Sky may earn a commission at no extra cost to you."
        />
      </div>

      {/* Cross-link to eat/whistler */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/eat/whistler"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 hover:border-amber-300 hover:text-amber-800 transition-colors shadow-sm"
        >
          See Whistler restaurants <span className="text-amber-600">&rarr;</span>
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

      {/* ============ TOP PICKS BY BUDGET ============ */}
      <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8">Our Top Picks by Budget</h2>

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
                    {listing?.featured_image_url ? (
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600">
                        <FallbackImage
                          src={listing.featured_image_url}
                          alt={pick.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          fallbackEmoji="🏔️"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="text-2xl opacity-20 saturate-0 brightness-200">🏔️</span>
                      </div>
                    )}
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
          description="Compare Whistler hotel prices across every major booking site in one search."
          linkText="Compare Whistler Hotel Prices on Trivago"
          linkUrl="TRIVAGO_AFFILIATE_LINK"
          disclaimerText="This is an affiliate link. Best Sea to Sky may earn a commission at no extra cost to you."
        />
      </div>

      {/* ============ FULL LIST ============ */}
      <div className="border-t border-slate-200 pt-12 mb-16">
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">
          All Whistler Accommodation
        </h2>
        <p className="text-sm text-slate-500 mb-8">
          The complete list, filterable by type. Sorted by rating.
        </p>

        <TagFilterGrid listings={sortedListings} tags={tags} />
      </div>

      {/* Back to all stays */}
      <div className="text-center mb-12">
        <Link
          href="/stay"
          className="inline-flex items-center gap-2 text-indigo-700 font-semibold hover:text-indigo-800 transition-colors"
        >
          ← See all Sea to Sky accommodation
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
        <NewsletterSignup source="stay-whistler" />
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
              { '@type': 'ListItem', position: 3, name: 'Whistler Hotels', item: 'https://bestseatosky.com/stay/whistler' },
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
