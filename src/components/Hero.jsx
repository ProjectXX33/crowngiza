import React from 'react';
import { IconArrowDown } from './Icons.jsx';
import BrochureForm from './BrochureForm.jsx';
import { scrollToForm } from '../utils/scrollToForm.js';

export default function Hero({ t, onSent }) {
  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero-bg" />

      <div className="page">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker">{t.hero.kicker}</div>
            <h1>
              {t.hero.title[0]}<br />
              {t.hero.title[1]}<br />
              <span className="gold">{t.hero.gold}</span>
            </h1>
            <p className="sub">{t.hero.subtitle}</p>

            <div className="hero-stats">
              {t.hero.stats.map((s) => (
                <div className="stat-chip" key={s.label}>
                  <div>
                    <div className="v"><span className="en">{s.value}</span></div>
                    <div className="l">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hero-cta">
              <button type="button" className="btn btn-light" onClick={scrollToForm}>
                {t.hero.brochureCta}
              </button>
              <a href="#about" className="btn btn-ghost">
                <IconArrowDown width="16" height="16" />
                {t.hero.detailsCta}
              </a>
            </div>
          </div>

          <BrochureForm t={t} onSent={onSent} />
        </div>
      </div>
    </section>
  );
}
