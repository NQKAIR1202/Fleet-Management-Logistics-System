"""
=========================================================
Fleet Generator Configuration
=========================================================
"""

from faker import Faker
import random

SEED = 42

random.seed(SEED)

fake = Faker("vi_VN")

fake.seed_instance(SEED)

RECORDS = {

    "Vehicle":500,

    "Driver":220,

    "Mechanic":45,

    "Staff":40,

    "Supplier":25,

    "Workshop":4,

    "Part":150,

    "PredictiveAlert":600,

    "MaintenanceJob":700,

    "MaintenanceActivity":1500,

    "ActivityMechanic":1800,

    "ActivityPart":2200,

    "VehicleAssignment":900,

    "SafetyEvent":3500,

    "SafetyReview":700,

    "DriverSafetyScore":220,

    "DriverCoaching":180,

    "WarrantyClaim":160

}