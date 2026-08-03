from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy import func, extract

from app.models.generated import (
    Vehicle,
    Driver,
    Depot,
    Maintenancejob,
    Safetyevent,
    Driversafetyscore,
    Drivercertification,
    Certification,
    Part,
)

from app.models import (
    Predictivealert,
    Severity,
    Maintenanceactivity, 
    Staff, 
    Workshop,
    Activitymechanic,
    Mechanic,
    Part,
    Activitypart,
    Supplier,
    Eventtype,
)

from sqlalchemy import func
from sqlalchemy import desc




def get_dashboard_summary(db: Session):

    total_vehicles = db.query(
        func.count(Vehicle.VIN)
    ).scalar()

    total_drivers = db.query(
        func.count(Driver.DriverID)
    ).scalar()

    open_jobs = (
        db.query(func.count(Maintenancejob.JobID))
        .filter(
            Maintenancejob.JobStatus != "Completed"
        )
        .scalar()
    )

    total_safety = db.query(
        func.count(Safetyevent.EventID)
    ).scalar()

    downtime = db.query(
        func.sum(
            Maintenancejob.DowntimeHours
        )
    ).scalar()

    total_cost = db.query(
        func.sum(
            Maintenancejob.TotalCostVND
        )
    ).scalar()

    return {

        "totalVehicles": total_vehicles or 0,

        "totalDrivers": total_drivers or 0,

        "openJobs": open_jobs or 0,

        "totalSafetyEvents": total_safety or 0,

        "totalDowntimeHours": float(
            downtime or 0
        ),

        "totalMaintenanceCost": float(
            total_cost or 0
        ),

    }
    
def get_monthly_trend(db: Session):
    
    rows = (
        db.query(
            extract(
                "month",
                Maintenancejob.DateOpened
            ).label("Month"),

            func.count(
                Maintenancejob.JobID
            ).label("Jobs")

        )

        .group_by("Month")

        .order_by("Month")

        .all()
    )

    months = [

        "Jan",

        "Feb",

        "Mar",

        "Apr",

        "May",

        "Jun",

        "Jul",

        "Aug",

        "Sep",

        "Oct",

        "Nov",

        "Dec",

    ]

    result = []

    for month, jobs in rows:

        result.append({

            "Month": months[int(month) - 1],

            "Jobs": jobs,

        })

    return result


def get_job_status_summary(db: Session):
    
    result = (

        db.query(

            Maintenancejob.JobStatus,

            func.count(
                Maintenancejob.JobID
            ).label("Count")

        )

        .group_by(
            Maintenancejob.JobStatus
        )

        .all()

    )

    return [

        {

            "Status": row.JobStatus,

            "Count": row.Count,

        }

        for row in result

    ]
    
def get_top_vehicles(db: Session):
    
    rows = (

        db.query(

            Vehicle.VIN,

            Depot.DepotName,

            func.count(Maintenancejob.JobID).label("Jobs"),

            func.sum(Maintenancejob.DowntimeHours).label("Downtime"),

        )

        .join(
            Depot,
            Vehicle.DepotID == Depot.DepotID
        )

        .join(
            Maintenancejob,
            Vehicle.VIN == Maintenancejob.VIN
        )

        .group_by(
            Vehicle.VIN,
            Depot.DepotName
        )

        .order_by(

            desc(

                func.sum(
                    Maintenancejob.DowntimeHours
                )

            )

        )

        .limit(5)

        .all()

    )

    result = []

    for r in rows:

        if r.Downtime >= 120:

            status = "Critical"

        elif r.Downtime >= 80:

            status = "Warning"

        else:

            status = "Normal"

        result.append({

            "VIN": r.VIN,

            "Depot": r.DepotName,

            "Jobs": r.Jobs,

            "Downtime": round(r.Downtime or 0,2),

            "Status": status,

        })

    return result


def get_cost_by_model(db: Session):
    
    rows = (

        db.query(

            Vehicle.Model.label("Model"),

            func.sum(Maintenancejob.TotalCostVND).label("Cost")

        )

        .join(

            Maintenancejob,

            Maintenancejob.VIN == Vehicle.VIN

        )

        .group_by(

            Vehicle.Model

        )

        .order_by(

            func.sum(

                Maintenancejob.TotalCostVND

            ).desc()

        )

        .limit(10)

        .all()

    )

    return [

        {

            "Model": r.Model,

            "Cost": float(r.Cost or 0)

        }

        for r in rows

    ]
    
