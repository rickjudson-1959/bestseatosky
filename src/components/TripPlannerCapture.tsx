import NewsletterSignup from '@/components/NewsletterSignup';

type Props = {
  source: string;
  variant?: 'compact' | 'default';
  className?: string;
  /** Set on the first/primary capture on a page so we never duplicate the id. */
  anchor?: boolean;
  /** PDF link shown only after signup succeeds. */
  successDownloadHref?: string;
};

const HEADING = 'Get the Free Sea to Sky Trip Planner';
const DEFAULT_BLURB =
  'Local picks for Squamish, Whistler, and Pemberton. Where to eat, what to do, and what to skip. Enter your email and we will send it.';
const COMPACT_BLURB =
  'Where to eat, stay, and stop across Squamish, Whistler, and Pemberton. Enter your email and we will send it.';

export default function TripPlannerCapture({
  source,
  variant = 'compact',
  className = '',
  anchor = false,
  successDownloadHref,
}: Props) {
  const anchorProps = anchor ? { id: 'trip-planner' } : {};

  if (variant === 'default') {
    return (
      <div
        {...anchorProps}
        className={`scroll-mt-24 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-8 md:p-10 text-center shadow-sm ${className}`}
      >
        <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
          Free download
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          {HEADING}
        </h2>
        <p className="text-sm md:text-base text-slate-600 mb-6 max-w-xl mx-auto leading-relaxed">
          {DEFAULT_BLURB}
        </p>
        <NewsletterSignup source={source} successDownloadHref={successDownloadHref} />
      </div>
    );
  }

  return (
    <div
      {...anchorProps}
      className={`scroll-mt-24 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-5 md:p-6 ${className}`}
    >
      <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
        Free download
      </p>
      <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
        {HEADING}
      </h3>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
        {COMPACT_BLURB}
      </p>
      <NewsletterSignup source={source} variant="compact" successDownloadHref={successDownloadHref} />
    </div>
  );
}
