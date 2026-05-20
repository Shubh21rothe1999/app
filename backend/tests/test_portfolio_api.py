"""Backend API tests for Shubham Rothe Portfolio."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://databricks-showcase.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_health_returns_healthy(self, client):
        r = client.get(f"{API}/health", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "healthy"
        assert "time" in data


# ---------- Chat (Gemini 3 Flash via Emergent LLM key) ----------
class TestChat:
    def test_chat_resume_question_databricks(self, client):
        payload = {"message": "What is your Databricks experience?"}
        r = client.post(f"{API}/chat", json=payload, timeout=90)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "session_id" in data and isinstance(data["session_id"], str)
        assert "reply" in data and isinstance(data["reply"], str)
        assert len(data["reply"].strip()) > 0
        low = data["reply"].lower()
        # Reply should mention something documented from the resume
        assert any(k in low for k in ["databricks", "medallion", "pyspark", "delta"]), \
            f"Reply did not reference resume keywords: {data['reply']}"

    def test_chat_out_of_scope_refusal(self, client):
        payload = {"message": "What is the capital of France?"}
        r = client.post(f"{API}/chat", json=payload, timeout=90)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "not part of shubham's documented experience" in data["reply"].lower(), \
            f"Expected out-of-scope refusal, got: {data['reply']}"

    def test_chat_empty_message_returns_400(self, client):
        r = client.post(f"{API}/chat", json={"message": ""}, timeout=20)
        assert r.status_code == 400, f"Expected 400, got {r.status_code}: {r.text}"

    def test_chat_whitespace_message_returns_400(self, client):
        r = client.post(f"{API}/chat", json={"message": "   "}, timeout=20)
        assert r.status_code == 400

    def test_chat_session_continuity(self, client):
        # Subsequent message with same session_id keeps context
        r1 = client.post(f"{API}/chat", json={"message": "Tell me about Project 1"}, timeout=90)
        assert r1.status_code == 200, r1.text
        sid = r1.json()["session_id"]
        r2 = client.post(f"{API}/chat", json={"message": "Tell me more", "session_id": sid}, timeout=90)
        assert r2.status_code == 200, r2.text
        assert r2.json()["session_id"] == sid


# ---------- Contact (endpoint exists, even if UI uses mailto) ----------
class TestContact:
    def test_create_contact_persists(self, client):
        payload = {
            "name": "TEST_PortfolioTester",
            "email": "test_portfolio@example.com",
            "message": "TEST_ automated message — please ignore.",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=20)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "id" in data

        # GET list and confirm presence
        r2 = client.get(f"{API}/contact", timeout=20)
        assert r2.status_code == 200
        items = r2.json()
        assert any(it.get("id") == data["id"] for it in items), "Created contact not found in list"

    def test_create_contact_invalid_email_422(self, client):
        r = client.post(f"{API}/contact", json={
            "name": "X", "email": "not-an-email", "message": "hi"
        }, timeout=20)
        assert r.status_code == 422
