from sqlalchemy.orm import Session

from app.models.generated import (
    Safetyevent,
    Driver,
    Eventtype,
    Severity,
)


def get_safety_events(db: Session):

    rows = (
        db.query(
            Safetyevent.EventID,
            Safetyevent.EventTimestamp,
            Safetyevent.VIN,
            Driver.FullName,
            Eventtype.EventTypeName,
            Severity.SeverityName,
            Safetyevent.ReviewStatus,
        )
        .outerjoin(
            Driver,
            Driver.DriverID == Safetyevent.DriverID,
        )
        .outerjoin(
            Eventtype,
            Eventtype.EventTypeID == Safetyevent.EventTypeID,
        )
        .outerjoin(
            Severity,
            Severity.SeverityID == Safetyevent.SeverityID,
        )
        .limit(100)
        .all()
    )

    result = []

    for row in rows:

        result.append(
            {
                "EventID": row.EventID,
                "EventTimestamp": row.EventTimestamp,
                "VIN": row.VIN,
                "Driver": row.FullName,
                "EventType": row.EventTypeName,
                "Severity": row.SeverityName,
                "Status": row.ReviewStatus,
            }
        )

    return result


from app.models.generated import Safetyevent


def create_safety_event(db: Session, data):

    event = Safetyevent(**data)

    db.add(event)

    db.commit()

    db.refresh(event)

    return event


def update_safety_event(db: Session, event_id: int, data):
    
    event = (
        db.query(Safetyevent)
        .filter(Safetyevent.EventID == event_id)
        .first()
    )

    if not event:
        return None

    if "status" in data:
        event.ReviewStatus = data["status"]

    # Nếu database có SeverityID thì để bước sau xử lý.
    # Tạm thời bỏ qua severity để tránh lỗi.

    db.commit()

    db.refresh(event)

    return event


def delete_safety_event(db: Session, event_id: int):

    event = (

        db.query(Safetyevent)

        .filter(Safetyevent.EventID == event_id)

        .first()

    )

    if not event:

        return False

    db.delete(event)

    db.commit()

    return True