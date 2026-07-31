"""
=========================================================
Safety Event Generator
Enterprise Version
=========================================================
"""

import random
from datetime import timedelta
import pandas as pd

from generators.utils import (
    load_csv,
    save_csv
)

# =========================================================
# LOAD DATA
# =========================================================

assignments = load_csv("vehicleassignment.csv")
vehicles = load_csv("vehicle.csv")
event_types = load_csv("eventtype.csv")
severity = load_csv("severity.csv")

# =========================================================
# LOOKUP TABLE
# =========================================================

EVENT_ID = dict(
    zip(
        event_types["EventTypeName"],
        event_types["EventTypeID"]
    )
)

SEVERITY_ID = dict(
    zip(
        severity["SeverityName"],
        severity["SeverityID"]
    )
)

# =========================================================
# EVENT -> SEVERITY
# =========================================================

EVENT_SEVERITY = {

    "Speeding": "Medium",

    "Harsh Braking": "Medium",

    "Rapid Acceleration": "Medium",

    "Sharp Cornering": "Low",

    "Fatigue Warning": "High",

    "Engine Warning": "High",

    "Seatbelt Violation": "Low",

    "Phone Distraction": "Medium",

}

# =========================================================
# EVENT WEIGHT
# =========================================================

EVENT_POOL = [

    ("Speeding",28),

    ("Harsh Braking",18),

    ("Rapid Acceleration",15),

    ("Sharp Cornering",12),

    ("Fatigue Warning",10),

    ("Engine Warning",6),

    ("Seatbelt Violation",6),

    ("Phone Distraction",5),

]

EVENT_NAMES = [

    x[0]

    for x in EVENT_POOL

]

EVENT_WEIGHTS = [

    x[1]

    for x in EVENT_POOL

]

# =========================================================
# REVIEW
# =========================================================

REVIEW_STATUS = [

    "Pending",

    "Reviewed"

]

REVIEW_WEIGHT = [

    70,

    30

]

# =========================================================
# VEHICLE LOOKUP
# =========================================================

vehicle_map = {}

for row in vehicles.itertuples(index=False):

    vehicle_map[row.VIN] = row

# =========================================================
# HELPERS
# =========================================================

def choose_event():

    return random.choices(

        EVENT_NAMES,

        weights=EVENT_WEIGHTS,

        k=1

    )[0]


def choose_review():

    return random.choices(

        REVIEW_STATUS,

        weights=REVIEW_WEIGHT,

        k=1

    )[0]


def assignment_event_count(status):

    if status == "Completed":

        return random.randint(3,8)

    if status == "Active":

        return random.randint(2,6)

    return random.randint(0,2)


def event_severity(event_name):

    severity_name = EVENT_SEVERITY[event_name]

    return SEVERITY_ID[severity_name]

# =========================================================
# DATE HELPERS
# =========================================================

def random_timestamp(start_date, end_date):

    if pd.isna(end_date):

        end_date = pd.Timestamp.today().date()

    start = pd.Timestamp(start_date)

    end = pd.Timestamp(end_date)

    if end <= start:

        end = start + timedelta(days=1)

    seconds = int((end - start).total_seconds())

    offset = random.randint(0, max(seconds, 1))

    return start + timedelta(seconds=offset)


# =========================================================
# ODOMETER
# =========================================================

def random_odometer(current_odometer):

    value = current_odometer + random.randint(-3000, 3000)

    return max(value, 0)


# =========================================================
# CREATE EVENT
# =========================================================

def create_event(

    event_id,

    assignment,

    vehicle,

    event_name

):

    severity_id = event_severity(event_name)

    timestamp = random_timestamp(

        assignment.StartDate,

        assignment.EndDate

    )

    review = choose_review()

    return {

        "EventID": event_id,

        "EventTimestamp": timestamp,

        "VIN": assignment.VIN,

        "DriverID": assignment.DriverID,

        "DepotID": vehicle.DepotID,

        "EventTypeID": EVENT_ID[event_name],

        "SeverityID": severity_id,

        "Odometer": random_odometer(
            vehicle.CurrentOdometer
        ),

        "ReviewStatus": review

    }
    
    # =========================================================
# GENERATE
# =========================================================

def generate():

    events = []

    event_id = 1

    for assignment in assignments.itertuples(index=False):

        vehicle = vehicle_map.get(

            assignment.VIN

        )

        if vehicle is None:

            continue

        total = assignment_event_count(

            assignment.AssignmentStatus

        )

        for _ in range(total):

            event_name = choose_event()

            # Nếu Event không tồn tại trong CSV thì bỏ qua
            if event_name not in EVENT_ID:
    
                raise ValueError(

                    f"Unknown Event Type: {event_name}"

                )
            events.append(

                create_event(

                    event_id,

                    assignment,

                    vehicle,

                    event_name

                )

            )

            event_id += 1

    df = pd.DataFrame(events)

    df.sort_values(

        by=[

            "EventTimestamp"

        ],

        inplace=True

    )

    save_csv(

        df,

        "safetyevent.csv"

    )

    print()

    print("Safety Event Distribution")

    print(

        df["EventTypeID"].value_counts()

    )

    print()

    print(

        "Total Safety Events :", len(df)

    )

    return df


# =========================================================
# MAIN
# =========================================================

if __name__ == "__main__":

    generate()