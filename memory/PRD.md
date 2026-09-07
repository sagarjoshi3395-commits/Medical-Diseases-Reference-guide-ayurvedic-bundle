# Medical Reference Guide — Ayurvedic Bundle

## Original Problem Statement
Restore the Medical Reference Guide GitHub project and iteratively apply changes requested by the user.

## Current State
- Full-stack app (React + FastAPI + MongoDB) restored from GitHub and running.
- Landing page fully functional.
- **Payments**: Razorpay integration is bypassed. All "Buy / Get Access / Get the Complete Guide" CTAs now open an external SuperProfile checkout in a new tab: `https://superprofile.bio/vp/6a9efd48ce71d100135003dc`.
  - Change applied in `/app/frontend/src/components/site/BuyContext.jsx` (constant `CHECKOUT_URL`).
  - `BuyModal.jsx` is no longer mounted (kept in repo but unused).
- Emails via Resend still disabled (empty API key).

## Files of Reference
- `/app/frontend/src/components/site/BuyContext.jsx` — provides `openBuy()` which redirects to external checkout.
- `/app/frontend/src/components/site/BuyModal.jsx` — currently unused.
- `/app/frontend/.env`, `/app/backend/.env` — recreated locally (gitignored).

## Backlog / Next Ideas (P2)
- Track outbound checkout clicks via analytics (fbq InitiateCheckout already fires before redirect).
- Optional: replace text "Secure checkout via Razorpay" microcopy anywhere it still surfaces.
- Re-enable Razorpay when keys are available (revert `openBuy` to open BuyModal).
