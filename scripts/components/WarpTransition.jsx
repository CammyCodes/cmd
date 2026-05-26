/* WarpTransition — 1.4s sequence per §6 of brief.
   Steps:
   0.0–0.15s : clicked planet (passed origin rect) scales up & fades
   0.0–0.6s  : starfield streak factor + speed ramp via burst
   0.4–0.8s  : white horizontal line draws across centre
   0.8–1.0s  : line widens into a flash (peaks ~30% white opacity)
   1.0–1.4s  : flash fades; portal page is mounted underneath
   reduced motion: 200ms opacity crossfade
*/

function WarpTransition({ origin, onMidpoint, onComplete }) {
  const lineRef = React.useRef(null);
  const flashRef = React.useRef(null);
  const ghostRef = React.useRef(null);

  React.useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      if (onMidpoint) setTimeout(onMidpoint, 100);
      if (onComplete) setTimeout(onComplete, 200);
      return;
    }

    // Trigger starfield burst
    if (window.__starfield) window.__starfield.triggerWarpBurst();

    // ghost-planet scale-up
    if (ghostRef.current && origin) {
      const g = ghostRef.current;
      g.style.transform = 'translate(-50%,-50%) scale(1)';
      g.style.opacity = '1';
      requestAnimationFrame(() => {
        g.style.transition = 'transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 600ms cubic-bezier(0.22,1,0.36,1)';
        g.style.transform = 'translate(-50%,-50%) scale(10)';
        g.style.opacity = '0';
      });
    }

    // 0.4s — draw line
    const t1 = setTimeout(() => {
      if (lineRef.current) {
        lineRef.current.style.transition = 'width 400ms cubic-bezier(0.22,1,0.36,1)';
        lineRef.current.style.width = '100vw';
      }
    }, 400);

    // 0.8s — line expands into flash + route swap moment
    const t2 = setTimeout(() => {
      if (onMidpoint) onMidpoint();
      if (flashRef.current) {
        flashRef.current.style.transition = 'opacity 200ms ease-out';
        flashRef.current.style.opacity = '0.3';
      }
      if (lineRef.current) {
        lineRef.current.style.transition = 'height 200ms cubic-bezier(0.22,1,0.36,1), opacity 200ms ease-out';
        lineRef.current.style.height = '100vh';
        lineRef.current.style.opacity = '0';
      }
    }, 800);

    // 1.0s — fade flash
    const t3 = setTimeout(() => {
      if (flashRef.current) {
        flashRef.current.style.transition = 'opacity 400ms ease-out';
        flashRef.current.style.opacity = '0';
      }
    }, 1000);

    // 1.4s — done
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1400);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, []);

  // Ghost-planet positioned at origin rect (if provided)
  const ghostStyle = origin ? {
    position: 'fixed',
    left: origin.x + 'px',
    top: origin.y + 'px',
    width: origin.size + 'px',
    height: origin.size + 'px',
    borderRadius: '50%',
    background: 'radial-gradient(circle at 30% 28%, #1f1f1f 0%, #0a0a0a 55%, #000 100%)',
    border: '1px solid #fff',
    transform: 'translate(-50%,-50%) scale(1)',
    opacity: 1,
    pointerEvents: 'none',
    transformOrigin: 'center'
  } : { display: 'none' };

  return (
    <div className="warp" aria-hidden="true">
      <div ref={ghostRef} style={ghostStyle}></div>
      <div ref={lineRef} className="warp-line" style={{ width: 0, height: 1, opacity: 1 }}></div>
      <div ref={flashRef} className="warp-flash"></div>
    </div>
  );
}

window.WarpTransition = WarpTransition;
