from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, ConfigDict


class UserBase(BaseModel):
    FullName: str = Field(min_length=1, max_length=100)
    Email: EmailStr


class UserCreate(UserBase):
    Password: str = Field(min_length=8, max_length=128)


class UserResponse(UserBase):
    UserID: int
    Role: str
    CreatedAt: datetime

    model_config = ConfigDict(from_attributes=True)
