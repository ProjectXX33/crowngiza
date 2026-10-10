import React from 'react';
import segmentsImg from '../assets/segments.png';
import samcoImg from '../assets/samco.png';
import amycoImg from '../assets/amyco.png';
import novaterraImg from '../assets/novaterra.png';

export default function DeveloperSection({ t }) {
  const d = t.developer;
  return (
    <section className="section developer" id="developer" data-screen-label="Developer">
      <div className="page">
        <div className="section-head">
          <div className="word-mark" aria-hidden="true">CROWN</div>
          <div className="partner-logos">
            <img src={novaterraImg} alt="Nova Terra" className="partner-nt" />
            <span className="partner-x" aria-hidden="true">×</span>
            <img src={segmentsImg} alt="Segments Development" className="dev-logo" />
            <img src={samcoImg} alt="SAMCO" className="dev-logo" />
            <img src={amycoImg} alt="AMYCO Construction" className="dev-logo" />
          </div>
          <div className="partner-note">
            <span className="tag tag-gold">{d.partnerKicker}</span>
            {d.partnerText}
          </div>
          <div className="kicker">{d.kicker}</div>
          <h2>{d.title}</h2>
          <p className="dev-intro">{d.intro}</p>
        </div>

        {d.stats.length > 0 && <div className="dev-stats">
          {d.stats.map((s) => (
            <div className="dev-stat" key={s.label}>
              <div className="v"><span className="en">{s.value}</span></div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>}

        <div className={`dev-cols ${d.projects.length ? '' : 'dev-cols--single'}`}>
          <div className="dev-col">
            <h3>{d.foundersTitle}</h3>
            {d.founders.map((f) => (
              <div className="dev-card" key={f.name}>
                <div className="dev-avatar" aria-hidden="true">{f.name.charAt(0)}</div>
                <div>
                  <h4>{f.name}</h4>
                  <p>{f.bio}</p>
                </div>
              </div>
            ))}
          </div>
          {d.projects.length > 0 && (
          <div className="dev-col">
            <h3>{d.projectsTitle}</h3>
            {d.projects.map((p) => (
              <div className={`dev-card dev-project ${p.current ? 'is-current' : ''}`} key={p.name}>
                <div>
                  <h4>
                    <bdi className="en">{p.name}</bdi>
                    <span className="tag">{p.type}</span>
                    {p.current && <span className="tag tag-gold">{d.currentLabel}</span>}
                  </h4>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
