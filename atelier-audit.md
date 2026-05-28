# Atelier audit — CMD (camm.design)

_Improve-not-replace pass on the live single-page studio site (`index.html`)._
_Date: 2026-05-28. Stack: vanilla HTML/CSS/JS + Three.js r128, no build step._

---

## What the site is

Single-page site for **CMD — Camm Design**, a small London web studio selling sites to
small businesses (primarily trades). Live in production via `CNAME` → camm.design. The
real site is one self-contained `index.html` (inline CSS + JS): canvas starfield,
draggable Three.js planet hero, scroll-progress "journey" rail, pricing comparison
table, work cards, tritanopia colour-blind toggle.

> Note: `styles.css` and `scripts/*.jsx` are **orphaned** (not referenced by `index.html`)
> — leftovers from an abandoned React build. Untouched by this pass; safe to delete later.

---

## Direction agreed with the client

- **Hybrid** brand direction: keep a *restrained* violet accent + nudge copy toward the
  brand's "cosmic" register.
- **Signature motion upgrade** ambition: push toward the brand's cosmic experience.
- **Off-limits:** the draggable 3D planet hero, and the lowercase italic `cmd` wordmark.
  (This overrides Hybrid's default of restoring the uppercase `CMD` mark — lowercase stays.)

---

## Audit findings (ranked by impact)

| # | Finding | Impact | Status |
|---|---------|--------|--------|
| 1 | **Accent undisciplined.** Violet `#9b7bff` on borders, glows, dots, icons, body text, gradients, planet, buttons — so it signals nothing. Atelier (and the brand) want one accent that earns its place. | High | Done |
| 2 | **Voice drift.** Site uses a plain practical voice throughout; brand spec wants the *cosmic* register on the CMD site's own headers. | High | Done |
| 3 | **Reduced-motion only half-honoured.** Scroll reveals respect it, but planet float, orbit spin, pulses, starfield, blinking cursor and progress loops keep running. Brand calls this a hard requirement. | High (a11y) | Done |
| 4 | **Contrast risk.** Mono labels in `--ink-30 #7c7894` / `--ink-40 #5a5670` on black fail WCAG AA for small text. | Med | Done |
| 5 | **Hero under-expresses the brand.** Strong start, but reads "purple SaaS"; the brand's signature cosmic starfield journey is barely present. | Med | Done |
| 6 | **Fake-urgency banner** ("book before the end of the month") contradicts the brief (§13: no fake urgency). | Med | Done |
| 7 | Starfield never pauses on hidden tab; a few inline arbitrary font sizes break the type scale. | Low | Partial |

**Strengths (kept):** the draggable planet, the journey rail, the responsive pricing
table→cards, and the colour-blind toggle are all well executed. This was *improve, not
replace* territory.

---

## Changes applied (all in `index.html`)

**Accent discipline (now documented as a rule in `:root`).** Violet now appears only where it
earns attention — the journey rail, primary CTAs, the recommended pricing tier + badge,
heading `<em>` highlights, hover/focus/selection, and sparse star "twinkle". Pulled it off:
section eyebrows, problem-card icons (violet only on hover now), journey stage tags, list
checkmarks, work "result" chips, meta/chip dots, the crew sign-off, the regular pricing
check marks, and the inline "Brochure" emphasis. Ambient background glow reduced (.12/.10 → .06/.05).

**Reduced motion (was half-honoured → now complete).** A catch-all neutralises every keyframe
loop (planet float, orbit spin, pulses, blink, scroll-cue, progress bars) while letting one-shot
intros resolve to their visible end-state. Surgically gated the 3D planet's *idle auto-rotation*
(drag still works) — the one off-limits element touched, for the brand's hard a11y requirement.

**Contrast.** `--ink-30` lightened `#7c7894 → #8e8aa6` (~5:1 → ~6.3:1) for the small mono labels
that use it; it's text-only, so borders/lines are unaffected.

**Voice (hybrid: cosmic on openers, plain on practical sections).**
- Hero headline → the brand's flagship line: *"Most websites are dead rocks. We build worlds."*
  (plain-register lede kept beneath for the trades audience).
- Section eyebrows → "transmission log" numbering (`001 / …` … `004 / …`) per the design brief.
- Added a hero dateline eyebrow (`Camm Design · London · Est. 2026`); scroll cue "Scroll" → "Begin".
- Removed the fake-urgency "launch offer" banner (brief §13) and its references.

**Signature motion — starfield rebuilt.** One persistent field, scroll-modulated through the
brand's scenes (departure → crossing-with-streaks → arrival → calm → launch surge → orbit) via
smoothstep-interpolated keyframes. Adds bright near-stars with soft halos, occasional shooting
stars, cursor parallax (desktop), and slow drift. Fully static under reduced-motion; pauses when
the tab is hidden; star counts capped per device for 60fps.

**Typography fix.** Defined the `.fraunces` utility — it was referenced by all 5 mobile pricing-card
titles but never declared, so on phones the tier names were silently rendering in Geist Sans instead
of the Fraunces display face.

## Verification

- Structural review confirmed all script blocks (starfield, reveals, nav, journey, pricing,
  planet, colour-blind) remain intact after the starfield replacement.
- Opened in browser for visual check. Hero headline has a pure-CSS reveal (works without JS);
  reduced-motion path renders a static field + visible text.
- Safety backup of the original at `index.atelier-backup.html` (delete once happy).

## Left for later (not done this pass)

- Orphaned `styles.css` + `scripts/*.jsx` (abandoned React build) and the now-dead `.offer-banner`
  CSS could be deleted for hygiene.
- A few inline `style="…"` font-size overrides in the pricing header remain off the type scale.
- Lighthouse / real-device FPS pass not run here (no headless browser in this environment).
