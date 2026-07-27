"""
=========================================================
Vehicle Assignment Generator
Enterprise Version (V2)
=========================================================
"""

import random
from collections import defaultdict
from datetime import timedelta

import pandas as pd

from generators.utils import (
    load_csv,
    save_csv,
    random_past_date,
    random_end_date
)

# =========================================================
# LOAD DATA
# =========================================================

vehicles = load_csv("vehicle.csv")
drivers = load_csv("driver.csv")
driver_certifications = load_csv("drivercertification.csv")

# =========================================================
# CATEGORY
# =========================================================

CATEGORY_DELIVERY = 1
CATEGORY_REFRIGERATED = 2
CATEGORY_EV = 3
CATEGORY_SERVICE = 4
CATEGORY_HEAVY = 5

# =========================================================
# STATUS
# =========================================================

STATUS_COMPLETED = "Completed"
STATUS_ACTIVE = "Active"
STATUS_CANCELLED = "Cancelled"

STATUSS = [
    STATUS_COMPLETED,
    STATUS_ACTIVE,
    STATUS_CANCELLED
]

STATUS_WEIGHTS = [
    70,
    20,
    10
]

# =========================================================
# REQUIRED LICENCE
# =========================================================

LICENCE_RULE = {

    CATEGORY_DELIVERY: ["B2","C","FC"],

    CATEGORY_EV: ["B2","C","FC"],

    CATEGORY_SERVICE: ["B2","C","FC"],

    CATEGORY_HEAVY: ["C","FC"],

    CATEGORY_REFRIGERATED: ["C","FC"]

}

# =========================================================
# REQUIRED CERTIFICATION
# =========================================================

"""
1 Standard
2 Heavy
3 Refrigerated
4 EV
"""

CERT_RULE = {

    CATEGORY_DELIVERY: {1},

    CATEGORY_SERVICE: {1},

    CATEGORY_HEAVY: {1,2},

    CATEGORY_REFRIGERATED: {1,2,3},

    CATEGORY_EV: {1,4}

}

# =========================================================
# DRIVER CERT CACHE
# =========================================================

driver_cert_map = defaultdict(set)

for row in driver_certifications.itertuples(index=False):

    driver_cert_map[row.DriverID].add(
        row.CertificationID
    )

# =========================================================
# WORKLOAD
# =========================================================

driver_history_count = defaultdict(int)

vehicle_history_count = defaultdict(int)

active_driver = set()

active_vehicle = set()

# =========================================================
# DRIVER CHECK
# =========================================================

def licence_ok(driver, category):

    return driver.LicenceType in LICENCE_RULE[category]


def certification_ok(driver_id, category):

    required = CERT_RULE[category]

    owned = driver_cert_map.get(
        driver_id,
        set()
    )

    return required.issubset(owned)


# =========================================================
# DRIVER FILTER
# =========================================================

def candidate_drivers(vehicle):

    candidates = []

    for driver_id, driver in enumerate(

        drivers.itertuples(index=False),

        start=1

    ):

        if driver.EmploymentStatus != "Active":

            continue
        
        if driver_id in active_driver:
            continue

        if not licence_ok(driver, vehicle.VehicleCategoryID):

            continue

        if not certification_ok(

            driver_id,

            vehicle.VehicleCategoryID

        ):

            continue

        score = 0

        # same depot
        if driver.DepotID == vehicle.DepotID:

            score += 100

        else:

            score += 10

        # workload balancing
        score -= driver_history_count[driver_id] * 8

        candidates.append({

            "DriverID": driver_id,

            "Driver": driver,

            "Score": score

        })

    candidates.sort(

        key=lambda x: x["Score"],

        reverse=True

    )

    return candidates


# =========================================================
# ASSIGNMENT HELPERS
# =========================================================

def choose_status():

    return random.choices(
        STATUSS,
        weights=STATUS_WEIGHTS,
        k=1
    )[0]


