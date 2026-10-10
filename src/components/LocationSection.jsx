import React from 'react';
import { IconPin, IconSend, IconWhatsApp } from './Icons.jsx';
import { scrollToForm } from '../utils/scrollToForm.js';
import { DISPLAY_PHONE, TEL_PHONE, MAP_URL, MAP_EMBED_URL } from '../config.js';
import { contactWhatsApp } from '../utils/whatsapp.js';

export default function LocationSection({ t }) {
  return (
    <section id="location" data-screen-label="Location & contact">
      <div className="page">
        <div className="location-wrap">
          <div className="map-bg" />

          <div className="location-grid">
            <div className="map-embed">
              <iframe
                title={t.location.title}
                src={MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="location-cards">
              <div className="loc-card">
                <div className="loc-head">
                  <div className="ic"><IconPin width="20" height="20" /></div>
                  <h4>{t.location.title}</h4>
                </div>
                <div className="loc-text">
                  {t.location.text.split('\n').map((line) => (
                    <React.Fragment key={line}>
                      {line}<br />
                    </React.Fragment>
                  ))}
                </div>
                <ul className="loc-nearby">
                  {t.location.nearby.map((n) => (
                    <li key={n}><IconPin width="13" height="13" />{n}</li>
                  ))}
                </ul>
                <a className="btn btn-navy" href={MAP_URL} target="_blank" rel="noreferrer">
                  <IconSend width="14" height="14" />
                  {t.location.mapCta}
                </a>
              </div>

              <div className="loc-card" id="contact">
                <div className="loc-head">
                  <div className="ic wa"><IconWhatsApp width="20" height="20" /></div>
                  <h4>{t.location.contactTitle}</h4>
                </div>
                <a className="loc-phone" href={`tel:${TEL_PHONE}`}>{DISPLAY_PHONE}</a>
                <div className="loc-actions">
                  <button type="button" className="btn btn-wa" onClick={() => contactWhatsApp(t)}>
                    <IconWhatsApp width="16" height="16" />
                    {t.location.whatsappCta}
                  </button>
                  <button type="button" className="btn btn-navy" onClick={scrollToForm}>
                    {t.location.contactCta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
