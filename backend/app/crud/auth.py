from sqlalchemy.orm import Session

from app.models.users import Users


def get_user_by_email(db: Session, email: str):
    return (
        db.query(Users)
        .filter(Users.Email == email)
        .first()
    )


def create_user(db: Session, user: Users):

    db.add(user)

    db.commit()

    db.refresh(user)

    return user