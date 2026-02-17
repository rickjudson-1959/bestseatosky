import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advertise on Best Sea to Sky | Reach Thousands of Visitors',
  description:
    'Promote your business to tourists and locals exploring the Sea to Sky corridor. Featured listings, sponsored guides, and premium placement on bestseatosky.com',
};

const TIERS = [
  {
    name: 'Claimed Listing',
    price: 'Free',
    period: '',
    features: [
      'Verify your business ownership',
      'Update your description and contact info',
      'Add your logo and photos',
      'Respond to the "Is this your business?" link',
    ],
    cta: 'Claim Your Listing',
    href: 'mailto:hello@bestseatosky.com?subject=Claim My Listing',
    style: 'border-slate-200',
    buttonStyle: 'bg-slate-900 text-white hover:bg-slate-800',
  },
  {
    name: 'Featured Listing',
    price: '$49',
    period: '/month',
    features: [
      'Everything in Claimed',
      'Featured badge on your listing',
      'Priority placement in category pages',
      'Appear in "Featured Places" on homepage',
      'Highlighted in relevant guide pages',
    ],
    cta: 'Get Featured',
    href: 'mailto:hello@bestseatosky.com?subject=Featured Listing Inquiry',
    style: 'border-emerald-300 ring-2 ring-emerald-100',
    buttonStyle: 'bg-emerald-700 text-white hover:bg-emerald-800',
    popular: true,
  },
  {
    name: 'Sponsored Guide',
    price: '$149',
    period: '/month',
    features: [
      'Everything in Featured',
      'Sponsored placement at top of relevant guide pages',
      'Dedicated section in blog posts',
      'Social media promotion',
      'Monthly analytics report',
    ],
    cta: 'Contact Us',
    href: 'mailto:hello@bestseatosky.com?subject=Sponsored Guide Inquiry',
    style: 'border-slate-200',
    buttonStyle: 'bg-slate-900 text-white hover:bg-slate-800',
  },
];

const REASONS = [
  '859+ verified business listings',
  'Targeted to Sea to Sky corridor visitors and locals',
  'SEO-optimized pages ranking for high-value local searches',
  'Real Google ratings and reviews build trust',
  'Direct links drive traffic to your website',
];

export default function AdvertisePage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">Advertise</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
          Get More Customers From the Sea to Sky Corridor
        </h1>
        <p className="text-slate-500 text-lg">
          Thousands of people search for businesses in Squamish, Whistler, and Pemberton every month.
          Make sure they find yours.
        </p>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
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
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{tier.name}</h3>
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
            <a
              href={tier.href}
              className={`block w-full text-center py-3 rounded-xl text-sm font-bold transition-colors ${tier.buttonStyle}`}
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Why Advertise */}
      <div className="bg-emerald-50 rounded-2xl p-10 border border-emerald-100 mb-16">
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6 text-center">
          Why Advertise on Best Sea to Sky?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {REASONS.map((reason) => (
            <div key={reason} className="flex items-start gap-2.5">
              <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
              <span className="text-sm text-slate-700">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pb-8">
        <p className="text-slate-500">
          Questions? Email us at{' '}
          <a
            href="mailto:hello@bestseatosky.com"
            className="text-emerald-700 font-semibold hover:underline"
          >
            hello@bestseatosky.com
          </a>
        </p>
      </div>
    </section>
  );
}
