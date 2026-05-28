# CMD — Cinematic R3F rebuild · progress & handoff

_Last updated: 2026-05-29. Branch: `rebuild/r3f` (repo `CammyCodes/cmd`)._
_The live site on `main` (static `index.html`) is untouched and still serving camm.design._

---

## 1. What this is

A ground-up cinematic rebuild of camm.design in a real framework, replacing the old
self-contained static `index.html`. Approved plan lives at
`C:\Users\cammy\.claude\plans\abstract-snacking-blum.md`. Brand docs: `uploads/cmd-brand.md`,
`uploads/cmd-website-design.md`. Earlier audit: `atelier-audit.md`.

**Locked decisions (from the client):**
- Stack: **Vite + React + TS + Tailwind + GSAP/ScrollTrigger + Lenis + React Three Fiber + drei**.
- Deploy: **GitHub Actions → GitHub Pages**, keep `camm.design` / DNS (CNAME in `public/`).
- Rocket: **full 3D** (R3F). Imagery: **mostly procedural/3D**, minimal generated images.
- Build on a **branch, parity-first then cinematics**; flip to `main` only when ready.
- **Keep:** draggable planet, lowercase `cmd` wordmark, the OLD simple starfield, pricing/work/
  launch/footer, colour-blind (tritanopia) toggle.
- **Removed:** numbered `001 / Why bother` eyebrow pills, the 3-box "why", the journey rail.
- **Hybrid violet** accent stays (not pure mono). **White "stays"** as the background through a
  phone beat, then changes for the next beat.

---

## 2. How to run / verify

```bash
npm install
npm run dev        # http://localhost:5173/  (dev server; HMR)
npm run build      # tsc --noEmit && vite build  → dist/  (must stay green)
npm run preview    # serve the production build

# Screenshot harness (THE key tool — we were working blind before this):
node scripts/shoot.mjs                          # desktop, doc-fraction sampling
node scripts/shoot.mjs --journey 0 0.12 0.33 0.55 0.78   # sample by Act I progress (0..1)
node scripts/shoot.mjs --mobile --journey 0.33 0.78      # mobile viewport
# PNGs land in shots/ (gitignored). Read them to actually see the result.
```

Dev server exposes `window.__lenis` for the shoot script to jump to exact scroll positions.

---

## 3. Architecture

Three stacked layers, ONE shared scroll (Lenis):
- **z:0** `Starfield2D` (2D canvas, the OLD simple field) — `src/components/layout/Starfield2D.tsx`
- **z:1** one fixed R3F `<Canvas flat linear>` — `src/canvas/SceneCanvas.tsx` (Lights + Planet + Rocket)
- **z:10** the DOM document (`<main>`), transparent so the canvases show through

Scroll engine: **Lenis only** (NOT drei ScrollControls). Wired in `src/components/SmoothScroll.tsx`
(`autoRaf:false` + `gsap.ticker` drives `lenis.raf` + `ScrollTrigger.update`; `ScrollTrigger.refresh()`
after `document.fonts.ready`). GSAP registered in `src/lib/scroll/gsap.ts`.

3D objects read scroll via a mutable module (no React re-renders): `src/lib/journey.ts`
(`journey.progress` 0..1 + `RANGES`). The Act I ScrollTrigger writes `journey.progress` in `onUpdate`
and drives the DOM imperatively. `src/lib/store.ts` (zustand) holds `tritanopia`, `reducedMotion`.

### Key files
```
src/App.tsx                      composition: SmoothScroll > Starfield2D + SceneCanvas + main(Nav, Act1, HowPlaceholder, Pricing, Work, Launch, Footer)
src/sections/Act1.tsx            ★ the whole Act I journey (hero→white→phone→rocket→ringing). Beat timing lives here.
src/sections/HeroCopy.tsx        hero text block (shared)
src/sections/Hero.tsx            static hero (reduced-motion fallback, used by Act1)
src/sections/Pricing.tsx Work.tsx Launch.tsx
src/canvas/SceneCanvas.tsx Lights.tsx Planet.tsx PlanetTextures.ts Rocket.tsx
src/components/IPhone.tsx        CSS iPhone mockup (forwardRef; children = screen content)
src/components/Nav.tsx Footer.tsx ColorblindToggle.tsx SmoothScroll.tsx
src/lib/journey.ts store.ts media.ts math.ts planetControls.ts content/{pricing,work}.ts
src/index.css                    tokens, fonts, reduced-motion catch-all
src/styles.css                   component + Act I styles
scripts/shoot.mjs                Playwright screenshot harness
.github/workflows/deploy.yml     Pages deploy (main-only)
```

---

## 4. Act I journey timeline (for tuning)

