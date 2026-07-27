import pandas as pd

from generators.catalogs import SEVERITIES

from generators.utils import save_csv


def generate():

    df = pd.DataFrame(

        SEVERITIES,

        columns=[

            "SeverityID",

            "SeverityName",

            "PenaltyPoints",

            "ReviewRequired"

        ]

    )

    save_csv(

        df,

        "severity.csv"

    )

    return df