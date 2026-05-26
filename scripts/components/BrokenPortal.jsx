/* BrokenPortal — case study landing page.
   The hero is a jagged crack-shaped clip-path window into the other site.
   Inside the crack: a Placeholder for the case-study site mockup.
*/

function BrokenPortal({ project, onClose }) {
  const Placeholder = window.Placeholder;

  React.useEffect(() => {
    // Esc closes
    const onKey = (e) => { if (e.key === 'Escape') onClose && onClose(); };
    window.addEventListener('keydown', onKey);
    // Prevent body scroll behind
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="portal-page entering" role="dialog" aria-modal="true" aria-label={project.title}>
      <button className="portal-close" onClick={onClose} aria-label="Return to journey">
        ← Return to journey
      </button>

      <div className="portal-page-inner">
        <header className="portal-header">
          <div className="portal-dateline">
            {'> SYSTEM: ' + project.dateline}
          </div>
          <h1 className="portal-title">{project.title}</h1>
          <p className="portal-problem">{project.problem}</p>
        </header>

        {/* The crack — wrapped in animated galaxy */}
        <div className="broken-portal" role="img" aria-label={'Window into ' + project.title}>
          <div className="broken-portal-galaxy" aria-hidden="true"></div>
          <div className="broken-portal-particles" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i / 18) * Math.PI * 2;
              const dist = 24 + (i % 3) * 14;
              const dx = Math.cos(angle) * dist;
              const dy = Math.sin(angle) * dist;
              return (
                <span
                  key={i}
                  style={{
                    left: (50 + Math.cos(angle) * 38) + '%',
                    top: (50 + Math.sin(angle) * 38) + '%',
                    '--dx': dx + 'px',
                    '--dy': dy + 'px',
                    animationDelay: (i * 0.4) + 's',
                    animationDuration: (6 + (i % 4) * 1.5) + 's'
                  }}
                />
              );
            })}
          </div>
          <div className="broken-portal-edge"></div>
          <div className="broken-portal-shell">
            <div className="broken-portal-inner">
              <Placeholder
                id={project.placeholder.id}
                title={project.placeholder.title}
                prompt={project.placeholder.prompt}
                dimensions={project.placeholder.dimensions}
                motion={project.placeholder.motion}
              />
            </div>
          </div>
        </div>

        <div className="portal-meta-row">
          <span>{'> Tech:'} {project.tech.join(' · ')}</span>
          <span>{'> ' + project.location}</span>
          <span>{'> Year: ' + project.year}</span>
        </div>

        <div className="portal-sections">
          <div className="portal-section">
            <h4>{'> The brief'}</h4>
            <p>{project.brief}</p>
          </div>
          <div className="portal-section">
            <h4>{'> The build'}</h4>
            <p>{project.build}</p>
          </div>
          <div className="portal-section">
            <h4>{'> The result'}</h4>
            <p>{project.result}</p>
          </div>
        </div>

        <a className="btn btn-large" href={project.url || '#'} target="_blank" rel="noreferrer">
          Visit live site →
        </a>

        <div style={{ height: 24 }}></div>
      </div>
    </div>
  );
}

window.BrokenPortal = BrokenPortal;
