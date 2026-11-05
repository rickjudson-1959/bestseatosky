import fs from 'node:fs';
import path from 'node:path';
import type { Metadata, MetadataRoute } from 'next';
import {
  assertIssueTextClean,
  formatUpdated,
  formatWeekendRange,
  isIssueCurrent,
  pickArchive,
  pickLatest,
  validateIssue,
  vancouverDateISO,
  type WeekendIssue,
} from './weekendCore';

const DATA_DIR = path.join(process.cwd(), 'src/data/weekend');
const SITE = 'https://bestseatosky.com';

export type { WeekendIssue };

export { formatUpdated, formatWeekendRange, isIssueCurrent, vancouverDateISO };

/**
 * Calendar day used for "has this weekend passed?".
 * WEEKEND_AS_OF=YYYY-MM-DD is a test override. Do not set it on Vercel.
 */
export function weekendAsOf(now: Date = new Date()): string {
  const override = process.env['WEEKEND_AS_OF']?.trim();
  if (override) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(override)) {
      throw new Error('WEEKEND_AS_OF must be YYYY-MM-DD.');
    }
    return override;
  }
  return vancouverDateISO(now);
}

export function listIssues(): WeekendIssue[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  const files = fs.readdirSync(DATA_DIR).filter((name) => name.endsWith('.json')).sort();
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(DATA_DIR, file), 'utf8');
      assertIssueTextClean(raw, file);
      return validateIssue(JSON.parse(raw) as unknown, file);
    })
    .sort((a, b) => (a.startDate < b.startDate ? 1 : a.startDate > b.startDate ? -1 : 0));
}

export function getIssue(slug: string): WeekendIssue | undefined {
  return listIssues().find((issue) => issue.slug === slug);
}

export function latestWeekendIssue(): WeekendIssue | undefined {
  return pickLatest(listIssues()) ?? undefined;
}

export function archiveWeekendIssues(today: string = weekendAsOf()): WeekendIssue[] {
  return pickArchive(listIssues(), today);
}

export function issueRobots(issue: WeekendIssue, today: string = weekendAsOf()): { index: boolean; follow: true } {
  return isIssueCurrent(issue.endDate, today)
    ? { index: true, follow: true }
    : { index: false, follow: true };
}

export function weekendSitemapEntries(today: string = weekendAsOf()): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/weekend`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  for (const issue of listIssues()) {
    if (!isIssueCurrent(issue.endDate, today)) continue;
    entries.push({
      url: `${SITE}/weekend/${issue.slug}`,
      lastModified: new Date(issue.updated),
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  }

  return entries;
}

export function weekendPageMetadata(options: {
  title: string;
  description: string;
  canonicalPath: string;
  index: boolean;
  type?: 'website' | 'article';
}): Metadata {
  const url = `${SITE}${options.canonicalPath}`;
  return {
    title: options.title,
    description: options.description,
    alternates: { canonical: options.canonicalPath },
    robots: { index: options.index, follow: true },
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      siteName: 'Best Sea to Sky',
      locale: 'en_CA',
      type: options.type ?? 'website',
      images: [
        {
          url: `${SITE}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: 'Best Sea to Sky',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: options.title,
      description: options.description,
      images: [`${SITE}/og-default.jpg`],
    },
  };
}
