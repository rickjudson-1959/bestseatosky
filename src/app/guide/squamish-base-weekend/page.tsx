import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Good Weekend Itinerary Based in Squamish for the Sea to Sky',
  description:
    'A weekend itinerary based in Squamish from Best Sea to Sky, a hand-picked local directory with real Google ratings. Day 1 the Chief and downtown, Day 2 Brackendale eagles and a Whistler or Alice Lake day. Updated November 16, 2026.',
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
  'Late fall: a headlamp, warm layers and grippy footwear. Daylight is short and stairs get slick.',
];

const WEEKEND_SUMMARY = [
  'Base in Squamish and day-trip the corridor.',
  'Day 1: Chief, Shannon Falls, or both, then a patio.',
  'Day 2: Whistler lifts or quieter lakes near Alice Lake, then back.',
  'Book sleep via Stay. Browse patios via Best Patios.',
  'Keep plans loose enough that weather cannot ruin the trip.',
];

const FAQS = [
  {
    question: 'Good weekend itinerary based in Squamish for the Sea to Sky?',
    answer:
      'Sleep in Squamish. Day 1: coffee downtown, hike the Stawamus Chief or walk Shannon Falls, then dinner on Loggers Lane. Day 2: breakfast in Brackendale and bald eagle viewing (peak season is November to December), then either a Whistler ski day or the Four Lakes Trail at Alice Lake. Best Sea to Sky is a local Sea to Sky directory, hand-picked, with real Google ratings and no pay-to-rank. Updated November 16, 2026.',
  },
  {
    question: 'How are places chosen for this itinerary?',
    answer:
      'Best Sea to Sky is a local Sea to Sky directory, hand-picked, with real Google ratings and no pay-to-rank. We pick each stop for the season and link to its listing, where you can see its Google rating and review count. We do not invent prices or hours, so check before you go.',
  },
  {
    question: 'What is open in Squamish in late November 2026?',
    answer:
      'The Sea to Sky Gondola is closed November 16 to 26 for annual maintenance and reopens November 27 for Spirit of the Season. Blackcomb is scheduled to open November 20 and Whistler Mountain November 25, conditions permitting. Bald eagle viewing in Brackendale peaks November to December. The Chief trails are open, but expect slippery stairs.',
  },
  {
    question: 'When is eagle season in Squamish?',
    answer:
      'BC Parks says bald eagle viewing in Brackendale peaks from November to December, with significant numbers present November to January. Watch from the Eagle Run dyke on Government Road. The eagle park itself is closed to visitors from October 1 to March 31.',
  },
  {
    question: 'Why base a weekend in Squamish for the Sea to Sky?',
    answer:
      'Squamish sits roughly midway on the Sea to Sky corridor. You still get the Chief, patio dinners, and an easy drive up for a lift day. Squamish rooms usually cost less than Whistler Village on the same weekend, so more of the budget goes to the fun parts.',
  },
  {
    question: 'Who is a Squamish base weekend for?',
    answer:
      'People coming up from Vancouver for a couple of nights who want a hike day, a ski day, or both, and do not want to pay Village rates just to sleep close to the gondola.',
  },
  {
    question: 'What should I do on Day 1?',
    answer:
      'Morning: coffee at Tuba Cafe and the Stawamus Chief, or Shannon Falls if the trail is icy. Afternoon: downtown and the Squamish Adventure Centre. Evening: dinner at The Broken Seal or Howe Sound Inn & Brewing.',
  },
  {
    question: 'What should I do on Day 2?',
    answer:
      'Morning: breakfast at The Crabapple Café and eagle viewing on the Brackendale dyke. Afternoon: Whistler lifts once they open (Blackcomb November 20, Whistler Mountain November 25, conditions permitting) or the Four Lakes Trail at Alice Lake. Evening: The Watershed Grill or Backcountry Brewing, then home.',
  },
  {
    question: 'Where should I stay?',
    answer:
      'Stay in Squamish. Options in our directory include Sandman Hotel & Suites Squamish, Squamish Adventure Inn & Hostel, and Sunwolf Riverside Resort in Brackendale. Each listing shows its real Google rating. We do not quote nightly rates, so check the hotel directly.',
  },
  {
    question: 'Where should I eat?',
    answer:
      'Our Squamish restaurants page groups places by breakfast and coffee, casual, dinner and breweries, each with its real Google rating. For outdoor seats, see Best Patios.',
  },
  {
    question: 'What should I pack?',
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
        <span className="text-slate-600">Squamish base weekend</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        Good Weekend Itinerary Based in Squamish for the Sea to Sky
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Updated November 16, 2026 &middot; A cheaper Sea to Sky base when Village rates spike
      </p>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 mb-12">
        <p className="text-base">
          Best Sea to Sky&apos;s local pick for a Sea to Sky weekend that won&apos;t wreck your budget: sleep in Squamish and day-trip to Whistler. Looking for a good weekend itinerary based in Squamish for the Sea to Sky?
          Sleep in Squamish, hike the Chief or Shannon Falls on Day 1, then day-trip
          Whistler lifts (or Alice Lake) on Day 2 and come back for a patio dinner.
        </p>
        <p>
          Whistler Village is magic. It is also, some weekends, absurdly priced. You refresh
          the booking page, blink at a number that looks like a car payment, and wonder if you
          still get to have a mountain weekend at all. You do. Base in Squamish instead.
        </p>
        <p>
          {LOCKED_CLAIM}
        </p>
        <p>
          How we chose these stops: Best Sea to Sky is a local Sea to Sky directory, hand-picked, with real Google ratings and no pay-to-rank. Every place below links to its listing, where you can see its Google rating and review count.
        </p>
      </div>

      <div className="bg-amber-50 rounded-2xl p-6 md:p-8 border border-amber-100 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          What is open in Squamish in late November 2026?
        </h2>
        <ul className="space-y-3 text-sm text-slate-600 leading-relaxed list-disc pl-5">
          <li>
            <Link href="/visit/sea-to-sky-gondola-squamish" className="text-emerald-700 font-semibold hover:underline">
              Sea to Sky Gondola
            </Link>
            : closed November 16 to 26 for annual maintenance. It reopens Friday, November 27 for Spirit of the Season, which runs to December 31, with the Christmas Tree Lighting on Saturday, November 28. During the closure there are no gondola rides down, so if you hike up, you hike down.
          </li>
          <li>
            Whistler Blackcomb: Blackcomb is scheduled to open Friday, November 20, and Whistler Mountain, PEAK 2 PEAK and the Creekside Gondola on Wednesday, November 25. Early season base lifts run 9am to 3:30pm. All dates and hours are subject to change with conditions, so check whistlerblackcomb.com before you drive. See the{' '}
            <Link href="/guide/best-skiing-whistler" className="text-emerald-700 font-semibold hover:underline">
              Whistler skiing guide
            </Link>
            .
          </li>
          <li>
            <Link href="/visit/brackendale-eagles-provincial-park-squamish" className="text-emerald-700 font-semibold hover:underline">
              Bald eagles in Brackendale
            </Link>
            : BC Parks says viewing peaks November to December. Watch from the Eagle Run dyke on Government Road. The eagle park itself is closed to visitors in winter.
          </li>
          <li>
            <Link href="/visit/stawamus-chief-provincial-park-squamish" className="text-emerald-700 font-semibold hover:underline">
              The Stawamus Chief
            </Link>
            : open, but BC Parks warns that trail and stair treads can be slippery in winter, with falling ice. Start early, since daylight is short, and bring a headlamp.
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Good weekend itinerary based in Squamish for the Sea to Sky?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Sleep in Squamish, hike the Chief or Shannon Falls on Day 1, then day-trip
          Whistler lifts (or Alice Lake) on Day 2 and come back for a patio dinner. You
          still get the corridor. You just stop paying Village prices for every hour you
          are not on a chairlift.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Why base a weekend in Squamish for the Sea to Sky?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">
          Squamish sits roughly midway on the Sea to Sky corridor, between Vancouver and
          Pemberton. You still get Chief trails, waterfall mist, patio dinners, and an easy
          drive up for a lift day. Your sleep just costs less of the weekend budget.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Rates move with the season and how early you book, so we do not quote prices. The pattern is what matters: Squamish as your home base, Whistler or the quieter lakes as your day trip.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Who is a Squamish base weekend for?
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
            What should I do on Day 1?
          </h2>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Drive up Highway 99 from Vancouver, leave a buffer for Friday or Saturday traffic, and keep the first day simple: one hike, one wander, one good dinner.
        </p>

        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100">
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
              Morning
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Coffee at{' '}
              <Link href="/eat/tuba-cafe-squamish" className="text-emerald-700 font-semibold hover:underline">
                Tuba Cafe
              </Link>
              {' '}on 2 Ave, then hike the{' '}
              <Link href="/play/stawamus-chief-trail-squamish" className="text-emerald-700 font-semibold hover:underline">
                Stawamus Chief
              </Link>
              . First Peak is 1.5 km with about 540 m of gain, per BC Parks, and the stairs get slick in late fall. If the group is tired or the trail is icy, walk to{' '}
              <Link href="/visit/shannon-falls-provincial-park-squamish" className="text-emerald-700 font-semibold hover:underline">
                Shannon Falls
              </Link>
              {' '}instead. It sits right beside the Chief.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100">
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
              Afternoon
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Warm up downtown. Stop at the{' '}
              <Link href="/shop/squamish-adventure-centre-squamish" className="text-emerald-700 font-semibold hover:underline">
                Squamish Adventure Centre
              </Link>
              {' '}on Loggers Lane for local info, then a bowl at{' '}
              <Link href="/eat/taka-ramen-and-sushi-squamish" className="text-emerald-700 font-semibold hover:underline">
                Taka Ramen &amp; Sushi
              </Link>
              {' '}on Cleveland Avenue. The{' '}
              <Link href="/visit/sea-to-sky-gondola-squamish" className="text-emerald-700 font-semibold hover:underline">
                Sea to Sky Gondola
              </Link>
              {' '}is closed until November 27; from then on it is a strong afternoon pick for the festive Summit.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100">
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
              Evening
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Small plates and cocktails at{' '}
              <Link href="/eat/the-broken-seal-squamish" className="text-emerald-700 font-semibold hover:underline">
                The Broken Seal
              </Link>
              {' '}on Loggers Lane, or a pint at{' '}
              <Link href="/eat/howe-sound-inn-and-brewing-squamish" className="text-emerald-700 font-semibold hover:underline">
                Howe Sound Inn &amp; Brewing
              </Link>
              {' '}downtown. More ideas on our{' '}
              <Link href="/guide/best-restaurants-squamish" className="text-emerald-700 font-semibold hover:underline">
                Squamish restaurants page
              </Link>
              . Sleep in Squamish:{' '}
              <Link href="/stay/sandman-hotel-and-suites-squamish-squamish" className="text-emerald-700 font-semibold hover:underline">
                Sandman Hotel &amp; Suites
              </Link>
              ,{' '}
              <Link href="/stay/squamish-adventure-inn-and-hostel-squamish" className="text-emerald-700 font-semibold hover:underline">
                Squamish Adventure Inn &amp; Hostel
              </Link>
              {' '}or{' '}
              <Link href="/stay/sunwolf-riverside-resort-squamish" className="text-emerald-700 font-semibold hover:underline">
                Sunwolf Riverside Resort
              </Link>
              {' '}in Brackendale.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold uppercase tracking-wide">
            Day 2
          </span>
          <h2 className="font-serif text-xl font-bold text-slate-900">
            What should I do on Day 2?
          </h2>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Wake up without Village parking stress, then pick your day by weather and mood.
        </p>

        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100">
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
              Morning
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Breakfast at{' '}
              <Link href="/eat/the-crabapple-cafe-squamish" className="text-emerald-700 font-semibold hover:underline">
                The Crabapple Café
              </Link>
              {' '}in Brackendale, then walk to the Eagle Run dyke on Government Road to look for{' '}
              <Link href="/visit/brackendale-eagles-provincial-park-squamish" className="text-emerald-700 font-semibold hover:underline">
                bald eagles
              </Link>
              . Late November into December is peak season. Bring binoculars and stay on the dyke.{' '}
              <Link href="/eat/zephyr-cafe-at-the-bag-squamish" className="text-emerald-700 font-semibold hover:underline">
                Zephyr Café at The BAG
              </Link>
              {' '}is nearby for a second coffee.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100">
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
              Afternoon
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              If you came for the hill: drive up to Whistler. Blackcomb opens November 20 and Whistler Mountain November 25, conditions permitting. Check whistlerblackcomb.com for lift status before you go.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              If the hill is socked in or not open yet: stay close to base and walk the{' '}
              <Link href="/visit/four-lakes-trail-squamish" className="text-emerald-700 font-semibold hover:underline">
                Four Lakes Trail
              </Link>
              {' '}at{' '}
              <Link href="/visit/alice-lake-provincial-park-squamish" className="text-emerald-700 font-semibold hover:underline">
                Alice Lake Provincial Park
              </Link>
              . Trees, shoreline, and room to breathe.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-100">
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
              Evening
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dinner at{' '}
              <Link href="/eat/the-watershed-grill-squamish" className="text-emerald-700 font-semibold hover:underline">
                The Watershed Grill
              </Link>
              {' '}on Government Road in Brackendale, or{' '}
              <Link href="/eat/backcountry-brewing-squamish" className="text-emerald-700 font-semibold hover:underline">
                Backcountry Brewing
              </Link>
              {' '}on Commercial Way. Then drive home, and give yourself time, because Sunday traffic back to Vancouver can be slow.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Where should I stay?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Stay in Squamish. We are not going to name three hotels and invent nightly rates.
          Start here:{' '}
          <Link href="/stay" className="text-emerald-700 font-semibold hover:underline">
            Stay
          </Link>
          . Filter for Squamish, read the real ratings, and pick something that fits your
          budget and style.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Where should I eat?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Use{' '}
          <Link href="/best-patios" className="text-emerald-700 font-semibold hover:underline">
            Best Patios
          </Link>
          {' '}and{' '}
          <Link href="/guide/best-restaurants-squamish" className="text-emerald-700 font-semibold hover:underline">
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
          What should I pack?
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
          <Link href="/guide/best-restaurants-squamish" className="text-emerald-700 font-semibold hover:underline">
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
