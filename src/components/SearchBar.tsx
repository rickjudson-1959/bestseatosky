'use client';

import { useState, useEffect, useRef } from 'react';
import ListingCard from './ListingCard';
import { Listing } from '@/lib/supabase';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    timerRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        setResults(data);
        setSearched(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  return (
    <div className="w-full max-w-xl mx-auto mt-8 mb-2">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search places..."
          className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-slate-400 text-base focus:outline-none focus:border-emerald-400/50 focus:bg-white/15 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors text-lg"
          >
            ✕
          </button>
        )}
      </div>

      {loading && (
        <p className="text-sm text-slate-400 mt-3">Searching...</p>
      )}

      {searched && !loading && (
        <div className="mt-8">
          <p className="text-sm text-slate-400 mb-4">
            {results.length === 0
              ? 'No results found'
              : `${results.length} result${results.length === 1 ? '' : 's'} found`}
          </p>
          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {results.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