def get_predictive_alerts(db: Session):
    
    rows = (
        db.query(
            Predictivealert.AlertID,
            Predictivealert.VIN,
            Predictivealert.AlertType,
            Predictivealert.AlertTimestamp,
            Severity.SeverityName.label("Severity"),
            Predictivealert.AlertStatus,
            Predictivealert.ActionTaken,
            Predictivealert.ResolvedDate,
        )
        .join(
            Severity,
            Predictivealert.SeverityID == Severity.SeverityID,
        )
        .order_by(
            Severity.PenaltyPoints.desc(),
            Predictivealert.AlertTimestamp.desc(),
        )
        .all()
    )

    return [
        {
            "AlertID": row.AlertID,
            "VIN": row.VIN,
            "AlertType": row.AlertType,
            "AlertTimestamp": row.AlertTimestamp,
            "Severity": row.Severity,
            "AlertStatus": row.AlertStatus,
            "ActionTaken": row.ActionTaken,
            "ResolvedDate": row.ResolvedDate,
        }
        for row in rows
    ]

def get_workshop_workload(db: Session):
    
    rows = (

        db.query(

            Mechanic.FullName.label("Mechanic"),

            Workshop.WorkshopName.label("Workshop"),

            func.count(Maintenanceactivity.ActivityID).label("Jobs"),

        )

        .join(
            Activitymechanic,
            Activitymechanic.MechanicID == Mechanic.MechanicID
        )

        .join(
            Maintenanceactivity,
            Maintenanceactivity.ActivityID == Activitymechanic.ActivityID
        )

        .join(
            Maintenancejob,
            Maintenancejob.JobID == Maintenanceactivity.JobID
        )

        .join(
            Workshop,
            Workshop.WorkshopID == Maintenancejob.WorkshopID
        )

        .group_by(
            Mechanic.FullName,
            Workshop.WorkshopName
        )

        .order_by(
            func.count(Maintenanceactivity.ActivityID).desc()
        )

        .all()

    )

    return [

        {

            "Mechanic": r.Mechanic,

            "Workshop": r.Workshop,

            "Jobs": r.Jobs,

        }

        for r in rows

    ]
    
def get_vehicle_downtime(db: Session):
    
    rows = (

        db.query(

            Vehicle.VIN,

            Vehicle.Model,

            Maintenancejob.DowntimeHours,

            Maintenancejob.JobStatus,

        )

        .join(
            Maintenancejob,
            Vehicle.VIN == Maintenancejob.VIN
        )

        .order_by(
            Maintenancejob.DowntimeHours.desc()
        )

        .all()

    )

    return [

        {

            "VIN": r.VIN,

            "Model": r.Model,

            "Downtime": float(r.DowntimeHours or 0),

            "Status": r.JobStatus,

        }

        for r in rows

    ]

    
def get_supplier_performance(db: Session):
    
    rows = (

        db.query(

            Supplier.SupplierName,

            Supplier.DeliveryLeadTimeDays,

            func.count(Part.PartID).label("Parts"),

        )

        .join(

            Part,

            Supplier.SupplierID == Part.PrimarySupplierID,

        )

        .group_by(

            Supplier.SupplierName,

            Supplier.DeliveryLeadTimeDays,

        )

        .order_by(

            func.count(Part.PartID).desc()

        )

        .all()

    )

    return [

        {

            "Supplier": r.SupplierName,

            "LeadTime": r.DeliveryLeadTimeDays,

            "Parts": r.Parts,

        }

        for r in rows

    ]
    
    
def get_high_risk_drivers(db: Session):
    
    return (

        db.query(

            Driver.DriverID,
            Driver.FullName,
            Driversafetyscore.FinalScore,
            Driversafetyscore.TotalPenalty,
            Driversafetyscore.CriticalEventCount,
            Driversafetyscore.RequiresCoaching,

        )

        .join(
            Driversafetyscore,
            Driver.DriverID == Driversafetyscore.DriverID
        )

        .order_by(
            Driversafetyscore.FinalScore.asc()
        )

        .limit(50)

        .all()

    )
    
