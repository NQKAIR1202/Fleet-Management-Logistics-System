"""
===========================================================
Fleet Management Database Import Tool
Version : 3.0
Author  : Group Project
===========================================================
"""

import os
import sys
import time
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.engine import URL


# ===========================================================
# Configuration
# ===========================================================

DEBUG = True

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", 3306))
DB_NAME = os.getenv("DB_NAME", "fleetmanagementdb")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_FOLDER = PROJECT_ROOT / "data"


TABLES = [

    "depot",
    "vehiclecategory",
    "certification",
    "severity",
    "eventtype",

    "activitytype",
    "supplier",
    "workshop",
    "staff",

    "vehicle",
    "driver",

    "drivercertification",
    "vehicleassignment",

    "mechanic",
    "mechaniccertification",

    "vehiclecategorycertification",
    "activitytypecertification",

    "part",

    "maintenancejob",
    "maintenanceactivity",

    "activitymechanic",
    "activitypart",

    "warrantyclaim",

    "safetyevent",
    "safetyreview",
    "driversafetyscore",
    "drivercoaching",

    "predictivealert"

]


# ===========================================================
# UI Helper
# ===========================================================

def line():

    print("=" * 70)


def title(text):

    line()
    print(text)
    line()


def ok(msg):

    print(f"✅ {msg}")


def fail(msg):

    print(f"❌ {msg}")


def info(msg):

    print(f"📌 {msg}")


# ===========================================================
# Database Importer
# ===========================================================

class DatabaseImporter:

    def __init__(self):

        self.engine = None

        self.success = 0

        self.failed = 0

        self.total_rows = 0

        self.failed_tables = []

        self.start = time.time()
    # =======================================================

    def connect(self):

        info("Connecting to MySQL...")

        try:

            url = URL.create(

                drivername="mysql+pymysql",

                username=DB_USER,

                password=DB_PASSWORD,

                host=DB_HOST,

                port=DB_PORT,

                database=DB_NAME

            )

            self.engine = create_engine(

                url,

                future=True,

                pool_pre_ping=True

            )

            with self.engine.connect():

                pass

            ok("Connected")

            return True

        except Exception as e:

            fail("Cannot connect to MySQL")

            if DEBUG:

                print()

                print(str(e).split("\n")[0])

            return False
        
        # =======================================================

    def check_csv(self):

        info("Checking CSV files...")

        if not DATA_FOLDER.exists():

            fail("Data folder not found")

            return False

        missing = []

        for table in TABLES:

            file = DATA_FOLDER / f"{table}.csv"

            if not file.exists():

                missing.append(table)

        if missing:

            fail(f"{len(missing)} CSV files missing\n")

            for item in missing:

                print(f"   - {item}")

            return False

        ok(f"{len(TABLES)} CSV files found")

        return True
    
    
        # =======================================================

    def disable_fk(self):

        with self.engine.begin() as conn:

            conn.execute(

                text(

                    "SET FOREIGN_KEY_CHECKS=0"

                )

            )


    # =======================================================

    def enable_fk(self):

        with self.engine.begin() as conn:

            conn.execute(

                text(

                    "SET FOREIGN_KEY_CHECKS=1"

                )

            )
            
                # =======================================================
    # Clear Database
    # =======================================================

    def clear_database(self):

        info("Clearing existing data...")

        self.disable_fk()

        with self.engine.begin() as conn:

            for table in reversed(TABLES):

                try:

                    conn.execute(
                        text(f"DELETE FROM `{table}`")
                    )

                except Exception:

                    pass

        self.enable_fk()

        ok("Database cleared")
        
        
            # =======================================================
    # Import CSV
    # =======================================================

    def import_csv(self):

        print()

        title("IMPORTING TABLES")

        self.disable_fk()

        with self.engine.begin() as conn:

            total = len(TABLES)

            for index, table in enumerate(TABLES, start=1):

                csv_file = DATA_FOLDER / f"{table}.csv"

                try:

                    df = pd.read_csv(csv_file)
                    
                    COLUMN_MAPPING = {
                        "RepairFault": "RepeatFault",
                    }

                    df.rename(columns=COLUMN_MAPPING, inplace=True)

                    df.columns = df.columns.str.strip()

                    df = df.where(
                        pd.notnull(df),
                        None
                    )

                    rows = len(df)

                    df.to_sql(

                        name=table,

                        con=conn,

                        if_exists="append",

                        index=False

                    )

                    self.success += 1

                    self.total_rows += rows

                    percent = (index / total) * 100

                    print(
                        f"[{index:02}/{total}] "
                        f"{percent:5.1f}% "
                        f"{table:<30}"
                        f"✅ {rows} rows"
                    )

                except Exception as e:

                    self.failed += 1

                    self.failed_tables.append(table)

                    print(
                        f"[{index:02}/{total}] "
                        f"{table:<30}"
                        f"❌ FAILED"
                    )

                    self.print_error(e)

        self.enable_fk()

        print()

        ok("CSV Import Completed")
        
        
            # =======================================================
    # Error Handler
    # =======================================================

    def print_error(self, e):

        if not DEBUG:

            return

        print()

        print("Reason")

        if hasattr(e, "orig"):

            if hasattr(e.orig, "args"):

                try:

                    print(f"   {e.orig.args[1]}")

                    return

                except Exception:

                    pass

        msg = str(e)

        msg = msg.split("\n")[0]

        print(f"   {msg}")

        print()
        
            # =======================================================
    # Verify
    # =======================================================

    def verify(self):

        print()

        title("VERIFY TABLES")

        with self.engine.connect() as conn:

            for table in TABLES:

                try:

                    count = conn.execute(

                        text(

                            f"SELECT COUNT(*) FROM `{table}`"

                        )

                    ).scalar()

                    icon = "✅"

                    if count == 0:

                        icon = "⚠️"

                    print(

                        f"{icon} "

                        f"{table:<30}"

                        f"{count:>6} rows"

                    )

                except Exception:

                    print(

                        f"❌ "

                        f"{table:<30}"

                        "ERROR"

                    )

        print()
        
            # =======================================================
    # Summary
    # =======================================================

    def summary(self):

        elapsed = time.time() - self.start

        print()

        title("DATABASE SUMMARY")

        print(f"Tables Imported : {self.success} / {len(TABLES)}")
        print(f"Tables Failed   : {self.failed}")
        print(f"Rows Imported   : {self.total_rows:,}")
        print(f"Execution Time  : {elapsed:.2f} sec")

        if self.failed_tables:

            print("\nFailed Tables")

            for table in self.failed_tables:

                print(f"   ❌ {table}")

        else:

            print("\n🎉 All tables imported successfully.")

        print()

        line()
        
        
            # =======================================================
    # Run
    # =======================================================

    def run(self):

        title("Fleet Management Database Import")

        if not self.connect():
            return

        print()

        if not self.check_csv():
            return

        print()

        self.clear_database()

        self.import_csv()

        self.verify()

        self.summary()
        
        # ===========================================================
# Main
# ===========================================================

def main():

    try:

        importer = DatabaseImporter()

        importer.run()

    except KeyboardInterrupt:

        print("\n")

        fail("Import Cancelled By User")

        sys.exit(1)

    except Exception as e:

        print("\n")

        fail("Unexpected Error")

        print(str(e))

        sys.exit(1)


if __name__ == "__main__":

    main()