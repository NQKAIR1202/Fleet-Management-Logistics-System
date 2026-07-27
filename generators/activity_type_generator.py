import pandas as pd

from generators.catalogs import ACTIVITY_TYPES
from generators.utils import save_csv


def generate():

    rows = []

    for i, activity in enumerate(ACTIVITY_TYPES, start=1):

        rows.append([

            i,

            activity,

            f"{activity} activity"

        ])

    df = pd.DataFrame(

        rows,

        columns=[

            "ActivityTypeID",

            "ActivityTypeName",

            "Description"

        ]

    )

    save_csv(

        df,

        "activitytype.csv"

    )

    return df