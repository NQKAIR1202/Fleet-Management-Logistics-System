from pathlib import Path
import sys

TEMPLATES = {
    "schemas": """from pydantic import BaseModel


class {ClassName}Base(BaseModel):
    pass


class {ClassName}Create({ClassName}Base):
    pass


class {ClassName}Update({ClassName}Base):
    pass


class {ClassName}Response({ClassName}Base):
    pass
""",

    "crud": """from sqlalchemy.orm import Session
from app.models import {ClassName}


def get_all(db: Session):
    return db.query({ClassName}).all()


def get_by_id(db: Session, id):
    return db.query({ClassName}).filter({ClassName}.id == id).first()
""",

    "api": """from fastapi import APIRouter

router = APIRouter(
    prefix="/{name}",
    tags=["{ClassName}"]
)
"""
}


def create_file(folder, filename, content):
    path = Path("app") / folder / f"{filename}.py"

    if path.exists():
        print(f"⚠ {path} already exists.")
        return

    path.write_text(content, encoding="utf8")

    print(f"✅ Created {path}")


def main():
    print(">>> main() started")

    if len(sys.argv) != 2:
        print("Usage:")
        print("python scaffold.py vehicle")
        return

    name = sys.argv[1].lower()

    class_name = "".join(part.capitalize() for part in name.split("_"))

    create_file(
        "schemas",
        name,
        TEMPLATES["schemas"].format(ClassName=class_name)
    )

    create_file(
        "crud",
        name,
        TEMPLATES["crud"].format(ClassName=class_name)
    )

    create_file(
        "api",
        name,
        TEMPLATES["api"].format(
            ClassName=class_name,
            name=name
        )
    )

    print("\n🎉 Scaffold completed!")
    
    
if __name__ == "__main__":
    main()