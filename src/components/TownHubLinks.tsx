import Link from 'next/link';
import { getTownHubs } from '@/lib/townHubs';

type Props = {
  townSlug?: string | null;
  townName?: string | null;
  omitCategory?: string | null;
};

export default function TownHubLinks({ townSlug, townName, omitCategory }: Props) {
  const hubs = getTownHubs(townSlug, townName, omitCategory);
  if (hubs.length === 0) return null;
  const heading = townName ? `${townName} hubs` : 'Corridor hubs';

  return (
    <div className="mb-8">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        {heading}
      </p>
      <div className="flex flex-wrap gap-2">
        {hubs.map((hub) => (
          <Link
            key={hub.href}
            href={hub.href}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-800 transition-colors"
          >
            {hub.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
