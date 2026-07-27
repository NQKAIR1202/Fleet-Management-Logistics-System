import pandas as pd

from generators.catalogs import EVENT_TYPES

from generators.utils import save_csv


def generate():

    df = pd.DataFrame(

        EVENT_TYPES,

        columns=[

            "EventTypeID",

            "EventTypeName"

        ]

    )

    save_csv(

        df,

        "eventtype.csv"

    )

    return df