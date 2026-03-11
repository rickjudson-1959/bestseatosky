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
    name: 'Free Listing',
    price: 'Free',
    period: '',
    description: 'Get discovered by corridor visitors',
    features: [
      'Listed in category and town pages',
      'Google rating and reviews displayed',
      'Address, phone, and website links',
      'Appear in search results',
      'Claim and update your info anytime',
    ],
    cta: null,
    href: '#get-started',
    style: 'border-slate-200',
    buttonStyle: 'bg-slate-900 text-white hover:bg-slate-800',
  },
  {
    name: 'Featured',
    price: '$49',
    period: '/mo',
    description: 'Stand out from the competition',
    features: [
      'Everything in Free, plus:',
      'Featured badge on your listing',
      'Priority placement in category pages',
      'Appear in "Featured Places" on homepage',
      'Highlighted in relevant guide pages',
    ],
    cta: 'Get Featured',
    href: 'https://buy.stripe.com/5kQaEX9Zx84OftsaROabK00',
    style: 'border-emerald-300 ring-2 ring-emerald-100',
    buttonStyle: 'bg-emerald-700 text-white hover:bg-emerald-800',
    popular: true,
  },
  {
    name: 'Sponsored',
    price: '$149',
    period: '/mo',
    description: 'Maximum visibility across the site',
    features: [
      'Everything in Featured, plus:',
      'Sponsored placement at top of guide pages',
      'Dedicated section in blog posts',
      'Social media promotion',
      'Monthly analytics report',
    ],
    cta: 'Go Sponsored',
    href: 'https://buy.stripe.com/3cI00j8Vt84Ogxw8JGabK01',
    style: 'border-slate-200',
    buttonStyle: 'bg-slate-900 text-white hover:bg-slate-800',
  },
];

const TESTIMONIALS = [
  {
    quote: 'We saw a noticeable jump in website clicks within the first month. The listing basically pays for itself.',
    name: 'Local Restaurant Owner',
    location: 'Squamish',
  },
  {
    quote: 'Best Sea to Sky sends us more qualified traffic than our Google Ads. People who find us here are ready to book.',
    name: 'Adventure Tour Operator',
    location: 'Whistler',
  },
  {
    quote: 'Being featured in the guides alongside other top-rated places gives us credibility we couldn\'t buy anywhere else.',
    name: 'Boutique Hotel Manager',
    location: 'Pemberton',
  },
];

const FAQS = [
  {
    q: 'Is the free listing really free?',
    a: 'Yes — forever. Your business gets listed with your Google rating, address, phone, website, and hours at no cost. No credit card required, no hidden fees.',
  },
  {
    q: 'How is this different from Google Maps or Yelp?',
    a: 'We focus exclusively on the Sea to Sky corridor. Your listing appears alongside curated guides, ranked by real Google reviews, and targeted to people actively exploring from West Vancouver to Pemberton. No global noise.',
  },
  {
    q: 'What does a Featured listing look like?',
    a: 'Featured businesses get a badge on their listing, priority placement at the top of category pages, a spot in the "Featured Places" section on the homepage, and highlighting in our curated guide pages.',
  },
  {
    q: 'Can I cancel my paid plan anytime?',
    a: 'Yes. Both Featured ($49/mo) and Sponsored ($149/mo) plans are month-to-month with no contracts. Cancel anytime and your listing reverts to the free tier.',
  },
  {
    q: 'How many people visit Best Sea to Sky?',
    a: 'We have 859+ verified business listings and growing organic traffic from people searching for businesses in Squamish, Whistler, and Pemberton. Our guides rank for high-intent local searches.',
  },
  {
    q: 'My business is already listed. How do I claim it?',
    a: 'Find your listing on our site and click "Claim This Listing" in the sidebar. We\'ll verify your ownership and give you control to update your description, photos, and contact info.',
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
          <h1 className="font-serif font-bold text-white mb-5">
            <span className="block text-4xl md:text-5xl mb-2">Put Your Business</span>
            <span className="block text-4xl md:text-5xl leading-tight">in Front of Sea to Sky Visitors</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-xl mx-auto mb-10">
            Your listing appears alongside top-rated businesses, ranked by real Google reviews.
            Free to get started.
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
            <div className="text-sm text-slate-500 mt-1">Verified Listings</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-slate-900">50K+</div>
            <div className="text-sm text-slate-500 mt-1">Google Reviews</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-slate-900">27+</div>
            <div className="text-sm text-slate-500 mt-1">Curated Guides</div>
          </div>
          <div>
            <div className="font-serif text-3xl font-bold text-slate-900">6</div>
            <div className="text-sm text-slate-500 mt-1">Towns Covered</div>
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
              Choose Your Level of Visibility
            </h2>
            <p className="text-slate-500">
              Every plan starts with a free listing. Upgrade when you&apos;re ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                  <a
                    href={tier.href}
                    className={`block w-full text-center py-3 rounded-xl text-sm font-bold transition-colors ${tier.buttonStyle}`}
                  >
                    {tier.cta}
                  </a>
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
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left py-4 px-5 font-semibold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900">Free</th>
                  <th className="text-center py-4 px-4 font-semibold text-emerald-700 bg-emerald-50/50">Featured</th>
                  <th className="text-center py-4 px-4 font-semibold text-slate-900">Sponsored</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Listed in category pages', true, true, true],
                  ['Google rating displayed', true, true, true],
                  ['Address, phone & website', true, true, true],
                  ['Claim & update your info', true, true, true],
                  ['Featured badge', false, true, true],
                  ['Priority placement', false, true, true],
                  ['Homepage featured section', false, true, true],
                  ['Highlighted in guides', false, true, true],
                  ['Top of guide pages', false, false, true],
                  ['Blog post features', false, false, true],
                  ['Social media promotion', false, false, true],
                  ['Monthly analytics', false, false, true],
                ].map(([feature, free, featured, sponsored], i) => (
                  <tr key={i} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 px-5 text-slate-600">{feature as string}</td>
                    <td className="text-center py-3 px-4">
                      {free ? <span className="text-emerald-600">&#10003;</span> : <span className="text-slate-200">—</span>}
                    </td>
                    <td className="text-center py-3 px-4 bg-emerald-50/30">
                      {featured ? <span className="text-emerald-600">&#10003;</span> : <span className="text-slate-200">—</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {sponsored ? <span className="text-emerald-600">&#10003;</span> : <span className="text-slate-200">—</span>}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50">
                  <td className="py-4 px-5 font-semibold text-slate-900">Price</td>
                  <td className="text-center py-4 px-4 font-bold text-slate-900">Free</td>
                  <td className="text-center py-4 px-4 font-bold text-emerald-700 bg-emerald-50/50">$49/mo</td>
                  <td className="text-center py-4 px-4 font-bold text-slate-900">$149/mo</td>
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
              Don&apos;t Get Lost in the Noise of the Big Tech Giants.
            </h2>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 mb-8">
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              On Google Maps, you&apos;re one of 200 pins. On TripAdvisor, you&apos;re buried
              under ads and fake reviews. On Tourism Whistler, you don&apos;t exist unless
              you&apos;re in Whistler.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              <strong className="text-slate-900">Here, you&apos;re part of an elite, curated collection.</strong>{' '}
              Every listing on Best Sea to Sky has been vetted by locals who actually live in the corridor.
              Your business doesn&apos;t compete with gas stations and ATMs — it sits alongside the best
              restaurants, trails, hotels, and experiences the Sea to Sky has to offer.
            </p>
            <p className="text-sm text-slate-700 font-semibold">
              Get listed in 30 seconds. Free forever. Upgrade when you&apos;re ready.
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
