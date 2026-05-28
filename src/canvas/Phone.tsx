import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { heroState } from '../lib/heroState';
import { smoothstep, lerp } from '../lib/math';

/**
 * Procedural phone that the hero white-fill resolves into. For Phase 2 it
 * appears, settles, then fades at the very end of the hero track. Phase 3 will
 * keep it on-screen and hand it into the WHY beats (fold / spin / ring).
 */
export function Phone() {
  const group = useRef<THREE.Group>(null);
  const bodyMat = useRef<THREE.MeshStandardMaterial>(null);
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const p = heroState.progress;
    const appear = smoothstep(0.56, 0.78, p) * (1 - smoothstep(0.88, 1.0, p));
    g.visible = appear > 0.005;
    if (!g.visible) return;

    const wide = state.size.width > 900;
    g.scale.setScalar(lerp(0.72, 1, appear) * (wide ? 1 : 0.86));
    g.rotation.y = lerp(-0.5, 0, appear);
    g.position.y = lerp(-0.45, 0, appear);

    if (bodyMat.current) {
      bodyMat.current.transparent = true;
      bodyMat.current.opacity = appear;
    }
    if (screenMat.current) {
      screenMat.current.transparent = true;
      screenMat.current.opacity = appear;
      screenMat.current.emissiveIntensity = 0.5 * appear;
    }
  });

  return (
    <group ref={group} visible={false}>
      <RoundedBox args={[1.05, 2.1, 0.14]} radius={0.13} smoothness={6}>
        <meshStandardMaterial ref={bodyMat} color="#0c0a14" roughness={0.32} metalness={0.65} />
      </RoundedBox>
      {/* screen */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[0.9, 1.9]} />
        <meshStandardMaterial
          ref={screenMat}
          color="#11101c"
          emissive={new THREE.Color('#5a3df0')}
          emissiveIntensity={0.5}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}
