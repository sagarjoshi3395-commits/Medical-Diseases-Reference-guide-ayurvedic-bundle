# Medical Reference Guide — Ayurvedic Bundle

## Original Problem Statement
Restore the Medical Reference Guide GitHub project and iteratively apply changes requested by the user.

## Current State — Payment via SuperProfile
Razorpay is bypassed. Checkout runs through SuperProfile hosted checkout while the rest of the flow (download page, Resend email, Meta Pixel) works exactly like before.

### Flow
1. Visitor clicks any Buy CTA → `BuyModal` opens (name / email / phone).
2. Submit → `POST /api/checkout/superprofile-init` creates a pending order + `download_token`, returns SuperProfile URL.
3. Frontend stores `{order_id, download_token}` in `localStorage['mrg_pending_order']`, fires `fbq('InitiateCheckout')`, and redirects to `https://superprofile.bio/vp/6a9efd48ce71d100135003dc`.
4. **SuperProfile "Thank You URL" must be configured to `https://<site>/paid`.**
5. `/paid` page (`src/pages/Paid.jsx`) reads the pending order from `localStorage`, calls `POST /api/checkout/superprofile-complete` → backend marks order paid, sends Resend confirmation email with PDF download links, then redirects to `/success?order=…&token=…`.
6. `/success` page shows the two PDF download buttons and fires `fbq('Purchase')`.

### Meta Pixel
ID `3470309736541129` is unchanged in `frontend/public/index.html`. `PageView`, `InitiateCheckout`, and `Purchase` events all still fire.

### Backend endpoints (new)
- `POST /api/checkout/superprofile-init` — create pending order.
- `POST /api/checkout/superprofile-complete` — mark paid + trigger email.
- `GET /api/config` — now also returns `checkout_provider` and `superprofile_url`.
- `GET /api/download/{order_id}` — unchanged; requires `status=paid` + valid token.

### Config knobs
- `SUPERPROFILE_CHECKOUT_URL` in `/app/backend/.env` (optional override; defaults to the URL the user provided).
- `PUBLIC_BASE_URL` refreshed to `https://health-guide-52.preview.emergentagent.com` so email download links are absolute and correct.
- `RESEND_API_KEY` still blank → emails fail silently (needs user key to activate).

## Files of Reference
- `/app/backend/server.py` — new SuperProfile endpoints, config additions.
- `/app/backend/.env` — SuperProfile + Public base URL config.
- `/app/frontend/src/components/site/BuyContext.jsx` — restores modal + exposes `CHECKOUT_URL`.
- `/app/frontend/src/components/site/BuyModal.jsx` — rewritten for SuperProfile init + redirect.
- `/app/frontend/src/pages/Paid.jsx` — new landing page that finalizes the order after SuperProfile.
- `/app/frontend/src/App.js` — `/paid` route added.

## Verified (Sept 2026)
- Init → complete → success flow via Playwright + curl.
- `/api/download/*` returns the PDF (200, application/pdf) after order is paid.

## Backlog
- **P1**: Add `RESEND_API_KEY` in backend `.env` to activate purchase emails.
- **P2**: SuperProfile webhook (if available) for server-verified completion instead of trusting the browser return.
- **P2**: Track outbound checkout clicks / drop-offs in analytics.
