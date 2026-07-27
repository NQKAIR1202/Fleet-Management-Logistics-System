from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.crud.vehicle_category import get_all

from app.schemas.vehicle_category import VehicleCategoryResponse

router = APIRouter(
    prefix="/vehicle-categories",
    tags=["Vehicle Category"],
)


@router.get(
    "",
    response_model=list[VehicleCategoryResponse],
)
def get_vehicle_categories(

    db: Session = Depends(get_db),

):

    return get_all(db)