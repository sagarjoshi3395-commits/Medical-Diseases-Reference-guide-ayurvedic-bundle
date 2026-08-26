"""Pricing / countdown-independence tests: price must always be flat 290."""
import os
from datetime import datetime, timedelta, timezone

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL is missing")
BASE_URL = base_url.rstrip("/")

EXPECTED_PRICE = 290
EXPECTED_AMOUNT = 29000


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def base_payload(session_started_at=None):
    p = {
        "name": "TEST_QA Buyer",
        "email": "test_qa_buyer@example.com",
        "phone": "+91 98765 43210",
    }
    if session_started_at is not None:
        p["session_started_at"] = session_started_at
    return p


# Module: GET /api/config
class TestConfig:
    def test_config_price(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/config", timeout=30)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["price"] == EXPECTED_PRICE
        assert d["regular_price"] == 1999
        assert d["countdown_seconds"] == 600
        assert d["currency"] == "INR"
        assert d["razorpay_enabled"] is True
        assert isinstance(d["key_id"], str) and d["key_id"].startswith("rzp_")


# Feature: POST /api/payment/create-order pricing independent of countdown
class TestCreateOrderPricing:
    def _assert_price(self, r):
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["price"] == EXPECTED_PRICE, f"expected 290 got {d['price']}"
        assert d["amount"] == EXPECTED_AMOUNT, f"expected 29000 got {d['amount']}"
        assert d["currency"] == "INR"
        assert d["razorpay_order_id"].startswith("order_")
        assert isinstance(d["order_id"], str)
        assert "_id" not in d
        return d

    def test_expired_session_still_290(self, api_client):
        expired = (datetime.now(timezone.utc) - timedelta(minutes=20)).isoformat()
        r = api_client.post(f"{BASE_URL}/api/payment/create-order", json=base_payload(expired), timeout=45)
        d = self._assert_price(r)
        assert d["flash_sale_applied"] is False
        # verify order persisted with correct amount
        g = api_client.get(f"{BASE_URL}/api/order/{d['order_id']}", timeout=30)
        assert g.status_code == 200
        assert g.json()["status"] == "created"
        assert g.json()["paid"] is False

    def test_null_session_still_290(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/payment/create-order", json=base_payload(None), timeout=45)
        d = self._assert_price(r)
        assert d["flash_sale_applied"] is False

    def test_active_session_still_290(self, api_client):
        now = datetime.now(timezone.utc).isoformat()
        r = api_client.post(f"{BASE_URL}/api/payment/create-order", json=base_payload(now), timeout=45)
        d = self._assert_price(r)
        assert d["flash_sale_applied"] is True

    def test_garbage_session_still_290(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/payment/create-order", json=base_payload("not-a-date"), timeout=45)
        self._assert_price(r)

    def test_invalid_email_rejected(self, api_client):
        p = base_payload(None)
        p["email"] = "bad-email"
        r = api_client.post(f"{BASE_URL}/api/payment/create-order", json=p, timeout=30)
        assert r.status_code == 422

    def test_missing_name_rejected(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/payment/create-order",
                            json={"email": "test_qa@example.com", "phone": "9876543210"}, timeout=30)
        assert r.status_code == 422


# Feature: payment verify / order / download guards
class TestGuards:
    def test_verify_unknown_order_404(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/payment/verify", json={
            "razorpay_order_id": "order_TESTNOTEXIST",
            "razorpay_payment_id": "pay_TESTNOTEXIST",
            "razorpay_signature": "deadbeef",
        }, timeout=30)
        assert r.status_code == 404

    def test_order_not_found(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/order/TEST_nonexistent", timeout=30)
        assert r.status_code == 404

    def test_download_unpaid_forbidden(self, api_client):
        create = api_client.post(f"{BASE_URL}/api/payment/create-order", json=base_payload(None), timeout=45)
        assert create.status_code == 200
        oid = create.json()["order_id"]
        r = api_client.get(f"{BASE_URL}/api/download/{oid}?token=x&file=disease", timeout=30)
        assert r.status_code == 403

    def test_recent_sales(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/stats/recent-sales", timeout=30)
        assert r.status_code == 200
        d = r.json()
        assert isinstance(d["count"], int) and d["count"] >= 9
        assert d["window_hours"] == 1
