import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { journey } from '../lib/journey';
import { smoothstep, lerp } from '../lib/math';

const PUFFS = 90;
const VISIBLE: [number, number] = [0.42, 0.7];
const hash = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

function softCircle(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,0.95)');
  g.addColorStop(0.35, 'rgba(214,205,245,0.55)');
  g.addColorStop(1, 'rgba(155,123,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export function Rocket() {
  const root = useRef<THREE.Group>(null);

  const { group, puffs, flameGlow } = useMemo(() => {
    const group = new THREE.Group();
    const rocket = new THREE.Group();
    rocket.name = 'rocket';

    const body = new THREE.MeshStandardMaterial({ color: '#f1eff8', metalness: 0.18, roughness: 0.32 });
    const accent = new THREE.MeshStandardMaterial({ color: '#9b7bff', metalness: 0.2, roughness: 0.4 });
    const dark = new THREE.MeshStandardMaterial({ color: '#15121f', metalness: 0.3, roughness: 0.5 });

    const hull = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.34, 1.7, 32), body);
    rocket.add(hull);

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.85, 32), body);
    nose.position.y = 1.27;
    rocket.add(nose);

    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.345, 0.345, 0.09, 32), accent);
    band.position.y = 0.45;
    rocket.add(band);

    const win = new THREE.Mesh(new THREE.CircleGeometry(0.1, 24), accent);
    win.position.set(0, 0.2, 0.35);
    rocket.add(win);

    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.46), accent);
      const a = (i / 4) * Math.PI * 2;
      fin.position.set(Math.sin(a) * 0.32, -0.78, Math.cos(a) * 0.32);
      fin.rotation.y = -a;
      fin.rotation.x = -0.12;
      rocket.add(fin);
    }

    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.26, 0.22, 24), dark);
    nozzle.position.y = -0.96;
    rocket.add(nozzle);

    group.add(rocket);

    // exhaust glow (bright additive sprite at the nozzle)
    const tex = softCircle();
    const flameGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: tex, color: '#d9c8ff', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    flameGlow.position.y = -1.2;
    rocket.add(flameGlow);

    // billowing smoke plume (additive puffs that expand to fill the screen)
    const puffs: THREE.Sprite[] = [];
    for (let i = 0; i < PUFFS; i++) {
      const mat = new THREE.SpriteMaterial({
        map: tex,
        color: i % 5 === 0 ? '#c8a8ff' : '#ffffff',
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sp = new THREE.Sprite(mat);
      group.add(sp);
      puffs.push(sp);
    }
    return { group, puffs, flameGlow };
  }, []);

  useFrame(() => {
    const g = root.current;
    if (!g) return;
    const p = journey.progress;
    const vis = p > VISIBLE[0] && p < VISIBLE[1];
    g.visible = vis;
    if (!vis) return;

    const bp = smoothstep(0.46, 0.66, p); // 0..1 within the beat

    // rocket rises and grows, then climbs out of frame
    const rocket = group.getObjectByName('rocket') as THREE.Group;
    if (rocket) {
      rocket.position.y = lerp(-1.8, 4.2, bp);
      rocket.scale.setScalar(lerp(0.8, 1.5, smoothstep(0, 0.5, bp)));
    }
    flameGlow.scale.setScalar(lerp(0.9, 2.4, bp));
    (flameGlow.material as THREE.SpriteMaterial).opacity = smoothstep(0.05, 0.25, bp) * (1 - smoothstep(0.8, 1, bp)) * 0.55;

    // smoke: a cloud that expands up and out to fill the viewport as bp grows
    const cloud = smoothstep(0.03, 0.85, bp);
    const fade = smoothstep(0.0, 0.25, bp) * (1 - smoothstep(0.82, 1.0, bp));
    for (let i = 0; i < puffs.length; i++) {
      const sx = hash(i) * 2 - 1;
      const rise = hash(i + 7);
      const sc = hash(i + 3);
      const sp = puffs[i];
      const x = sx * lerp(0.15, 4.8, cloud) * (0.35 + rise * 0.9);
      const y = -1.2 + rise * lerp(0.4, 5.6, cloud) + Math.sin(i) * 0.15;
      const z = (hash(i + 11) - 0.5) * 0.6;
      sp.position.set(x, y, z);
      sp.scale.setScalar(lerp(0.5, 2.6, sc) * lerp(0.6, 2.7, cloud));
      (sp.material as THREE.SpriteMaterial).opacity = fade * (0.18 + 0.4 * (1 - rise));
    }
  });

  return <primitive ref={root} object={group} visible={false} />;
}
