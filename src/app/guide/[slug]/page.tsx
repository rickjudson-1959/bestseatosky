import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSeoPageBySlug, getGuideListings } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/supabase';
import { getListingImageAlt } from '@/lib/listingImage';
import { hasRealRating, omitEmptyAggregateRatings } from '@/lib/rating';
import PriceLevel from '@/components/PriceLevel';
import TripPlannerCapture from '@/components/TripPlannerCapture';
import dynamic from 'next/dynamic';
const FaqSection = dynamic(() => import('@/components/FaqSection'));
import FallbackImage from '@/components/FallbackImage';
import AffiliateCard from '@/components/AffiliateCard';
import { getListingOffer } from '@/lib/offers';

const CAT_ICONS: Record<string, string> = {
  eat: '🍽️',
  stay: '🏔️',
  play: '⛷️',
  visit: '🌲',
  shop: '🛍️',
  services: '🧭',
};

const GUIDE_YEAR = '2026';

// Shared fallback for guides that have not had a dated refresh yet.
const DEFAULT_GUIDE_UPDATED_LABEL = 'February 2026';

// Per-guide refresh settings. Only guides listed here get a new visible date,
// a dateModified in schema, and any exclusions. Other guides are unchanged.
const GUIDE_REFRESH: Record<
  string,
  {
    updatedLabel: string;
    dateModified: string;
    excludeSlugs?: string[];
    nullsLast?: boolean;
    /** Extra category slugs pulled into this guide (hikes guides only). */
    extraCategorySlugs?: string[];
  }
