import { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getTowns } from '@/lib/data';
import GetListedForm from './GetListedForm';

export const metadata: Metadata = {
  title: 'Get Listed | Put Your Business in Front of Sea to Sky Visitors',
  description:
    'Your listing appears alongside top-rated businesses, ranked by real Google reviews. Free to get started — 859+ businesses already listed on Best Sea to Sky.',
  alternates: { canonical: '/get-listed' },
};

const TIERS = [
  {
    name: 'The Local Starter',
    price: 'Free',
    period: '',
    description: 'Get your name in front of people who are already planning a corridor trip',
    features: [
      'Show up alongside the best in your category',
      'Your real Google stars and reviews, front and centre',
      'Address, phone, and website — one click to your door',
      'Found when visitors search your town',
      'Claim and update your info whenever you want',
    ],
    cta: null,
    href: '#get-started',
    style: 'border-slate-200',
    buttonStyle: 'bg-slate-900 text-white hover:bg-slate-800',
  },
  {
    name: 'The Corridor Leader',
    price: '$49',
    period: '/mo',
    description: 'Be the first name visitors see when they\'re planning their trip',
    features: [
      'Everything in Local Starter, plus:',
      'A Featured badge — visitors know you\'re the real deal',
      'First thing people see on your category page',
      'Spotlighted on the homepage for new visitors',
      'Included in our "best of" guides that locals share',
    ],
    cta: 'Become a Corridor Leader',
    href: 'https://buy.stripe.com/5kQaEX9Zx84OftsaROabK00',
    style: 'border-slate-200',
    buttonStyle: 'bg-slate-900 text-white hover:bg-slate-800',
  },
  {
    name: 'The Sponsored Guide',
    price: '$99',
    period: '/mo',
    description: 'Be the reason visitors plan their trip to the corridor',
    features: [
      'Everything in Corridor Leader, plus:',
      'Sponsored placement in guide pages and blog posts',
      'Featured in our newsletter to 65+ subscribers',
      'Cross-linked from related town and category pages',
    ],
    cta: 'Get Started',
    href: 'https://buy.stripe.com/3cIdR97Rpfxg0yy0daabK03',
    style: 'border-slate-200',
    buttonStyle: 'bg-slate-900 text-white hover:bg-slate-800',
  },
  {
    name: 'The Local Partner',
    price: '$149',
    period: '/mo',
    description: 'The full partnership — maximum visibility across the platform',
    features: [
      'Everything in Sponsored Guide, plus:',
      'Dedicated blog post written about your business',
      'Monthly social media promotion on Facebook & Instagram',
      'Homepage banner placement',
      'Priority position on relevant guide pages',
      '"Local Partner" badge on your listing',
      'Quarterly analytics report — views, clicks, and trends',
    ],
    cta: 'Become a Partner',
    href: 'mailto:hello@bestseatosky.com?subject=Local%20Partner%20Inquiry',
    style: 'border-emerald-400 border-2 ring-1 ring-emerald-200 bg-emerald-50/30',
    buttonStyle: 'bg-emerald-700 text-white hover:bg-emerald-800',
    popular: true,
  },
];

const TESTIMONIALS = [
  {
    quote: 'We started getting calls from people saying they found us on Best Sea to Sky. Within a month, we could tell the difference on a Thursday night.',
    name: 'Local Restaurant Owner',
    location: 'Squamish',
  },
  {
    quote: 'The people who find us here are already packed and ready to go. They\'re not browsing — they\'re booking. That\'s the difference.',
    name: 'Adventure Tour Operator',
    location: 'Whistler',
  },
  {
    quote: 'Being listed alongside the places locals actually recommend? That does more for our reputation than any ad we\'ve ever run.',
    name: 'Boutique Hotel Manager',
    location: 'Pemberton',
  },
];

