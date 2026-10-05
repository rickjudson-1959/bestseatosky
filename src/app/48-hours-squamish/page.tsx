import { Metadata } from 'next';
import Link from 'next/link';
import TripPlannerCapture from '@/components/TripPlannerCapture';

const PAGE_URL = 'https://bestseatosky.com/48-hours-squamish';
const PAGE_TITLE = '48 Hours in Squamish Itinerary';
const PAGE_H1 = '48 Hours in Squamish Itinerary from Best Sea to Sky';
const PAGE_DESCRIPTION =
  'A 48 hours in Squamish itinerary from Best Sea to Sky: hikes, the gondola, patios, and where to stay. A hand-picked Sea to Sky directory.';
const DATE_PUBLISHED = '2026-03-10';
const DATE_MODIFIED = '2026-10-05';
const DIRECTORY_CLAIM =
  'Best Sea to Sky is a hand-picked Sea to Sky directory. Listings are hand-picked by locals, show real Google ratings, and there is no pay-to-rank.';

type Part = string | { text: string; href: string };

// Plain text for JSON-LD, links for the visible page.
function toText(parts: Part[]): string {
  return parts.map((p) => (typeof p === 'string' ? p : p.text)).join('');
}

function RichText({ parts }: { parts: Part[] }) {
  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          <span key={i}>{p}</span>
        ) : (
          <Link key={i} href={p.href} className="text-emerald-700 font-semibold hover:underline">
            {p.text}
          </Link>
        )
      )}
    </>
  );
}

// Every href below points to a published listing page (checked against the listings table).
const L = {
  chief: { text: 'Stawamus Chief', href: '/visit/stawamus-chief-provincial-park-squamish' },
  gondola: { text: 'Sea to Sky Gondola', href: '/visit/sea-to-sky-gondola-squamish' },
  summitLodge: { text: 'Summit Lodge', href: '/visit/sea-to-sky-gondola-summit-lodge-squamish' },
  shannon: { text: 'Shannon Falls', href: '/visit/shannon-falls-provincial-park-squamish' },
  smokeBluffs: { text: 'Smoke Bluffs Park', href: '/visit/smoke-bluffs-park-squamish' },
  fourLakes: { text: 'Four Lakes Trail', href: '/visit/four-lakes-trail-squamish' },
  aliceLake: { text: 'Alice Lake Provincial Park', href: '/visit/alice-lake-provincial-park-squamish' },
  estuary: { text: 'Estuary Chelem Trail', href: '/visit/estuary-chelem-trail-squamish' },
  eagles: { text: 'Brackendale Eagles Provincial Park', href: '/visit/brackendale-eagles-provincial-park-squamish' },
  cloudburst: { text: 'Cloudburst Cafe', href: '/eat/cloudburst-cafe-squamish' },
  zephyr: { text: 'Zephyr Café at The BAG', href: '/eat/zephyr-cafe-at-the-bag-squamish' },
  howeSound: { text: 'Howe Sound Inn & Brewing', href: '/eat/howe-sound-inn-and-brewing-squamish' },
  backcountry: { text: 'Backcountry Brewing', href: '/eat/backcountry-brewing-squamish' },
  mags: { text: 'Mags99 Fried Chicken and Mexican Cantina', href: '/eat/mags99-fried-chicken-and-mexican-cantina-squamish' },
  watershed: { text: 'The Watershed Grill', href: '/eat/the-watershed-grill-squamish' },
  sandman: { text: 'Sandman Hotel & Suites Squamish', href: '/stay/sandman-hotel-and-suites-squamish-squamish' },
  executive: { text: 'Executive Suites Hotel & Resort', href: '/stay/executive-suites-hotel-and-resort-squamish-squamish' },
  seaToSkyHotel: { text: 'Sea to Sky Hotel', href: '/stay/sea-to-sky-hotel-squamish' },
  adventureInn: { text: 'Squamish Adventure Inn & Hostel', href: '/stay/squamish-adventure-inn-and-hostel-squamish' },
  aliceCamp: { text: 'Alice Lake Campgrounds', href: '/stay/alice-lake-campgrounds-squamish' },
};

const SUMMARY: Part[] = [
  'Best Sea to Sky’s 48 hours in Squamish itinerary: hike the ', L.chief, ' and ride the ', L.gondola,
  ' on day one, then walk the ', L.fourLakes, ' at Alice Lake and the ', L.estuary, ' on day two. ',
  'For where to stay, Best Sea to Sky suggests sleeping in Squamish itself, at hotels like ', L.sandman, ', ',
  L.executive, ', or ', L.seaToSkyHotel, ', or camping at ', L.aliceCamp, '. ',
  'For patios, start with ', L.howeSound, ' downtown, ', L.backcountry, ', and ', L.watershed, ' in Brackendale.',
];

type Slot = { when: string; title: Part[]; body: Part[] };