> = {
  'best-skiing-whistler': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Information desk, not a place to ski or take lessons.
      'blackcomb-guest-services-whistler',
      // Resort shows once, as Whistler Blackcomb (Karl, Oct 19, 2026).
      'whistler-mountain-whistler',
      'blackcomb-mountain-whistler',
      'whistler-creekside-whistler',
    ],
    nullsLast: true,
  },
  'best-cafes-whistler': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Google Maps showed "Temporarily closed" on Oct 19, 2026; also a national chain.
      'blenz-coffee-whistler-whistler',
      // National or international chains never go in best lists (Karl, Oct 19, 2026).
      'arabica-whistler-village-whistler',
      // Hilton hotel cafe serving Starbucks drinks. Reverse if Karl treats it as local.
      'l-apres-cafe-and-lounge-whistler',
    ],
    nullsLast: true,
  },
  'best-cafes-squamish': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // National or international chains never go in best lists (Karl, Oct 19, 2026).
      'starbucks-coffee-company-squamish',
      'starbucks-coffee-company-squamish-2',
      // Google Maps showed "Permanently closed" on Oct 19, 2026.
      'parkside-cafe-squamish',
    ],
    nullsLast: true,
  },
  'best-breweries-whistler': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    nullsLast: true,
  },
  'best-breweries-squamish': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    nullsLast: true,
  },
  'best-hotels-whistler': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Campground or RV park, not a hotel.
      'singing-creek-campground-whistler',
      'garibaldi-lake-campground-whistler',
      'cheakamus-lake-campground-whistler',
      'helm-creek-camping-whistler',
      'whistler-olympic-park-rv-and-campground-whistler',
      'cal-cheak-campground-whistler',
      'whistler-rv-park-and-campgrounds-whistler',
      'riverside-a-parkbridge-camping-and-rv-resort-whistler',
      // Single private vacation rental or whole-house rental (Karl: single rentals stay out in Whistler).
      '31-gleneagle-whistler-whistler',
      'suite-420-cascade-lodge-whistler',
      'alpine-guestroom-whistler',
      'wedge-mountain-lodge-and-spa-whistler',
      'whistler-snowy-creek-accommodation-whistler',
      'treeline-by-holiday-whistler-whistler',
      // Google Maps showed "Temporarily closed" on Oct 19, 2026; its site shows no availability. Remove once it reopens.
      'alpine-lodge-whistler-whistler',
      // Fewer than 10 Google reviews or unrated on Oct 19, 2026 (10-review minimum).
      'haus-landsberg-bandb-whistler',
      'bear-trail-inn-whistler',
    ],
    nullsLast: true,
  },
  'best-hotels-squamish': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Campground or RV park, not a hotel.
      'alice-lake-campgrounds-squamish',
      'paradise-valley-campground-squamish',
      'stawamus-chief-provincial-park-campground-squamish',
      'mamquam-river-campground-squamish',
      'high-falls-recreation-site-squamish',
      'squamish-valley-campground-squamish',
      'klahanie-campground-squamish',
      // Korean-only name; English name not verifiable on Google or its own site. Remove once verified and renamed.
      '-squamish',
      // Google rating under 4.0 on Oct 19, 2026 (Squamish 4.0 floor).
      'meadowbrook-suite-squamish',
      'sea-to-sky-hotel-squamish',
      'mountain-retreat-hotel-and-suites-squamish',
      'hotel-squamish-squamish',
    ],
    nullsLast: true,
  },
  'best-hotels-pemberton': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Campground or RV park, not a hotel.
      'nairn-falls-campground-pemberton',
      'birkenhead-lake-provincial-park-campground-pemberton',
      // Fewer than 10 Google reviews or unrated on Oct 19, 2026 (10-review minimum).
      'the-barnhouse-in-the-meadows-pemberton',
      'lazy-acres-pemberton',
    ],
    nullsLast: true,
  },
  'things-to-do-whistler': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Google Maps showed "Temporarily closed" on Oct 19, 2026. Remove once reopened.
      'black-diamond-bike-rentals-whistler',
      'whistler-creek-athletic-club-whistler',
      'whistler-olympic-park-whistler',
      'the-callaghans-base-at-alexander-falls-whistler',
      'fairmont-chateau-whistler-golf-course-whistler',
      'nicklaus-north-golf-course-whistler',
      // Gym, fitness, yoga or kids club; not a visitor activity.
      'alpha-hiit-whistler',
      'opus-athletics-home-of-crossfit-whistler-whistler',
      'whistler-gymnastics-club-whistler',
      'altitude-fitness-whistler',
      'yogacara-whistler-whistler',
      'basecamp-fitness-whistler-whistler',
      // Retail or repair shop without rentals.
      'evo-outlet-whistler',
      'fineline-bike-shop-whistler-whistler',
      // Duplicate of the Whistler Blackcomb resort listing.
      'whistler-mountain-whistler',
      'blackcomb-mountain-whistler',
      'whistler-creekside-whistler',
      'blackcomb-guest-services-whistler',
      // Fewer than 10 Google reviews or unrated on Oct 19, 2026 (10-review minimum).
      'valley-trail-whistler',
      'ascent-trail-whistler',
      'fitzsimmons-accessible-nature-trail-whistler',
    ],
    nullsLast: true,
  },
  'things-to-do-squamish': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Google Maps showed "Temporarily closed" on Oct 19, 2026. Remove once reopened.
      'specialized-squamish-squamish',
      // Google Maps showed "Permanently closed" on Oct 19, 2026, but its own site still takes drop-ins; not archived (no second source).
      'kind-yoga-squamish-squamish',
      // Gym, fitness, yoga or kids club; not a visitor activity.
      'the-ninja-gym-squamish-squamish',
      'bestrong-training-squamish',
      'squamish-barbell-crossfit-squamish-squamish',
      'mountain-top-strength-and-conditioning-squamish',
      'peak-strength-club-squamish',
      'rebel-fitness-squamish-squamish',
      'ashtanga-yoga-squamish-squamish',
      'the-vitality-lab-squamish',
      'prana-yoga-squamish-squamish',
      'wild-life-gym-inc-squamish',
      'yoga-detour-squamish',
      'sea-to-sky-yoga-meditation-and-ayurveda-squamish',
      'integral-strength-training-squamish',
      'shala-yoga-squamish',
      'storm-strength-and-performance-squamish',
      'f45-training-squamish-squamish',
      'the-yoga-studio-squamish',
      'oxygen-yoga-and-fitness-squamish-squamish',
      'hotbox-fitness-squamish',
      'clubflex-24hr-fitness-squamish',
      'squamish-athletic-club-squamish',
      'mountain-fitness-center-squamish',
      'anytime-fitness-squamish',
      'breathe-squamish-squamish',
      // Pool and hot tub service company, not an activity.
      'sea-to-sky-spa-and-pool-service-squamish',
      // Retail or repair shop without rentals.
      'spoke-haven-bike-shop-squamish',
      'day-time-cycling-squamish',
      'drop-bar-cycles-squamish',
      'tantalus-bike-shop-squamish',
      'corsa-cycles-squamish',
      // Trail is near Pemberton/D'Arcy, not Squamish (town data issue).
      'cool-creek-canyon-trail-squamish',
      'semaphore-lakes-trailhead-squamish',
      // Fewer than 10 Google reviews or unrated on Oct 19, 2026 (10-review minimum).
      'squamish-paddling-club-squamish',
    ],
    nullsLast: true,
  },
  'things-to-do-pemberton': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Gym, fitness, yoga or kids club; not a visitor activity.
      'richlife-fitness-pemberton',
      'village-yoga-pemberton',
      // Retail or repair shop without rentals.
      'elevate-bike-shop-pemberton',
      'snowboarder-lifestyle-pemberton',
      // Fewer than 10 Google reviews or unrated on Oct 19, 2026 (10-review minimum).
      'one-mile-lake-hill-pemberton',
      'bike-skills-park-pemberton',
      'happy-trail-pemberton',
    ],
    nullsLast: true,
  },
  'best-attractions-whistler': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Google Maps showed "Temporarily closed" on Oct 19, 2026. Remove once reopened.
      'whistler-blackcomb-peak-2-peak-gondola-whistler',
      'meadow-park-whistler',
      // Campground or recreation campsite, not an attraction.
      'cal-cheak-recreation-site-whistler',
      'camping-whistler-whistler',
      // Located outside this town (town data issue).
      'nairn-falls-provincial-park-whistler',
      // Duplicate of another listing for the same attraction.
      'whistler-village-stroll-whistler',
      // Fewer than 10 Google reviews or unrated on Oct 19, 2026 (10-review minimum).
      'big-timber-park-whistler',
      'fairmont-chateau-whistler-park-whistler',
    ],
    nullsLast: true,
  },
  'best-attractions-squamish': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Google Maps showed "Temporarily closed" on Oct 19, 2026. Remove once reopened.
      'railway-museum-of-british-columbia-squamish',
      'lavendel-farm-squamish',
      // Google Maps showed "Permanently closed" on Oct 19, 2026; no second source yet, so not archived.
      'squamish-native-art-store-squamish',
      'the-gallery-squamish',
      'inspired-squamish-art-and-decor-gallery-squamish',
      // Campground or recreation campsite, not an attraction.
      'squamish-riverside-campsite-recreation-site-squamish',
      // Located outside this town (town data issue).
      'whistler-mountain-bike-park-squamish',
      'nairn-falls-squamish',
      'alexander-falls-view-point-squamish',
      'alexander-falls-squamish',
      'nairn-falls-squamish-2',
      'keyhole-falls-squamish',
      // Duplicate of another listing for the same attraction (Gondola Summit Lodge, Shannon Falls Viewpoint, Chief peaks and viewpoint, second Tantalus Lookout).
      'first-peak-squamish',
      'second-peak-squamish',
      'the-squamishs-chief-viewpoint-squamish',
      'tantalus-lookout-roadside-viewpoint-squamish',
      'third-peak-squamish',
      'sea-to-sky-gondola-summit-lodge-squamish',
      'shannon-falls-viewpoint-squamish',
      // Fewer than 10 Google reviews or unrated on Oct 19, 2026 (10-review minimum).
      'ashlu-falls-squamish',
      'dreamgreenstudio-squamish',
      'maude-frickert-waterfall-squamish',
      'estuary-chelem-trail-squamish',
      'anissimoff-fine-art-art-in-bc-squamish',
      'sorca-bike-skills-park-squamish',
      'petgill-lake-squamish',
    ],
    nullsLast: true,
  },
  'best-shopping-whistler': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Google Maps showed "Permanently closed" on Oct 19, 2026; no second source yet, so not archived.
      'cabin-fever-gifts-whistler',
      // Fewer than 10 Google reviews or unrated on Oct 19, 2026 (10-review minimum).
      'slcc-gallery-and-gift-shop-whistler',
      'kabn-clothing-open-country-whistler',
      'whistler-gift-services-whistler',
      'whistler-arts-and-gifts-whistler',
      'mt-waddington-outdoors-whistler',
    ],
    nullsLast: true,
  },
  'best-hikes-squamish': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Lift, not a trail (hiking-tagged visit listing; the Sea to Summit Trail is listed separately).
      'sea-to-sky-gondola-squamish',
      // Trail is near Pemberton/D'Arcy, not Squamish (town data issue).
      'semaphore-lakes-trailhead-squamish',
      'cool-creek-canyon-trail-squamish',
      // Same place as stawamus-chief-trail-squamish (the Chief shows once).
      'first-peak-squamish',
      'second-peak-squamish',
      'third-peak-squamish',
      // Fewer than 10 Google reviews or unrated on Oct 19, 2026 (10-review minimum).
      'estuary-chelem-trail-squamish',
      'petgill-lake-squamish',
    ],
    nullsLast: true,
    // Hikes guides also pull hiking-tagged listings from the visit category.
    extraCategorySlugs: ['visit'],
  },
  'best-hikes-whistler': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Lift, not a trail (hiking-tagged visit listing).
      'whistler-mountain-peak-chair-whistler',
      // Fewer than 10 Google reviews on Oct 19, 2026 (10-review minimum).
      'ascent-trail-whistler',
      'fitzsimmons-accessible-nature-trail-whistler',
      'valley-trail-whistler',
    ],
    nullsLast: true,
    // Hikes guides also pull hiking-tagged listings from the visit category.
    extraCategorySlugs: ['visit'],
  },
  'best-hikes-pemberton': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Same place as joffre-lakes-park-pemberton (on the Joffre Lakes trail).
      'holloway-falls-pemberton',
      // Fewer than 10 Google reviews on Oct 19, 2026 (10-review minimum).
      'one-mile-lake-hill-pemberton',
      'happy-trail-pemberton',
    ],
    nullsLast: true,
    // Hikes guides also pull hiking-tagged listings from the visit category.
    extraCategorySlugs: ['visit'],
  },
  'best-restaurants-squamish': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    // Google Maps showed both as "Temporarily closed" on Oct 19, 2026.
    // Remove from this list once they reopen.
    excludeSlugs: ['the-black-box-cuisine-squamish', 'pink-tuna-cafe-squamish'],
    nullsLast: true,
  },
  'best-restaurants-whistler': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Google Maps showed "Temporarily closed" on Oct 19, 2026. Remove once reopened.
      'brandywine-tavern-whistler',
      '200-degrees-bakery-whistler',
      // Not restaurants: pub crawl, private dining room, monthly pop up bakery, nightclubs.
      'bar-hop-whistler-whistler',
      'the-cellar-by-araxi-whistler',
      'rising-knead-bakery-whistler',
      'garfinkels-whistler-whistler',
      'moe-joes-whistler',
      'apres-apres-whistler',
      // National or international chains never go in best lists (Karl, Oct 19, 2026).
      'pizza-hut-whistler',
      'earls-kitchen-bar-whistler',
      'the-keg-steakhouse-bar-whistler-whistler',
      'blenz-coffee-whistler-whistler',
      'the-old-spaghetti-factory-whistler-whistler',
      'dairy-queen-treat-whistler',
      'dominos-pizza-whistler',
      'rocky-mtn-chocolate-whistler',
      'beavertails-queues-de-castor-whistler-whistler',
    ],
    nullsLast: true,
  },
  'best-restaurants-pemberton': {
    updatedLabel: 'October 19, 2026',
    dateModified: '2026-10-19',
    excludeSlugs: [
      // Google Maps showed "Temporarily closed" on Oct 19, 2026. Remove once reopened.
      'blackbird-bakery-pemberton',
      'sunstone-golf-club-bar-and-grill-pemberton',
      // National or international chains never go in best lists (Karl, Oct 19, 2026).
      'mcdonalds-pemberton',
    ],
    nullsLast: true,
  },
};

