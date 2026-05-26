/* Scene 6 — Crew (agency framing) */

function Scene6Crew() {
  const Reveal = window.Reveal;
  const MonoLabel = window.MonoLabel;

  return (
    <section id="scene-6" className="scene s6" data-scene-index="5" data-screen-label="06 Crew">
      <div className="scene-inner scene-narrow" style={{ textAlign: 'center' }}>
        <MonoLabel>{'> 005 / CREW'}</MonoLabel>

        <Reveal>
          <p className="display-m fraunces" style={{ marginBottom: 32 }}>
            A studio. <span className="accent-violet" style={{ fontStyle: 'italic' }}>Not an agency stack.</span>
          </p>
        </Reveal>
        <Reveal delay={2}>
          <p className="display-m fraunces" style={{ color: 'var(--ink-20)', maxWidth: '30ch' }}>
            cmd is a London agency. Every member of the team — design, build, words, support — is based in London.
            No offshore handoffs. No project-manager middlemen. The people who pitch the work do the work.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

window.Scene6Crew = Scene6Crew;
