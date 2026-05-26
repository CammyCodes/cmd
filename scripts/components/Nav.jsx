function Nav({ onNavigate }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleClick = (target) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (onNavigate) onNavigate(target);
  };

  const links = [
    { label: 'Work', target: 'scene-3' },
    { label: 'Services', target: 'scene-5' },
    { label: 'Approach', target: 'scene-4' },
    { label: 'Contact', target: 'scene-7' }
  ];

  return (
    <React.Fragment>
      <header className="nav" role="banner">
        <a href="#main" className="wordmark" aria-label="cmd home">
          <span className="cursor" aria-hidden="true"></span>
          <span>cmd</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {links.map(l => (
            <a key={l.target} href={'#' + l.target} className="nav-link" onClick={handleClick(l.target)}>
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className="nav-menu-btn"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          Menu
        </button>
      </header>

      <div className={'menu-overlay' + (menuOpen ? ' open' : '')} role="dialog" aria-hidden={!menuOpen}>
        <button className="nav-menu-btn close" onClick={() => setMenuOpen(false)} aria-label="Close menu">Close</button>
        {links.map(l => (
          <a key={l.target} href={'#' + l.target} onClick={handleClick(l.target)}>{l.label}</a>
        ))}
      </div>
    </React.Fragment>
  );
}

window.Nav = Nav;
