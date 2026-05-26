# CMD — Website Design Brief

> The spec for building the CMD site. Reads top-to-bottom as a scene-by-scene treatment, then drops into the technical detail. Read alongside `cmd-brand.md` — that's the constitution, this is the build manual.

---

## 1. The site's job

One job, two audiences.

**Job:** convince someone within 30 seconds that CMD builds at a level they haven't seen for businesses their size, then make it stupid-easy to get in touch.

**Audience A (primary):** a London tradesperson the size of Plastering Stagg. Lands on the site after seeing a TikTok / WhatsApp link / business card. Decides in under a minute whether to message us on WhatsApp.

**Audience B (secondary):** a designer/developer who found us through the rebuild content. Stays longer, reads everything, judges us on craft. If they're impressed, they tell other people.

The site has to land *for both* without compromising. The cosmos narrative pulls audience B in; the WhatsApp button at the top of the viewport closes audience A.

---

## 2. Core mechanic — the journey

The entire site is a **single continuous scroll** that reads as a flight: depart Earth → cross deep space → encounter the work as planets → approach the planet you want to land on → return to the launch pad to start your own trip.

The star field is one persistent WebGL canvas behind everything. It doesn't reload between sections. Its intensity, density, and motion change as you scroll. **The starfield is the consistency. The content moves; the universe doesn't.**

This is the one thing about the site that anyone who visits has to remember. Everything else serves this.

---

## 3. Sitemap

```
/                       Home (the journey)
/work                   All case studies (grid view)
/work/[slug]            Individual case study (planet)
/services               What we build, pricing
/approach               How we work, FAQ
/contact                Standalone contact page (also embedded in home)
```

Five top-level routes. Nav surfaces these as a slim top bar that's mostly hidden during the journey and pinned during the deeper pages.

---

## 4. Scene-by-scene treatment of the home page

The home page is the journey. Eight scenes. Each one drives a different starfield state and a different layout. Scroll progresses scene by scene; intra-scene animations are scroll-scrubbed.

### Scene 1 — Departure (the hero)

**Star state:** Default density. Calm twinkling. Slight drift downward as ambient motion.

**Layout:**
- Pure black. Star field full-bleed.
- Top-left, small: `▮ CMD` (the wordmark).
- Top-right, small: a mono link cluster — `WORK / SERVICES / APPROACH / CONTACT`.
- Centre, oversized Fraunces display:
  > Most websites are
  > **dead rocks.**
  > We build worlds.
- Below the headline, on a single mono line: `> CMD — CAMM DESIGN / EST. 2026 / LONDON`
- Bottom-centre: a scroll prompt — small chevron animating down 4px and back, with the word "BEGIN" in mono above it.

**Hover/interaction:**
- Cursor approaches stars: stars within 200px boost opacity 10–15%.
- Cursor hovers on "BEGIN": chevron speeds up subtly, signaling "yes, do it."
- Logo and nav links: hairline underline draws in on hover (200ms ease-out).

**Mobile:** Hero text scales down (`clamp()`), nav collapses into a mono "MENU" button top-right that reveals a full-screen panel of the same five links.

### Scene 2 — Crossing (the thesis)

**Star state:** Density increases ~30%. Stars begin streaking subtly — adding a vertical motion blur on bright stars to suggest forward motion. A faint warp begins.

**Layout:**
- Centre column, narrow (max-width 640px).
- Mono section label, top: `> 001 / WHY`
- A short manifesto, three sentences max, in Fraunces at `--type-display-m`, lots of breathing room:
  > Most small business websites haven't been touched in a decade.
  > We're a two-person studio in London that builds the kind of sites brands ten times the size pay agencies for.
  > Your site should be a place. Not a page.

**Scroll behaviour:** Each sentence fades in (opacity + 12px Y translation) on its own scroll trigger. Staggered.

### Scene 3 — Encountering (the work)

**Star state:** Streaks fade back to calm twinkling. We've arrived.

**Layout:**
- Mono section label: `> 002 / RECENT TRANSMISSIONS`
- A horizontal scroll-snap row of "planets" — circular black cards (96px → 480px on hover) sitting against the star field, each with a hairline white border. Two to four planets visible. Initial state is small.
- As the user scrolls vertically, the row scrolls horizontally (pinned scroll, classic GSAP ScrollTrigger pinning).
- Each card has:
  - A small mono label: `> SYSTEM: STAGG / PLASTERING / WANDSWORTH`
  - The client name in Fraunces.
  - A subtle motion: very slow rotation (one full revolution over ~60 seconds) so each planet feels alive.
