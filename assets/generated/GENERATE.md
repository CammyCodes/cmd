# Generate the section mockups (Gemini)

Five images drive the **Why us** and **How it works** sections of `index.html`. They are *not* committed yet — until the files exist, each slot shows an on-brand violet SVG line-art fallback. Drop the files in with the exact names below and they appear automatically (no code change).

## How it works on the page
Each slot in `index.html` looks like:
```html
<div class="viz" data-gen-id="why-phone">
  <img class="gen-img" src="assets/generated/why-phone.png" alt="…" loading="lazy" onerror="this.remove()">
  <!-- GEMINI PROMPT: … -->
  <svg class="poster">…SVG fallback…</svg>
</div>
```
- If `assets/generated/why-phone.png` exists, the `<img>` loads and covers the fallback.
- If it 404s (not generated yet), `onerror` drops the `<img>` and the SVG fallback stays. So the page is never broken.

## What to generate
Source of truth is [`manifest.json`](manifest.json). For each entry: generate from `prompt` at `dims`, save as `assets/generated/<file>` (PNG). The rocket scene (How, stage 2) now has a slot too — the hand-built rocket SVG stays as its fallback until `how-rocket.png` is generated.

| id | file | dims |
|---|---|---|
| why-phone | why-phone.png | 1200×800 |
| why-fast | why-fast.png | 1200×800 |
| why-rings | why-rings.png | 1280×768 → use 1200×800 ok |
| how-blueprint | how-blueprint.png | 1280×768 |
| how-orbit | how-orbit.png | 1280×768 |
| how-rocket | how-rocket.png | 1280×768 |

(Images are shown with `object-fit: cover`, so exact aspect isn't critical — any close ratio crops cleanly.)

## House style (must follow — see `uploads/cmd-brand.md` §10)
- Pure black background. **One** galaxy-violet accent only: `#9B7BFF` / `#C8A8FF`. No other colours.
- No readable text, no logos, no rocket-emoji kitsch, no stock-photo cliché.
- Photorealistic / cinematic, subtle film grain.

## For an automated agent
1. Read `manifest.json`.
2. For each slot, call your image model (Gemini / Imagen) with `prompt` at `dims`; save to `assets/generated/<file>` as PNG.
3. Optionally re-encode to `.webp` and update both the filename here and the matching `src` in `index.html`.
4. Reload the page to confirm each slot swapped from SVG → image. No other edits required.
