import Link from 'next/link';
import { CUISINES } from '@/lib/cuisines';

type Props = {
  counts: Record<string, number>;
  activeSlug?: string;
};

export default function CuisinePills({ counts, activeSlug }: Props) {
  const items = CUISINES
    .map((c) => ({ ...c, count: counts[c.slug] ?? 0 }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Browse by cuisine
      </div>
      <div className="flex flex-wrap gap-2">
        {activeSlug && (
          <Link
            href="/eat"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-full transition-colors"
          >
            ✕ Clear cuisine
          </Link>
        )}
        {items.map((c) => {
          const isActive = c.slug === activeSlug;
          return (
            <Link
              key={c.slug}
              href={`/eat/cuisine/${c.slug}`}
              aria-current={isActive ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-full border transition-colors ${
                isActive
                  ? 'bg-amber-700 text-white border-amber-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:text-amber-800'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
              <span className={isActive ? 'text-amber-100' : 'text-slate-400'}>{c.count}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
