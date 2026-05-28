import { WORK } from '../lib/content/work';

export function Work() {
  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="section-head">
          <p className="label-mono rv">Recent work</p>
          <h2 className="rv d1">
            A few sites <em>we&rsquo;re proud of.</em>
          </h2>
          <p className="rv d2">Real businesses. Real results. Click through to see them live.</p>
        </div>

        <div className="work-grid">
          {WORK.map((w) => (
            <article className="work-card rv" key={w.name}>
              <div className="work-art">
                <div className="browser">
                  <div className="bar">
                    <i /><i /><i />
                    <div className="url" />
                  </div>
                  <div className="body">
                    <h4>{w.mockTitle}</h4>
                    <a className="cta">{w.mockCta}</a>
                    <div className="lines"><i /><i /><i /></div>
                  </div>
                </div>
              </div>
              <div className="work-text">
                <div className="meta">{w.meta}</div>
                <h3 className="serif">{w.name}</h3>
                <p className="what">{w.what}</p>
                <div className="result">{w.result}</div>
                <div>
                  <a
                    className="visit"
                    href={w.href}
                    {...(w.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  >
                    {w.external ? 'Visit live site →' : 'Back to top →'}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
