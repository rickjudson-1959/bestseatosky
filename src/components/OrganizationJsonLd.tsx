'use client';

import { usePathname } from 'next/navigation';
import { PHONE_DISPLAY } from '@/components/CallCta';
import { isListingDetailPath } from '@/lib/listingRoutes';

const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Best Sea to Sky',
  url: 'https://bestseatosky.com',
  logo: 'https://bestseatosky.com/icon.svg',
  description: 'Your free guide to 850+ places across Squamish, Whistler & Pemberton',
  sameAs: [
    'https://www.facebook.com/bestseatosky',
    'https://www.instagram.com/bestseatosky',
  ],
};

export default function OrganizationJsonLd() {
  const pathname = usePathname();
  const data = isListingDetailPath(pathname)
    ? ORGANIZATION
    : { ...ORGANIZATION, telephone: PHONE_DISPLAY };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
