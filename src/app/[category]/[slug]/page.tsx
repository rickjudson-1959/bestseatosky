import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getListingBySlug, getRelatedListings, getCrossCategoryListings, getGuidesForListing, getListingFeatures } from '@/lib/data';
import { FEATURE_BY_SLUG } from '@/lib/features';
import { getPlaceholderImage } from '@/lib/supabase';
import { buildUTMUrl } from '@/lib/utm';
import FeaturedInGuides from '@/components/FeaturedInGuides';
import FallbackImage from '@/components/FallbackImage';
import FaqSection from '@/components/FaqSection';
import OpenStatusBadge from '@/components/OpenStatusBadge';

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

  const townName = listing.towns?.name;
  // If meta_title already contains the brand name, use it raw to avoid duplication from the layout template
  const rawTitle = listing.meta_title;
  const title = rawTitle
    ? (rawTitle.includes('Best Sea to Sky') ? { absolute: rawTitle } : rawTitle)
    : (townName ? `${listing.name} in ${townName}` : listing.name);
  // Build a unique meta description from listing data
  const catSlug = listing.categories?.slug || category;
  const catNoun: Record<string, string> = {
    eat: 'restaurants', stay: 'places to stay', play: 'activities',
    visit: 'attractions', shop: 'shops', services: 'services',
  };
  const locationStr = townName ? `in ${townName}` : 'in the Sea to Sky corridor';
  const ratingStr = listing.google_rating
    ? ` -- rated ${listing.google_rating.toFixed(1)} stars from ${(listing.google_review_count || 0).toLocaleString()} Google reviews`
    : '';
  const similarStr = `similar ${catNoun[catSlug] || 'places'} in the Sea to Sky corridor`;

  // Use custom meta_description only if it looks hand-written (not a generic template)
  const storedMeta = listing.meta_description || '';
  const isTemplated = storedMeta.startsWith('Discover ') && storedMeta.includes('Ratings, reviews, hours');
  const description = (!isTemplated && storedMeta)
    ? storedMeta
    : `${listing.name} ${locationStr}${ratingStr}. Hours, directions, and ${similarStr}.`;
  const url = `https://bestseatosky.com/${catSlug}/${listing.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/${catSlug}/${listing.slug}` },
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

  // Show clean domain for website display (strip protocol, query params, trailing slash)
  const cleanWebsite = listing.website
    ? (() => {
        try {
          const url = new URL(listing.website);
          return (url.hostname + url.pathname).replace(/\/$/, '').replace(/^www\./, '');
        } catch {
          return listing.website;
        }
      })()
    : null;

  const details = [
    { label: 'Address', value: listing.address, icon: '📍' },
    ...(listing.phone ? [{ label: 'Phone', value: listing.phone, icon: '📞' }] : []),
    ...(cleanWebsite ? [{ label: 'Website', value: cleanWebsite, icon: '🌐' }] : []),
    ...(listing.email ? [{ label: 'Email', value: listing.email, icon: '✉️' }] : []),
  ];

  const tagIds = tags.map((t) => t.id);

  // Fetch related listings, guides, and features
  const [relatedListings, crossCategoryListings, featuredGuides, features] = await Promise.all([
    getRelatedListings(listing.id, listing.town_id, listing.category_id),
    getCrossCategoryListings(listing.id, listing.town_id, listing.category_id),
    getGuidesForListing(listing.category_id, listing.town_id, tagIds),
    getListingFeatures(listing.id),
  ]);

  // Build enriched schema markup
  const schemaTypeMap: Record<string, string> = {
    eat: 'Restaurant',
    stay: 'LodgingBusiness',
    play: 'SportsActivityLocation',
    visit: 'TouristAttraction',
    shop: 'Store',
    services: 'LocalBusiness',
  };

  const dayMap: Record<string, string> = {
    monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday',
    thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
  };

  const openingHours = listing.hours
    ? Object.entries(listing.hours)
        .filter(([, times]) => times && times.open && times.close)
        .map(([day, times]) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: dayMap[day.toLowerCase()] || day,
          opens: times.open,
          closes: times.close,
        }))
    : undefined;

  const tagNames = tags.map((t) => t.name);
  const priceRange = listing.price_level === 0 ? 'Free' : '$'.repeat(listing.price_level);

  const baseSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': listing.schema_type || schemaTypeMap[catSlug] || 'LocalBusiness',
    name: listing.name,
    description: listing.description,
    url: `https://bestseatosky.com/${catSlug}/${listing.slug}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      ...(listing.towns?.name && { addressLocality: listing.towns.name }),
      addressRegion: 'BC',
      addressCountry: 'CA',
    },
    ...(listing.latitude && listing.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: listing.latitude,
        longitude: listing.longitude,
      },
    }),
    ...(listing.google_rating && listing.google_review_count > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: listing.google_rating,
        reviewCount: listing.google_review_count,
      },
    }),
    ...(listing.phone && { telephone: listing.phone }),
    ...(listing.featured_image_url && { image: listing.featured_image_url }),
    ...(listing.website && { sameAs: [listing.website] }),
    priceRange,
  };

  if (catSlug === 'eat') {
    if (tagNames.length > 0) baseSchema.servesCuisine = tagNames;
    if (openingHours) baseSchema.openingHoursSpecification = openingHours;
  } else if (catSlug === 'stay') {
    if (tagNames.length > 0) {
      baseSchema.amenityFeature = tagNames.map((name) => ({
        '@type': 'LocationFeatureSpecification', name, value: true,
      }));
    }
  } else if (catSlug === 'play' || catSlug === 'visit') {
    if (tagNames.length > 0) baseSchema.touristType = tagNames;
    if (listing.price_level === 0) baseSchema.isAccessibleForFree = true;
    baseSchema.publicAccess = true;
  } else {
    if (openingHours) baseSchema.openingHoursSpecification = openingHours;
  }

  const schema = listing.schema_json || baseSchema;

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
        <FallbackImage
          src={listing.featured_image_url || getPlaceholderImage(catSlug)}
          alt={listing.name}
          className="w-full h-full object-cover"
          fallbackEmoji={CAT_ICONS[catSlug]}
          placeholderUrl={getPlaceholderImage(catSlug)}
        />
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
            {listing.hours && Object.keys(listing.hours).length > 0 && (
              <>
                <span className="text-slate-200">|</span>
                <OpenStatusBadge hours={listing.hours} />
              </>
            )}
          </div>

          {/* Description */}
          <div
            className="prose prose-slate max-w-none mb-8 text-slate-600 leading-relaxed text-base"
            dangerouslySetInnerHTML={{ __html: listing.description || listing.short_description || '' }}
          />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-6">
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

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-10">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Features
              </div>
              <div className="flex gap-2 flex-wrap">
                {features.map((f) => {
                  const def = FEATURE_BY_SLUG[f.feature_slug];
                  return (
                    <Link
                      key={f.id}
                      href={`/${catSlug}/with/${f.feature_slug}`}
                      className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-full px-3 py-1.5 hover:border-emerald-300 hover:text-emerald-800 transition-colors"
                    >
                      <span>{def?.icon ?? '✨'}</span>
                      <span>{f.feature_name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Featured In Guides */}
          <FeaturedInGuides guides={featuredGuides} listingName={listing.name} />
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

            {/* Claim Your Business CTA */}
            <div className="mt-6 bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="font-serif text-base font-bold text-slate-900 mb-1.5">
                Is this your business?
              </h4>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Claim this listing to update your description, add photos, and ensure your info is accurate. Free to get started.
              </p>
              <a
                href={`mailto:hello@bestseatosky.com?subject=${encodeURIComponent(`Claim My Listing: ${listing.name}`)}&body=${encodeURIComponent(`Hi,\n\nI'd like to claim the listing for ${listing.name} on Best Sea to Sky.\n\nListing: https://bestseatosky.com/${catSlug}/${listing.slug}\n\nMy name:\nMy role at the business:\nEmail:\nPhone:\n\nThanks!`)}`}
                className="block w-full text-center py-3 rounded-xl bg-slate-900 text-white text-sm font-bold transition-colors hover:bg-slate-800"
              >
                Claim This Listing
              </a>
              <Link
                href="/get-listed"
                className="block text-center text-xs text-slate-400 hover:text-emerald-700 transition-colors mt-3"
              >
                Want more visibility? See paid options →
              </Link>
            </div>
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
                      <FallbackImage
                        src={related.featured_image_url || getPlaceholderImage(rCatSlug)}
                        alt={related.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        fallbackEmoji={CAT_ICONS[rCatSlug]}
                        placeholderUrl={getPlaceholderImage(rCatSlug)}
                      />
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
                      <FallbackImage
                        src={item.featured_image_url || getPlaceholderImage(iCatSlug)}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        fallbackEmoji={CAT_ICONS[iCatSlug]}
                        placeholderUrl={getPlaceholderImage(iCatSlug)}
                      />
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

      {/* FAQ Section */}
      {listing.faq_json && Array.isArray(listing.faq_json) && listing.faq_json.length > 0 && (
        <FaqSection faqs={listing.faq_json} />
      )}

      {/* FAQ Schema */}
      {listing.faq_json && Array.isArray(listing.faq_json) && listing.faq_json.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: listing.faq_json.map((faq: { question: string; answer: string }) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            }),
          }}
        />
      )}

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bestseatosky.com' },
              { '@type': 'ListItem', position: 2, name: listing.categories?.name || catSlug, item: `https://bestseatosky.com/${catSlug}` },
              { '@type': 'ListItem', position: 3, name: listing.name, item: `https://bestseatosky.com/${catSlug}/${listing.slug}` },
            ],
          }),
        }}
      />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
