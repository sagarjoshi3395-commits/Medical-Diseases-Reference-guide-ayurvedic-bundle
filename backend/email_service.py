"""Transactional email helper (Resend)."""
import os
import asyncio
import logging
from typing import Optional

import resend

logger = logging.getLogger(__name__)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "").strip()
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev").strip()
SENDER_NAME = os.environ.get("SENDER_NAME", "Medical Reference Guide").strip()

EMAIL_ENABLED = bool(RESEND_API_KEY)
if EMAIL_ENABLED:
    resend.api_key = RESEND_API_KEY


def _from_header() -> str:
    if SENDER_NAME:
        return f"{SENDER_NAME} <{SENDER_EMAIL}>"
    return SENDER_EMAIL


def _build_purchase_html(*, name: str, order_id: str, disease_url: str, medicine_url: str, support_email: str) -> str:
    first_name = (name or "there").split(" ")[0]
    return f"""<!doctype html>
<html><body style="margin:0;padding:0;background:#F4F7FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0B1E39;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F4F7FA;padding:32px 12px;">
  <tr><td align="center">
    <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(11,30,57,0.08);">
      <tr><td style="background:linear-gradient(135deg,#0B1E39,#0E9AA7);padding:28px 32px;color:#ffffff;">
        <div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;opacity:0.75;">Order Confirmation</div>
        <div style="font-size:24px;font-weight:800;margin-top:6px;">Thanks, {first_name}!</div>
        <div style="font-size:14px;opacity:0.85;margin-top:6px;">Your Medical Reference Guide Bundle is ready.</div>
      </td></tr>
      <tr><td style="padding:28px 32px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Your payment was successful and both illustrated PDF guides are ready to download. Save this email — the links stay valid for your order.</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;">
          <tr><td style="padding-bottom:12px;">
            <a href="{disease_url}" style="display:block;background:#0E9AA7;color:#ffffff;text-decoration:none;padding:14px 20px;border-radius:12px;font-weight:700;font-size:15px;text-align:center;">📘 Download Disease Reference Guide (PDF)</a>
          </td></tr>
          <tr><td>
            <a href="{medicine_url}" style="display:block;background:#0E9AA7;color:#ffffff;text-decoration:none;padding:14px 20px;border-radius:12px;font-weight:700;font-size:15px;text-align:center;">💊 Download Medicine Reference Guide (PDF)</a>
          </td></tr>
        </table>
        <div style="background:#F4F7FA;border-radius:12px;padding:14px 16px;font-size:13px;color:#4A5A75;">
          <div><strong style="color:#0B1E39;">Order ID:</strong> {order_id}</div>
        </div>
        <p style="margin:20px 0 0;font-size:13px;color:#4A5A75;line-height:1.6;">Educational reference only — not a prescription. No dosage guidance.<br/>
        Need help? Just reply to this email or write to <a href="mailto:{support_email}" style="color:#0E9AA7;text-decoration:none;">{support_email}</a>.</p>
      </td></tr>
      <tr><td style="padding:16px 32px 24px;text-align:center;font-size:12px;color:#8A97AB;">
        © Medical Reference Guide · Digital educational content
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>"""


async def send_purchase_email(
    *,
    to_email: str,
    name: str,
    order_id: str,
    disease_url: str,
    medicine_url: str,
    support_email: str = "ledgerkitsupport@gmail.com",
) -> Optional[str]:
    """Send purchase confirmation email. Returns Resend email id or None on failure."""
    if not EMAIL_ENABLED:
        logger.warning("Email disabled: RESEND_API_KEY missing")
        return None
    html = _build_purchase_html(
        name=name,
        order_id=order_id,
        disease_url=disease_url,
        medicine_url=medicine_url,
        support_email=support_email,
    )
    params = {
        "from": _from_header(),
        "to": [to_email],
        "subject": "Your Medical Reference Guide Bundle — Download Inside",
        "html": html,
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        email_id = result.get("id") if isinstance(result, dict) else None
        logger.info(f"Purchase email sent to {to_email} (id={email_id})")
        return email_id
    except Exception as e:
        logger.error(f"Failed to send purchase email to {to_email}: {e}")
        return None
