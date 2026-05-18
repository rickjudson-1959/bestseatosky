import Link from 'next/link';
import { FEATURE_BY_SLUG } from '@/lib/features';

type Props = {
  categorySlug: string;
  features: { slug: string; name: string; count: number }[];
  activeSlug?: string;
};

export default function FeaturePills({ categorySlug, features, activeSlug }: Props) {
  if (features.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Filter by feature
      </div>
      <div className="flex flex-wrap gap-2">
        {activeSlug && (
          <Link
            href={`/${categorySlug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-full transition-colors"
          >
            ✕ Clear filter
          </Link>
        )}
        {features.map((f) => {
          const def = FEATURE_BY_SLUG[f.slug];
          const icon = def?.icon ?? '✨';
          const isActive = f.slug === activeSlug;
          return (
            <Link
              key={f.slug}
              href={`/${categorySlug}/with/${f.slug}`}
              aria-current={isActive ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full border transition-colors ${
                isActive
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:text-emerald-800'
              }`}
            >
              <span>{icon}</span>
              <span>{f.name}</span>
              <span className={isActive ? 'text-emerald-100' : 'text-slate-400'}>{f.count}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
