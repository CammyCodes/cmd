import { useEffect, useRef } from 'react';
import { planetControls } from '../lib/planetControls';

export function Hero() {
  const catcher = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const prev = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = catcher.current;
    if (!el) return;
    const down = (e: PointerEvent) => {
      dragging.current = true;
      planetControls.start();
      prev.current = { x: e.clientX, y: e.clientY };
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      planetControls.drag(e.clientX - prev.current.x, e.clientY - prev.current.y);
      prev.current = { x: e.clientX, y: e.clientY };
    };
    const up = () => {
      if (dragging.current) {
        dragging.current = false;
        planetControls.end();
      }
    };
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-inner">
          <div>
            <p className="label-mono">Camm Design · London · Est. 2026</p>
            <h1 className="serif">
              <span className="line"><span>Most websites are</span></span>
              <span className="line"><span><em>dead rocks.</em></span></span>
              <span className="line"><span>We build worlds.</span></span>
            </h1>
            <p className="hero-lede">
              A London studio that designs, builds and hosts websites for small businesses. Fast,
              clear, and made to bring in real customers — not just sit there looking pretty.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#launch">
                Start a project <span className="arr">→</span>
              </a>
              <a className="btn btn-ghost" href="#work">
                See our work
              </a>
            </div>
            <div className="hero-meta">
              <span className="chip">Based in London</span>
              <span className="chip">Reply within a day</span>
              <span className="chip">Free first call</span>
            </div>
          </div>
          <div aria-hidden="true" />
        </div>
      </div>
      {/* drag-catcher over the planet (desktop only; hidden on mobile via CSS) */}
      <div ref={catcher} className="planet-catcher" aria-hidden="true" />
      <div className="scroll-cue">
        <span>Begin</span>
        <span className="bar" />
      </div>
    </section>
  );
}
