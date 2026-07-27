import random
import pandas as pd

from generators.catalogs import (
    LAST_NAMES,
    MIDDLE_NAMES,
    MALE_FIRST_NAMES,
    FEMALE_FIRST_NAMES,
    FEMALE_MIDDLE,
    DEPOTS
)

from generators.utils import (
    save_csv,
    random_phone
)

ROLES = [

    "Fleet Manager",

    "Workshop Manager",

    "Safety Officer",

    "Maintenance Planner",

    "Operations Coordinator",

    "HR Officer",

    "Procurement Officer"

]

FOREIGN_NAMES = [

    "Michael Johnson",

    "David Miller",

    "Kenji Sato",

    "Yuki Tanaka",

    "Hans Muller",

    "Thomas Weber",

    "Min-Jun Kim",

    "Ji-Hoon Park"

]


def vietnamese_name():

    if random.random() < 0.55:

        return " ".join([

            random.choice(LAST_NAMES),

            random.choice(MIDDLE_NAMES),

            random.choice(MALE_FIRST_NAMES)

        ])

    else:

        return " ".join([

            random.choice(LAST_NAMES),

            random.choice(FEMALE_MIDDLE),

            random.choice(FEMALE_FIRST_NAMES)

        ])


def generate(total=40):

    rows=[]

    foreign_ids=random.sample(range(1,total+1),4)

    for staff_id in range(1,total+1):

        if staff_id in foreign_ids:

            fullname=random.choice(FOREIGN_NAMES)

        else:

            fullname=vietnamese_name()

        rows.append([

            staff_id,

            fullname,

            random.choice(ROLES),

            random.randint(1,len(DEPOTS)),

            random_phone()

        ])

    df=pd.DataFrame(

        rows,

        columns=[

            "StaffID",

            "FullName",

            "Role",

            "DepotID",

            "ContactInfo"

        ]

    )

    save_csv(df,"staff.csv")

    return df