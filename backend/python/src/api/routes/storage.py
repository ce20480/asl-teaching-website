from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import Dict, Any
import aiohttp
from .base import BaseRouter
from ...core.config import settings
from ...services.storage.akave_sdk import AkaveSDK, AkaveConfig, AkaveError

class StorageRouter(BaseRouter):
    def __init__(self):
        # Initialize base class first
        super().__init__(prefix="/api/storage", tags=["storage"])
        # Register routes after everything is set up
        self._register_routes()

    def _register_routes(self) -> None:
        """Register all storage routes"""
        
        @self.router.post("/upload")
        async def upload_file(file: UploadFile = File(...)) -> Dict[str, Any]:
            """
            Upload a file to Akave storage.
            Supports binary files (images, videos, etc.)
            """
            try:
                # Read file as bytes
                contents = await file.read()
                file_size = len(contents)

                # Size validations
                if file_size < 127:
                    raise HTTPException(
                        status_code=400,
                        detail="File size must be at least 127 bytes"
                    )
                if file_size > 100 * 1024 * 1024:  # 100MB
                    raise HTTPException(
                        status_code=400,
                        detail="File size must not exceed 100MB"
                    )

                print(f"Processing file: {file.filename}, size: {file_size} bytes")
                
                # Initialize Akave SDK with proper configuration
                akave_config = AkaveConfig(host="http://localhost:4000")  # Docker container port
                akave_sdk = AkaveSDK(akave_config)

                async with akave_sdk as client:  # Use initialized SDK
                    result = await client.upload_file(
                        bucket_name="asl-training-data",
                        file_data=contents,
                        file_name=file.filename
                    )

                    return {
                        "message": "File uploaded successfully",
                        "filename": file.filename,
                        "size": file_size,
                        "cid": result.get("cid", ""),
                        "bucket": "asl-training-data",
                        "contentType": file.content_type
                    }

            except AkaveError as e:
                print(f"Akave error: {str(e)}")
                raise HTTPException(
                    status_code=500,
                    detail=f"Storage error: {str(e)}"
                )
            except Exception as e:
                print(f"Upload error: {str(e)}")
                raise HTTPException(
                    status_code=500,
                    detail=f"Upload failed: {str(e)}"
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