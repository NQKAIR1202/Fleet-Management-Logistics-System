from sqlalchemy.orm import Session

from app.models.generated import Maintenancejob

from app.models.generated import Maintenanceactivity

from app.models.generated import Activitytype


def get_maintenance_jobs(db: Session):

    return (

        db.query(Maintenancejob)

        .order_by(Maintenancejob.JobID)

        .all()

    )


def create_maintenance_job(db: Session, data):

    job = Maintenancejob(**data.dict())

    db.add(job)

    db.commit()

    db.refresh(job)

    return job


def update_maintenance_job(db: Session, job_id: int, data):

    job = (

        db.query(Maintenancejob)

        .filter(Maintenancejob.JobID == job_id)

        .first()

    )

    if not job:

        return None

    if "JobStatus" in data:

        job.JobStatus = data["JobStatus"]

    db.commit()

    db.refresh(job)

    return job


def delete_maintenance_job(db: Session, job_id: int):

    job = (

        db.query(Maintenancejob)

        .filter(Maintenancejob.JobID == job_id)

        .first()

    )

    if not job:

        return False

    db.delete(job)

    db.commit()

    return True

def get_job_activities(db, job_id):
    
    rows = (

        db.query(

            Maintenanceactivity.ActivityID,

            Maintenanceactivity.ActivityNo,

            Activitytype.ActivityTypeName,

            Maintenanceactivity.ActivityStatus,

            Maintenanceactivity.DiagnosticResult,

            Maintenanceactivity.RepeatFault,

            Maintenanceactivity.WarrantyIndicator,

        )

        .join(

            Activitytype,

            Activitytype.ActivityTypeID
            == Maintenanceactivity.ActivityTypeID,

        )

        .filter(

            Maintenanceactivity.JobID == job_id

        )

        .order_by(

            Maintenanceactivity.ActivityNo

        )

        .all()

    )

    result = []

    for row in rows:

        result.append({

            "ActivityID": row.ActivityID,

            "ActivityNo": row.ActivityNo,

            "ActivityTypeName": row.ActivityTypeName,

            "ActivityStatus": row.ActivityStatus,

            "DiagnosticResult": row.DiagnosticResult,

            "RepeatFault": row.RepeatFault,

            "WarrantyIndicator": row.WarrantyIndicator,

        })

    return result