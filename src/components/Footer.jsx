import React from 'react';
import { Logo } from './Icons.jsx';
import segmentsImg from '../assets/segments.png';
import novaterraImg from '../assets/novaterra-white.png';

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="page">
        <div className="footer-top">
          <Logo />
          <div className="footer-nav">
            {t.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
          </div>
          <div className="footer-partners">
            <div className="footer-dev">
              <span className="small">{t.footer.marketedBy}</span>
              <img src={novaterraImg} alt="Nova Terra" className="nt-logo" />
            </div>
            <span className="footer-x" aria-hidden="true">×</span>
            <div className="footer-dev">
              <span className="small">{t.footer.partner}</span>
              <img src={segmentsImg} alt="Segments Development" />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>{t.footer.copyright}</div>
          <div className="footer-tags">
            {t.footer.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
