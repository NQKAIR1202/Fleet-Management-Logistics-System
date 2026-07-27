import random
import pandas as pd

from generators.utils import load_csv, save_csv

PART_NAMES = {

    "Engine":[
        "Engine Oil",
        "Oil Filter",
        "Air Filter",
        "Fuel Filter"
    ],

    "Brake":[
        "Brake Pad",
        "Brake Disc",
        "Brake Fluid"
    ],

    "Electrical":[
        "Battery",
        "Alternator",
        "Starter Motor",
        "Fuse"
    ],

    "Cooling":[
        "Radiator",
        "Coolant",
        "Water Pump",
        "Thermostat"
    ],

    "Tyre":[
        "Tyre",
        "Wheel Bearing",
        "Valve"
    ]

}

PRICE = {

    "Engine Oil":350000,
    "Oil Filter":120000,
    "Air Filter":180000,
    "Fuel Filter":240000,

    "Brake Pad":650000,
    "Brake Disc":1500000,
    "Brake Fluid":180000,

    "Battery":2200000,
    "Alternator":3200000,
    "Starter Motor":2600000,
    "Fuse":30000,

    "Radiator":2800000,
    "Coolant":200000,
    "Water Pump":1200000,
    "Thermostat":450000,

    "Tyre":2500000,
    "Wheel Bearing":900000,
    "Valve":60000

}

def generate():
    
    suppliers = load_csv("supplier.csv")

    rows = []

    part_id = 1

    supplier_ids = suppliers["SupplierID"].tolist()

    for category, names in PART_NAMES.items():

        for name in names:

            primary_supplier = random.choice(supplier_ids)

            backup_supplier = random.choice(
                [s for s in supplier_ids if s != primary_supplier]
            )

            rows.append({

                "PartID": part_id,

                "PartName": name,

                "Description": f"{category} replacement part - {name}",

                "UnitPriceVND": PRICE[name],

                "StockQuantity": random.randint(20, 300),

                "ReorderThreshold": random.randint(10, 40),

                "PrimarySupplierID": primary_supplier,

                "BackupSupplierID": backup_supplier

            })

            part_id += 1

    df = pd.DataFrame(rows)

    save_csv(

        df,

        "part.csv"

    )

    print(

        f"✓ part.csv\t\t{len(df)} rows"

    )

    return df


if __name__ == "__main__":

    generate()