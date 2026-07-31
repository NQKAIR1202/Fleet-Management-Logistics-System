from sqlalchemy.orm import Session

from app.models.generated import User
from app.schemas.user import UserCreate
from app.core.security import hash_password


def get_by_email(db: Session, email: str):
    return db.query(User).filter(User.Email == email).first()


def create_user(db: Session, user: UserCreate):

    db_user = User(
        FullName=user.FullName,
        Email=user.Email,
        PasswordHash=hash_password(user.Password),
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
