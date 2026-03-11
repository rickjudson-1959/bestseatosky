import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ski Season Survival Guide — How to Do Whistler Without Going Broke or Losing Your Mind',
  description:
    'A local\'s guide to surviving ski season in the Sea to Sky corridor. How to skip the lift lines, eat well without a second mortgage, and find the runs the tourists don\'t know about.',
  alternates: { canonical: '/ski-season' },
};

const SECTIONS = [
  {
    title: 'How to Skip the Lift Lines (Without Waking Up at 5 AM)',
    content: [
      'Upload at Creekside, not the Village. The Creekside Gondola typically has half the wait — same mountain, fewer people. The locals know this. Now you do too.',
      'Ski midweek if your schedule allows it. Wednesday is the sweet spot — the weekend warriors are back at work and the next wave hasn\'t arrived yet.',
      'Buy your lift pass online, in advance. The walk-up window line at 8:30 AM on a Saturday is a 45-minute commitment you don\'t need to make.',
      'If you\'re there on a weekend, don\'t fight the morning rush. Start at 10, ski until 3, and let the 7 AM crowd tire themselves out.',
    ],
  },
  {
    title: 'Where to Eat Without a Second Mortgage',
    content: [
      'Skip the Village Stroll at peak dinner time. Walk 5 minutes in any direction and the prices drop noticeably.',
      'Handlebar Cafe for breakfast — massive portions, local crowd, reasonable prices. The breakfast burrito will fuel a full ski day.',
      'Dusty\'s at Creekside for apr\u00e8s — pulled pork, craft beer, live music. Half the price of Village apr\u00e8s, twice the atmosphere.',
      'Grocery run at Nesters Market before you arrive. Cook at your condo two nights out of five. Your credit card will thank you.',
      'Creekbread in Creekside for the best pizza in Whistler. Wood-fired, family-friendly, and you can actually get a table.',
    ],
  },
  {
    title: 'The Runs the Tourists Don\'t Know About',
    content: [
      'Symphony Bowl — take the Symphony Express and traverse right. Open alpine with fewer tracks than Harmony. The locals\' powder stash.',
      'Creekside runs — the lower mountain off the Creekside Gondola is often groomed perfectly and nearly empty. Franz\'s Run is a gem.',
      'Blackcomb Glacier — takes effort to get to, which is exactly why it\'s worth it. Bring a snack for the traverse.',
      'The trees between Dave Murray Downhill and the Creekside runs — untracked after a dump, easy to find if you look, easy to miss if you don\'t.',
    ],
  },
  {
    title: 'Where to Stay (and What to Avoid)',
    content: [
      'Creekside condos are 30-40% cheaper than Village hotels with the same ski access. Legends and Evolution both offer ski-in/ski-out at a fraction of the price.',
      'If you want Village convenience, Aava Whistler Hotel is the best value — boutique, central, and doesn\'t charge resort-hotel prices.',
      'Avoid booking the cheapest Airbnb you can find in Function Junction. It\'s a 15-minute drive to the lifts and the "neighbourhood" is an industrial park.',
      'Nita Lake Lodge in Creekside is the splurge option — lakeside, incredible spa, and you can take the Valley Trail to the Village in 20 minutes.',
    ],
  },
  {
    title: 'Driving the Highway 99 in Winter (Without Dying)',
    content: [
      'Winter tires are legally required October 1 through April 30. M+S minimum. This is not optional, and RCMP do check.',
      'Check DriveBC before you leave Vancouver. Highway 99 closes for avalanche control, and sitting in a 3-hour closure with no cell service is not a vibe.',
      'Leave Vancouver before 7 AM or after 10 AM on Saturdays. The 8-9 AM window is bumper-to-bumper from Horseshoe Bay to Squamish.',
      'Fill up gas in Squamish. The price jump in Whistler is real and unnecessary.',
      'Carry chains, a blanket, and snacks. When the highway closes, you wait. There is no detour.',
    ],
  },
];

export default function SkiSeasonPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-600">Ski Season Survival Guide</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        The Ski Season Survival Guide: How to Do Whistler Without Going Broke or Losing Your Mind
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Updated March 2026 &middot; Written by someone who commutes Highway 99 in January
      </p>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 mb-12">
        <p className="text-base">
          Whistler Blackcomb is one of the best ski resorts on the planet. It&apos;s also one
          of the most expensive, most crowded, and most frustrating if you don&apos;t know the
          tricks. This guide is everything we&apos;ve learned from 20 winters on the corridor —
          how to ski more, spend less, eat well, and avoid the mistakes that turn a great trip
          into an expensive headache.
        </p>
      </div>

      <div className="flex flex-col gap-8 mb-16">
        {SECTIONS.map((section, i) => (
          <div key={section.title} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <span className="font-serif text-lg font-bold text-emerald-700">{i + 1}</span>
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.content.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                      <span className="text-emerald-600 mt-0.5 shrink-0 font-bold">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">The One Thing Nobody Tells You</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The best ski day in the corridor isn&apos;t always at Whistler. After a big dump,
          the Whistler lift lines are 45 minutes deep. Meanwhile, you can be at the Sea to Sky
          Gondola in Squamish in half the time, snowshoeing through fresh powder with nobody
          around. Or drive past Whistler to the Nordic trails in Callaghan Valley — world-class
          cross-country skiing at a fraction of the cost and crowd. The corridor is 150 km of
          winter. Whistler is just one stop.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/stay?town=whistler"
          className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors text-center"
        >
          Browse Whistler Stays
        </Link>
        <Link
          href="/eat?town=whistler"
          className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors text-center"
        >
          Whistler Restaurants
        </Link>
        <Link
          href="/play?tag=skiing"
          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-colors text-center"
        >
          Ski &amp; Snow Activities
        </Link>
      </div>
    </section>
  );
}
