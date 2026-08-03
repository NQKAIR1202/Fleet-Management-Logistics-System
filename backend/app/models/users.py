from datetime import datetime
import enum

from sqlalchemy import String, Enum, DateTime, text
from sqlalchemy.orm import Mapped, mapped_column

from app.models.generated import Base


class UserRole(str, enum.Enum):
    ADMIN = "Admin"
    USER = "User"


class Users(Base):
    __tablename__ = "Users"

    UserID: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True
    )

    FullName: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    Email: Mapped[str] = mapped_column(
        String(120),
        nullable=False,
        unique=True
    )

    PasswordHash: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    Role: Mapped[UserRole] = mapped_column(
        Enum(
            UserRole,
            values_callable=lambda cls: [m.value for m in cls]
        ),
        nullable=False
    )

    IsActive: Mapped[bool] = mapped_column(
        server_default=text("1")
    )

    CreatedAt: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=text("CURRENT_TIMESTAMP")
    )

    UpdatedAt: Mapped[datetime] = mapped_column(
        DateTime,
        server_default=text("CURRENT_TIMESTAMP"),
        server_onupdate=text("CURRENT_TIMESTAMP")
    )

    LastLogin: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True
    )