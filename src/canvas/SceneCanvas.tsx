import { Canvas } from '@react-three/fiber';
import { Planet } from './Planet';
import { Phone } from './Phone';

/**
 * The single persistent R3F canvas, fixed full-viewport behind the DOM.
 * pointer-events:none so the page scrolls/clicks through it; the hero's
 * drag-catcher feeds planet rotation via planetControls. Future phases add
 * the phone, rocket, smoke and satellite into this same canvas.
 */
export function SceneCanvas() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      <Canvas
        flat
        linear
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Planet />
        <Phone />
      </Canvas>
    </div>
  );
}
