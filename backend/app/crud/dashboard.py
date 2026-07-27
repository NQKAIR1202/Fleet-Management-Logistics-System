from sqlalchemy import func

from app.models import (
    Vehicle,
    Driver,
    Maintenancejob,
    Predictivealert,
)


def get_summary(db):

    total_vehicles = db.query(func.count(Vehicle.VIN)).scalar()

    available = (
        db.query(func.count(Vehicle.VIN))
        .filter(Vehicle.OperationalStatus == "Available")
        .scalar()
    )

    assigned = (
        db.query(func.count(Vehicle.VIN))
        .filter(Vehicle.OperationalStatus == "Assigned")
        .scalar()
    )

    maintenance = (
        db.query(func.count(Vehicle.VIN))
        .filter(Vehicle.OperationalStatus == "Maintenance")
        .scalar()
    )

    total_drivers = db.query(func.count(Driver.DriverID)).scalar()

    open_jobs = db.query(func.count(Maintenancejob.JobID)).filter(
        Maintenancejob.JobStatus == "Open"
    ).scalar()

    open_alerts = db.query(func.count(Predictivealert.AlertID)).filter(
        Predictivealert.AlertStatus == "Open"
    ).scalar()

    return {

        "totalVehicles": total_vehicles,

        "availableVehicles": available,

        "assignedVehicles": assigned,

        "maintenanceVehicles": maintenance,

        "totalDrivers": total_drivers,

        "openMaintenanceJobs": open_jobs,

        "openAlerts": open_alerts,
    }
    
def get_charts(db):
    
    # Vehicle Status Pie Chart
    vehicle_status = (
        db.query(
            Vehicle.OperationalStatus,
            func.count(Vehicle.VIN)
        )
        .group_by(Vehicle.OperationalStatus)
        .all()
    )

    # Manufacturer Bar Chart
    manufacturer = (
        db.query(
            Vehicle.Manufacturer,
            func.count(Vehicle.VIN)
        )
        .group_by(Vehicle.Manufacturer)
        .order_by(func.count(Vehicle.VIN).desc())
        .limit(10)
        .all()
    )

    return {

        "vehicleStatus": [
            {
                "status": status,
                "count": count
            }
            for status, count in vehicle_status
        ],

        "manufacturerDistribution": [
            {
                "manufacturer": manufacturer,
                "count": count
            }
            for manufacturer, count in manufacturer
        ]
    }   