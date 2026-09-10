export type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  paid: boolean;
  popular?: boolean;
};

export const STRIPE_CORRIDOR_LEADER = 'https://buy.stripe.com/5kQaEX9Zx84OftsaROabK00';
export const STRIPE_TOWN_SPOTLIGHT = 'https://buy.stripe.com/3cIdR97Rpfxg0yy0daabK03';
export const STRIPE_SPONSORED_GUIDE = 'https://buy.stripe.com/3cI00j8Vt84Ogxw8JGabK01';

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Local Starter',
    price: 'Free',
    period: '',
    description: 'Get your name in front of people who are already planning a corridor trip',
    features: [
      'Show up alongside the best in your category',
      'Your real Google stars and reviews, front and centre',
      'Address, phone, and website, one click to your door',
      'Found when visitors search your town',
      'Claim and update your info whenever you want',
    ],
    cta: 'Get started free',
    href: '/get-listed#get-started',
    paid: false,
  },
  {
    name: 'Corridor Leader',
    price: '$49',
    period: '/mo',
    description: 'Be the first name visitors see when they are planning their trip',
    features: [
      'Everything in Local Starter, plus:',
      'A Featured badge so visitors know you are the real deal',
      'First thing people see on your category page',
      'Spotlighted on the homepage for new visitors',
      'Included in our best-of guides that locals share',
    ],
    cta: 'Pay $49 / month',
    href: STRIPE_CORRIDOR_LEADER,
    paid: true,
  },
  {
    name: 'Town Spotlight',
    price: '$99',
    period: '/mo',
    description: 'Be the reason visitors plan their trip to the corridor',
    features: [
      'Everything in Corridor Leader, plus:',
      'Sponsored placement in guide pages and blog posts',
      'Featured in our newsletter to corridor trip-planners',
      'Cross-linked from related town and category pages',
    ],
    cta: 'Pay $99 / month',
    href: STRIPE_TOWN_SPOTLIGHT,
    paid: true,
  },
  {
    name: 'Sponsored Guide',
    price: '$149',
    period: '/mo',
    description: 'The full partnership. Maximum visibility across the platform.',
    features: [
      'Everything in Town Spotlight, plus:',
      'Dedicated blog post written about your business',
      'Monthly social media promotion on Facebook and Instagram',
      'Homepage banner placement',
      'Priority position on relevant guide pages',
      'Sponsored Guide badge on your listing',
      'Quarterly analytics report: views, clicks, and trends',
    ],
    cta: 'Pay $149 / month',
    href: STRIPE_SPONSORED_GUIDE,
    paid: true,
    popular: true,
  },
];
