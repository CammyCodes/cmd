# cmd — Camm Design

Most websites are dead rocks. We build worlds.

**cmd** is a premium, single-page portfolio website designed and developed for Camm Design, based in London. It serves as a showcase of interactive web development, clean typographic layouts, and immersive visual storytelling.

---

## 🚀 Key Features

- **Draggable 3D Terrestrial Planet**: A fully interactive Three.js-rendered basalt planet centered on the home hero section. Features customized PBR lighting, procedural height bump mapping, slow auto-rotation, and interactive touch/mouse drag controls (complete with mobile scroll-blocking).
- **Responsive Flight Plan**: A step-by-step interactive journey section that flows seamlessly from *Brief* to *Liftoff* to *Orbit*, fully responsive with custom flexbox layout ordering on mobile viewports.
- **Color-Coded Pricing Manifest**: Multi-tier vertical pricing cards on mobile and an interactive comparison table on desktop detailing different design and development options (Landing, Brochure, Bookings, Online shop, Custom).
- **CSS macOS Browser Mockups**: Realistic CSS-only macOS-style browser mockups used for portfolio items, optimized to scale proportionally on small screens without overlapping headlines or CTA buttons.
- **Dynamic Starfield**: A high-performance canvas 2D starfield that adjusts density, speed, and twinkling frequency based on scroll progress through each scene.

---

## 🛠️ Technology Stack

- **Graphics**: [Three.js](https://threejs.org/) (PBR Materials, Directional/Ambient Lighting, Sphere Geometry)
- **Framework**: HTML5, Vanilla JavaScript, CSS3
- **Fonts**: [Fraunces](https://fonts.google.com/specimen/Fraunces) (Serif), [Geist](https://vercel.com/font/sans) (Sans-Serif), [Geist Mono](https://vercel.com/font/mono) (Monospace)
- **Deployment**: Highly optimized static asset loading, ready for GitHub Pages, Netlify, or Vercel.

---

## 📱 Mobile Responsiveness Polish

The codebase has been specifically polished for small screens and mobile devices:
1. **Interactive Overrides**: Dragging the Three.js planet on mobile triggers `e.preventDefault()`, allowing rotation without causing the parent page to scroll.
2. **Stacking Order Corrected**: Flexbox ordering ensures elements stack consistently (**Marker -> Text -> Art**) even where components are reversed in source HTML for alternating desktop styling.
3. **Flexible Pricing Layout**: Desktop comparison tables are hidden below `768px` in favor of a clean, vertically stacked card layout.
4. **Mockup Scalability**: Viewport-specific media queries dynamically scale padding, headline sizes (`32px` to `20px`), and absolute positions within CSS browser mockups.

---

## 💻 Local Preview

To run the site locally:
1. Clone this repository.
2. Serve the directory using any static file server, for example:
   ```bash
   # Using python
   python -m http.server 8000
   
   # Using node (http-server)
   npx http-server .
   ```
3. Open `http://localhost:8000/CMD v2.html` in your web browser.
