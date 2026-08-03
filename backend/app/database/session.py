from sqlalchemy.orm import sessionmaker


from app.database.connection import engine
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()