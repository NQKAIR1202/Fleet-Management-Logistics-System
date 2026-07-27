from pathlib import Path

# =========================================================
# Fleet Management Project Bootstrap
# =========================================================

folders = [

    # Frontend
    "frontend/public",
    "frontend/src",
    "frontend/src/assets",
    "frontend/src/components",
    "frontend/src/pages",
    "frontend/src/layouts",
    "frontend/src/services",
    "frontend/src/hooks",
    "frontend/src/context",
    "frontend/src/routes",
    "frontend/src/utils",

    # Backend
    "backend/app",
    "backend/app/api",
    "backend/app/api/routes",
    "backend/app/core",
    "backend/app/database",
    "backend/app/models",
    "backend/app/schemas",
    "backend/app/crud",
    "backend/app/services",
    "backend/app/utils",

    # Documentation
    "docs",
    "docs/ERD",
    "docs/API",
    "docs/Screenshots",
    "docs/Report",
]

files = [

    # Frontend
    "frontend/src/App.jsx",
    "frontend/src/main.jsx",

    # Backend
    "backend/app/main.py",
    "backend/app/database/connection.py",
    "backend/app/database/session.py",
    "backend/app/core/config.py",
    "backend/app/core/security.py",

    "backend/requirements.txt",
    "backend/.env",

    # Root
    ".gitignore",
    "docker-compose.yml",
]

print("=" * 60)
print("Fleet Management Project Bootstrap")
print("=" * 60)

for folder in folders:
    Path(folder).mkdir(parents=True, exist_ok=True)
    print(f"📁 {folder}")

for file in files:

    path = Path(file)

    path.parent.mkdir(parents=True, exist_ok=True)

    if not path.exists():
        path.touch()

    print(f"📄 {file}")

print()
print("=" * 60)
print("✅ Project structure created successfully.")
print("=" * 60)