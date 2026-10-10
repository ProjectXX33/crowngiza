// =============================================================================
// trafficSource — pull UTM params + referrer at first visit, persist them in
// sessionStorage so they survive a multi-step funnel, and classify the visit
// into a coarse `source` bucket (google, facebook, instagram, organic, …).
//
// Use:  import { getTrafficContext } from './trafficSource';
//       const ctx = getTrafficContext();
//       // ctx = { source, utm_source, utm_medium, utm_campaign, utm_term,
//       //         utm_content, referrer, landing_page, gclid, fbclid }
// =============================================================================

const STORAGE_KEY = 'gizacrown_traffic_ctx_v1';

function pickFirst(...values) {
  for (const v of values) {
    if (v && String(v).trim()) return String(v).trim();
  }
  return null;
}

function classifySource({ utm_source, referrer, gclid, fbclid }) {
  // 1) Explicit UTM beats everything.
  if (utm_source) {
    const s = utm_source.toLowerCase();
    if (s.includes('google'))    return 'google';
    if (s.includes('facebook') || s === 'fb')  return 'facebook';
    if (s.includes('instagram') || s === 'ig') return 'instagram';
    if (s.includes('tiktok'))    return 'tiktok';
    if (s.includes('youtube'))   return 'youtube';
    if (s.includes('twitter') || s === 'x')    return 'twitter';
    if (s.includes('linkedin'))  return 'linkedin';
    if (s.includes('whatsapp'))  return 'whatsapp';
    if (s.includes('email') || s.includes('newsletter')) return 'email';
    return utm_source;          // pass through unknown
  }
  // 2) Click IDs from ad platforms.
  if (gclid)  return 'google';
  if (fbclid) return 'facebook';
  // 3) Referrer hostname inspection.
  if (referrer) {
    try {
      const host = new URL(referrer).hostname.toLowerCase();
      if (host.includes('google.'))     return 'google';
      if (host.includes('facebook.') || host.includes('fb.com'))  return 'facebook';
      if (host.includes('instagram.'))  return 'instagram';
      if (host.includes('tiktok.'))     return 'tiktok';
      if (host.includes('youtube.'))    return 'youtube';
      if (host.includes('twitter.') || host.includes('x.com'))    return 'twitter';
      if (host.includes('linkedin.'))   return 'linkedin';
      if (host.includes('bing.'))       return 'bing';
      if (host.includes('whatsapp') || host.includes('wa.me'))    return 'whatsapp';
      // Direct from our own apps?
      if (host.includes('novaterra'))   return 'internal';
      return 'referral';
    } catch { /* malformed referrer URL */ }
  }
  // 4) No referrer and no UTM = direct/organic.
  return 'direct';
}

function readQueryParams() {
  if (typeof window === 'undefined') return {};
  const sp = new URLSearchParams(window.location.search);
  return {
    utm_source:   sp.get('utm_source'),
    utm_medium:   sp.get('utm_medium'),
    utm_campaign: sp.get('utm_campaign'),
    utm_term:     sp.get('utm_term'),
    utm_content:  sp.get('utm_content'),
    gclid:        sp.get('gclid'),
    fbclid:       sp.get('fbclid'),
  };
}

/**
 * Returns the cached traffic context. Captures + caches on first call.
 * Safe to call repeatedly — same answer for the whole session.
 */
export function getTrafficContext() {
  if (typeof window === 'undefined') return { source: 'unknown' };

  // Cached?
  try {
    const cached = window.sessionStorage.getItem(STORAGE_KEY);
    if (cached) return JSON.parse(cached);
  } catch { /* sessionStorage blocked — fall through */ }

  const q = readQueryParams();
  const referrer = document.referrer || null;
  const landing_page = window.location.href;
  const source = classifySource({
    utm_source: q.utm_source, referrer,
    gclid: q.gclid, fbclid: q.fbclid,
  });

  const ctx = {
    source,
    utm_source:   q.utm_source   || null,
    utm_medium:   q.utm_medium   || null,
    utm_campaign: q.utm_campaign || null,
    utm_term:     q.utm_term     || null,
    utm_content:  q.utm_content  || null,
    gclid:        q.gclid        || null,
    fbclid:       q.fbclid       || null,
    referrer,
    landing_page,
    captured_at:  new Date().toISOString(),
  };

  try { window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ctx)); }
  catch { /* ignore */ }

  return ctx;
}

/** Convenience for forms — flat object suitable for spreading into a Supabase payload. */
export function getTrafficFields() {
  const c = getTrafficContext();
  return {
    source:       c.source,
    utm_source:   c.utm_source,
    utm_medium:   c.utm_medium,
    utm_campaign: c.utm_campaign,
    utm_term:     c.utm_term,
    utm_content:  c.utm_content,
    gclid:        c.gclid,
    fbclid:       c.fbclid,
    referrer:     c.referrer,
    landing_page: c.landing_page,
  };
}
