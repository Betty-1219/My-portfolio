"""
Seed the database with Betelhem's real projects and skills.
Run once after creating the tables:  python -m app.data.seed
"""
from app.database import SessionLocal, engine
from app import models

# Ensure tables exist
models.Base.metadata.create_all(bind=engine)


PROJECTS = [
    {
        "title": "DishDecide – Ethiopian Meal Picker",
        "description": (
            "A web application that helps users choose Ethiopian meals based on "
            "fasting or non-fasting preferences, meal categories, budget tracking, "
            "and personal preferences. It automatically deducts meal costs, saves "
            "favourite meals, and allows users to customise their avatars."
        ),
        "tech_stack": "HTML, CSS, JavaScript, LocalStorage",
        "github_url": "",
        "live_url": "https://dish-decide-application.vercel.app/",
        "image": "",
        "featured": True,
        "order": 1,
    },
    {
        "title": "Fikr Sign",
        "description": (
            "A mobile application designed to support communication between deaf "
            "and hearing people through Ethiopian Sign Language. Contributions include "
            "UI/UX design, API integration, and AWS deployment setup."
        ),
        "tech_stack": "Flutter, Dart, Python, FastAPI, AWS",
        "github_url": "https://github.com/fikir300/FikirSign",
        "live_url": "",
        "image": "",
        "featured": True,
        "order": 2,
    },
    {
        "title": "Adaptive Traffic Signal Management System",
        "description": (
            "A C++ project designed to manage traffic signals based on real-time "
            "traffic conditions and to prioritise emergency vehicles, improving "
            "overall traffic flow through intersections."
        ),
        "tech_stack": "C++, SQLite, Git",
        "github_url": "",
        "live_url": "",
        "image": "",
        "featured": True,
        "order": 3,
    },
]

# Skill categories and their skills.
# Proficiency values are taken verbatim from the original <meter> elements.
SKILLS = [
    {
        "name": "Web Development",
        "order": 1,
        "skills": [
            {"name": "HTML",       "level": 85, "order": 1},
            {"name": "CSS",        "level": 80, "order": 2},
            {"name": "JavaScript", "level": 60, "order": 3},
            {"name": "TypeScript", "level": 30, "order": 4},
        ],
    },
    {
        "name": "Programming Languages",
        "order": 2,
        "skills": [
            {"name": "Python", "level": 55, "order": 1},
            {"name": "C++",    "level": 45, "order": 2},
            {"name": "Java",   "level": 40, "order": 3},
            {"name": "Dart",   "level": 35, "order": 4},
        ],
    },
    {
        "name": "Mobile Development",
        "order": 3,
        "skills": [
            {"name": "Flutter",          "level": 40, "order": 1},
            {"name": "Mobile UI/UX",     "level": 50, "order": 2},
        ],
    },
    {
        "name": "Databases",
        "order": 4,
        "skills": [
            {"name": "MySQL",    "level": 50, "order": 1},
            {"name": "SQLite",   "level": 55, "order": 2},
            {"name": "MongoDB",  "level": 30, "order": 3},
            {"name": "Supabase", "level": 25, "order": 4},
        ],
    },
    {
        "name": "AI & Machine Learning",
        "order": 5,
        "skills": [
            {"name": "AI / ML fundamentals", "level": 25, "order": 1},
            {"name": "NumPy / Pandas",        "level": 35, "order": 2},
            {"name": "Semantic Search",       "level": 30, "order": 3},
            {"name": "OpenCV / MediaPipe",    "level": 25, "order": 4},
        ],
    },
    {
        "name": "Tools & Platforms",
        "order": 6,
        "skills": [
            {"name": "Git & GitHub", "level": 65, "order": 1},
            {"name": "Figma",        "level": 55, "order": 2},
            {"name": "VS Code",      "level": 80, "order": 3},
            {"name": "Google Colab", "level": 45, "order": 4},
            {"name": "Vercel",       "level": 50, "order": 5},
        ],
    },
]


def seed():
    db = SessionLocal()
    try:
        # Only seed if tables are empty
        if db.query(models.Project).count() == 0:
            for p in PROJECTS:
                db.add(models.Project(**p))
            print(f"  Seeded {len(PROJECTS)} projects.")
        else:
            print("  Projects already seeded — skipping.")

        if db.query(models.SkillCategory).count() == 0:
            for cat_data in SKILLS:
                cat = models.SkillCategory(
                    name=cat_data["name"], order=cat_data["order"]
                )
                db.add(cat)
                db.flush()  # get cat.id before adding skills
                for s in cat_data["skills"]:
                    db.add(
                        models.Skill(
                            category_id=cat.id,
                            name=s["name"],
                            level=s["level"],
                            order=s["order"],
                        )
                    )
            print(f"  Seeded {len(SKILLS)} skill categories.")
        else:
            print("  Skills already seeded — skipping.")

        db.commit()
        print("Seed complete.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
