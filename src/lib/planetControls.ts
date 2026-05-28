// Module-level mutable controller for the planet's drag rotation.
// Kept outside React so pointermove updates never trigger re-renders;
// the Planet mesh reads these targets each frame in useFrame.
export const planetControls = {
  targetRotX: 0,
  targetRotY: 0,
  lastInteraction: 0,
  dragging: false,
  start() {
    this.dragging = true;
  },
  drag(dx: number, dy: number) {
    this.targetRotY += dx * 0.006;
    this.targetRotX += dy * 0.006;
    // Constrain X so the planet never flips fully over.
    const lim = Math.PI / 2.2;
    this.targetRotX = Math.max(-lim, Math.min(lim, this.targetRotX));
    this.lastInteraction = performance.now();
  },
  end() {
    this.dragging = false;
    this.lastInteraction = performance.now();
  },
};
