// =============================================================================
// Meta Pixel events. Pixel 1093528646071515 is shared across Novaterra
// landings, so every event carries content_name = 'Giza Crown' and the custom events
// are prefixed with 'GizaCrown' to keep projects apart in Events Manager.
//
//   Form submitted  → standard `Lead`    + custom `GizaCrownSubmission`
//   WhatsApp click  → standard `Contact` + custom `GizaCrownWhatsAppClick`
//   Phone click     → standard `Contact` + custom `GizaCrownPhoneClick`
// =============================================================================
const PROJECT = 'Giza Crown';

function fbq(...args) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq(...args);
  }
}

export function trackLead({ activity } = {}) {
  const params = { content_name: PROJECT };
  if (activity) params.content_category = activity;
  fbq('track', 'Lead', params);
  fbq('trackCustom', 'GizaCrownSubmission', params);
}

export function trackContact(method) {
  const params = { content_name: PROJECT, contact_method: method };
  fbq('track', 'Contact', params);
  fbq('trackCustom', method === 'phone' ? 'GizaCrownPhoneClick' : 'GizaCrownWhatsAppClick', params);
}
