"""Backend API tests for Medical Masterbook landing page (leads capture)."""
import os
from datetime import datetime

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL is missing")
BASE_URL = base_url.rstrip("/")


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Module: health / root
class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/", timeout=30)
        assert r.status_code == 200
        assert r.json().get("message") == "Hello World"


# Feature: POST /api/leads
class TestCreateLead:
    def test_create_valid_lead(self, api_client):
        payload = {
            "name": "TEST_Ananya Rao",
            "email": "test_ananya@example.com",
            "phone": "+91 98765 43210",
            "source": "landing_buy",
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload, timeout=30)
        assert r.status_code in (200, 201), r.text
        data = r.json()
        assert isinstance(data.get("id"), str) and len(data["id"]) > 0
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["phone"] == payload["phone"]
        assert data["source"] == "landing_buy"
        assert "created_at" in data
        datetime.fromisoformat(data["created_at"].replace("Z", "+00:00"))
        assert "_id" not in data

        # verify persistence via GET
        g = api_client.get(f"{BASE_URL}/api/leads", timeout=30)
        assert g.status_code == 200
        ids = [l["id"] for l in g.json()]
        assert data["id"] in ids

    def test_default_source_when_omitted(self, api_client):
        payload = {"name": "TEST_NoSource", "email": "test_nosource@example.com", "phone": "9876543210"}
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload, timeout=30)
        assert r.status_code in (200, 201), r.text
        assert r.json()["source"] == "landing_buy"

    def test_invalid_email(self, api_client):
        r = api_client.post(
            f"{BASE_URL}/api/leads",
            json={"name": "TEST_Bad", "email": "not-an-email", "phone": "9876543210"},
            timeout=30,
        )
        assert r.status_code == 422, r.text

    def test_short_phone(self, api_client):
        r = api_client.post(
            f"{BASE_URL}/api/leads",
            json={"name": "TEST_Bad", "email": "test_short@example.com", "phone": "123"},
            timeout=30,
        )
        assert r.status_code == 422, r.text

    def test_missing_phone(self, api_client):
        r = api_client.post(
            f"{BASE_URL}/api/leads",
            json={"name": "TEST_Bad", "email": "test_missing@example.com"},
            timeout=30,
        )
        assert r.status_code == 422, r.text

    def test_empty_name(self, api_client):
        r = api_client.post(
            f"{BASE_URL}/api/leads",
            json={"name": "", "email": "test_empty@example.com", "phone": "9876543210"},
            timeout=30,
        )
        assert r.status_code == 422, r.text

    def test_long_phone_rejected(self, api_client):
        r = api_client.post(
            f"{BASE_URL}/api/leads",
            json={"name": "TEST_Long", "email": "test_long@example.com", "phone": "1" * 25},
            timeout=30,
        )
        assert r.status_code == 422, r.text


# Feature: GET /api/leads
class TestGetLeads:
    def test_list_sorted_newest_first(self, api_client):
        created = []
        for i in range(3):
            r = api_client.post(
                f"{BASE_URL}/api/leads",
                json={
                    "name": f"TEST_Sort{i}",
                    "email": f"test_sort{i}@example.com",
                    "phone": "9998887771",
                },
                timeout=30,
            )
            assert r.status_code in (200, 201), r.text
            created.append(r.json())

        g = api_client.get(f"{BASE_URL}/api/leads", timeout=30)
        assert g.status_code == 200
        leads = g.json()
        assert isinstance(leads, list) and len(leads) >= 3
        ids = [l["id"] for l in leads]
        for c in created:
            assert c["id"] in ids
        times = [datetime.fromisoformat(l["created_at"].replace("Z", "+00:00")) for l in leads]
        assert times == sorted(times, reverse=True), "leads not sorted newest first"
        for l in leads:
            assert "_id" not in l