- Hover on a planet: it grows from 96px to 480px diameter. Surrounding stars dim 40%. A "ENTER →" affordance appears below the planet name in mono. The other planets retreat (scale 0.85) and dim.
- Click: warp transition (see §6) and route to `/work/[slug]`.

**For v1, you only need 2 planets:** the CMD self-portrait (the site itself counts as work) and one concept rebuild. As you ship real client work, planets accumulate.

### Scene 4 — Re-entry (process)

**Star state:** Stars calm, density slightly down. We're slowing.

**Layout:**
- Mono section label: `> 003 / FLIGHT PLAN`
- Three horizontal panels side-by-side on desktop, stacked vertically on mobile. Each panel:
  - A mono "T-minus" marker: `T-14 DAYS`, `T-0`, `T+30 DAYS`
  - A Fraunces title: **Brief**, **Liftoff**, **Orbit**
  - A short paragraph in Geist Sans, Plain register:
    - *Brief:* "We meet, look at what you've got, agree what success looks like, and quote it in writing. No vague hourly nonsense."
    - *Liftoff:* "We design and build. You see progress weekly. Two rounds of revisions are baked in."
    - *Orbit:* "We host, maintain, and keep the site current. Your phone keeps ringing."

**Scroll behaviour:** Panels slide in from the right as the user scrolls past, staggered 100ms apart.

### Scene 5 — The manifest (services and pricing)

**Star state:** Calmest section. Star density drops 50%. This is the practical section; the cosmos backs off.

**Layout:**
- Mono section label: `> 004 / THE MANIFEST`
- A table or stacked card layout of tiers. Each tier is a row:
  - Tier name (Fraunces, medium)
  - One-line description (Geist Sans)
  - Inclusions (small mono list)
  - Price (Fraunces, right-aligned)
- Tiers (matching `project.md` §5 starting-out pricing, Tier A column for v1 of the site):
  - **Landing page** — One page that does the job. *From £500.*
  - **Brochure site** — 5–10 pages, contact, gallery. *From £1,200.*
  - **Brochure + bookings** — As above, plus a way for customers to book in. *From £1,500.*
  - **Online shop** — Up to 50 products, secure checkout. *From £2,500.*
  - **Custom build** — Anything bigger. Portals, calculators, integrations. *Contact for quote.*
- Below the table, in mono: `> All sites include hosting, SSL, daily backups, and updates. See approach for details.`

**Scroll behaviour:** Rows reveal sequentially as the section scrolls past.

### Scene 6 — Crew (the studio, no names)

**Star state:** Still calm.

**Layout:**
- Mono section label: `> 005 / CREW`
- Centred, narrow column.
- A short Fraunces paragraph in Cosmic register:
  > Two of us. Based in London. One writes the code, one talks to people.
  > That's it. No pipelines, no project managers, no offshore "team".
- No names. No photos. No "About the founders" section. The studio is the work, not the personalities.

### Scene 7 — Launch sequence (CTA)

**Star state:** Stars surge back. Density up 50% above baseline. Twinkle period shortens (more activity). The brightest section of the journey. A shooting star is guaranteed to appear within 4 seconds of entering this section.

**Layout:**
- Centred, oversized Fraunces:
  > Start the launch sequence.
- Below, two large monolithic black buttons (white hairline border, 64px tall) side by side:
  - **`> WHATSAPP`** — opens `https://wa.me/44...` in a new tab
  - **`> EMAIL`** — mailto:hello@camm.design (or final domain)
- Below the buttons, in mono, very small:
  - `> hello@camm.design`
  - `> WhatsApp: +44 ...`
  - `> London, UK`

**Hover:** Buttons invert (black background → white background, white text → black text) over 200ms.

### Scene 8 — Orbit (footer)

**Star state:** Stars persist at lower density. We never fully leave the universe.

**Layout:**
- A thin top border in `--ink-60`.
- Three columns on desktop, stacked on mobile:
  - **CMD** (the mark, plus the tagline "From command line to liftoff" in Fraunces Italic)
  - **Pages** (Work, Services, Approach, Contact)
  - **Elsewhere** (TikTok, Instagram, GitHub, LinkedIn)
- Bottom row, very small Geist Sans:
  - Left: `© 2026 CMD — Camm Design`
  - Right: `*Designed by Camm*` (the signature, Fraunces Italic, weight 300, 12px, white at 40% opacity)
- Below those, mono: `> Privacy / Terms`

