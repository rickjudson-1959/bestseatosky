import { priceDollarMarks } from '@/lib/price';

export default function PriceLevel({
  level,
  size = 'xs',
}: {
  level: unknown;
  size?: 'xs' | 'sm';
}) {
  const marks = priceDollarMarks(level);
  if (!marks) return null;

  return (
    <span className={size === 'sm' ? 'text-sm' : 'text-xs'}>
      {marks.map((className, i) => (
        <span key={i} className={className}>
          $
        </span>
      ))}
    </span>
  );
}
