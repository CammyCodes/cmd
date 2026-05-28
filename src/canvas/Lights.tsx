import { useStore } from '../lib/store';

/** Scene-root lights (shared by planet + rocket), tritanopia-aware. */
export function Lights() {
  const tritanopia = useStore((s) => s.tritanopia);
  const L = tritanopia
    ? { key: '#bff9ff', rim: '#00e5ff', fill: '#80f7ff', amb: '#0c343a' }
    : { key: '#efe8ff', rim: '#9b7bff', fill: '#c8a8ff', amb: '#2a2440' };
  return (
    <>
      <directionalLight color={L.key} intensity={3.2} position={[-3, 3, 5]} />
      <directionalLight color={L.rim} intensity={1.8} position={[5, -4, -3]} />
      <directionalLight color={L.fill} intensity={1.1} position={[3, 2, 2]} />
      <ambientLight color={L.amb} intensity={1.0} />
    </>
  );
}
