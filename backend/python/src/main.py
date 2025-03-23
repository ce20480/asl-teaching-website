from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.routes.storage import storage_router

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",    # Express server
        "http://localhost:8000",    # FastAPI direct access
        "http://127.0.0.1:8000",    
        "http://localhost:5173",    # Vite development server
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routes
app.include_router(storage_router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}