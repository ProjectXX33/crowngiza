import React from 'react';
import { FaUniversity, FaPills, FaShoppingCart, FaSwimmingPool } from 'react-icons/fa';

const ICONS = [
  <FaUniversity />,
  <FaPills />,
  <FaShoppingCart />,
  <FaSwimmingPool />,
];

export default function WhySection({ t }) {
  return (
    <section className="section" id="why" data-screen-label="Why Giza Crown">
      <div className="page">
        <div className="section-head">
          <div className="word-mark" aria-hidden="true">CROWN</div>
          <div className="kicker">{t.why.kicker}</div>
          <h2><span className="en">GIZA CROWN</span></h2>
        </div>
        <div className="why-grid">
          {t.why.cards.map((c, i) => (
            <div className={`why-card tone-${i}`} key={c.label}>
              <div className="ic">{ICONS[i]}</div>
              <div className="v">
                <span className="metric">
                  <span className="en">{c.value}</span>
                  <span className="small">{c.unit}</span>
                </span>
              </div>
              <div className="label">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