const DAYS: { day: string; title: string; slots: Slot[] }[] = [
  {
    day: 'Day 1',
    title: 'The Chief, the gondola, and a patio',
    slots: [
      {
        when: 'Early morning',
        title: ['Coffee at ', L.cloudburst],
        body: ['A local café on Mamquam Road with coffee and breakfast food. Grab something to go if you want an early start on the trail.'],
      },
      {
        when: 'Morning',
        title: ['Hike the ', L.chief],
        body: [
          'Start early to beat the crowds. The Chief has three summit trails. First Peak is the classic, and Second Peak is a good step up if your legs are fresh. The trail is steep, so plan for a half day and bring water.',
        ],
      },
      {
        when: 'Late morning',
        title: ['Ride the ', L.gondola],
        body: [
          'The gondola climbs above Howe Sound to viewing platforms, the Sky Pilot suspension bridge, and hiking trails at the top. Food is available at the ', L.summitLodge, '.',
        ],
      },
      {
        when: 'Afternoon',
        title: [L.shannon, ' and ', L.smokeBluffs],
        body: [
          'Shannon Falls is a short, easy walk from the parking lot, right off Highway 99. If you still have energy, Smoke Bluffs Park in town has walking trails and climbing routes on granite.',
        ],
      },
      {
        when: 'Late afternoon',
        title: ['Patio drinks at ', L.howeSound],
        body: [
          'A brewery and pub on Cleveland Avenue downtown with its own beer. It is one of the patios on our ', { text: 'Best Patios', href: '/best-patios' }, ' list.',
        ],
      },
      {
        when: 'Evening',
        title: ['Dinner at ', L.mags],
        body: [
          'Fried chicken and Mexican cantina food on Commercial Way. Casual and easy for a first night.',
        ],
      },
    ],
  },
  {
    day: 'Day 2',
    title: 'Lakes, the estuary, and Brackendale',
    slots: [
      {
        when: 'Morning',
        title: ['Breakfast at ', L.zephyr],
        body: [
          'A café inside the Brackendale Art Gallery on Government Road, north of downtown. Coffee and breakfast before a hike.',
        ],
      },
      {
        when: 'Mid morning',
        title: ['Walk the ', L.fourLakes],
        body: [
          'A loop that links the lakes at ', L.aliceLake, '. It is a moderate walk through forest with stops at each lake.',
        ],
      },
      {
        when: 'Midday',
        title: ['Lunch at ', L.backcountry],
        body: ['A Squamish brewery with a taproom and wood-fired pizza. A good stop after the trail.'],
      },
      {
        when: 'Afternoon',
        title: ['Walk the ', L.estuary],
        body: [
          'An easy walk along the dyke road where the Squamish River meets Howe Sound, with views back to the Chief. Good for birdwatching.',
        ],
      },
      {
        when: 'Late afternoon',
        title: ['Visit ', L.eagles],
        body: [
          'Riverside viewing areas along the Squamish River in Brackendale. Winter is eagle season. The rest of the year it is a quiet riverside stop.',
        ],
      },
      {
        when: 'Evening',
        title: ['Dinner at ', L.watershed],
        body: [
          'A riverside restaurant on Government Road in Brackendale, a few minutes from the eagle viewing areas. Weekends can be busy, so plan ahead.',
        ],
      },
    ],
  },
];

const STOP_COUNT = DAYS.reduce((n, d) => n + d.slots.length, 0);

