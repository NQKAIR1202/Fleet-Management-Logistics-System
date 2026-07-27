import random
import pandas as pd
from datetime import date, timedelta

from generators.utils import load_csv, save_csv

# =========================================================
# SPECIALISATION -> CERTIFICATION
# =========================================================

CERT_MAP = {

    "General": [1],

    "Engine": [1],

    "Brake": [1,2],

    "Cooling": [1,3],

    "Electrical": [1,4],

    "Tyre": [1]

}

# =========================================================
# HELPERS
# =========================================================

def random_issue():

    start = date(2021,1,1)

    end = date(2025,1,1)

    days = (end-start).days

    return start + timedelta(

        days=random.randint(0,days)

    )


# =========================================================
# GENERATE
# =========================================================

def generate():

    mechanics = load_csv("mechanic.csv")

    rows = []

    cert_id = 1

    for mechanic in mechanics.itertuples(index=False):

        certs = CERT_MAP.get(

            mechanic.Specialisation,

            [1]

        )

        issue = random_issue()

        for cert in certs:

            rows.append({

                "MechanicCertificationID": cert_id,

                "MechanicID": mechanic.MechanicID,

                "CertificationID": cert,

                "IssueDate": issue,

                "ExpiryDate": issue.replace(

                    year=issue.year+3

                )

            })

            cert_id += 1

    df = pd.DataFrame(rows)

    save_csv(

        df,

        "mechaniccertification.csv"

    )

    print(

        f"✓ mechaniccertification.csv\t{len(df)} rows"

    )

    return df


if __name__ == "__main__":

    generate()