import pandas as pd

from generators.utils import load_csv, save_csv

# =========================================================
# BUSINESS RULE
# =========================================================

RULES = {

    "Delivery Van":[1],

    "Electric Van":[1,4],

    "Heavy Transport Truck":[1,2],

    "Refrigerated Truck":[1,2,3],

    "Service Vehicle":[1]

}

# =========================================================
# GENERATE
# =========================================================

def generate():

    categories = load_csv("vehiclecategory.csv")

    rows = []

    for category in categories.itertuples(index=False):

        certs = RULES.get(

            category.CategoryName,

            [1]

        )

        for cert in certs:

            rows.append({

                "VehicleCategoryID":

                    category.VehicleCategoryID,

                "CertificationID":

                    cert

            })

    df = pd.DataFrame(rows)

    save_csv(

        df,

        "vehiclecategorycertification.csv"

    )

    print(

        f"✓ vehiclecategorycertification.csv\t{len(df)} rows"

    )

    return df


if __name__ == "__main__":

    generate()