---

## 5. The star field — full spec

Single most important visual asset on the site. Worth disproportionate engineering time.

### Visual behaviour

| Property | Desktop default | Mobile default | Notes |
|---|---|---|---|
| Particle count | 1,200 | 600 | Lower on mobile for perf. |
| Size range | 0.5–2.5px | 0.5–2px | Mostly small. |
| Colour | `#FFFFFF` only | `#FFFFFF` only | Never tinted. |
| Opacity range | 0.25–1.0 | 0.25–1.0 | Most stars sit between 0.4 and 0.7. |
| Twinkle period | 2–6s per star, randomised | 3–8s | Each star has its own phase. |
| Lifespan | 8–20s per star | 8–20s | Then fade out (2–3s), respawn elsewhere. |
| Bright "near stars" | 6–10 | 3–5 | 4–6px, soft additive bloom halo. |
| Shooting stars | 1 every 30–60s, random | 1 every 45–90s | 1.5–2s travel, fades to black, no loop. |
| Parallax on cursor | ±0 to ±30px based on z | None on mobile | Calmer. |
| Cursor "wake" radius | 200px | n/a | Boost opacity 10–15% on nearby stars. |
| Scroll drift | Slow vertical downward at ~10% of scroll speed | Same | Sells the sense of motion. |

### Scene-driven modifiers

The base star field is modified per scene via uniforms passed to the shader:

| Scene | Density mult. | Speed mult. | Twinkle freq. | Streak factor |
|---|---|---|---|---|
| 1 — Departure | 1.0 | 1.0 | 1.0 | 0 |
| 2 — Crossing | 1.3 | 2.5 | 1.5 | 0.4 (mild streaks) |
| 3 — Encountering | 1.0 | 1.0 | 1.0 | 0 |
| 4 — Re-entry | 0.7 | 0.8 | 0.8 | 0 |
| 5 — Manifest | 0.5 | 0.6 | 0.6 | 0 |
| 6 — Crew | 0.5 | 0.6 | 0.6 | 0 |
| 7 — Launch | 1.5 | 1.2 | 1.7 | 0 |
| 8 — Orbit (footer) | 0.7 | 0.6 | 0.7 | 0 |

Smoothly interpolate between adjacent scenes' values based on scroll position — never snap.

### Technical

- **One full-screen Three.js canvas** as a `position: fixed` element at `z-index: -1`. `pointer-events: none`. Sits behind all content. Content uses transparent backgrounds where it overlays the canvas.
- **`THREE.Points`** with a custom vertex+fragment shader. Don't use 1,200 DOM elements. Don't use 1,200 sprite meshes either.
- Each particle's per-vertex attributes: `position` (vec3), `baseSize`, `baseOpacity`, `twinklePhase`, `twinklePeriod`, `spawnTime`, `lifespan`.
- Shader uniforms: `uTime`, `uDensity`, `uSpeed`, `uTwinkleFreq`, `uStreakFactor`, `uMouse` (vec2 normalised).
- Twinkle in fragment shader: `opacity = baseOpacity * (0.5 + 0.5 * sin((uTime + twinklePhase) * (2π / twinklePeriod) * uTwinkleFreq))`.
- Streak: at high `uStreakFactor`, stretch points vertically in the vertex shader.
- Bloom on near-stars only via `@react-three/postprocessing` `Bloom` with a strict luminance threshold; otherwise costs frames for nothing.
- Use `@react-three/drei`'s `AdaptiveDpr` and `PerformanceMonitor` to drop DPR if FPS dips below 50.
- Respawn logic runs on GPU: when `uTime > spawnTime + lifespan`, the shader treats the particle as faded; CPU lazily reassigns spawnTime and a new position once per ~500ms in a batch.

### Reduced motion

If `prefers-reduced-motion: reduce` is set:
- Static star field. No twinkle. No scroll drift. No shooting stars.
- All scene transitions become opacity crossfades, not transforms.
- Warp transition (see §6) becomes a 200ms crossfade.

This is not optional. It is a hard requirement.

---

## 6. The warp transition

When a user clicks a planet on the home page to enter a case study, the transition is the brand moment that has to feel unreasonably good.

**Sequence (total duration ~1.4s):**