const FAQS = [
  {
    q: 'Is the free listing really free?',
    a: 'Yes — forever. No credit card, no hidden fees, no "free trial" that turns into a bill. Your business gets listed with your Google stars, address, phone, and website at zero cost.',
  },
  {
    q: 'How is this different from Google Maps or Yelp?',
    a: 'Google shows every gas station and ATM between here and Pemberton. We only show the places locals would actually recommend. Your listing appears in curated guides, ranked by real reviews, and seen by people who are specifically planning a Sea to Sky trip — not just searching "restaurants near me" from their couch in Toronto.',
  },
  {
    q: 'What happens when I become a Corridor Leader?',
    a: 'You get a Featured badge on your listing, you show up first on your category page, you\'re spotlighted on the homepage, and you\'re included in the guides that visitors bookmark before their trip. Basically, you become the first name people see when they\'re looking for what you offer.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. All paid tiers — Corridor Leader ($49/mo), Sponsored Guide ($99/mo), and Local Partner ($149/mo) — are month-to-month. No contracts, no penalties. Cancel whenever and your listing just goes back to free.',
  },
  {
    q: 'Who actually sees my listing?',
    a: 'People who are actively planning a trip to Squamish, Whistler, or Pemberton. They\'re searching for the best restaurants, trails, hotels, and things to do — and finding our guides. These aren\'t random clicks. These are people who are going to show up.',
  },
  {
    q: 'My business is already on your site. How do I claim it?',
    a: 'Find your listing and click "Claim This Listing" in the sidebar. We\'ll verify you\'re the owner and give you the keys — update your description, add photos, fix your hours. It\'s your listing.',
  },
];

