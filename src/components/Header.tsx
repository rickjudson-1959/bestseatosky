'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { slug: 'eat', label: 'Eat' },
  { slug: 'stay', label: 'Stay' },
  { slug: 'play', label: 'Play' },
  { slug: 'visit', label: 'Visit' },
  { slug: 'shop', label: 'Shop' },
  { slug: 'services', label: 'Services' },
  { slug: 'guide', label: 'Guides' },
  { slug: 'blog', label: 'Blog' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/icon.svg" alt="Best Sea to Sky" className="w-9 h-9" />
          <span className="font-serif text-xl font-bold text-slate-900">
            Best<span className="text-emerald-700">SeaToSky</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(`/${item.slug}`);
            return (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-slate-100 bg-white px-6 pb-4 pt-2">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(`/${item.slug}`);
              return (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
