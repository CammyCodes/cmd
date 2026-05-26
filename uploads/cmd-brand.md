# CMD — Brand Identity

> The creative direction document. Read this before writing any copy, designing any screen, opening Figma, or naming any file. Everything CMD touches — site, deck, invoice, business card, Instagram grid, walk-in pitch — has to pass through here first.

---

## 1. The thesis

**CMD = the command that launches the journey.**

The wordmark reads as `cmd` — the terminal prompt — but the brand world it opens into is the cosmos. That collision (technical precision ↔ cosmic wonder) is the entire identity. Hold both at once and the brand works. Drop either and it becomes either a generic tech studio or a generic creative studio.

Working internal definition: **"From command line to liftoff."**

This pulls double duty:
- It says we are technical. We write code. We build properly.
- It says we tell stories. Your site is a launch sequence, not a brochure.

The narrative we sell clients: **most websites are dead rocks. We build worlds.** A good site isn't a page — it's a place. A planet. CMD is the studio that takes a business off the dead rock of its current site and onto a planet of its own.

---

## 2. Audience

**Primary (year one):** London trades. Plasterers, plumbers, electricians, builders, roofers, decorators, gas engineers, locksmiths. Owner-operators or small crews (1–10 people). Decision-maker is the gaffer.

**What this means for tone:** No agency-speak. No "synergy". No "elevate". Plain English. We speak the way a confident senior tradesperson speaks to another tradesperson — direct, no preamble, knows the job, doesn't pad.

**Secondary (content audience):** Designers, developers, founders who watch the TikTok rebuilds. This audience expects taste and technical credibility. The brand has to land for both groups simultaneously — the cosmos narrative carries the taste-conscious audience, the directness carries the trades.

---

## 3. The name

- **Spoken:** "CMD." Three letters. Said as letters, not as a word ("see-em-dee"). Like "BBC" or "JCB". Never pronounced "command".
- **Written formal:** **CMD** (all caps, no punctuation).
- **Written long-form:** **CMD — Camm Design**. The em dash is non-negotiable. Not a hyphen, not a colon. Em dash.
- **Don't:** "cmd" lowercase in body copy, "C.M.D.", "Cmd", "CMD Studio", "CMD Agency", "Camm Design Studio".

---

## 4. The mark

**Logo direction (v1, build in Figma):**

A wordmark, not a symbol. The three letters `CMD` set in a wide-tracked monospace, sitting on a baseline that suggests a horizon line. Optionally a single small marker before the C — a `>` chevron or a blinking cursor block (`▮`) — that subtly nods to the terminal prompt without making the logo about the joke.

Two lockups:
1. **Primary:** `▮ CMD` or `> CMD`
2. **Long form:** `▮ CMD — CAMM DESIGN`

The block/chevron is the *only* permitted graphic element of the mark. No icons, no swooshes, no orbits, no rockets. The cosmic narrative lives in the site and the photography — never in the logo. The logo stays austere on purpose; it's the still point at the centre.

**Construction rules:**
- Monospace letterforms, all caps
- Letter spacing: +60 to +80 (loose)
- The chevron/block sits at one-letter's worth of distance from the C
- A clear-space rule equal to the height of the C on all sides

**Where it lives:**
- Top-left of every page, small
- Bottom-right of every page, smaller
- Favicon and PWA icon (block + C, cropped)
- Email signature
- Invoice header

---

## 5. The signature move — "Designed by Camm"

This is the single bit of romance in an otherwise austere system. Every site we build (and the CMD site itself) gets, in the deep footer, in small italic, off-white at low opacity:

> *Designed by Camm*

Rules:
- **Font:** Fraunces Italic, weight 300 (Light), optical size set to display (high contrast strokes).
- **Size:** 11–13px. Small enough to feel like a stonemason's mark, large enough to read.
- **Colour:** `#FFFFFF` at 40% opacity on a black background; `#000000` at 50% opacity on a white background.
- **Placement:** Deep footer only. Below copyright. Centred or right-aligned.
- **Link:** Optionally a hairline underline on hover that draws the cursor's eye, links back to camm.design.
- **Never:** Used in marketing materials, social posts, decks. Only on built sites.

This is our wax seal. Don't dilute it by overusing it.

---

## 6. Colour

**Pure two-colour system. No accent.** The discipline is the brand.

