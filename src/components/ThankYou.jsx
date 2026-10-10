import React from 'react';

export default function ThankYou({ t, onBack }) {
  return (
    <section className="thank-you" dir={t.dir} lang={t.code}>
      <div className="thank-you-inner">
        <div className="thank-you-icon" aria-hidden="true">
          {/* simple checkmark badge */}
          <svg viewBox="0 0 64 64" width="72" height="72">
            <circle cx="32" cy="32" r="30" fill="rgba(255,255,255,0.06)" stroke="currentColor" strokeWidth="2" />
            <path d="M19 33 L29 43 L46 23" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1>{t.thankYou.title}</h1>
        <p>{t.thankYou.message}</p>
        <button type="button" className="btn btn-light" onClick={onBack}>
          {t.thankYou.backCta}
        </button>
      </div>
    </section>
  );
}
