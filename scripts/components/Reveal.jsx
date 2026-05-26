/* Reveal — entrance wrapper.
   The animation timeline is unreliable in some iframe sandboxes (paused clock,
   stuck transitions, fill:'both' pinning to keyframe 0). We optimistically run
   a CSS-transition-based entrance, but content is visible by default so it
   degrades gracefully when the clock is paused.
*/

const __revealRegistry = [];
let __revealRafScheduled = false;

const DELAY_MS = { 1: 100, 2: 250, 3: 400, 4: 550 };

function __playReveal(entry) {
  const el = entry.el;
  if (el.dataset.revealed === '1') return;
  el.dataset.revealed = '1';
  // Set the "from" state inline, then on the next frame flip to "to" with a transition.
  // If the clock is paused, content remains visible because the CSS default is opacity:1.
  try {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1) ' + (entry.delay || 0) + 'ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ' + (entry.delay || 0) + 'ms';
    // Force reflow then flip
    void el.offsetWidth;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    // Failsafe: ensure inline opacity ends up at 1 even if transition stalls
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 1500 + (entry.delay || 0));
  } catch (e) { /* swallow */ }
}

function __revealTick() {
  __revealRafScheduled = false;
  const vh = window.innerHeight;
  for (let i = __revealRegistry.length - 1; i >= 0; i--) {
    const entry = __revealRegistry[i];
    if (!entry.el || !entry.el.isConnected) {
      __revealRegistry.splice(i, 1);
      continue;
    }
    const r = entry.el.getBoundingClientRect();
    const visible = r.top < vh * 0.92 && r.bottom > 0;
    if (visible) {
      __playReveal(entry);
      __revealRegistry.splice(i, 1);
    }
  }
}

function __revealOnScroll() {
  if (__revealRafScheduled) return;
  __revealRafScheduled = true;
  requestAnimationFrame(__revealTick);
}

if (typeof window !== 'undefined' && !window.__revealInit) {
  window.__revealInit = true;
  window.addEventListener('scroll', __revealOnScroll, { passive: true });
  window.addEventListener('resize', __revealOnScroll);
  let polls = 0;
  const poll = setInterval(() => {
    __revealTick();
    polls++;
    if (polls > 30 || __revealRegistry.length === 0) clearInterval(poll);
  }, 120);
}

function Reveal({ children, delay, as }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const entry = { el, delay: DELAY_MS[delay] || 0 };
    __revealRegistry.push(entry);
    __revealOnScroll();
    return () => {
      const i = __revealRegistry.indexOf(entry);
      if (i >= 0) __revealRegistry.splice(i, 1);
    };
  }, []);

  const Tag = as || 'div';
  return <Tag ref={ref} className="reveal">{children}</Tag>;
}

window.Reveal = Reveal;
