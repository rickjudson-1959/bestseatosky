import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise | Get Your Business in Front of the Right People',
  description:
    'Own your category in the Sea to Sky corridor. Targeted high-intent traffic from people actively planning trips — not just more impressions. Featured and Sponsored placements available.',
  alternates: { canonical: '/advertise' },
};

const VALUE_PROPS = [
  {
    title: 'Own the Search',
    description:
      'When someone searches "best restaurants in Squamish" or "things to do in Whistler," your business appears at the top of a curated list — not buried under 200 generic pins. You don\'t just show up. You dominate your category.',
  },
  {
    title: 'Targeted, High-Intent Traffic',
    description:
      'Every visitor to Best Sea to Sky is actively planning a trip to the corridor. They\'re not browsing a global platform — they\'re looking for exactly the kind of business you run, in exactly the towns you serve. That\'s the difference between impressions and customers.',
  },
  {
    title: 'Authentic Association',
    description:
      'Your business appears alongside the corridor\'s best — hand-picked, locally vetted, and ranked by real reviews. No pay-to-play rankings, no fake reviews, no algorithmic lottery. When you\'re featured on Best Sea to Sky, you\'re associated with quality. Period.',
  },
];

export default function AdvertisePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2318] via-[#1a3a2a] to-[#0f2318] px-6 py-20 md:py-24 text-center">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-emerald-400 text-sm font-semibold tracking-[3px] uppercase mb-5">
            FOR SEA TO SKY BUSINESSES
          </p>
          <h1 className="font-serif font-bold text-white text-4xl md:text-5xl leading-tight mb-6">
            Get Your Business in Front of the Right People — Not Just More People.
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Google gives you impressions. TripAdvisor gives you noise. We give you the customers
            who are already planning their next trip to the corridor — and looking for exactly
            what you offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/get-listed"
              className="px-8 py-4 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors"
            >
              Get Your Free Listing
            </Link>
            <a
              href="#value"
              className="px-8 py-4 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section id="value" className="max-w-4xl mx-auto px-6 py-20">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-10">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <span className="text-slate-600">Advertise</span>
        </nav>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Why Advertise on Best Sea to Sky?
        </h2>
        <p className="text-slate-500 leading-relaxed mb-12 max-w-2xl">
          The big platforms treat your business like a pin on a map. We treat you like what you
          are — a vital part of this corridor. Here&apos;s what that means for your bottom line.
        </p>

        <div className="flex flex-col gap-8 mb-16">
          {VALUE_PROPS.map((prop, i) => (
            <div key={prop.title} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <span className="font-serif text-lg font-bold text-emerald-700">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The Numbers */}
        <div className="bg-slate-50 rounded-2xl p-8 md:p-10 border border-slate-100 mb-16">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6 text-center">
            The Corridor by the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif text-3xl font-bold text-emerald-700">859+</div>
              <div className="text-sm text-slate-500 mt-1">Verified Listings</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-emerald-700">27+</div>
              <div className="text-sm text-slate-500 mt-1">Curated Guides</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-emerald-700">6</div>
              <div className="text-sm text-slate-500 mt-1">Towns Covered</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-emerald-700">100%</div>
              <div className="text-sm text-slate-500 mt-1">Locally Curated</div>
            </div>
          </div>
        </div>

        {/* Pricing CTA */}
        <div className="bg-emerald-50 rounded-2xl p-8 md:p-10 border border-emerald-100 text-center">
          <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">
            Ready to Own Your Category?
          </h2>
          <p className="text-sm text-slate-600 mb-6 max-w-lg mx-auto">
            Every listing starts free. Featured ($49/mo) and Sponsored ($149/mo) placements
            put you at the top — with a badge, priority placement, and guide inclusion.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/get-listed"
              className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors"
            >
              See Pricing &amp; Get Listed
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              Talk to Us First
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
