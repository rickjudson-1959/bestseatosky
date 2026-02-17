import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/data';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sea to Sky Blog | Travel Tips & Local Guides',
  description:
    'Travel tips, local guides, and insider knowledge for exploring Squamish, Whistler, and Pemberton along the Sea to Sky corridor.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="max-w-5xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">Blog</span>
      </nav>

      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-3">
        Sea to Sky Blog
      </h1>
      <p className="text-slate-500 text-base mb-12 max-w-2xl">
        Travel tips, local guides, and insider knowledge for exploring the corridor.
      </p>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <article className="bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
              {post.featured_image ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="h-48 bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <span className="text-5xl opacity-15 saturate-0 brightness-200">📝</span>
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <time className="text-xs text-slate-400 mb-2">
                  {new Date(post.published_at).toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h2 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <span className="text-xs font-semibold text-emerald-700 mt-3 inline-block">
                  Read more →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-slate-500 text-center py-12">No blog posts published yet.</p>
      )}
    </section>
  );
}