| Token | Hex | Use |
|---|---|---|
| `--ink-100` | `#000000` | Default background. Body of every page. |
| `--ink-90` | `#0A0A0A` | Subtle background variation (e.g. behind a card). |
| `--ink-80` | `#141414` | Card surfaces, hover states on dark backgrounds. |
| `--ink-60` | `#2A2A2A` | Borders, dividers on dark backgrounds. |
| `--ink-40` | `#666666` | De-emphasised text, captions, metadata. |
| `--ink-20` | `#A8A8A8` | Secondary text, placeholder text. |
| `--paper-100` | `#FFFFFF` | Default text. Inverted backgrounds. |
| `--paper-90` | `#F2F2F2` | Hover states on white. |
| `--paper-60` | `#D4D4D4` | Borders on white backgrounds. |

**Rules:**
- No reds. No blues. No greens. No gradients with colour. Gradients allowed only between `--ink-100` and `--ink-80` (subtle atmospheric depth).
- The star field is white-on-black. Stars are `--paper-100` at varying opacity; never tinted.
- If you ever need to indicate state (success/error), use opacity and weight changes, not colour. A successful action might flash the text from `--ink-20` to `--paper-100`. An error draws a hairline border at `--paper-100` around the input.
- **One exception, year-2+:** if we ever introduce a single accent, it will be a single warm white (e.g. `#FFE9C2`) used only as a "twinkle" highlight on hero stars. Not a system colour. Not for type or UI.

---

## 7. Typography

Three faces. All free. No exceptions without a written reason.

| Role | Face | Source | Why |
|---|---|---|---|
| **Display** | **Fraunces** (variable, optical size) | Google Fonts | Editorial serif with a flexible optical axis — looks like a cosmology textbook at 80px, looks like a magazine pull-quote at 24px. The italic is one of the most beautiful free italics ever made; it carries our signature move. |
| **Body** | **Geist Sans** | Vercel, free | Clean, characterful, geometric without being sterile. Built for screens. Plays well with mono. Not Inter. |
| **Mono** | **Geist Mono** | Vercel, free | For terminal moments (`> cmd —`), code annotations, technical metadata, coordinates, timestamps. |

**Banned at the brand level:** Inter, Roboto, Arial, Helvetica Now, Open Sans, Lato, Montserrat, Poppins, any handwritten/script face other than Fraunces Italic, anything that looks like it came from a Squarespace template default.

### Type scale (1.25 minor third)

| Token | Size | Line height | Use |
|---|---|---|---|
| `--type-display-xl` | clamp(72px, 9vw, 160px) | 0.95 | Hero headlines only. Fraunces, weight 400, optical 144. |
| `--type-display-l` | clamp(48px, 5.5vw, 96px) | 1.0 | Section openers. Fraunces, weight 400, optical 96. |
| `--type-display-m` | clamp(32px, 3.5vw, 56px) | 1.05 | Sub-section heads. Fraunces, weight 400, optical 48. |
| `--type-h1` | 32px | 1.1 | Page titles inside the site. Geist Sans, weight 500. |
| `--type-h2` | 24px | 1.2 | Geist Sans, weight 500. |
| `--type-h3` | 18px | 1.3 | Geist Sans, weight 500. |
| `--type-body` | 16px | 1.55 | Body. Geist Sans, weight 400. |
| `--type-small` | 14px | 1.5 | Captions. Geist Sans, weight 400. |
| `--type-mono` | 13px | 1.45 | Geist Mono, weight 400. Tracking +20. |
| `--type-signature` | 12px | 1.4 | Fraunces Italic, weight 300, optical 12. The Designed-by-Camm signature. |

### Type rules

- Headlines in **Fraunces** with optical size that scales with display size. Tight tracking (-15 to -25).
- All body in **Geist Sans**, never Fraunces. Fraunces is for moments, not for paragraphs.
- Use Mono sparingly. It's an accent, not a body. Reserve it for: section labels (e.g. `> 001 / ON THE GROUND`), timestamps, coordinates, file names, command-style annotations.
- One italic in the system — Fraunces Italic, weight 300, used only for the signature mark and very occasional pull-quotes.
- No drop caps. No script. No all-caps body. All-caps allowed only on mono labels.

---

## 8. Voice

**The voice has two registers. We move between them.**

