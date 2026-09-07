# Medical Reference Guide — Ayurvedic Bundle

## Original Problem Statement
Restore the Medical Reference Guide GitHub project and iteratively apply changes requested by the user.

## Current State — Payment via Cosmofeed/SuperProfile
Razorpay is bypassed. Buy CTAs redirect directly to Cosmofeed hosted checkout. Post-payment fulfillment happens two ways:
1. **Redirect return** to `/paid` (with optional `?email=…&name=…` params).
2. **Webhook** from Cosmofeed to `POST /api/webhooks/cosmofeed` — works even if buyer closes the tab.

### Flow
1. Buy CTA → `openBuy()` fires `fbq('InitiateCheckout')` + `window.location.href = 'https://superprofile.bio/vp/6a9efd48ce71d100135003dc'`.
2. Buyer pays on Cosmofeed. **Either or both** of the following happen:
   - Cosmofeed webhook hits `/api/webhooks/cosmofeed` → server fulfills order + emails links.
   - Cosmofeed redirects to `/paid?email=…&name=…` → same fulfillment (idempotent, reuses order if already fulfilled).
3. `/paid` sends buyer to `/success?order=…&token=…` where two PDF download buttons wait.

### Idempotency
`_fulfill_order()` looks up any paid order for the same email in the last hour and reuses it. Whether the webhook or the redirect fires first (or both), only one order + one email.

### Self-service: /resend
Route `/resend` lets a returning buyer re-request their download links by entering the email they used at checkout. Backed by `POST /api/resend-downloads`. Footer link added.

### Meta Pixel `3470309736541129`
Untouched. Events fire: `PageView`, `InitiateCheckout` (Buy click), `Purchase` (`/paid` + `/success`).

### Backend endpoints
- `GET /api/config`
- `POST /api/checkout/superprofile-fulfill` — used by `/paid`.
- `POST /api/webhooks/cosmofeed` — flexible JSON parser, always returns 200.
- `POST /api/resend-downloads` — self-service re-email.
- `GET /api/order/{order_id}`
- `GET /api/download/{order_id}?token=&file=disease|medicine`

### Config knobs (`/app/backend/.env`)
- `SUPERPROFILE_CHECKOUT_URL` — override the Cosmofeed URL.
- `PUBLIC_BASE_URL` — absolute base for email PDF links.
- `RESEND_API_KEY` — set.
- `SENDER_EMAIL="onboarding@resend.dev"`, `SENDER_NAME="Medical Reference Guide"` — no DNS work required.
- `COSMOFEED_WEBHOOK_SECRET` (optional) — if set, webhook enforces `?secret=` query param or `X-Webhook-Secret` header.

### Cosmofeed setup checklist
1. **Redirect / Thank-You URL** → `https://health-guide-52.preview.emergentagent.com/paid?email={{email}}&name={{name}}` (or bare `/paid` if variables aren't supported).
2. **Payment webhook** → `POST https://health-guide-52.preview.emergentagent.com/api/webhooks/cosmofeed` (subscribe to payment-success / order-completed events).

### Debug audit trail
- `orders` collection — one document per paid order, includes `provider` (`superprofile` or `cosmofeed`) and (for webhooks) `webhook_payload`.
- `webhook_events` collection — every incoming webhook stored raw with headers + payload for schema-mapping tweaks.

## Files of Reference
- `/app/backend/server.py` — `_fulfill_order` helper, `superprofile-fulfill`, `cosmofeed_webhook`, `resend_downloads` endpoints.
- `/app/backend/email_service.py` — Resend integration (unchanged).
- `/app/frontend/src/components/site/BuyContext.jsx` — direct redirect on `openBuy()`.
- `/app/frontend/src/components/site/SalesTicker.jsx` — mobile position `bottom-28` to clear sticky bar.
- `/app/frontend/src/components/site/Footer.jsx` — "Resend my downloads" support link.
- `/app/frontend/src/pages/Paid.jsx` — auto/fallback fulfill page.
- `/app/frontend/src/pages/ResendDownloads.jsx` — self-service page (`/resend`).
- `/app/frontend/src/App.js` — routes.

## Verified (Sept 2026)
- Webhook: success event → paid + email + idempotent replay; non-success → ignored; missing email → ignored.
- `/resend` page: unknown email → `not_found` banner; known email → "Check your inbox".
- Full purchase flow via redirect return.
- Sales-ticker no longer overlaps sticky Buy on mobile (48px gap at 390×844).

## Backlog
- **P2**: Refine Cosmofeed webhook field-extraction paths once real payload is captured in `webhook_events`.
- **P2**: Add signature verification if Cosmofeed exposes an HMAC secret.
- **P2**: Post-purchase upsell / bonus cheatsheet on the success page.
