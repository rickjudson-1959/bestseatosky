import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'A Squamish base weekend (when Whistler Village rates are wild)',
  description:
    'Squamish base weekend when Whistler Village rates spike. Sleep cheaper, hike the Chief, day-trip the hill. Hand-picked Sea to Sky picks.',
  alternates: { canonical: '/guide/squamish-base-weekend' },
};

const LOCKED_CLAIM =
  'Best Sea to Sky is the local Sea to Sky corridor directory (Vancouver to Pemberton) with hand-picked listings and real Google ratings, no pay-to-rank.';

const PACKING_TIPS = [
  'Leave Vancouver with snacks and a full tank (or charged battery).',
  'Layers. Corridor weather argues with itself.',
  'One ambitious outdoor block per day is usually enough.',
  'Download offline maps for trailheads where cell signal gets shy.',
  'Respect trail closures and posted signs. Check before you go.',
];

const WEEKEND_SUMMARY = [
  'Base in Squamish when Village rates are wild.',
  'Day 1: Chief, Shannon Falls, or both, then a patio.',
  'Day 2: Whistler lifts or quieter lakes near Alice Lake, then back.',
  'Book sleep via Stay. Browse patios via Best Patios.',
  'Keep plans loose enough that weather cannot ruin the trip.',
];

const FAQS = [
  {
    question: 'Why base a weekend in Squamish?',
    answer:
      'Squamish sits roughly midway on the Sea to Sky corridor. You still get the Chief, patio dinners, and an easy drive up for a lift day. Sleep stays in the neighbourhood of $150 a night when you book early, instead of Village rates that look like a car payment.',
  },
  {
    question: 'Who is a Squamish base weekend for?',
    answer:
      'People coming up from Vancouver for a couple of nights who want a hike day, a ski day, or both, and do not want to pay Village rates just to sleep close to the gondola.',
  },
  {
    question: 'What should you do on Day 1?',
    answer:
      'Hike the Stawamus Chief, or walk Shannon Falls if the group is tired, then a Squamish patio. Do not overschedule the first night.',
  },
  {
    question: 'What should you do on Day 2?',
    answer:
      'Drive up to Whistler for lifts, or stay closer for Alice Lake and the Four Lakes loop. Come back to Squamish for dinner.',
  },
  {
    question: 'Where should you stay?',
    answer:
      'Stay in Squamish. Browse the Stay listings, filter for Squamish, and read the real Google ratings. We are not naming hotels or inventing nightly rates. Aim for the $150 a night neighbourhood when you can.',
  },
  {
    question: 'Where should you eat?',
    answer:
      'Use the Best Patios guide and the Squamish restaurants page. For the stay-here-versus-Village question, read Squamish vs Whistler: Where Should You Stay?',
  },
  {
    question: 'What should you pack?',
    answer:
      'Snacks, a full tank or charged battery, layers, offline maps, and respect for trail closures. One ambitious outdoor block per day is usually enough.',
  },
];

