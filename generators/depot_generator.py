import pandas as pd

from generators.catalogs import DEPOTS

from generators.utils import save_csv


def generate():

    rows = []

    for i, city in enumerate(DEPOTS, start=1):

        rows.append([

            i,

            city + " Depot",

            city,

            city

        ])

    df = pd.DataFrame(

        rows,

        columns=[

            "DepotID",

            "DepotName",

            "City",

            "Address"

        ]

    )

    save_csv(

        df,

        "depot.csv"

    )

    return df