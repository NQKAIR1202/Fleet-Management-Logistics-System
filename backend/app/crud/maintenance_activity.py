from sqlalchemy.orm import Session

from app.models.generated import (
    Activitypart,
    Part,
)


def get_activity_parts(
    db: Session,
    activity_id: int,
):

    rows = (
        db.query(Activitypart, Part)
        .join(
            Part,
            Activitypart.PartID == Part.PartID,
        )
        .filter(
            Activitypart.ActivityID == activity_id
        )
        .all()
    )

    return [
        {
            "PartID": part.PartID,
            "PartName": part.PartName,
            "QuantityUsed": ap.QuantityUsed,
            "UnitCostAtTime": ap.UnitCostAtTime,
            "StockQuantity": part.StockQuantity,
            "UnitPrice": part.UnitPriceVND,
        }
        for ap, part in rows
    ]
    
from app.models.generated import (
    Activitymechanic,
    Mechanic,
)

def get_activity_mechanics(
    db: Session,
    activity_id: int,
):

    rows = (
        db.query(
            Activitymechanic,
            Mechanic,
        )
        .join(
            Mechanic,
            Activitymechanic.MechanicID
            == Mechanic.MechanicID,
        )
        .filter(
            Activitymechanic.ActivityID
            == activity_id
        )
        .all()
    )

    return [
        {
            "MechanicID": mech.MechanicID,
            "FullName": mech.FullName,
            "Specialisation": mech.Specialisation,
            "RoleInActivity": am.RoleInActivity,
            "LabourHours": am.LabourHours,
        }
        for am, mech in rows
    ]