def get_licence_expiry(db: Session):
    
    return (

        db.query(

            Driver.DriverID,

            Driver.FullName,

            Certification.CertificationName.label("Licence"),

            Drivercertification.ExpiryDate,

        )

        .join(
            Drivercertification,
            Driver.DriverID == Drivercertification.DriverID,
        )

        .join(
            Certification,
            Certification.CertificationID == Drivercertification.CertificationID,
        )

        .order_by(
            Drivercertification.ExpiryDate.asc()
        )

        .all()

    )
    
def get_parts_threshold(db: Session):
    
    rows = (

        db.query(

            Part.PartName.label("Part"),
            Part.StockQuantity.label("Stock"),
            Part.ReorderThreshold.label("Threshold"),

        )

        .order_by(
            Part.StockQuantity.asc()
        )

        .limit(20)

        .all()

    )

    return [

        {

            "Part": r.Part,
            "Stock": r.Stock,
            "Threshold": r.Threshold,

        }

        for r in rows

    ]
    
def get_driver_incidents(db: Session):
    
    rows = (

        db.query(

            Safetyevent.EventID,
            Driver.FullName.label("Driver"),
            Vehicle.VIN,
            Eventtype.EventTypeName.label("Event"),
            Severity.SeverityName.label("Severity"),
            Safetyevent.EventTimestamp,

        )

        .join(
            Driver,
            Driver.DriverID == Safetyevent.DriverID
        )

        .join(
            Vehicle,
            Vehicle.VIN == Safetyevent.VIN
        )

        .join(
            Eventtype,
            Eventtype.EventTypeID == Safetyevent.EventTypeID
        )

        .join(
            Severity,
            Severity.SeverityID == Safetyevent.SeverityID
        )

        .order_by(
            Safetyevent.EventTimestamp.desc()
        )

        .all()

    )

    return [

        {

            "EventID": r.EventID,
            "Driver": r.Driver,
            "VIN": r.VIN,
            "Event": r.Event,
            "Severity": r.Severity,
            "Date": r.EventTimestamp,

        }

        for r in rows

    ]
def get_unresolved_incidents(db: Session):
    
    rows = (

        db.query(

            Safetyevent.EventID,
            Driver.FullName.label("Driver"),
            Eventtype.EventTypeName.label("Event"),
            Severity.SeverityName.label("Severity"),
            Safetyevent.ReviewStatus,

        )

        .join(
            Driver,
            Driver.DriverID == Safetyevent.DriverID
        )

        .join(
            Eventtype,
            Eventtype.EventTypeID == Safetyevent.EventTypeID
        )

        .join(
            Severity,
            Severity.SeverityID == Safetyevent.SeverityID
        )

        .filter(
            Safetyevent.ReviewStatus != "Reviewed"
        )

        .all()

    )

    return [

        {

            "EventID": r.EventID,
            "Driver": r.Driver,
            "Event": r.Event,
            "Severity": r.Severity,
            "Status": r.ReviewStatus,

        }

        for r in rows

    ]
def get_retraining_required(db: Session):
    
    rows = (

        db.query(

            Driver.DriverID,
            Driver.FullName,
            Driversafetyscore.FinalScore,
            Driversafetyscore.TotalPenalty,
            Driversafetyscore.CriticalEventCount,

        )

        .join(

            Driversafetyscore,
            Driver.DriverID == Driversafetyscore.DriverID

        )

        .filter(

            Driversafetyscore.RequiresCoaching == 1

        )

        .order_by(

            Driversafetyscore.FinalScore.asc()

        )

        .all()

    )

    return [

        {

            "DriverID": r.DriverID,
            "Driver": r.FullName,
            "Score": r.FinalScore,
            "Penalty": r.TotalPenalty,
            "Critical": r.CriticalEventCount,

        }

        for r in rows

    ]
def get_depot_safety_trends(db: Session):
    
    rows = (

        db.query(

            Depot.DepotName,

            func.count(Safetyevent.EventID).label("Incidents"),

            func.avg(Severity.PenaltyPoints).label("AvgPenalty"),

        )

        .join(

            Safetyevent,
            Depot.DepotID == Safetyevent.DepotID

        )

        .join(

            Severity,
            Severity.SeverityID == Safetyevent.SeverityID

        )

        .group_by(

            Depot.DepotName

        )

        .order_by(

            func.count(Safetyevent.EventID).desc()

        )

        .all()

    )

    return [

        {

            "Depot": r.DepotName,
            "Incidents": r.Incidents,
            "AveragePenalty": round(float(r.AvgPenalty or 0),2),

        }

        for r in rows

    ]