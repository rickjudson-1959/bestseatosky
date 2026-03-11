import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How We Rank | Our Ranking Methodology',
  description:
    'How Best Sea to Sky ranks listings and curates guides. No hidden algorithms, no pay-for-position — just the local test, field-tested reliability, and independent curation.',
  alternates: { canonical: '/methodology' },
};

export default function MethodologyPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">How We Rank</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        Our Ranking Methodology
      </h1>
      <p className="text-slate-500 text-lg mb-10">
        How we decide what makes the &quot;best of&quot; list — and what doesn&apos;t.
      </p>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 space-y-6">
        <p>
          At Best Sea to Sky, we don&apos;t use complex algorithms or hidden sponsorship deals to
          rank our listings. Our methodology is simple and transparent.
        </p>

        {/* 1. The Local Test */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 not-prose">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <span className="font-serif text-lg font-bold text-emerald-700">1</span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
                The &quot;Local Test&quot;
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We ask one question: <strong>&quot;Would a local actually recommend this to a
                friend visiting for the weekend?&quot;</strong> If the answer is no, it doesn&apos;t
                make the list. This single filter eliminates tourist traps, overpriced mediocrity,
                and places that coast on location instead of quality.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Field-Tested Reliability */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 not-prose">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <span className="font-serif text-lg font-bold text-emerald-700">2</span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
                Field-Tested Reliability
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                We prioritize businesses that are consistent. We look for:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <span className="text-sm text-slate-600">
                    <strong className="text-slate-900">Operating Hours.</strong> Do they actually
                    open when they say they will? Crucial for early morning hikers and post-trail
                    pint seekers.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <span className="text-sm text-slate-600">
                    <strong className="text-slate-900">Service Quality.</strong> Is the experience
                    authentic to the Squamish / Sea to Sky vibe? We value genuine hospitality over
                    polished corporate service.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                  <span className="text-sm text-slate-600">
                    <strong className="text-slate-900">Community Value.</strong> Does this business
                    give back or add unique value to the corridor? The places that make the Sea to
                    Sky special are the ones invested in it.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Zero Review Gating */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 not-prose">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <span className="font-serif text-lg font-bold text-emerald-700">3</span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
                Zero &quot;Review Gating&quot;
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unlike Yelp or Google, we don&apos;t let 100 bad days from grumpy tourists ruin a
                local gem&apos;s reputation. We look at the total value the business provides to the
                Sea to Sky community over time. A place that&apos;s been a corridor staple for a
                decade doesn&apos;t get erased by one off-season review — and a new spot doesn&apos;t
                get artificially boosted by a burst of opening-week hype.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Independent Curation */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 not-prose">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <span className="font-serif text-lg font-bold text-emerald-700">4</span>
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
                Independent Curation
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our &quot;Best of&quot; guides are curated independently. While we do offer{' '}
                <Link href="/get-listed" className="text-emerald-700 font-semibold hover:underline">
                  featured placements
                </Link>{' '}
                for local partners, they never influence our &quot;Best&quot; rankings — those are
                earned by being the best in the field. Period. You&apos;ll always see a clear
                distinction between editorially ranked listings and paid promotions.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200 my-10" />

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">
          What About the Google Ratings?
        </h2>
        <p>
          Every listing on Best Sea to Sky displays its real Google rating and review count. We
          believe in transparency — you should see what the wider public thinks alongside our
          local curation. We use Google data as one signal among many, not as the sole ranking
          factor.
        </p>
        <p>
          A 4.2-star local favourite with 50 authentic reviews often beats a 4.8-star spot with
          10 reviews from the owner&apos;s friends. Context matters.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">
          How to Suggest a Listing
        </h2>
        <p>
          Think we&apos;re missing a corridor gem? We want to know.{' '}
          <Link href="/contact" className="text-emerald-700 font-semibold hover:underline">
            Send us a message
          </Link>{' '}
          with the business name and why you think it belongs. If it passes the Local Test,
          we&apos;ll add it.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">
          See Our Methodology in Action
        </h2>
        <p>
          Browse our curated guides to see how these principles shape our recommendations:
        </p>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <Link
            href="/guide/best-restaurants-squamish"
            className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            <span className="font-serif text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
              Best Restaurants in Squamish →
            </span>
          </Link>
          <Link
            href="/guide/best-restaurants-whistler"
            className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            <span className="font-serif text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
              Best Restaurants in Whistler →
            </span>
          </Link>
          <Link
            href="/guide/best-hikes-squamish"
            className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            <span className="font-serif text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
              Best Hikes in Squamish →
            </span>
          </Link>
          <Link
            href="/guide/best-hotels-whistler"
            className="bg-white rounded-xl p-4 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            <span className="font-serif text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
              Best Hotels in Whistler →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