### Register A — Plain (used for trades, sales, anything practical)

Short sentences. No padding. No metaphor when a literal word will do. Reads like a confident person explaining their job to another grown-up.

> "We build websites for London trades. Your site should make the phone ring. Most don't. Ours do."

**Allowed:** Direct claims. Numbers. Job names. First-person plural ("we").
**Avoid:** "Elevate", "synergy", "leverage" (as a verb), "solutions", "best-in-class", "your journey starts here", "let's build something amazing", any compound noun with the word "experience" in it.

### Register B — Cosmic (used for the CMD site itself, the brand, headers)

Spare. Slightly literary. Carries the planet/journey metaphor without ever explaining it. The metaphor does the work; we don't need to tell anyone we are using a metaphor.

> "Most websites are dead rocks. We build worlds."
> "Every site is a planet. The journey starts here."
> "We take small businesses to places their old site never could."

**Allowed:** One bold image per page, sustained. The cosmos vocabulary: orbit, drift, light, distance, dark, shore, signal, launch, horizon.
**Avoid:** Anything that overworks the metaphor. We are not literally going to Mars. No rockets in copy. No "blast off". No "stellar". No "to infinity". The metaphor is taken seriously, which means it stays restrained.

### Universal rules

- Active voice. Always.
- No emoji. Anywhere. Ever. (The brand is too quiet for emoji.)
- No exclamation marks except in rare quoted client testimonials.
- Sentence case for everything except mono labels (which are all-caps) and the wordmark (CMD).
- Numbers under ten in words. Ten and above in figures. Money always in figures with a £.

---

## 9. The narrative — applied

The cosmos narrative is the spine of the brand. It runs through:

- **The CMD site** — the journey is literal (see `cmd-website-design.md` for the choreography).
- **Project naming.** Each client engagement gets a working name based on a celestial body: `Project Europa`, `Project Helios`, `Project Vega`. Used in our docs, never client-facing. It's an internal tradition.
- **The case study format.** Every case study opens with a one-line "system" statement before the brand name. Example: `> System: STAGG / Plastering / Wandsworth`. Like a sci-fi log entry. Mono.
- **The TikTok rebuilds.** Frame each one as "rescuing [BRAND] from a dead rock." Tone is tongue-in-cheek but the work is serious.
- **The voicemail / WhatsApp away message.** Something like: *"You've reached CMD. We're heads-down on a build. Leave a message or text — we'll come back within the day."* Plain register, no metaphor.

---

## 10. Photography and imagery

Imagery that fits the brand:

- **Yes:** astrophotography (proper, beautiful — not stock-rocket cliché), abstract long-exposure light trails, telescope imagery from public-domain sources (NASA, ESO), photographs of glass and refraction, photographs of fog at night, photographs of London at night with the lens lifted toward the sky.
- **No:** stock "team meeting around a laptop" shots, hands-on-keyboards, code-on-a-screen photos, generic startup imagery, rocket emojis or any rocket iconography, planets-with-rings clipart, Saturn graphics, "creative chaos" desks.

For trade client sites specifically, photography is the trade's own work — before-and-afters, the tradesperson at work, the finished room. We help direct/shoot if needed (add-on per project.md).

---

## 11. Application checklist (before any deliverable goes out)

Run every deliverable through this:

- [ ] Black background or white background. No third colour.
- [ ] Logo present, correctly spaced.
- [ ] Fraunces for display, Geist Sans for body, Geist Mono only for accents.
- [ ] Voice in the right register (Plain or Cosmic — never both in the same paragraph).
- [ ] No banned words (see §8).
- [ ] No emoji.
- [ ] Signature mark "Designed by Camm" present on the live site (deep footer only).
- [ ] All numbers and money formatted per §8.
- [ ] No stock imagery that breaks §10.
- [ ] Spelling of "CMD — Camm Design" uses an em dash (—), not a hyphen.

---

## 12. What to do when the brand needs to bend

You will hit cases where the system is awkward. Two rules:

1. **Bend toward more restraint, never less.** When in doubt, take something away.
2. **The cosmos metaphor is the only place we are allowed to be expressive.** Everything else is austere.

If we ever can't decide, the default is: black background, white Geist Sans body, one Fraunces headline, a single Mono label, nothing else. That's CMD's silent default. It will always work.
