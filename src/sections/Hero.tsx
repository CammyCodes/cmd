import { useRef } from 'react';
import { HeroCopy } from './HeroCopy';
import { usePlanetDrag } from '../hooks/usePlanetDrag';

/** Static hero — used as the reduced-motion fallback for HeroCinematic. */
export function Hero() {
  const catcher = useRef<HTMLDivElement>(null);
  usePlanetDrag(catcher);

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-inner">
          <HeroCopy />
          <div aria-hidden="true" />
        </div>
      </div>
      <div ref={catcher} className="planet-catcher" aria-hidden="true" />
      <div className="scroll-cue">
        <span>Begin</span>
        <span className="bar" />
      </div>
    </section>
  );
}
