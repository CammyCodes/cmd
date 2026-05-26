/* Scene 5 — The manifest (horizontal pricing cards, color-coded by tier) */

function Scene5Manifest() {
  const Reveal = window.Reveal;
  const MonoLabel = window.MonoLabel;

  /* Each tier carries a galaxy-accent hue along the violet spectrum,
     adding visual rhythm without breaking the monochrome discipline. */
  const tiers = [
    {
      num: '01',
      name: 'Landing page',
      desc: 'One page that does the job. Phone-ready in two weeks.',
      includes: ['Copy', 'Design', 'Build', 'Host'],
      price: '£500',
      cadence: 'From',
      accent: '#C8A8FF'   // lilac
    },
    {
      num: '02',
      name: 'Brochure',
      desc: '5–10 pages with contact form and gallery.',
      includes: ['CMS', 'Forms', 'Gallery', 'SEO'],
      price: '£1,200',
      cadence: 'From',
      accent: '#B79CFF'
    },
    {
      num: '03',
      name: 'Bookings',
      desc: 'Brochure plus a way for customers to book in.',
      includes: ['Calendar', 'Payments', 'Reminders'],
      price: '£1,500',
      cadence: 'From',
      accent: '#9B7BFF'   // primary
    },
    {
      num: '04',
      name: 'Online shop',
      desc: 'Up to 50 products, secure Stripe checkout.',
      includes: ['Stripe', 'Stock', 'Email', 'SSL'],
      price: '£2,500',
      cadence: 'From',
      accent: '#7E5FE0'
    },
    {
      num: '05',
      name: 'Custom build',
      desc: 'Anything bigger. Portals, calculators, integrations.',
      includes: ['Scoped per project'],
      price: 'Contact',
      cadence: 'Quote',
      accent: '#6A48E0'   // deep galaxy
    }
  ];

  return (
    <section id="scene-5" className="scene s5" data-scene-index="4" data-screen-label="05 Manifest">
      <div className="scene-inner">
        <MonoLabel>{'> 004 / THE MANIFEST'}</MonoLabel>

        <Reveal>
          <h2 className="display-l fraunces" style={{ maxWidth: '14ch' }}>
            What we build.
          </h2>
        </Reveal>

        <div className="s5-grid">
          {tiers.map((t, i) => (
            <Reveal key={t.num} delay={Math.min(4, i + 1)}>
              <div className="s5-card" style={{ '--card-accent': t.accent }}>
                <div className="s5-card-num">{'TIER ' + t.num}</div>
                <div className="s5-card-name fraunces">{t.name}</div>
                <p className="s5-card-desc">{t.desc}</p>
                <ul className="s5-card-includes">
                  {t.includes.map(inc => <li key={inc}>{inc}</li>)}
                </ul>
                <div className="s5-card-price fraunces">
                  <small>{t.cadence}</small>
                  {t.price}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="s5-footnote">
          {'> All sites include hosting, SSL, daily backups, and updates.'}
        </div>
      </div>
    </section>
  );
}

window.Scene5Manifest = Scene5Manifest;
