import { ColorblindToggle } from './ColorblindToggle';

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">
              <span className="cursor" />
              cmd — Camm Design
            </div>
            <div className="foot-tag">Websites that earn their keep.</div>
            <div>
              <ColorblindToggle />
            </div>
          </div>
          <div className="foot-col">
            <h4>Studio</h4>
            <ul>
              <li><a href="#why">Why us</a></li>
              <li><a href="#how">How it works</a></li>
              <li><a href="#build">Pricing</a></li>
              <li><a href="#work">Work</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Talk to us</h4>
            <ul>
              <li><a href="mailto:hello@camm.design">hello@camm.design</a></li>
              <li><a href="https://wa.me/447404922567">WhatsApp</a></li>
              <li><a href="#launch">Get a quote</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>© 2026 cmd — Camm Design · London</span>
          <a className="signature" href="#top">Designed by Camm</a>
        </div>
      </div>
    </footer>
  );
}
