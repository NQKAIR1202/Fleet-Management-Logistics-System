"""
=========================================================
Vehicle Generator
Enterprise Version
=========================================================
"""

import random
import pandas as pd

from generators.catalogs import (
    VEHICLE_CATEGORIES,
    VEHICLE_CATEGORY_WEIGHTS,
    VEHICLE_MODELS,
    DEPOT_WEIGHTS,
    DEPOT_PLATES,
    YEAR_WEIGHTS,
    VEHICLE_STATUS
)

from generators.utils import (
    save_csv,
    random_vin
)

# =========================================================
# CATEGORY
# =========================================================

CATEGORY_NAMES = list(VEHICLE_CATEGORY_WEIGHTS.keys())

CATEGORY_WEIGHTS = list(VEHICLE_CATEGORY_WEIGHTS.values())


def choose_category():

    """
    Weighted vehicle category
    """

    return random.choices(

        CATEGORY_NAMES,

        weights=CATEGORY_WEIGHTS,

        k=1

    )[0]


# =========================================================
# DEPOT
# =========================================================

DEPOT_IDS = [1,2,3,4]


def choose_depot(category):

    weights = DEPOT_WEIGHTS[category]

    return random.choices(

        DEPOT_IDS,

        weights=weights,

        k=1

    )[0]


# =========================================================
# VEHICLE MODEL
# =========================================================

def choose_model(category):

    manufacturer, model = random.choice(

        VEHICLE_MODELS[category]

    )

    return manufacturer, model


# =========================================================
# CATEGORY ID
# =========================================================

CATEGORY_ID = {

    row[1]: row[0]

    for row in VEHICLE_CATEGORIES

}

# =========================================================
# MANUFACTURE YEAR
# =========================================================

YEAR_LIST = list(YEAR_WEIGHTS.keys())

YEAR_WEIGHT_LIST = list(YEAR_WEIGHTS.values())


def choose_year():

    return random.choices(

        YEAR_LIST,

        weights=YEAR_WEIGHT_LIST,

        k=1

    )[0]


# =========================================================
# ODOMETER
# =========================================================

def generate_odometer(year):

    if year == 2025:
        return random.randint(5000,25000)

    elif year == 2024:
        return random.randint(25000,60000)

    elif year == 2023:
        return random.randint(50000,120000)

    elif year == 2022:
        return random.randint(70000,180000)

    elif year == 2021:
        return random.randint(100000,240000)

    elif year == 2020:
        return random.randint(140000,300000)

    elif year == 2019:
        return random.randint(180000,360000)

    elif year == 2018:
        return random.randint(220000,430000)

    elif year == 2017:
        return random.randint(300000,550000)

    else:
        return random.randint(420000,700000)
    
    # =========================================================
# REGISTRATION NUMBER
# =========================================================

USED_PLATES = set()


def generate_registration(depot):

    while True:

        prefix = random.choice(

            DEPOT_PLATES[depot]

        )

        suffix = random.choice(["C","H"])

        number = random.randint(

            10000,

            99999

        )

        plate = f"{prefix}{suffix}-{number}"

        if plate not in USED_PLATES:

            USED_PLATES.add(plate)

            return plate
        
        # =========================================================
# UNIQUE VIN
# =========================================================

USED_VIN = set()


def generate_unique_vin():

    while True:

        vin = random_vin()

        if vin not in USED_VIN:

            USED_VIN.add(vin)

            return vin
        
        # =========================================================
# STATUS
# =========================================================

STATUS_NAME = list(

    VEHICLE_STATUS.keys()

)

STATUS_WEIGHT = list(

    VEHICLE_STATUS.values()

)


def choose_status():

    return random.choices(

        STATUS_NAME,

        weights=STATUS_WEIGHT,

        k=1

    )[0]
    
    # =========================================================
# GENERATOR
# =========================================================

def generate(total=500):

    rows = []

    category_counter = {}

    depot_counter = {}

    for _ in range(total):

        # -----------------------------
        # Vehicle Category
        # -----------------------------

        category_name = choose_category()

        category_id = CATEGORY_ID[category_name]

        category_counter[category_name] = (

            category_counter.get(category_name,0)+1

        )

        # -----------------------------
        # Depot
        # -----------------------------

        depot = choose_depot(category_name)

        depot_counter[depot] = (

            depot_counter.get(depot,0)+1

        )

        # -----------------------------
        # Manufacturer + Model
        # -----------------------------

        manufacturer, model = choose_model(

            category_name

        )

        # -----------------------------
        # Manufacture Year
        # -----------------------------

        year = choose_year()

        # -----------------------------
        # Odometer
        # -----------------------------

        odometer = generate_odometer(

            year

        )

        # -----------------------------
        # Registration
        # -----------------------------

        registration = generate_registration(

            depot

        )

        # -----------------------------
        # VIN
        # -----------------------------

        vin = generate_unique_vin()

        # -----------------------------
        # Status
        # -----------------------------

        status = choose_status()

        rows.append([

            vin,

            registration,

            category_id,

            manufacturer,

            model,

            year,

            odometer,

            depot,

            status

        ])

    df = pd.DataFrame(

        rows,

        columns=[

            "VIN",

            "RegistrationNumber",

            "VehicleCategoryID",

            "Manufacturer",

            "Model",

            "ManufactureYear",

            "CurrentOdometer",

            "DepotID",

            "OperationalStatus"

        ]

    )

    save_csv(

        df,

        "vehicle.csv"

    )

    print()

    print("Vehicle Category Distribution")

    for k,v in sorted(

        category_counter.items()

    ):

        print(

            f"{k:<30}{v}"

        )

    print()

    print("Depot Distribution")

    for depot in sorted(

        depot_counter

    ):

        print(

            f"Depot {depot}: {depot_counter[depot]}"

        )

    return df   