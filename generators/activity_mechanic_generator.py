import random
import pandas as pd

from generators.utils import load_csv, save_csv

ROLES = [
    "Lead Mechanic",
    "Assistant Mechanic",
    "Inspector",
    "Electric Specialist"
]


def generate():

    activities = load_csv("maintenanceactivity.csv")
    mechanics = load_csv("mechanic.csv")

    mechanic_ids = mechanics["MechanicID"].tolist()

    rows = []

    used = set()

    for activity in activities.itertuples(index=False):

        total = random.randint(1, 3)

        selected = random.sample(
            mechanic_ids,
            min(total, len(mechanic_ids))
        )

        for mechanic in selected:

            key = (
                activity.ActivityID,
                mechanic
            )

            if key in used:
                continue

            used.add(key)

            rows.append({

                "ActivityID": activity.ActivityID,

                "MechanicID": mechanic,

                "LabourHours": round(
                    random.uniform(0.5, 8),
                    2
                ),

                "RoleInActivity": random.choice(
                    ROLES
                )

            })

    df = pd.DataFrame(rows)

    save_csv(
        df,
        "activitymechanic.csv"
    )

    print(
        f"✓ activitymechanic.csv\t{len(df)} rows"
    )

    return df


if __name__ == "__main__":
    generate()