import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Downtown Squamish vs Garibaldi Highlands — Where to Eat, Stay & Explore',
  description:
    'A local\'s honest comparison of Downtown Squamish and Garibaldi Highlands. Where to eat, where to stay, and which neighbourhood suits your trip — no tourist fluff.',
  alternates: { canonical: '/neighbourhood/squamish' },
};

const AREAS = [
  {
    name: 'Downtown Squamish',
    vibe: 'Gritty, walkable, and where the locals actually hang out',
    bestFor: 'Solo travellers, couples, and anyone who wants to walk to dinner after a day on the Chief',
    food: [
      'Howe Sound Brew Pub — the OG. Craft beer brewed on-site, solid pub food, mountain views from the patio.',
      'Mag\'s 99 — tacos and cocktails in a converted gas station. Sounds weird. Works perfectly.',
      'Zephyr Cafe — the breakfast spot locals won\'t stop talking about. Get there early or wait.',
    ],
    stays: [
      'Squamish Adventure Inn — budget-friendly, right downtown, walking distance to everything.',
      'The Howe Sound Inn — comfortable rooms above the brew pub. Roll out of bed to a pint.',
    ],
    trails: [
      'Stawamus Chief — the iconic granite monolith. Three peaks, all worth the sweat.',
      'Smoke Bluffs — quick loops through forest and rock. Perfect afternoon burn.',
      'Waterfront boardwalk — flat, easy, stunning. Start at the Spit, walk until you run out of boardwalk.',
    ],
    localTip: 'Park at the Spit on a weekday evening. Watch the kiteboarders. Grab fish and chips from a food truck. This is the real Squamish.',
  },
  {
    name: 'Garibaldi Highlands',
    vibe: 'Quiet, residential, and closer to the big trailheads',
    bestFor: 'Families, hikers who want an early start, and anyone who prefers quiet over nightlife',
    food: [
      'The Watershed Grill — upscale casual with locally sourced everything. The best dinner in the Highlands, period.',
      'Locavore Bar & Grill — neighbourhood gem with a solid craft beer selection and comfort food done right.',
      'Tim Hortons — just kidding. But honestly, the Highlands is more about cooking at your cabin than eating out.',
    ],
    stays: [
      'Airbnb cabins — the Highlands is cabin country. Book one with a hot tub and mountain views.',
      'Executive Suites Hotel — modern, comfortable, pool and gym. The reliable option.',
    ],
    trails: [
      'Garibaldi Lake — the crown jewel. Turquoise water, volcanic backdrop. 18 km round trip, every step earned.',
      'Elfin Lakes — another stunner. Slightly longer, equally jaw-dropping.',
      'Quest University trails — locals-only network through second-growth forest. Never crowded.',
    ],
    localTip: 'If you\'re doing Garibaldi Lake, start at 6 AM. By 10, the parking lot is full and the trail is a highway. The early bird gets the turquoise water to themselves.',
  },
];

export default function SquamishNeighbourhoodPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-600">Squamish Neighbourhoods</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        Downtown Squamish vs. Garibaldi Highlands: Where Should You Actually Stay?
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Updated March 2026 &middot; Written by a 20-year Squamish local
      </p>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 mb-12">
        <p className="text-base">
          Squamish has two distinct personalities. Downtown is where the energy is — walkable,
          with restaurants and pubs and the kind of grit that makes a mountain town feel real.
          The Highlands is quieter, more residential, and closer to the big backcountry trailheads.
          Neither is &quot;better.&quot; But one is probably better <em>for you</em>.
        </p>
      </div>

      <div className="flex flex-col gap-12 mb-16">
        {AREAS.map((area) => (
          <div key={area.name} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
            <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">{area.name}</h2>
            <p className="text-sm text-emerald-700 font-semibold mb-1">{area.vibe}</p>
            <p className="text-sm text-slate-500 mb-6">
              <strong>Best for:</strong> {area.bestFor}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Where to Eat
                </h3>
                <ul className="space-y-3">
                  {area.food.map((item) => (
                    <li key={item} className="text-sm text-slate-600 leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Where to Stay
                </h3>
                <ul className="space-y-3">
                  {area.stays.map((item) => (
                    <li key={item} className="text-sm text-slate-600 leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  What to Do
                </h3>
                <ul className="space-y-3">
                  {area.trails.map((item) => (
                    <li key={item} className="text-sm text-slate-600 leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p className="text-sm text-slate-700">
                <strong className="text-emerald-800">Local tip:</strong> {area.localTip}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Line */}
      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">The Bottom Line</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          <strong>Choose Downtown</strong> if you want to walk to dinner, grab a craft beer,
          and be in the middle of the action. The Chief and Smoke Bluffs are a five-minute drive.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>Choose the Highlands</strong> if you want quiet mornings, cabin vibes, and
          a head start on Garibaldi Lake before the crowds. You&apos;ll drive into town for
          dinner, but the 10-minute commute is worth the silence.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/eat?town=squamish"
          className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors text-center"
        >
          Browse Squamish Restaurants
        </Link>
        <Link
          href="/stay?town=squamish"
          className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors text-center"
        >
          Browse Squamish Stays
        </Link>
        <Link
          href="/neighbourhood/whistler"
          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors text-center"
        >
          Compare Whistler Neighbourhoods
        </Link>
      </div>
    </section>
  );
}
