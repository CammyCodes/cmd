import { useRef } from 'react';
import { HeroCopy } from './HeroCopy';
import { Hero } from './Hero';
import { usePlanetDrag } from '../hooks/usePlanetDrag';
import { useStore } from '../lib/store';
import { ScrollTrigger, useGSAP } from '../lib/scroll/gsap';
import { heroState } from '../lib/heroState';
import { smoothstep } from '../lib/math';

/**
 * Hero cinematic: a tall track with a sticky 100vh stage. Scroll progress
 * (0..1) is mirrored into heroState (read by the 3D planet + phone in
 * useFrame) and drives the hero-text fade and the white fill imperatively.
 * Fully reversible (onUpdate fires both directions). Reduced-motion → static.
 */
export function HeroCinematic() {
  const reduced = useStore((s) => s.reducedMotion);
  const track = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const white = useRef<HTMLDivElement>(null);
  const catcher = useRef<HTMLDivElement>(null);
  usePlanetDrag(catcher);

  useGSAP(
    () => {
      if (reduced || !track.current) return;
      const st = ScrollTrigger.create({
        trigger: track.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress;
          heroState.progress = p;
          const tOut = smoothstep(0.12, 0.42, p);
          if (text.current) {
            text.current.style.opacity = String(1 - tOut);
            text.current.style.transform = `translateY(${-40 * tOut}px)`;
          }
          const wUp = smoothstep(0.4, 0.56, p);
          const wDown = smoothstep(0.62, 0.8, p);
          if (white.current) {
            white.current.style.opacity = String(Math.max(0, 0.94 * wUp * (1 - wDown)));
          }
        },
      });
      return () => st.kill();
    },
    { dependencies: [reduced] },
  );

  if (reduced) return <Hero />;

  return (
    <div className="hero-track" ref={track} id="top">
      <div className="hero-sticky">
        <div className="wrap" style={{ width: '100%' }}>
          <div className="hero-inner">
            <div ref={text}>
              <HeroCopy />
            </div>
            <div aria-hidden="true" />
          </div>
        </div>
        <div ref={catcher} className="planet-catcher" aria-hidden="true" />
        <div className="scroll-cue">
          <span>Begin</span>
          <span className="bar" />
        </div>
      </div>
      <div ref={white} className="hero-white" aria-hidden="true" />
    </div>
  );
}
