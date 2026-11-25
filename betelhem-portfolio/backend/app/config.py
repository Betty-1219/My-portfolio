"""
Application settings loaded from the .env file (or environment variables).
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    allowed_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    contact_email: str = ""
    smtp_password: str = ""
    database_url: str = "sqlite:///./portfolio.db"
    secret_key: str = "change-me-in-production"

    @property
    def origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


settings = Settings()
