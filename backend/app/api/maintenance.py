from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.maintenance import (
    MaintenanceResponse,
    MaintenanceCreate,
    MaintenanceUpdate,
)

from app.crud.maintenance import (
    get_maintenance_jobs,
    create_maintenance_job,
    update_maintenance_job,
    delete_maintenance_job,
)

from app.crud import maintenance as crud
from app.crud import maintenance_activity


router = APIRouter(
    prefix="/maintenance-jobs",
    tags=["Maintenance"],
)


# ==========================================================
# Maintenance Jobs
# ==========================================================

@router.get(
    "",
    response_model=list[MaintenanceResponse],
)
def read_jobs(
    db: Session = Depends(get_db),
):
    return get_maintenance_jobs(db)


@router.post(
    "",
    response_model=MaintenanceResponse,
)
def create_job(
    job: MaintenanceCreate,
    db: Session = Depends(get_db),
):
    return create_maintenance_job(
        db,
        job,
    )


@router.put(
    "/{job_id}",
    response_model=MaintenanceResponse,
)
def update_job(
    job_id: int,
    job: MaintenanceUpdate,
    db: Session = Depends(get_db),
):

    result = update_maintenance_job(
        db,
        job_id,
        job.model_dump(),
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Maintenance Job not found",
        )

    return result


@router.delete(
    "/{job_id}",
)
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
):

    ok = delete_maintenance_job(
        db,
        job_id,
    )

    if not ok:
        raise HTTPException(
            status_code=404,
            detail="Maintenance Job not found",
        )

    return {
        "message": "Deleted successfully"
    }


# ==========================================================
# Maintenance Activities of Job
# ==========================================================

@router.get(
    "/{job_id}/activities"
)
def read_job_activities(
    job_id: int,
    db: Session = Depends(get_db),
):
    return crud.get_job_activities(
        db,
        job_id,
    )


# ==========================================================
# Parts used in Activity
# ==========================================================

@router.get(
    "/activities/{activity_id}/parts"
)
def read_activity_parts(
    activity_id: int,
    db: Session = Depends(get_db),
):
    return maintenance_activity.get_activity_parts(
        db,
        activity_id,
    )


# ==========================================================
# Mechanics in Activity
# ==========================================================

@router.get(
    "/activities/{activity_id}/mechanics"
)
def read_activity_mechanics(
    activity_id: int,
    db: Session = Depends(get_db),
):
    return maintenance_activity.get_activity_mechanics(
        db,
        activity_id,
    )