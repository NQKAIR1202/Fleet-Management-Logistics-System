from datetime import date
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class DriverResponse(BaseModel):

    DriverID: int

    FullName: str

    Depot: str

    LicenceType: str

    LicenceExpiryDate: date | None = None

    EmploymentStatus: str | None = None

    ContactInfo: str | None = None

    EmergencyContact: str | None = None

    CurrentVehicle: str | None = None

    SafetyScore: Decimal | None = None

    model_config = ConfigDict(from_attributes=True)


class DriverCreate(BaseModel):

    FullName: str

    DepotID: int

    LicenceType: str

    ContactInfo: str | None = None

    LicenceExpiryDate: date | None = None

    EmploymentStatus: str = "Active"

    EmergencyContact: str | None = None


class DriverUpdate(BaseModel):

    FullName: str

    DepotID: int

    LicenceType: str

    ContactInfo: str | None = None

    LicenceExpiryDate: date | None = None

    EmploymentStatus: str

    EmergencyContact: str | None = None