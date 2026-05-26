/* CMD app — composes the journey, drives starfield modulation, owns warp/portal state */

const {
  Nav, Reveal, WarpTransition, BrokenPortal, AssetManifest, Placeholder,
  Scene1Departure, Scene2Crossing, Scene3Encountering, Scene4ReEntry,
  Scene5Manifest, Scene6Crew, Scene7Launch, Scene8Orbit
} = window;

/* Per-scene starfield uniforms — §5 brief table */
const SCENE_UNIFORMS = [
  { density: 1.0, speed: 1.0, twinkleFreq: 1.0, streakFactor: 0.0 }, // 1 Departure
  { density: 1.3, speed: 2.5, twinkleFreq: 1.5, streakFactor: 0.4 }, // 2 Crossing
  { density: 1.0, speed: 1.0, twinkleFreq: 1.0, streakFactor: 0.0 }, // 3 Encountering
  { density: 0.7, speed: 0.8, twinkleFreq: 0.8, streakFactor: 0.0 }, // 4 Re-entry
  { density: 0.5, speed: 0.6, twinkleFreq: 0.6, streakFactor: 0.0 }, // 5 Manifest
  { density: 0.5, speed: 0.6, twinkleFreq: 0.6, streakFactor: 0.0 }, // 6 Crew
  { density: 1.5, speed: 1.2, twinkleFreq: 1.7, streakFactor: 0.0 }, // 7 Launch
  { density: 0.7, speed: 0.6, twinkleFreq: 0.7, streakFactor: 0.0 }  // 8 Orbit
];

/* Projects (Scene 3) — real ones: CMD self-portrait + two shipped concepts */
const PROJECTS = [
  {
    id: 'cmd-self',
    dateline: 'cmd / studio / london',
    title: 'cmd itself.',
    problem: "The studio's own site. The exam paper for everything we say we do.",
    location: 'London',
    year: 2026,
    tech: ['Next.js', 'R3F', 'GSAP', 'Vercel'],
    brief: "Build a site that proves the thesis. If a London plasterer lands on it they should want to text us in under a minute. If a designer lands on it they should want to read every word.",
    build: "Eight-scene single-page journey. WebGL starfield modulated per scene. Warp transition between home and case studies. Galaxy accent. Pure typographic restraint elsewhere.",
    result: "You're on it.",
    url: '#',
    placeholder: {
      id: 'CS-01',
      title: 'CASE STUDY HERO — cmd itself',
      dimensions: '1600 × 1000  /  16:10',
      prompt: 'A clean macOS browser window mockup centred on pure black. The window shows a black website with a single oversized white serif headline reading "Most websites are dead rocks." A faint lilac glow leaks from a corner. Tiny mono cursor block in the top-left of the page. Browser chrome matte grey, three traffic lights, no logos. Subtle film grain. Mostly monochrome with a single hint of galaxy violet (#9B7BFF). Photorealistic.',
      motion: 'Reveal-on-scroll → Ken Burns 1.03 over 8s on hover. Surrounded by rotating galaxy gradient.'
    }
  },
  {
    id: 'cammbot',
    dateline: 'CAMMBOT / AI / LONDON',
    title: 'CammBot.',
    problem: "Tradespeople losing hours every week to quotes, emails, invoices and admin nobody had time for.",
    location: 'London',
    year: 2026,
    tech: ['Next.js', 'OpenAI', 'WhatsApp API', 'Stripe', 'Vercel'],
    brief: "Build a custom AI helper for trades, property and service businesses. It needed to feel like a sharp junior team-member, not a chatbot. Free chat. Free setup. Owner only pays when it actually saves work.",
    build: "Conversational front-end with a hardened back-end of templated quotes, invoice generators, email drafts and lead handlers. Plain-English copy throughout. WhatsApp-first.",
    result: "Quotes that used to take an hour go out in three minutes. Owners reclaim a full evening a week.",
    url: 'https://cammycodes.github.io/Camm/',
    placeholder: {
      id: 'CS-02',
      title: 'CASE STUDY HERO — CammBot',
      dimensions: '1600 × 1000  /  16:10',
      prompt: 'Photorealistic macOS browser mockup against pure black. Inside the browser: the CammBot product hero — a single bold white serif headline "AI that does the boring stuff." over a stylised conversation panel (one user message on the right in mono grey, one assistant reply on the left with a tiny lilac avatar dot). A single galaxy-violet call-to-action button "Start free chat". Browser chrome matte grey with traffic lights. Monochrome except for one accent of lilac (#C8A8FF). Subtle film grain. No other text legible.',
      motion: 'Reveal-on-scroll → Ken Burns 1.03 over 8s on hover. Surrounded by rotating galaxy gradient.'
    }
  },
  {
    id: 'house-of-recovery',
    dateline: 'HOUSE OF RECOVERY / SANCTUARY / WORKSOP',
    title: 'House of Recovery.',
    problem: "A clinical recovery sanctuary that was being treated by every existing site builder as a spa. Wrong tone, wrong audience.",
    location: 'Worksop',
    year: 2026,
    tech: ['Next.js', 'Tailwind', 'SumUp Bookings', 'Vercel'],
    brief: "Build a site that frames recovery as discipline, not pampering. Editorial layouts, clinical copy, no candles, no prosecco. Booking funnel had to feed straight into SumUp.",
    build: "Long-form editorial site, four-discipline section with detailed mechanisms and pricing, testimonial wall, prescribed-not-improvised tone throughout. SumUp embedded for instant booking.",
    result: "Average session value up. Bounce-rate halved. Right clients book the right protocols.",
    url: 'https://cammycodes.github.io/HouseOfRecovery/',
    placeholder: {
      id: 'CS-03',
      title: 'CASE STUDY HERO — House of Recovery',
      dimensions: '1600 × 1000  /  16:10',
      prompt: 'Photorealistic macOS browser mockup on pure black background. Inside: the House of Recovery editorial hero featuring a tight monochrome studio photograph of a champagne-coloured compression-therapy suit folded on a linen-covered bench. White serif headline "Restoring Vitality." with the word "Vitality" set in italic. A single small galaxy-violet "Book a Session" button. Browser chrome matte grey, traffic lights. Mostly monochrome with one accent of lilac (#C8A8FF). Subtle film grain. No other readable copy.',
      motion: 'Reveal-on-scroll → Ken Burns 1.03 over 8s on hover. Surrounded by rotating galaxy gradient.'
    }
  }
];

