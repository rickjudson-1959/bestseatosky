import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCategoryBySlug, getListings, getTagsByCategory, getTowns } from '@/lib/data';
import ListingCard from '@/components/ListingCard';
import FilterBar from './FilterBar';
import NewsletterSignup from '@/components/NewsletterSignup';
import { TrustStrip } from '@/components/SocialProof';

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

  const title = `Best Places to ${CAT_VERBS[category.slug] || category.name} in Sea to Sky`;
  const description = `Discover the best ${category.description?.toLowerCase() || 'places'} across Squamish, Whistler, and Pemberton in the Sea to Sky corridor.`;
  const ogImage = `https://bestseatosky.com/og-${category.slug}.jpg`;

  return {
    title,
    description,
    alternates: { canonical: `/${categorySlug}` },
    openGraph: {
      title,
      description,
      url: `https://bestseatosky.com/${category.slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Best places to ${(CAT_VERBS[category.slug] || category.name).toLowerCase()} in the Sea to Sky corridor`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
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

  const [listings, tags, towns] = await Promise.all([
    getListings({ categorySlug }),
    getTagsByCategory(category.id),
    getTowns(),
  ]);

  // Client-side filtering is handled by FilterBar
  // Server fetches all listings for this category

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mb-2">
          Best Places to {CAT_VERBS[categorySlug] || category.name}
        </h1>
        <p className="text-slate-500">
          {listings.length} places across the Sea to Sky corridor
        </p>
      </div>

      {/* Trust Strip */}
      <div className="mb-8">
        <TrustStrip />
      </div>

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

      {/* ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `Best Places to ${CAT_VERBS[categorySlug] || category.name} in Sea to Sky`,
            description: category.description,
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
