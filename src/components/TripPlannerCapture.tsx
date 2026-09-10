import NewsletterSignup from '@/components/NewsletterSignup';

type Props = {
  source: string;
  variant?: 'compact' | 'default';
};

export default function TripPlannerCapture({ source, variant = 'compact' }: Props) {
  if (variant === 'default') {
    return (
      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">
          Get the free Sea to Sky trip planner
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Local picks for Squamish, Whistler, and Pemberton. Where to eat, what to do, and what to skip.
        </p>
        <NewsletterSignup source={source} />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
      <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
        Free trip planner
      </p>
      <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
        Get local picks in your inbox
      </h3>
      <p className="text-sm text-slate-500 mb-4 leading-relaxed">
        A short list of where to eat, stay, and stop, sent to your email.
      </p>
      <NewsletterSignup source={source} variant="compact" />
    </div>
  );
}
