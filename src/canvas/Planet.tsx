import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createPlanetTexture, createPlanetBumpMap } from './PlanetTextures';
import { planetControls } from '../lib/planetControls';
import { useStore } from '../lib/store';
import { heroState } from '../lib/heroState';
import { smoothstep, lerp } from '../lib/math';

const AUTO_SPIN = 0.0009;

export function Planet() {
  const group = useRef<THREE.Group>(null);
  const sphere = useRef<THREE.Mesh>(null);
  const tritanopia = useStore((s) => s.tritanopia);
  const reducedMotion = useStore((s) => s.reducedMotion);

  // Regenerate textures once fonts load (crisp Fraunces "cmd"); the first
  // render already draws a textured planet (no flat-colour fallback).
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

  const lights = tritanopia
    ? { dir: '#80f7ff', rim: '#00e5ff', amb: '#002f35' }
    : { dir: '#c8a8ff', rim: '#9b7bff', amb: '#1a1230' };

  useFrame((state) => {
    const g = group.current;
    const s = sphere.current;
    if (!g || !s) return;

    const p = heroState.progress;
    const fade = 1 - smoothstep(0.42, 0.6, p); // dissolves as the white fill takes over
    const boost = 1 + smoothstep(0.4, 0.66, p) * 1.6; // flies toward the camera

    const wide = state.size.width > 900;
    const baseScale = wide ? 0.52 : 0.36;
    const centering = smoothstep(0.4, 0.62, p);
    const targetX = (wide ? state.viewport.width * 0.2 : 0) * (1 - centering);

    g.scale.setScalar(lerp(g.scale.x, baseScale * boost, 0.1));
    g.position.x = lerp(g.position.x, targetX, 0.1);
    g.visible = fade > 0.01;

    const mat = s.material as THREE.MeshStandardMaterial;
    mat.transparent = true;
    mat.opacity = fade;
    mat.depthWrite = fade > 0.5;

    // Drag (user-initiated) always allowed; idle auto-spin gated by reduced-motion.
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
      <directionalLight color={lights.dir} intensity={1.8} position={[-5, 4, 3]} />
      <directionalLight color={lights.rim} intensity={1.3} position={[5, -4, -3]} />
      <ambientLight color={lights.amb} intensity={0.75} />
      <mesh ref={sphere} rotation={[0, -Math.PI / 2, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={textures.map}
          bumpMap={textures.bump}
          bumpScale={0.3}
          roughness={0.72}
          metalness={0.05}
          emissive={new THREE.Color('#0a081a')}
        />
      </mesh>
    </group>
  );
}
