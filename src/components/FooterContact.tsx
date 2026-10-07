'use client';

import { usePathname } from 'next/navigation';
import CallCta from '@/components/CallCta';
import { isListingDetailPath } from '@/lib/listingRoutes';

export default function FooterContact() {
  const pathname = usePathname();
  const showCallBlock = !isListingDetailPath(pathname);

  return (
    <div className="flex flex-col gap-8">
      {showCallBlock ? <CallCta variant="footer" /> : null}
      <div>
        <h4 className="font-serif text-base text-white mb-2">Email Us</h4>
        <a
          href="mailto:hello@bestseatosky.com"
          className="text-sm text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
        >
          hello@bestseatosky.com
        </a>
      </div>
    </div>
  );
}
