import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sea to Sky Trip Planner — Free Download',
  description:
    'Free downloadable trip planner for Squamish, Whistler & Pemberton — where to eat, must-do trails, and local tips for planning your Sea to Sky trip.',
  alternates: { canonical: '/trip-planner' },
};

export default function TripPlannerPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-600">Trip Planner</span>
      </nav>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🏔️</span>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
          The Sea to Sky Trip Planner
        </h1>
      </div>

      <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-xl">
        A free, no-fuss guide to planning your trip across Squamish, Whistler &amp; Pemberton
        &mdash; put together by locals, not a search engine. Grab it before you go.
      </p>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 mb-10">
        <h2 className="font-serif text-lg font-bold text-slate-900 mb-4">What&apos;s inside</h2>
        <ul className="space-y-3 text-sm text-slate-600 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0">&#10003;</span>
            <span><strong className="text-slate-700">Where to eat</strong> &mdash; our picks in Squamish, Whistler, and Pemberton</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0">&#10003;</span>
            <span><strong className="text-slate-700">Must-do trails</strong> &mdash; from an easy 30-minute walk to a full-day hike</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0">&#10003;</span>
            <span><strong className="text-slate-700">Local tips</strong> &mdash; the small things that make a real difference on the ground</span>
          </li>
        </ul>
        <a
          href="/downloads/sea-to-sky-trip-planner.pdf"
          className="inline-block px-8 py-3.5 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors"
        >
          Download the Guide (PDF) &darr;
        </a>
      </div>

      <p className="text-sm text-slate-400">
        Want more? <Link href="/guide" className="text-emerald-700 font-semibold hover:underline">Browse all our guides</Link> for the full corridor, town by town.
      </p>
    </section>
  );
}
