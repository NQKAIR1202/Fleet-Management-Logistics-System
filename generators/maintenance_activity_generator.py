import random
import pandas as pd

from generators.utils import load_csv, save_csv

# =========================================================
# DATA
# =========================================================

STATUS = [
    "Pending",
    "In Progress",
    "Completed"
]

STATUS_WEIGHT = [
    15,
    20,
    65
]

# =========================================================
# GENERATE
# =========================================================

def generate():

    jobs = load_csv("maintenancejob.csv")
    activity_types = load_csv("activitytype.csv")

    activities = []

    activity_id = 1

    for job in jobs.itertuples(index=False):

        total = random.randint(2,6)

        selected = activity_types.sample(
            n=total,
            replace=True
        )

        no = 1

        for activity in selected.itertuples(index=False):

            activities.append({

                "ActivityID": activity_id,

                "JobID": job.JobID,

                "ActivityNo": no,

                "ActivityTypeID": activity.ActivityTypeID,

                "DiagnosticResult": random.choice([

                    "Normal wear detected",

                    "Brake system inspection",

                    "Engine oil replacement",

                    "Cooling system checked",

                    "Electrical fault identified",

                    "Tyre replacement required",

                    "Routine preventive maintenance"

                ]),

                "RepeatFault":

                    random.random() < 0.80,

                "WarrantyIndicator":

                    random.random() < 0.10,

                "ActivityStatus":

                    random.choices(

                        STATUS,

                        weights=STATUS_WEIGHT,

                        k=1

                    )[0]

            })

            activity_id += 1

            no += 1

    df = pd.DataFrame(activities)

    save_csv(

        df,

        "maintenanceactivity.csv"

    )

    print(

        f"✓ maintenanceactivity.csv\t{len(df)} rows"

    )

    return df


if __name__ == "__main__":

    generate()