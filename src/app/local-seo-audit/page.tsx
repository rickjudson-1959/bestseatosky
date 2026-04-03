import { Metadata } from 'next';
import Link from 'next/link';
import AuditForm from './AuditForm';

export const metadata: Metadata = {
  title: 'Free Local SEO Audit | Best Sea to Sky',
  description:
    'Get a free SEO audit for your Sea to Sky business. See how you rank locally, what\'s working, and what to fix to get more customers from Google.',
  alternates: { canonical: '/local-seo-audit' },
};

const WHAT_YOU_GET = [
  {
    title: 'Google Presence Score',
    description:
      'We analyze your Google Business Profile, reviews, ratings, and how you compare to competitors in your category.',
    emoji: '📊',
  },
  {
    title: 'Website & SEO Check',
    description:
      'We review your website for mobile-friendliness, page speed, meta tags, and local keyword optimization.',
    emoji: '🔍',
  },
  {
    title: 'Action Plan',
    description:
      'A clear list of what to fix first to get more customers finding you on Google, Maps, and local directories.',
    emoji: '📋',
  },
];

const STEPS = [
  'Fill out the form below with your business name and website',
  'We run our audit using AI-powered analysis tools',
  'You receive a personalized report within 48 hours — completely free',
];

export default function LocalSeoAuditPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">Free Local SEO Audit</span>
      </nav>

      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        How Visible Is Your Business Online?
      </h1>

      <p className="text-lg text-slate-600 leading-relaxed mb-12 max-w-2xl">
        Get a free Local SEO Audit and find out how customers in the Sea to Sky corridor
        are finding you — or missing you.
      </p>

      {/* What You'll Get */}
      <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">What You&apos;ll Get</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {WHAT_YOU_GET.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-200 transition-colors"
          >
            <span className="text-3xl block mb-3">{item.emoji}</span>
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">How It Works</h2>

      <div className="flex flex-col gap-4 mb-16">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <span className="font-serif text-lg font-bold text-emerald-700">{i + 1}</span>
            </div>
            <p className="text-slate-600 leading-relaxed pt-2">{step}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div id="audit-form" className="max-w-lg mx-auto mb-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
          <h2 className="font-serif text-xl font-bold text-slate-900 mb-1 text-center">
            Request Your Free Audit
          </h2>
          <p className="text-sm text-slate-500 text-center mb-6">
            Takes 30 seconds. No credit card. No obligation.
          </p>
          <AuditForm />
        </div>
      </div>

      {/* Cross-sell */}
      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center mb-8">
        <p className="text-sm text-slate-600 leading-relaxed">
          Already listed on Best Sea to Sky? Businesses with optimized listings get up to 3x more
          visibility.{' '}
          <Link
            href="/advertise"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Learn about our Featured Listings →
          </Link>
        </p>
      </div>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bestseatosky.com' },
              { '@type': 'ListItem', position: 2, name: 'Free Local SEO Audit', item: 'https://bestseatosky.com/local-seo-audit' },
            ],
          }),
        }}
      />
    </section>
  );
}
