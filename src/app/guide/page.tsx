import { Metadata } from 'next';
import Link from 'next/link';
import { getAllSeoPages } from '@/lib/data';
import NewsletterSignup from '@/components/NewsletterSignup';
import { VisitorTestimonials } from '@/components/SocialProof';

export const metadata: Metadata = {
  title: 'Sea to Sky Guides | Best Of Lists for Squamish, Whistler & Pemberton',
  description:
    'Browse our curated guides to the best restaurants, hikes, hotels, and attractions across the Sea to Sky corridor. Rankings based on real Google reviews.',
  alternates: { canonical: '/guide' },
};

const CAT_STYLES: Record<string, { gradient: string; text: string; border: string; bg: string }> = {
  eat: { gradient: 'from-orange-500 to-red-600', text: 'text-amber-700', border: 'border-orange-200', bg: 'bg-orange-50' },
  stay: { gradient: 'from-indigo-500 to-purple-600', text: 'text-indigo-700', border: 'border-indigo-200', bg: 'bg-indigo-50' },
  play: { gradient: 'from-emerald-500 to-green-600', text: 'text-emerald-700', border: 'border-emerald-200', bg: 'bg-emerald-50' },
  visit: { gradient: 'from-pink-500 to-rose-600', text: 'text-pink-700', border: 'border-pink-200', bg: 'bg-pink-50' },
  shop: { gradient: 'from-amber-500 to-red-500', text: 'text-orange-700', border: 'border-orange-200', bg: 'bg-orange-50' },
  services: { gradient: 'from-sky-500 to-indigo-600', text: 'text-sky-700', border: 'border-sky-200', bg: 'bg-sky-50' },
};

export default async function GuidesPage() {
  const pages = await getAllSeoPages();

  // Group by category
  const grouped: Record<string, { name: string; slug: string; pages: typeof pages }> = {};
  for (const page of pages) {
    const cat = page.categories;
    if (!cat) continue;
    if (!grouped[cat.id]) {
      grouped[cat.id] = { name: cat.name, slug: cat.slug, pages: [] };
    }
    grouped[cat.id].pages.push(page);
  }

  // Sort groups by category display_order
  const sortedGroups = Object.values(grouped).sort((a, b) => {
    const order = ['eat', 'stay', 'play', 'visit', 'shop', 'services'];
    return order.indexOf(a.slug) - order.indexOf(b.slug);
  });

  return (
    <>
    <section className="max-w-5xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">Guides</span>
      </nav>

      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
        Sea to Sky Guides
      </h1>
      <p className="text-slate-500 text-base mb-12 max-w-2xl">
        Curated best-of lists for Squamish, Whistler &amp; Pemberton, ranked by real reviews.
      </p>

      {/* Local Guides — static content pages */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-1 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600" />
          <h2 className="font-serif text-xl font-bold text-slate-900">Local Guides &amp; Itineraries</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { href: '/48-hours-squamish', title: '48 Hours in Squamish', desc: 'A local\'s itinerary for first-timers — 14 stops over 2 days, from early-morning coffee to hidden trails to the best dinner in town.' },
            { href: '/ski-season', title: 'Ski Season Survival Guide', desc: 'How to do Whistler without going broke. Skip the lift lines, eat well without a second mortgage, and find the runs tourists miss.' },
            { href: '/best-patios', title: 'Best Patios in the Corridor', desc: '8 patios ranked by a local who has sat on every one — post-trail beers, sunset dinners, and hidden decks from Squamish to Pemberton.' },
            { href: '/horseshoe-bay', title: 'Sea to Sky Mile Zero', desc: 'Horseshoe Bay, the village at the start of the Sea to Sky Highway — 80 years of history, the best fish and chips in the corridor, and what to do with the hour before your ferry.' },
            { href: '/neighbourhood/squamish', title: 'Squamish Neighbourhoods', desc: 'Downtown vs. Garibaldi Highlands — where to eat, stay, and explore based on your trip style.' },
            { href: '/neighbourhood/whistler', title: 'Whistler Neighbourhoods', desc: 'Village vs. Creekside — how to pick the right base for your trip and skip the crowds.' },
          ].map((g) => (
            <Link key={g.href} href={g.href} className="group">
              <div className="bg-white rounded-xl p-5 border border-emerald-200 hover:shadow-md transition-all h-full flex flex-col">
                <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug mb-2">
                  {g.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                  {g.desc}
                </p>
                <span className="text-xs font-semibold text-emerald-700 mt-3 inline-block">
                  Read guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Grouped Guide Cards — database-driven */}
      {sortedGroups.map((group) => {
        const styles = CAT_STYLES[group.slug] || CAT_STYLES.eat;
        return (
          <div key={group.slug} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${styles.gradient}`} />
              <h2 className="font-serif text-xl font-bold text-slate-900">{group.name}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.pages.map((page) => (
                <Link key={page.id} href={`/guide/${page.slug}`} className="group">
                  <div className={`bg-white rounded-xl p-5 border ${styles.border} hover:shadow-md transition-all h-full flex flex-col`}>
                    <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug mb-2">
                      {page.h1_text || page.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                      {page.meta_description}
                    </p>
                    <span className={`text-xs font-semibold ${styles.text} mt-3 inline-block`}>
                      Read guide →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      {pages.length === 0 && (
        <p className="text-slate-500 text-center py-12">No guides published yet.</p>
      )}
    </section>

    {/* Visitor Testimonials */}
    <VisitorTestimonials />

    <section className="max-w-5xl mx-auto px-6 pb-8">
      {/* Newsletter Signup */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 mt-4 text-center">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">
          Get the Free Sea to Sky Trip Planner
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Local restaurant picks, must-do trails, and insider tips — delivered to your inbox.
        </p>
        <NewsletterSignup source="guides-index" />
      </div>
    </section>
    </>
  );
}
