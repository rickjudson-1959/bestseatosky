import Link from 'next/link';
import { buildUTMUrl } from '@/lib/utm';
import { getPrimaryTownHub } from '@/lib/townHubs';

type Props = {
  listingName: string;
  categorySlug: string;
  listingSlug: string;
  address?: string | null;
  townSlug?: string | null;
  townName?: string | null;
  accentClass: string;
};

export default function ListingNextStep({
  listingName,
  categorySlug,
  listingSlug,
  address,
  townSlug,
  townName,
  accentClass,
}: Props) {
  const directionsUrl = address
    ? buildUTMUrl(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
        { campaign: categorySlug, content: listingSlug },
      )
    : null;
  const primaryHub = getPrimaryTownHub(categorySlug, townSlug, townName);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 mb-8">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Next step
      </p>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
        Ready for {listingName}? Get there, or keep planning this town.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        {directionsUrl ? (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex justify-center items-center px-5 py-3 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90 ${accentClass}`}
          >
            Get directions
          </a>
        ) : (
          <Link
            href="/trip-planner"
            className={`inline-flex justify-center items-center px-5 py-3 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90 ${accentClass}`}
          >
            Plan this stop
          </Link>
        )}
        <Link
          href={primaryHub.href}
          className="inline-flex justify-center items-center px-5 py-3 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold hover:bg-slate-100 transition-colors"
        >
          {primaryHub.label}
        </Link>
        {directionsUrl && (
          <Link
            href="/trip-planner"
            className="inline-flex justify-center items-center px-5 py-3 rounded-xl text-emerald-800 text-sm font-bold hover:text-emerald-900 transition-colors"
          >
            Plan this stop
          </Link>
        )}
      </div>
    </div>
  );
}
