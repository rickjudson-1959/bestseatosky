import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getListings } from '@/lib/data';
import ListingCard from '@/components/ListingCard';
import SearchBar from '@/components/SearchBar';
import NewsletterSignup from '@/components/NewsletterSignup';
import { VisitorTestimonials } from '@/components/SocialProof';

const CAT_ICONS: Record<string, string> = {
  eat: '🍽️',
  stay: '🏔️',
  play: '⛷️',
  visit: '🌲',
  shop: '🛍️',
  services: '🧭',
};

const CAT_PULLS: Record<string, string> = {
  eat: 'Find the best post-trail patios, hidden brunch spots, and local-favourite dinners',
  stay: 'Book the cabin, lodge, or hotel that locals actually recommend to their friends',
  play: 'Discover the trails, slopes, and rivers that make this corridor world-class',
  visit: 'See the waterfalls, viewpoints, and parks that most tourists drive right past',
  shop: 'Support the local shops, galleries, and markets that define corridor culture',
  services: 'Find trusted local guides, outfitters, and services vetted by the community',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://bestseatosky.com/#website',
      url: 'https://bestseatosky.com',
      name: 'Best Sea to Sky',
      alternateName: [
        'BestSeaToSky',
        'Bestseatosky',
        'Best Seatosky',
        'Bestsea Tosky',
        'Best Sea Tosky',
        'Best SeaToSky',
      ],
      description:
        'Discover the best restaurants, hotels, adventures, and attractions across the Sea to Sky corridor. Curated guides for Squamish, Whistler, and Pemberton.',
      publisher: {
        '@id': 'https://bestseatosky.com/#organization',
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://bestseatosky.com/?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'en-CA',
    },
    {
      '@type': 'Organization',
      '@id': 'https://bestseatosky.com/#organization',
      name: 'Best Sea to Sky',
      alternateName: [
        'BestSeaToSky',
        'Bestseatosky',
        'Best Seatosky',
        'Bestsea Tosky',
        'Best Sea Tosky',
        'Best SeaToSky',
      ],
      url: 'https://bestseatosky.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bestseatosky.com/logo.png',
        width: 600,
        height: 60,
      },
      founder: {
        '@type': 'Person',
        name: 'Rick Judson',
      },
      foundingLocation: {
        '@type': 'Place',
        name: 'Squamish, British Columbia, Canada',
      },
      description:
        'A locally curated directory and guide to the Sea to Sky corridor — Squamish, Whistler, and Pemberton.',
      email: 'hello@bestseatosky.com',
      sameAs: [],
    },
  ],
};

