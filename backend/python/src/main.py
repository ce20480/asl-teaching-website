from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.routes.storage import storage_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Mount routes
app.include_router(storage_router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}