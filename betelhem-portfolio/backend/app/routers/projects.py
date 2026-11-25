from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("", response_model=list[schemas.ProjectOut])
def list_projects(
    featured: bool = Query(False, description="Return only featured projects"),
    db: Session = Depends(get_db),
):
    """Return all projects ordered by `order` field."""
    return crud.get_projects(db, featured_only=featured)
