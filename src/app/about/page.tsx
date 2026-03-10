import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Best Sea to Sky is a locally curated directory for the Sea to Sky corridor — from West Vancouver to Pemberton. Built by locals who know it best.',
};

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">About</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        About Best Sea to Sky
      </h1>
      <p className="text-slate-500 text-lg mb-10">
        The local&apos;s shortlist for the Sea to Sky corridor.
      </p>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 space-y-6">
        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">Why We Built This</h2>
        <p>
          The Sea to Sky corridor is one of the most stunning stretches of highway in the world — from the coastal
          mountains above West Vancouver, through the granite walls of Squamish, past the alpine peaks of Whistler,
          and into the farmland of Pemberton. Millions of people travel it every year.
        </p>
        <p>
          But finding the best places to eat, stay, and explore has always meant piecing together
          results from Google Maps, TripAdvisor, tourism board sites, and word of mouth. No single
          source covers the entire corridor with local knowledge and real visitor ratings in one place.
        </p>
        <p>
          That&apos;s why we created Best Sea to Sky — a curated directory that covers every town from
          West Vancouver to Pemberton, powered by real Google reviews and organized by people who
          actually live here.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">What Makes Us Different</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Full corridor coverage.</strong> We&apos;re the only directory that spans the
            entire Sea to Sky — West Vancouver, Lions Bay, Britannia Beach, Squamish, Brackendale,
            Whistler, Pemberton, and everywhere in between.
          </li>
          <li>
            <strong>Real reviews, not paid placements.</strong> Every listing shows its actual Google
            rating and review count. We don&apos;t manufacture reviews or let businesses buy higher
            star ratings.
          </li>
          <li>
            <strong>Curated by locals.</strong> Our team lives in the corridor. We know which trail
            is worth the drive, which restaurant just changed chefs, and which hidden gem hasn&apos;t
            made it onto the tourist radar yet.
          </li>
          <li>
            <strong>859+ verified listings.</strong> From fine dining to food trucks, luxury lodges
            to backcountry campsites, ski schools to kayak rentals — if it&apos;s worth visiting,
            it&apos;s on Best Sea to Sky.
          </li>
        </ul>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">How Listings Work</h2>
        <p>
          Every business in the Sea to Sky corridor can be listed on our site for free. We pull in
          publicly available data including Google ratings, hours, and contact information to give
          visitors the most complete picture possible.
        </p>
        <p>
          Business owners can{' '}
          <Link href="/get-listed" className="text-emerald-700 font-semibold hover:underline">
            claim their listing
          </Link>{' '}
          to update their description, add photos, and ensure their information is accurate. For
          businesses that want more visibility, we offer{' '}
          <Link href="/advertise" className="text-emerald-700 font-semibold hover:underline">
            Featured and Sponsored tiers
          </Link>{' '}
          with priority placement and additional promotion.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">Our Editorial Approach</h2>
        <p>
          Our curated guides — like{' '}
          <Link href="/guide" className="text-emerald-700 hover:underline">
            Best Restaurants in Squamish
          </Link>{' '}
          or{' '}
          <Link href="/guide" className="text-emerald-700 hover:underline">
            Best Hikes in Whistler
          </Link>{' '}
          — are written by locals who have personally visited the places they recommend. We combine
          first-hand experience with real Google review data to surface the places that are genuinely
          worth your time.
        </p>
        <p>
          We update our guides regularly to reflect seasonal changes, new openings, and closures. If
          something has changed, we want to know —{' '}
          <Link href="/contact" className="text-emerald-700 font-semibold hover:underline">
            get in touch
          </Link>.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">Get in Touch</h2>
        <p>
          Have a question, a correction, or a suggestion? We&apos;d love to hear from you.
        </p>
        <p>
          Email us at{' '}
          <a href="mailto:hello@bestseatosky.com" className="text-emerald-700 font-semibold hover:underline">
            hello@bestseatosky.com
          </a>{' '}
          or visit our{' '}
          <Link href="/contact" className="text-emerald-700 font-semibold hover:underline">
            contact page
          </Link>.
        </p>
      </div>
    </section>
  );
}
