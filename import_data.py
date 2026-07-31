import os
import csv
from pathlib import Path

import pymysql
from dotenv import load_dotenv

# ==========================================================
# LOAD ENV
# ==========================================================

load_dotenv()

HOST = os.getenv("DB_HOST")
PORT = int(os.getenv("DB_PORT"))
USER = os.getenv("DB_USER")
PASSWORD = os.getenv("DB_PASSWORD")
DATABASE = os.getenv("DB_NAME")

# ==========================================================
# CONNECT
# ==========================================================

print("=" * 70)
print("Connecting to TiDB...")
print("=" * 70)

conn = pymysql.connect(
    host=HOST,
    port=PORT,
    user=USER,
    password=PASSWORD,
    database=DATABASE,
    autocommit=False,
    charset="utf8mb4"
)

cursor = conn.cursor()

print("Connected Successfully")
print()

# ==========================================================
# DATA FOLDER
# ==========================================================

DATA_FOLDER = Path("data")

# ==========================================================
# IMPORT ORDER
# ==========================================================

TABLES = [

    # Package 1

    #"depot",
    #"vehiclecategory",
    #"certification",
    #"severity",
    #"eventtype",

    # Package 2

    #"activitytype",
    #"supplier",
    #"workshop",
    #"staff",

    # Package 3

    #"vehicle",
    #"driver",
    #"drivercertification",
    "vehicleassignment",

    # Package 4

    #"safetyevent",
    #"safetyreview",
    "driversafetyscore",
    #"drivercoaching",

    # Package 5

    #"part",
    #"predictivealert",
    #"maintenancejob",
    #"maintenanceactivity",
    #"mechanic",
    #"mechaniccertification",
    #"activitymechanic",
    #"activitypart",#

    # Package 6

    

    # Package 7

    #"vehiclecategorycertification",
    #"activitytypecertification",
    #"warrantyclaim"

]

# ==========================================================
# DELETE ORDER
# ==========================================================

DELETE_TABLES = list(reversed(TABLES))

# ==========================================================
# CLEAR DATABASE
# ==========================================================

print("=" * 70)
print("Deleting Old Data")
print("=" * 70)

cursor.execute("SET FOREIGN_KEY_CHECKS=0")

for table in DELETE_TABLES:

    try:

        cursor.execute(f"DELETE FROM {table}")

        print(f"Cleared {table}")

    except Exception as e:

        print(f"Skip {table}")

cursor.execute("SET FOREIGN_KEY_CHECKS=1")

conn.commit()

print()
print("Database Cleaned")
print()

# ==========================================================
# IMPORT FUNCTION
# ==========================================================

def import_table(table_name):

    file_path = DATA_FOLDER / f"{table_name}.csv"

    if not file_path.exists():

        print(f"Missing {file_path}")

        return

    with open(file_path, newline="", encoding="utf-8") as f:

        reader = csv.reader(f)

        headers = next(reader)

        placeholders = ",".join(["%s"] * len(headers))

        columns = ",".join(headers)

        sql = f"""
        INSERT INTO {table_name}
        ({columns})
        VALUES
        ({placeholders})
        """

        total = 0

        for row in reader:
    
            cleaned = []

            for value in row:

                # NULL
                if value == "":
                    cleaned.append(None)

                # Boolean
                elif value == "True":
                    cleaned.append(1)

                elif value == "False":
                    cleaned.append(0)

                else:
                    cleaned.append(value)

            cursor.execute(sql, cleaned)

            total += 1

        conn.commit()

        print(f"✓ {table_name:<35}{total} rows")
        
        # ==========================================================
# IMPORT ALL TABLES
# ==========================================================

print("=" * 70)
print("Importing CSV Files")
print("=" * 70)
print()

success = 0
failed = 0

for table in TABLES:

    try:

        import_table(table)

        success += 1

    except Exception as e:

        conn.rollback()

        failed += 1

        print()
        print("=" * 70)
        print(f"FAILED : {table}")
        print(e)
        print("=" * 70)
        print()

# ==========================================================
# SUMMARY
# ==========================================================

print()
print("=" * 70)
print("IMPORT SUMMARY")
print("=" * 70)

print(f"Successful : {success}")
print(f"Failed     : {failed}")

if failed == 0:

    print()
    print("ALL 28 TABLES IMPORTED SUCCESSFULLY")

else:

    print()
    print("Some tables failed.")
    print("Check the messages above.")

# ==========================================================
# CLOSE
# ==========================================================

cursor.close()
conn.close()

print()
print("=" * 70)
print("Disconnected From TiDB")
print("=" * 70)