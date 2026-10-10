import React from 'react';
import facade from '../assets/facade.jpg';
import atrium from '../assets/tower.jpg';
import plaza from '../assets/corner.jpg';
import elevators from '../assets/shops.jpg';

export default function RendersSection({ t }) {
  return (
    <section className="section renders" id="renders" data-screen-label="3D design">
      <div className="page">
        <div className="section-head">
          <div className="word-mark" aria-hidden="true">CROWN</div>
          <div className="kicker en">{t.renders.kicker}</div>
          <h2>{t.renders.title}</h2>
        </div>
        <div className="renders-grid">
          <figure className="render render--plan">
            <img src={facade} alt={t.renders.masterplan} loading="lazy" />
            <figcaption>{t.renders.masterplan}</figcaption>
          </figure>
          <figure className="render"><img src={plaza} alt="Giza Crown render" loading="lazy" /></figure>
          <figure className="render"><img src={atrium} alt="Giza Crown render" loading="lazy" /></figure>
          <figure className="render"><img src={elevators} alt="Giza Crown render" loading="lazy" /></figure>
        </div>
      </div>
    </section>
  );
}
