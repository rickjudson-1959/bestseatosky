import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for bestseatosky.com — how we collect and use your information.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">Privacy Policy</span>
      </nav>

      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

      <div className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-600 space-y-6">
        <p><strong>Effective date:</strong> November 11, 2026</p>

        <p>
          Best Sea to Sky (&quot;we,&quot; &quot;us,&quot; or &quot;the Site&quot;) respects your privacy. This
          policy explains what information we collect when you visit bestseatosky.com and how we use it.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">1. Information We Collect</h2>
        <p>
          <strong>Analytics data:</strong> We use Google Analytics to collect anonymous usage data such as pages
          visited, time on site, device type, and approximate location. This data does not personally identify
          you. Google Analytics uses cookies — see Google&apos;s{' '}
          <a href="https://policies.google.com/privacy" className="text-emerald-700 hover:underline" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{' '}
          for details.
        </p>
        <p>
          <strong>Contact information:</strong> If you email us (e.g., to claim a listing or inquire about
          advertising), we collect your email address and any information you include in your message.
        </p>
        <p>
          <strong>Payment information:</strong> Paid advertising transactions are processed by Stripe. We do not
          store your credit card details. See Stripe&apos;s{' '}
          <a href="https://stripe.com/privacy" className="text-emerald-700 hover:underline" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{' '}
          for details.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">2. Newsletter and email</h2>
        <p>
          When you sign up for the newsletter, we collect your email address, the page you signed up
          on, the time of signup, and your IP address and browser information. We keep the page, time,
          IP address, and browser information as proof of consent.
        </p>
        <p>
          We use this information to send you the newsletter and to keep a record of your consent.
        </p>
        <p>
          Brevo is our email provider. Brevo receives your email address so it can deliver the
          newsletter.
        </p>
        <p>
          Every newsletter email includes an unsubscribe link. You can also unsubscribe by emailing{' '}
          <a href="mailto:hello@bestseatosky.com" className="text-emerald-700 font-semibold hover:underline">hello@bestseatosky.com</a>.
          Unsubscribe requests are honoured within 10 business days.
        </p>
        <p>Best Sea to Sky, 1365 Victoria St., Squamish, BC V8B 1E5.</p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">3. How We Use Your Information</h2>
        <p>We use collected information to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Understand how visitors use the Site and improve our content</li>
          <li>Respond to inquiries and business listing claims</li>
          <li>Process advertising purchases</li>
          <li>Send the newsletter and keep a record of signup consent</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">4. Cookies</h2>
        <p>
          The Site uses cookies from Google Analytics to measure traffic. You can disable cookies in your browser
          settings or use a browser extension like{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" className="text-emerald-700 hover:underline" target="_blank" rel="noopener noreferrer">
            Google Analytics Opt-out
          </a>{' '}
          to prevent data collection.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">5. Third-Party Services</h2>
        <p>
          The Site integrates with the following third-party services, each with their own privacy policies:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Google Analytics</strong> — website analytics</li>
          <li><strong>Google Places</strong>: publicly available business details such as addresses, hours, and ratings. Listing photos are not from Google.</li>
          <li><strong>Stripe</strong> — payment processing for advertising</li>
          <li><strong>Vercel</strong> — website hosting</li>
          <li><strong>Supabase</strong> — database hosting</li>
          <li><strong>Brevo</strong>: email delivery for the newsletter</li>
        </ul>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">6. Data Retention</h2>
        <p>
          Analytics data is retained according to Google Analytics default settings (26 months). Contact emails
          are retained as long as necessary to respond to your inquiry. You may request deletion of your data by
          emailing us.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an
          updated effective date.
        </p>

        <h2 className="font-serif text-xl font-bold text-slate-900 mt-8 mb-3">8. Contact</h2>
        <p>
          Questions about this Privacy Policy? Email us at{' '}
          <a href="mailto:hello@bestseatosky.com" className="text-emerald-700 font-semibold hover:underline">
            hello@bestseatosky.com
          </a>.
        </p>
      </div>
    </section>
  );
}
