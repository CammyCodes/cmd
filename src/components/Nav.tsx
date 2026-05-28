import { useEffect, useState } from 'react';

export function Nav() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > last + 8 && y > 200) setHidden(true);
      else if (y < last - 8) setHidden(false);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${hidden ? ' hidden' : ''}`}>
      <a href="#top" className="brand">
        <span className="cursor" />
        cmd
      </a>
      <div className="nav-links">
        <a href="#why">Why us</a>
        <a href="#how">How it works</a>
        <a href="#build">Pricing</a>
        <a href="#work">Work</a>
      </div>
      <a href="#launch" className="cta">
        Get a quote
      </a>
    </nav>
  );
}
