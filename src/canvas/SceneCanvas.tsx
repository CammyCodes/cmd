import { Canvas } from '@react-three/fiber';
import { Lights } from './Lights';
import { Planet } from './Planet';
import { Rocket } from './Rocket';

/**
 * The single persistent R3F canvas, fixed full-viewport behind the DOM.
 * Hosts the planet (hero) and the rocket (WHY beat B). The phone is a DOM/CSS
 * mockup (crisper, shows real UI), so it is not in here. Lights live at scene
 * root so they survive the planet being hidden.
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
        <Lights />
        <Planet />
        <Rocket />
      </Canvas>
    </div>
  );
}