export default async function GetListedPage() {
  const [categories, towns] = await Promise.all([getCategories(), getTowns()]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2318] via-[#1a3a2a] to-[#0f2318] px-6 py-20 md:py-24 text-center">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-emerald-400 text-sm font-semibold tracking-[3px] uppercase mb-5">
            859+ BUSINESSES ALREADY LISTED
          </p>
          <h1 className="font-serif font-bold text-white text-4xl md:text-5xl leading-tight mb-5">
            The Visitors Are Already Looking for You. Let&apos;s Make Sure They Find You.
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto mb-10">
            859+ corridor businesses are already listed — from Squamish breweries to Whistler
            lodges to Pemberton adventure outfits. Getting your name in front of trip-planners
            takes 30 seconds, and it&apos;s free.
          </p>
          <a
            href="#get-started"
            className="inline-flex px-8 py-4 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors"
          >
            Get Your Free Listing
          </a>
        </div>
      </section>

      {/* SOCIAL PROOF STATS */}
      <section className="bg-white border-b border-slate-100 px-6 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="font-serif text-3xl font-bold text-slate-900">859+</div>
            <div className="text-sm text-slate-500 mt-1">Local Businesses</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-slate-900">50K+</div>
            <div className="text-sm text-slate-500 mt-1">Real Google Reviews</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-slate-900">27+</div>
            <div className="text-sm text-slate-500 mt-1">&quot;Best Of&quot; Guides</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-slate-900">6</div>
            <div className="text-sm text-slate-500 mt-1">Corridor Towns</div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
            What Business Owners Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-200">
                <p className="text-sm text-slate-600 leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING COMPARISON */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Pick What Works for You
            </h2>
            <p className="text-slate-500">
              Start free. See what it does for your business. Upgrade if and when it makes sense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-2xl p-7 border ${tier.style} flex flex-col relative`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">{tier.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{tier.description}</p>
                <div className="mb-5">
                  <span className="text-3xl font-bold text-slate-900">{tier.price}</span>
                  {tier.period && <span className="text-sm text-slate-400">{tier.period}</span>}
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-emerald-600 mt-0.5 shrink-0">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {tier.cta ? (
                  <>
                    <a
                      href={tier.href}
                      className={`block w-full text-center py-3 rounded-xl text-sm font-bold transition-colors ${tier.buttonStyle}`}
                    >
                      {tier.cta}
                    </a>
                    {tier.href.startsWith('mailto:') && (
                      <p className="text-xs text-slate-400 text-center mt-2">
                        Or email us directly at{' '}
                        <a href="mailto:hello@bestseatosky.com" className="underline hover:text-slate-600">
                          hello@bestseatosky.com
                        </a>
                      </p>
                    )}
                  </>
                ) : (
                  <a
                    href="#get-started"
                    className={`block w-full text-center py-3 rounded-xl text-sm font-bold transition-colors ${tier.buttonStyle}`}
                  >
                    Get Started Free
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-4 px-5 font-semibold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-3 font-semibold text-slate-900">Local Starter</th>
                  <th className="text-center py-4 px-3 font-semibold text-slate-900">Corridor Leader</th>
                  <th className="text-center py-4 px-3 font-semibold text-slate-900">Sponsored Guide</th>
                  <th className="text-center py-4 px-3 font-semibold text-emerald-700 bg-emerald-50/50">Local Partner</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Found when visitors search your town', true, true, true, true],
                  ['Your real Google stars shown', true, true, true, true],
                  ['One-click to your website, phone, map', true, true, true, true],
                  ['Update your info anytime', true, true, true, true],
                  ['Featured badge & priority placement', false, true, true, true],
                  ['Enhanced listing with photos', false, true, true, true],
                  ['Included in "Best Of" guide pages', false, true, true, true],
                  ['Sponsored placement in guides & blog', false, false, true, true],
                  ['Featured in newsletter (65+ subscribers)', false, false, true, true],
                  ['Cross-linked from town & category pages', false, false, true, true],
                  ['Dedicated blog post about your business', false, false, false, true],
                  ['Monthly social media promotion', false, false, false, true],
                  ['Homepage banner placement', false, false, false, true],
                  ['"Local Partner" badge on listing', false, false, false, true],
                  ['Quarterly analytics report', false, false, false, true],
                ].map(([feature, free, leader, sponsored, partner], i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 px-5 text-slate-600">{feature as string}</td>
                    <td className="text-center py-3 px-3">
                      {free ? <span className="text-emerald-600">&#10003;</span> : <span className="text-slate-200">—</span>}
                    </td>
                    <td className="text-center py-3 px-3">
                      {leader ? <span className="text-emerald-600">&#10003;</span> : <span className="text-slate-200">—</span>}
                    </td>
                    <td className="text-center py-3 px-3">
                      {sponsored ? <span className="text-emerald-600">&#10003;</span> : <span className="text-slate-200">—</span>}
                    </td>
                    <td className="text-center py-3 px-3 bg-emerald-50/30">
                      {partner ? <span className="text-emerald-600">&#10003;</span> : <span className="text-slate-200">—</span>}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50">
                  <td className="py-4 px-5 font-semibold text-slate-900">Investment</td>
                  <td className="text-center py-4 px-3 font-bold text-slate-900">Free forever</td>
                  <td className="text-center py-4 px-3 font-bold text-slate-900">$49/mo</td>
                  <td className="text-center py-4 px-3 font-bold text-slate-900">$99/mo</td>
                  <td className="text-center py-4 px-3 font-bold text-emerald-700 bg-emerald-50/50">$149/mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GET STARTED FORM */}
      <section id="get-started" className="px-6 py-20">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Let&apos;s Get You Listed
            </h2>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 mb-8">
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              On the big platforms, your business is just another pin between a gas station and
              an ATM. Here, you&apos;re listed alongside the spots that locals actually recommend —
              the brewery with the best patio, the trail guide everyone trusts, the hotel
              that people drive two hours to stay at.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              <strong className="text-slate-900">That&apos;s the company you keep on Best Sea to Sky.</strong>{' '}
              Every listing is vetted by people who live in the corridor. We don&apos;t list
              everything — we list the best. And we think your business belongs here.
            </p>
            <p className="text-sm text-slate-700 font-semibold">
              30 seconds. Free forever. Upgrade if and when it makes sense.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
            <GetListedForm categories={categories} towns={towns} />
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-500 text-sm">
              Questions? Email us at{' '}
              <a
                href="mailto:hello@bestseatosky.com"
                className="text-emerald-700 font-semibold hover:underline"
              >
                hello@bestseatosky.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
