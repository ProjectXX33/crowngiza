import React from 'react';
import { scrollToForm } from '../utils/scrollToForm.js';
import retail from '../assets/retail.jpg';
import fnb from '../assets/foodcourt.jpg';
import hotel from '../assets/hotel-room.jpg';
import hypermarket from '../assets/hypermarket.jpg';
import services from '../assets/services.jpg';

const IMAGES = { retail, fnb, hotel, hypermarket, services };

export default function UnitsSection({ t }) {
  return (
    <section className="units" id="units" data-screen-label="Units">
      <div className="page">
        <div className="section-head section-head--dark">
          <div className="word-mark" aria-hidden="true">CROWN</div>
          <div className="kicker">{t.units.kicker}</div>
          <h2>{t.units.title}</h2>
        </div>
        <div className="unit-grid">
          {t.units.items.map((u) => (
            <article className={`unit unit--${u.key}`} key={u.key}>
              <div className="unit-img">
                <img src={IMAGES[u.key]} alt={u.name} loading="lazy" />
                <span className="unit-floors">{u.floors}</span>
              </div>
              <div className="unit-body">
                <h3>{u.name}</h3>
                <p>{u.text}</p>
              </div>
            </article>
          ))}
          <article className="unit unit--cta">
            <div className="unit-body">
              <h3>{t.units.cta}</h3>
              <button type="button" className="btn btn-light" onClick={scrollToForm}>
                {t.hero.brochureCta}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
