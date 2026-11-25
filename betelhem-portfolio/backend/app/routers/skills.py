from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/api/skills", tags=["skills"])


@router.get("", response_model=list[schemas.SkillCategoryOut])
def list_skills(db: Session = Depends(get_db)):
    """Return skills grouped by category."""
    rows = crud.get_skill_categories(db)
    result = []
    for row in rows:
        cat_data = schemas.SkillCategoryOut.model_validate(row["category"])
        cat_data.skills = [
            schemas.SkillOut.model_validate(s) for s in row["skills"]
        ]
        result.append(cat_data)
    return result
