'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  fallbackEmoji?: string;
  placeholderUrl?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
  quality?: ImageProps['quality'];
};

// Default responsive sizes hint. Tuned for typical card/hero usage on
// this site (full-width on phones, half on tablets, third on desktop).
const DEFAULT_SIZES =
  '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

export default function FallbackImage({
  src,
  alt,
  fallbackEmoji,
  placeholderUrl,
  className = '',
  loading,
  priority,
  sizes,
  quality,
}: Props) {
  const [stage, setStage] = useState<'original' | 'placeholder' | 'emoji'>('original');

  if (stage === 'emoji') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-6xl opacity-20 saturate-0 brightness-200">
          {fallbackEmoji || '📍'}
        </span>
      </div>
    );
  }

  const imgSrc = stage === 'placeholder' && placeholderUrl ? placeholderUrl : src;

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      sizes={sizes || DEFAULT_SIZES}
      priority={priority}
      loading={priority ? undefined : (loading ?? 'lazy')}
      quality={quality}
      onError={() => {
        if (stage === 'original' && placeholderUrl) setStage('placeholder');
        else setStage('emoji');
      }}
    />
  );
}
