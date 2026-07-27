from sqlalchemy.orm import Session

from app.models import Depot


def get_all(db: Session):

    return db.query(Depot).order_by(Depot.DepotName).all()