from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import Dict, Any
from .base import BaseRouter
from ...services.storage.akave import AkaveStorageService
from ...core.config import settings

class StorageRouter(BaseRouter):
    def __init__(self):
        # Initialize base class first
        super().__init__(prefix="/api/storage", tags=["storage"])
        # Initialize service
        # self.storage_service = AkaveStorageService()
        # Register routes after everything is set up
        self._register_routes()

    def _register_routes(self) -> None:
        """Register all storage routes"""
        
        @self.router.post("/upload")
        async def upload_file(file: UploadFile = File(...)) -> Dict[str, Any]:
            """Handle file upload"""
            try:
                contents = await file.read()
                print(f"Received file: {file.filename}, size: {len(contents)} bytes")
                
                return {
                    "message": f"File {file.filename} received",
                    "size": len(contents)
                }
            except Exception as e:
                print(f"Upload error: {str(e)}")
                return JSONResponse(
                    status_code=500,
                    content={"error": str(e)}
                )

        @self.router.get("/files")
        async def list_files() -> Dict[str, Any]:
            """List all files"""
            try:
                return {
                    "files": []  # Implement actual file listing later
                }
            except Exception as e:
                return self.handle_error(e)

# Create singleton instance
storage_router = StorageRouter().router