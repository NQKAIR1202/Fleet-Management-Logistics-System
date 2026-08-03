from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.crud.safety import (

    get_safety_events,

    create_safety_event,

    update_safety_event,

    delete_safety_event,

)

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


@router.post("")
def create_event(

    data: dict,

    db: Session = Depends(get_db),

):

    return create_safety_event(

        db,

        data,

    )


@router.put("/{event_id}")
def update_event(

    event_id: int,

    data: dict,

    db: Session = Depends(get_db),

):

    event = update_safety_event(

        db,

        event_id,

        data,

    )

    if event is None:

        raise HTTPException(

            status_code=404,

            detail="Event not found",

        )

    return event


@router.delete("/{event_id}")
def delete_event(

    event_id: int,

    db: Session = Depends(get_db),

):

    success = delete_safety_event(

        db,

        event_id,

    )

    if not success:

        raise HTTPException(

            status_code=404,

            detail="Event not found",

        )

    return {

        "message": "Deleted successfully"

    }