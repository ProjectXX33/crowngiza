// =============================================================================
// submitLead — POST a form submission straight into Novaterra Supabase
// (`lead_ads` table) via the REST API. No supabase-js dependency required.
//
// RLS on `lead_ads` only lets anonymous clients INSERT — they cannot read,
// update, or delete anything. The anon (publishable) key is safe to ship in
// the landing bundle.
//
// On success the lead lands in the Novaterra Dashboard → Lead Ads page,
// visible to admins (and to the user it gets assigned to).
// =============================================================================
import { SUPABASE_URL, SUPABASE_ANON_KEY, LEAD_AD_SOURCE } from '../config.js';
import { getTrafficFields } from './trafficSource.js';
import { trackLead } from './pixel.js';

export async function submitLeadAd({ name, phone, activity }) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Lead capture is not configured (missing Supabase URL or anon key).');
  }

  // Traffic provenance — captured once on first page-load, replayed on submit.
  // Lets the CRM know if a lead came from Google, Facebook, organic, …
  const traffic = getTrafficFields();
  // Prefix the channel with the project (`gizacrown_facebook`, `gizacrown_google`,
  // …) so the Novaterra dashboard can tell Giza Crown leads apart from Matajer
  // ones. Falls back to the app-wide constant ("gizacrown_landing").
  const resolvedSource = traffic.source && traffic.source !== 'unknown'
    ? `gizacrown_${traffic.source}`
    : LEAD_AD_SOURCE;

  const payload = {
    name:     String(name || '').trim(),
    phone:    String(phone || '').trim(),
    activity: activity ? String(activity).trim() : null,
    source:   resolvedSource,
    // Traffic-source columns (added by 20260608_lead_ads_traffic.sql migration).
    // The Postgres REST API silently ignores keys whose columns don't exist
    // — but Supabase REJECTS them, so we'll know to run the migration if any
    // of these comes back as "column does not exist" in the response body.
    utm_source:   traffic.utm_source,
    utm_medium:   traffic.utm_medium,
    utm_campaign: traffic.utm_campaign,
    utm_term:     traffic.utm_term,
    utm_content:  traffic.utm_content,
    gclid:        traffic.gclid,
    fbclid:       traffic.fbclid,
    referrer:     traffic.referrer,
    landing_page: traffic.landing_page,
    // assigned_to and status are set by the DB defaults — the RLS policy
    // even rejects inserts that try to specify them, so we leave them off.
  };

  const res = await fetch(`${SUPABASE_URL}/rest/v1/lead_ads`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      apikey:          SUPABASE_ANON_KEY,
      Authorization:   `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer:          'return=minimal',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail = '';
    try { detail = (await res.text()) || ''; } catch { /* swallow */ }
    throw new Error(`Lead submission failed (HTTP ${res.status}): ${detail}`);
  }

  trackLead({ activity: payload.activity });
}
