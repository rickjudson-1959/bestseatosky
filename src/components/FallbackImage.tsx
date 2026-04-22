'use client';

import { useState } from 'react';

export default function FallbackImage({
  src,
  alt,
  fallbackEmoji,
  placeholderUrl,
  className = '',
  loading,
}: {
  src: string;
  alt: string;
  fallbackEmoji?: string;
  placeholderUrl?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}) {
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
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (stage === 'original' && placeholderUrl) {
          setStage('placeholder');
        } else {
          setStage('emoji');
        }
      }}
    />
  );
}
