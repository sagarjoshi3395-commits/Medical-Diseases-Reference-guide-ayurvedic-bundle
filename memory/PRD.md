# Medical Reference Guide Bundle — PRD

## Original Problem Statement
Restore the Medical Reference Guide GitHub project, set up the environment, resolve missing dependencies/environment variables, and make it functional. Progressively enable features (payments, PDF delivery, flash-sale timer, admin, etc.).

## Product
A landing/sales site that sells an illustrated **Medical Reference Guide Bundle** (Disease + Medicine PDFs). Visitors submit name/email/phone → pay via Razorpay → receive secure download links for both PDFs. A 10-minute flash-sale countdown incentivises quick checkout (₹299 promotional → ₹1999 regular after expiry).

## Tech Stack
- Frontend: React + Tailwind CSS
- Backend: FastAPI (Python)
- Database: MongoDB (Motor async driver)
- Payments: Razorpay Checkout (LIVE keys)

## Architecture
```
/app
├── backend
│   ├── server.py                 # FastAPI app
│   ├── assets/
│   │   ├── diseases-reference-book.pdf   (21 MB)
│   │   └── medicine-reference-guide.pdf   (8 MB)
│   └── .env                      # MONGO_URL, DB_NAME, product config, Razorpay LIVE keys
├── frontend
│   ├── src/
│   │   ├── components/site/
│   │   │   ├── CountdownBadge.jsx   # Countdown pill + banner
│   │   │   ├── Hero.jsx / Pricing.jsx / Navbar.jsx / BuyModal.jsx  (updated for flash sale)
│   │   ├── lib/countdown.js         # Session countdown hook + localStorage
│   │   └── pages/Success.jsx        # Two download buttons (Disease + Medicine)
│   └── .env
```

## Flash-Sale Pricing
- Countdown starts on first visit (stored in `localStorage["mrg_countdown_start"]`, ISO timestamp).
- Duration: `COUNTDOWN_SECONDS` env var, default `600` (10 min).
- Frontend sends `session_started_at` when creating an order.
- Backend recomputes: if `(now - session_started_at) <= 600s` → charge `PRODUCT_PRICE` (₹299), else `PRODUCT_PRICE_REGULAR` (₹1999).
- Orders store `flash_sale_applied: bool`.

## Key API Endpoints
- `GET  /api/config` — {product, price, regular_price, countdown_seconds, currency, razorpay_enabled, key_id}
- `POST /api/leads` — Capture lead
- `GET  /api/leads` — List leads
- `POST /api/payment/create-order` — Accepts `{name, email, phone, session_started_at}`; returns Razorpay order + effective price
- `POST /api/payment/verify` — Verifies signature, issues download token
- `GET  /api/order/{order_id}` — Order status + `files: ["disease","medicine"]`
- `GET  /api/download/{order_id}?token=...&file=disease|medicine` — Secure per-file PDF download

## DB Collections
- `leads` — {id, name, email, phone, source, created_at}
- `orders` — {id, razorpay_order_id, amount, currency, name, email, phone, status, flash_sale_applied, payment_id, download_token, paid_at, created_at}

## Implemented (as of Feb 2026)
- **[Feb 2026]** GitHub project restored, `.env` files recreated, dependencies installed.
- **[Feb 2026]** Razorpay LIVE integration enabled and verified end-to-end.
- **[Feb 2026]** Uploaded both PDFs (`diseases-reference-book.pdf`, `medicine-reference-guide.pdf`) to `backend/assets`. Success page shows separate download buttons per guide. Verified downloads via curl (HTTP 200 + correct byte sizes) and confirmed token/file-name validation returns 403/400 for invalid requests.
- **[Feb 2026]** 10-minute flash-sale countdown implemented: announcement bar, Hero pill, Pricing card banner, sticky mobile CTA, and BuyModal all show the timer + strikethrough regular price. Backend enforces price based on the client-supplied session start timestamp so the discount cannot be gamed indefinitely.

## Backlog (Prioritized)
### P1
- **Confirmation email**: Send download links (both PDFs) via SendGrid/Resend after successful payment.
- **Admin dashboard**: Protected view for leads, orders, revenue, flash-sale conversion rate.

### P2
- **Content expansion**: Sample pages, topic list, searchable reference section.
- **Design polish**: Refresh testimonials/FAQ sections.
- **Analytics**: Conversion funnel (visit → lead → paid).
- **Coupons**: Additional discount codes on top of / after flash sale.

## Integrations
- **Razorpay** — LIVE keys in `/app/backend/.env`.

## Critical Notes for Future Agents
- `.env` files are gitignored — do NOT delete.
- Razorpay is in LIVE mode (`rzp_live_...`). Any checkout will charge a real card.
- The flash-sale timer is a marketing tool — resetting `localStorage["mrg_countdown_start"]` (clear browser storage) will restart the 10-min window for a visitor.
- Success page clears the countdown on load to avoid a stale timer for returning buyers.
