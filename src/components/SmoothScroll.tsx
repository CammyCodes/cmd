import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from '../lib/scroll/gsap';
import { useStore } from '../lib/store';
import { prefersReducedMotion } from '../lib/media';

/**
 * One scroll engine for the whole page. Lenis is the single source of scroll
 * truth; GSAP ScrollTrigger reads it; the store mirrors a normalized 0..1
 * progress for the R3F layer. Under reduced-motion we skip Lenis (native scroll)
 * but keep ScrollTrigger working.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const setScroll = useStore((s) => s.setScroll);

  useEffect(() => {
    const reduced = prefersReducedMotion();

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max : 0);
    };
    const onResize = () => ScrollTrigger.refresh();

    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;

    if (!reduced) {
      lenis = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      lenis.on('scroll', onScroll);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    window.addEventListener('resize', onResize);

    // Recalculate trigger positions once fonts have loaded (layout height shifts).
    let raf = 0;
    document.fonts?.ready.then(() => {
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      if (lenis) {
        if (tick) gsap.ticker.remove(tick);
        lenis.destroy();
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    };
  }, [setScroll]);

  return <>{children}</>;
}
