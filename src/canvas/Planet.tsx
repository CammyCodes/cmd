import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPlanetTexture, createPlanetBumpMap } from './PlanetTextures';
import { planetControls } from '../lib/planetControls';
import { useStore } from '../lib/store';

const AUTO_SPIN = 0.0009;

export function Planet() {
  const group = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Mesh>(null);
  const tritanopia = useStore((s) => s.tritanopia);
  const reducedMotion = useStore((s) => s.reducedMotion);

  // Generate procedural textures only after fonts load (etched "cmd" needs Fraunces).
  const [fontsReady, setFontsReady] = useState(false);
  useEffect(() => {
    let alive = true;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (alive) setFontsReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  const textures = useMemo(() => {
    if (!fontsReady) return null;
    const map = new THREE.CanvasTexture(createPlanetTexture());
    map.colorSpace = THREE.SRGBColorSpace;
    map.anisotropy = 4;
    const bump = new THREE.CanvasTexture(createPlanetBumpMap());
    return { map, bump };
  }, [fontsReady]);

  useEffect(() => {
    return () => {
      textures?.map.dispose();
      textures?.bump.dispose();
    };
  }, [textures]);

  // Light colours follow the colour-blind filter.
  const lights = tritanopia
    ? { dir: '#80f7ff', rim: '#00e5ff', amb: '#002f35' }
    : { dir: '#c8a8ff', rim: '#9b7bff', amb: '#1a1230' };

  useFrame((state) => {
    const g = group.current;
    const s = sphere.current;
    if (!g || !s) return;

    // Responsive placement: right of centre on wide screens, centred on mobile.
    const wide = state.size.width > 900;
    const targetScale = wide ? 0.52 : 0.36;
    const targetX = wide ? state.viewport.width * 0.2 : 0;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, 0.1));
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.1);

    // Drag (user-initiated) always allowed; idle auto-spin gated by reduced-motion.
    s.rotation.y = THREE.MathUtils.lerp(s.rotation.y, -Math.PI / 2 + planetControls.targetRotY, 0.12);
    s.rotation.x = THREE.MathUtils.lerp(s.rotation.x, planetControls.targetRotX, 0.12);

    if (!planetControls.dragging && !reducedMotion) {
      const idle = performance.now() - planetControls.lastInteraction;
      if (idle > 1500) {
        planetControls.targetRotX += (0 - planetControls.targetRotX) * 0.015;
        const ease = Math.min(1, (idle - 1500) / 2000);
        planetControls.targetRotY += AUTO_SPIN * ease;
      }
    }
  });

  return (
    <group ref={group} rotation={[0, 0, -0.38]} scale={0.0001}>
      <directionalLight color={lights.dir} intensity={1.8} position={[-5, 4, 3]} />
      <directionalLight color={lights.rim} intensity={1.3} position={[5, -4, -3]} />
      <ambientLight color={lights.amb} intensity={0.75} />
      <mesh ref={sphere} rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        {textures ? (
          <meshStandardMaterial
            map={textures.map}
            bumpMap={textures.bump}
            bumpScale={0.26}
            roughness={0.72}
            metalness={0.05}
            emissive={new THREE.Color('#0a081a')}
          />
        ) : (
          // Placeholder until textures are ready — no layout shift, decorative.
          <meshStandardMaterial color="#0a081a" roughness={0.8} metalness={0.05} />
        )}
      </mesh>
    </group>
  );
}
