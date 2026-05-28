import { useStore } from '../lib/store';

export function ColorblindToggle() {
  const tritanopia = useStore((s) => s.tritanopia);
  const setTritanopia = useStore((s) => s.setTritanopia);

  return (
    <button
      className={`colorblind-toggle${tritanopia ? ' active' : ''}`}
      aria-pressed={tritanopia}
      aria-label="Toggle colour-blind (tritanopia) filter"
      onClick={() => setTritanopia(!tritanopia)}
    >
      <svg
        className="colorblind-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 14, height: 14 }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
      <span>{tritanopia ? 'Filter: Tritanopia' : 'Filter: Off'}</span>
    </button>
  );
}
