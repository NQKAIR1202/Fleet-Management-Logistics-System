from sqlalchemy.orm import Session

from app.models import Vehiclecategory


def get_all(db: Session):

    return db.query(Vehiclecategory).order_by(
        Vehiclecategory.CategoryName
    ).all()