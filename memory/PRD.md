# Medical Reference Guide — Ayurvedic Bundle

## Original Problem Statement
Restore the Medical Reference Guide GitHub project and iteratively apply changes requested by the user.

## Current State — Payment via SuperProfile (direct redirect)
Razorpay is bypassed. Any Buy CTA now redirects directly to SuperProfile (no on-site info collection). Buyers fill their details inside SuperProfile. After payment, SuperProfile's Thank-You URL brings them back to `/paid`, which unlocks downloads and sends the Resend email.

### Flow
1. Visitor clicks any Buy CTA → `openBuy()` fires `fbq('InitiateCheckout')` then `window.location.href = 'https://superprofile.bio/vp/6a9efd48ce71d100135003dc'`.
2. Buyer completes payment on SuperProfile.
3. SuperProfile Thank-You URL brings them to our `/paid` page.
   - Preferred: `https://<site>/paid?email={{email}}&name={{name}}` (auto-unlock).
   - Fallback: `https://<site>/paid` — buyer enters their email once in a small form.
4. `/paid` POSTs `{email, name}` to `POST /api/checkout/superprofile-fulfill`. Backend creates a paid order, generates `download_token`, dispatches the Resend confirmation email with both PDF links, and returns the ids.
5. Frontend navigates to `/success?order=…&token=…`. Meta Pixel `Purchase` event fires.

### Idempotency
`superprofile-fulfill` checks for a paid order for the same email in the last hour and reuses it. Refreshing `/paid` or re-visiting from the same email won't create duplicate orders.

### Meta Pixel
ID `3470309736541129` unchanged in `frontend/public/index.html`. Events: `PageView`, `InitiateCheckout` (on Buy click), `Purchase` (on `/paid` fulfill / `/success` load).

### Backend endpoints
- `GET /api/config` — includes `checkout_provider`, `superprofile_url`.
- `POST /api/checkout/superprofile-fulfill` — {email, name?, phone?} → creates paid order + emails receipt.
- `GET /api/order/{order_id}` — order status.
- `GET /api/download/{order_id}?token=&file=` — PDF download (requires status=paid + token).

### Config knobs (`/app/backend/.env`)
- `SUPERPROFILE_CHECKOUT_URL` (optional override).
- `PUBLIC_BASE_URL="https://health-guide-52.preview.emergentagent.com"` — used to build absolute PDF URLs in the email.
- `RESEND_API_KEY` — active (Resend test send confirmed with email id).
- `SENDER_EMAIL="support@ledgerkit.in"` — real deliverability requires this domain to be verified in Resend.

## Files of Reference
- `/app/backend/server.py` — SuperProfile fulfill endpoint, model, config additions.
- `/app/frontend/src/components/site/BuyContext.jsx` — direct redirect on `openBuy()`.
- `/app/frontend/src/components/site/BuyModal.jsx` — no longer mounted (kept in repo).
- `/app/frontend/src/pages/Paid.jsx` — auto/fallback fulfill page.
- `/app/frontend/src/App.js` — `/paid` route.

## Verified (Sept 2026)
- Buy click → intended URL `https://superprofile.bio/vp/6a9efd48ce71d100135003dc` (no modal).
- `/paid?email=…&name=…` → `/success` with downloads.
- `/paid` (no params) → email form → `/success` with downloads.
- PDF download endpoint returns 200 + application/pdf.
- Resend send verified (id logged).

## Backlog
- **P1**: Verify `ledgerkit.in` in Resend so real buyers actually receive the email. Temp: swap sender to `onboarding@resend.dev`.
- **P2**: SuperProfile webhook for server-verified completion (currently trusts the return).
- **P2**: "Resend my downloads" self-service link so returning buyers can recover.
