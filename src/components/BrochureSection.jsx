import React from 'react';
import {
  IconCalendar, IconChart, IconDoc, IconPin,
} from './Icons.jsx';
import { scrollToForm } from '../utils/scrollToForm.js';
import brochureImg from '../assets/facade.jpg';

const ICONS = [
  <IconCalendar width="22" height="22" />,
  <IconChart width="22" height="22" />,
  <IconDoc width="22" height="22" />,
  <IconPin width="22" height="22" />,
];

export default function BrochureSection({ t }) {
  return (
    <section id="brochure" data-screen-label="Brochure">
      <div className="page">
        <div className="brochure">
          <div className="brochure-image-wrapper">
            <img src={brochureImg} alt="Giza Crown Brochure" className="b-img-real" />
          </div>

          <div className="brochure-mid">
            <h3>{t.brochure.title}</h3>
            <div className="brochure-feats">
              {t.brochure.feats.map((label, i) => (
                <div className="feat" key={label}>
                  <div className="ic">{ICONS[i]}</div>
                  <div className="lbl">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="brochure-cta">
            <button type="button" className="btn btn-navy" onClick={scrollToForm}>
              {t.brochure.cta}
            </button>
            <div className="sub">{t.brochure.sub}</div>
            <div className="small-actions">
              <button type="button" onClick={scrollToForm}>
                {t.brochure.whatsapp}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
