import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSeoPageBySlug, getGuideListings } from '@/lib/data';
import { getPlaceholderImage } from '@/lib/supabase';
import NewsletterSignup from '@/components/NewsletterSignup';
import { TrustStrip } from '@/components/SocialProof';
import dynamic from 'next/dynamic';
const FaqSection = dynamic(() => import('@/components/FaqSection'));
import FallbackImage from '@/components/FallbackImage';
import AffiliateCard from '@/components/AffiliateCard';

const CAT_ICONS: Record<string, string> = {
  eat: '🍽️',
  stay: '🏔️',
  play: '⛷️',
  visit: '🌲',
  shop: '🛍️',
  services: '🧭',
};

const GUIDE_YEAR = '2026';

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

function PriceLevel({ level }: { level: number }) {
  if (level === 0) return <span className="text-emerald-600 font-semibold text-xs">Free</span>;
  return (
    <span className="text-xs">
      {[...Array(4)].map((_, i) => (
        <span key={i} className={i < level ? 'text-slate-800 font-bold' : 'text-slate-300'}>$</span>
      ))}
    </span>
  );
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const page = await getSeoPageBySlug(slug);
  if (!page) notFound();

  const listings = await getGuideListings(page);

  const schema = page.schema_json || {
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
        <span className="text-slate-600">{page.h1_text || page.title}</span>
      </nav>

      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        {page.h1_text || page.title}
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Last updated: February 2026 · {listings.length} places ranked by rating &amp; popularity
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

      {/* Trust Strip */}
      <div className="mb-10">
        <TrustStrip />
      </div>

      {/* Affiliate Card (hiking guides) */}
      {slug.startsWith('best-hikes') && (
        <div className="mb-10">
          <AffiliateCard
            title="Gear Up for Your Hike"
            description="Heading out on the trails? Make sure you've got the right footwear."
            linkText="Shop Hiking Boots"
            linkUrl="https://amzn.to/4bCVgtS"
          />
        </div>
      )}

      {/* Affiliate Card (climbing guides) */}
      {slug.startsWith('best-rock-climbing') && (
        <div className="mb-10">
          <AffiliateCard
            title="Gear Up for Your Climb"
            description="Heading to the Chief or the Smoke Bluffs? Make sure you've got the right gear."
            linkText="Shop Climbing Gear"
            linkUrl="https://amzn.to/4sJHYDa"
          />
        </div>
      )}

      {/* Affiliate Card (mountain biking guides) */}
      {slug.startsWith('best-mountain-biking') && (
        <div className="mb-10">
          <AffiliateCard
            title="Gear Up for the Trails"
            description="Squamish trails demand the right kit. Don't hit the dirt without it."
            linkText="Shop Mountain Bike Gear"
            linkUrl="https://amzn.to/40TLb7e"
          />
        </div>
      )}

      {/* Affiliate Card (skiing guides) */}
      {slug.startsWith('best-skiing') && (
        <div className="mb-10">
          <AffiliateCard
            title="Hit the Slopes Ready"
            description="Whistler Blackcomb demands the right gear. Get kitted out before your first run."
            linkText="Shop Ski & Snowboard Gear"
            linkUrl="https://amzn.to/3PvFlq1"
          />
        </div>
      )}

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
                    alt={listing.name}
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
                    <PriceLevel level={listing.price_level || 0} />
                  </div>

                  {listing.google_rating && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <Stars rating={listing.google_rating} />
                      <span className="text-sm font-bold text-slate-700">{listing.google_rating.toFixed(1)}</span>
                      <span className="text-xs text-slate-400">
                        ({(listing.google_review_count || 0).toLocaleString()})
                      </span>
                    </div>
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

      {/* Affiliate Card — backpacks (hiking + climbing guides) */}
      {(slug.startsWith('best-hikes') || slug.startsWith('best-rock-climbing')) && (
        <div className="mb-10">
          <AffiliateCard
            title="Pack Right for the Trail"
            description="A good backpack makes all the difference on Sea to Sky trails."
            linkText="Shop Hiking & Climbing Packs"
            linkUrl="https://amzn.to/47ILWUv"
          />
        </div>
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

      {/* Newsletter Signup */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 mt-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-2 text-center">
          Want more local picks?
        </h2>
        <p className="text-sm text-slate-500 text-center mb-6">
          Get the free Sea to Sky Trip Planner — restaurant recs, trail guides, and insider tips.
        </p>
        <NewsletterSignup source="guide" />
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
              { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://bestseatosky.com/guide' },
              { '@type': 'ListItem', position: 3, name: page.h1_text || page.title, item: `https://bestseatosky.com/guide/${slug}` },
            ],
          }),
        }}
      />

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
