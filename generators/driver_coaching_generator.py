import random
import pandas as pd
from datetime import timedelta

from generators.utils import load_csv, save_csv

# =========================================================
# LOAD
# =========================================================



# =========================================================
# DATA
# =========================================================

OUTCOME = [
    "Improved",
    "Needs Follow-up",
    "Completed Successfully",
    "Pending Evaluation"
]

STATUS = [
    "Scheduled",
    "Completed",
    "Cancelled"
]

STATUS_WEIGHT = [
    20,
    70,
    10
]

# =========================================================
# GENERATE
# =========================================================

def generate():
    
    scores = load_csv("driversafetyscore.csv")  

    coaching = []

    coaching_id = 1

    required = scores[
        scores["RequiresCoaching"] == True
    ]

    for row in required.itertuples(index=False):

        coaching_date = pd.Timestamp(

            year=int(row.ScoreYear),

            month=int(row.ScoreMonth),

            day=1

        ) + timedelta(

            days=random.randint(3, 20)

        )

        status = random.choices(

            STATUS,

            weights=STATUS_WEIGHT,

            k=1

        )[0]

        if status == "Cancelled":

            outcome = "Cancelled"

        elif status == "Scheduled":

            outcome = "Pending"

        else:

            outcome = random.choice(

                OUTCOME

            )

        coaching.append({

            "CoachingID": coaching_id,

            "DriverID": row.DriverID,

            "ScoreID": row.ScoreID,

            "CoachingDate": coaching_date.date(),

            "Outcome": outcome,

            "Status": status

        })

        coaching_id += 1

    df = pd.DataFrame(coaching)

    save_csv(

        df,

        "drivercoaching.csv"

    )

    print(

        f"✓ drivercoaching.csv\t{len(df)} rows"

    )

    return df


if __name__ == "__main__":

    generate()