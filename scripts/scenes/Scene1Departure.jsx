/* Scene 1 — Departure (hero)
   Star state: default, calm twinkling, slight drift.
*/

function Scene1Departure() {
  return (
    <section id="scene-1" className="scene s1" data-scene-index="0" data-screen-label="01 Departure">
      <div className="scene-inner">
        <h1 className="display-xl fraunces hero-headline">
          Most websites are
          <br />
          <span style={{ fontStyle: 'italic', fontVariationSettings: '"opsz" 144' }}>dead rocks.</span>
          <br />
          We build worlds.
        </h1>

        <div className="mono hero-meta">
          {'> cmd — camm design  /  est. 2026  /  london'}
        </div>
      </div>

      <div className="scroll-prompt mono" aria-hidden="true">
        <span>Begin</span>
        <span className="chev">↓</span>
      </div>
    </section>
  );
}

window.Scene1Departure = Scene1Departure;