// Hand-picked extra entries shown under the intro on specific guides.
const GUIDE_EXTRA_PICKS: Record<string, { name: string; href: string; text: string; label?: string }[]> = {
  'best-attractions-squamish': [
    {
      name: 'Canadian Coastal Sailing',
      href: '/play/canadian-coastal-sailing-squamish',
      text: '3-hour afternoon and sunset sails on Howe Sound from Squamish, plus private charters for groups up to 12.',
    },
  ],
  'things-to-do-whistler': [
    {
      label: 'Also in Whistler',
      name: 'Escape! Whistler',
      href: '/visit/escape-whistler-whistler',
      text: 'Escape rooms in Whistler. Use code BESTSEA2SKY for $5 off your booking. We may earn a commission if you book through this link or code.',
    },
  ],
};


// Keyword-rich suffix for the meta <title>. Match longest prefix first.
const GUIDE_TITLE_SUFFIXES: Array<{ test: (slug: string) => boolean; suffix: string }> = [
  { test: (s) => s.startsWith('best-restaurants-'), suffix: 'Ranked by Real Reviews' },
  { test: (s) => s.startsWith('best-cafes-'), suffix: 'Top Coffee Shops & Roasters' },
  { test: (s) => s.startsWith('best-breweries-'), suffix: 'Top Craft Beer Spots' },
  { test: (s) => s.startsWith('best-hotels-'), suffix: 'Top-Rated Stays' },
  { test: (s) => s.startsWith('best-camping-'), suffix: 'Top Campgrounds' },
  { test: (s) => s.startsWith('best-hikes-'), suffix: 'Top Trails Guide' },
  { test: (s) => s.startsWith('best-mountain-biking-'), suffix: 'Top Trails & Bike Park Guide' },
  { test: (s) => s.startsWith('best-skiing-'), suffix: 'Top Slopes & Resorts' },
  { test: (s) => s.startsWith('best-rock-climbing-'), suffix: 'Top Routes & Crags' },
  { test: (s) => s.startsWith('best-attractions-'), suffix: 'Top Sights & Tours' },
  { test: (s) => s.startsWith('best-parks-'), suffix: 'Top Outdoor Spots' },
  { test: (s) => s.startsWith('best-waterfalls-'), suffix: 'Top Falls to Visit' },
  { test: (s) => s.startsWith('best-shopping-'), suffix: 'Top Stores & Boutiques' },
  { test: (s) => s.startsWith('things-to-do-'), suffix: 'Complete Local Guide' },
];

