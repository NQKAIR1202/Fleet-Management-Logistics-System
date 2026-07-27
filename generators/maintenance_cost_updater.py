import pandas as pd

from generators.utils import load_csv, save_csv

# =========================================================
# CONFIG
# =========================================================

LABOUR_RATE = 250000  # VND / hour

# =========================================================
# GENERATE
# =========================================================

def generate():

    jobs = load_csv("maintenancejob.csv")
    activities = load_csv("maintenanceactivity.csv")
    mechanics = load_csv("activitymechanic.csv")
    parts = load_csv("activitypart.csv")

    # =====================================================
    # Labour Cost
    # =====================================================

    labour = mechanics.merge(
        activities[["ActivityID", "JobID"]],
        on="ActivityID",
        how="left"
    )

    labour["LabourCost"] = (
        labour["LabourHours"] * LABOUR_RATE
    )

    labour_cost = labour.groupby("JobID")["LabourCost"].sum()

    # =====================================================
    # Part Cost
    # =====================================================

    part = parts.merge(
        activities[["ActivityID", "JobID"]],
        on="ActivityID",
        how="left"
    )

    part["PartCost"] = (
        part["QuantityUsed"] *
        part["UnitCostAtTime"]
    )

    part_cost = part.groupby("JobID")["PartCost"].sum()

    # =====================================================
    # Update Total Cost
    # =====================================================

    jobs["TotalCostVND"] = 0.0

    for i, row in jobs.iterrows():

        job = row.JobID

        labour_total = labour_cost.get(job, 0)

        part_total = part_cost.get(job, 0)

        jobs.at[i, "TotalCostVND"] = round(

            labour_total + part_total,

            2

        )

    save_csv(

        jobs,

        "maintenancejob.csv"

    )

    print()

    print("Maintenance Cost Summary")

    print("--------------------------------")

    print(

        f"Jobs : {len(jobs)}"

    )

    print(

        f"Average Cost : {jobs['TotalCostVND'].mean():,.0f} VND"

    )

    print(

        f"Max Cost : {jobs['TotalCostVND'].max():,.0f} VND"

    )

    print()

    print("✓ maintenancejob.csv updated")

    return jobs


if __name__ == "__main__":

    generate()