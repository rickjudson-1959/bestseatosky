import Link from 'next/link';
import NewsletterSignup from '@/components/NewsletterSignup';
import WeekendIssueView from '@/components/WeekendIssueView';
import {
  archiveWeekendIssues,
  formatWeekendRange,
  latestWeekendIssue,
  weekendAsOf,
  weekendPageMetadata,
} from '@/lib/weekend';

export const revalidate = 3600;

export async function generateMetadata() {
  const issue = latestWeekendIssue();
  return weekendPageMetadata({
    title: issue?.title ?? 'This weekend in the Sea to Sky',
    description:
      issue?.description
      ?? 'What is on in Whistler, Squamish, Pemberton, and Britannia Beach.',
    canonicalPath: '/weekend',
    index: true,
    type: 'website',
  });
}

export default function WeekendPage() {
  const today = weekendAsOf();
  const issue = latestWeekendIssue();
  const archive = archiveWeekendIssues(today);
  const past = issue ? issue.endDate < today : false;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <span>›</span>
        <span className="text-slate-600">This weekend</span>
      </nav>

      {issue ? (
        <WeekendIssueView
          issue={issue}
          today={today}
          pastDetail={past ? 'This weekend has passed. A newer list has not been posted yet.' : undefined}
        />
      ) : (
        <>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
            This weekend in the Sea to Sky
          </h1>
          <p className="mt-4 text-slate-600">The weekend list has not been posted yet.</p>
        </>
      )}

      <section id="subscribe" className="mt-12 rounded-2xl border border-emerald-200 bg-white p-6 md:p-8">
        <h2 className="font-serif text-2xl text-slate-900 mb-2">Get the weekend list</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Sign up for the Sea to Sky weekend list.
        </p>
        <NewsletterSignup
          source="weekend-page"
          leadType="newsletter"
          buttonLabel="Get the weekend list"
          successMessage="You're in. Check your inbox for a welcome email."
        />
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-slate-900 mb-4">Earlier weekends</h2>
        {archive.length === 0 ? (
          <p className="text-sm text-slate-500">Earlier lists will appear here after each weekend.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {archive.map((item) => (
              <li key={item.slug} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                <Link
                  href={`/weekend/${item.slug}`}
                  className="font-semibold text-slate-900 hover:text-emerald-800"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-sm text-slate-500">
                  {formatWeekendRange(item.startDate, item.endDate)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bestseatosky.com' },
              { '@type': 'ListItem', position: 2, name: 'This weekend', item: 'https://bestseatosky.com/weekend' },
            ],
          }),
        }}
      />
    </div>
  );
}