1. **0.0s — 0.15s:** The clicked planet card scales up fast (`scale(1) → scale(8)`), bleeding outside its bounding box. Card border fades.
2. **0.0s — 0.6s:** The star field's streak factor ramps from 0 to 1.5 (over-the-top streaks). Speed multiplier ramps to 8. Stars appear to fly at the camera.
3. **0.4s — 0.8s:** A thin white horizontal line draws across the centre of the screen — a "warp line." Holds briefly. (This is the moment the route swap happens behind the scenes.)
4. **0.8s — 1.0s:** Warp line widens vertically into a full white flash, peaks at 30% opacity (not pure white — never overwhelm).
5. **1.0s — 1.4s:** Flash fades. New scene (the case study) revealed underneath. Star field calms back to baseline. Case study hero animates in (Fraunces headline, mono dateline).

**Reduced motion fallback:** 200ms opacity crossfade between scenes. No streaks, no flash.

---

## 7. Case study page (the "planet" landed on)

When the warp resolves, the user is on `/work/[slug]`. Same star field continues underneath. The layout is more documentary, less cinematic — but still cosmic.

**Structure:**

1. **Dateline (mono):** `> SYSTEM: STAGG / PLASTERING / WANDSWORTH / 2026`
2. **Title (Fraunces display-l):** The client's name.
3. **One-line problem statement (Fraunces display-m):** *"A 15-year-old WordPress site that wasn't generating a single call."*
4. **Hero shot:** A full-bleed before/after screenshot, or the new site embedded in a Mac-style mockup. Photography in keeping with §10 of brand.
5. **The brief, the build, the result.** Three short sections, each labelled in mono (`> THE BRIEF`, `> THE BUILD`, `> THE RESULT`). Plain register.
6. **Tech list (mono):** `> NEXT.JS · TAILWIND · VERCEL · STRIPE` etc.
7. **Quote (if available):** A short testimonial in Fraunces Italic, attribution in mono.
8. **Visit-the-site CTA:** Big monolithic button "VISIT LIVE SITE →"
9. **Next/prev planet:** At the bottom, a compact pair of links to adjacent planets in the work list.
10. **Footer:** Same as home (Scene 8).

**Animations here are restrained.** Subtle reveal-on-scroll. Image hover states (a Ken Burns-style 1.03 scale over 8 seconds on hover). No warp on internal links. The cinema is for the home page; the case study is where the substance lives.

---

## 8. Animation language — what we learned from landonorris.com

Observations from the reference, distilled into rules we follow.

### What landonorris.com does well

1. **Slow, deliberate pacing.** Nothing snaps. Every transition has weight and breath. Section reveals are scroll-scrubbed, not auto-played. The whole site moves like 24fps cinema, not 60fps motion graphics. **Adopt this.**
2. **One signature accent repeated like a watermark.** Lando's lime-green signature SVG appears multiple times across the site as a recurring identity mark. **Our equivalent is "Designed by Camm" italic and the mono `>` chevron — repeat them with discipline.**
3. **Hover states on every interactive surface.** Every helmet card has a base image and a hover image. Every nav item has a defined hover. **Adopt: nothing interactive ships without a defined hover and focus state.**
4. **Custom scroll-locked moments.** "Tap to lock", "back to scroll" — they break the standard scroll for a cinematic interaction, then release. **Adopt: scene 3 (the planet horizontal scroll) does this.**
5. **Magazine-style image captions.** Photos are captioned with location and year ("Qatar, 2024"). It elevates ordinary images. **Adopt: our case study photos get mono datelines (`> WANDSWORTH / 2026`).**
6. **Cinematic header pairs.** Section heads break across lines for weight ("ON / TRACK", "OFF / TRACK"). **Adopt: our display heads break across lines deliberately ("Most websites are / dead rocks.").**
7. **Vector animations, not video.** They use Rive runtime for the more complex moves. Massively more performant than video, infinitely sharper than GIF. **Adopt: Rive for any future complex animation (e.g. the warp line draw).**
8. **They care enough to handle orientation.** "Please rotate your device" enforces landscape for one cinematic section. We probably won't go that far, but we will handle reduced motion and mobile properly.

### What we deliberately do not borrow

1. **Lando's site is celebrity-driven — every photo is *him*.** Ours is craft-driven. Our equivalent of his face is the work itself.
2. **Lime accent.** We have no accent. Discipline is the brand.
3. **Three-dimensional helmet hero.** Cool, but we don't have a single hero object. The starfield is our hero.
4. **Webflow.** Their site is built on Webflow. Ours is custom Next.js — both because we can, and because building it ourselves *is* the proof.

### Universal animation rules for CMD

