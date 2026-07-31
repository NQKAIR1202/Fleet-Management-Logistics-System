from sqlalchemy.orm import Session
from sqlalchemy import and_

from app.models import (
    Driver,
    Depot,
    Vehicle,
    Vehicleassignment,
    Driversafetyscore,
)


def get_all(db: Session):

    rows = (
        db.query(
            Driver,
            Depot.DepotName,
            Vehicle.RegistrationNumber,
        )

        .join(
            Depot,
            Driver.DepotID == Depot.DepotID,
        )

        .outerjoin(
            Vehicleassignment,
            and_(
                Driver.DriverID == Vehicleassignment.DriverID,
                Vehicleassignment.AssignmentStatus == "Active",
            ),
        )

        .outerjoin(
            Vehicle,
            Vehicleassignment.VIN == Vehicle.VIN,
        )

        .order_by(
            Driver.FullName
        )

        .all()
    )

    drivers = []

    for driver, depot, registration in rows:

        latest_score = (
            db.query(Driversafetyscore)
            .filter(
                Driversafetyscore.DriverID == driver.DriverID
            )
            .order_by(
                Driversafetyscore.ScoreYear.desc(),
                Driversafetyscore.ScoreMonth.desc(),
            )
            .first()
        )

        drivers.append(
            {
                "DriverID": driver.DriverID,
                "FullName": driver.FullName,
                "Depot": depot,
                "LicenceType": driver.LicenceType,
                "LicenceExpiryDate": driver.LicenceExpiryDate,
                "EmploymentStatus": driver.EmploymentStatus,
                "ContactInfo": driver.ContactInfo,
                "EmergencyContact": driver.EmergencyContact,
                "CurrentVehicle": registration,
                "SafetyScore": (
                    latest_score.FinalScore
                    if latest_score
                    else None
                ),
            }
        )

    return drivers


# ==========================================================
# GET DRIVER BY ID
# ==========================================================

def get_by_id(db: Session, driver_id: int):

    row = (
        db.query(
            Driver,
            Depot.DepotName,
            Vehicle.RegistrationNumber,
        )

        .join(
            Depot,
            Driver.DepotID == Depot.DepotID,
        )

        .outerjoin(
            Vehicleassignment,
            and_(
                Driver.DriverID == Vehicleassignment.DriverID,
                Vehicleassignment.AssignmentStatus == "Active",
            ),
        )

        .outerjoin(
            Vehicle,
            Vehicleassignment.VIN == Vehicle.VIN,
        )

        .filter(
            Driver.DriverID == driver_id
        )

        .first()
    )

    if row is None:
        return None

    driver, depot, registration = row

    latest_score = (
        db.query(Driversafetyscore)
        .filter(
            Driversafetyscore.DriverID == driver.DriverID
        )
        .order_by(
            Driversafetyscore.ScoreYear.desc(),
            Driversafetyscore.ScoreMonth.desc(),
        )
        .first()
    )

    return {
        "DriverID": driver.DriverID,
        "FullName": driver.FullName,
        "Depot": depot,
        "DepotID": driver.DepotID,
        "LicenceType": driver.LicenceType,
        "LicenceExpiryDate": driver.LicenceExpiryDate,
        "EmploymentStatus": driver.EmploymentStatus,
        "ContactInfo": driver.ContactInfo,
        "EmergencyContact": driver.EmergencyContact,
        "CurrentVehicle": registration,
        "SafetyScore": (
            latest_score.FinalScore
            if latest_score
            else None
        ),
    }
    
    
    # ==========================================================
# CREATE DRIVER
# ==========================================================

def create(db: Session, driver_data):

    driver = Driver(
        FullName=driver_data.FullName,
        DepotID=driver_data.DepotID,
        LicenceType=driver_data.LicenceType,
        ContactInfo=driver_data.ContactInfo,
        LicenceExpiryDate=driver_data.LicenceExpiryDate,
        EmploymentStatus=driver_data.EmploymentStatus,
        EmergencyContact=driver_data.EmergencyContact,
    )

    db.add(driver)
    db.commit()
    db.refresh(driver)

    return driver


# ==========================================================
# UPDATE DRIVER
# ==========================================================

def update(
    db: Session,
    driver_id: int,
    driver_data,
):

    driver = (
        db.query(Driver)
        .filter(
            Driver.DriverID == driver_id
        )
        .first()
    )

    if driver is None:
        return None

    driver.FullName = driver_data.FullName
    driver.DepotID = driver_data.DepotID
    driver.LicenceType = driver_data.LicenceType
    driver.ContactInfo = driver_data.ContactInfo
    driver.LicenceExpiryDate = driver_data.LicenceExpiryDate
    driver.EmploymentStatus = driver_data.EmploymentStatus
    driver.EmergencyContact = driver_data.EmergencyContact

    db.commit()
    db.refresh(driver)

    return driver


# ==========================================================
# DELETE DRIVER
# ==========================================================

def delete(
    db: Session,
    driver_id: int,
):

    driver = (
        db.query(Driver)
        .filter(
            Driver.DriverID == driver_id
        )
        .first()
    )

    if driver is None:
        return False

    db.delete(driver)
    db.commit()

    return True