function stripGuideTitleSuffix(title: string): string {
  return title
    .replace(/\s*\|\s*Best Sea to Sky\s*$/i, '')
    .replace(/\s*\(\d{4}\)\s*$/i, '')
    .trim();
}

function buildGuideMetaTitle(slug: string, dbTitle: string): string {
  const base = stripGuideTitleSuffix(dbTitle);
  const match = GUIDE_TITLE_SUFFIXES.find((m) => m.test(slug));
  const suffix = match?.suffix ?? 'Sea to Sky Local Guide';
  return `${base} (${GUIDE_YEAR}) | ${suffix}`;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getSeoPageBySlug(slug);
  if (!page) return {};

  const url = `https://bestseatosky.com/guide/${slug}`;
  const ogImage = 'https://bestseatosky.com/og-default.jpg';
  const metaTitle = buildGuideMetaTitle(slug, page.title);

  return {
    title: { absolute: metaTitle },
    description: page.meta_description,
    alternates: { canonical: page.canonical_url || `/guide/${slug}` },
    openGraph: {
      title: metaTitle,
      description: page.meta_description,
      url,
      type: 'website',
      images: [{ url: ogImage, alt: metaTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: page.meta_description,
      images: [ogImage],
    },
  };
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

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = await getSeoPageBySlug(slug);
  if (!page) notFound();

  const refresh = GUIDE_REFRESH[slug];
  const listings = await getGuideListings(page, {
    excludeSlugs: refresh?.excludeSlugs,
    nullsLast: refresh?.nullsLast,
    extraCategorySlugs: refresh?.extraCategorySlugs,
  });

  const schema = omitEmptyAggregateRatings(page.schema_json || {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: page.title,
    description: page.meta_description,
    numberOfItems: listings.length,
    itemListElement: listings.map((listing, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'LocalBusiness',
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
  });

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">{page.h1_text || page.title}</span>
      </nav>

      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        {page.h1_text || page.title}
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Last updated: {refresh?.updatedLabel ?? DEFAULT_GUIDE_UPDATED_LABEL} · {listings.length} places ranked by rating &amp; popularity
      </p>

      {page.intro_content && (
        <div className="prose prose-slate max-w-none mb-10 space-y-4">
          {page.intro_content.split('\n').filter(Boolean).map((para, i) => (
            <p key={i} className="text-slate-600 leading-relaxed text-base">
              {para}
            </p>
          ))}
        </div>
      )}

      {GUIDE_EXTRA_PICKS[slug]?.length ? (
        <div className="mb-10 space-y-2">
          {GUIDE_EXTRA_PICKS[slug].map((pick) => (
            <p key={pick.href} className="text-slate-600 leading-relaxed text-base">
              {pick.label || 'Also in Squamish'}:{' '}
              <Link href={pick.href} className="font-semibold text-emerald-800 hover:underline">
                {pick.name}
              </Link>
              . {pick.text}
            </p>
          ))}
        </div>
      ) : null}

      {/* Affiliate Card (stay/accommodation guides) */}
      {(/hotel|stay|accommodation|lodge/.test(slug)) && (
        <div className="mb-10">
          <AffiliateCard
            title="Compare Sea to Sky Hotels"
            description="Not sure where to start? Compare prices across all booking sites in one search."
            linkText="Compare Hotel Prices on Trivago"
            linkUrl="https://www.awin1.com/cread.php?awinmid=66030&awinaffid=2823352&ued=https%3A%2F%2Fwww.trivago.ca%2F%3Fsearch%3DSea%2Bto%2BSky%252C%2BBC"
            disclaimerText="This is an affiliate link. Best Sea to Sky may earn a commission at no extra cost to you."
          />
        </div>
      )}

      {/* Numbered Listings */}
      <div className="flex flex-col gap-6 mb-16">
        {listings.map((listing, i) => {
          const catSlug = listing.categories?.slug || 'eat';
          const catIcon = CAT_ICONS[catSlug] || '📍';

          return (
            <Link
              key={listing.id}
              href={`/${catSlug}/${listing.slug}`}
              className="group"
            >
              <div className="flex gap-5 bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all">
                {/* Rank Number */}
                <div className="hidden sm:flex items-center justify-center w-14 shrink-0 bg-slate-50 border-r border-slate-100">
                  <span className="font-serif text-2xl font-bold text-slate-300">
                    {i + 1}
                  </span>
                </div>

                {/* Image */}
                <div className="w-32 sm:w-40 shrink-0 bg-gradient-to-br from-emerald-500 to-green-600 relative overflow-hidden">
                  <FallbackImage
                    src={listing.featured_image_url || getPlaceholderImage(catSlug)}
                    alt={getListingImageAlt(listing)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    fallbackEmoji={catIcon}
                    placeholderUrl={getPlaceholderImage(catSlug)}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 py-4 pr-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h2 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight">
                      <span className="sm:hidden text-slate-400 font-sans text-sm mr-1.5">{i + 1}.</span>
                      {listing.name}
                    </h2>
                    <PriceLevel level={listing.price_level} />
                  </div>

                  {hasRealRating(listing) && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <Stars rating={listing.google_rating} />
                      <span className="text-sm font-bold text-slate-700">{listing.google_rating.toFixed(1)}</span>
                      <span className="text-xs text-slate-400">
                        ({(listing.google_review_count || 0).toLocaleString()})
                      </span>
                    </div>
                  )}

                  {getListingOffer(listing.slug) && (
                    <p className="mb-2">
                      <span className="inline-block rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                        {getListingOffer(listing.slug)!.badge}
                      </span>
                    </p>
                  )}
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-2">
                    {listing.short_description || listing.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    {listing.address && (
                      <span className="flex items-center gap-1">
                        <span>📍</span> {listing.address}
                      </span>
                    )}
                    {listing.phone && (
                      <span className="hidden md:flex items-center gap-1">
                        <span>📞</span> {listing.phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {listings.length === 0 && (
        <p className="text-slate-500 text-center py-12">No listings found for this guide yet.</p>
      )}

      {/* FAQ Section */}
      {page.faq_json && Array.isArray(page.faq_json) && page.faq_json.length > 0 && (
        <FaqSection faqs={page.faq_json} />
      )}

      {/* About This Guide */}
      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">About This Guide</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          This guide is curated from {listings.length} top-rated places in the Sea to Sky corridor,
          ranked by Google rating and review count. We update our rankings regularly to reflect the
          latest reviews and community feedback. All information is sourced from verified business
          listings and real visitor reviews.
        </p>
      </div>

      <TripPlannerCapture source="guide" variant="default" className="mt-8" />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bestseatosky.com' },
              { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://bestseatosky.com/guide' },
              { '@type': 'ListItem', position: 3, name: page.h1_text || page.title, item: `https://bestseatosky.com/guide/${slug}` },
            ],
          }),
        }}
      />

      {/* WebPage Schema (dated refreshes only) */}
      {refresh && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: page.h1_text || page.title,
              url: `https://bestseatosky.com/guide/${slug}`,
              dateModified: refresh.dateModified,
            }),
          }}
        />
      )}

      {/* ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* FAQ Schema */}
      {page.faq_json && Array.isArray(page.faq_json) && page.faq_json.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: page.faq_json.map((faq: { question: string; answer: string }) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            }),
          }}
        />
      )}
    </section>
  );
}
