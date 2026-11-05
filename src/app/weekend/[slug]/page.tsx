import Link from 'next/link';
import { notFound } from 'next/navigation';
import WeekendIssueView from '@/components/WeekendIssueView';
import {
  getIssue,
  issueRobots,
  listIssues,
  weekendAsOf,
  weekendPageMetadata,
} from '@/lib/weekend';

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return listIssues().map((issue) => ({ slug: issue.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) {
    return weekendPageMetadata({
      title: 'Weekend list',
      description: 'This weekend list is not on the site.',
      canonicalPath: '/weekend',
      index: false,
      type: 'website',
    });
  }

  return weekendPageMetadata({
    title: issue.title,
    description: issue.description,
    canonicalPath: `/weekend/${issue.slug}`,
    index: issueRobots(issue).index,
    type: 'article',
  });
}

function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default async function WeekendIssuePage({ params }: Props) {
  const { slug } = await params;
  const issue = getIssue(slug);
  if (!issue) notFound();

  const today = weekendAsOf();
  const canonical = `https://bestseatosky.com/weekend/${issue.slug}`;
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: issue.title,
    description: issue.description,
    datePublished: issue.updated,
    dateModified: issue.updated,
    inLanguage: 'en-CA',
    author: {
      '@type': 'Organization',
      name: 'Best Sea to Sky',
      url: 'https://bestseatosky.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Best Sea to Sky',
      url: 'https://bestseatosky.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bestseatosky.com/icon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bestseatosky.com' },
      { '@type': 'ListItem', position: 2, name: 'This weekend', item: 'https://bestseatosky.com/weekend' },
      { '@type': 'ListItem', position: 3, name: issue.title, item: canonical },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(article) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />

      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <Link href="/weekend" className="hover:text-slate-600 transition-colors">This weekend</Link>
        <span>›</span>
        <span className="text-slate-600 line-clamp-1">{issue.title}</span>
      </nav>

      <WeekendIssueView issue={issue} today={today} />

      <p className="mt-10 text-sm text-slate-600">
        <Link href="/weekend#subscribe" className="font-semibold text-emerald-800 hover:underline">
          Get the weekend list
        </Link>
      </p>
    </div>
  );
}
