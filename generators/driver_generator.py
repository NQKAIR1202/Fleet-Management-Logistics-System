"""
=========================================================
Driver Generator
Enterprise Version
=========================================================
"""

import random
import pandas as pd

from generators.catalogs import (
    DRIVER_STATUS,
    DRIVER_DEPOT_WEIGHTS,
    DRIVER_LICENSE_CLASSES
)

from generators.utils import (
    save_csv,
    vietnamese_name,
    random_phone,
    random_email,
    random_future_date,
    weighted_choice
)

# =========================================================
# CONSTANTS
# =========================================================

TOTAL_DRIVERS = 220

DEPOTS = [1, 2, 3, 4]

STATUS_NAMES = list(DRIVER_STATUS.keys())
STATUS_WEIGHTS = list(DRIVER_STATUS.values())


# =========================================================
# DRIVER INFO
# =========================================================

def generate_driver_name():

    gender = random.choice(["M", "F"])

    return vietnamese_name(gender)


def choose_depot():

    return weighted_choice(

        DEPOTS,

        DRIVER_DEPOT_WEIGHTS

    )


def choose_status():

    return weighted_choice(

        STATUS_NAMES,

        STATUS_WEIGHTS

    )


def choose_license_type():

    return weighted_choice(

        DRIVER_LICENSE_CLASSES,

        [45, 35, 20]

    )


def generate_contact(name):

    phone = random_phone()

    email = random_email(name)

    return f"{phone} | {email}"


def generate_emergency_contact():

    return random_phone()


# =========================================================
# GENERATOR
# =========================================================

def generate(total=TOTAL_DRIVERS):

    rows = []

    depot_counter = {}

    status_counter = {}

    licence_counter = {}

    for _ in range(total):

        name = generate_driver_name()

        depot = choose_depot()

        depot_counter[depot] = depot_counter.get(depot, 0) + 1

        status = choose_status()

        status_counter[status] = status_counter.get(status, 0) + 1

        licence = choose_license_type()

        licence_counter[licence] = (

            licence_counter.get(licence, 0) + 1

        )

        contact = generate_contact(name)

        emergency = generate_emergency_contact()

        expiry = random_future_date()

        rows.append([

            name,

            contact,

            depot,

            licence,

            expiry,

            status,

            emergency

        ])

    df = pd.DataFrame(

        rows,

        columns=[

            "FullName",

            "ContactInfo",

            "DepotID",

            "LicenceType",

            "LicenceExpiryDate",

            "EmploymentStatus",

            "EmergencyContact"

        ]

    )

    save_csv(

        df,

        "driver.csv"

    )

    print()

    print("Driver Status Distribution")

    for k, v in status_counter.items():

        print(f"{k:<12}{v}")

    print()

    print("Driver Licence Distribution")

    for k, v in licence_counter.items():

        print(f"{k:<5}{v}")

    print()

    print("Driver Depot Distribution")

    for depot in sorted(depot_counter):

        print(f"Depot {depot}: {depot_counter[depot]}")

    return df


if __name__ == "__main__":

    generate()