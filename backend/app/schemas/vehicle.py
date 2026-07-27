from pydantic import BaseModel, ConfigDict


class VehicleResponse(BaseModel):
    
    VIN: str
    RegistrationNumber: str

    VehicleCategoryID: int
    DepotID: int

    Manufacturer: str | None = None
    Model: str | None = None
    ManufactureYear: int | None = None
    CurrentOdometer: int | None = None
    OperationalStatus: str | None = None

    model_config = ConfigDict(from_attributes=True)


class VehicleCreate(BaseModel):

    VIN: str
    RegistrationNumber: str

    VehicleCategoryID: int
    DepotID: int

    Manufacturer: str | None = None
    Model: str | None = None
    ManufactureYear: int | None = None
    CurrentOdometer: int = 0

    OperationalStatus: str = "Available"


class VehicleUpdate(BaseModel):

    RegistrationNumber: str

    VehicleCategoryID: int
    DepotID: int

    Manufacturer: str | None = None
    Model: str | None = None
    ManufactureYear: int | None = None
    CurrentOdometer: int

    OperationalStatus: str