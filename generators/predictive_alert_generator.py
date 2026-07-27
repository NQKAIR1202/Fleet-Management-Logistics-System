import random
from datetime import timedelta

import pandas as pd

from generators.utils import load_csv, save_csv

# =========================================================
# DATA
# =========================================================

ALERT_TYPES = [
    "Brake Failure Risk",
    "Engine Failure Risk",
    "Tyre Wear Risk",
    "Battery Health Risk",
    "Driver Behaviour Risk"
]

SEVERITY = {
    "Low": 1,
    "Medium": 2,
    "High": 3,
    "Critical": 4
}

STATUS = [
    "Open",
    "In Progress",
    "Resolved"
]

ACTIONS = {
    "Brake Failure Risk": "Inspect brake system",
    "Engine Failure Risk": "Schedule engine inspection",
    "Tyre Wear Risk": "Replace tyres",
    "Battery Health Risk": "Battery diagnostic",
    "Driver Behaviour Risk": "Schedule coaching"
}

# =========================================================
# GENERATE
# =========================================================

def generate():

    vehicles = load_csv("vehicle.csv")
    scores = load_csv("driversafetyscore.csv")

    alerts = []

    alert_id = 1

    risky = scores[
        (scores["FinalScore"] < 70)
        |
        (scores["CriticalEventCount"] > 0)
    ]

    for _ in risky.itertuples(index=False):

        vehicle = vehicles.sample(1).iloc[0]

        alert_type = random.choice(ALERT_TYPES)

        severity_name = random.choices(
            list(SEVERITY.keys()),
            weights=[10, 30, 45, 15],
            k=1
        )[0]

        status = random.choice(STATUS)

        resolved_date = None

        if status == "Resolved":

            resolved_date = (
                pd.Timestamp.today()
                -
                timedelta(days=random.randint(0, 30))
            ).date()

        alerts.append({

            "AlertID": alert_id,

            "VIN": vehicle["VIN"],

            "AlertType": alert_type,

            "AlertTimestamp":
                pd.Timestamp.today()
                -
                timedelta(days=random.randint(0, 90)),

            "SeverityID":
                SEVERITY[severity_name],

            "AlertStatus":
                status,

            "ActionTaken":
                ACTIONS[alert_type],

            "ResolvedDate":
                resolved_date

        })

        alert_id += 1

    df = pd.DataFrame(alerts)

    save_csv(
        df,
        "predictivealert.csv"
    )

    print(
        f"✓ predictivealert.csv\t{len(df)} rows"
    )

    return df


# =========================================================
# MAIN
# =========================================================

if __name__ == "__main__":

    generate()