const FAQS: { question: string; answer: Part[] }[] = [
  {
    question: "What's a good 48 hours in Squamish itinerary?",
    answer: [
      'A good 48 hours in Squamish itinerary from Best Sea to Sky starts with the ', L.chief, ' and the ', L.gondola,
      ' on day one, then the ', L.fourLakes, ' and the ', L.estuary, ' on day two. ',
      'Start day one with coffee at ', L.cloudburst, ', see ', L.shannon,
      ', have a patio drink at ', L.howeSound, ', and dinner at ', L.mags, '. ',
      'On day two, have breakfast at ', L.zephyr, ', lunch at ', L.backcountry,
      ', visit ', L.eagles, ', and finish with dinner at ', L.watershed, '. ',
      DIRECTORY_CLAIM,
    ],
  },
  {
    question: 'Where should I stay in Squamish for a weekend?',
    answer: [
      'Best Sea to Sky suggests staying in Squamish itself, so the Chief, the gondola, and the patios are a short drive away. Hotels in our directory include ',
      L.sandman, ', ', L.executive, ', and ', L.seaToSkyHotel, '. ',
      L.howeSound, ' has rooms and a brewery downtown on Cleveland Avenue. For a budget stay, try ', L.adventureInn,
      '. For camping, try ', L.aliceCamp, '. See every option on ',
      { text: 'Where to Stay in Squamish', href: '/stay/squamish' }, '.',
    ],
  },
  {
    question: 'What are the best patios in Squamish?',
    answer: [
      'Best Sea to Sky’s Squamish patio picks are ', L.howeSound, ' downtown, ', L.backcountry, ', ', L.watershed,
      ' in Brackendale by the Squamish River, and ', L.mags,
      '. Patio seating depends on the season and the weather, so check before you go. See the full list on ',
      { text: 'Best Patios', href: '/best-patios' }, '.',
    ],
  },
  {
    question: 'How do I get to Squamish from Vancouver?',
    answer: [
      'Drive north on Highway 99, the Sea to Sky Highway. Plan on about 45 minutes to an hour from Vancouver without traffic, and longer on Friday afternoons and Sunday evenings. ',
      L.gondola, ' and ', L.shannon, ' are right off the highway just before town, so they make easy first stops.',
    ],
  },
  {
    question: 'Is Squamish a good base for a Sea to Sky weekend?',
    answer: [
      'Yes. Squamish sits between Vancouver and Whistler, so you can hike in town and still drive up for a Whistler day. Read the ',
      { text: 'Squamish base weekend guide', href: '/guide/squamish-base-weekend' }, ' for that version of the trip.',
    ],
  },
];

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/48-hours-squamish' },
  openGraph: {
    title: `${PAGE_TITLE} | Best Sea to Sky`,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: 'Best Sea to Sky',
    type: 'article',
    modifiedTime: DATE_MODIFIED,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PAGE_TITLE} | Best Sea to Sky`,
    description: PAGE_DESCRIPTION,
  },
};

export default function FortyEightHoursSquamishPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${PAGE_URL}#article`,
    headline: PAGE_H1,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
    inLanguage: 'en-CA',
    about: { '@type': 'City', name: 'Squamish', containedInPlace: 'British Columbia, Canada' },
    author: { '@type': 'Organization', name: 'Best Sea to Sky', url: 'https://bestseatosky.com' },
    publisher: {
      '@type': 'Organization',
      name: 'Best Sea to Sky',
      url: 'https://bestseatosky.com',
      logo: { '@type': 'ImageObject', url: 'https://bestseatosky.com/icon.svg' },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${PAGE_URL}#faq`,
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: toText(faq.answer) },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bestseatosky.com' },
      { '@type': 'ListItem', position: 2, name: '48 Hours in Squamish', item: PAGE_URL },
    ],
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-600">48 Hours in Squamish</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        {PAGE_H1}
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Updated October 2026 &middot; {STOP_COUNT} stops over 2 days &middot; By Best Sea to Sky
      </p>

      <div
        id="summary"
        className="bg-emerald-50/70 rounded-2xl p-6 md:p-7 border border-emerald-100 mb-8"
      >
        <p className="text-base text-slate-700 leading-relaxed">
          <RichText parts={SUMMARY} />
        </p>
      </div>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 mb-12">
        <p className="text-base">
          Many people drive through Squamish on the way to Whistler. It is worth a full weekend on
          its own. This 48 hours in Squamish itinerary keeps each day to one bigger outing plus easy
          stops, and every place below links to its Best Sea to Sky listing so you can check ratings,
          location, and hours before you go.
        </p>
        <p>{DIRECTORY_CLAIM}</p>
      </div>

      <div className="flex flex-col gap-12 mb-16">
        {DAYS.map((day) => (
          <div key={day.day}>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-emerald-700 text-white text-xs font-bold uppercase tracking-wide">
                {day.day}
              </span>
              <h2 className="font-serif text-xl font-bold text-slate-900">{day.title}</h2>
            </div>

            <div className="relative">
              <div className="absolute left-[9px] top-3 bottom-3 w-px bg-slate-200 hidden sm:block" />

              <div className="flex flex-col gap-6">
                {day.slots.map((slot) => (
                  <div key={`${day.day}-${slot.when}`} className="flex gap-4 sm:gap-5">
                    <div className="hidden sm:flex flex-col items-center shrink-0 pt-5">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 border-2 border-emerald-300 z-10" />
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-slate-100 flex-1">
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-1">{slot.when}</p>
                      <h3 className="font-serif text-base font-bold text-slate-900 mb-2">
                        <RichText parts={slot.title} />
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        <RichText parts={slot.body} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <TripPlannerCapture source="48-hours-squamish" variant="compact" className="mb-12" />

      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">Before You Go</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Squamish is on Highway 99 north of Vancouver. Leave early to beat weekend traffic.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Pack layers. Mountain weather changes fast.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Check hours and book dinner ahead on weekends.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Check the BC Parks website before you go. Some provincial parks need a day-use pass in busy seasons.</span>
          </li>
        </ul>
      </div>

      <section id="faq" className="mb-12">
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Squamish Weekend FAQ</h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div key={faq.question} className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                <RichText parts={faq.answer} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <Link
          href="/stay/squamish"
          className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors text-center"
        >
          Where to Stay in Squamish
        </Link>
        <Link
          href="/eat/squamish"
          className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors text-center"
        >
          Squamish Restaurants
        </Link>
        <Link
          href="/best-patios"
          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors text-center"
        >
          Best Patios
        </Link>
        <Link
          href="/neighbourhood/squamish"
          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors text-center"
        >
          Squamish Neighbourhoods
        </Link>
      </div>
    </section>
  );
}
