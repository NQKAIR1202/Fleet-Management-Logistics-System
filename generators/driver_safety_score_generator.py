import pandas as pd

from generators.utils import load_csv, save_csv

# =========================================================
# LOAD
# =========================================================



# =========================================================
# PENALTY
# =========================================================

severity = {

    1: 5,
    2: 10,
    3: 20,
    4: 40

}

# =========================================================
# GENERATE
# =========================================================

def generate():
    
    events = load_csv("safetyevent.csv")

    df = events.copy()

    df["EventTimestamp"] = pd.to_datetime(
        df["EventTimestamp"]
    )

    df["ScoreMonth"] = df["EventTimestamp"].dt.month

    df["ScoreYear"] = df["EventTimestamp"].dt.year

    df["Penalty"] = df["SeverityID"].map(
        severity
    )

    result = []

    score_id = 1

    grouped = df.groupby(

        [

            "DriverID",

            "ScoreMonth",

            "ScoreYear"

        ]

    )

    for (

        driver,

        month,

        year

    ), g in grouped:

        starting = 100

        total_penalty = g["Penalty"].sum()

        final = max(

            starting - total_penalty,

            0

        )

        result.append({

            "ScoreID": score_id,

            "DriverID": driver,

            "ScoreMonth": month,

            "ScoreYear": year,

            "StartingScore": starting,

            "TotalPenalty": total_penalty,

            "HarshBrakingCount":

                (g["EventTypeID"] == 1).sum(),

            "SpeedingCount":

                (g["EventTypeID"] == 2).sum(),

            "FatigueWarningCount":

                (g["EventTypeID"] == 3).sum(),

            "CriticalEventCount":

                (g["SeverityID"] == 4).sum(),

            "FinalScore": final,

            "RequiresCoaching":

                final < 70,

            "AssignmentBlocked":

                final < 50

        })

        score_id += 1

    out = pd.DataFrame(result)

    save_csv(

        out,

        "driversafetyscore.csv"

    )

    print(

        f"✓ driversafetyscore.csv\t{len(out)} rows"

    )

    return out


if __name__ == "__main__":

    generate()