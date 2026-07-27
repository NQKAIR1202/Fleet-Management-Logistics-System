"""
=========================================================
Utility Functions
Enterprise Edition
=========================================================
"""

from pathlib import Path
from datetime import date, datetime, timedelta

import random
import string
import unicodedata

import pandas as pd

from generators.config import fake
from generators.catalogs import *

# =========================================================
# PATH
# =========================================================

ROOT = Path(__file__).resolve().parent.parent

DATA_FOLDER = ROOT / "data"

DATA_FOLDER.mkdir(exist_ok=True)

# =========================================================
# DISPLAY
# =========================================================

def title(text):

    print()
    print("=" * 70)
    print(text)
    print("=" * 70)

# =========================================================
# CSV
# =========================================================

def save_csv(df, filename):

    path = DATA_FOLDER / filename

    df.to_csv(path, index=False)

    print(f"✓ {filename:<35}{len(df)} rows")


def load_csv(filename):

    return pd.read_csv(DATA_FOLDER / filename)

# =========================================================
# RANDOM
# =========================================================

def weighted_choice(items, weights):

    return random.choices(
        items,
        weights=weights,
        k=1
    )[0]


def random_bool(probability=0.5):

    return random.random() < probability


def random_percent():

    return random.randint(0, 100)


def random_money(min_value, max_value):

    return round(
        random.uniform(min_value, max_value),
        2
    )


def random_duration(min_days=1, max_days=365):

    return random.randint(
        min_days,
        max_days
    )


# =========================================================
# DATE
# =========================================================

def random_past_date(days=3650):

    return fake.date_between(
        start_date=f"-{days}d",
        end_date="today"
    )


def random_future_date(days=365 * 5):

    return fake.date_between(
        start_date="today",
        end_date=f"+{days}d"
    )


def random_date_between(start_date, end_date):

    return fake.date_between(
        start_date=start_date,
        end_date=end_date
    )


def random_end_date(
    start_date,
    min_days=30,
    max_days=365
):

    duration = random.randint(
        min_days,
        max_days
    )

    return start_date + timedelta(days=duration)


def random_datetime():

    return fake.date_time_between(
        start_date="-5y",
        end_date="now"
    )


# =========================================================
# CODE
# =========================================================

def generate_code(prefix, number, width=4):

    return f"{prefix}{number:0{width}}"


# =========================================================
# PHONE
# =========================================================

def random_phone():

    prefix = random.choice([

        "032","033","034","035",
        "036","037","038","039",

        "070","076","077","078","079",

        "081","082","083","084","085",

        "090","091","092","093","094",

        "096","097","098"

    ])

    return prefix + "".join(

        random.choices(

            string.digits,

            k=7

        )

    )


# =========================================================
# EMAIL
# =========================================================

def random_email(name):

    username = name.lower()

    username = username.replace("đ","d")

    username = username.replace("Đ","d")

    username = (

        unicodedata
        .normalize("NFD", username)
        .encode("ascii","ignore")
        .decode("utf-8")

    )

    username = username.replace(" ",".")

    domain = random.choice([

        "fleet.vn",

        "company.vn",

        "gmail.com",

        "outlook.com"

    ])

    return f"{username}@{domain}"


# =========================================================
# CONTACT
# =========================================================

def random_contact(name):

    phone = random_phone()

    email = random_email(name)

    return f"{phone} | {email}"


# =========================================================
# LICENSE
# =========================================================

def random_license_number():

    return "".join(

        random.choices(

            string.digits,

            k=12

        )

    )
    
    # =========================================================
# VEHICLE
# =========================================================

def random_plate():

    province = random.choice([
        "29", "30", "43", "50",
        "51", "60", "65", "66"
    ])

    series = random.choice([
        "A", "B", "C", "D",
        "H", "K", "LD"
    ])

    number = random.randint(10000, 99999)

    return f"{province}{series}-{number}"


def random_vin():

    alphabet = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789"

    return "".join(
        random.choices(
            alphabet,
            k=17
        )
    )


def random_odometer(manufacture_year):

    current_year = date.today().year

    age = max(0, current_year - manufacture_year)

    max_distance = min(
        850000,
        30000 + age * 70000
    )

    return random.randint(
        5000,
        max_distance
    )


# =========================================================
# PERSON
# =========================================================

def random_gender():

    return weighted_choice(
        ["M", "F"],
        [80, 20]
    )


def vietnamese_name(gender="M"):

    last = random.choice(LAST_NAMES)

    if gender == "M":

        middle = random.choice(MIDDLE_NAMES)

        first = random.choice(MALE_FIRST_NAMES)

    else:

        middle = random.choice(FEMALE_MIDDLE)

        first = random.choice(FEMALE_FIRST_NAMES)

    return f"{last} {middle} {first}"


def random_birthdate(
    min_age=22,
    max_age=60
):

    current_year = date.today().year

    year = random.randint(
        current_year - max_age,
        current_year - min_age
    )

    month = random.randint(1, 12)

    day = random.randint(1, 28)

    return date(year, month, day)


def random_hire_date():

    return fake.date_between(
        start_date="-10y",
        end_date="today"
    )


# =========================================================
# ASSIGNMENT
# =========================================================

def generate_assignment_period():

    start_date = random_past_date(365 * 3)

    end_date = random_end_date(
        start_date,
        30,
        365
    )

    return start_date, end_date


# =========================================================
# TEXT
# =========================================================

def truncate_text(
    text,
    max_length=255
):

    text = str(text)

    if len(text) <= max_length:

        return text

    return text[:max_length]


# =========================================================
# ID
# =========================================================

def next_id(index):

    return index + 1