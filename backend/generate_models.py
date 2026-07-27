from pathlib import Path
from subprocess import run
from urllib.parse import quote_plus
import os
import time

# ===========================
# Database Configuration
# ===========================

DB_USER = "root"
DB_PASSWORD = "Luanhah0811@"
DB_HOST = "127.0.0.1"
DB_PORT = "3306"
DB_NAME = "fleetmanagementdb"

# ===========================
# Build SQLAlchemy URL
# ===========================

DATABASE_URL = (
    f"mysql+pymysql://"
    f"{DB_USER}:"
    f"{quote_plus(DB_PASSWORD)}@"
    f"{DB_HOST}:{DB_PORT}/"
    f"{DB_NAME}"
)

OUTPUT_FILE = Path("app/models/generated.py")


def main():

    print("=" * 45)
    print(" Fleet Management Model Generator")
    print("=" * 45)

    start = time.time()

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    command = [
        "python",
        "-m",
        "sqlacodegen",
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
    os.system(f'python -m black "{OUTPUT_FILE}"')

    elapsed = time.time() - start

    print("✅ Formatting complete.")
    print(f"📄 Output: {OUTPUT_FILE}")
    print(f"⏱ Finished in {elapsed:.2f} seconds")


if __name__ == "__main__":
    main()