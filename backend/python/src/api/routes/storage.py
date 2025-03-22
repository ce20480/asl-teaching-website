from fastapi import APIRouter, File, UploadFile, HTTPException, Response
from typing import Dict, Any, List
from datetime import datetime
from .base import BaseRouter
from ...services.storage.akave import AkaveStorageService
from ...core.config import settings

class StorageRouter(BaseRouter):
    def __init__(self):
        # Initialize base class first
        super().__init__(prefix="/api/storage", tags=["storage"])
        # Initialize service
        self.akave = AkaveStorageService(
            private_key=settings.AUTH_PRIVATE_KEY,
            node_address=settings.NODE_ADDRESS,
            default_bucket=settings.DEFAULT_BUCKET
        )
        # Register routes after everything is set up
        self._register_routes()

    def _register_routes(self) -> None:
        """Register all storage routes"""
        
        @self.router.post("/buckets")
        async def create_bucket(bucket_name: str) -> Dict[str, Any]:
            """Create a new bucket"""
            try:
                await self.akave.create_bucket(bucket_name)
                return {
                    "success": True,
                    "data": {
                        "Name": bucket_name,
                        "Created": datetime.utcnow().isoformat()
                    }
                }
            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=str(e)
                )

        @self.router.get("/buckets")
        async def list_buckets() -> Dict[str, Any]:
            """List all buckets"""
            try:
                # Note: This is a placeholder as Akave might not support listing buckets
                # You might need to maintain a list of buckets in your database
                return {
                    "success": True,
                    "data": [
                        {
                            "Name": settings.DEFAULT_BUCKET,
                            "Created": datetime.utcnow().isoformat()
                        }
                    ]
                }
            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=str(e)
                )

        @self.router.get("/buckets/{bucket_name}")
        async def get_bucket(bucket_name: str) -> Dict[str, Any]:
            """Get bucket details"""
            try:
                # Note: This is a placeholder as Akave might not support getting bucket details
                return {
                    "success": True,
                    "data": {
                        "Name": bucket_name,
                        "Created": datetime.utcnow().isoformat()
                    }
                }
            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=str(e)
                )

        @self.router.get("/buckets/{bucket_name}/files")
        async def list_files(bucket_name: str) -> Dict[str, Any]:
            """List files in a bucket"""
            try:
                files = await self.akave.list_files(bucket_name)
                return {
                    "success": True,
                    "data": files
                }
            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=str(e)
                )

        @self.router.post("/upload")
        async def upload_file(file: UploadFile = File(...)) -> Dict[str, Any]:
            """Upload a file using default bucket"""
            try:
                file_data = await file.read()
                result = await self.akave.upload_file(
                    bucket_name=self.akave.default_bucket,
                    file_data=file_data,
                    file_name=file.filename
                )
                return result
            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=str(e)
                )

        @self.router.get("/buckets/{bucket_name}/files/{file_name}/download")
        async def download_file(
            bucket_name: str,
            file_name: str
        ) -> Response:
            """Download a file from a bucket"""
            try:
                # Create a temporary file to store the download
                temp_path = f"/tmp/{file_name}"
                await self.akave.download_file(bucket_name, file_name, temp_path)
                
                # Return the file as a download
                return Response(
                    content=open(temp_path, "rb").read(),
                    media_type="application/octet-stream",
                    headers={
                        "Content-Disposition": f'attachment; filename="{file_name}"'
                    }
                )
            except Exception as e:
                raise HTTPException(
                    status_code=500,
                    detail=str(e)
                )

# Create singleton instance
storage_router = StorageRouter().router