import type { WeekendIssue } from '@/lib/weekend';
import { formatUpdated, formatWeekendRange } from '@/lib/weekend';

type Props = {
  issue: WeekendIssue;
  today: string;
  pastDetail?: string;
};

export default function WeekendIssueView({ issue, today, pastDetail }: Props) {
  const past = issue.endDate < today;
  const upcoming = today < issue.startDate;

  return (
    <article>
      <p className="text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-2">
        This weekend
      </p>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
        {issue.title}
      </h1>
      <p className="font-serif text-2xl md:text-3xl text-emerald-800 mt-4">
        {formatWeekendRange(issue.startDate, issue.endDate)}
      </p>
      <p className="text-sm text-slate-500 mt-1">{issue.masthead}</p>
      <p className="mt-4">
        <time
          dateTime={issue.updated}
          className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white"
        >
          {formatUpdated(issue.updated)}
        </time>
      </p>

      {past ? (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950">
          {pastDetail ?? 'This weekend has passed.'}
        </p>
      ) : null}
      {upcoming ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
          This list is for an upcoming weekend.
        </p>
      ) : null}

      <p className="text-slate-600 leading-relaxed mt-6">{issue.intro}</p>

      {issue.days.map((day) => (
        <section key={day.heading} className="mt-10">
          <h2 className="font-serif text-2xl text-slate-900 border-b border-slate-200 pb-2">
            {day.heading}
            <span className="ml-2 align-middle font-sans text-sm font-semibold text-slate-500">
              {day.countLabel}
            </span>
          </h2>
          {day.towns.map((town) => (
            <div key={`${day.heading}-${town.name}`}>
              <h3 className="mt-6 mb-3 text-xs font-bold uppercase tracking-widest text-emerald-800">
                {town.name}
              </h3>
              <div className="flex flex-col gap-3">
                {town.entries.map((entry) => (
                  <article
                    key={`${day.heading}-${town.name}-${entry.name}-${entry.time}`}
                    className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-block rounded-lg px-2.5 py-1 text-xs font-bold text-white ${
                          entry.timeTone === 'span' ? 'bg-amber-700' : 'bg-emerald-800'
                        }`}
                      >
                        {entry.time}
                      </span>
                      {entry.timeNote ? (
                        <span className="text-xs font-semibold text-slate-500">{entry.timeNote}</span>
                      ) : null}
                    </div>
                    <h4 className="mt-3 text-base font-bold text-slate-900">{entry.name}</h4>
                    <p className="mt-0.5 text-sm text-slate-500">{entry.venue}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800">{entry.blurb}</p>
                    {entry.photo ? (
                      <figure className="mt-3">
                        {/* A later photo may be an off-site URL, which next/image would reject. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={entry.photo.src}
                          alt={entry.photo.alt}
                          className="h-auto w-full rounded-xl"
                        />
                        <figcaption className="mt-1 text-xs text-slate-500">
                          Photo: {entry.photo.credit}
                        </figcaption>
                      </figure>
                    ) : null}
                    {entry.badges?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {entry.badges.map((badge) => (
                          <span
                            key={badge}
                            className="inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-900"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    {entry.warnings?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {entry.warnings.map((warning) => (
                          <span
                            key={warning}
                            className="inline-block rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-950"
                          >
                            {warning}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <p className="mt-3 border-t border-dashed border-slate-200 pt-2 text-xs text-slate-500">
                      Source:{' '}
                      {entry.sources.map((source, index) => (
                        <span key={source.href}>
                          {index > 0 ? ' · ' : null}
                          <a
                            href={source.href}
                            className="font-semibold text-emerald-800 hover:underline"
                          >
                            {source.label}
                          </a>
                        </span>
                      ))}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      ))}

      <div className="mt-8 space-y-2 text-sm leading-relaxed text-slate-500">
        {issue.notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>
    </article>
  );
}
