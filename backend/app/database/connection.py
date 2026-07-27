from urllib.parse import quote_plus

from sqlalchemy import create_engine

from app.core.config import settings

DATABASE_URL = (
    f"mysql+pymysql://{settings.DB_USER}:"
    f"{quote_plus(settings.DB_PASSWORD)}@"
    f"{settings.DB_HOST}:"
    f"{settings.DB_PORT}/"
    f"{settings.DB_NAME}"
)

print(DATABASE_URL)

engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True,
)