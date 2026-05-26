/* Scene 3 — Encountering (pinned horizontal planet scroll).
   - Outer section: 400vh tall (drives horizontal travel)
   - .s3-pin: sticky top:0, height:100vh
   - .s3-track: translates X based on scroll progress within section
   - Hover / scroll-centered planet grows from 96 → 480px diameter
   - Click → onPlanetClick(project, originRect)
*/

function Scene3Encountering({ projects, onPlanetClick }) {
  const MonoLabel = window.MonoLabel;
  const sectionRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const planetRefs = React.useRef([]);
  const [activeIdx, setActiveIdx] = React.useState(-1);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isMobile = () => window.innerWidth < 720;

    let raf = 0;
    const update = () => {
      if (isMobile()) {
        setProgress(0);
        setActiveIdx(-1);
        return;
      }
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = section.offsetHeight - vh;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);

      const trackWidth = track.scrollWidth;
      const viewWidth = window.innerWidth;
      const maxX = Math.max(0, trackWidth - viewWidth);
      track.style.transform = 'translate3d(' + (-p * maxX) + 'px, 0, 0)';

      const center = viewWidth / 2;
      let nearest = -1;
      let nearestDist = Infinity;
      planetRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const d = Math.abs(cx - center);
        if (d < nearestDist) { nearestDist = d; nearest = i; }
      });
      // Active when section is pinned and a planet is reasonably near centre
      if (rect.top < vh * 0.5 && rect.bottom > vh * 0.5 && nearestDist < viewWidth * 0.4) {
        setActiveIdx(nearest);
      } else {
        setActiveIdx(-1);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [projects.length]);

  // diameters scale with active state
  const handleClick = (project, i) => {
    const el = planetRefs.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const origin = { x: r.left + r.width / 2, y: r.top + r.height / 2, size: r.width };
    onPlanetClick(project, origin);
  };

  return (
    <section ref={sectionRef} id="scene-3" className="s3" data-scene-index="2" data-screen-label="03 Encountering">
      <div className="s3-pin">
        <div className="s3-header">
          <MonoLabel>{'> 002 / RECENT TRANSMISSIONS'}</MonoLabel>
          <h2 className="display-m fraunces" style={{ maxWidth: '20ch', color: 'var(--ink-20)' }}>
            Three planets. Click one to land.
          </h2>
        </div>

        <div ref={trackRef} className={'s3-track' + (activeIdx >= 0 ? ' has-active' : '')}>
          {projects.map((p, i) => (
            <PlanetCard
              key={p.id}
              project={p}
              index={i}
              active={activeIdx === i}
              refCb={(el) => planetRefs.current[i] = el}
              onClick={() => handleClick(p, i)}
            />
          ))}
          <div className="s3-track-end" aria-hidden="true"></div>
        </div>

        <div className="s3-progress" aria-hidden="true">
          <span>{'> Transit'}</span>
          <div className="s3-progress-bar">
            <span style={{ width: (progress * 100) + '%' }}></span>
          </div>
          <span>{String(Math.round(progress * 100)).padStart(3, '0') + '%'}</span>
        </div>
      </div>
    </section>
  );
}

function PlanetCard({ project, index, active, refCb, onClick }) {
  return (
    <div
      ref={refCb}
      className={'planet' + (active ? ' active' : '')}
      data-planet-id={project.id}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      aria-label={'Enter ' + project.title}
    >
      <div className="planet-orb" style={project.surfaceStyle || {}}></div>

      <div className="planet-label">
        <div className="mono" style={{ color: 'var(--ink-20)', marginBottom: 8 }}>
          {'> ' + project.dateline}
        </div>
        <div className="fraunces" style={{ fontSize: 26, fontVariationSettings: '"opsz" 48' }}>
          {project.title}
        </div>
      </div>

      <div className="enter-affordance">
        {'Enter →'}
      </div>
    </div>
  );
}

window.Scene3Encountering = Scene3Encountering;
