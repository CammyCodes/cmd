/* Scene 8 — Orbit (footer) */

function Scene8Orbit() {
  const SignatureMark = window.SignatureMark;

  return (
    <footer id="scene-8" className="scene s8" data-scene-index="7" data-screen-label="08 Orbit">
      <div className="scene-inner footer-inner">
        <div className="s8-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'inline-block', width: 9, height: 14, background: '#fff' }}></span>
              <span style={{ fontFamily: 'Fraunces, serif', letterSpacing: '-0.02em', fontSize: 20, fontStyle: 'italic' }}>cmd</span>
            </div>
            <p className="footer-tagline">From command line to liftoff.</p>
          </div>

          <div>
            <h4>Pages</h4>
            <ul>
              <li><a href="#scene-3">Work</a></li>
              <li><a href="#scene-5">Services</a></li>
              <li><a href="#scene-4">Approach</a></li>
              <li><a href="#scene-7">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4>Elsewhere</h4>
            <ul>
              <li><a href="#" target="_blank" rel="noreferrer">TikTok</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="#" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 cmd — Camm Design</span>
          <SignatureMark />
        </div>

        <div className="footer-meta">
          {'> Privacy  /  Terms'}
        </div>
      </div>
    </footer>
  );
}

window.Scene8Orbit = Scene8Orbit;
