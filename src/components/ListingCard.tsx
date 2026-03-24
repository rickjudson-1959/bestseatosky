import Link from 'next/link';
import { Listing } from '@/lib/supabase';
import FallbackImage from './FallbackImage';

const CAT_STYLES: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  eat: { bg: 'bg-orange-50', text: 'text-amber-700', border: 'border-orange-200', gradient: 'from-orange-500 to-red-600' },
  stay: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', gradient: 'from-indigo-500 to-purple-600' },
  play: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', gradient: 'from-emerald-500 to-green-600' },
  visit: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', gradient: 'from-pink-500 to-rose-600' },
  shop: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', gradient: 'from-amber-500 to-red-500' },
  services: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', gradient: 'from-sky-500 to-indigo-600' },
};

const CAT_ICONS: Record<string, string> = {
  eat: '🍽️',
  stay: '🏔️',
  play: '⛷️',
  visit: '🌲',
  shop: '🛍️',
  services: '🧭',
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-px">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-sm ${i < Math.floor(rating) ? 'text-amber-400' : 'text-slate-200'}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function PriceLevel({ level }: { level: number }) {
  if (level === 0) return <span className="text-emerald-600 font-semibold text-xs">Free</span>;
  return (
    <span className="text-xs">
      {[...Array(4)].map((_, i) => (
        <span key={i} className={i < level ? 'text-slate-800 font-bold' : 'text-slate-300'}>$</span>
      ))}
    </span>
  );
}

export default function ListingCard({ listing }: { listing: Listing }) {
  const catSlug = listing.categories?.slug || 'eat';
  const styles = CAT_STYLES[catSlug] || CAT_STYLES.eat;
  const tags = listing.listing_tags?.map((lt) => lt.tags) || [];
  const isFeatured = listing.featured === true;

  return (
    <Link href={`/${catSlug}/${listing.slug}`}>
      <div className={`rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl shadow-sm group ${
        isFeatured
          ? 'bg-emerald-50/40 border-2 border-emerald-300 hover:border-emerald-400 ring-1 ring-emerald-100'
          : 'bg-white border border-slate-100 hover:border-slate-200'
      }`}>
        {/* Image / Gradient Header */}
        <div className={`h-44 bg-gradient-to-br ${styles.gradient} relative overflow-hidden`}>
          {listing.featured_image_url ? (
            <FallbackImage
              src={listing.featured_image_url}
              alt={listing.name}
              className="w-full h-full object-cover"
              loading="lazy"
              fallbackEmoji={CAT_ICONS[catSlug]}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl opacity-20 saturate-0 brightness-200">
                {CAT_ICONS[catSlug]}
              </span>
            </div>
          )}
          <div className={`absolute top-3 left-3 ${styles.bg} rounded-full px-3 py-1 text-xs font-semibold ${styles.text} uppercase tracking-wide`}>
            {listing.towns?.name || 'Sea to Sky'}
          </div>
          {isFeatured && (
            <div className="absolute bottom-3 left-3 bg-emerald-700 rounded-full px-3 py-1 text-xs font-bold text-white tracking-wide flex items-center gap-1">
              ★ Featured
            </div>
          )}
          <div className="absolute top-3 right-3 bg-black/60 rounded-full px-2.5 py-1 text-xs font-semibold text-white flex items-center gap-1">
            ★ {listing.google_rating?.toFixed(1) || '–'}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-lg font-bold text-slate-900 mb-1.5 leading-tight group-hover:text-emerald-800 transition-colors">
            {listing.name}
          </h3>
          <p className="text-sm text-slate-500 mb-3 line-clamp-2 leading-relaxed">
            {listing.short_description || listing.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Stars rating={listing.google_rating || 0} />
              <span className="text-xs text-slate-400">
                ({(listing.google_review_count || 0).toLocaleString()})
              </span>
            </div>
            <PriceLevel level={listing.price_level || 0} />
          </div>

          {tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag.id}
                  className={`${styles.bg} ${styles.text} text-xs font-semibold rounded-full px-2.5 py-0.5 border ${styles.border}`}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
