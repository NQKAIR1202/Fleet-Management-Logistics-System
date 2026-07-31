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