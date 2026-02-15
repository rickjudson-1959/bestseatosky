import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <span className="text-6xl mb-6">🏔️</span>
      <h1 className="font-serif text-4xl text-slate-900 mb-3">Page Not Found</h1>
      <p className="text-slate-500 mb-8 max-w-md">
        Looks like this trail doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
