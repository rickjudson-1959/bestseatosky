import { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Best Sea to Sky team. Questions about listings, advertising, corrections, or partnerships — we\'d love to hear from you.',
};

export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">Contact</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4">
        Get in Touch
      </h1>
      <p className="text-slate-500 text-lg mb-10">
        Have a question, suggestion, or correction? We&apos;d love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="font-serif text-base font-bold text-slate-900 mb-2">Email Us</h3>
          <p className="text-sm text-slate-500 mb-3">
            For general inquiries, corrections, or feedback.
          </p>
          <a
            href="mailto:hello@bestseatosky.com"
            className="text-sm text-emerald-700 font-semibold hover:underline"
          >
            hello@bestseatosky.com
          </a>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="font-serif text-base font-bold text-slate-900 mb-2">Business Listings</h3>
          <p className="text-sm text-slate-500 mb-3">
            Want to claim, update, or add your business?
          </p>
          <Link
            href="/get-listed"
            className="text-sm text-emerald-700 font-semibold hover:underline"
          >
            Get Listed
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          <h3 className="font-serif text-base font-bold text-slate-900 mb-2">Advertising</h3>
          <p className="text-sm text-slate-500 mb-3">
            Interested in featured or sponsored placement?
          </p>
          <Link
            href="/get-listed"
            className="text-sm text-emerald-700 font-semibold hover:underline"
          >
            View Plans
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-10">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
        <ContactForm />
      </div>
    </section>
  );
}
