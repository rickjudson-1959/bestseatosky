import Link from 'next/link';

const FOOTER_LINKS = {
  Restaurants: [
    { label: 'All Restaurants', href: '/eat' },
    { label: 'Squamish Restaurants', href: '/eat?town=squamish' },
    { label: 'Whistler Restaurants', href: '/eat?town=whistler' },
    { label: 'Breweries', href: '/eat?tag=breweries' },
    { label: 'Fine Dining', href: '/eat?tag=fine-dining' },
    { label: 'Cafés & Coffee', href: '/eat?tag=cafes' },
  ],
  'Hotels & Stays': [
    { label: 'All Hotels', href: '/stay' },
    { label: 'Whistler Hotels', href: '/stay?town=whistler' },
    { label: 'Squamish Cabins', href: '/stay?tag=cabins' },
    { label: 'Luxury Lodges', href: '/stay?tag=luxury' },
    { label: 'Camping & RV', href: '/stay?tag=camping' },
    { label: 'Pet-Friendly', href: '/stay?tag=pet-friendly' },
  ],
  Adventures: [
    { label: 'All Activities', href: '/play' },
    { label: 'Hiking Trails', href: '/play?tag=hiking' },
    { label: 'Ski Resorts', href: '/play?tag=skiing' },
    { label: 'Mountain Biking', href: '/play?tag=mountain-biking' },
    { label: 'Rock Climbing', href: '/play?tag=rock-climbing' },
    { label: 'Water Sports', href: '/play?tag=kayaking' },
  ],
  Attractions: [
    { label: 'All Attractions', href: '/visit' },
    { label: 'Waterfalls', href: '/visit?tag=waterfalls' },
    { label: 'Viewpoints', href: '/visit?tag=viewpoints' },
    { label: 'Parks & Nature', href: '/visit?tag=parks' },
    { label: 'Museums', href: '/visit?tag=museums' },
    { label: 'Bridges & Trails', href: '/visit?tag=bridges' },
  ],
  Guides: [
    { label: 'Best Restaurants in Squamish', href: '/guide/best-restaurants-squamish' },
    { label: 'Best Restaurants in Whistler', href: '/guide/best-restaurants-whistler' },
    { label: 'Best Hikes in Squamish', href: '/guide/best-hikes-squamish' },
    { label: 'Best Hikes in Whistler', href: '/guide/best-hikes-whistler' },
    { label: 'Best Hotels in Whistler', href: '/guide/best-hotels-whistler' },
    { label: 'Things to Do in Squamish', href: '/guide/things-to-do-squamish' },
    { label: 'Things to Do in Whistler', href: '/guide/things-to-do-whistler' },
    { label: 'All Guides', href: '/guide' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-12 px-6 text-slate-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-12">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-serif text-base text-white mb-4">{section}</h4>
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-slate-500 text-sm hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <img src="/icon.svg" alt="Best Sea to Sky" className="w-8 h-8" />
            <span className="font-serif text-base text-slate-200">BestSeaToSky</span>
          </div>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Best Sea to Sky. Your guide to the best of the corridor.
          </p>
          <div className="flex gap-4">
            <Link href="/get-listed" className="text-xs text-slate-600 hover:text-slate-400">Get Listed</Link>
            <Link href="/terms" className="text-xs text-slate-600 hover:text-slate-400">Terms</Link>
            <Link href="/privacy" className="text-xs text-slate-600 hover:text-slate-400">Privacy</Link>
            <a href="mailto:hello@bestseatosky.com" className="text-xs text-slate-600 hover:text-slate-400">Contact</a>
            <Link href="/advertise" className="text-xs text-slate-600 hover:text-slate-400">Advertise</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
