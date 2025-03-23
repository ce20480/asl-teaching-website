from fastapi import APIRouter

router = APIRouter()

@router.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "asl-teaching-api"
    } 