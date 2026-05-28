// The hero's text block, shared by the static Hero (reduced-motion) and the
// cinematic HeroCinematic.
export function HeroCopy() {
  return (
    <div>
      <p className="label-mono">Camm Design · London · Est. 2026</p>
      <h1 className="serif">
        <span className="line"><span>Most websites are</span></span>
        <span className="line"><span><em>dead rocks.</em></span></span>
        <span className="line"><span>We build worlds.</span></span>
      </h1>
      <p className="hero-lede">
        A London studio that designs, builds and hosts websites for small businesses. Fast, clear,
        and made to bring in real customers — not just sit there looking pretty.
      </p>
      <div className="hero-cta">
        <a className="btn btn-primary" href="#launch">
          Start a project <span className="arr">→</span>
        </a>
        <a className="btn btn-ghost" href="#work">
          See our work
        </a>
      </div>
      <div className="hero-meta">
        <span className="chip">Based in London</span>
        <span className="chip">Reply within a day</span>
        <span className="chip">Free first call</span>
      </div>
    </div>
  );
}
