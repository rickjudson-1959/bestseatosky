import { Metadata } from 'next';
import Link from 'next/link';
import ChatUI from '@/components/ChatUI';

export const metadata: Metadata = {
  title: 'Trip Planner',
  description:
    'Plan your Sea to Sky trip with our AI-powered local guide. Get personalized recommendations for restaurants, hikes, hotels, and activities in Squamish, Whistler, and Pemberton.',
  alternates: { canonical: '/chat' },
};

export default function ChatPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">Trip Planner</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🏔️</span>
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
            Sea to Sky Trip Planner
          </h1>
          <p className="text-sm text-slate-500">
            Ask me anything about Squamish, Whistler, and Pemberton
          </p>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
        <ChatUI variant="full" />
      </div>
    </section>
  );
}
