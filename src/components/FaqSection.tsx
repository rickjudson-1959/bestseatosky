'use client';

import { useState } from 'react';

interface Faq {
  question: string;
  answer: string;
}

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-16 mb-8">
      <h2 className="font-serif text-2xl text-slate-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={faq.question}
            className="border border-slate-200 rounded-xl overflow-hidden bg-white"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left font-medium text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <span>{faq.question}</span>
              <svg
                className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ml-4 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-slate-600 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
