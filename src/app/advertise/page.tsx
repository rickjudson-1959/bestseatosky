import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise | Be the Place Visitors Find First',
  description:
    'Be the restaurant, hotel, or adventure company that corridor visitors find before they even leave the house. 859+ local businesses listed — free to start.',
  alternates: { canonical: '/advertise' },
};

const VALUE_PROPS = [
  {
    title: 'Be the Place They Find First',
    description:
      'When someone googles "best restaurants in Squamish," you want to be in that answer — not buried under 200 pins between a gas station and a Tim Hortons. On Best Sea to Sky, your business shows up in a curated list alongside the corridor\'s best. The people reading it are already planning their trip. They just need to know your name.',
  },
  {
    title: 'More Hikers at Your Tables. More Guests in Your Rooms.',
    description:
      'Everyone who visits Best Sea to Sky is planning a trip to the corridor right now. They\'re not casually browsing a global site — they\'re looking for exactly the kind of place you run, in exactly the town you\'re in. That means the people who find you here are ready to walk through your door, not just scroll past your pin.',
  },
  {
    title: 'You\'re Known by the Company You Keep',
    description:
      'Your listing sits alongside places that locals actually recommend — the brewery with the best patio in Squamish, the lodge that Whistler regulars swear by, the trail guide everyone trusts. No fake reviews, no pay-to-rank schemes. When your business appears on Best Sea to Sky, people know you earned that spot.',
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
            FOR LOCAL BUSINESSES
          </p>
          <h1 className="font-serif font-bold text-white text-4xl md:text-5xl leading-tight mb-6">
            Be the Place Visitors Find Before They Even Leave the House.
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-4">
            You know what it&apos;s like — someone drives through town, eats at the wrong place, and
            never comes back. We make sure the right visitors find you first. The ones who are already
            planning their corridor trip and looking for exactly what you offer.
          </p>
          <p className="text-base text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
            With 65+ newsletter subscribers and growing traffic across Squamish, Whistler, and Pemberton,
            Best Sea to Sky puts your business in front of the people actively planning their next visit.
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
          What This Actually Does for Your Business
        </h2>
        <p className="text-slate-500 leading-relaxed mb-12 max-w-2xl">
          We&apos;re not a tech company selling you dashboards. We&apos;re your neighbours,
          and we built this to help corridor businesses get found by the people who&apos;ll
          actually show up. Here&apos;s what that looks like.
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
            You&apos;re Joining Good Company
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif text-3xl font-bold text-emerald-700">859+</div>
              <div className="text-sm text-slate-500 mt-1">Local Businesses Listed</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-emerald-700">27+</div>
              <div className="text-sm text-slate-500 mt-1">&quot;Best Of&quot; Guides</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-emerald-700">6</div>
              <div className="text-sm text-slate-500 mt-1">Towns, One Corridor</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-emerald-700">100%</div>
              <div className="text-sm text-slate-500 mt-1">Run by Locals</div>
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-3 text-center">
          Choose Your Visibility Level
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
          Start free and upgrade when you&apos;re ready. Every tier builds on the one below it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Tier 1: Local Starter */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">Local Starter</h3>
            <div className="font-serif text-3xl font-bold text-slate-900 mb-1">Free</div>
            <p className="text-sm text-slate-400 mb-5">Get on the map</p>
            <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Basic listing with name, address, hours, and contact info</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Included in category and town pages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Google rating and reviews displayed</span>
              </li>
            </ul>
            <Link
              href="/get-listed"
              className="block w-full text-center py-3 rounded-xl bg-slate-100 text-slate-800 text-sm font-bold hover:bg-slate-200 transition-colors"
            >
              Get Listed Free
            </Link>
          </div>

          {/* Tier 2: Corridor Leader */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">Corridor Leader</h3>
            <div className="font-serif text-3xl font-bold text-slate-900 mb-1">$49<span className="text-base font-normal text-slate-400">/mo</span></div>
            <p className="text-sm text-slate-400 mb-5">Stand out from the crowd</p>
            <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Everything in Local Starter</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Featured badge and priority placement on category pages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Enhanced listing with photos and custom description</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Included in relevant &quot;Best Of&quot; guide pages</span>
              </li>
            </ul>
            <a
              href="mailto:hello@bestseatosky.com?subject=Corridor%20Leader%20Inquiry"
              className="block w-full text-center py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Tier 3: Destination Partner */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">Sponsored Guide</h3>
            <div className="font-serif text-3xl font-bold text-slate-900 mb-1">$149<span className="text-base font-normal text-slate-400">/mo</span></div>
            <p className="text-sm text-slate-400 mb-5">Be the reason people plan their trip</p>
            <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Everything in Corridor Leader</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Sponsored placement in guide pages and blog posts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Featured in our newsletter to 65+ subscribers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Cross-linked from related town and category pages</span>
              </li>
            </ul>
            <a
              href="mailto:hello@bestseatosky.com?subject=Sponsored%20Guide%20Inquiry"
              className="block w-full text-center py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors"
            >
              Get Started
            </a>
          </div>

          {/* Tier 4: Local Partner (Premium) */}
          <div className="relative bg-emerald-50/50 rounded-2xl p-6 md:p-8 border-2 border-emerald-400 ring-1 ring-emerald-200">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-emerald-700 text-white text-xs font-bold uppercase tracking-wide px-4 py-1 rounded-full">
                Best Value
              </span>
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1 mt-2">Local Partner</h3>
            <div className="font-serif text-3xl font-bold text-emerald-800 mb-1">$299<span className="text-base font-normal text-slate-400">/mo</span></div>
            <p className="text-sm text-slate-400 mb-5">The full partnership — maximum visibility</p>
            <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Everything in Sponsored Guide</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Dedicated blog post written about your business</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Monthly social media promotion on Facebook and Instagram</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Homepage banner placement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Priority position on relevant guide pages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>&quot;Local Partner&quot; badge on your listing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                <span>Quarterly analytics report — listing views, clicks, and trends</span>
              </li>
            </ul>
            <a
              href="mailto:hello@bestseatosky.com?subject=Local%20Partner%20Inquiry"
              className="block w-full text-center py-3.5 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors"
            >
              Become a Partner
            </a>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-sm text-slate-500 mb-4">Not sure which tier is right for you?</p>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors"
          >
            Talk to Us First
          </Link>
        </div>
      </section>
    </>
  );
}
