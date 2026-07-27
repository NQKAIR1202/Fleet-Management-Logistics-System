import pandas as pd

from generators.utils import (
    save_csv,
    random_phone
)


SUPPLIERS = [

    ("Toyota Vietnam","Ha Noi"),

    ("Hyundai Truck & Bus","Ha Noi"),

    ("Ford Vietnam","Ha Noi"),

    ("THACO Auto","Quang Nam"),

    ("Mercedes-Benz Vietnam","HCMC"),

    ("Isuzu Vietnam","HCMC"),

    ("Hino Motors Vietnam","HCMC"),

    ("VinFast","Hai Phong"),

    ("Volvo Trucks Vietnam","HCMC"),

    ("Scania Vietnam","HCMC"),

    ("Denso Vietnam","Ha Noi"),

    ("Bosch Vietnam","HCMC"),

    ("Bridgestone Vietnam","Hung Yen"),

    ("Michelin Vietnam","Binh Duong"),

    ("Castrol Vietnam","HCMC"),

    ("Shell Vietnam","HCMC"),

    ("TotalEnergies Vietnam","HCMC"),

    ("Mitsubishi Fuso","HCMC"),

    ("Cummins Vietnam","Dong Nai"),

    ("ZF Vietnam","Dong Nai"),

    ("Carrier Refrigeration","HCMC"),

    ("Thermo King Vietnam","HCMC"),

    ("Daikin Vietnam","Ha Noi"),

    ("Valeo Vietnam","Hai Duong"),

    ("Goodyear Vietnam","Dong Nai")

]


def generate():

    rows = []

    for i, (name, city) in enumerate(SUPPLIERS, start=1):

        rows.append([

            i,

            name,

            random_phone(),

            city,

            3

        ])

    df = pd.DataFrame(

        rows,

        columns=[

            "SupplierID",

            "SupplierName",

            "ContactInfo",

            "Address",

            "DeliveryLeadTimeDays"

        ]

    )

    save_csv(

        df,

        "supplier.csv"

    )

    return df