export default async function HomePage() {
  const categories = await getCategories();
  const featuredListings = await getListings({ featured: true, limit: 6 });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 py-20 md:py-24 text-center">
        {/* Background image */}
        <Image
          src="/images/hero-sea-to-sky.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-emerald-400 text-sm font-semibold tracking-[3px] uppercase mb-5">
            CURATED BY LOCALS
          </p>

          <h1 className="font-serif font-bold text-white text-4xl md:text-5xl leading-tight mb-6">
            <span className="block">The Local&apos;s Guide</span>
            <span className="block">to the</span>
            <span className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-200 bg-clip-text text-transparent">
              Sea to Sky Corridor
            </span>
            <span className="block text-2xl md:text-3xl mt-2 text-slate-300 font-normal">
              Squamish, Whistler &amp; Pemberton
            </span>
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Stop scrolling through thousands of bot-written reviews and outdated tourist traps.
            Best Sea to Sky is the only directory curated by locals who have spent 20 years living,
            working, and exploring this corridor. We give you the straight goods on the best spots
            from Vancouver to Whistler — no noise, no ads, just the best of the West Coast.
          </p>

          <SearchBar />

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

      {/* CURATED BY LOCALS TRUST BAR */}
      <section className="bg-emerald-50 border-y border-emerald-100 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 text-center mb-8">
            Why Locals Trust This Sea to Sky Directory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-emerald-700 mb-1">859+</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Hand-Picked Listings</div>
              <p className="text-xs text-slate-500">Every business vetted by people who live and eat and hike here</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-emerald-700 mb-1">Zero</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Ads in Our Rankings</div>
              <p className="text-xs text-slate-500">You&apos;re here because you&apos;re good, not because you paid</p>
            </div>
            <div className="text-center">
              <div className="font-serif text-3xl font-bold text-emerald-700 mb-1">20+</div>
              <div className="text-sm font-semibold text-slate-900 mb-1">Years on the Corridor</div>
              <p className="text-xs text-slate-500">Built by your neighbours, not a tech company in California</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      {featuredListings.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="font-serif text-3xl text-slate-900 mb-2">Top-Rated Places in Squamish, Whistler &amp; Pemberton</h2>
          <p className="text-slate-500 mb-8">Local favourites handpicked from across the corridor</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {/* BROWSE BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-3xl text-slate-900 mb-2">Explore the Sea to Sky Corridor by Category</h2>
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
                    <p className="text-white/80 text-sm">{CAT_PULLS[cat.slug] || cat.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* VISITOR TESTIMONIALS + PLATFORM STATS */}
      <VisitorTestimonials />

      {/* LOCAL GUIDES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl text-slate-900 mb-2">Sea to Sky Travel Guides &amp; Local Itineraries</h2>
        <p className="text-slate-500 mb-8">Insider knowledge you won&apos;t find in a brochure</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              href: '/48-hours-squamish',
              title: '48 Hours in Squamish',
              desc: 'A local\'s itinerary for first-timers — early-morning coffee to hidden trails to the best dinner in town.',
            },
            {
              href: '/ski-season',
              title: 'Ski Season Survival Guide',
              desc: 'How to do Whistler without going broke or losing your mind. Lift lines, secret runs, and cheap eats.',
            },
            {
              href: '/best-patios',
              title: 'Best Patios in the Corridor',
              desc: 'Where to drink with a view after a day on the trails — ranked by a local who has sat on every one.',
            },
            {
              href: '/neighbourhood/squamish',
              title: 'Squamish Neighbourhoods',
              desc: 'Downtown vs. Garibaldi Highlands — where to eat, stay, and explore based on your trip style.',
            },
            {
              href: '/neighbourhood/whistler',
              title: 'Whistler Neighbourhoods',
              desc: 'Village vs. Creekside — how to pick the right base and skip the crowds.',
            },
          ].map((guide) => (
            <Link key={guide.href} href={guide.href} className="group">
              <div className="rounded-2xl border border-slate-100 p-6 h-full hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">{guide.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEWSLETTER SIGNUP */}
      <section className="bg-gradient-to-br from-[#0f2318] via-[#1a3a2a] to-[#0f2318] px-6 py-16">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">
            Get the Free Sea to Sky Trip Planner
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Local restaurant picks, must-do trails, and insider tips for the corridor —
            delivered straight to your inbox.
          </p>
          <NewsletterSignup source="homepage" />
        </div>
      </section>

      {/* SEO CONTENT BLOCK — THREE-COLUMN FEATURE LAYOUT */}
      <section className="bg-white border-t border-slate-100 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl text-slate-900 mb-4 text-center">
            Your Complete Guide to the Sea to Sky Corridor
          </h2>
          <p className="text-slate-500 leading-relaxed mb-12 text-center max-w-2xl mx-auto">
            150 km of the most spectacular scenery in British Columbia — and we know every
            kilometre of it. Here&apos;s what you&apos;ll find.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">The Granite Walls</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">
                Squamish is the outdoor capital of Canada. The Stawamus Chief, the Sea to Sky
                Gondola, world-class climbing, and a food scene that punches way above its weight.
              </p>
              <ul className="text-sm text-slate-600 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <span>Best restaurants in Squamish</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <span>Top hiking trails and climbing spots</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <span>Local breweries and post-trail patios</span>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">The Alpine Peaks</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">
                Whistler needs no introduction — but most visitors only scratch the surface.
                We&apos;ll show you the spots that locals actually go to, not just the tourist circuit.
              </p>
              <ul className="text-sm text-slate-600 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <Link href="/stay/whistler" className="hover:text-emerald-700 transition-colors underline decoration-emerald-200 underline-offset-2">Best hotels and lodges in Whistler</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <Link href="/eat/whistler" className="hover:text-emerald-700 transition-colors underline decoration-emerald-200 underline-offset-2">Local-favourite restaurants and bars</Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <span>Ski, bike, hike — and where to apr&egrave;s</span>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">The Hidden In-Between</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-3">
                Britannia Beach, Furry Creek, Brackendale, Pemberton — the corridor is full of
                places that most visitors blow past at 100 km/h. Their loss. Your gain.
              </p>
              <ul className="text-sm text-slate-600 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <span>Hidden waterfalls and viewpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <span>Off-the-highway farm stands and cafes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <span>Pemberton&apos;s growing food and adventure scene</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
