import { useRef } from 'react';
import { HeroCopy } from './HeroCopy';
import { IPhone } from '../components/IPhone';
import { usePlanetDrag } from '../hooks/usePlanetDrag';
import { useStore } from '../lib/store';
import { ScrollTrigger, useGSAP } from '../lib/scroll/gsap';
import { journey } from '../lib/journey';
import { smoothstep, clamp01, lerp } from '../lib/math';

/**
 * Act I — one continuous sticky journey:
 *   hero (planet)  →  white bubble grows from the bottom (stays as the
 *   background)  →  Beat A: a desktop site folds into the iPhone (phone-first)
 *   →  white drains, Beat B: the 3D rocket lifts off + smoke (loads fast)
 *   →  white flashes back, Beat C: the iPhone rings "Your next customer".
 * One scrubbed ScrollTrigger drives DOM (imperative) + 3D (via journey.progress).
 * Fully reversible. Reduced-motion → a plain stacked fallback.
 */
export function Act1() {
  const reduced = useStore((s) => s.reducedMotion);
  const track = useRef<HTMLDivElement>(null);
  const heroText = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const white = useRef<HTMLDivElement>(null);
  const desktop = useRef<HTMLDivElement>(null);
  const phoneA = useRef<HTMLDivElement>(null);
  const phoneC = useRef<HTMLDivElement>(null);
  const capA = useRef<HTMLDivElement>(null);
  const capB = useRef<HTMLDivElement>(null);
  const capC = useRef<HTMLDivElement>(null);
  const catcher = useRef<HTMLDivElement>(null);
  usePlanetDrag(catcher);

  useGSAP(
    () => {
      if (reduced || !track.current) return;
      const set = (el: HTMLElement | null, o: number, transform?: string) => {
        if (!el) return;
        el.style.opacity = String(o);
        if (transform !== undefined) el.style.transform = transform;
      };
      const st = ScrollTrigger.create({
        trigger: track.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress;
          journey.progress = p;

          // hero text + scroll cue
          const heroOut = smoothstep(0.07, 0.14, p);
          set(heroText.current, 1 - heroOut, `translateY(${-40 * heroOut}px)`);
          set(cue.current, 1 - smoothstep(0.02, 0.08, p));
          if (catcher.current) catcher.current.style.pointerEvents = heroOut > 0.3 ? 'none' : 'auto';

          // white bubble (clip from bottom centre) — grows, holds, drains, flashes back
          const w = clamp01(
            smoothstep(0.07, 0.15, p) -
              smoothstep(0.36, 0.44, p) +
              smoothstep(0.62, 0.68, p) -
              smoothstep(0.86, 1.0, p),
          );
          if (white.current) white.current.style.clipPath = `circle(${w * 160}% at 50% 100%)`;

          // Beat A — desktop site folds down into the phone
          const dProg = smoothstep(0.15, 0.28, p);
          const dVis = smoothstep(0.14, 0.17, p) * (1 - smoothstep(0.27, 0.32, p));
          set(
            desktop.current,
            dVis,
            `translate(-50%,-50%) scale(${lerp(1, 0.22, dProg)}) rotateX(${lerp(0, 62, dProg)}deg)`,
          );
          const aIn = smoothstep(0.15, 0.21, p) * (1 - smoothstep(0.33, 0.4, p));
          const spin = smoothstep(0.24, 0.33, p) * 360;
          set(phoneA.current, aIn, `translate(-50%,-50%) scale(${lerp(0.9, 1, aIn)}) rotateY(${spin}deg)`);
          set(capA.current, smoothstep(0.16, 0.22, p) * (1 - smoothstep(0.32, 0.38, p)));

          // Beat B — rocket caption (3D rocket itself reads journey.progress)
          set(capB.current, smoothstep(0.45, 0.5, p) * (1 - smoothstep(0.6, 0.64, p)));

          // Beat C — ringing phone
          const cIn = smoothstep(0.66, 0.72, p) * (1 - smoothstep(0.84, 0.9, p));
          set(phoneC.current, cIn, `translate(-50%,-50%) scale(${lerp(0.9, 1, cIn)})`);
          if (phoneC.current) phoneC.current.classList.toggle('ringing', cIn > 0.4);
          set(capC.current, smoothstep(0.68, 0.74, p) * (1 - smoothstep(0.83, 0.89, p)));
        },
      });
      return () => st.kill();
    },
    { dependencies: [reduced] },
  );

  if (reduced) return <ReducedWhy />;

  return (
    <div className="act-track" ref={track} id="top">
      <div className="act-stage">
        {/* hero */}
        <div className="wrap act-hero" ref={heroText} style={{ width: '100%' }}>
          <div className="hero-inner">
            <HeroCopy />
            <div aria-hidden="true" />
          </div>
        </div>
        <div ref={catcher} className="planet-catcher" aria-hidden="true" />
        <div className="scroll-cue" ref={cue}>
          <span>Begin</span>
          <span className="bar" />
        </div>

        {/* white fill (fluid bubble from the bottom) */}
        <div ref={white} className="act-white" aria-hidden="true" />

        {/* Beat A — desktop site that folds into the phone */}
        <div ref={desktop} className="act-desktop" aria-hidden="true">
          <div className="dk-bar">
            <i /><i /><i /><span />
          </div>
          <div className="dk-body">
            <p className="dk-eyebrow">Camm Design</p>
            <h4 className="dk-h">Your business, online.</h4>
            <span className="dk-btn">Get a quote</span>
            <div className="dk-lines"><i /><i /><i /></div>
          </div>
        </div>

        {/* Beat A phone */}
        <IPhone ref={phoneA} className="act-phone">
          <div className="scr-site">
            <div className="scr-bar"><i /><i /><i /><span /></div>
            <div className="scr-body">
              <p className="scr-eyebrow">Camm Design</p>
              <h5 className="scr-h">Your business, online.</h5>
              <span className="scr-btn">Get a quote</span>
              <div className="scr-lines"><i /><i /><i /></div>
            </div>
          </div>
        </IPhone>

        {/* Beat C phone (ringing) */}
        <IPhone ref={phoneC} className="act-phone">
          <div className="scr-call">
            <p className="call-status">Incoming call</p>
            <div className="call-avatar">▮</div>
            <h5 className="call-name">Your next customer</h5>
            <p className="call-sub">mobile · now</p>
            <div className="call-actions">
              <span className="call-btn decline" />
              <span className="call-btn accept" />
            </div>
          </div>
        </IPhone>

        {/* captions */}
        <div ref={capA} className="act-cap on-light">
          <p className="label-mono">Built for phones first</p>
          <h3 className="serif">Over 70% of your visitors are on a phone.</h3>
        </div>
        <div ref={capB} className="act-cap on-dark">
          <p className="label-mono">Loads in under a second</p>
          <h3 className="serif">Gone before it loads is gone for good.</h3>
        </div>
        <div ref={capC} className="act-cap on-light">
          <p className="label-mono">The phone actually rings</p>
          <h3 className="serif">
            One clear thing to do. <em>Your next customer.</em>
          </h3>
        </div>
      </div>
    </div>
  );
}

/** Reduced-motion fallback: the same message, plainly stacked. */
function ReducedWhy() {
  return (
    <section id="why" style={{ padding: '140px 0' }}>
      <div className="wrap">
        <div className="section-head">
          <p className="label-mono">Why us</p>
          <h2>
            Most small-business websites <em>don&rsquo;t earn their keep.</em>
          </h2>
          <p>
            Built for phones first. Loads in under a second. One clear thing to do on every page — so
            the phone actually rings.
          </p>
        </div>
      </div>
    </section>
  );
}
