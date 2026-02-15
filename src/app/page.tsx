import Link from 'next/link';
import { getCategories, getListings } from '@/lib/data';
import ListingCard from '@/components/ListingCard';

const CAT_ICONS: Record<string, string> = {
  eat: '🍽️',
  stay: '🏔️',
  play: '⛷️',
  visit: '🌲',
  shop: '🛍️',
  services: '🧭',
};

export default async function HomePage() {
  const categories = await getCategories();
  const featuredListings = await getListings({ featured: true, limit: 6 });

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2318] via-[#1a3a2a] to-[#0f2318] px-6 py-20 md:py-24 text-center">
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-emerald-400 text-sm font-semibold tracking-[3px] uppercase mb-5">
            SQUAMISH • WHISTLER • PEMBERTON
          </p>

          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
            Discover the{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-200 bg-clip-text text-transparent">
              Best of Sea to Sky
            </span>
          </h1>

          <p className="text-lg text-slate-400 leading-relaxed max-w-xl mx-auto mb-10">
            Your trusted guide to the best restaurants, adventures, stays and experiences
            across the Sea to Sky corridor.
          </p>

          {/* Category Cards */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="group flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-6 py-4 transition-all hover:bg-emerald-400/10 hover:border-emerald-400/20 hover:-translate-y-0.5 min-w-[100px]"
              >
                <span className="text-3xl">{CAT_ICONS[cat.slug] || '📍'}</span>
                <span className="text-sm font-bold text-slate-300 group-hover:text-emerald-400 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      {featuredListings.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl text-slate-900 mb-2">Featured Places</h2>
          <p className="text-slate-500 mb-8">Handpicked highlights from the Sea to Sky corridor</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {/* BROWSE BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-3xl text-slate-900 mb-2">Explore the Corridor</h2>
        <p className="text-slate-500 mb-8">Browse by what you&apos;re looking for</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const gradients: Record<string, string> = {
              eat: 'from-orange-500 to-red-600',
              stay: 'from-indigo-500 to-purple-600',
              play: 'from-emerald-500 to-green-600',
              visit: 'from-pink-500 to-rose-600',
              shop: 'from-amber-500 to-red-500',
              services: 'from-sky-500 to-indigo-600',
            };

            return (
              <Link key={cat.id} href={`/${cat.slug}`}>
                <div className="group relative overflow-hidden rounded-2xl h-48 cursor-pointer">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradients[cat.slug] || gradients.eat} transition-transform duration-500 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <span className="text-4xl mb-2">{CAT_ICONS[cat.slug]}</span>
                    <h3 className="font-serif text-2xl text-white font-bold">{cat.name}</h3>
                    <p className="text-white/80 text-sm">{cat.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* SEO CONTENT BLOCK */}
      <section className="bg-white border-t border-slate-100 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-slate-900 mb-4">
            Your Complete Guide to the Sea to Sky Corridor
          </h2>
          <p className="text-slate-500 leading-relaxed mb-6">
            The Sea to Sky corridor stretches from West Vancouver through Squamish to Whistler
            and Pemberton, offering some of British Columbia&apos;s most spectacular scenery,
            world-class outdoor recreation, and vibrant communities. Whether you&apos;re looking
            for the best restaurants in Squamish, luxury hotels in Whistler, epic hiking trails,
            or hidden gems along the highway, Best Sea to Sky is your trusted local guide.
          </p>
          <p className="text-slate-500 leading-relaxed">
            From the granite walls of the Stawamus Chief to the alpine peaks of Whistler Blackcomb,
            from craft breweries to fine dining with ocean views — discover everything the corridor
            has to offer, curated by locals who know it best.
          </p>
        </div>
      </section>
    </>
  );
}
