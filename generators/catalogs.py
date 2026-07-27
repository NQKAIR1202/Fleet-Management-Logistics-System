"""
=========================================================
Fleet Management Catalogs
=========================================================
"""

# =========================================================
# DEPOTS
# =========================================================

DEPOTS = [
    "Ha Noi",
    "Da Nang",
    "Ho Chi Minh",
    "Can Tho"
]

# =========================================================
# VEHICLE CATEGORIES
# =========================================================

VEHICLE_CATEGORIES = [

    (1, "Delivery Van", "Standard parcel delivery vehicle"),

    (2, "Refrigerated Truck", "Cold-chain transportation vehicle"),

    (3, "Electric Van", "Electric commercial delivery vehicle"),

    (4, "Service Vehicle", "Maintenance and field support vehicle"),

    (5, "Heavy Transport Truck", "Heavy-duty freight transport vehicle")

]

# =========================================================
# CERTIFICATIONS
# =========================================================

CERTIFICATIONS = [

    (1, "Standard Licence"),

    (2, "Heavy Vehicle Licence"),

    (3, "Refrigerated Transport Certification"),

    (4, "EV Certification"),

    (5, "Hazardous Goods Certification")

]

# =========================================================
# EVENT TYPES
# =========================================================

EVENT_TYPES = [

    (1, "Harsh Braking"),

    (2, "Speeding"),

    (3, "Fatigue Warning"),

    (4, "Rapid Acceleration"),

    (5, "Sharp Cornering"),

    (6, "Engine Warning"),

    (7, "Seatbelt Violation"),

    (8, "Phone Distraction")

]

# =========================================================
# SEVERITY
# =========================================================

SEVERITIES = [

    (1, "Low", 5, False),

    (2, "Medium", 10, False),

    (3, "High", 20, True),

    (4, "Critical", 40, True)

]

# =========================================================
# ACTIVITY TYPES
# =========================================================

ACTIVITY_TYPES = [

    "Oil Change",

    "Brake Inspection",

    "Brake Replacement",

    "Tyre Replacement",

    "Battery Check",

    "Battery Replacement",

    "Transmission Repair",

    "Coolant Replacement",

    "Air Filter Replacement",

    "Engine Diagnostic",

    "Refrigeration Unit Repair",

    "EV System Inspection"

]

# =========================================================
# VIETNAMESE NAMES
# =========================================================

LAST_NAMES = [
    "Nguyen","Tran","Le","Pham","Hoang",
    "Phan","Vu","Vo","Dang","Bui",
    "Do","Ho","Ngo","Duong","Ly"
]

MIDDLE_NAMES = [
    "Van","Huu","Quoc","Minh","Duc",
    "Thanh","Gia","Bao","Anh","Tien"
]

FEMALE_MIDDLE = [
    "Thi","Ngoc","Thanh","Bao","Kim",
    "My","Thu","Quynh","Phuong","Hong"
]

MALE_FIRST_NAMES = [
    "An","Binh","Cuong","Dat","Duc",
    "Hung","Khanh","Long","Minh","Nam",
    "Phong","Quan","Son","Tai","Tuan",
    "Viet","Vu","Hai","Hieu","Khoa",
    "Loc","Nghia","Phuc","Thang","Trung"
]

FEMALE_FIRST_NAMES = [
    "Anh","Bich","Chi","Dung","Giang",
    "Ha","Hanh","Hoa","Hong","Huong",
    "Lan","Linh","Mai","My","Nga",
    "Ngoc","Nhi","Phuong","Quynh","Thao",
    "Thu","Trang","Trinh","Van","Yen"
]

# =========================================================
# VEHICLE MODELS (Vietnam Logistics Fleet)
# =========================================================

VEHICLE_MODELS = {

    "Delivery Van": [

        ("Ford", "Transit"),

        ("Hyundai", "Solati"),

        ("Toyota", "Hiace"),

        ("Mercedes-Benz", "Sprinter")

    ],

    "Refrigerated Truck": [

        ("Hino", "500 Series"),

        ("Isuzu", "NQR"),

        ("Mitsubishi Fuso", "Canter"),

        ("Hyundai", "Mighty EX8")

    ],

    "Electric Van": [

        ("VinFast", "EC Van"),

        ("Dongfeng", "EC35"),

        ("Wuling", "EV Cargo")

    ],

    "Service Vehicle": [

        ("Toyota", "Hilux"),

        ("Ford", "Ranger"),

        ("Isuzu", "D-Max")

    ],

    "Heavy Transport Truck": [

        ("Volvo", "FMX"),

        ("Scania", "R450"),

        ("Hino", "700 Series"),

        ("Hyundai", "Xcient"),

        ("Mercedes-Benz", "Actros")

    ]

}


# =========================================================
# VEHICLE DISTRIBUTION
# =========================================================

VEHICLE_CATEGORY_WEIGHTS = {

    "Delivery Van":45,

    "Refrigerated Truck":20,

    "Heavy Transport Truck":15,

    "Service Vehicle":10,

    "Electric Van":10

}

# =========================================================
# DEPOT DISTRIBUTION
# =========================================================

DEPOT_WEIGHTS = {

    "Delivery Van":[35,20,30,15],

    "Refrigerated Truck":[15,15,35,35],

    "Heavy Transport Truck":[30,20,35,15],

    "Service Vehicle":[30,20,30,20],

    "Electric Van":[40,20,30,10]

}

# =========================================================
# VEHICLE MODELS
# =========================================================

VEHICLE_MODELS = {

    "Delivery Van":[

        ("Ford","Transit"),

        ("Toyota","HiAce"),

        ("Hyundai","Solati"),

        ("Mercedes-Benz","Sprinter")

    ],

    "Refrigerated Truck":[

        ("Hino","500 Series"),

        ("Isuzu","NQR"),

        ("Hyundai","Mighty EX8"),

        ("Mitsubishi Fuso","Canter")

    ],

    "Electric Van":[

        ("VinFast","EC Van"),

        ("Dongfeng","EC35"),

        ("Wuling","Cargo EV")

    ],

    "Service Vehicle":[

        ("Toyota","Hilux"),

        ("Ford","Ranger"),

        ("Isuzu","D-Max")

    ],

    "Heavy Transport Truck":[

        ("Volvo","FMX"),

        ("Scania","R450"),

        ("Mercedes-Benz","Actros"),

        ("Hyundai","Xcient"),

        ("Hino","700 Series")

    ]

}

# =========================================================
# MANUFACTURE YEAR DISTRIBUTION
# =========================================================

YEAR_WEIGHTS = {

    2016:4,

    2017:6,

    2018:8,

    2019:10,

    2020:12,

    2021:15,

    2022:16,

    2023:14,

    2024:10,

    2025:5

}

# =========================================================
# VEHICLE STATUS
# =========================================================

VEHICLE_STATUS = {

    "Available": 70,

    "Assigned": 15,

    "Maintenance": 10,

    "OutOfService": 5

}

# =========================================================
# DEPOT PLATE PREFIX
# =========================================================

DEPOT_PLATES = {

    1:["29","30"],

    2:["43"],

    3:["50","51"],

    4:["65"]

}

# =========================================================
# DRIVER STATUS
# =========================================================

DRIVER_STATUS = {
    "Active": 85,
    "Inactive": 10,
    "Suspended": 5
}

# =========================================================
# DRIVER DEPOT DISTRIBUTION
# =========================================================

DRIVER_DEPOT_WEIGHTS = [35, 20, 30, 15]

# =========================================================
# DRIVER LICENSE
# =========================================================

DRIVER_LICENSE_CLASSES = [
    "B2",
    "C",
    "FC"
]