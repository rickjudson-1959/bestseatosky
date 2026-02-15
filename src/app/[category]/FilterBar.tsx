'use client';

import { useState, useMemo } from 'react';
import { Listing, Tag, Town } from '@/lib/supabase';
import ListingCard from '@/components/ListingCard';

const CAT_STYLES: Record<string, { activeBg: string; activeText: string; bg: string; text: string; border: string }> = {
  eat: { activeBg: 'bg-amber-700', activeText: 'text-white', bg: 'bg-white', text: 'text-amber-700', border: 'border-orange-200' },
  stay: { activeBg: 'bg-indigo-700', activeText: 'text-white', bg: 'bg-white', text: 'text-indigo-700', border: 'border-indigo-200' },
  play: { activeBg: 'bg-emerald-700', activeText: 'text-white', bg: 'bg-white', text: 'text-emerald-700', border: 'border-emerald-200' },
  visit: { activeBg: 'bg-pink-700', activeText: 'text-white', bg: 'bg-white', text: 'text-pink-700', border: 'border-pink-200' },
  shop: { activeBg: 'bg-orange-700', activeText: 'text-white', bg: 'bg-white', text: 'text-orange-700', border: 'border-orange-200' },
  services: { activeBg: 'bg-sky-700', activeText: 'text-white', bg: 'bg-white', text: 'text-sky-700', border: 'border-sky-200' },
};

type Props = {
  listings: Listing[];
  tags: Tag[];
  towns: Town[];
  categorySlug: string;
  initialTown?: string;
  initialTag?: string;
};

export default function FilterBar({ listings, tags, towns, categorySlug, initialTown, initialTag }: Props) {
  const [activeTown, setActiveTown] = useState(initialTown || 'all');
  const [activeTags, setActiveTags] = useState<string[]>(initialTag ? [initialTag] : []);

  const styles = CAT_STYLES[categorySlug] || CAT_STYLES.eat;

  const toggleTag = (tagSlug: string) => {
    setActiveTags((prev) =>
      prev.includes(tagSlug) ? prev.filter((t) => t !== tagSlug) : [...prev, tagSlug]
    );
  };

  const filtered = useMemo(() => {
    return listings.filter((listing) => {
      // Town filter
      if (activeTown !== 'all') {
        const townSlug = listing.towns?.slug;
        if (townSlug !== activeTown) return false;
      }

      // Tag filter
      if (activeTags.length > 0) {
        const listingTagSlugs = listing.listing_tags?.map((lt) => lt.tags?.slug) || [];
        if (!activeTags.some((t) => listingTagSlugs.includes(t))) return false;
      }

      return true;
    });
  }, [listings, activeTown, activeTags]);

  return (
    <>
      {/* Town Filter */}
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-1">Town:</span>
        <button
          onClick={() => setActiveTown('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
            activeTown === 'all'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
          }`}
        >
          All
        </button>
        {towns.map((town) => (
          <button
            key={town.id}
            onClick={() => setActiveTown(town.slug)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              activeTown === town.slug
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
            }`}
          >
            {town.name}
          </button>
        ))}
      </div>

      {/* Tag Filter */}
      <div className="flex gap-2 mb-8 flex-wrap items-center">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-1">Tags:</span>
        {tags.map((tag) => {
          const isActive = activeTags.includes(tag.slug);
          return (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.slug)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                isActive
                  ? `${styles.activeBg} ${styles.activeText} border-transparent`
                  : `${styles.bg} ${styles.text} ${styles.border} hover:opacity-80`
              }`}
            >
              {tag.name}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-400 mb-6">{filtered.length} places found</p>

      {/* Listing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <span className="text-5xl block mb-4">🏔️</span>
          <h3 className="font-serif text-xl text-slate-600 mb-2">No places found</h3>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </>
  );
}
