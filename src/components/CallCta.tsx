export const PHONE_DISPLAY = '+1 (778) 770-2931';
export const PHONE_HREF = 'tel:+17787702931';
export const CALL_ONELINER =
  'Call or text · 9am–6pm PT · If we miss you, leave a voicemail or text, we call back same day during hours.';

type Props = {
  variant?: 'card' | 'footer';
};

export default function CallCta({ variant = 'card' }: Props) {
  if (variant === 'footer') {
    return (
      <div>
        <h4 className="font-serif text-base text-white mb-2">Call Us</h4>
        <a
          href={PHONE_HREF}
          className="text-sm text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
          aria-label={`Call or text ${PHONE_DISPLAY}`}
        >
          {PHONE_DISPLAY}
        </a>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xl">
          {CALL_ONELINER}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200">
      <h3 className="font-serif text-base font-bold text-slate-900 mb-2">Call Us</h3>
      <a
        href={PHONE_HREF}
        className="text-sm text-emerald-700 font-semibold hover:underline"
        aria-label={`Call or text ${PHONE_DISPLAY}`}
      >
        {PHONE_DISPLAY}
      </a>
      <p className="text-sm text-slate-500 mt-3 leading-relaxed">{CALL_ONELINER}</p>
    </div>
  );
}
