from sqlalchemy.orm import Session

from app.models import Vehicle
from app.schemas.vehicle import (
    VehicleCreate,
    VehicleUpdate,
)


def get_all(db: Session):

    return db.query(Vehicle).all()


def create_vehicle(

    db: Session,

    vehicle: VehicleCreate,

):

    new_vehicle = Vehicle(

        VIN=vehicle.VIN,

        RegistrationNumber=vehicle.RegistrationNumber,

        VehicleCategoryID=vehicle.VehicleCategoryID,

        DepotID=vehicle.DepotID,

        Manufacturer=vehicle.Manufacturer,

        Model=vehicle.Model,

        ManufactureYear=vehicle.ManufactureYear,

        CurrentOdometer=vehicle.CurrentOdometer,

        OperationalStatus=vehicle.OperationalStatus,

    )

    db.add(new_vehicle)

    db.commit()

    db.refresh(new_vehicle)

    return new_vehicle


def update_vehicle(

    db: Session,

    vin: str,

    vehicle: VehicleUpdate,

):

    db_vehicle = (

        db.query(Vehicle)

        .filter(Vehicle.VIN == vin)

        .first()

    )

    if not db_vehicle:

        return None

    db_vehicle.RegistrationNumber = vehicle.RegistrationNumber

    db_vehicle.VehicleCategoryID = vehicle.VehicleCategoryID

    db_vehicle.DepotID = vehicle.DepotID

    db_vehicle.Manufacturer = vehicle.Manufacturer

    db_vehicle.Model = vehicle.Model

    db_vehicle.ManufactureYear = vehicle.ManufactureYear

    db_vehicle.CurrentOdometer = vehicle.CurrentOdometer

    db_vehicle.OperationalStatus = vehicle.OperationalStatus

    db.commit()

    db.refresh(db_vehicle)

    return db_vehicle


def delete_vehicle(

    db: Session,

    vin: str,

):

    db_vehicle = (

        db.query(Vehicle)

        .filter(Vehicle.VIN == vin)

        .first()

    )

    if not db_vehicle:

        return False

    # Soft Delete
    db_vehicle.OperationalStatus = "Retired"

    db.commit()

    db.refresh(db_vehicle)

    return True