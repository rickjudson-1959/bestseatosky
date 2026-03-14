import Link from 'next/link';
import { SeoPage } from '@/lib/supabase';

export default function FeaturedInGuides({
  guides,
  listingName,
}: {
  guides: SeoPage[];
  listingName: string;
}) {
  if (guides.length === 0) return null;

  return (
    <div className="mt-10 pt-8 border-t border-slate-100">
      <h3 className="font-serif text-lg text-slate-900 mb-4">
        {listingName} is featured in
      </h3>
      <div className="space-y-2">
        {guides.map((guide) => (
          <Link
            key={guide.id}
            href={`/guide/${guide.slug}`}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:border-emerald-200 hover:bg-emerald-50 transition-all group"
          >
            <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-800 transition-colors">
              {guide.h1_text || guide.title}
            </span>
            <span className="text-emerald-600 text-sm font-semibold flex-shrink-0 ml-3">
              View Guide →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
