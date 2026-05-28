import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const url = 'http://localhost:5173/';
const args = process.argv.slice(2);
const mobile = args.includes('--mobile');
const fracs = args.filter((a) => !a.startsWith('--')).map(Number);
const positions = fracs.length ? fracs : [0, 0.1, 0.18, 0.26, 0.34, 0.46, 0.55, 0.66, 0.74, 0.82];

mkdirSync('shots', { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: 'no-preference',
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(1800); // fonts + canvas warmup

const journey = args.includes('--journey');
const range = await page.evaluate(() => {
  const el = document.querySelector('.act-track');
  if (!el) return null;
  const top = window.scrollY + el.getBoundingClientRect().top;
  return { top, len: el.offsetHeight - window.innerHeight };
});
const maxScroll = await page.evaluate(
  () => document.documentElement.scrollHeight - window.innerHeight,
);

const tag = (mobile ? 'm' : 'd') + (journey ? 'j' : '');
let i = 0;
for (const f of positions) {
  const y = journey && range ? Math.round(range.top + range.len * f) : Math.round(maxScroll * f);
  await page.evaluate((y) => {
    const w = window;
    if (w.__lenis) w.__lenis.scrollTo(y, { immediate: true });
    else window.scrollTo(0, y);
  }, y);
  await page.waitForTimeout(600);
  const name = `shots/${tag}-${String(i).padStart(2, '0')}-f${f}.png`;
  await page.screenshot({ path: name });
  console.log(name, '@y=', y);
  i++;
}
await browser.close();
console.log('done');
