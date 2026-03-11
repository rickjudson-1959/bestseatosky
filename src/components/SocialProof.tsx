import Link from 'next/link';

const VISITOR_TESTIMONIALS = [
  {
    quote:
      'We used Best Sea to Sky for our entire Whistler trip. Every restaurant rec was a hit — way better than scrolling TripAdvisor.',
    name: 'Sarah M.',
    context: 'Weekend trip from Vancouver',
  },
  {
    quote:
      'Found a trailhead in Squamish I never would have discovered on Google Maps. This site is like having a local friend in every town.',
    name: 'James K.',
    context: 'First-time corridor visitor',
  },
  {
    quote:
      'Planned our family road trip from Vancouver to Pemberton entirely through this site. The guides are incredibly well-curated.',
    name: 'Priya R.',
    context: 'Family trip, 5 days on the corridor',
  },
];

const TRUST_STATS = [
  { value: '859+', label: 'Locally Curated Listings' },
  { value: '50K+', label: 'Google Reviews Displayed' },
  { value: '27+', label: 'Best-Of Guides' },
  { value: '6', label: 'Corridor Towns' },
];

/**
 * Full testimonial section — use on homepage and guides index.
 */
export function VisitorTestimonials() {
  return (
    <section className="bg-slate-50 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <p className="text-emerald-700 text-xs font-semibold tracking-[3px] uppercase text-center mb-3">
          WHAT VISITORS SAY
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 text-center mb-10">
          Trusted by Thousands of Corridor Visitors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {VISITOR_TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                <div className="text-xs text-slate-400">{t.context}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Compact trust strip — use on category pages and guide detail pages.
 * One line with stats + a testimonial quote.
 */
export function TrustStrip() {
  return (
    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div className="flex items-center gap-6 shrink-0">
          <div className="text-center">
            <div className="font-serif text-lg font-bold text-emerald-700">859+</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Listings</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center">
            <div className="font-serif text-lg font-bold text-emerald-700">50K+</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Reviews</div>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div className="text-center">
            <div className="font-serif text-lg font-bold text-emerald-700">27+</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wide">Guides</div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 italic leading-relaxed">
            &ldquo;Every restaurant rec was a hit — way better than scrolling TripAdvisor.&rdquo;{' '}
            <span className="text-slate-400 not-italic">— Sarah M., weekend trip from Vancouver</span>
          </p>
        </div>
        <Link
          href="/why"
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 whitespace-nowrap shrink-0"
        >
          Why us →
        </Link>
      </div>
    </div>
  );
}
