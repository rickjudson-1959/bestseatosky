import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Why Best Sea to Sky | How We Compare to Google Maps, TripAdvisor & Tourism Boards',
  description:
    'The only directory that covers the entire Sea to Sky corridor with real Google reviews, local curation, and no global noise. See how we compare to Tourism Whistler, Google Maps, and TripAdvisor.',
  alternates: { canonical: '/why' },
};

const COMPETITORS = [
  {
    name: 'Google Maps',
    icon: '📍',
    strengths: ['Comprehensive coverage', 'Real-time hours and directions', 'Massive review database'],
    weaknesses: [
      'Zero curation — every gas station and ATM is a "result"',
      'No context for what\'s worth your time vs. what\'s just nearby',
      'Algorithm favors businesses that game SEO, not quality',
      'No guides, no local perspective, no editorial voice',
      'Bot-written and incentivized reviews pollute the ratings',
    ],
    verdict: 'The best tool for directions. But "restaurants near me" returns 200 results with no way to tell the hidden gem from the tourist trap. You need a local to sort through the noise — that\'s us.',
  },
  {
    name: 'TripAdvisor',
    icon: '🦉',
    strengths: ['Global brand trust', 'Massive review volume', 'User-generated content'],
    weaknesses: [
      'Reviews skew to tourists who visited once, not locals who go weekly',
      'Pay-to-play advertising buries organic results',
      'Global platform — no special attention to Sea to Sky',
      'Fake review problem erodes trust in ratings',
      'Businesses can pay for premium placement regardless of quality',
    ],
    verdict: 'Useful for Cancun resorts. Less useful for finding the breakfast spot that Squamish locals swear by. And good luck telling the sponsored results from the real ones.',
  },
  {
    name: 'Tourism Whistler / Explore Squamish',
    icon: '🏔️',
    strengths: ['Official tourism authority status', 'Strong brand recognition in their respective towns', 'Community-driven'],
    weaknesses: [
      'Single-town focus — neither covers the full corridor',
      'Listings are pay-to-play, not ranked by quality',
      'No real visitor ratings or review data',
      'Promotional tone, not independent recommendations',
      'If you\'re driving Vancouver to Pemberton, you need three different sites',
    ],
    verdict: 'Great community resources — for one town at a time. But the Sea to Sky is 150 km of incredible communities, and no one else covers all of them independently.',
  },
];

const COMPARISON_TABLE = [
  { feature: 'Full corridor coverage (Van to Pemberton)', bsts: true, gm: true, ta: true, tb: false },
  { feature: 'Hand-picked by locals who live here', bsts: true, gm: false, ta: false, tb: false },
  { feature: 'Real Google review ratings displayed', bsts: true, gm: true, ta: false, tb: false },
  { feature: 'Curated "best of" guides', bsts: true, gm: false, ta: false, tb: false },
  { feature: 'Zero ads in search results', bsts: true, gm: false, ta: false, tb: false },
  { feature: 'Independent rankings (no pay-to-rank)', bsts: true, gm: false, ta: false, tb: false },
  { feature: 'Category + town filtering', bsts: true, gm: false, ta: true, tb: true },
  { feature: 'Free basic listings for businesses', bsts: true, gm: true, ta: false, tb: false },
  { feature: '859+ verified local listings', bsts: true, gm: true, ta: true, tb: false },
];

export default function WhyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2318] via-[#1a3a2a] to-[#0f2318] px-6 py-20 text-center">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-emerald-400 text-sm font-semibold tracking-[3px] uppercase mb-5">
            HAND-PICKED BY LOCALS. ZERO ADS. NO BS.
          </p>
          <h1 className="font-serif font-bold text-white text-4xl md:text-5xl leading-tight mb-5">
            Why Best Sea to Sky?
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Google gives you 200 pins. TripAdvisor gives you tourist reviews from 2019. Tourism
            boards only cover their own town. We give you the straight goods — every town, every
            category, vetted by people who actually live here. No ads in results. No pay-to-rank.
            Just the best of the corridor.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-10">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-slate-600">Why Best Sea to Sky</span>
        </nav>

        {/* The Problem */}
        <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 space-y-6 mb-16">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">The Problem With Existing Options</h2>
          <p>
            You&apos;re planning a trip to the Sea to Sky corridor. You open Google Maps and get 200
            results for &quot;restaurants near Squamish&quot; — half of them are gas station convenience
            stores. TripAdvisor shows reviews from tourists who visited once three years ago and left
            a one-star review because it rained. Tourism Whistler only covers Whistler. Explore
            Squamish only covers Squamish.
          </p>
          <p>
            None of them answer the question you actually have: <strong>&quot;Where would a local
            take me?&quot;</strong>
          </p>
          <p>
            That&apos;s what Best Sea to Sky exists for. We&apos;re not a global platform trying to
            cover every city on earth. We&apos;re a single-corridor directory built by people who
            have lived here for 20 years — for people who want to experience the corridor the way
            we do. Every listing is hand-picked. Every guide is locally curated. Zero ads in our
            results. No pay-to-rank. Just the straight goods.
          </p>
        </div>

        {/* Competitor Breakdown */}
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-8">How We Compare</h2>
        <div className="flex flex-col gap-8 mb-16">
          {COMPETITORS.map((comp) => (
            <div key={comp.name} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{comp.icon}</span>
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Best Sea to Sky vs. {comp.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Their strengths
                  </h4>
                  <ul className="space-y-2">
                    {comp.strengths.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-slate-300 mt-0.5 shrink-0">&#10003;</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Where they fall short
                  </h4>
                  <ul className="space-y-2">
                    {comp.weaknesses.map((w) => (
                      <li key={w} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-red-300 mt-0.5 shrink-0">&#10005;</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-700 italic">{comp.verdict}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Feature Comparison</h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 min-w-[220px]">Feature</th>
                  <th className="text-center py-4 px-3 font-semibold text-emerald-700 bg-emerald-50/50 min-w-[100px]">Best Sea to Sky</th>
                  <th className="text-center py-4 px-3 font-semibold text-slate-500 min-w-[100px]">Google Maps</th>
                  <th className="text-center py-4 px-3 font-semibold text-slate-500 min-w-[100px]">TripAdvisor</th>
                  <th className="text-center py-4 px-3 font-semibold text-slate-500 min-w-[100px]">Tourism Boards</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 px-4 text-slate-600">{row.feature}</td>
                    <td className="text-center py-3 px-3 bg-emerald-50/30">
                      {row.bsts ? <span className="text-emerald-600 font-bold">&#10003;</span> : <span className="text-slate-200">&mdash;</span>}
                    </td>
                    <td className="text-center py-3 px-3">
                      {row.gm ? <span className="text-slate-400">&#10003;</span> : <span className="text-slate-200">&mdash;</span>}
                    </td>
                    <td className="text-center py-3 px-3">
                      {row.ta ? <span className="text-slate-400">&#10003;</span> : <span className="text-slate-200">&mdash;</span>}
                    </td>
                    <td className="text-center py-3 px-3">
                      {row.tb ? <span className="text-slate-400">&#10003;</span> : <span className="text-slate-200">&mdash;</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-emerald-50 rounded-2xl p-8 md:p-10 border border-emerald-100 text-center">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">
            Ready to explore like a local?
          </h2>
          <p className="text-sm text-slate-600 mb-6 max-w-lg mx-auto">
            859+ verified listings, 27+ curated guides, real Google reviews — all focused on
            the Sea to Sky corridor.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/guide"
              className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors"
            >
              Browse Guides
            </Link>
            <Link
              href="/get-listed"
              className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              List Your Business
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
