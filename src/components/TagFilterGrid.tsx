'use client';

import { useState, useMemo } from 'react';
import { Listing, Tag } from '@/lib/supabase';
import ListingCard from '@/components/ListingCard';

type Props = {
  listings: Listing[];
  tags: Tag[];
};

export default function TagFilterGrid({ listings, tags }: Props) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tagSlug: string) => {
    setActiveTags((prev) =>
      prev.includes(tagSlug) ? prev.filter((t) => t !== tagSlug) : [...prev, tagSlug]
    );
  };

  const filtered = useMemo(() => {
    const result = listings.filter((listing) => {
      if (activeTags.length > 0) {
        const listingTagSlugs = listing.listing_tags?.map((lt) => lt.tags?.slug) || [];
        if (!activeTags.some((t) => listingTagSlugs.includes(t))) return false;
      }
      return true;
    });

    return result.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (b.google_rating || 0) - (a.google_rating || 0);
    });
  }, [listings, activeTags]);

  return (
    <>
      {/* Tag Filter */}
      {tags.length > 0 && (
        <div className="flex gap-2 mb-8 flex-wrap items-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mr-1">Filter:</span>
          {tags.map((tag) => {
            const isActive = activeTags.includes(tag.slug);
            return (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  isActive
                    ? 'bg-amber-700 text-white border-transparent'
                    : 'bg-white text-amber-700 border-orange-200 hover:opacity-80'
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-slate-400 mb-6">{filtered.length} restaurants found</p>

      {/* Listing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <span className="text-5xl block mb-4">🍽️</span>
          <h3 className="font-serif text-xl text-slate-600 mb-2">No restaurants found</h3>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      )}
    </>
  );
}
