import React from 'react';
import { IconWhatsApp } from './Icons.jsx';
import { contactWhatsApp } from '../utils/whatsapp.js';

export default function FloatingWhatsApp({ t }) {
  return (
    <button
      type="button"
      className="float-wa"
      onClick={() => contactWhatsApp(t)}
      title={t.location.contactCta}
      aria-label={t.location.contactCta}
    >
      <IconWhatsApp width="30" height="30" />
    </button>
  );
}
