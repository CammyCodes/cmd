// Pricing data lifted from the live site's inline JS (typed).
export interface Tier {
  name: string;
  price: string; // e.g. "£800+" or "" when only cadence shown
  priceLabel?: string; // "From" / "Quote"
  cadence: string; // "2 weeks"
  pickLabel: string;
  recommended?: boolean;
}

export const TIERS: Tier[] = [
  { name: 'Landing', price: '£800+', priceLabel: 'From', cadence: '2 weeks', pickLabel: 'Pick Landing' },
  { name: 'Brochure', price: '', cadence: '2–3 weeks', pickLabel: 'Pick Brochure', recommended: true },
  { name: 'Bookings', price: '', cadence: '3 weeks', pickLabel: 'Pick Bookings' },
  { name: 'Online shop', price: '', cadence: '4 weeks', pickLabel: 'Pick Shop' },
  { name: 'Custom', price: 'POA', priceLabel: 'Quote', cadence: 'scoped', pickLabel: 'Get a quote' },
];

// Index of the recommended tier among the 5 columns.
export const RECOMMENDED_COL = 1;

// Each row: [feature, ...one value per tier]. true = check, false = dash, string = label.
export type Cell = boolean | string;
export const FEATURES: [string, Cell, Cell, Cell, Cell, Cell][] = [
  ['Pages', '1 page', '5–10 pages', '5–10 + booking', '10+ + shop', 'As needed'],
  ['Mobile-first design', true, true, true, true, true],
  ['Free hosting (year 1)', true, true, true, true, true],
  ['SSL + daily backups', true, true, true, true, true],
  ['Contact form', true, true, true, true, true],
  ['Custom copywriting', false, true, true, true, true],
  ['Photo gallery', false, true, true, true, true],
  ['Search engine setup (SEO)', false, true, true, true, true],
  ['Edit it yourself (CMS)', false, true, true, true, true],
  ['Online bookings + calendar', false, false, true, true, true],
  ['Take payments (Stripe)', false, false, true, true, true],
  ['Up to 50 products', false, false, false, true, true],
  ['Stock + email receipts', false, false, false, true, true],
  ['Custom integrations', false, false, false, false, true],
  ['Free support after launch', 'Free 30 days', 'Free 60 days', 'Free 60 days', 'Free 90 days', 'Tailored'],
];

// Mobile card "includes" lists.
export const MOBILE_CARDS: {
  num: string;
  name: string;
  price?: string;
  priceLabel?: string;
  cadence: string;
  includes: string[];
  pickLabel: string;
  recommended?: boolean;
}[] = [
  {
    num: 'Tier 01',
    name: 'Landing page',
    price: '£800+',
    priceLabel: 'From',
    cadence: '· 2 weeks',
    includes: ['1 page design & build', 'Mobile-first layout', 'Contact form', 'Hosting & SSL (Year 1)', 'Daily backups', 'Free 30 days support'],
    pickLabel: 'Pick Landing',
  },
  {
    num: 'Tier 02',
    name: 'Brochure',
    cadence: '2–3 weeks',
    includes: ['5–10 pages', 'Custom copywriting', 'Search engine setup (SEO)', 'Edit it yourself (CMS)', 'Photo gallery', 'Free 60 days support'],
    pickLabel: 'Pick Brochure',
    recommended: true,
  },
  {
    num: 'Tier 03',
    name: 'Bookings',
    cadence: '3 weeks',
    includes: ['5–10 pages + bookings', 'Online bookings & calendar', 'Take payments (Stripe)', 'Custom copywriting & SEO', 'Edit it yourself (CMS)', 'Free 60 days support'],
    pickLabel: 'Pick Bookings',
  },
  {
    num: 'Tier 04',
    name: 'Online shop',
    cadence: '4 weeks',
    includes: ['10+ pages + shop', 'Up to 50 products', 'Stock & email receipts', 'Take payments (Stripe)', 'Edit it yourself (CMS)', 'Free 90 days support'],
    pickLabel: 'Pick Shop',
  },
  {
    num: 'Tier 05',
    name: 'Custom build',
    price: 'POA',
    priceLabel: 'Quote',
    cadence: '· scoped',
    includes: ['As needed pages', 'Custom integrations', 'Portals & calculators', 'Full scoping & design', 'Tailored ongoing support'],
    pickLabel: 'Get a quote',
  },
];