/* Asset slots for the appendix manifest — every Gemini-replaceable slot in the build */
const ASSET_SLOTS = [
  {
    id: 'PT-01',
    title: 'PLANET TEXTURE — cmd self-portrait',
    dimensions: '1024 × 1024  /  1:1',
    prompt: 'Telescope-style photograph of a small terrestrial planet against pure black. Surface: cooled basalt with hairline cracks, mostly dark with faint violet rim-light catching one edge (galaxy bias). No atmosphere, no rings, no other stars in frame. Mostly monochrome with a subtle lilac (#C8A8FF) glow on one limb. Photorealistic astrophotography, planet fills 80% of the square.',
    motion: 'Applied to .planet-orb[data-planet-id="cmd-self"]. 80s CW rotation. Hover scales planet 1.0 → 1.4. Violet halo intensifies on active state.'
  },
  {
    id: 'PT-02',
    title: 'PLANET TEXTURE — CammBot',
    dimensions: '1024 × 1024  /  1:1',
    prompt: 'Smooth dark sphere with a soft violet bioluminescent glow on one hemisphere — like a planet whose surface is faintly lit from within. Subtle circuit-like creases just visible across the terminator. Pure black background. No atmosphere, no rings. Monochrome base with a single accent of galaxy lilac (#9B7BFF). Photorealistic astrophotography.',
    motion: 'Applied to .planet-orb[data-planet-id="cammbot"]. 80s CW rotation. Violet halo intensifies on active state.'
  },
  {
    id: 'PT-03',
    title: 'PLANET TEXTURE — House of Recovery',
    dimensions: '1024 × 1024  /  1:1',
    prompt: 'Pale alabaster moon with a translucent, faintly luminous surface — like polished marble lit from one side. Soft side-light from the right reveals subtle marbling and a hint of warmth in the highlights. Pure black background. No atmosphere, no rings, no other stars. Monochrome with a hairline violet rim. Photorealistic astrophotography.',
    motion: 'Applied to .planet-orb[data-planet-id="house-of-recovery"]. 80s CW rotation. Violet halo intensifies on active state.'
  },
  {
    id: 'CS-01',
    title: 'CASE STUDY HERO — cmd itself',
    dimensions: '1600 × 1000  /  16:10',
    prompt: 'A clean macOS browser window mockup centred on pure black. The window shows a black website with a single oversized white serif headline reading "Most websites are dead rocks." A faint lilac glow leaks from a corner. Tiny mono cursor block in the top-left of the page. Browser chrome matte grey, three traffic lights, no logos. Subtle film grain. Mostly monochrome with a single hint of galaxy violet (#9B7BFF). Photorealistic.',
    motion: 'Lives inside .broken-portal-shell clip-path. Surrounding galaxy gradient rotates continuously (24s CW, 36s CCW counter-layer). Crack edge shimmers in violet/white.'
  },
  {
    id: 'CS-02',
    title: 'CASE STUDY HERO — CammBot',
    dimensions: '1600 × 1000  /  16:10',
    prompt: 'Photorealistic macOS browser mockup against pure black. Inside the browser: the CammBot product hero — bold white serif headline "AI that does the boring stuff." above a stylised conversation panel (one user message right in mono grey, one assistant reply left with a small lilac avatar dot). A single galaxy-violet "Start free chat" CTA. Browser chrome matte grey, traffic lights. Monochrome except for one lilac (#C8A8FF) accent. Subtle film grain. No other legible copy.',
    motion: 'Lives inside .broken-portal-shell clip-path. Surrounded by rotating galaxy gradient.'
  },
  {
    id: 'CS-03',
    title: 'CASE STUDY HERO — House of Recovery',
    dimensions: '1600 × 1000  /  16:10',
    prompt: 'Photorealistic macOS browser mockup on pure black. Inside: editorial hero with a tight monochrome studio photograph of a champagne-coloured compression therapy suit folded on a linen bench. White serif headline "Restoring Vitality." with "Vitality" in italic. One small galaxy-violet "Book a Session" CTA. Browser chrome matte grey, traffic lights. Monochrome with single lilac (#C8A8FF) accent. Subtle film grain. No other readable copy.',
    motion: 'Lives inside .broken-portal-shell clip-path. Surrounded by rotating galaxy gradient.'
  },
  {
    id: 'OG-01',
    title: 'OPEN GRAPH — Home',
    dimensions: '1200 × 630  /  1.91:1',
    prompt: 'Pure black 1200×630 image. Centre: a single line of large white serif text reading "Most websites are dead rocks." with the word "rocks." in italic and tinted faint galaxy lilac (#C8A8FF). Bottom-right corner: small mono caption "▮ cmd — Camm Design / London". Faint scatter of small white twinkling dots across the background mimicking a dense star field, with two or three of them tinted violet. Monochrome with a single lilac accent. Photorealistic film grain.',
    motion: 'Static. Used as the meta og:image. No animation.'
  },
  {
    id: 'OG-02',
    title: 'OPEN GRAPH — Case Study Template',
    dimensions: '1200 × 630  /  1.91:1',
    prompt: 'Pure black 1200×630 image. Top-left: small mono caption "{> SYSTEM: [CLIENT] / [TRADE] / [BOROUGH]}". Centre: oversized white serif client name (placeholder text "[CLIENT NAME]") with one accent letter in italic galaxy lilac (#9B7BFF). Bottom-right: faint italic serif "Designed by Camm" in white at 40% opacity. Hairline white border 8px from each edge. Monochrome with one lilac accent. Subtle film grain.',
    motion: 'Static per-case-study og:image. No animation.'
  },
  {
    id: 'TRADE-01',
    title: 'CASE STUDY DETAIL — Project documentation photography',
    dimensions: '1600 × 1066  /  3:2',
    prompt: 'Documentary photograph appropriate to the case study (trade work for trades clients, treatment-room studio shot for House of Recovery, product-environment shot for CammBot). Tight crops, no faces. Natural side light. Monochrome only. Photojournalistic, no studio styling, no posed compositions. Slight film grain.',
    motion: 'Static reveal-on-scroll. Mono dateline caption below.'
  },
  {
    id: 'GAL-01',
    title: 'GALAXY BACKDROP — Portal accent (optional)',
    dimensions: '1600 × 1600  /  1:1',
    prompt: 'Abstract galaxy / nebula painting on pure black. Soft sweeping swirls of deep galaxy violet (#6A48E0), lilac (#C8A8FF) and near-black with scattered tiny white stars. Centre roughly clear so the broken-portal crack reads through. No identifiable celestial objects. No realism — looks like a long-exposure paint study. Optional uplift for the broken portal background; otherwise the CSS-driven galaxy carries it.',
    motion: 'If used, replaces / augments the conic+radial CSS gradient layers behind .broken-portal-shell. Rotates 24s CW (or held static).'
  },
  {
    id: 'SS-01',
    title: 'SHOOTING STAR FALLBACK — Scene 7',
    dimensions: '800 × 80  /  10:1',
    prompt: 'Thin white streak on pure black, bright pixel head on the right, fading to nothing across an 800px tail. A faint lilac tint sits in the middle of the fade. No halo. Aliased clean edges. Fallback only — the live shooting stars are canvas-drawn.',
    motion: 'FALLBACK ONLY. Live shooting stars are drawn by starfield.js — 1 every 30–60s, 1.5–2s travel, fades to black.'
  }
];

