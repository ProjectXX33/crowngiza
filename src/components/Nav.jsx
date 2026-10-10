import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Logo } from './Icons.jsx';

export default function Nav({ lang, t, onLanguageChange }) {
  const nextLang = lang === 'ar' ? 'en' : 'ar';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  const drawer = (
    <div className={`nav-drawer ${open ? 'is-open' : ''}`} onClick={close}>
      <div className="nav-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="drawer-close"
          onClick={close}
          aria-label="Close menu"
        >
          <span /><span />
        </button>
        <div className="nav-links nav-links-mobile">
          {t.nav.map((n) => (
            <a key={n.href} href={n.href} onClick={close}>{n.label}</a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''} ${open ? 'nav-open' : ''}`}>
      <div className="nav-links nav-links-desktop">
        {t.nav.map((n) => (
          <a key={n.href} href={n.href}>{n.label}</a>
        ))}
      </div>

      <button
        type="button"
        className="lang-toggle"
        onClick={() => onLanguageChange(nextLang)}
        aria-label={`Switch to ${t.nextLabel}`}
      >
        {t.nextLabel}
      </button>

      <Logo />

      <button
        type="button"
        className={`burger ${open ? 'is-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span /><span /><span />
      </button>

      {typeof document !== 'undefined' && createPortal(drawer, document.body)}
    </nav>
  );
}
