import pandas as pd

from generators.utils import load_csv, save_csv

# =========================================================
# CERTIFICATION ID
#
# 1 = Standard
# 2 = Heavy
# 3 = Refrigerated
# 4 = EV
# =========================================================

def get_certification(activity_name):
    
    name = activity_name.lower()

    certs = [1]      # Standard luôn có

    # Heavy Vehicle
    if any(x in name for x in [

        "brake",

        "transmission",

        "gearbox",

        "tyre"

    ]):

        certs.append(2)

    # Refrigerated

    if any(x in name for x in [

        "coolant",

        "refrigeration"

    ]):

        certs.append(3)

    # EV

    if any(x in name for x in [

        "battery",

        "ev"

    ]):

        certs.append(4)

    return sorted(set(certs))


# =========================================================
# GENERATE
# =========================================================

def generate():

    activity_types = load_csv("activitytype.csv")

    rows = []

    for activity in activity_types.itertuples(index=False):

        certs = get_certification(
            activity.ActivityTypeName
        )

        for cert in certs:

            rows.append({

                "ActivityTypeID":
                    activity.ActivityTypeID,

                "CertificationID":
                    cert

            })

    df = pd.DataFrame(rows)

    save_csv(
        df,
        "activitytypecertification.csv"
    )

    print(
        f"✓ activitytypecertification.csv\t{len(df)} rows"
    )

    return df


if __name__ == "__main__":
    generate()