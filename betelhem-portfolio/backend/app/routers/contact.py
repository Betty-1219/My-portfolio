"""
Contact form endpoint with rate limiting (5 submissions / minute per IP).
"""
import smtplib
from email.mime.text import MIMEText

from fastapi import APIRouter, Depends, HTTPException, Request, status
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy.orm import Session

from app import crud, schemas
from app.config import settings
from app.database import get_db

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/api/contact", tags=["contact"])


def _send_notification(msg: schemas.ContactOut, original: schemas.ContactIn):
    """
    Optionally email a notification to Betelhem.
    Silently skips if CONTACT_EMAIL or SMTP_PASSWORD is not configured.
    """
    if not settings.contact_email or not settings.smtp_password:
        return
    try:
        body = (
            f"New portfolio contact message\n\n"
            f"From:    {original.fullname} <{original.email}>\n"
            f"Reason:  {original.reason}\n"
            f"Subject: {original.subject}\n\n"
            f"{original.message}"
        )
        mime = MIMEText(body, "plain")
        mime["Subject"] = f"[Portfolio] {original.subject}"
        mime["From"] = settings.contact_email
        mime["To"] = settings.contact_email

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(settings.contact_email, settings.smtp_password)
            server.sendmail(
                settings.contact_email,
                settings.contact_email,
                mime.as_string(),
            )
    except Exception:
        # Email sending is best-effort — never fail the API request because of it.
        pass


@router.post(
    "",
    response_model=schemas.ContactOut,
    status_code=status.HTTP_201_CREATED,
)
@limiter.limit("5/minute")
async def submit_contact(
    request: Request,          # required by slowapi
    data: schemas.ContactIn,
    db: Session = Depends(get_db),
):
    """
    Validate and store a contact form submission.
    Rate-limited to 5 requests per minute per IP address.
    """
    saved = crud.create_contact_message(db, data)
    _send_notification(saved, data)
    return saved
