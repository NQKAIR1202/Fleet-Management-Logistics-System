import pandas as pd

from generators.catalogs import CERTIFICATIONS

from generators.utils import save_csv


def generate():

    df = pd.DataFrame(

        CERTIFICATIONS,

        columns=[

            "CertificationID",

            "CertificationName"

        ]

    )

    save_csv(

        df,

        "certification.csv"

    )

    return df