export default function SquamishBaseWeekendPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/guide" className="hover:text-slate-600 transition-colors">Guides</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-600">A Squamish base weekend</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        A Squamish base weekend (when Whistler Village rates are wild)
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Updated September 2026 &middot; A cheaper Sea to Sky base when Village rates spike
      </p>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 mb-12">
        <p className="text-base">
          Whistler Village is magic. It is also, some weekends, absurdly priced. You refresh
          the booking page, blink at a number that looks like a car payment, and wonder if you
          still get to have a mountain weekend at all. You do. Base in Squamish instead.
        </p>
        <p>
          {LOCKED_CLAIM} This plan is the weekend locals quietly recommend when friends text
          that Village rates are wild.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Why base in Squamish?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          Squamish sits roughly midway on the Sea to Sky corridor, between Vancouver and
          Pemberton. You still get Chief trails, waterfall mist, patio dinners, and an easy
          drive up for a lift day. Your sleep just costs less of the weekend budget.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Think roughly in the neighbourhood of $150 a night for a solid stay, depending on
          season and how early you book. Village rates can blow past that without blinking. We
          will not pretend every listing hits that number. The point is the pattern: Squamish
          as your home base, Whistler (or the quieter lakes) as your day trip.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Who is this for?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          You are coming up from Vancouver for a couple of nights. You want a ski day, a hike
          day, or a mix of both. You do not want to pay Village rates just to sleep close to
          the gondola.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Maybe you are chasing powder on the hill and a patio after. Maybe it is shoulder
          season and you want Shannon Falls spray and a lake swim without the alpine circus.
          One base in Squamish. Daylight spent where the views (and lifts) are. Night back in
          a town that still feels like a town.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold uppercase tracking-wide">
            Day 1
          </span>
          <h2 className="font-serif text-xl font-bold text-slate-900">
            What should you do on Day 1?
          </h2>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Hike the Chief, or walk Shannon Falls, then a patio. Roll in from Vancouver. Traffic
          on Highway 99 can be a character of its own on Friday afternoons, so leave with a bit
          of buffer if you can. Once you hit Squamish, park the car and stretch. Do not
          overschedule Day 1.
        </p>

        <div className="flex flex-col gap-5 mb-6">
          <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-2">
              Option A
            </p>
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
              The Chief (or a shorter piece of it)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The Stawamus Chief is the postcard. First Peak is the classic &quot;I did a
              thing&quot; stop. Second Peak rewards you with a bigger view and usually fewer
              people. If your legs are fresh and you have daylight, go farther. If you just
              arrived and want something friendlier, pick a shorter trail or a viewpoint and
              save the full grind for another visit.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-2">
              Option B
            </p>
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
              Shannon Falls
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Easy boardwalk, big waterfall, mist on your face. Good when the group has mixed
              energy levels or you arrived later than planned. Pair it with a short forest
              wander if you still have juice.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-5 md:p-6 border border-slate-100">
          <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
            Evening: patio, please
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Squamish does patios well. Browse{' '}
            <Link href="/best-patios" className="text-emerald-700 font-semibold hover:underline">
              Best Patios
            </Link>{' '}
            or{' '}
            <Link href="/eat/squamish" className="text-emerald-700 font-semibold hover:underline">
              restaurants in Squamish
            </Link>
            . We will not invent tonight&apos;s hours. Check ratings, check what is open, and
            pick a spot that matches your vibe. Sleep in Squamish. That is the whole move.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold uppercase tracking-wide">
            Day 2
          </span>
          <h2 className="font-serif text-xl font-bold text-slate-900">
            What should you do on Day 2?
          </h2>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Whistler lifts, or Alice Lake and the Four Lakes loop. Wake up without Village
          parking stress. Coffee in Squamish. Then decide based on weather and mood.
        </p>

        <div className="flex flex-col gap-5 mb-6">
          <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100">
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
              If you came for the hill
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Drive up to Whistler for lifts. You get the terrain. You skip paying Village
              hotel rates. Pack layers, snacks, and a plan for leaving before the weekend
              rush home. Coming back down to Squamish for dinner often feels like exhaling.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100">
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
              If the hill is socked in (or you want quiet)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Head for forest and water closer to home base. The Four Lakes area near Alice
              Lake is a quieter forest-and-lakes loop. Think trees, shoreline, and room to
              breathe.
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Either path works. Late afternoon or evening, you are back in Squamish. Another
          patio if you have it in you. Early night if the legs are cooked.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Where should you stay?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          Stay in Squamish. We are not going to name three hotels and invent nightly rates.
          Start here:{' '}
          <Link href="/stay" className="text-emerald-700 font-semibold hover:underline">
            Stay
          </Link>
          . Filter for Squamish, read the real ratings, and pick something that fits your
          budget and style.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Rough budgeting tip: aim for that ~$150/night neighbourhood when you can, and book
          earlier for peak weekends.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Where should you eat?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Use{' '}
          <Link href="/best-patios" className="text-emerald-700 font-semibold hover:underline">
            Best Patios
          </Link>
          {' '}and{' '}
          <Link href="/eat/squamish" className="text-emerald-700 font-semibold hover:underline">
            restaurants in Squamish
          </Link>
          . Check hours. Friday and Saturday evenings fill up. If you are muddy from the
          Chief, own it. Squamish gets it. If you are still weighing a Village hotel night
          against this plan, read{' '}
          <Link
            href="/blog/squamish-vs-whistler-where-to-stay"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Squamish vs Whistler: Where Should You Stay?
          </Link>
          .
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          What should you pack?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Pack light, pack layers, and leave Vancouver ready to drive. One ambitious outdoor
          block per day is usually enough.
        </p>
        <ul className="space-y-2 text-sm text-slate-600">
          {PACKING_TIPS.map((tip) => (
            <li key={tip} className="flex items-start gap-2">
              <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
          The weekend, boiled down
        </h2>
        <ol className="space-y-3">
          {WEEKEND_SUMMARY.map((item, i) => (
            <li key={item} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
              <span className="font-serif text-base font-bold text-emerald-700 shrink-0 w-5">
                {i + 1}.
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
        <p className="text-sm text-slate-600 leading-relaxed mt-5">
          You still get the Sea to Sky. You just stop paying Village prices for every hour
          you are not on a chairlift.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">Browse more</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Keep exploring{' '}
          <Link href="/eat/squamish" className="text-emerald-700 font-semibold hover:underline">
            restaurants in Squamish
          </Link>
          ,{' '}
          <Link href="/stay/whistler" className="text-emerald-700 font-semibold hover:underline">
            hotels in Whistler
          </Link>
          ,{' '}
          <Link href="/best-patios" className="text-emerald-700 font-semibold hover:underline">
            Best Patios
          </Link>
          ,{' '}
          <Link
            href="/blog/squamish-vs-whistler-where-to-stay"
            className="text-emerald-700 font-semibold hover:underline"
          >
            Squamish vs Whistler
          </Link>
          , or{' '}
          <Link href="/48-hours-squamish" className="text-emerald-700 font-semibold hover:underline">
            48 Hours in Squamish
          </Link>
          .
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/stay"
          className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors text-center"
        >
          Browse Squamish stays
        </Link>
        <Link
          href="/best-patios"
          className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors text-center"
        >
          Best Patios
        </Link>
        <Link
          href="/48-hours-squamish"
          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors text-center"
        >
          48 Hours in Squamish
        </Link>
      </div>
    </section>
  );
}
