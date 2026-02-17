'use client';

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

        <div className="w-48">
          {/* Search placeholder - will be functional later */}
        </div>
      </div>
    </header>
  );
}
