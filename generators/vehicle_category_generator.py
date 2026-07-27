import pandas as pd

from generators.catalogs import VEHICLE_CATEGORIES

from generators.utils import save_csv


def generate():

    df = pd.DataFrame(

        VEHICLE_CATEGORIES,

        columns=[

            "VehicleCategoryID",

            "CategoryName",

            "Description"

        ]

    )

    save_csv(

        df,

        "vehiclecategory.csv"

    )

    return df