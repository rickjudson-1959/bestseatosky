export type LeadType = 'trip_planner' | 'newsletter';

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

/**
 * Queue a GA4 event. If gtag.js has not run yet, install the same
 * dataLayer stub the Google snippet uses so the hit is sent on load.
 * gtag.js only processes Arguments objects, not plain arrays.
 */
function gtagEvent(eventName: string, params: Record<string, string>) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      // gtag.js replays Arguments objects queued before the library loads.
      // A rest-parameter array is not treated as a command.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    } as GtagFn;
  }

  window.gtag('event', eventName, params);
}

/** Fire after /api/subscribe returns success. Does not include the email. */
export function trackSubscribeSuccess(formLocation: string, leadType: LeadType) {
  const params = {
    method: 'email',
    form_location: formLocation,
    lead_type: leadType,
  };

  gtagEvent('generate_lead', params);
  if (leadType === 'trip_planner') {
    gtagEvent('trip_planner_signup', params);
  }
}
