from pathlib import Path
from subprocess import run
from urllib.parse import quote_plus
import os
import sys
import time

from app.core.config import settings

# ===========================
# Build SQLAlchemy URL
# ===========================
# Pulled from the same .env / Settings your app already uses (app/core/config.py),
# so this always targets the same database as connection.py.

DATABASE_URL = (
    f"mysql+pymysql://"
    f"{settings.DB_USER}:"
    f"{quote_plus(settings.DB_PASSWORD)}@"
    f"{settings.DB_HOST}:{settings.DB_PORT}/"
    f"{settings.DB_NAME}"
)

OUTPUT_FILE = Path("app/models/generated.py")


def main():

    print("=" * 45)
    print(" Fleet Management Model Generator")
    print("=" * 45)

    start = time.time()

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    command = [
        sys.executable,
        str(Path(__file__).parent / "_sqlacodegen_runner.py"),
        DATABASE_URL,
        "--generator",
        "declarative",
        "--outfile",
        str(OUTPUT_FILE)
    ]

    result = run(command)

    if result.returncode != 0:
        print("\n❌ Model generation failed.")
        return

    print("✅ Models generated.")

    # Optional: format bằng black nếu có
    os.system(f'"{sys.executable}" -m black "{OUTPUT_FILE}"')

    elapsed = time.time() - start

    print("✅ Formatting complete.")
    print(f"📄 Output: {OUTPUT_FILE}")
    print(f"⏱ Finished in {elapsed:.2f} seconds")


if __name__ == "__main__":
    main()