import random
import pandas as pd
from datetime import timedelta

from generators.utils import load_csv, save_csv

# =========================================================
# LOAD
# =========================================================



# =========================================================
# REVIEW STAFF
# =========================================================



# =========================================================
# DATA
# =========================================================

COMMENTS = {

    1: [
        "Minor issue observed.",
        "Driver reminded.",
        "Low risk behaviour."
    ],

    2: [
        "Requires monitoring.",
        "Unsafe behaviour identified.",
        "Driver notified."
    ],

    3: [
        "Serious safety concern.",
        "Immediate action required.",
        "Supervisor notified."
    ],

    4: [
        "Critical incident.",
        "Investigation required.",
        "Escalated to management."
    ]

}

RECOMMENDATIONS = {

    1: [
        "Continue monitoring",
        "Driver reminder"
    ],

    2: [
        "Safety coaching",
        "Extra monitoring"
    ],

    3: [
        "Formal coaching",
        "Driver assessment"
    ],

    4: [
        "Suspend assignment",
        "Full investigation"
    ]

}

OUTCOME = {

    1: [
        "Closed"
    ],

    2: [
        "Warning Issued",
        "Closed"
    ],

    3: [
        "Coaching Required",
        "Under Review"
    ],

    4: [
        "Investigation",
        "Escalated"
    ]

}

# =========================================================
# GENERATE
# =========================================================

def generate():
    
    events = load_csv("safetyevent.csv")
    staff = load_csv("staff.csv")
    
    reviewers = staff.sample(
    frac=0.25,
    random_state=42
    ).StaffID.tolist()

    reviews = []

    review_id = 1

    reviewed = events[
        events["ReviewStatus"] == "Reviewed"
    ]

    for event in reviewed.itertuples(index=False):

        event_date = pd.to_datetime(
            event.EventTimestamp
        )

        review_date = event_date + timedelta(
            days=random.randint(1, 7)
        )

        severity = event.SeverityID

        reviews.append({

            "ReviewID": review_id,

            "EventID": event.EventID,

            "StaffID": random.choice(reviewers),

            "ReviewDate": review_date.date(),

            "Comment": random.choice(
                COMMENTS[severity]
            ),

            "Recommendation": random.choice(
                RECOMMENDATIONS[severity]
            ),

            "Outcome": random.choice(
                OUTCOME[severity]
            )

        })

        review_id += 1

    df = pd.DataFrame(reviews)

    save_csv(
        df,
        "safetyreview.csv"
    )

    print(
        f"✓ safetyreview.csv\t\t{len(df)} rows"
    )

    return df


if __name__ == "__main__":
    generate()