from pydantic import BaseModel, EmailStr
from typing import Literal

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: Literal[
        "Admin",
        "FleetManager",
        "Mechanic",
        "Viewer",
    ] = "Viewer"


class UserResponse(BaseModel):
    UserID: int
    FullName: str
    Email: str
    Role: str
    IsActive: bool

    class Config:
        from_attributes = True


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse