'use client';

import { useState } from 'react';

export default function FallbackImage({
  src,
  alt,
  fallbackEmoji,
  className = '',
  loading,
}: {
  src: string;
  alt: string;
  fallbackEmoji?: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-6xl opacity-20 saturate-0 brightness-200">
          {fallbackEmoji || '📍'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
