import random
import pandas as pd

from generators.utils import load_csv, save_csv


# =========================================================
# GENERATE
# =========================================================

def generate():

    activities = load_csv("maintenanceactivity.csv")
    parts = load_csv("part.csv")

    rows = []
    used = set()

    for activity in activities.itertuples(index=False):

        total = random.randint(0, 4)

        if total == 0:
            continue

        selected = parts.sample(
            n=min(total, len(parts)),
            replace=False
        )

        for part in selected.itertuples(index=False):

            key = (
                activity.ActivityID,
                part.PartID
            )

            if key in used:
                continue

            used.add(key)

            rows.append({

                "ActivityID": activity.ActivityID,

                "PartID": part.PartID,

                "QuantityUsed": random.randint(1, 5),

                "UnitCostAtTime": round(
                    part.UnitPriceVND *
                    random.uniform(0.9, 1.1),
                    2
                )

            })

    df = pd.DataFrame(rows)

    save_csv(
        df,
        "activitypart.csv"
    )

    print(
        f"✓ activitypart.csv\t{len(df)} rows"
    )

    return df


if __name__ == "__main__":

    generate()