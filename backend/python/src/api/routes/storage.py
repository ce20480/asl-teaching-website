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
        self.storage_service = AkaveStorageService(settings.WEB3_PRIVATE_KEY, settings.NODE_ADDRESS, settings.DEFAULT_BUCKET)
        # Register routes after everything is set up
        self._register_routes()

    def _register_routes(self) -> None:
        """Register all storage routes"""
        
        @self.router.post("/upload")
        async def upload_file(file: UploadFile = File(...)) -> Dict[str, Any]:
            """Handle file upload"""
            try:
                print(f"Processing file: {file.filename}")
                contents = await file.read()
                
                # Upload to Akave
                cid = await self.storage_service.upload_file(
                    bucket_name=settings.DEFAULT_BUCKET,
                    file_data=contents,
                    file_name=file.filename
                )
                
                return {
                    "message": "File uploaded successfully",
                    "cid": cid,
                    "filename": file.filename,
                    "size": len(contents)
                }
            except Exception as e:
                print(f"Upload error: {str(e)}")
                raise HTTPException(
                    status_code=500,
                    detail=f"Failed to upload file: {str(e)}"
                )

        @self.router.get("/files")
        async def list_files() -> Dict[str, Any]:
            """List all files"""
            try:
                files = await self.storage_service.list_files(settings.DEFAULT_BUCKET)
                return {"files": files}
            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=f"Failed to list files: {str(e)}"
                )

# Create singleton instance
storage_router = StorageRouter().router