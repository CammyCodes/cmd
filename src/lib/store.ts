import { create } from 'zustand';
import { prefersReducedMotion } from './media';

function initialTritanopia(): boolean {
  try {
    return localStorage.getItem('colorblind-mode') === 'tritanopia';
  } catch {
    return false;
  }
}

interface AppState {
  reducedMotion: boolean;
  tritanopia: boolean;
  setTritanopia: (v: boolean) => void;
  /** Global page scroll progress 0..1, updated by the scroll provider. */
  scroll: number;
  setScroll: (v: number) => void;
}

export const useStore = create<AppState>((set) => ({
  reducedMotion: prefersReducedMotion(),
  tritanopia: initialTritanopia(),
  setTritanopia: (v) => {
    try {
      localStorage.setItem('colorblind-mode', v ? 'tritanopia' : 'off');
    } catch {
      /* ignore */
    }
    document.documentElement.classList.toggle('tritanopia-mode', v);
    set({ tritanopia: v });
  },
  scroll: 0,
  setScroll: (v) => set({ scroll: v }),
}));
