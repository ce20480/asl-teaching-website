from functools import lru_cache
from pydantic_settings import BaseSettings
from pathlib import Path
from dotenv import load_dotenv
from pydantic import validator

# Load .env file once at startup
load_dotenv(Path(__file__).parent.parent.parent / ".env")

class Settings(BaseSettings):
    NODE_ADDRESS: str = "connect.akave.ai:5500"
    DEFAULT_BUCKET: str = "asl-training-data"
    AUTH_PRIVATE_KEY: str
    
    @validator('AUTH_PRIVATE_KEY')
    def validate_hex_key(cls, v):
        if not v.startswith('0x'):
            v = f'0x{v}'
        if not all(c in '0123456789abcdefABCDEF' for c in v[2:]):
            raise ValueError('Private key must be a hex string')
        return v

    class Config:
        env_file = Path(__file__).parent.parent.parent / ".env"
        env_file_encoding = 'utf-8'

@lru_cache()
def get_settings() -> Settings:
    """Cache settings instance for reuse"""
    return Settings()

# Create a singleton instance
settings = get_settings()