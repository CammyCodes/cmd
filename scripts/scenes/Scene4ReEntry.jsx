/* Scene 4 — Re-entry (flight plan: three T-minus panels) */

function Scene4ReEntry() {
  const Reveal = window.Reveal;
  const MonoLabel = window.MonoLabel;

  const panels = [
    {
      tMinus: 'T-14 DAYS',
      title: 'Brief',
      body: "We meet, look at what you've got, agree what success looks like, and quote it in writing. No vague hourly nonsense."
    },
    {
      tMinus: 'T-0',
      title: 'Liftoff',
      body: "We design and build. You see progress weekly. Two rounds of revisions are baked in."
    },
    {
      tMinus: 'T+30 DAYS',
      title: 'Orbit',
      body: "We host, maintain, and keep the site current. Your phone keeps ringing."
    }
  ];

  return (
    <section id="scene-4" className="scene s4" data-scene-index="3" data-screen-label="04 Flight Plan">
      <div className="scene-inner">
        <MonoLabel>{'> 003 / FLIGHT PLAN'}</MonoLabel>

        <Reveal>
          <h2 className="display-l fraunces" style={{ maxWidth: '14ch' }}>
            From brief to orbit.
          </h2>
        </Reveal>

        <div className="s4-grid">
          {panels.map((p, i) => (
            <Reveal key={p.title} delay={i + 1}>
              <div className="s4-panel">
                <span className="t-minus">{p.tMinus}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Scene4ReEntry = Scene4ReEntry;
