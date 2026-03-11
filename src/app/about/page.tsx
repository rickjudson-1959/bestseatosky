import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Best Sea to Sky is a locally curated directory for the Sea to Sky corridor — from West Vancouver to Pemberton. Built by a Squamish local who got tired of the tourist noise.',
};

export default function AboutPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">About</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        The Story Behind Best Sea to Sky
      </h1>
      <p className="text-slate-500 text-lg mb-10">
        A local directory built for the people who live, work, and play in this corridor.
      </p>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 space-y-6">

        {/* Founder Story */}
        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">For the Love of the Corridor</h2>
        <p>
          I didn&apos;t build Best Sea to Sky because I&apos;m a travel writer. I built it because I live here.
        </p>
        <p>
          When I moved to Squamish, I fell in love with the raw energy of this place — the way the
          morning mist sits on the Chief and the community that thrives at the intersection of the
          mountains and the sound. But I quickly realized that finding the <em>real</em> Squamish meant
          filtering through a lot of noise.
        </p>
        <p>
          The big travel blogs always point you to the same three crowded spots. They don&apos;t tell
          you which coffee shop is actually open at 6:00 AM for your pre-hike caffeine hit, or which
          local brewery has the best patio for a post-trail pint with your dog.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">A Local&apos;s Perspective</h2>
        <p>
          I found a need for a service that cut through the tourist traps and offered the straight
          goods on the places we actually go. Best Sea to Sky is a local directory built for the
          people who live, work, and play in this corridor.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Authentic Discovery.</strong> We only feature the spots that make the Sea to Sky special.
          </li>
          <li>
            <strong>Community First.</strong> Our goal is to support the small businesses that give
            our towns their character.
          </li>
          <li>
            <strong>Field-Tested Guides.</strong> Every trail recommendation and &quot;must-stop&quot; is
            based on real experience in the Squamish backcountry.
          </li>
        </ul>
        <p>
          Whether you&apos;re a long-term local or just passing through, I want to make sure you find
          the version of the Sea to Sky that I fell in love with.
        </p>

        <p className="text-slate-900 font-semibold mt-8">
          — Rick Judson
          <br />
          <span className="text-slate-500 font-normal">Founder &amp; Squamish Local</span>
        </p>

        {/* Separator */}
        <hr className="border-slate-200 my-10" />

        {/* How It Works */}
        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">What Makes Us Different</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Full corridor coverage.</strong> We&apos;re the only directory that spans the
            entire Sea to Sky — West Vancouver, Lions Bay, Britannia Beach, Squamish, Brackendale,
            Whistler, Pemberton, and everywhere in between.
          </li>
          <li>
            <strong>Real reviews, not paid placements.</strong> Every listing shows its actual Google
            rating and review count. We don&apos;t manufacture reviews or let businesses buy higher
            star ratings.
          </li>
          <li>
            <strong>859+ verified listings.</strong> From fine dining to food trucks, luxury lodges
            to backcountry campsites, ski schools to kayak rentals — if it&apos;s worth visiting,
            it&apos;s on Best Sea to Sky.
          </li>
        </ul>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">How Listings Work</h2>
        <p>
          Every business in the Sea to Sky corridor can be listed on our site for free. We pull in
          publicly available data including Google ratings, hours, and contact information to give
          visitors the most complete picture possible.
        </p>
        <p>
          Business owners can{' '}
          <Link href="/get-listed" className="text-emerald-700 font-semibold hover:underline">
            claim their listing
          </Link>{' '}
          to update their description, add photos, and ensure their information is accurate. For
          businesses that want more visibility, we offer{' '}
          <Link href="/get-listed" className="text-emerald-700 font-semibold hover:underline">
            Featured and Sponsored tiers
          </Link>{' '}
          with priority placement and additional promotion.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">Get in Touch</h2>
        <p>
          Have a question, a correction, or a suggestion? I&apos;d love to hear from you.
        </p>
        <p>
          Email us at{' '}
          <a href="mailto:hello@bestseatosky.com" className="text-emerald-700 font-semibold hover:underline">
            hello@bestseatosky.com
          </a>{' '}
          or visit our{' '}
          <Link href="/contact" className="text-emerald-700 font-semibold hover:underline">
            contact page
          </Link>.
        </p>
      </div>
    </section>
  );
}
