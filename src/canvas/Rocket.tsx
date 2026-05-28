import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { journey } from '../lib/journey';
import { smoothstep, lerp } from '../lib/math';

const SMOKE = 28;

function softCircle(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.4, 'rgba(216,208,236,0.5)');
  g.addColorStop(1, 'rgba(200,168,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export function Rocket() {
  const root = useRef<THREE.Group>(null);

  const { group, smoke } = useMemo(() => {
    const group = new THREE.Group();
    const rocket = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({ color: '#eceaf5', metalness: 0.35, roughness: 0.45 });
    const accentMat = new THREE.MeshStandardMaterial({ color: '#c8a8ff', metalness: 0.3, roughness: 0.5 });

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.4, 1.5, 24), bodyMat);
    rocket.add(body);

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.6, 24), accentMat);
    nose.position.y = 1.05;
    rocket.add(nose);

    const win = new THREE.Mesh(
      new THREE.CircleGeometry(0.12, 24),
      new THREE.MeshStandardMaterial({ color: '#1a0f3d', metalness: 0.4, roughness: 0.3 }),
    );
    win.position.set(0, 0.25, 0.401);
    rocket.add(win);

    for (let i = 0; i < 3; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.34), accentMat);
      const a = (i / 3) * Math.PI * 2;
      fin.position.set(Math.sin(a) * 0.36, -0.62, Math.cos(a) * 0.36);
      fin.rotation.y = -a;
      rocket.add(fin);
    }

    const flame = new THREE.Mesh(
      new THREE.ConeGeometry(0.2, 0.6, 16),
      new THREE.MeshBasicMaterial({ color: '#d9c8ff', transparent: true, opacity: 0.9 }),
    );
    flame.position.y = -1.05;
    flame.rotation.x = Math.PI;
    flame.name = 'flame';
    rocket.add(flame);

    group.add(rocket);

    // smoke sprites (own materials for per-sprite opacity)
    const tex = softCircle();
    const smoke: THREE.Sprite[] = [];
    for (let i = 0; i < SMOKE; i++) {
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false });
      const sp = new THREE.Sprite(mat);
      group.add(sp);
      smoke.push(sp);
    }
    return { group, smoke };
  }, []);

  useFrame(() => {
    const g = root.current;
    if (!g) return;
    const p = journey.progress;
    const vis = p > 0.4 && p < 0.67;
    g.visible = vis;
    if (!vis) return;

    const bp = smoothstep(0.44, 0.62, p);
    g.position.y = lerp(-2.6, 2.4, bp);
    g.position.x = 0;
    g.scale.setScalar(lerp(0.7, 2.4, bp));

    const flame = (group.getObjectByName('flame') as THREE.Mesh) || null;
    if (flame) flame.scale.y = lerp(0.4, 1.3, bp);

    for (let i = 0; i < smoke.length; i++) {
      const t = i / smoke.length;
      const sp = smoke[i];
      const spread = (Math.sin(i * 91.7) * 0.5 + 0.5) * 0.9;
      sp.position.set((Math.sin(i * 12.9898) * spread) * t, -1.1 - t * 3.4, Math.cos(i * 4.13) * 0.2 * t);
      sp.scale.setScalar(lerp(0.3, 1.6, t));
      (sp.material as THREE.SpriteMaterial).opacity = bp * (1 - t) * 0.85;
    }
  });

  return <primitive ref={root} object={group} visible={false} />;
}
