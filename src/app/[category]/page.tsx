import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCategoryBySlug, getListings, getTagsByCategory, getTowns, getFeaturesAvailableInCategory, getCuisineCounts } from '@/lib/data';
import Link from 'next/link';
import FilterBar from './FilterBar';
import FeaturePills from '@/components/FeaturePills';
import CuisinePills from '@/components/CuisinePills';
import NewsletterSignup from '@/components/NewsletterSignup';
import { TrustStrip } from '@/components/SocialProof';

const EAT_TITLE = 'Best Restaurants in Squamish, Whistler & Pemberton';
const EAT_OG_TITLE = 'Best Sea to Sky | Hand-Picked Restaurants in Squamish, Whistler & Pemberton';
const EAT_DESCRIPTION =
  'Best Sea to Sky is a hand-picked dining guide for Squamish, Whistler, and Pemberton. Listings show real Google ratings and review counts when available.';

const CAT_ICONS: Record<string, string> = {
  eat: '🍽️',
  stay: '🏔️',
  play: '⛷️',
  visit: '🌲',
  shop: '🛍️',
  services: '🧭',
};

const CAT_VERBS: Record<string, string> = {
  eat: 'Eat',
  stay: 'Stay',
  play: 'Play',
  visit: 'Visit',
  shop: 'Shop',
  services: 'Find Services',
};

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ town?: string; tag?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return {};

  const title = category.slug === 'eat'
    ? EAT_TITLE
    : `Best Places to ${CAT_VERBS[category.slug] || category.name} in Sea to Sky`;
  const description = category.slug === 'eat'
    ? EAT_DESCRIPTION
    : `Discover the best ${category.description?.toLowerCase() || 'places'} across Squamish, Whistler, and Pemberton in the Sea to Sky corridor.`;
  const ogTitle = category.slug === 'eat' ? EAT_OG_TITLE : title;
  const ogImage = `https://bestseatosky.com/og-${category.slug}.jpg`;

  return {
    title,
    description,
    alternates: { canonical: `/${categorySlug}` },
    openGraph: {
      title: ogTitle,
      description,
      url: `https://bestseatosky.com/${category.slug}`,
      siteName: 'Best Sea to Sky',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: category.slug === 'eat'
            ? 'Best Sea to Sky hand-picked restaurants in Squamish, Whistler, and Pemberton'
            : `Best places to ${(CAT_VERBS[category.slug] || category.name).toLowerCase()} in the Sea to Sky corridor`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

// Tell Next.js which category pages to pre-build
export async function generateStaticParams() {
  return [
    { category: 'eat' },
    { category: 'stay' },
    { category: 'play' },
    { category: 'visit' },
    { category: 'shop' },
    { category: 'services' },
  ];
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category: categorySlug } = await params;
  const { town, tag } = await searchParams;

  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const [listings, tags, towns, features, cuisineCounts] = await Promise.all([
    getListings({ categorySlug }),
    getTagsByCategory(category.id),
    getTowns(),
    getFeaturesAvailableInCategory(categorySlug),
    categorySlug === 'eat' ? getCuisineCounts() : Promise.resolve({} as Record<string, number>),
  ]);

  // Client-side filtering is handled by FilterBar
  // Server fetches all listings for this category

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mb-3">
          {categorySlug === 'eat'
            ? EAT_TITLE
            : `Best Places to ${CAT_VERBS[categorySlug] || category.name}`}
        </h1>
        {categorySlug === 'eat' ? (
          <>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl">
              Best Sea to Sky is a hand-picked dining guide for the Sea to Sky corridor.
              These restaurants are selected for Squamish, Whistler, and Pemberton, and
              each listing shows its Google rating and review count when Google has one.
            </p>
            <p className="text-slate-500 text-sm mt-3">
              {listings.length} restaurants in the directory
            </p>
          </>
        ) : (
          <p className="text-slate-500">
            {listings.length} places across the Sea to Sky corridor
          </p>
        )}
      </div>

      {categorySlug === 'eat' && (
        <div className="mb-8 rounded-2xl border border-orange-200 bg-orange-50/70 p-5 md:p-6 max-w-3xl">
          <h2 className="font-serif text-lg font-bold text-slate-900 mb-2">
            How Best Sea to Sky picks restaurants
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We hand-select places we would send a friend to in Squamish, Whistler, and Pemberton.
            Ratings and review counts on this page come from Google when they are available.
            Featured placement can add visibility. It never changes the Google score you see.
          </p>
        </div>
      )}

      {/* Town Guide Links (eat) */}
      {categorySlug === 'eat' && (
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/eat/squamish"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 hover:border-amber-300 hover:text-amber-800 transition-colors shadow-sm"
          >
            See Squamish restaurants <span className="text-amber-600">&rarr;</span>
          </Link>
          <Link
            href="/eat/whistler"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 hover:border-amber-300 hover:text-amber-800 transition-colors shadow-sm"
          >
            See Whistler restaurants <span className="text-amber-600">&rarr;</span>
          </Link>
          <Link
            href="/eat/pemberton"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 hover:border-amber-300 hover:text-amber-800 transition-colors shadow-sm"
          >
            See Pemberton restaurants <span className="text-amber-600">&rarr;</span>
          </Link>
        </div>
      )}

      {/* Town Guide Links (stay) */}
      {categorySlug === 'stay' && (
        <div className="flex flex-wrap gap-3 mb-8">
          <Link
            href="/stay/squamish"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 hover:border-indigo-300 hover:text-indigo-800 transition-colors shadow-sm"
          >
            Where to stay in Squamish <span className="text-indigo-600">&rarr;</span>
          </Link>
          <Link
            href="/stay/whistler"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 hover:border-indigo-300 hover:text-indigo-800 transition-colors shadow-sm"
          >
            Where to stay in Whistler <span className="text-indigo-600">&rarr;</span>
          </Link>
        </div>
      )}

      {/* Trust Strip */}
      <div className="mb-8">
        <TrustStrip />
      </div>

      {/* Browse by cuisine (eat only) */}
      {categorySlug === 'eat' && <CuisinePills counts={cuisineCounts} />}

      {/* Feature filter pills */}
      <FeaturePills categorySlug={categorySlug} features={features} />

      {/* Filters + Grid */}
      <FilterBar
        listings={listings}
        tags={tags}
        towns={towns}
        categorySlug={categorySlug}
        initialTown={town}
        initialTag={tag}
      />

      {/* Newsletter Signup */}
      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 mt-12 text-center">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">
          Get the Free Sea to Sky Trip Planner
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Local restaurant picks, must-do trails, and insider tips — delivered to your inbox.
        </p>
        <NewsletterSignup source={`category-${categorySlug}`} />
      </div>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://bestseatosky.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: category.name,
                item: `https://bestseatosky.com/${categorySlug}`,
              },
            ],
          }),
        }}
      />

      {categorySlug === 'eat' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              '@id': 'https://bestseatosky.com/eat#webpage',
              url: 'https://bestseatosky.com/eat',
              name: EAT_TITLE,
              description: EAT_DESCRIPTION,
              isPartOf: {
                '@type': 'WebSite',
                name: 'Best Sea to Sky',
                url: 'https://bestseatosky.com',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Best Sea to Sky',
                url: 'https://bestseatosky.com',
              },
            }),
          }}
        />
      )}

      {/* ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: categorySlug === 'eat'
              ? 'Best Sea to Sky hand-picked restaurants in Squamish, Whistler, and Pemberton'
              : `Best Places to ${CAT_VERBS[categorySlug] || category.name} in Sea to Sky`,
            description: categorySlug === 'eat' ? EAT_DESCRIPTION : category.description,
            numberOfItems: listings.length,
            itemListElement: listings.slice(0, 20).map((listing, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: listing.name,
              url: `https://bestseatosky.com/${categorySlug}/${listing.slug}`,
            })),
          }),
        }}
      />
    </section>
  );
}
