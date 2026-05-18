import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getListingsForCuisine, getCuisineCounts } from '@/lib/data';
import { getCuisine, CUISINES } from '@/lib/cuisines';
import ListingCard from '@/components/ListingCard';
import CuisinePills from '@/components/CuisinePills';
import NewsletterSignup from '@/components/NewsletterSignup';
import { TrustStrip } from '@/components/SocialProof';

type Props = {
  params: Promise<{ type: string }>;
};

export async function generateStaticParams() {
  return CUISINES.map((c) => ({ type: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const cuisine = getCuisine(type);
  if (!cuisine) return {};

  const title = `Best ${cuisine.name} Restaurants in Squamish, Whistler & Pemberton`;
  const description = `Locally-curated ${cuisine.name} restaurants across the Sea to Sky corridor. Skip the tourist traps — find where locals actually eat.`;
  const url = `https://bestseatosky.com/eat/cuisine/${cuisine.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/eat/cuisine/${cuisine.slug}` },
    openGraph: { title, description, url, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function CuisinePage({ params }: Props) {
  const { type } = await params;
  const cuisine = getCuisine(type);
  if (!cuisine) notFound();

  const [listings, counts] = await Promise.all([
    getListingsForCuisine(cuisine.slug),
    getCuisineCounts(),
  ]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <Link href="/eat" className="hover:text-slate-600 transition-colors">Eat</Link>
        <span>›</span>
        <span className="text-slate-600">{cuisine.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mb-2">
          {cuisine.icon} Best {cuisine.name} Restaurants in Squamish, Whistler &amp; Pemberton
        </h1>
        <p className="text-slate-500">
          {listings.length} {listings.length === 1 ? 'spot' : 'spots'} across the Sea to Sky corridor.
        </p>
      </div>

      <div className="mb-8">
        <TrustStrip />
      </div>

      <CuisinePills counts={counts} activeSlug={cuisine.slug} />

      {listings.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
          <p className="text-slate-500 mb-4">
            We haven&apos;t catalogued any {cuisine.name} spots yet.
          </p>
          <Link
            href="/eat"
            className="inline-flex items-center gap-1.5 text-amber-700 font-semibold hover:text-amber-800"
          >
            See all restaurants &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 mt-12 text-center">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">
          Get the Free Sea to Sky Trip Planner
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Local restaurant picks, must-do trails, and insider tips — delivered to your inbox.
        </p>
        <NewsletterSignup source={`cuisine-${cuisine.slug}`} />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bestseatosky.com' },
              { '@type': 'ListItem', position: 2, name: 'Eat', item: 'https://bestseatosky.com/eat' },
              { '@type': 'ListItem', position: 3, name: cuisine.name, item: `https://bestseatosky.com/eat/cuisine/${cuisine.slug}` },
            ],
          }),
        }}
      />

      {listings.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: `Best ${cuisine.name} Restaurants in the Sea to Sky corridor`,
              numberOfItems: listings.length,
              itemListElement: listings.slice(0, 20).map((listing, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: listing.name,
                url: `https://bestseatosky.com/eat/${listing.slug}`,
              })),
            }),
          }}
        />
      )}
    </section>
  );
}
