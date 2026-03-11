'use client';
'use no memo';

import { useState, FormEvent } from 'react';

type Props = {
  source?: string;
  variant?: 'default' | 'compact';
};

export default function NewsletterSignup({ source = 'website', variant = 'default' }: Props) {
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
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="px-5 py-3 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors disabled:opacity-50 shrink-0"
        >
          {status === 'submitting' ? '...' : 'Subscribe'}
        </button>
        {status === 'error' && (
          <p className="text-red-600 text-xs mt-1 absolute">{errorMessage}</p>
        )}
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
          {status === 'submitting' ? 'Subscribing...' : 'Get the Free Guide'}
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-3">
        Free. No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
