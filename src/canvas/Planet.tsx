import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPlanetTexture, createPlanetBumpMap } from './PlanetTextures';
import { planetControls } from '../lib/planetControls';
import { useStore } from '../lib/store';
import { journey } from '../lib/journey';
import { smoothstep, lerp } from '../lib/math';

const AUTO_SPIN = 0.0009;

export function Planet() {
  const group = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Mesh>(null);
  const reducedMotion = useStore((s) => s.reducedMotion);

  const [fontTick, setFontTick] = useState(0);
  useEffect(() => {
    let alive = true;
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (alive) setFontTick((t) => t + 1);
    });
    return () => {
      alive = false;
    };
  }, []);

  const textures = useMemo(() => {
    const map = new THREE.CanvasTexture(createPlanetTexture());
    map.anisotropy = 4;
    const bump = new THREE.CanvasTexture(createPlanetBumpMap());
    return { map, bump };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fontTick]);

  useEffect(() => {
    return () => {
      textures.map.dispose();
      textures.bump.dispose();
    };
  }, [textures]);

  useFrame((state) => {
    const g = group.current;
    const s = sphere.current;
    if (!g || !s) return;

    const p = journey.progress;
    const fade = 1 - smoothstep(0.07, 0.15, p); // dissolves as the white fill grows
    const boost = 1 + smoothstep(0.07, 0.16, p) * 1.4;

    const wide = state.size.width > 900;
    const baseScale = wide ? 0.52 : 0.36;
    const centering = smoothstep(0.07, 0.15, p);
    const targetX = (wide ? state.viewport.width * 0.2 : 0) * (1 - centering);

    g.scale.setScalar(lerp(g.scale.x, baseScale * boost, 0.1));
    g.position.x = lerp(g.position.x, targetX, 0.1);
    g.visible = fade > 0.01;

    const mat = s.material as THREE.MeshStandardMaterial;
    mat.transparent = true;
    mat.opacity = fade;
    mat.depthWrite = fade > 0.5;

    s.rotation.y = lerp(s.rotation.y, -Math.PI / 2 + planetControls.targetRotY, 0.12);
    s.rotation.x = lerp(s.rotation.x, planetControls.targetRotX, 0.12);

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
    <group ref={group} rotation={[0, 0, -0.38]} scale={0.4}>
      <mesh ref={sphere} rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={textures.map}
          bumpMap={textures.bump}
          bumpScale={0.3}
          roughness={0.62}
          metalness={0.05}
          emissive={new THREE.Color('#0a081a')}
        />
      </mesh>
    </group>
  );
}
