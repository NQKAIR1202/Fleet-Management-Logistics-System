"""
Quick way to peek at table contents without a GUI client.

Usage:
    python scripts/peek_table.py user
    python scripts/peek_table.py vehicle
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import text
from app.database.connection import engine


def main():
    if len(sys.argv) != 2:
        print("Usage: python scripts/peek_table.py <table_name>")
        return

    table = sys.argv[1]

    with engine.connect() as connection:
        result = connection.execute(text(f"SELECT * FROM `{table}` LIMIT 20"))
        rows = result.fetchall()
        columns = result.keys()

        print(" | ".join(columns))
        print("-" * 60)
        for row in rows:
            print(" | ".join(str(v) for v in row))

        print(f"\n{len(rows)} row(s) shown (limit 20).")


if __name__ == "__main__":
    main()
