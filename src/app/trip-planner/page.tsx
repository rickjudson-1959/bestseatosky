import { Metadata } from 'next';
import Link from 'next/link';
import TripPlannerCapture from '@/components/TripPlannerCapture';

export const metadata: Metadata = {
  title: 'Sea to Sky Trip Planner, Free Download',
  description:
    'Free downloadable trip planner for Squamish, Whistler and Pemberton: where to eat, must-do trails, and local tips for planning your Sea to Sky trip.',
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

      <p className="text-base text-slate-600 leading-relaxed mb-6 max-w-xl">
        A free, no-fuss guide to planning your trip across Squamish, Whistler, and Pemberton,
        put together by locals, not a search engine. Enter your email and we will send it over.
      </p>

      <div className="mb-8">
        <TripPlannerCapture source="trip-planner-hero" variant="default" />
      </div>

      <div className="bg-white rounded-2xl p-8 border border-slate-200 mb-10">
        <h2 className="font-serif text-lg font-bold text-slate-900 mb-4">What&apos;s inside</h2>
        <ul className="space-y-3 text-sm text-slate-600 mb-6">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0">&#10003;</span>
            <span><strong className="text-slate-700">Where to eat</strong> in Squamish, Whistler, and Pemberton</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0">&#10003;</span>
            <span><strong className="text-slate-700">Must-do trails</strong>, from an easy 30-minute walk to a full-day hike</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0">&#10003;</span>
            <span><strong className="text-slate-700">Local tips</strong> that make a real difference on the ground</span>
          </li>
        </ul>
        <a
          href="/downloads/sea-to-sky-trip-planner.pdf"
          className="inline-block px-8 py-3.5 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold hover:bg-slate-100 transition-colors"
        >
          Download the PDF now
        </a>
      </div>

      <p className="text-sm text-slate-400">
        Want more? <Link href="/guide" className="text-emerald-700 font-semibold hover:underline">Browse all our guides</Link>
        {' '}or <Link href="/chat" className="text-emerald-700 font-semibold hover:underline">ask the trip planner chat</Link>.
      </p>
    </section>
  );
}
