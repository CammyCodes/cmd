/* Scene 7 — Launch sequence (CTA).
   Stars surge. A shooting star guaranteed within 4s of entering the scene.
*/

function Scene7Launch() {
  const Reveal = window.Reveal;
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let triggered = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !triggered && !reduced) {
          triggered = true;
          // first shooting star within ~1.5s of arrival
          setTimeout(() => window.__starfield && window.__starfield.triggerShootingStar(), 1500);
          // second one within 4s (guarantee from brief)
          setTimeout(() => window.__starfield && window.__starfield.triggerShootingStar(), 3500);
        }
      });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="scene-7" className="scene s7" data-scene-index="6" data-screen-label="07 Launch">
      <div className="scene-inner">
        <Reveal>
          <h2 className="display-l fraunces launch-headline">
            Start the launch sequence.
          </h2>
        </Reveal>

        <Reveal delay={1}>
          <div className="launch-buttons">
            <a className="btn btn-large" href="https://wa.me/4400000000000" target="_blank" rel="noreferrer">
              {'> WhatsApp'}
            </a>
            <a className="btn btn-large" href="mailto:hello@camm.design">
              {'> Email'}
            </a>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="launch-meta">
            <span>{'> hello@camm.design'}</span>
            <span>{'> WhatsApp: +44 0000 000 000'}</span>
            <span>{'> London, UK'}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Scene7Launch = Scene7Launch;
