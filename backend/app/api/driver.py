from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.crud.driver import (
    get_all,
    get_by_id,
    create,
    update,
    delete,
)

from app.schemas.driver import (
    DriverCreate,
    DriverUpdate,
    DriverResponse,
)

router = APIRouter(
    prefix="/drivers",
    tags=["Driver"],
)


# ==========================================================
# GET ALL DRIVERS
# ==========================================================

@router.get(
    "",
    response_model=list[DriverResponse],
)
def get_drivers(
    db: Session = Depends(get_db),
):
    return get_all(db)


# ==========================================================
# GET DRIVER BY ID
# ==========================================================

@router.get(
    "/{driver_id}",
)
def get_driver(
    driver_id: int,
    db: Session = Depends(get_db),
):

    driver = get_by_id(
        db,
        driver_id,
    )

    if driver is None:

        raise HTTPException(
            status_code=404,
            detail="Driver not found",
        )

    return driver


# ==========================================================
# CREATE DRIVER
# ==========================================================

@router.post(
    "",
    status_code=201,
)
def create_driver(
    driver: DriverCreate,
    db: Session = Depends(get_db),
):

    return create(
        db,
        driver,
    )


# ==========================================================
# UPDATE DRIVER
# ==========================================================

@router.put(
    "/{driver_id}",
)
def update_driver(
    driver_id: int,
    driver: DriverUpdate,
    db: Session = Depends(get_db),
):

    updated_driver = update(
        db,
        driver_id,
        driver,
    )

    if updated_driver is None:

        raise HTTPException(
            status_code=404,
            detail="Driver not found",
        )

    return updated_driver


# ==========================================================
# DELETE DRIVER
# ==========================================================

@router.delete(
    "/{driver_id}",
)
def delete_driver(
    driver_id: int,
    db: Session = Depends(get_db),
):

    success = delete(
        db,
        driver_id,
    )

    if not success:

        raise HTTPException(
            status_code=404,
            detail="Driver not found",
        )

    return {
        "message": "Driver deleted successfully"
    }