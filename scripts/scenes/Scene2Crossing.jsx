/* Scene 2 — Crossing (typographic composition, no streaks) */

function Scene2Crossing() {
  const Reveal = window.Reveal;
  const MonoLabel = window.MonoLabel;

  return (
    <section id="scene-2" className="scene s2" data-scene-index="1" data-screen-label="02 Crossing">
      <div className="scene-inner scene-narrow">
        <MonoLabel>{'> 001 / WHY'}</MonoLabel>

        <div className="s2-comp">
          <Reveal>
            <p className="s2-line s2-line-1">A thesis</p>
          </Reveal>

          <Reveal delay={1}>
            <h2 className="s2-line s2-line-2 fraunces">
              Most small sites
              <br />
              haven't been touched
              <br />
              in a <em>decade.</em>
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <div className="s2-divider" aria-hidden="true"></div>
          </Reveal>

          <Reveal delay={2}>
            <p className="s2-line s2-line-3">
              cmd is a London agency building the kind of sites brands ten times the size pay agencies for.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <h3 className="s2-line s2-line-4 fraunces">
              Your site should be <em>a place.</em>
              <br />
              Not a page.
            </h3>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

window.Scene2Crossing = Scene2Crossing;
