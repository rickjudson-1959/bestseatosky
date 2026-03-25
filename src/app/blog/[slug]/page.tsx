import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPostBySlug, getAllSeoPages } from '@/lib/data';
import NewsletterSignup from '@/components/NewsletterSignup';
import FaqSection from '@/components/FaqSection';
import AffiliateCard from '@/components/AffiliateCard';

type AffiliateConfig = { title: string; description: string; linkText: string; linkUrl: string };

function getBlogAffiliateCards(slug: string): AffiliateConfig[] {
  const cards: AffiliateConfig[] = [];

  if (slug.includes('whistler-winter') || slug.includes('skiing')) {
    cards.push({
      title: 'Hit the Slopes Ready',
      description: 'Whistler Blackcomb demands the right gear. Get kitted out before your first run.',
      linkText: 'Shop Ski & Snowboard Gear',
      linkUrl: 'https://amzn.to/3PvFlq1',
    });
  }

  if (slug.includes('squamish') && (slug.includes('hike') || slug.includes('48-hours'))) {
    cards.push({
      title: 'Gear Up for Your Hike',
      description: 'Heading out on the trails? Make sure you\'ve got the right footwear.',
      linkText: 'Shop Hiking Boots',
      linkUrl: 'https://amzn.to/4bCVgtS',
    });
    cards.push({
      title: 'Pack Right for the Trail',
      description: 'A good backpack makes all the difference on Sea to Sky trails.',
      linkText: 'Shop Hiking & Climbing Packs',
      linkUrl: 'https://amzn.to/47ILWUv',
    });
  }

  if (slug.includes('road-trip')) {
    cards.push({
      title: 'Gear Up for Your Hike',
      description: 'Heading out on the trails? Make sure you\'ve got the right footwear.',
      linkText: 'Shop Hiking Boots',
      linkUrl: 'https://amzn.to/4bCVgtS',
    });
  }

  return cards.slice(0, 2);
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  const url = `https://bestseatosky.com/blog/${slug}`;

  return {
    title: post.title,
    description: post.meta_description || post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt,
      url,
      type: 'article',
      ...(post.featured_image && {
        images: [{ url: post.featured_image, alt: post.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.meta_description || post.excerpt,
      ...(post.featured_image && {
        images: [post.featured_image],
      }),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  // Fetch related guides
  const allGuides = await getAllSeoPages();
  const relatedGuides = allGuides.slice(0, 3);

  const publishedDate = new Date(post.published_at).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    author: {
      '@type': 'Organization',
      name: post.author || 'Best Sea to Sky',
    },
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    publisher: {
      '@type': 'Organization',
      name: 'Best Sea to Sky',
      url: 'https://bestseatosky.com',
    },
    mainEntityOfPage: `https://bestseatosky.com/blog/${post.slug}`,
    ...(post.featured_image && { image: post.featured_image }),
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <Link href="/blog" className="hover:text-slate-600 transition-colors">Blog</Link>
        <span>›</span>
        <span className="text-slate-600 line-clamp-1">{post.title}</span>
      </nav>

      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
        {post.title}
      </h1>

      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <span>By {post.author || 'Best Sea to Sky'}</span>
        <span>·</span>
        <time>{publishedDate}</time>
      </div>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="rounded-2xl overflow-hidden mb-10">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="prose prose-slate prose-lg max-w-none mb-16
          prose-headings:font-serif prose-headings:text-slate-900
          prose-a:text-emerald-700 prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Affiliate Cards */}
      {getBlogAffiliateCards(slug).length > 0 && (
        <div className="flex flex-col gap-4 mb-12">
          {getBlogAffiliateCards(slug).map((card) => (
            <AffiliateCard key={card.linkUrl} {...card} />
          ))}
        </div>
      )}

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <div className="border-t border-slate-100 pt-10">
          <h2 className="font-serif text-xl font-bold text-slate-900 mb-5">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedGuides.map((guide) => (
              <Link key={guide.id} href={`/guide/${guide.slug}`} className="group">
                <div className="bg-white rounded-xl p-4 border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
                  <h3 className="font-serif text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug mb-1">
                    {guide.h1_text || guide.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {guide.meta_description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {post.faq_json && Array.isArray(post.faq_json) && post.faq_json.length > 0 && (
        <FaqSection faqs={post.faq_json} />
      )}

      {/* Newsletter Signup */}
      <div className="border-t border-slate-100 pt-10 mt-10">
        <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center">
          <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">
            Enjoying this? Get more local picks.
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Free Sea to Sky Trip Planner — restaurant recs, trail guides, and insider tips from locals.
          </p>
          <NewsletterSignup source="blog" />
        </div>
      </div>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bestseatosky.com' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bestseatosky.com/blog' },
              { '@type': 'ListItem', position: 3, name: post.title, item: `https://bestseatosky.com/blog/${post.slug}` },
            ],
          }),
        }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* FAQ Schema */}
      {post.faq_json && Array.isArray(post.faq_json) && post.faq_json.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faq_json.map((faq: { question: string; answer: string }) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: { '@type': 'Answer', text: faq.answer },
              })),
            }),
          }}
        />
      )}
    </article>
  );
}
