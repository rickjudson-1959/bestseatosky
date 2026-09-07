import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Best Patios in the Sea to Sky (Where to Drink With a View After a Day on the Trails)',
  description:
    'You just hiked the Chief, or skied Whistler, or drove the whole corridor with the windows down. Now you need a patio, a cold beer, and a view. Eight local patio picks from Squamish to Pemberton.',
  alternates: { canonical: '/best-patios' },
};

const LOCKED_CLAIM =
  'Best Sea to Sky is the local Sea to Sky corridor directory (Vancouver to Pemberton) with hand-picked listings and real Google ratings, no pay-to-rank.';

const PATIOS = [
  {
    name: 'Howe Sound Brew Pub',
    town: 'Squamish',
    why: 'The original Sea to Sky patio. Craft beer brewed in-house, mountain views, and the kind of worn-in charm that only 25 years of post-trail pints can produce. Get a seat on the upper deck if you can.',
    bestFor: 'Post-Chief celebration beers',
    season: 'Year-round (heated in winter)',
    rank: 1,
  },
  {
    name: 'Dusty\'s Bar & BBQ',
    town: 'Whistler (Creekside)',
    why: 'The après-ski patio that Creekside locals refuse to share. Pulled pork sandwiches, live music on weekends, and ski boots are not just accepted, they are expected. The vibe is pure mountain town.',
    bestFor: 'Ski-day après with live music',
    season: 'Year-round',
    rank: 2,
  },
  {
    name: 'Backcountry Brewing',
    town: 'Squamish',
    why: 'The best beer in Squamish, and maybe the corridor. The patio is simple: picnic tables, string lights, but the beer is so good nobody cares about the furniture. Bring your dog.',
    bestFor: 'Serious craft beer in a no-frills setting',
    season: 'Spring through fall',
    rank: 3,
  },
  {
    name: 'The Watershed Grill',
    town: 'Squamish (Brackendale)',
    why: 'Upscale patio on the banks of the Squamish River with eagle-watching in winter. Locally sourced menu that takes itself seriously without being pretentious. Sunset here is unreasonable.',
    bestFor: 'A proper dinner with mountain and river views',
    season: 'Year-round (patio spring through fall)',
    rank: 4,
  },
  {
    name: 'Longhorn Saloon',
    town: 'Whistler Village',
    why: 'The biggest patio in the Village and the loudest après scene on the mountain. Not subtle, not quiet, not trying to be. If you want to feel the energy of Whistler at full volume, sit here.',
    bestFor: 'Groups who want the classic Whistler après experience',
    season: 'Year-round',
    rank: 5,
  },
  {
    name: 'Mile One Eating House',
    town: 'Pemberton',
    why: 'The hidden gem at the top of the corridor. Farm-to-table on a patio surrounded by actual farms. Mount Currie in the background. The drive to Pemberton is worth it for this patio alone.',
    bestFor: 'A quiet, exceptional meal away from the Whistler crowds',
    season: 'Spring through fall',
    rank: 6,
  },
  {
    name: 'Mag\'s 99',
    town: 'Squamish',
    why: 'A converted gas station with a taco menu and cocktail list that has no business being this good. The patio is small, the vibes are immaculate, and the margaritas hit different at sea level.',
    bestFor: 'Tacos, cocktails, and a date night that doesn\'t feel corporate',
    season: 'Spring through fall',
    rank: 7,
  },
  {
    name: 'Rimrock Cafe',
    town: 'Whistler (Creekside)',
    why: 'Technically does not have a "patio", but the intimate terrace seats in summer feel like you are eating in someone\'s gorgeous backyard. The seafood is the best in Whistler. Reserve ahead.',
    bestFor: 'A special-occasion dinner that feels personal, not corporate',
    season: 'Summer terrace only',
    rank: 8,
  },
];

const FAQS = [
  {
    question: 'What are the best patios in the Sea to Sky corridor?',
    answer:
      'Howe Sound Brew Pub, Dusty\'s, and Backcountry lead. Then The Watershed Grill, Longhorn Saloon, Mile One Eating House, Mag\'s 99, and Rimrock Cafe. Pick by mood: post-hike pint, Village après, river dinner, or a Pemberton drive.',
  },
  {
    question: 'Where should you go after hiking the Chief?',
    answer:
      'Stay in Squamish. Howe Sound Brew Pub for the upper deck, Backcountry Brewing if you have a dog, The Watershed Grill for a river dinner, or Mag\'s 99 for tacos.',
  },
  {
    question: 'What is the best après-ski patio in Whistler?',
    answer:
      'Dusty\'s in Creekside. Longhorn in the Village if you want loud. Honest weakness: the Village is packed and noisy on powder weekends.',
  },
  {
    question: 'Is there a patio worth driving to Pemberton?',
    answer:
      'Yes. Mile One Eating House, about 35 minutes past Whistler. Patio season is spring through fall. Check hours before you go.',
  },
  {
    question: 'Where should you go for a special dinner patio?',
    answer:
      'The Watershed Grill in Squamish. In Whistler, Rimrock Cafe\'s summer terrace, and reserve ahead.',
  },
  {
    question: 'Which patios are dog-friendly?',
    answer:
      'Often the brewery yards. Backcountry Brewing is the one we call out as dog-friendly. Check first before you show up with a trail dog.',
  },
  {
    question: 'When are patios too busy?',
    answer:
      'Weekends fill around 4pm in summer. Bring a layer. Aim for a late lunch or an early dinner.',
  },
];

