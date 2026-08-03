from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str

    # =============================
    # JWT
    # =============================

    SECRET_KEY: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"


settings = Settings()