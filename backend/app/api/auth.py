from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.schemas.auth import (
    LoginRequest,
    RegisterRequest,
    LoginResponse,
    UserResponse,
)

from app.services.auth import (
    authenticate_user,
    create_user_token,
    register_user,
    update_last_login,
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    request: RegisterRequest,
    db: Session = Depends(get_db),
):

    user = register_user(
        db=db,
        full_name=request.full_name,
        email=request.email,
        password=request.password,
        role=request.role,
    )

    if user is None:

        raise HTTPException(
            status_code=400,
            detail="Email already exists.",
        )

    return user

@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    import traceback

    try:
        user = authenticate_user(
            db,
            request.email,
            request.password,
        )

        if user is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password."
            )

        update_last_login(db, user)

        token = create_user_token(user)

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": user,
        }

    except Exception as e:
        print("=" * 80)
        traceback.print_exc()
        print("=" * 80)
        raise
    
@router.get("/me")
def me():

    return {

        "message": "JWT verification will be implemented in the next step."

    }