export type WeekendSource = {
  label: string;
  href: string;
};

export type WeekendPhoto = {
  src: string;
  alt: string;
  credit: string;
};

export type WeekendEntry = {
  time: string;
  timeTone: 'clock' | 'span';
  timeNote?: string;
  name: string;
  venue: string;
  blurb: string;
  badges?: string[];
  warnings?: string[];
  sources: WeekendSource[];
  photo?: WeekendPhoto;
};

export type WeekendTown = {
  name: string;
  entries: WeekendEntry[];
};

export type WeekendDay = {
  heading: string;
  countLabel: string;
  towns: WeekendTown[];
};

export type WeekendIssue = {
  slug: string;
  title: string;
  description: string;
  masthead: string;
  startDate: string;
  endDate: string;
  updated: string;
  intro: string;
  days: WeekendDay[];
  notes: string[];
};

export function vancouverDateISO(now: Date): string;
export function isIssueCurrent(endDate: string, today: string): boolean;
export function pickLatest(issues: WeekendIssue[]): WeekendIssue | null;
export function pickArchive(issues: WeekendIssue[], today: string): WeekendIssue[];
export function formatWeekendRange(start: string, end: string): string;
export function formatUpdated(iso: string): string;
export function findIssueViolations(text: string): string[];
export function assertIssueTextClean(text: string, label: string): void;
export function validateIssue(issue: unknown, filename?: string): WeekendIssue;
