'use client';
'use no memo';

import { useState, FormEvent } from 'react';
import { trackSubscribeSuccess, type LeadType } from '@/lib/analytics';

type Props = {
  source?: string;
  variant?: 'default' | 'compact';
  /** Every capture on the site today is the free trip planner. */
  leadType?: LeadType;
  /** Shown only after a successful submit. Used to gate the trip planner PDF. */
  successDownloadHref?: string;
};

export default function NewsletterSignup({
  source = 'website',
  variant = 'default',
  leadType = 'trip_planner',
  successDownloadHref,
}: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const email = new FormData(form).get('email') as string;

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(result.error || 'Something went wrong.');
        return;
      }

      trackSubscribeSuccess(source, leadType);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className={variant === 'compact' ? 'text-center py-4' : 'text-center py-6'}>
        <p className="text-emerald-700 font-semibold text-sm">
          You&apos;re in! Check your inbox for your Sea to Sky trip planner.
        </p>
        {successDownloadHref ? (
          <a
            href={successDownloadHref}
            download
            className="inline-flex mt-4 px-6 py-3.5 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors"
          >
            Download the PDF now
          </a>
        ) : null}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            className="w-full min-w-0 flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors disabled:opacity-50 shrink-0"
          >
            {status === 'submitting' ? '...' : 'Get the Planner'}
          </button>
        </div>
        {status === 'error' ? (
          <p className="text-red-600 text-xs mt-2">{errorMessage}</p>
        ) : null}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-4">
          {errorMessage}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-6 py-3.5 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors disabled:opacity-50 shrink-0"
        >
          {status === 'submitting' ? 'Sending...' : 'Get the Free Planner'}
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-3">
        Free. No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
