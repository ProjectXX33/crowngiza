import React from 'react';
import { scrollToForm } from '../utils/scrollToForm.js';

export default function PaymentBanner({ t }) {
  const p = t.payment;
  return (
    <section id="payment" data-screen-label="Prices">
      <div className="page">
        <div className="pay">
          <h3 className="pay-title">{p.title}</h3>
          <p className="pay-sub">{p.sub}</p>
          <div className="pay-notes">
            {p.points.map((n) => <span key={n}>{n}</span>)}
          </div>
          <button type="button" className="btn btn-light pay-cta" onClick={scrollToForm}>
            {p.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
