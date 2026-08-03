from datetime import datetime, timedelta, timezone

from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

from sqlalchemy.orm import Session

from app.models.users import Users

from app.crud.auth import get_user_by_email

from app.crud.auth import create_user

from app.models.users import UserRole

# =====================================================
# PASSWORD CONFIG
# =====================================================

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)

# =====================================================
# JWT CONFIG
# =====================================================

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60

SECRET_KEY = settings.SECRET_KEY

# =====================================================
# HASH PASSWORD
# =====================================================

def hash_password(password: str) -> str:

    return pwd_context.hash(password)


# =====================================================
# VERIFY PASSWORD
# =====================================================

def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:

    return pwd_context.verify(
        plain_password,
        hashed_password,
    )
    
# =====================================================
# CREATE ACCESS TOKEN
# =====================================================

def create_access_token(
    data: dict,
) -> str:

    to_encode = data.copy()

    expire = datetime.now(
        timezone.utc
    ) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({

        "exp": expire

    })

    encoded_jwt = jwt.encode(

        to_encode,

        SECRET_KEY,

        algorithm=ALGORITHM,

    )

    return encoded_jwt
# =====================================================
# DECODE TOKEN
# =====================================================

def decode_access_token(
    token: str,
):

    payload = jwt.decode(

        token,

        SECRET_KEY,

        algorithms=[ALGORITHM],

    )

    return payload

# =====================================================
# AUTHENTICATE USER
# =====================================================

def authenticate_user(
    db: Session,
    email: str,
    password: str,
):

    user = get_user_by_email(
        db,
        email,
    )

    if user is None:

        return None

    if not verify_password(

        password,

        user.PasswordHash,

    ):

        return None

    return user

# =====================================================
# CREATE TOKEN FOR USER
# =====================================================

def create_user_token(
    user: Users,
):

    token = create_access_token(

        {

            "sub": str(user.UserID),

            "email": user.Email,

            "role": (
                user.Role.value
                if hasattr(user.Role, "value")
                else user.Role
            ),

            "name": user.FullName,

        }

    )

    return token

# =====================================================
# REGISTER USER
# =====================================================

def register_user(
    db: Session,
    full_name: str,
    email: str,
    password: str,
    role: str,
):

    existing = get_user_by_email(
        db,
        email,
    )

    if existing:

        return None

    user = Users(

        FullName=full_name,

        Email=email,

        PasswordHash=hash_password(password),

        Role=UserRole(role),

        IsActive=True,

    )

    return create_user(
        db,
        user,
    )
    
# =====================================================
# UPDATE LAST LOGIN
# =====================================================

def update_last_login(
    db: Session,
    user: Users,
):

    user.LastLogin = datetime.now(timezone.utc)

    db.commit()

    db.refresh(user)