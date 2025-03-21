from fastapi import APIRouter, HTTPException
from typing import Any, Dict

class BaseRouter:
    """Base class for all route handlers"""
    def __init__(self, prefix: str, tags: list[str]):
        self._router = APIRouter(prefix=prefix, tags=tags)

    @property
    def router(self) -> APIRouter:
        """Get the FastAPI router instance"""
        return self._router

    def handle_error(self, error: Exception) -> None:
        """Standardized error handling"""
        print(f"Error occurred: {str(error)}")
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )