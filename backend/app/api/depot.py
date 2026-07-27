from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.crud.depot import get_all

from app.schemas.depot import DepotResponse

router = APIRouter(
    prefix="/depots",
    tags=["Depot"],
)


@router.get(
    "",
    response_model=list[DepotResponse],
)
def get_depots(

    db: Session = Depends(get_db),

):

    return get_all(db)