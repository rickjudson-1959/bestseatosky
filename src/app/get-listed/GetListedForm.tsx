'use client';
'use no memo';

import { useState, FormEvent } from 'react';
import { Category, Town } from '@/lib/supabase';

type Props = {
  categories: Category[];
  towns: Town[];
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function GetListedForm({ categories, towns }: Props) {
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
      contact_name: formData.get('business_name'),
      email: formData.get('email'),
      category_id: formData.get('category_id') || null,
      town_id: formData.get('town_id') || null,
    };

    try {
      const res = await fetch('/api/get-listed', {
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
        <h3 className="font-serif text-2xl font-bold text-slate-900 mb-2">You&apos;re In!</h3>
        <p className="text-slate-600">
          We&apos;ll set up your free listing and send you a confirmation within 24 hours.
          Want featured placement?{' '}
          <a href="mailto:hello@bestseatosky.com?subject=Featured Listing Inquiry" className="text-emerald-700 font-semibold hover:underline">
            Let us know
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="business_name" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="business_name"
            name="business_name"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="e.g. Wild Wood Bistro"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="you@business.com"
          />
        </div>

        <div>
          <label htmlFor="category_id" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Category
          </label>
          <select
            id="category_id"
            name="category_id"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="town_id" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Town
          </label>
          <select
            id="town_id"
            name="town_id"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select a town</option>
            {towns.map((town) => (
              <option key={town.id} value={town.id}>
                {town.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 rounded-xl bg-emerald-700 text-white text-sm font-bold hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting...' : 'Get Your Free Listing'}
      </button>

      <p className="text-xs text-slate-400 text-center">
        Free forever. No credit card required. Upgrade anytime.
      </p>
    </form>
  );
}
