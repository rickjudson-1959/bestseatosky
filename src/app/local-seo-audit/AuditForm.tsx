'use client';

import { useState, FormEvent } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function AuditForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      business_name: formData.get('business_name'),
      contact_name: formData.get('contact_name'),
      email: formData.get('email'),
      website: formData.get('website'),
      source: 'seo-audit',
    };

    try {
      const res = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">&#10003;</div>
        <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">We&apos;re On It!</h3>
        <p className="text-slate-600">
          Your free SEO audit is in the queue. You&apos;ll receive your personalized report
          at the email you provided within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="business_name" className="block text-sm font-semibold text-slate-700 mb-1">
          Business Name
        </label>
        <input
          type="text"
          id="business_name"
          name="business_name"
          required
          placeholder="e.g. Backcountry Brewing"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="contact_name" className="block text-sm font-semibold text-slate-700 mb-1">
          Your Name
        </label>
        <input
          type="text"
          id="contact_name"
          name="contact_name"
          required
          placeholder="e.g. Jane Smith"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="you@yourbusiness.com"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-semibold text-slate-700 mb-1">
          Website URL
        </label>
        <input
          type="url"
          id="website"
          name="website"
          required
          placeholder="https://yourbusiness.com"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting...' : 'Get My Free Audit'}
      </button>
    </form>
  );
}
