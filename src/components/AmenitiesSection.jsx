import React from 'react';
import skyRestaurant from '../assets/sky-restaurant.jpg';
import skyPool from '../assets/sky-pool.jpg';
import skyGym from '../assets/sky-gym.jpg';
import entrance from '../assets/hotel-entrance.jpg';
import lobby from '../assets/hotel-lobby.jpg';
import room from '../assets/hotel-room2.jpg';
import corridor from '../assets/hotel-corridor.jpg';
import terrace from '../assets/fnb.jpg';

// Same order as t.amenities.items
const IMAGES = [skyRestaurant, skyPool, skyGym, entrance, lobby, room, corridor, terrace];

export default function AmenitiesSection({ t }) {
  return (
    <section className="section services" id="services" data-screen-label="Hotel & Sky">
      <div className="page">
        <div className="section-head">
          <div className="word-mark" aria-hidden="true">CROWN</div>
          <div className="kicker en">{t.amenities.kicker}</div>
          <h2>{t.amenities.title}</h2>
        </div>
        <div className="amenity-grid">
          {t.amenities.items.map((label, i) => (
            <figure className={`amenity tone-${i % 5}`} key={label}>
              <img src={IMAGES[i]} alt={label} loading="lazy" />
              <figcaption>
                <span className="amenity-mark" aria-hidden="true" />
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
