import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Whistler Village vs Creekside — How to Pick the Right Base for Your Trip',
  description:
    'A local\'s honest take on Whistler Village vs Upper Village vs Creekside. Where to eat, where to stay, and how to skip the crowds — written by someone who lives here.',
  alternates: { canonical: '/neighbourhood/whistler' },
};

const AREAS = [
  {
    name: 'Whistler Village',
    vibe: 'The main event — pedestrian streets, nightlife, and everything within stumbling distance',
    bestFor: 'First-timers, groups who want nightlife, and anyone who doesn\'t want to drive',
    food: [
      'Araxi — fine dining flagship. The tasting menu is worth the splurge if you\'re celebrating something.',
      'Handlebar Cafe — the locals\' breakfast spot. Burritos the size of your forearm.',
      'El Furniture Warehouse — everything on the menu is $5.95. Cheap eats, good vibes, questionable decisions after midnight.',
    ],
    stays: [
      'Pan Pacific — ski-in/ski-out, pool, spa. The gold standard if budget isn\'t a concern.',
      'Aava Whistler Hotel — boutique, central, and half the price of the big resorts. Best value in the Village.',
      'Whistler Hostel — clean, social, cheap. The move for solo travellers and young groups.',
    ],
    pros: [
      'Walk everywhere — lifts, restaurants, bars, shops all within 10 minutes on foot',
      'Best nightlife and apr\u00e8s-ski scene in the corridor',
      'Easiest logistics — park once and forget about your car',
    ],
    cons: [
      'Most expensive part of Whistler by a wide margin',
      'Gets very crowded on weekends and holidays — Village Stroll is shoulder-to-shoulder',
      'Can feel more tourist-trap than local — chain restaurants and overpriced gift shops',
    ],
    localTip: 'Skip the Village Stroll restaurants at 6 PM on a Saturday. Walk 5 minutes north to the Upper Village — same mountain, half the crowd, better restaurants.',
  },
  {
    name: 'Creekside',
    vibe: 'The locals\' side of Whistler — quieter, cheaper, and with its own gondola',
    bestFor: 'Families, repeat visitors, locals, and anyone who wants Whistler without the circus',
    food: [
      'Rimrock Cafe — one of the best restaurants in BC, full stop. Seafood and game in a cozy room that feels like a secret.',
      'Creekbread — wood-fired pizza and craft beer in a chill, family-friendly space. The locals\' living room.',
      'Dusty\'s Bar & BBQ — the apr\u00e8s spot at Creekside base. Pulled pork, live music, ski boots on the deck.',
    ],
    stays: [
      'Legends Whistler — condo-style, right at the Creekside gondola. Kitchen, fireplace, ski-in/ski-out.',
      'Nita Lake Lodge — boutique lakeside hotel. Train station vibes, incredible spa, worth every dollar.',
      'Evolution Whistler — modern condos with full kitchens. Great for families or longer stays.',
    ],
    pros: [
      'Creekside Gondola means you can ski all day without touching the Village',
      'Noticeably cheaper — accommodation, food, parking all cost less',
      'Where the locals actually live and eat — the vibe is authentic, not performative',
    ],
    cons: [
      'Quieter nightlife — if you want clubs and bars, you\'ll bus to the Village',
      'Fewer shops and galleries — this is residential, not retail',
      'Need a car or bus for Village activities',
    ],
    localTip: 'Nita Lake Lodge has a free canoe and kayak rental for guests in summer. Paddle across the lake at sunset. Tell nobody.',
  },
];

export default function WhistlerNeighbourhoodPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-600">Whistler Neighbourhoods</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        Whistler Village vs. Creekside: How to Pick the Right Base (and Skip the Crowds)
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Updated March 2026 &middot; Written by a corridor local
      </p>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 mb-12">
        <p className="text-base">
          Every first-timer books Whistler Village. And it&apos;s great — if you want pedestrian
          streets, 40 restaurants, and apr&egrave;s-ski until 2 AM. But locals know that Creekside
          is where the real Whistler lives: quieter, cheaper, and with its own gondola that skips
          the Village lift lines entirely. Here&apos;s how to decide.
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

            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Where to Eat
            </h3>
            <ul className="space-y-3 mb-6">
              {area.food.map((item) => (
                <li key={item} className="text-sm text-slate-600 leading-relaxed">{item}</li>
              ))}
            </ul>

            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Where to Stay
            </h3>
            <ul className="space-y-3 mb-6">
              {area.stays.map((item) => (
                <li key={item} className="text-sm text-slate-600 leading-relaxed">{item}</li>
              ))}
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-3">
                  Why You&apos;d Choose This
                </h3>
                <ul className="space-y-2">
                  {area.pros.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  The Trade-Offs
                </h3>
                <ul className="space-y-2">
                  {area.cons.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-slate-300 mt-0.5 shrink-0">&#10005;</span>
                      {item}
                    </li>
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
          <strong>Choose the Village</strong> if it&apos;s your first time, you want nightlife, or
          you don&apos;t want to think about logistics. Everything is right there.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>Choose Creekside</strong> if you&apos;ve been before, you&apos;re travelling with
          family, or you want to save money without sacrificing ski access. The Creekside Gondola
          puts you on the same mountain — you just skip the zoo at the base.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/eat?town=whistler"
          className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors text-center"
        >
          Browse Whistler Restaurants
        </Link>
        <Link
          href="/stay?town=whistler"
          className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors text-center"
        >
          Browse Whistler Stays
        </Link>
        <Link
          href="/neighbourhood/squamish"
          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors text-center"
        >
          Compare Squamish Neighbourhoods
        </Link>
      </div>
    </section>
  );
}
