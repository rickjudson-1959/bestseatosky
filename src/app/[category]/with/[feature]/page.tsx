import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  getCategoryBySlug,
  getListingsByFeature,
  getFeaturesAvailableInCategory,
} from '@/lib/data';
import ListingCard from '@/components/ListingCard';
import FeaturePills from '@/components/FeaturePills';
import NewsletterSignup from '@/components/NewsletterSignup';
import { TrustStrip } from '@/components/SocialProof';
import { getFeature } from '@/lib/features';

const CAT_VERBS: Record<string, string> = {
  eat: 'restaurants',
  stay: 'places to stay',
  play: 'activities',
  visit: 'attractions',
  shop: 'shops',
  services: 'services',
};

type Props = {
  params: Promise<{ category: string; feature: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, feature: featureSlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  const feature = getFeature(featureSlug);
  if (!category || !feature) return {};

  const noun = CAT_VERBS[categorySlug] || category.name.toLowerCase();
  const title = `Best ${feature.name} ${noun} in the Sea to Sky corridor`;
  const description = `Curated ${noun} with ${feature.name.toLowerCase()} across Squamish, Whistler, and Pemberton.`;
  const url = `https://bestseatosky.com/${categorySlug}/with/${featureSlug}`;

  return {
    title,
    description,
    alternates: { canonical: `/${categorySlug}/with/${featureSlug}` },
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function FeatureFilterPage({ params }: Props) {
  const { category: categorySlug, feature: featureSlug } = await params;
  const category = await getCategoryBySlug(categorySlug);
  const feature = getFeature(featureSlug);
  if (!category || !feature) notFound();

  const [listings, allFeatures] = await Promise.all([
    getListingsByFeature(categorySlug, featureSlug),
    getFeaturesAvailableInCategory(categorySlug),
  ]);

  const noun = CAT_VERBS[categorySlug] || category.name.toLowerCase();

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <Link href={`/${categorySlug}`} className="hover:text-slate-600 transition-colors capitalize">
          {category.name}
        </Link>
        <span>›</span>
        <span className="text-slate-600">{feature.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mb-2">
          {feature.icon} Best {feature.name.toLowerCase()} {noun} in Sea to Sky
        </h1>
        <p className="text-slate-500">
          {listings.length} {listings.length === 1 ? 'place' : 'places'} across Squamish, Whistler, and Pemberton
          {' '}with {feature.name.toLowerCase()}.
        </p>
      </div>

      <div className="mb-8">
        <TrustStrip />
      </div>

      <FeaturePills categorySlug={categorySlug} features={allFeatures} activeSlug={featureSlug} />

      {listings.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
          <p className="text-slate-500 mb-4">
            We haven&apos;t tagged any {noun} with {feature.name.toLowerCase()} yet.
          </p>
          <Link
            href={`/${categorySlug}`}
            className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold hover:text-emerald-800"
          >
            See all {noun} &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 mt-12 text-center">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">
          Get the Free Sea to Sky Trip Planner
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Local picks, must-do trails, and insider tips — delivered to your inbox.
        </p>
        <NewsletterSignup source={`feature-${categorySlug}-${featureSlug}`} />
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
              { '@type': 'ListItem', position: 2, name: category.name, item: `https://bestseatosky.com/${categorySlug}` },
              { '@type': 'ListItem', position: 3, name: feature.name, item: `https://bestseatosky.com/${categorySlug}/with/${featureSlug}` },
            ],
          }),
        }}
      />

      {/* ItemList Schema */}
      {listings.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `Best ${feature.name} ${noun} in Sea to Sky`,
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
      )}
    </section>
  );
}
