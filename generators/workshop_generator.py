import pandas as pd

from generators.utils import save_csv

WORKSHOPS = [

    [1,1,"Ha Noi Central Workshop",12,"02438228888"],

    [2,2,"Da Nang Fleet Workshop",8,"02363818888"],

    [3,3,"Sai Gon Fleet Workshop",16,"02838228888"],

    [4,4,"Can Tho Fleet Workshop",8,"02923818888"]

]


def generate():

    df = pd.DataFrame(

        WORKSHOPS,

        columns=[

            "WorkshopID",

            "DepotID",

            "WorkshopName",

            "ServiceBays",

            "ContactInfo"

        ]

    )

    save_csv(df,"workshop.csv")

    return df