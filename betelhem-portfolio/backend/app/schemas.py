"""
Pydantic schemas for request validation and response serialisation.
"""
from datetime import datetime
from typing import Annotated

from pydantic import BaseModel, EmailStr, Field, field_validator


# ---------------------------------------------------------------------------
# Projects
# ---------------------------------------------------------------------------

class ProjectOut(BaseModel):
    id: int
    title: str
    description: str
    tech_stack: list[str]   # serialised as a list; stored as comma-separated
    github_url: str
    live_url: str
    image: str
    featured: bool
    order: int

    model_config = {"from_attributes": True}

    @field_validator("tech_stack", mode="before")
    @classmethod
    def split_tech_stack(cls, v):
        if isinstance(v, str):
            return [t.strip() for t in v.split(",") if t.strip()]
        return v


# ---------------------------------------------------------------------------
# Skills
# ---------------------------------------------------------------------------

class SkillOut(BaseModel):
    id: int
    name: str
    level: int
    order: int

    model_config = {"from_attributes": True}


class SkillCategoryOut(BaseModel):
    id: int
    name: str
    order: int
    skills: list[SkillOut] = []

    model_config = {"from_attributes": True}


# ---------------------------------------------------------------------------
# Contact
# ---------------------------------------------------------------------------

REASON_CHOICES = {
    "project", "job", "internship", "question", "other", ""
}


class ContactIn(BaseModel):
    fullname: Annotated[str, Field(min_length=2, max_length=200)]
    email: EmailStr
    reason: Annotated[str, Field(max_length=100)] = ""
    subject: Annotated[str, Field(min_length=2, max_length=300)]
    message: Annotated[str, Field(min_length=10, max_length=5000)]

    @field_validator("reason")
    @classmethod
    def validate_reason(cls, v):
        if v not in REASON_CHOICES:
            raise ValueError(f"reason must be one of {REASON_CHOICES}")
        return v

    @field_validator("fullname", "subject", "message")
    @classmethod
    def no_html(cls, v: str) -> str:
        """Reject values that look like HTML/script injection."""
        forbidden = ["<script", "</script", "javascript:", "<iframe", "onerror="]
        low = v.lower()
        for token in forbidden:
            if token in low:
                raise ValueError("Invalid characters in input.")
        return v


class ContactOut(BaseModel):
    id: int
    fullname: str
    email: str
    subject: str
    created_at: datetime

    model_config = {"from_attributes": True}
