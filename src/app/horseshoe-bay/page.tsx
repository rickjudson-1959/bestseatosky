import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Sea to Sky Mile Zero: A Local\'s Guide to Horseshoe Bay',
  description:
    "Horseshoe Bay isn't just a ferry terminal — it's Mile Zero of the Sea to Sky Highway, with 80 years of history and the best fish and chips in the corridor.",
  alternates: { canonical: '/horseshoe-bay' },
};

export default function HorseshoeBayPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-600">Horseshoe Bay</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        A Local&apos;s Guide to Horseshoe Bay: Mile Zero of the Sea to Sky Highway
      </h1>

      <p className="text-sm text-slate-400 mb-6">
        Updated August 2026 &middot; The village most people drive straight past
      </p>

      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-10">
        <Image
          src="/images/horseshoe-bay-pier.jpg"
          alt="The pier at Horseshoe Bay, with Howe Sound and the mountains in the background"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 mb-4">
        <p className="text-base">
          Most people who&apos;ve driven the length of the Sea to Sky Highway have never actually
          seen where it starts. There&apos;s a sign in Horseshoe Bay marking Mile Zero &mdash; down
          in the village, not out on the highway shoulder &mdash; and it&apos;s a four-minute walk
          from a ferry lineup that seven million people sit in every year. Almost none of them make
          the walk.
        </p>

        <h2>Where the Highway Begins</h2>
        <p>
          Horseshoe Bay is the southern start of the Sea to Sky Highway: 134 kilometres of Highway
          99 running north to Pemberton, a provincially designated scenic route, and the stretch
          everyone actually means when they say &ldquo;the Sea to Sky.&rdquo; Squamish, Whistler,
          and Pemberton all hang off it.
        </p>
        <p>
          Geographically, it&apos;s the obvious spot. The village sits right at the entrance to
          Howe Sound &mdash; the point where the city lets go and the road commits to water on one
          side and mountains on the other. The better question is why the count starts in a village
          of a few hundred people rather than in Vancouver, where the traffic actually comes from.
        </p>

        <h2>The Ferries Came First</h2>
        <p>
          The answer is that the ferries got here fifteen years before the pavement did.
        </p>
        <p>
          Black Ball Line leased a wharf and started running to Gibsons in 1951. Nanaimo followed
          in 1953, and Bowen Island in 1956 &mdash; taken over from the Union Steamship Company,
          which had already been working these waters for decades. In 1961, the provincial
          government bought out Black Ball&apos;s operations entirely, and what came out the other
          side was BC Ferries.
        </p>
        <p>
          Highway 99 wasn&apos;t paved until 1966 &mdash; one lane each way, carved into the cliffs
          above Howe Sound. Before that, you reached Squamish by boat or by the Pacific Great
          Eastern railway. Horseshoe Bay was a port before it was ever a starting line, which is
          exactly why the Mile Zero marker sits where it does: this is the spot where the water
          route handed off to the road, not the other way round.
        </p>
        <p>
          The highway most people drive today was substantially rebuilt for the 2010 Olympics
          &mdash; curves straightened, four lanes carried across most of the corridor, dozens of
          new bridges and retaining walls added between 2008 and 2009.
        </p>

        <h2>A Village That Changed Its Name Twice</h2>
        <p>
          The Squamish Nation called this bay Ch&apos;ax̱áy̓ &mdash; &ldquo;sizzling
          waters&rdquo; &mdash; for the way salmon would drive herring up to the surface until the
          whole bay looked like it was boiling.
        </p>
        <p>
          An Admiralty survey in 1909 named the point White Cliff, and the settlement became White
          Cliff City. Then in the late 1930s, a Colonel Albert Whyte bought land here and persuaded
          the Pacific Great Eastern railway to make &ldquo;Whytecliff&rdquo; the official name
          &mdash; a deliberate misspelling, so the place would carry his own. It stuck for eight
          years. On July 28, 1945, residents voted to rename it Horseshoe Bay instead, after the
          shape of the water. The Colonel kept a park and a headland out of the deal, which is more
          than most vanity projects manage.
        </p>

        <h2>Where to Eat</h2>
        <p>
          <strong>Troll&apos;s</strong> has been doing fish and chips on the waterfront since 1946
          &mdash; older than the highway, which is the correct order of things.{' '}
          <strong>Olive &amp; Anchor</strong> does the same job with a better view and a bit more
          room. <strong>The Troller Ale House</strong> is the move if you want a pint and a
          Yorkshire pudding with it. <strong>Pudgie&apos;s Pizza</strong> has been going since the
          1980s and knows exactly what it&apos;s doing. <strong>The Boathouse</strong> if you want
          a tablecloth involved.
        </p>

        <h2>Where to Walk</h2>
        <p>
          Horseshoe Bay Park sits right on the water &mdash; a playground, a spray park, a pier,
          two totem poles, and a 5,000-pound cast bronze propeller off a converted whaling ship
          that most people walk straight past on their way to an ice cream cone. It&apos;s worth
          the ten-minute loop even if you&apos;re only killing time before a sailing.
        </p>

        <h2>Go Further: Whytecliff Park</h2>
        <p>
          Five minutes west of the village, Whytecliff Park was the first Marine Protected Area in
          Canada &mdash; over 200 marine species, some of the best shore diving on the coast, and
          sea lions hauled out on the rocks through summer. At low tide, you can walk across to
          Whyte Islet. Check the tide table before you commit, or you&apos;re swimming back.
        </p>

        <h2>Catch a Different Boat</h2>
        <p>
          If your ferry isn&apos;t for another hour, walk on to Bowen Island instead &mdash; twenty
          minutes each way, no reservation needed, and Snug Cove is a genuine day out rather than a
          consolation prize. Sewell&apos;s Marina also runs sea safaris into Howe Sound if you want
          to be on the water without actually going anywhere in particular.
        </p>

        <h2>Crossing Times, if You&apos;re Timing Lunch</h2>
        <p>
          Bowen Island: 20 minutes. Langdale and the Sunshine Coast: 40 minutes. Departure Bay and
          Nanaimo: 1 hour 40.
        </p>
      </div>

      <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 mb-12">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">The Bottom Line on Horseshoe Bay</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          It&apos;s easy to treat Horseshoe Bay as the place you wait, not the place you visit. But
          it was a working port before the highway existed, it&apos;s named after a colonel&apos;s
          failed vanity project, and it&apos;s got a better fish-and-chips shop than most of the
          corridor it feeds into. Next time the ferry lineup is long, park it and walk into the
          village. Mile Zero is down there waiting, and you&apos;ve been driving past it for years.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/blog/sea-to-sky-road-trip-vancouver-to-pemberton"
          className="px-6 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors text-center"
        >
          Plan the Full Road Trip
        </Link>
        <Link
          href="/guide"
          className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-colors text-center"
        >
          Browse All Guides
        </Link>
      </div>
    </section>
  );
}
