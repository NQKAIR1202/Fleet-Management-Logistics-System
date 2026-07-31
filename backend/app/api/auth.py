from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.crud.user import (
    get_by_email,
    create_user,
)

from app.schemas.user import (
    UserCreate,
    UserResponse,
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post(
    "/signup",
    response_model=UserResponse,
    status_code=201,
)
def sign_up(
    user: UserCreate,
    db: Session = Depends(get_db),
):

    existing = get_by_email(db, user.Email)

    if existing:

        raise HTTPException(
            status_code=409,
            detail="Email already registered",
        )

    return create_user(db, user)
