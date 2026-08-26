# Medical Reference Guide Bundle — PRD

## Original Problem Statement
Restore the Medical Reference Guide GitHub project, set up the environment, resolve missing dependencies/environment variables, and make it functional. Progressively enable features (payments, PDF delivery, flash-sale timer, social proof, transactional email, admin, etc.).

## Product
A landing/sales site that sells an illustrated **Medical Reference Guide Bundle** (Disease + Medicine PDFs). Visitors submit name/email/phone → pay via Razorpay → receive secure download links (in-app + via email). A 10-minute flash-sale countdown incentivises quick checkout (₹299 promotional → ₹1999 regular after expiry).

## Tech Stack
- Frontend: React + Tailwind CSS
- Backend: FastAPI (Python)
- Database: MongoDB (Motor async driver)
- Payments: Razorpay Checkout (LIVE keys)
- Email: Resend (transactional)

## Architecture
```
/app
├── backend
│   ├── server.py                 # FastAPI app
│   ├── email_service.py          # Resend helper (send_purchase_email)
│   ├── assets/
│   │   ├── diseases-reference-book.pdf   (21 MB)
│   │   └── medicine-reference-guide.pdf   (8 MB)
│   └── .env                      # Mongo, Razorpay LIVE, Resend, PUBLIC_BASE_URL
├── frontend
│   ├── src/
│   │   ├── components/site/
│   │   │   ├── CountdownBadge.jsx
│   │   │   ├── SalesTicker.jsx    # Rotating toast + RecentSalesPill
│   │   │   ├── Hero.jsx / Pricing.jsx / Navbar.jsx / BuyModal.jsx
│   │   ├── lib/countdown.js
│   │   └── pages/Success.jsx
│   └── .env
```

## Flash-Sale Pricing
- Countdown starts on first visit (localStorage `mrg_countdown_start`).
- Duration: `COUNTDOWN_SECONDS` (default 600s).
- Backend recomputes on order creation using `session_started_at`. Within window → `PRODUCT_PRICE` (₹299), else `PRODUCT_PRICE_REGULAR` (₹1999).

## Social Proof
- **SalesTicker** (bottom-left): rotating toast every 9s showing curated Indian names+cities+time-ago. Dismissible.
- **RecentSalesPill**: shows `SALES_TICKER_BASELINE + real paid orders in the last hour` — pulls from `/api/stats/recent-sales` (polls every 60s). Baseline `9` so it never reads 0.

## Confirmation Email (Resend)
- On successful `/api/payment/verify`, backend sends an HTML email with both PDF download links (absolute URLs built from `PUBLIC_BASE_URL`).
- Sender: `SENDER_EMAIL` (default `onboarding@resend.dev` — Resend sandbox; delivers only to your Resend signup email).
- **Production**: verify a domain in Resend and set `SENDER_EMAIL=noreply@yourdomain.com` in `.env`.
- Verified live: helper returned Resend id `0785e93e-74b4-4887-b13f-ae348897264e` on test call.

## Key API Endpoints
- `GET  /api/config` — pricing + razorpay config
- `GET  /api/stats/recent-sales` — {count, window_hours} for social-proof pill
- `POST /api/leads` — capture lead
- `POST /api/payment/create-order` — creates Razorpay order (server-side price gating via `session_started_at`)
- `POST /api/payment/verify` — verifies signature, issues token, **sends confirmation email**
- `GET  /api/order/{order_id}` — status + files list
- `GET  /api/download/{order_id}?token=...&file=disease|medicine` — secure per-file download

## DB Collections
- `leads`, `orders` (with `flash_sale_applied`, `payment_id`, `download_token`, `paid_at`, etc.)

## Implemented (Feb 2026)
- **[Feb 2026]** Project restored, `.env` created, deps installed.
- **[Feb 2026]** Razorpay LIVE end-to-end.
- **[Feb 2026]** Both PDFs uploaded; Success page shows two download buttons; secure per-file download endpoint.
- **[Feb 2026]** 10-minute flash-sale timer (announcement bar, Hero pill, Pricing banner, Buy modal, sticky CTA) + server-enforced pricing.
- **[Feb 2026]** Sales ticker toast + "N people bought in last hour" pill.
- **[Feb 2026]** Resend confirmation email with both PDF download links, HTML template.

## Backlog (Prioritized)
### P1
- **Verify Resend domain** — swap sandbox sender for `noreply@yourdomain.com` to reach all customers.
- **Admin dashboard** — protected view for leads, orders, revenue, flash-sale conversion.

### P2
- **Content expansion** — sample pages, topic list.
- **Coupons** — additional discount codes on top of / after flash sale.
- **Analytics funnel** — visit → lead → paid.

## Integrations
- **Razorpay** (LIVE) — `/app/backend/.env`
- **Resend** — `RESEND_API_KEY` in `/app/backend/.env`. Sender currently sandbox.

## Critical Notes for Future Agents
- `.env` files are gitignored — do NOT delete.
- Razorpay is in LIVE mode.
- Resend sender is currently sandbox — deliverability is limited to the account owner's inbox until a domain is verified in Resend and `SENDER_EMAIL` updated.
- Success page clears `mrg_countdown_start` on load.
