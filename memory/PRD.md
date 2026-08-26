# Medical Reference Guide Bundle — PRD

## Original Problem Statement
Restore the Medical Reference Guide GitHub project, set up the environment, resolve missing dependencies/environment variables, and make it functional. Then progressively enable features (payments, content, admin).

## Product
A landing/sales site that sells an illustrated **Medical Reference Guide Bundle** (Disease + Medicine PDF) for ₹299 (INR). Visitors submit name/email/phone → pay via Razorpay → receive a secure download link for the PDF.

## Tech Stack
- Frontend: React + Tailwind CSS
- Backend: FastAPI (Python)
- Database: MongoDB (Motor async driver)
- Payments: Razorpay Checkout (LIVE keys configured)

## Architecture
```
/app
├── backend
│   ├── server.py         # FastAPI app: config, leads, orders, payment verify, download
│   └── .env              # MONGO_URL, DB_NAME, product config, Razorpay LIVE keys
├── frontend
│   ├── src/
│   └── .env              # REACT_APP_BACKEND_URL
```

## Key API Endpoints
- `GET  /api/config` — Product/price/Razorpay enabled + public key_id
- `POST /api/leads` — Capture lead (name, email, phone)
- `GET  /api/leads` — List leads
- `POST /api/payment/create-order` — Creates Razorpay order
- `POST /api/payment/verify` — Verifies signature, issues download token
- `GET  /api/order/{order_id}` — Order status
- `GET  /api/download/{order_id}?token=...` — Secure PDF download

## DB Collections
- `leads` — {id, name, email, phone, source, created_at}
- `orders` — {id, razorpay_order_id, amount, currency, name, email, phone, status, payment_id, download_token, paid_at, created_at}
- `status_checks` — health checks

## Implemented (as of Feb 2026)
- **[Feb 2026]** GitHub project restored, `.env` files recreated, dependencies installed, backend/frontend running.
- **[Feb 2026]** Razorpay LIVE integration enabled — `/api/config` returns `razorpay_enabled: true`. Verified live order creation end-to-end via API.

## Backlog (Prioritized)
### P0
- None (payments live).

### P1
- **PDF asset**: Upload the actual Medical Reference Guide PDF to `backend/assets/medical-reference-guide.pdf` (or configure `PDF_PATH`) so `/api/download` serves it. Currently the endpoint returns 404 until the file is placed.
- **Admin dashboard**: Simple protected page to view leads + orders + payment status.
- **Order confirmation email**: Send download link via email (SendGrid/Resend) after successful payment.

### P2
- **Content expansion**: Sample pages, topic list, searchable reference section on landing.
- **Design tweaks**: Refresh hero/testimonials/FAQ sections.
- **Analytics**: Track conversion funnel (visit → lead → paid).
- **Coupon/discount codes** on checkout.

## Integrations
- **Razorpay** — LIVE keys configured in `/app/backend/.env` (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`). Any checkout will charge real cards.

## Critical Notes for Future Agents
- `.env` files are gitignored — do NOT delete.
- Razorpay is in LIVE mode. Switch to test keys (`rzp_test_...`) if you need non-charging testing.
- PDF file is not yet in the repo; `/api/download` will 404 until placed.
