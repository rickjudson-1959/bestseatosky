import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSeoPageBySlug, getGuideListings } from '@/lib/data';

const CAT_ICONS: Record<string, string> = {
  eat: '🍽️',
  stay: '🏔️',
  play: '⛷️',
  visit: '🌲',
  shop: '🛍️',
  services: '🧭',
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getSeoPageBySlug(slug);
  if (!page) return {};

  const url = `https://bestseatosky.com/guide/${slug}`;
  const ogImage = 'https://bestseatosky.com/og-default.jpg';

  return {
    title: page.title,
    description: page.meta_description,
    ...(page.canonical_url && {
      alternates: { canonical: page.canonical_url },
    }),
    openGraph: {
      title: page.title,
      description: page.meta_description,
      url,
      type: 'website',
      images: [{ url: ogImage, alt: page.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
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
        ...(listing.google_rating && {
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
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-slate-600 leading-relaxed text-base">
            {page.intro_content}
          </p>
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
                  {listing.featured_image_url ? (
                    <img
                      src={listing.featured_image_url}
                      alt={listing.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl opacity-20 saturate-0 brightness-200">
                        {catIcon}
                      </span>
                    </div>
                  )}
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

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
