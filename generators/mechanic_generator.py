import random
import pandas as pd

from generators.utils import (
    load_csv,
    save_csv,
    vietnamese_name,
    random_phone)

# =========================================================
# CONFIG
# =========================================================

SPECIALISATIONS = [

    "General",

    "Engine",

    "Brake",

    "Electrical",

    "Cooling",

    "Tyre"

]

SPECIALISATION_WEIGHT = [

    25,

    20,

    18,

    12,

    15,

    10

]

EMPLOYMENT_STATUS = [

    "Active",

    "Inactive"

]

EMPLOYMENT_WEIGHT = [

    85,

    15

]

# =========================================================
# HELPERS
# =========================================================



def random_contact(index):

    return f"09{random.randint(10000000,99999999)}"


# =========================================================
# GENERATE
# =========================================================

def generate():

    workshops = load_csv("workshop.csv")

    rows = []

    mechanic_id = 1

    # khoảng 10-14 mechanic / workshop
    for workshop in workshops.itertuples(index=False):

        total = random.randint(10,14)

        for _ in range(total):

            rows.append({

                "MechanicID": mechanic_id,

                "FullName": vietnamese_name("M"),

                "WorkshopID": workshop.WorkshopID,

                "EmploymentStatus": random.choices(

                    EMPLOYMENT_STATUS,

                    weights=EMPLOYMENT_WEIGHT,

                    k=1

                )[0],

                "ContactInfo": random_phone(),

                "Specialisation": random.choices(

                    SPECIALISATIONS,

                    weights=SPECIALISATION_WEIGHT,

                    k=1

                )[0]

            })

            mechanic_id += 1

    df = pd.DataFrame(rows)

    save_csv(

        df,

        "mechanic.csv"

    )

    print(

        f"✓ mechanic.csv\t\t{len(df)} rows"

    )

    return df


if __name__ == "__main__":

    generate()