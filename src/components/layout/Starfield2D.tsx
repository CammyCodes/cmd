import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../../lib/media';

/**
 * The ORIGINAL simple 2D-canvas starfield (the one the client preferred):
 * fixed density, ~8% violet-tinted stars, pure sine twinkle — no drift,
 * streaks, parallax or shooting stars. Fixed behind everything, decorative.
 * Reduced-motion → one static frame. Pauses when the tab is hidden.
 */
interface Star {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  ph: number;
  violet: boolean;
}

export function Starfield2D() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let raf = 0;

    const isTritanopia = () => document.documentElement.classList.contains('tritanopia-mode');

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      c!.width = w * dpr;
      c!.height = h * dpr;
      c!.style.width = w + 'px';
      c!.style.height = h + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.floor((w * h) / 9000);
      stars = new Array(target).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * 0.02 + 0.005,
        ph: Math.random() * Math.PI * 2,
        violet: Math.random() < 0.08,
      }));
      if (reduced) drawStatic();
    }

    function colorFor(violet: boolean) {
      if (!violet) return '#fff';
      return isTritanopia() ? '#80f7ff' : '#c8a8ff';
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx!.globalAlpha = s.a;
        ctx!.fillStyle = colorFor(s.violet);
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function frame(t: number) {
      if (document.hidden) {
        raf = requestAnimationFrame(frame);
        return;
      }
      ctx!.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = s.a * (0.55 + 0.45 * Math.sin(t * s.tw + s.ph));
        ctx!.globalAlpha = a;
        ctx!.fillStyle = colorFor(s.violet);
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    if (!reduced) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
