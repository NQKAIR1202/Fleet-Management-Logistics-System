"""
=========================================================
Driver Certification Generator
Enterprise Version
=========================================================
"""

import random
import pandas as pd

from generators.utils import (
    save_csv,
    load_csv,
    random_past_date,
    random_future_date
)

# =========================================================
# LOAD DATA
# =========================================================



# =========================================================
# BUSINESS RULES
# =========================================================

BASE_CERTIFICATIONS = {

    "B2": [1],

    "C": [1, 2],

    "FC": [1, 2]

}

REFRIGERATED_CHANCE = 25

EV_CHANCE = 10

HAZARDOUS_CHANCE = 20

# =========================================================
# CERTIFICATION ENGINE
# =========================================================

def generate_certifications(licence):

    certs = list(

        BASE_CERTIFICATIONS[licence]

    )

    # Refrigerated

    if licence in ["C", "FC"]:

        if random.randint(1,100) <= REFRIGERATED_CHANCE:

            certs.append(3)

    # EV

    if random.randint(1,100) <= EV_CHANCE:

        certs.append(4)

    # Hazardous

    if licence == "FC":

        if random.randint(1,100) <= HAZARDOUS_CHANCE:

            certs.append(5)

    return sorted(

        list(

            set(certs)

        )

    )
    
# =========================================================
# GENERATOR
# =========================================================

def generate():
    
    drivers = load_csv("driver.csv")
    certifications = load_csv("certification.csv")

    rows = []

    total = 0

    certification_counter = {}

    for driver_id, row in enumerate(

        drivers.itertuples(index=False),

        start=1

    ):

        certs = generate_certifications(

            row.LicenceType

        )

        for cert in certs:

            rows.append([

                driver_id,

                cert,

                random_past_date(),

                random_future_date()

            ])

            certification_counter[cert] = (

                certification_counter.get(cert,0)+1

            )

            total += 1

    df = pd.DataFrame(

        rows,

        columns=[

            "DriverID",

            "CertificationID",

            "IssueDate",

            "ExpiryDate"

        ]

    )

    save_csv(

        df,

        "drivercertification.csv"

    )

    print()

    print("Certification Distribution")

    for cert, count in sorted(

        certification_counter.items()

    ):

        print(

            f"Certification {cert}: {count}"

        )

    print()

    print(

        f"Total Certifications : {total}"

    )

    return df