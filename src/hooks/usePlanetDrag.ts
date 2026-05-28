import { useEffect, type RefObject } from 'react';
import { planetControls } from '../lib/planetControls';

/** Attaches pointer drag on the given catcher element → planet rotation. */
export function usePlanetDrag(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let dragging = false;
    let px = 0;
    let py = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      planetControls.start();
      px = e.clientX;
      py = e.clientY;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      planetControls.drag(e.clientX - px, e.clientY - py);
      px = e.clientX;
      py = e.clientY;
    };
    const up = () => {
      if (dragging) {
        dragging = false;
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
  }, [ref]);
}
