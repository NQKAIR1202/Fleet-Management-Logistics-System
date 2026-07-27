from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.crud.vehicle import (
    get_all,
    create_vehicle,
    update_vehicle,
    delete_vehicle,
)

from app.schemas.vehicle import (
    VehicleResponse,
    VehicleCreate,
    VehicleUpdate,
)

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicle"],
)


@router.get(
    "",
    response_model=list[VehicleResponse],
)
def get_vehicles(
    db: Session = Depends(get_db),
):

    return get_all(db)


@router.post(
    "",
    response_model=VehicleResponse,
)
def create_new_vehicle(
    vehicle: VehicleCreate,
    db: Session = Depends(get_db),
):

    return create_vehicle(db, vehicle)


@router.put(
    "/{vin}",
    response_model=VehicleResponse,
)
def update_existing_vehicle(
    vin: str,
    vehicle: VehicleUpdate,
    db: Session = Depends(get_db),
):

    updated = update_vehicle(
        db,
        vin,
        vehicle,
    )

    if updated is None:

        raise HTTPException(
            status_code=404,
            detail="Vehicle not found",
        )

    return updated


@router.delete(
    "/{vin}",
)
def delete_existing_vehicle(
    vin: str,
    db: Session = Depends(get_db),
):

    deleted = delete_vehicle(
        db,
        vin,
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Vehicle not found",
        )

    return {

        "message": "Vehicle deleted successfully"

    }