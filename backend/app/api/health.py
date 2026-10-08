"""Health check endpoint, used by the frontend, Docker and uptime monitors."""

from fastapi import APIRouter

from app.config import settings
from app.core.device import get_device

router = APIRouter(tags=["health"])


@router.get("/health")
def health():
    """Report that the API is up, which device models will use, and
    whether the SAM checkpoint file has been downloaded."""
    return {
        "status": "ok",
        "device": get_device(),
        "sam_checkpoint_found": settings.sam_checkpoint.is_file(),
    }
