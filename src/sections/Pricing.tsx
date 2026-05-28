import { TIERS, FEATURES, MOBILE_CARDS, RECOMMENDED_COL, type Cell } from '../lib/content/pricing';

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

function CellView({ value, recommended }: { value: Cell; recommended: boolean }) {
  if (value === true)
    return (
      <span className={`check${recommended ? ' solid' : ''}`}>
        <Tick />
      </span>
    );
  if (value === false) return <span className="dash" aria-label="not included" />;
  return (
    <span style={{ color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.05em' }}>
      {value}
    </span>
  );
}

export function Pricing() {
  return (
    <section className="build" id="build">
      <div className="wrap">
        <div className="build-head">
          <div>
            <p className="label-mono rv">What we build</p>
            <h2 className="rv d1" style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 400, fontVariationSettings: "'opsz' 96", fontSize: 'clamp(36px,5.2vw,84px)', lineHeight: 1, letterSpacing: '-0.022em' }}>
              Pick the size <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--violet-soft)' }}>that fits.</em>
            </h2>
          </div>
          <p className="rv d2">
            Five options — from a one-page intro site up to a full online shop. Most small
            businesses pick <strong style={{ color: 'var(--paper)' }}>Brochure</strong>.
          </p>
        </div>

        {/* desktop comparison table */}
        <div className="ptable-wrap rv">
          <table className="ptable">
            <thead>
              <tr>
                <th className="feature-col">
                  <span className="label">Compare</span>
                  <div className="tname" style={{ color: 'var(--ink-30)', fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    What you get
                  </div>
                </th>
                {TIERS.map((t, i) => (
                  <th key={t.name} className={`tier${i === RECOMMENDED_COL ? ' recommended' : ''}`}>
                    {i === RECOMMENDED_COL && <span className="badge">Most popular</span>}
                    <div className="tname">{t.name}</div>
                    <div className="tprice">
                      {t.price && <b>{t.price}</b>}
                      {t.price ? ` · ${t.cadence}` : t.cadence}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURES.map((row) => (
                <tr key={row[0] as string}>
                  <td className="feature">{row[0]}</td>
                  {row.slice(1).map((cell, ci) => (
                    <td key={ci} className={ci === RECOMMENDED_COL ? 'recommended' : undefined}>
                      <CellView value={cell as Cell} recommended={ci === RECOMMENDED_COL} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td />
                {TIERS.map((t, i) => (
                  <td key={t.name} className={i === RECOMMENDED_COL ? 'recommended' : undefined}>
                    <a className="pickbtn" href="#launch">{t.pickLabel}</a>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        {/* mobile cards */}
        <div className="ptable-mobile-cards">
          {MOBILE_CARDS.map((c) => (
            <div key={c.num} className={`pmobile-card${c.recommended ? ' recommended' : ''}`}>
              {c.recommended && <span className="badge">Most popular</span>}
              <div className="pmobile-card-num">{c.num}</div>
              <h3 className="pmobile-card-name">{c.name}</h3>
              <div className="pmobile-card-price">
                {c.priceLabel && <small>{c.priceLabel}</small>}
                {c.price ? c.price : null} <span className="pmobile-card-cadence">{c.cadence}</span>
              </div>
              <ul className="pmobile-card-includes">
                {c.includes.map((inc) => (
                  <li key={inc}>{inc}</li>
                ))}
              </ul>
              <a className="pickbtn" href="#launch">{c.pickLabel}</a>
            </div>
          ))}
        </div>

        <div className="build-foot rv">
          <span>All builds include hosting, SSL, mobile-ready design and daily backups.</span>
          <span>Prices in £ · VAT not applicable</span>
        </div>
      </div>
    </section>
  );
}
