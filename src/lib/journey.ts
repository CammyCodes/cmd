// Mutable progress (0..1) for the Act I journey (hero → phone → rocket →
// ringing phone). Written by the Act1 ScrollTrigger onUpdate, read by R3F
// objects (planet, rocket) in useFrame. Outside React → no re-renders.
export const journey = { progress: 0 };

// Beat ranges along journey progress (single source of truth, shared by the
// DOM orchestration in Act1 and the 3D objects).
export const RANGES = {
  heroHold: [0.0, 0.07] as const,
  whiteIn: [0.07, 0.15] as const,
  beatA: [0.15, 0.32] as const, // phone-first: site folds into the phone
  whiteOut: [0.36, 0.44] as const, // white drains → dark for the rocket
  beatB: [0.44, 0.62] as const, // rocket lifts off + smoke, fills the screen
  whiteIn2: [0.62, 0.68] as const, // white flash back in
  beatC: [0.68, 0.86] as const, // ringing phone "Your next customer"
  exit: [0.86, 1.0] as const, // drain to dark for the rest of the page
};
