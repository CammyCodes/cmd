// Mutable hero-cinematic scroll progress (0..1), written by the hero
// ScrollTrigger's onUpdate and read by R3F objects in useFrame. Kept outside
// React so scroll updates never trigger re-renders.
export const heroState = { progress: 0 };