- Every transition has a defined easing curve. Default: `cubic-bezier(0.22, 1, 0.36, 1)` (a strong ease-out that feels expensive).
- Default transition duration: 400ms. Hovers: 200ms. Scroll-scrubbed: as long as the scroll distance.
- No bounce easings anywhere. No spring-back. No `wobble` (the brand is too austere).
- Scroll-driven reveals always go from `opacity: 0; transform: translateY(16px)` to `opacity: 1; transform: translateY(0)`. Never from the side. Never with rotation. Never with scale.
- Buttons invert on hover. They don't change colour to another colour — they swap black ↔ white.
- Images on hover: 1.03 scale over 600ms ease-out. Optional Ken Burns drift on long hovers.
- No parallax on body text. Ever. Parallax stays on the star field and on hero images.

---

## 9. Technical stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15** (App Router) | Production-grade, fast, what Ethan already uses. RSC for content pages, client components for the WebGL. |
| Language | **TypeScript** strict | Catches things before they hit the screen. |
| Styling | **Tailwind CSS 4** + CSS variables for the design tokens | Tokens defined in `globals.css` per brand spec, Tailwind for layout. |
| 3D / WebGL | **React Three Fiber** + **@react-three/drei** + **@react-three/postprocessing** | The standard for declarative Three.js. Bloom for star halos. |
| Smooth scroll | **Lenis** | 2026 industry standard. Replaces Locomotive. Plays nicely with GSAP ScrollTrigger. |
| Scroll-bound animation | **GSAP** + **ScrollTrigger** | Better than Framer Motion for scrubbed/pinned scroll. Required for the planet horizontal scroll and the scene modulation of the star field. |
| Component animation | **Framer Motion** | Hover states, page transitions, micro-interactions. |
| Forms (contact) | **react-hook-form** + **zod** | Lightweight, typed. POST to a Next.js API route that forwards to HubSpot via webhook. |
| Hosting | **Vercel** | Free tier covers us. Edge functions for the contact form. |
| Analytics | **Plausible** (~£5/mo) | Privacy-friendly, no cookie banner needed for it specifically. |
| Fonts | **Fraunces** (Google Fonts), **Geist Sans** and **Geist Mono** (self-hosted via `next/font`) | All free. Self-hosted = no CLS, no third-party request. |
| Type-checking / linting | TypeScript strict, ESLint, Prettier | Baseline. |

**Repository structure (proposed):**

```
/app
  /(home)
    page.tsx                 // the journey
    components/
      Scene1Departure.tsx
      Scene2Crossing.tsx
      ...
  /work
    page.tsx                 // grid
    [slug]/page.tsx          // case study
  /services/page.tsx
  /approach/page.tsx
  /contact/page.tsx
  layout.tsx                 // includes <Starfield /> + <SmoothScroll />
  globals.css                // design tokens
/components
  /starfield
    Starfield.tsx
    starfield.vert.glsl
    starfield.frag.glsl
    useSceneModulation.ts    // hook that maps scroll → uniforms
  /ui
    Button.tsx
    MonoLabel.tsx
    SectionHeading.tsx
    SignatureMark.tsx        // "Designed by Camm"
/lib
  /content
    work.ts                  // case study data (typed)
  /hubspot.ts                // contact form forwarding
/public
  /images                    // .webp/.avif only
```

---

## 10. Performance budgets (non-negotiable)

| Metric | Budget | Tool |
|---|---|---|
| LCP (mobile, slow 4G) | < 1.8s | Lighthouse, PageSpeed Insights |
| INP | < 200ms | Web Vitals |
| CLS | 0 | Web Vitals |
| FPS on star field (mid-range mobile) | ≥ 50 sustained | Manual + `PerformanceMonitor` |
| Initial JS bundle (gzipped) | < 250KB | Next bundle analyzer |
| Total page weight (home) | < 1.2MB | Lighthouse |
| Font CLS | 0 | `next/font` with `display: 'swap'` and metric overrides |

If a feature breaks a budget, the feature loses. Not the budget.

---

## 11. Accessibility — hard requirements

- WCAG AA minimum, AAA where free.
- `prefers-reduced-motion: reduce` honoured everywhere (star field, transitions, warp).
- All interactive elements have a visible focus state: 2px white outline, 4px offset.
- Keyboard navigation through every interactive element.
- Skip-to-content link as the first focusable element.
- `aria-hidden="true"` on the star field canvas (decorative).
- All images have meaningful `alt` text. Pure decoration gets `alt=""`.
- Semantic HTML: `header`, `nav`, `main`, `section`, `article`, `footer`. No `div` soup.
- All text meets contrast: white on black is AAA effortlessly; mono text at `--ink-40` against `--ink-100` must be checked (it should pass AA).
- Form fields have labels (visible, not just `aria-label`).
- Errors are described in text, never colour alone.