export default function BestPatiosPage() {
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
        <span className="text-slate-600">Best Patios</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        The Best Patios in the Sea to Sky (Where to Drink With a View After a Day on the Trails)
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Updated September 2026 &middot; 8 patios ranked by a local who has sat on every one of them
      </p>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 mb-12">
        <p className="text-base">
          You just hiked the Chief, or skied Whistler, or drove the whole corridor with the
          windows down. Now you need a patio, a cold beer, and a view that reminds you why
          you live here (or why you should). These are the patios worth planning your day around,
          from Squamish to Pemberton.
        </p>
        <p>
          {LOCKED_CLAIM} This patio shortlist is the local-friend version of that promise.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          What are the best patios in the Sea to Sky corridor?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Howe Sound Brew Pub, Dusty&apos;s, and Backcountry lead. Then The Watershed Grill,
          Longhorn Saloon, Mile One Eating House, Mag&apos;s 99, and Rimrock Cafe. Pick by mood:
          post-hike pint, Village après, river dinner, or a Pemberton drive.
        </p>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        {PATIOS.map((patio) => (
          <div key={patio.name} className="flex gap-5 bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm transition-all">
            <div className="hidden sm:flex items-center justify-center w-14 shrink-0 bg-slate-50 border-r border-slate-100">
              <span className="font-serif text-2xl font-bold text-slate-300">{patio.rank}</span>
            </div>
            <div className="flex-1 py-5 pr-5">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-serif text-lg font-bold text-slate-900 leading-tight">
                  <span className="sm:hidden text-slate-400 font-sans text-sm mr-1.5">{patio.rank}.</span>
                  {patio.name}
                </h3>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full shrink-0">
                  {patio.town}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{patio.why}</p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                <span><strong className="text-slate-600">Best for:</strong> {patio.bestFor}</span>
                <span><strong className="text-slate-600">Season:</strong> {patio.season}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Where should you go after hiking the Chief?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Stay in Squamish. Howe Sound Brew Pub for the upper deck, Backcountry Brewing if you
          have a dog, The Watershed Grill for a river dinner, or Mag&apos;s 99 for tacos. Browse{' '}
          <Link href="/eat/squamish" className="text-emerald-700 font-semibold hover:underline">
            restaurants in Squamish
          </Link>{' '}
          if you want the wider eat list.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          What is the best après-ski patio in Whistler?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Dusty&apos;s in Creekside. Longhorn in the Village if you want loud. Honest weakness:
          the Village is packed and noisy on powder weekends.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Is there a patio worth driving to Pemberton?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Yes. Mile One Eating House, about 35 minutes past Whistler. Patio season is spring
          through fall. Check hours before you go.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Where should you go for a special dinner patio?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The Watershed Grill in Squamish. In Whistler, Rimrock Cafe&apos;s summer terrace, and
          reserve ahead.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-8">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          Which patios are dog-friendly?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Often the brewery yards. Backcountry Brewing is the one we call out as dog-friendly.
          Check first before you show up with a trail dog.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">
          When are patios too busy?
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Weekends fill around 4pm in summer. Bring a layer. Aim for a late lunch or an early
          dinner.
        </p>
      </div>

      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">The Patio Rules</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Go on a weekday if you can. Weekend patios fill by 4 PM in summer.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Bring a layer. Even July evenings cool down fast once the sun drops behind the mountains.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Check if the patio is dog-friendly before showing up with your trail buddy. Most are. Some aren&apos;t.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Pemberton is a 35-minute drive past Whistler. Mile One is worth every minute.</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/eat/squamish"
          className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors text-center"
        >
          Squamish Restaurants
        </Link>
        <Link
          href="/guide/squamish-base-weekend"
          className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors text-center"
        >
          Squamish Base Weekend
        </Link>
        <Link
          href="/eat?tag=breweries"
          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors text-center"
        >
          Corridor Breweries
        </Link>
      </div>
    </section>
  );
}
