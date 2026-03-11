import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Best Patios in the Sea to Sky Corridor — Where to Drink With a View',
  description:
    'The best patios from Squamish to Whistler to Pemberton, ranked by a local who has sat on every one of them. Post-trail beers, sunset dinners, and hidden decks.',
  alternates: { canonical: '/best-patios' },
};

const PATIOS = [
  {
    name: 'Howe Sound Brew Pub',
    town: 'Squamish',
    why: 'The original Sea to Sky patio. Craft beer brewed in-house, mountain views, and the kind of worn-in charm that only 25 years of post-trail pints can produce. Get a seat on the upper deck if you can.',
    bestFor: 'Post-Chief celebration beers',
    season: 'Year-round (heated in winter)',
    rank: 1,
  },
  {
    name: 'Dusty\'s Bar & BBQ',
    town: 'Whistler (Creekside)',
    why: 'The apr\u00e8s-ski patio that Creekside locals refuse to share. Pulled pork sandwiches, live music on weekends, and ski boots are not just accepted — they\'re expected. The vibe is pure mountain town.',
    bestFor: 'Ski-day apr\u00e8s with live music',
    season: 'Year-round',
    rank: 2,
  },
  {
    name: 'Backcountry Brewing',
    town: 'Squamish',
    why: 'The best beer in Squamish, and maybe the corridor. The patio is simple — picnic tables, string lights — but the beer is so good nobody cares about the furniture. Bring your dog.',
    bestFor: 'Serious craft beer in a no-frills setting',
    season: 'Spring through fall',
    rank: 3,
  },
  {
    name: 'The Watershed Grill',
    town: 'Squamish (Brackendale)',
    why: 'Upscale patio on the banks of the Squamish River with eagle-watching in winter. Locally sourced menu that takes itself seriously without being pretentious. Sunset here is unreasonable.',
    bestFor: 'A proper dinner with mountain and river views',
    season: 'Year-round (patio spring through fall)',
    rank: 4,
  },
  {
    name: 'Longhorn Saloon',
    town: 'Whistler Village',
    why: 'The biggest patio in the Village and the loudest apr\u00e8s scene on the mountain. Not subtle, not quiet, not trying to be. If you want to feel the energy of Whistler at full volume, sit here.',
    bestFor: 'Groups who want the classic Whistler apr\u00e8s experience',
    season: 'Year-round',
    rank: 5,
  },
  {
    name: 'Mile One Eating House',
    town: 'Pemberton',
    why: 'The hidden gem at the top of the corridor. Farm-to-table on a patio surrounded by actual farms. Mount Currie in the background. The drive to Pemberton is worth it for this patio alone.',
    bestFor: 'A quiet, exceptional meal away from the Whistler crowds',
    season: 'Spring through fall',
    rank: 6,
  },
  {
    name: 'Mag\'s 99',
    town: 'Squamish',
    why: 'A converted gas station with a taco menu and cocktail list that has no business being this good. The patio is small, the vibes are immaculate, and the margaritas hit different at sea level.',
    bestFor: 'Tacos, cocktails, and a date night that doesn\'t feel corporate',
    season: 'Spring through fall',
    rank: 7,
  },
  {
    name: 'Rimrock Cafe',
    town: 'Whistler (Creekside)',
    why: 'Technically doesn\'t have a "patio" — but the intimate terrace seats in summer feel like you\'re eating in someone\'s gorgeous backyard. The seafood is the best in Whistler. Reserve ahead.',
    bestFor: 'A special-occasion dinner that feels personal, not corporate',
    season: 'Summer terrace only',
    rank: 8,
  },
];

export default function BestPatiosPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-600">Best Patios</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        The Best Patios in the Sea to Sky — Where to Drink With a View After a Day on the Trails
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Updated March 2026 &middot; 8 patios ranked by a local who has sat on every one of them
      </p>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 mb-12">
        <p className="text-base">
          You just hiked the Chief, or skied Whistler, or drove the whole corridor with the
          windows down. Now you need a patio, a cold beer, and a view that reminds you why
          you live here (or why you should). These are the patios worth planning your day around —
          from Squamish to Pemberton, ranked by someone who has earned a seat at every one.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-16">
        {PATIOS.map((patio) => (
          <div key={patio.name} className="flex gap-5 bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm transition-all">
            <div className="hidden sm:flex items-center justify-center w-14 shrink-0 bg-slate-50 border-r border-slate-100">
              <span className="font-serif text-2xl font-bold text-slate-300">{patio.rank}</span>
            </div>
            <div className="flex-1 py-5 pr-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h2 className="font-serif text-lg font-bold text-slate-900 leading-tight">
                  <span className="sm:hidden text-slate-400 font-sans text-sm mr-1.5">{patio.rank}.</span>
                  {patio.name}
                </h2>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full shrink-0">
                  {patio.town}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{patio.why}</p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                <span><strong className="text-slate-600">Best for:</strong> {patio.bestFor}</span>
                <span><strong className="text-slate-600">Season:</strong> {patio.season}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">The Patio Rules</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Go on a weekday if you can. Weekend patios fill by 4 PM in summer.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Bring a layer. Even July evenings cool down fast once the sun drops behind the mountains.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Check if the patio is dog-friendly before showing up with your trail buddy. Most are. Some aren&apos;t.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Pemberton is a 35-minute drive past Whistler. Mile One is worth every minute.</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/eat"
          className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors text-center"
        >
          Browse All Restaurants
        </Link>
        <Link
          href="/eat?tag=breweries"
          className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors text-center"
        >
          Corridor Breweries
        </Link>
      </div>
    </section>
  );
}
