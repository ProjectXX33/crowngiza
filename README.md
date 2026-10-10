# Giza Crown — Landing Page (React)

Bilingual (Arabic RTL / English) landing for **Giza Crown Tower** (Segments Development · SAMCO · AMYCO), marketed by Nova Terra.
Same codebase as the Spade / Pantera landings, re-skinned with the Giza Crown brochure identity.

```bash
npm install
npm run dev
npm run build    # static site in dist/
```

## Tracking
- Meta Pixel `1093528646071515` — `PageView`, and `trackCustom('GizaCrownSubmission')` after a form submit / WhatsApp click.
- Google tag `AW-17665782294` — `gtag('event', 'Giza Crown Lead Submission')` after submit.
- Leads go to Novaterra Supabase `lead_ads` with source `gizacrown_<channel>` (fallback `gizacrown_landing`).

## Config
`src/config.js` — WhatsApp number, phone, map query. Copy is in `src/i18n.js`.
