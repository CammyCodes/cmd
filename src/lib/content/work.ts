export interface WorkItem {
  meta: string;
  name: string;
  what: string;
  result: string;
  href: string;
  external: boolean;
  // mock-browser preview content
  mockTitle: string;
  mockCta: string;
}

export const WORK: WorkItem[] = [
  {
    meta: 'CammBot · AI assistant · 2026',
    name: 'CammBot',
    what: 'A custom AI helper for tradespeople and small businesses. It writes quotes, drafts emails and handles invoices — so the owner gets an evening back every week.',
    result: 'Quotes in 3 minutes, not an hour',
    href: 'https://cammycodes.github.io/Camm/',
    external: true,
    mockTitle: 'AI that does the boring stuff.',
    mockCta: 'Start free chat →',
  },
  {
    meta: 'House of Recovery · Wellness · Worksop',
    name: 'House of Recovery',
    what: 'A premium recovery studio that needed to feel clinical, not spa-like. Long-form editorial design, clean booking flow, prices visible up front.',
    result: 'Bookings up · bounce rate halved',
    href: 'https://cammycodes.github.io/HouseOfRecovery/',
    external: true,
    mockTitle: 'Restoring Vitality.',
    mockCta: 'Book a session →',
  },
  {
    meta: 'cmd · Studio site · London',
    name: 'cmd itself.',
    what: "The site you're on. Built as our calling card — every animation, transition and detail is the same care we put into client work.",
    result: 'Sub-1s load · works on any phone',
    href: '#top',
    external: false,
    mockTitle: 'This very website.',
    mockCta: "You're looking at it →",
  },
];
