type Props = {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  disclaimerText?: string;
};

export default function AffiliateCard({
  title,
  description,
  linkText,
  linkUrl,
  disclaimerText = 'As an Amazon Associate, Best Sea to Sky earns from qualifying purchases.',
}: Props) {
  return (
    <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="text-2xl shrink-0 mt-0.5">🥾</span>
        <div className="flex-1">
          <h3 className="font-serif text-lg font-bold text-slate-900 mb-1.5">{title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{description}</p>
          <a
            href={linkUrl}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 text-white text-sm font-semibold rounded-xl hover:bg-emerald-800 transition-colors"
          >
            {linkText} <span>&rarr;</span>
          </a>
          <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">{disclaimerText}</p>
        </div>
      </div>
    </div>
  );
}
