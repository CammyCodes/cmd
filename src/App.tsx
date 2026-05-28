// Phase 0 scaffold smoke-test. Replaced by the full composition in Phase 1.
export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-8 text-center">
      <span
        className="font-mono uppercase"
        style={{ fontSize: 12, letterSpacing: '0.22em', color: 'var(--ink-20)' }}
      >
        Camm Design · London · Est. 2026
      </span>
      <h1
        className="font-display"
        style={{ fontSize: 'clamp(48px, 8vw, 128px)', lineHeight: 0.96, margin: 0 }}
      >
        Most websites are{' '}
        <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--violet-soft)' }}>
          dead rocks.
        </em>
        <br />
        We build worlds.
      </h1>
      <p style={{ color: 'var(--ink-20)', maxWidth: '46ch', fontSize: 18 }}>
        Scaffold online — Vite + React + TS + Tailwind, brand tokens and self-hosted fonts wired.
      </p>
    </main>
  );
}
