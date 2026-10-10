import { WHATSAPP_NUMBER } from '../config.js';

function trackGizaCrownSubmission() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'GizaCrownSubmission');
  }
}

export function openWhatsApp(text) {
  trackGizaCrownSubmission();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

export function buildBrochureMessage(t, { name, phone, activity }) {
  return t.whatsapp.brochureLines({ name, phone, activity }).join('\n');
}

export function contactWhatsApp(t) {
  openWhatsApp(t.whatsapp.contact);
}
