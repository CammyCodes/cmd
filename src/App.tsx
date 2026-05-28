import './styles.css';
import { useReveal } from './hooks/useReveal';
import { SmoothScroll } from './components/SmoothScroll';
import { Starfield2D } from './components/layout/Starfield2D';
import { SceneCanvas } from './canvas/SceneCanvas';
import { Nav } from './components/Nav';
import { Hero } from './sections/Hero';
import { Pricing } from './sections/Pricing';
import { Work } from './sections/Work';
import { Launch } from './sections/Launch';
import { Footer } from './components/Footer';

/* Temporary text-only placeholders. Phase 2–4 replace these with the
   scroll-driven cinematics (hero→phone, WHY 3-beat, process/orbit). */
function WhyPlaceholder() {
  return (
    <section id="why" style={{ padding: '140px 0' }}>
      <div className="wrap">
        <div className="section-head">
          <p className="label-mono rv">Why us</p>
          <h2 className="rv d1">
            Most small-business websites <em>don&rsquo;t earn their keep.</em>
          </h2>
          <p className="rv d2">
            They&rsquo;re slow, hard to read on a phone, and the contact form goes nowhere. We fix all
            three — built for phones first, loading in under a second, with one clear thing to do on
            every page so the phone actually rings.
          </p>
        </div>
      </div>
    </section>
  );
}

function HowPlaceholder() {
  return (
    <section id="how" style={{ padding: '80px 0 140px' }}>
      <div className="wrap">
        <div className="section-head">
          <p className="label-mono rv">How it works</p>
          <h2 className="rv d1">
            From <em>brief</em> to <em>liftoff</em> to <em>orbit.</em>
          </h2>
          <p className="rv d2">
            Three stages. Two weeks for most jobs. Fixed price, fixed timeline, written down. We host,
            secure with SSL, and back up daily — your site stays fast and current while you get on
            with the job.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useReveal();
  return (
    <SmoothScroll>
      <a href="#main" className="skip-link">Skip to content</a>
      <Starfield2D />
      <SceneCanvas />
      <main id="main" style={{ position: 'relative', zIndex: 10 }}>
        <Nav />
        <Hero />
        <WhyPlaceholder />
        <HowPlaceholder />
        <Pricing />
        <Work />
        <Launch />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
