import random
import pandas as pd
from datetime import timedelta

from generators.utils import load_csv, save_csv

# =========================================================
# JOB STATUS
# =========================================================

JOB_STATUS = [
    "Open",
    "In Progress",
    "Completed",
    "Cancelled"
]

JOB_STATUS_WEIGHT = [
    10,
    15,
    70,
    5
]

# =========================================================
# HELPERS
# =========================================================

def random_job_count():

    return random.choices(

        [1,2,3,4],

        weights=[45,30,20,5],

        k=1

    )[0]


def choose_status():

    return random.choices(

        JOB_STATUS,

        weights=JOB_STATUS_WEIGHT,

        k=1

    )[0]


def random_open_date():

    start = pd.Timestamp("2024-01-01")

    end = pd.Timestamp.today()

    seconds = int((end-start).total_seconds())

    return start + timedelta(

        seconds=random.randint(0,seconds)

    )


def random_close_date(open_date):

    return open_date + timedelta(

        days=random.randint(1,14),

        hours=random.randint(0,23)

    )


def random_downtime(status):

    if status != "Completed":

        return None

    return round(

        random.uniform(4,96),

        2

    )
    
    
    # =========================================================
# GENERATE
# =========================================================

def generate():

    vehicles = load_csv("vehicle.csv")
    workshops = load_csv("workshop.csv")

    workshop_map = {

        row.DepotID: row.WorkshopID

        for row in workshops.itertuples(index=False)

    }

    jobs = []

    job_id = 1

    for vehicle in vehicles.itertuples(index=False):

        # khoảng 40% xe có maintenance
        if random.random() > 0.40:
            continue

        total_jobs = random_job_count()

        for _ in range(total_jobs):

            status = choose_status()

            opened = random_open_date()

            closed = None

            if status == "Completed":

                closed = random_close_date(opened)

            jobs.append({

                "JobID": job_id,

                "VIN": vehicle.VIN,

                "WorkshopID": workshop_map.get(

                    vehicle.DepotID

                ),

                "AlertID":

                    random.randint(1,150)

                    if random.random()<0.15

                    else None,

                "DateOpened": opened,

                "DateClosed": closed,

                "DowntimeHours":

                    random_downtime(status),

                "TotalCostVND": 0,

                "JobStatus": status

            })

            job_id += 1

    df = pd.DataFrame(jobs)

    save_csv(

        df,

        "maintenancejob.csv"

    )

    print(

        f"✓ maintenancejob.csv\t\t{len(df)} rows"

    )

    return df


if __name__ == "__main__":

    generate()