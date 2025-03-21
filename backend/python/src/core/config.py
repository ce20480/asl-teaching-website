from functools import lru_cache
from pydantic_settings import BaseSettings
from pathlib import Path
from dotenv import load_dotenv

# Load .env file once at startup
load_dotenv(Path(__file__).parent.parent.parent / ".env")

class Settings(BaseSettings):
    WEB3_PRIVATE_KEY: str
    NODE_ADDRESS: str = "connect.akave.ai:5500"
    DEFAULT_BUCKET: str = "asl-training-data"
    
    class Config:
        env_file = Path(__file__).parent.parent.parent / ".env"
        env_file_encoding = 'utf-8'

@lru_cache()
def get_settings() -> Settings:
    """Cache settings instance for reuse"""
    return Settings()

# Create a singleton instance
settings = get_settings()