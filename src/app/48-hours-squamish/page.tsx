import { Metadata } from 'next';
import Link from 'next/link';
import AffiliateCard from '@/components/AffiliateCard';

export const metadata: Metadata = {
  title: '48 Hours in Squamish — A Local\'s Itinerary for First-Timers',
  description:
    'How to spend two perfect days in Squamish, from early-morning coffee to hidden trails to the best dinner in town. A real itinerary from a 20-year local — no tourist traps.',
  alternates: { canonical: '/48-hours-squamish' },
};

const DAYS = [
  {
    day: 'Day 1',
    title: 'The Chief, the Coffee, and the Patio',
    slots: [
      {
        time: '6:30 AM',
        title: 'Coffee at Counterpart Coffee',
        description: 'Skip the drive-through chains. Counterpart is where the climbing guides and trail runners fuel up. Get a flat white and a pastry. Sit outside if it\'s not raining (and sometimes even if it is — this is Squamish).',
      },
      {
        time: '7:15 AM',
        title: 'Hike the Stawamus Chief — Second Peak',
        description: 'Get on the trail before 7:30 to beat the crowds. First Peak is the famous one, but Second Peak has better views and fewer people. The chains section is an adventure — not dangerous, just exciting. Budget 3 hours round trip.',
      },
      {
        time: '10:30 AM',
        title: 'Breakfast at Zephyr Cafe',
        description: 'You just earned this. The menu changes seasonally but the quality never does. Get whatever has eggs. Sit on the patio if there\'s a seat — this place fills up fast, especially on weekends.',
      },
      {
        time: '12:00 PM',
        title: 'Sea to Sky Gondola',
        description: 'Yes, it\'s touristy. No, you shouldn\'t skip it. The Sky Pilot Suspension Bridge is genuinely spectacular, and the alpine trails at the top are legitimate hiking — not just a photo op. Grab lunch at the Summit Lodge.',
      },
      {
        time: '3:00 PM',
        title: 'Shannon Falls + Smoke Bluffs',
        description: 'Shannon Falls is a 5-minute walk from the parking lot — the easiest "wow" moment in the corridor. If you still have legs, drive 5 minutes to Smoke Bluffs for a casual afternoon loop through granite and forest.',
      },
      {
        time: '5:30 PM',
        title: 'Patio beers at Backcountry Brewing',
        description: 'The best beer in Squamish. Order a flight, sit at a picnic table, and decompress. If they have the Widowmaker IPA on tap, get it. Bring your dog — everyone else does.',
      },
      {
        time: '7:30 PM',
        title: 'Dinner at Mag\'s 99',
        description: 'A converted gas station that serves the best tacos in the corridor. The cocktail menu is surprisingly excellent. The vibe is perfect for a first night in Squamish — casual, fun, and genuinely good food.',
      },
    ],
  },
  {
    day: 'Day 2',
    title: 'Hidden Trails, River Views, and the Local Side',
    slots: [
      {
        time: '7:00 AM',
        title: 'Coffee at Cloudburst Cafe',
        description: 'Different cafe, different part of town. Cloudburst is in the heart of downtown with a chill, local vibe. Good drip coffee, good pastries, no fuss.',
      },
      {
        time: '8:00 AM',
        title: 'Four Lakes Trail',
        description: 'This is the trail the locals hike when they don\'t want to see tourists. 8 km loop through four alpine lakes behind Alice Lake Provincial Park. Moderate difficulty, stunning payoff, and you\'ll likely have it mostly to yourself on a weekday.',
      },
      {
        time: '11:30 AM',
        title: 'Lunch at Howe Sound Brew Pub',
        description: 'The original Squamish institution. Sit on the upper patio with a house-brewed lager and a burger. The views of the Howe Sound and the mountains across the water haven\'t gotten old in 25 years.',
      },
      {
        time: '1:30 PM',
        title: 'Explore the Spit and Squamish Estuary',
        description: 'Drive to the Spit — the long gravel road that juts into Howe Sound. Park at the end and walk the estuary trails. In summer, watch the kiteboarders. In winter, watch the eagles. In any season, watch the light on the water.',
      },
      {
        time: '3:30 PM',
        title: 'Brackendale Eagles Provincial Park',
        description: 'A 10-minute drive north to Brackendale. The bald eagle count here is one of the highest in the world (November through February is peak season). Even outside eagle season, the riverside walk is beautiful and quiet.',
      },
      {
        time: '5:00 PM',
        title: 'Golden hour at the Squamish River dyke trails',
        description: 'Walk or bike the dyke trails along the Squamish River. The light at 5 PM is ridiculous — golden hour in a valley surrounded by granite walls. This is the Squamish that doesn\'t show up in the brochures.',
      },
      {
        time: '7:00 PM',
        title: 'Dinner at The Watershed Grill',
        description: 'Your final Squamish meal should be your best one. The Watershed sits on the banks of the Squamish River with a locally sourced menu that takes itself just seriously enough. Book a window table. Order the fish. Bring someone you like.',
      },
    ],
  },
];

export default function FortyEightHoursSquamishPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-600">48 Hours in Squamish</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        48 Hours in Squamish: A Local&apos;s Itinerary for Getting It Right the First Time
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Updated March 2026 &middot; 14 stops over 2 days, written by a 20-year Squamish local
      </p>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 mb-12">
        <p className="text-base">
          Most people drive through Squamish on the way to Whistler. That&apos;s a mistake.
          This town has world-class granite, a food scene that punches way above its weight, and
          the kind of trails that make you wonder why you&apos;ve been going to Whistler at all.
          Here&apos;s how to spend 48 hours the way a local would — early mornings, hidden trails,
          and the restaurants we actually eat at.
        </p>
      </div>

      <div className="mb-12">
        <AffiliateCard
          title="Gear Up for Your Hike"
          description="Heading out on the trails? Make sure you've got the right footwear."
          linkText="Shop Hiking Boots"
          linkUrl="https://amzn.to/4bCVgtS"
        />
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
              {/* Timeline line */}
              <div className="absolute left-[18px] top-3 bottom-3 w-px bg-slate-200 hidden sm:block" />

              <div className="flex flex-col gap-6">
                {day.slots.map((slot) => (
                  <div key={slot.time} className="flex gap-4 sm:gap-5">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-9 h-9 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center z-10">
                        <span className="text-[10px] font-bold text-emerald-700">{slot.time.replace(' ', '')}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-5 border border-slate-100 flex-1">
                      <h3 className="font-serif text-base font-bold text-slate-900 mb-2">{slot.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{slot.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <AffiliateCard
          title="Pack Right for the Trail"
          description="A good backpack makes all the difference on Sea to Sky trails."
          linkText="Shop Hiking & Climbing Packs"
          linkUrl="https://amzn.to/47ILWUv"
        />
      </div>

      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">Before You Go</h2>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Squamish is 45 minutes from Vancouver on Highway 99. Leave early to beat the weekend traffic.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Pack layers. The valley can be 10 degrees cooler than Vancouver, and mountain weather changes fast.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>Book Zephyr, Mag&apos;s 99, and The Watershed ahead of time on weekends. Walk-ins work on weekdays.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
            <span>BC Parks day-use passes are required for the Chief and some provincial parks. Book online the day before.</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/eat?town=squamish"
          className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors text-center"
        >
          All Squamish Restaurants
        </Link>
        <Link
          href="/play?town=squamish"
          className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors text-center"
        >
          Squamish Activities
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
