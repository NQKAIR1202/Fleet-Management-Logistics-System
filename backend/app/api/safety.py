from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.crud.safety import get_safety_events
from app.schemas.safety import SafetyEventResponse

router = APIRouter(
    prefix="/safety-events",
    tags=["Safety"]
)


@router.get(
    "",
    response_model=list[SafetyEventResponse]
)
def read_safety_events(
    db: Session = Depends(get_db)
):
    return get_safety_events(db)