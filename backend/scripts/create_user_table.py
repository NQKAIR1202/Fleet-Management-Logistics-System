"""
One-off script to add the `user` table to the database.

Run this BEFORE running generate_models.py, so sqlacodegen picks up the
new table automatically:

    python scripts/create_user_table.py
    python generate_models.py
"""

import sys
from pathlib import Path

# Ensure `backend/` (the parent of this scripts/ folder) is on the path,
# so `app` resolves no matter where this script is run from.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import text

from app.database.connection import engine

CREATE_USER_TABLE = """
CREATE TABLE IF NOT EXISTS `user` (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role VARCHAR(50) NOT NULL DEFAULT 'Administrator',
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT UQ_User_Email UNIQUE (Email)
);
"""


def main():
    with engine.begin() as connection:
        connection.execute(text(CREATE_USER_TABLE))
    print("✅ `user` table created (or already existed).")


if __name__ == "__main__":
    main()
