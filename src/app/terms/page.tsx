import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of use for bestseatosky.com — your guide to the Sea to Sky corridor.',
};

export default function TermsPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">Terms of Use</span>
      </nav>

      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-8">Terms of Use</h1>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 space-y-6">
        <p><strong>Effective date:</strong> February 1, 2026</p>

        <p>
          Welcome to Best Sea to Sky (&quot;we,&quot; &quot;us,&quot; or &quot;the Site&quot;). By accessing
          or using bestseatosky.com you agree to be bound by these Terms of Use. If you do not agree, please
          do not use the Site.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">1. Use of the Site</h2>
        <p>
          The Site provides a directory of businesses, guides, and editorial content related to the Sea to Sky
          corridor in British Columbia, Canada. You may use the Site for personal, non-commercial purposes. You
          may not scrape, reproduce, or redistribute the content without our written consent.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">2. Accuracy of Information</h2>
        <p>
          Business listings, ratings, reviews, hours, and other data are sourced from third-party providers
          including Google Places. We make reasonable efforts to keep information current but do not guarantee
          its accuracy, completeness, or timeliness. Always confirm details directly with the business before
          visiting.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">3. Third-Party Links</h2>
        <p>
          The Site may contain links to third-party websites. We are not responsible for the content, policies,
          or practices of any external sites. Accessing third-party links is at your own risk.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">4. Intellectual Property</h2>
        <p>
          All content on the Site — including text, graphics, logos, and the site design — is owned by Best Sea
          to Sky or its licensors and is protected by copyright and other intellectual property laws. Business
          listing photos are sourced from Google Places and remain the property of their respective owners.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">5. Limitation of Liability</h2>
        <p>
          The Site is provided &quot;as is&quot; without warranties of any kind. To the fullest extent permitted
          by law, we disclaim all liability for damages arising from your use of the Site, including reliance on
          any information provided.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">6. Changes to These Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of the Site after changes constitutes acceptance
          of the revised Terms.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">7. Contact</h2>
        <p>
          Questions about these Terms? Email us at{' '}
          <a href="mailto:hello@bestseatosky.com" className="text-emerald-700 font-semibold hover:underline">
            hello@bestseatosky.com
          </a>.
        </p>
      </div>
    </section>
  );
}