One sticky `.act-track` (720vh desktop / 620vh mobile) → `.act-stage` (sticky 100svh). A single
ScrollTrigger maps scroll → `journey.progress` (0..1) and drives everything. **All beats verified via
screenshots.** Current ranges (in `Act1.tsx` onUpdate + `Planet.tsx`/`Rocket.tsx`):

| progress | beat |
|---|---|
| 0.00–0.05 | hero hold (planet + text, draggable) |
| 0.05–0.20 | hero text fades, planet dissolves/flies, **white bubble grows from bottom** |
| 0.16–0.31 | desktop site appears then **folds/shrinks into the iPhone** |
| 0.22–0.46 | **Beat A** iPhone (mini cmd site) + gentle tilt; caption "Built for phones first" |
| 0.42–0.50 | white **drains** (bubble recedes) revealing the rocket |
| 0.42–0.70 | **Beat B** 3D rocket lifts off; **smoke fills the screen**; caption "Loads in under a second" (rise = smoothstep 0.46–0.66) |
| 0.64–0.70 | white **flashes back** in |
| 0.70–0.92 | **Beat C** iPhone **rings/shakes** "Your next customer"; caption "The phone actually rings" |
| 0.86–1.00 | white drains out → dark → page continues (Pricing) |

White amount `w(p)` = clamp(grow1 − drain1 + grow2 − drain2) with the edges above; clip-path
`circle(w*165% at 50% 100%)`. Soft white is `#f4f2f8`.

---

## 5. Status

- **Phase 0 Scaffold** ✅ committed `5868ffd`
- **Phase 1 Parity** ✅ committed `708ef92`
- **Phase 2 Hero→white→phone** ✅ committed `976bd9b`
- **Phase 3 WHY 3-beat** ✅ committed `dd2cfc9`
- **Fixes (sticky/drag/iPhone/rocket/white, verified)** ✅ committed `699780f`  ← latest

**Looks good now (screenshot-verified):** planet (bright, etched `cmd`), white bubble-from-bottom,
Beat A fold + iPhone, rocket + screen-filling smoke, Beat C ringing iPhone (strong), pricing/work/
launch/footer parity, colour-blind toggle.

---

## 6. Open items / next steps

**Awaiting client confirmation:**
- Live **mouse-drag on the planet** (z-index fix applied; can't verify drag via screenshot).
- Overall **pacing** (journey is ~7 screens; easy to shorten `.act-track` height + compress ranges).

**Not yet built:**
- **Phase 4 — Process/Orbit section.** Currently a text placeholder (`HowPlaceholder` in `App.tsx`,
  id `#how`). Plan: satellite orbiting the planet → SSL shield ring + daily-backup pulses + uptime
  glow; Brief→Build→Orbit "show don't tell".
- **Phase 5 — Harden & flip.** Code-split the canvas behind `Suspense` (bundle is ~325KB gzip vs
  250KB budget — three.js/R3F loaded eagerly). AdaptiveDpr/PerformanceMonitor, reduced-motion audit
  per beat, mobile FPS, font metric-override fallbacks for CLS 0, a11y/keyboard pass. Then merge
  `rebuild/r3f` → `main` and switch Settings→Pages source to **GitHub Actions**.

**Polish backlog (nice-to-have):**
- Rocket smoke currently reads "glow/additive" — could be made wispier/more volumetric if wanted.
- Mobile pass on the cinematics (simplify heavy beats; verify with `--mobile`).
- Remove dead CSS (`.scr-bar`), tidy legacy static files at repo root before flip.

---

## 7. Gotchas (don't re-learn these the hard way)

- **`overflow-x: hidden` breaks `position: sticky`.** Use `overflow-x: clip`. This was the cause of
  the big "janky / no iPhone" regression.
- R3F defaults to **ACES tone-mapping + sRGB**, which washed the planet into flat lilac and hid the
  etched `cmd`. The `<Canvas flat linear>` props match the original renderer (no tone-map, linear).
- **Lights live at scene root** (`Lights.tsx`), NOT inside the planet group — hiding the planet would
  otherwise kill the rocket's lighting.
- 3D objects must read `journey.progress` via the **mutable module** and lerp in `useFrame` — never
  put per-frame scroll values in React state.
- Planet textures are generated **after `document.fonts.ready`** so the etched `cmd` uses Fraunces.
- A flat DOM phone can't do a 360° Y-spin (goes edge-on + mirrored) — use a gentle tilt.
- Fonts self-hosted via `@fontsource-variable/*`; family names are `"Fraunces Variable"`,
  `"Geist Variable"`, `"Geist Mono Variable"`.
- Line-ending warnings (LF→CRLF) on commit are harmless (Windows).
