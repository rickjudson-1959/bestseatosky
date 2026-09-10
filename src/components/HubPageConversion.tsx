import Link from 'next/link';
import TownHubLinks from '@/components/TownHubLinks';
import TripPlannerCapture from '@/components/TripPlannerCapture';

type Props = {
  townSlug: string;
  townName: string;
  primaryCta: { href: string; label: string };
  source: string;
  omitCategory?: string;
};

export default function HubPageConversion({
  townSlug,
  townName,
  primaryCta,
  source,
  omitCategory,
}: Props) {
  return (
    <div className="mb-10 space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Next step
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={primaryCta.href}
            className="inline-flex justify-center items-center px-5 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors"
          >
            {primaryCta.label}
          </Link>
          <Link
            href="/trip-planner"
            className="inline-flex justify-center items-center px-5 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold hover:bg-slate-100 transition-colors"
          >
            Get the trip planner
          </Link>
        </div>
      </div>
      <TownHubLinks townSlug={townSlug} townName={townName} omitCategory={omitCategory} />
      <TripPlannerCapture source={source} />
    </div>
  );
}
