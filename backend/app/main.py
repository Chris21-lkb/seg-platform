from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.routes_sam import router as sam_router
from app.config import settings


app = FastAPI(title=settings.app_title)

# CORS for the React dev server (origins come from config / CORS_ORIGINS env var)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include routers AFTER app is created
app.include_router(health_router)
app.include_router(sam_router)
