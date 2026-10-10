import React from 'react';
import { FaMapMarkedAlt, FaLandmark, FaTrain, FaRoad } from 'react-icons/fa';

const ICONS = [
  <FaMapMarkedAlt />,
  <FaLandmark />,
  <FaTrain />,
  <FaRoad />,
];

export default function InvestSection({ t }) {
  return (
    <section id="about" data-screen-label="Why Giza Crown">
      <div className="page">
        <div className="invest">
          <div className="invest-img" role="img" aria-label="Giza Crown" />
          <div className="invest-content">
            <div className="invest-kicker">{t.invest.kicker}</div>
            <h2 className="invest-title" dir={t.dir}>
              <span>{t.invest.title}</span>
              <br />
              <span className="brand-line" dir={t.dir}>
                <bdi className="brand-name">GIZA CROWN</bdi>
                <span className="question-mark">{t.code === 'ar' ? '؟' : '?'}</span>
              </span>
            </h2>
            <p className="invest-text">{t.invest.text}</p>
            <ul className="invest-list">
              {t.invest.items.map((text, i) => (
                <li key={text}>
                  <span className="ic">{ICONS[i]}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
