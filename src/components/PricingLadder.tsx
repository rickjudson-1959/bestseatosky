import Link from 'next/link';
import { PRICING_TIERS } from '@/lib/pricingTiers';

type Props = {
  variant?: 'cards' | 'compact';
  theme?: 'light' | 'dark';
  freeHref?: string;
};

export default function PricingLadder({
  variant = 'cards',
  theme = 'light',
  freeHref = '/get-listed#get-started',
}: Props) {
  if (variant === 'compact') {
    const isDark = theme === 'dark';
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {PRICING_TIERS.map((tier) => {
          const href = tier.paid ? tier.href : freeHref;
          const className = isDark
            ? 'rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left hover:bg-white/10 transition-colors'
            : 'rounded-xl border border-slate-200 bg-white px-4 py-3 text-left hover:border-emerald-300 transition-colors';
          const nameClass = isDark ? 'text-white text-sm font-semibold' : 'text-slate-900 text-sm font-semibold';
          const priceClass = isDark ? 'text-emerald-300 text-lg font-bold' : 'text-slate-900 text-lg font-bold';
          const ctaClass = isDark ? 'text-emerald-200 text-xs font-semibold mt-1' : 'text-emerald-700 text-xs font-semibold mt-1';

          const inner = (
            <>
              <div className={nameClass}>{tier.name}</div>
              <div className={priceClass}>
                {tier.price}
                {tier.period && <span className="text-sm font-normal text-slate-400">{tier.period}</span>}
              </div>
              <div className={ctaClass}>{tier.paid ? 'Pay with Stripe' : 'Start free'}</div>
            </>
          );

          return tier.paid ? (
            <a key={tier.name} href={href} className={className}>
              {inner}
            </a>
          ) : (
            <Link key={tier.name} href={href} className={className}>
              {inner}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PRICING_TIERS.map((tier) => {
        const href = tier.paid ? tier.href : freeHref;
        const buttonClass = tier.popular
          ? 'bg-emerald-700 text-white hover:bg-emerald-800'
          : tier.paid
            ? 'bg-slate-900 text-white hover:bg-slate-800'
            : 'bg-slate-900 text-white hover:bg-slate-800';
        const cardClass = tier.popular
          ? 'border-emerald-400 border-2 ring-1 ring-emerald-200 bg-emerald-50/30'
          : 'border-slate-200';

        const button = (
          <span className={`block w-full text-center py-3 rounded-xl text-sm font-bold transition-colors ${buttonClass}`}>
            {tier.cta}
          </span>
        );

        return (
          <div
            key={tier.name}
            className={`bg-white rounded-2xl p-7 border ${cardClass} flex flex-col relative`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most popular
                </span>
              </div>
            )}
            <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">{tier.name}</h3>
            <p className="text-xs text-slate-400 mb-4">{tier.description}</p>
            <div className="mb-5">
              <span className="text-3xl font-bold text-slate-900">{tier.price}</span>
              {tier.period && <span className="text-sm text-slate-400">{tier.period}</span>}
            </div>
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-emerald-600 mt-0.5 shrink-0">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
            {tier.paid ? (
              <a href={href}>{button}</a>
            ) : (
              <Link href={href}>{button}</Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
