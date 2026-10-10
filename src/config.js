// Central configuration - edit these to customize the landing.
export const WHATSAPP_NUMBER = '201146337713'; // Country code + number, no spaces or +
export const DISPLAY_PHONE = '011 4633 7713';
export const TEL_PHONE = '+201146337713';
// Project location — used for the embedded map + "Get directions".
// Replace with the exact Google plus code / pin when available.
export const MAP_QUERY = 'Giza Crown Tower, El Hay El Italy Road, Hadayek October';
export const MAP_URL =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(MAP_QUERY);
export const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=' + encodeURIComponent(MAP_QUERY) + '&z=16&hl=ar&output=embed';

// ─── Novaterra Dashboard integration ───────────────────────────────────────────
// The landing form submits straight into the Novaterra Supabase `lead_ads`
// table. The anon (publishable) key is fine here because RLS restricts what
// anonymous clients can write — they can only INSERT new rows; they cannot
// read, update, or delete anything.
//
// Override via Vite env vars in production:
//   VITE_SUPABASE_URL              — same as the Novaterra dashboard
//   VITE_SUPABASE_PUBLISHABLE_KEY  — the project's anon/publishable key
//   VITE_LEAD_AD_SOURCE            — campaign tag (e.g. "gizacrown_landing")
export const SUPABASE_URL =
  import.meta.env?.VITE_SUPABASE_URL || 'https://supabase.novaterraegypt.com';
export const SUPABASE_ANON_KEY =
  import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || '';
export const LEAD_AD_SOURCE =
  import.meta.env?.VITE_LEAD_AD_SOURCE || 'gizacrown_landing';
