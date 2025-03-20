from fastapi import APIRouter, UploadFile, File, HTTPException, FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from tempfile import NamedTemporaryFile
from ..services.akave_storage import AkaveStorageService
from ..services.storage import AkaveStorageProvider
from ..services.compute import LilypadService
from ..services.ml import ASLModelService
from ..config import settings

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
storage = AkaveStorageService(
    private_key_path=os.getenv("AKAVE_PRIVATE_KEY_PATH", "~/.key/user.akvf.key"),
    node_address=os.getenv("AKAVE_NODE_ADDRESS", "connect.akave.ai:5500"),
    default_bucket=os.getenv("AKAVE_DEFAULT_BUCKET", "asl-training-data")
)
compute = LilypadService(os.getenv("LILYPAD_API_KEY"))
model = ASLModelService("path/to/model")

router = APIRouter(prefix="/api/storage")
storage_service = AkaveStorageService(
    settings.AKAVE_PRIVATE_KEY_PATH,
    settings.NODE_ADDRESS
)

@app.post("/api/storage/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        result = await storage.upload_file(
            storage.default_bucket,
            file.file,
            file.filename
        )
        return {"message": "File uploaded successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save uploaded file temporarily
        with NamedTemporaryFile(delete=False) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file.flush()

            # Upload to Akave
            result = await storage_service.upload_file(
                settings.DEFAULT_BUCKET,
                temp_file.name
            )

        # Clean up temp file
        os.unlink(temp_file.name)
        return {"message": "File uploaded successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/storage/files")
async def list_files():
    try:
        files = await storage.list_files(storage.default_bucket)
        return {"files": files}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/files")
async def list_files():
    try:
        result = await storage_service.list_files(settings.DEFAULT_BUCKET)
        return {"files": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/download/{file_name}")
async def download_file(file_name: str):
    try:
        with NamedTemporaryFile(delete=False) as temp_file:
            await storage_service.download_file(
                settings.DEFAULT_BUCKET,
                file_name,
                temp_file.name
            )
            return FileResponse(
                temp_file.name,
                filename=file_name,
                background=lambda: os.unlink(temp_file.name)
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/compute/inference")
async def run_inference(image: UploadFile):
    # Submit to Lilypad for processing
    job = await compute.submit_job({
        "image": await image.read(),
        "model": "asl-detection"
    })
    return {"job_id": job["id"]}