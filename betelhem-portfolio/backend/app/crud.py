"""
Database access functions — keep all SQL out of the routers.
"""
from sqlalchemy.orm import Session

from app import models, schemas


# ---------------------------------------------------------------------------
# Projects
# ---------------------------------------------------------------------------

def get_projects(db: Session, featured_only: bool = False) -> list[models.Project]:
    q = db.query(models.Project)
    if featured_only:
        q = q.filter(models.Project.featured.is_(True))
    return q.order_by(models.Project.order).all()


# ---------------------------------------------------------------------------
# Skills
# ---------------------------------------------------------------------------

def get_skill_categories(db: Session) -> list[dict]:
    """Return categories with their skills nested."""
    categories = (
        db.query(models.SkillCategory)
        .order_by(models.SkillCategory.order)
        .all()
    )
    result = []
    for cat in categories:
        skills = (
            db.query(models.Skill)
            .filter(models.Skill.category_id == cat.id)
            .order_by(models.Skill.order)
            .all()
        )
        result.append({"category": cat, "skills": skills})
    return result


# ---------------------------------------------------------------------------
# Contact messages
# ---------------------------------------------------------------------------

def create_contact_message(
    db: Session, data: schemas.ContactIn
) -> models.ContactMessage:
    msg = models.ContactMessage(
        fullname=data.fullname,
        email=data.email,
        reason=data.reason,
        subject=data.subject,
        message=data.message,
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg
