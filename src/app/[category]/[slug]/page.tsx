import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getListingBySlug, getRelatedListings, getCrossCategoryListings } from '@/lib/data';
import { buildUTMUrl } from '@/lib/utm';

const CAT_STYLES: Record<string, { gradient: string; bg: string; text: string; border: string; accent: string }> = {
  eat: { gradient: 'from-orange-500 to-red-600', bg: 'bg-orange-50', text: 'text-amber-700', border: 'border-orange-200', accent: 'bg-amber-700' },
  stay: { gradient: 'from-indigo-500 to-purple-600', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', accent: 'bg-indigo-700' },
  play: { gradient: 'from-emerald-500 to-green-600', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', accent: 'bg-emerald-700' },
  visit: { gradient: 'from-pink-500 to-rose-600', bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', accent: 'bg-pink-700' },
  shop: { gradient: 'from-amber-500 to-red-500', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', accent: 'bg-orange-700' },
  services: { gradient: 'from-sky-500 to-indigo-600', bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', accent: 'bg-sky-700' },
};

const CAT_ICONS: Record<string, string> = {
  eat: '🍽️',
  stay: '🏔️',
  play: '⛷️',
  visit: '🌲',
  shop: '🛍️',
  services: '🧭',
};

type Props = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return {};

  const title = listing.meta_title || `${listing.name} | Best Sea to Sky`;
  const description = listing.meta_description || listing.short_description || listing.description?.slice(0, 160);
  const catSlug = listing.categories?.slug || category;
  const url = `https://bestseatosky.com/${catSlug}/${listing.slug}`;

  return {
    title,
    description,
    openGraph: {
      title: listing.name,
      description,
      url,
      type: 'website',
      ...(listing.featured_image_url && {
        images: [{ url: listing.featured_image_url, alt: listing.name }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: listing.name,
      description,
      ...(listing.featured_image_url && {
        images: [listing.featured_image_url],
      }),
    },
  };
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-px">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-base ${i < Math.floor(rating) ? 'text-amber-400' : 'text-slate-200'}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function PriceLevel({ level }: { level: number }) {
  if (level === 0) return <span className="text-emerald-600 font-semibold text-sm">Free</span>;
  return (
    <span className="text-sm">
      {[...Array(4)].map((_, i) => (
        <span key={i} className={i < level ? 'text-slate-800 font-bold' : 'text-slate-300'}>$</span>
      ))}
    </span>
  );
}

export default async function ListingPage({ params }: Props) {
  const { category: categorySlug, slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) notFound();

  const catSlug = listing.categories?.slug || categorySlug;
  const styles = CAT_STYLES[catSlug] || CAT_STYLES.eat;
  const tags = listing.listing_tags?.map((lt) => lt.tags) || [];

  const details = [
    { label: 'Address', value: listing.address, icon: '📍' },
    ...(listing.phone ? [{ label: 'Phone', value: listing.phone, icon: '📞' }] : []),
    ...(listing.website ? [{ label: 'Website', value: listing.website, icon: '🌐' }] : []),
    ...(listing.email ? [{ label: 'Email', value: listing.email, icon: '✉️' }] : []),
  ];

  // Fetch related listings
  const [relatedListings, crossCategoryListings] = await Promise.all([
    getRelatedListings(listing.id, listing.town_id, listing.category_id),
    getCrossCategoryListings(listing.id, listing.town_id, listing.category_id),
  ]);

  // Build schema markup
  const schema = listing.schema_json || {
    '@context': 'https://schema.org',
    '@type': listing.schema_type || 'LocalBusiness',
    name: listing.name,
    description: listing.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      addressLocality: listing.towns?.name || 'Sea to Sky',
      addressRegion: 'BC',
      addressCountry: 'CA',
    },
    ...(listing.google_rating && listing.google_review_count > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: listing.google_rating,
        reviewCount: listing.google_review_count,
      },
    }),
    ...(listing.phone && { telephone: listing.phone }),
    url: `https://bestseatosky.com/${catSlug}/${listing.slug}`,
    priceRange: listing.price_level === 0 ? 'Free' : '$'.repeat(listing.price_level),
    ...(listing.website && { sameAs: [listing.website] }),
    ...(listing.featured_image_url && { image: listing.featured_image_url }),
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <Link href={`/${catSlug}`} className="hover:text-slate-600 transition-colors capitalize">{catSlug}</Link>
        <span>›</span>
        <span className="text-slate-600">{listing.name}</span>
      </nav>

      {/* Hero Image */}
      <div className={`h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br ${styles.gradient} relative mb-10`}>
        {listing.featured_image_url ? (
          <img
            src={listing.featured_image_url}
            alt={listing.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-8xl opacity-15 saturate-0 brightness-200">
              {CAT_ICONS[catSlug]}
            </span>
          </div>
        )}
        <div className="absolute bottom-6 left-6">
          <span className={`${styles.bg} rounded-full px-4 py-1.5 text-xs font-semibold ${styles.text} uppercase tracking-wide`}>
            {listing.towns?.name || 'Sea to Sky'}
          </span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {listing.name}
          </h1>

          {/* Rating Row */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            {listing.google_rating && (
              <div className="flex items-center gap-2">
                <Stars rating={listing.google_rating} />
                <span className="text-base font-bold text-slate-900">{listing.google_rating.toFixed(1)}</span>
                <span className="text-sm text-slate-400">({listing.google_review_count?.toLocaleString()} reviews)</span>
              </div>
            )}
            {listing.google_rating && <span className="text-slate-200">|</span>}
            <PriceLevel level={listing.price_level || 0} />
          </div>

          {/* Description */}
          <div className="prose prose-slate max-w-none mb-8">
            <p className="text-slate-600 leading-relaxed text-base">
              {listing.description || listing.short_description}
            </p>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-10">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className={`${styles.bg} ${styles.text} text-sm font-semibold rounded-full px-4 py-1.5 border ${styles.border}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 sticky top-24">
            <h3 className="font-serif text-lg text-slate-900 mb-5">Details</h3>

            {details.map((item) => (
              <div key={item.label} className="flex gap-3 mb-4 pb-4 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-sm text-slate-800">{item.value}</div>
                </div>
              </div>
            ))}

            {listing.address && (
              <a
                href={buildUTMUrl(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.address)}`,
                  { campaign: catSlug, content: listing.slug }
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center py-3.5 rounded-xl text-white text-sm font-bold mt-5 transition-opacity hover:opacity-90 ${styles.accent}`}
              >
                Get Directions →
              </a>
            )}

            {listing.website && (
              <a
                href={buildUTMUrl(listing.website, { campaign: catSlug, content: listing.slug })}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3.5 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold mt-3 transition-colors hover:bg-slate-100"
              >
                Visit Website ↗
              </a>
            )}

            <a
              href={`mailto:hello@bestseatosky.com?subject=${encodeURIComponent(`Claim: ${listing.name}`)}&body=${encodeURIComponent(`I'd like to claim the listing for ${listing.name} at bestseatosky.com/${catSlug}/${listing.slug}`)}`}
              className="block text-center text-xs text-slate-400 hover:text-slate-600 transition-colors mt-5"
            >
              Is this your business?
            </a>
          </div>
        </div>
      </div>

      {/* More in [Town] */}
      {relatedListings.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">
            More in {listing.towns?.name || 'This Area'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedListings.map((related) => {
              const rCatSlug = related.categories?.slug || catSlug;
              const rStyles = CAT_STYLES[rCatSlug] || CAT_STYLES.eat;
              return (
                <Link key={related.id} href={`/${rCatSlug}/${related.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className={`h-32 bg-gradient-to-br ${rStyles.gradient} relative overflow-hidden`}>
                      {related.featured_image_url ? (
                        <img
                          src={related.featured_image_url}
                          alt={related.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl opacity-15 saturate-0 brightness-200">
                            {CAT_ICONS[rCatSlug]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-serif text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight line-clamp-1">
                        {related.name}
                      </h3>
                      {related.google_rating && (
                        <div className="flex items-center gap-1 mt-1">
                          <Stars rating={related.google_rating} />
                          <span className="text-xs font-bold text-slate-700">{related.google_rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* You Might Also Like */}
      {crossCategoryListings.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {crossCategoryListings.map((item) => {
              const iCatSlug = item.categories?.slug || 'eat';
              const iStyles = CAT_STYLES[iCatSlug] || CAT_STYLES.eat;
              return (
                <Link key={item.id} href={`/${iCatSlug}/${item.slug}`} className="group">
                  <div className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all">
                    <div className={`h-36 bg-gradient-to-br ${iStyles.gradient} relative overflow-hidden`}>
                      {item.featured_image_url ? (
                        <img
                          src={item.featured_image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl opacity-15 saturate-0 brightness-200">
                            {CAT_ICONS[iCatSlug]}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className={`${iStyles.bg} rounded-full px-2.5 py-1 text-[10px] font-semibold ${iStyles.text} uppercase tracking-wide`}>
                          {item.categories?.name || iCatSlug}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-serif text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight line-clamp-1">
                        {item.name}
                      </h3>
                      {item.google_rating && (
                        <div className="flex items-center gap-1 mt-1">
                          <Stars rating={item.google_rating} />
                          <span className="text-xs font-bold text-slate-700">{item.google_rating.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
