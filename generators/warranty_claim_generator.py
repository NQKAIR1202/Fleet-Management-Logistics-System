import random
from datetime import timedelta

import pandas as pd

from generators.utils import load_csv, save_csv

# =========================================================
# CONFIG
# =========================================================

STATUS = [
    "Submitted",
    "Approved",
    "Rejected",
    "Paid"
]

STATUS_WEIGHT = [
    20,
    35,
    15,
    30
]

# =========================================================
# GENERATE
# =========================================================

def generate():

    activities = load_csv("maintenanceactivity.csv")
    activity_parts = load_csv("activitypart.csv")
    parts = load_csv("part.csv")

    # Convert WarrantyIndicator về bool an toàn
    activities["WarrantyIndicator"] = (
        activities["WarrantyIndicator"]
        .astype(str)
        .str.lower()
        .isin(["true", "1", "yes"])
    )

    rows = []

    claim_id = 1

    merged = activity_parts.merge(

        parts[
            [
                "PartID",
                "PrimarySupplierID",
                "UnitPriceVND"
            ]
        ],

        on="PartID",

        how="left"

    )

    warranty = activities[
        activities["WarrantyIndicator"]
    ]

    for activity in warranty.itertuples(index=False):

        used_parts = merged[
            merged["ActivityID"] == activity.ActivityID
        ]

        if used_parts.empty:
            continue

        supplier = int(
            used_parts.iloc[0]["PrimarySupplierID"]
        )

        # Nếu ActivityPart có QuantityUsed thì dùng
        if "QuantityUsed" in used_parts.columns:

            total_cost = (
                used_parts["QuantityUsed"]
                *
                used_parts["UnitPriceVND"]
            ).sum()

        else:

            total_cost = used_parts["UnitPriceVND"].sum()

        status = random.choices(
            STATUS,
            weights=STATUS_WEIGHT,
            k=1
        )[0]

        claim_amount = round(
            total_cost * random.uniform(0.6, 1.0),
            2
        )

        claim_date = (
            pd.Timestamp.today()
            -
            timedelta(days=random.randint(0,365))
        ).date()

        rows.append({

            "WarrantyClaimID": claim_id,

            "ActivityID": activity.ActivityID,

            "SupplierID": supplier,

            "ClaimDate": claim_date,

            "ClaimStatus": status,

            "ClaimAmountVND": claim_amount

        })

        claim_id += 1

    df = pd.DataFrame(rows)

    save_csv(
        df,
        "warrantyclaim.csv"
    )

    print(
        f"✓ warrantyclaim.csv\t{len(df)} rows"
    )

    return df


# =========================================================
# MAIN
# =========================================================

if __name__ == "__main__":

    generate()