def assignment_count():

    return random.choices(

        [1, 2, 3, 4, 5],

        weights=[
            20,
            50,
            20,
            8,
            2
        ],

        k=1

    )[0]


def choose_driver(vehicle):

    candidates = candidate_drivers(vehicle)

    if len(candidates) == 0:

        return None

    best_score = candidates[0]["Score"]

    top = [

        c

        for c in candidates

        if c["Score"] >= best_score - 15

    ]

    return random.choice(top)


# =========================================================
# DATE
# =========================================================

def completed_period():

    start = random_past_date(3650)

    end = random_end_date(

        start,

        30,

        720

    )

    return start, end


def cancelled_period():

    start = random_past_date(3650)

    end = random_end_date(

        start,

        1,

        15

    )

    return start, end


def active_period():

    start = random_past_date(365)

    return start, None


# =========================================================
# CREATE ASSIGNMENT
# =========================================================

def create_assignment(

    assignment_id,

    driver_id,

    vehicle,

    status,

    start_date,

    end_date

):

    if status == STATUS_ACTIVE:

        active_driver.add(driver_id)

        active_vehicle.add(vehicle.VIN)

    driver_history_count[driver_id] += 1

    vehicle_history_count[vehicle.VIN] += 1

    return {

        "AssignmentID": assignment_id,

        "VIN": vehicle.VIN,

        "DriverID": driver_id,

        "DepotID": vehicle.DepotID,

        "StartDate": start_date,

        "EndDate": end_date,

        "AssignmentStatus": status

    }
    
    
    # =========================================================
# GENERATE
# =========================================================

def generate():

    assignments = []

    assignment_id = 1

    for vehicle in vehicles.itertuples(index=False):

        history = assignment_count()

        # ----------------------------------------
        # Completed History
        # ----------------------------------------

        completed_total = max(0, history - 1)

        for _ in range(completed_total):

            driver_info = choose_driver(vehicle)

            if driver_info is None:
                break

            driver_id = driver_info["DriverID"]

            start_date, end_date = completed_period()

            assignments.append(

                create_assignment(

                    assignment_id,

                    driver_id,

                    vehicle,

                    STATUS_COMPLETED,

                    start_date,

                    end_date

                )

            )

            assignment_id += 1

        # ----------------------------------------
        # Current Assignment
        # ----------------------------------------

        driver_info = choose_driver(vehicle)

        if driver_info is None:
            continue

        driver_id = driver_info["DriverID"]

        status = choose_status()

        if status == STATUS_ACTIVE:

            if (
                driver_id in active_driver
                or vehicle.VIN in active_vehicle
            ):
                status = STATUS_COMPLETED

        if status == STATUS_ACTIVE:

            start_date, end_date = active_period()

        elif status == STATUS_CANCELLED:

            start_date, end_date = cancelled_period()

        else:

            start_date, end_date = completed_period()

        assignments.append(

            create_assignment(

                assignment_id,

                driver_id,

                vehicle,

                status,

                start_date,

                end_date

            )

        )

        assignment_id += 1

    df = pd.DataFrame(assignments)

    df.sort_values(

        by=[

            "VIN",

            "StartDate"

        ],

        inplace=True

    )

    return df


# =========================================================
# EXPORT
# =========================================================

def export():

    df = generate()

    save_csv(

        df,

        "vehicleassignment.csv"

    )

    print()

    print("Assignment Status Distribution")

    print(

        df["AssignmentStatus"].value_counts()

    )

    print()

    print(

        "Vehicle Assignment Statistics"

    )

    print(

        f"Total Assignments : {len(df)}"

    )

    print(

        f"Vehicles Assigned : {df['VIN'].nunique()}"

    )

    print(

        f"Drivers Used : {df['DriverID'].nunique()}"

    )

    print()

    print(

        "Average Assignments per Vehicle :",

        round(

            len(df) /

            df["VIN"].nunique(),

            2

        )

    )


# =========================================================
# MAIN
# =========================================================

if __name__ == "__main__":

    export()