---

## 12. SEO baseline

- One `h1` per page.
- Open Graph and Twitter card metadata on every route.
- A custom OG image per case study (1200×630, black background, Fraunces headline, signature mark).
- `sitemap.xml` and `robots.txt` generated by Next.js.
- Schema.org JSON-LD: `Organization` on the root layout; `CreativeWork` on case studies.
- Page titles in the format: `[Page] — CMD` (e.g. `Work — CMD`).
- Meta descriptions written manually per page, never auto-generated.

---

## 13. What NOT to do

A checklist of things that will tempt us during the build and that we should refuse.

- No carousel of testimonials. Quotes go inline in case studies.
- No "trusted by" logo strip on the home page. (We don't have one yet, and they're a cliché.)
- No cookie banner if we can avoid it. Plausible doesn't need one. If the contact form requires it, use the most minimal possible banner.
- No live chat widget. The WhatsApp CTA *is* the chat.
- No floating "back to top" button. Smooth scroll handles it.
- No newsletter signup. We don't have a newsletter.
- No countdown timers. No fake urgency. No "X people are viewing this page."
- No exit-intent popups. Ever.
- No "loading…" spinners visible after the first paint. If the star field needs to warm up, it does so silently behind the hero text.
- No carousel/slider for case studies. Horizontal scroll is acceptable; auto-rotating sliders are not.
- No light-mode toggle. The brand has one mode. (The case study screenshots themselves may be light or dark — that's the client's site, not ours.)
- No animated gradients. No mesh gradients. No purple-blue gradient anywhere on the site.
- No emojis in copy.
- No "Made with ❤ in London" footer. We are too austere for hearts. The signature mark does the work.

---

## 14. Build order (suggested)

When Ethan starts building, this is the order that lowers risk fastest:

1. **Repo + design tokens + fonts** (1 evening). Get the typography and colour system in. Render a blank page that uses them.
2. **Star field, isolated** (2–3 evenings). Build the WebGL canvas as a standalone component that takes uniforms. Tune by hand until it looks right at default settings. Don't tie it to scroll yet.
3. **Layout shell** (1 evening). Header, nav, footer, smooth scroll wiring. Star field plugged in behind.
4. **Scene 1 (hero)** (1 evening). Get the very first viewport feeling right. This is what every visitor sees first; it has to be exceptional before anything else exists.
5. **Scenes 2, 4, 5, 6, 8** (2–3 evenings). The text-driven scenes. Lighter lift.
6. **Scene 7 (Launch CTA)** (1 evening). Including the WhatsApp + email button behaviour.
7. **Scene 3 (planet horizontal scroll)** (3–4 evenings). The hard one. GSAP ScrollTrigger pinning, hover scaling, planet rotation. Build with placeholder data.
8. **Star field scene modulation** (2 evenings). Tie the uniforms to scroll position so density/speed change per scene.
9. **The warp transition** (2 evenings). The most expensive single feature. Worth the time.
10. **Case study template + at least one real case study** (3–5 evenings).
11. **Services, Approach, Contact pages** (2 evenings).
12. **Reduced motion, accessibility audit, Lighthouse pass** (2 evenings).
13. **Deploy to a password-gated Vercel preview** for review.
14. **Ship** (when ready).

Total: ~25–35 build evenings. Spread over 6–10 weeks alongside dayjobs.

---

## 15. Open decisions (for Ethan + Megan)

Things this brief deliberately leaves open. Decide before scene 1 is built.

- [ ] Final domain. Until then, use `camm.design` as placeholder.
- [ ] Whether the planets in scene 3 are textured spheres (slower to build, more impressive) or styled circular cards (faster, still good). Recommend cards for v1, spheres for v2.
- [ ] Whether the warp transition lives at v1 launch or ships in a v1.1 update.
- [ ] Whether to publish the GitHub link to the CMD site repo in the footer. Strong signal of craft for audience B; meaningless for audience A. Default: yes.
- [ ] Whether to include the GitHub link for the TikTok concept rebuilds on the home page or only on `/work`. Default: in a `/concepts` subdirectory linked from `/work`, kept clearly separate from real client work.

---

*The site is the brief's exam. If the site is excellent, this document worked. If it isn't, we missed something — come back here and find it.*