function App() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [warp, setWarp] = React.useState(null);   // { project, origin } during warp
  const [portal, setPortal] = React.useState(null); // current case study after midpoint

  const sceneEls = React.useRef([]);

  /* Smoothly drive starfield uniforms from scroll position */
  React.useEffect(() => {
    let raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      // Find which scenes overlap viewport; compute blended uniforms
      let acc = { density: 0, speed: 0, twinkleFreq: 0, streakFactor: 0 };
      let totalW = 0;
      let dominantIdx = 0;
      let dominantOverlap = 0;

      sceneEls.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const top = Math.max(0, r.top);
        const bot = Math.min(vh, r.bottom);
        const overlap = Math.max(0, bot - top);
        if (overlap <= 0) return;
        const u = SCENE_UNIFORMS[i] || SCENE_UNIFORMS[0];
        acc.density += u.density * overlap;
        acc.speed += u.speed * overlap;
        acc.twinkleFreq += u.twinkleFreq * overlap;
        acc.streakFactor += u.streakFactor * overlap;
        totalW += overlap;
        if (overlap > dominantOverlap) { dominantOverlap = overlap; dominantIdx = i; }
      });
      if (totalW > 0) {
        acc.density /= totalW;
        acc.speed /= totalW;
        acc.twinkleFreq /= totalW;
        acc.streakFactor /= totalW;
        if (window.__starfield) window.__starfield.setSceneTargets(acc);
      }
      setActiveIdx(dominantIdx);
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleNavigate = (target) => {
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePlanetClick = (project, origin) => {
    setWarp({ project, origin });
  };

  return (
    <React.Fragment>
      <Nav onNavigate={handleNavigate} />

      <main id="main" className="app">
        <div ref={(el) => sceneEls.current[0] = el}><Scene1Departure /></div>
        <div ref={(el) => sceneEls.current[1] = el}><Scene2Crossing /></div>
        <div ref={(el) => sceneEls.current[2] = el}>
          <Scene3Encountering projects={PROJECTS} onPlanetClick={handlePlanetClick} />
        </div>
        <div ref={(el) => sceneEls.current[3] = el}><Scene4ReEntry /></div>
        <div ref={(el) => sceneEls.current[4] = el}><Scene5Manifest /></div>
        <div ref={(el) => sceneEls.current[5] = el}><Scene6Crew /></div>
        <div ref={(el) => sceneEls.current[6] = el}><Scene7Launch /></div>
        <div ref={(el) => sceneEls.current[7] = el}><Scene8Orbit /></div>

        <AssetManifest slots={ASSET_SLOTS} />
      </main>

      {warp ? (
        <WarpTransition
          origin={warp.origin}
          onMidpoint={() => setPortal(warp.project)}
          onComplete={() => setWarp(null)}
        />
      ) : null}

      {portal ? (
        <BrokenPortal project={portal} onClose={() => setPortal(null)} />
      ) : null}
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
