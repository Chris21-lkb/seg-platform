from segment_anything import sam_model_registry, SamPredictor

from app.config import settings
from app.core.device import get_device

# Cached predictor so the (large) model is only loaded once per process
_predictor = None


def get_sam_predictor():
    """Load SAM on first use and return (predictor, device)."""
    global _predictor

    device = get_device()

    if _predictor is None:
        if not settings.sam_checkpoint.is_file():
            raise FileNotFoundError(
                f"SAM checkpoint not found at {settings.sam_checkpoint}. "
                "See backend/README.md for the download link."
            )
        sam = sam_model_registry[settings.sam_model_type](
            checkpoint=str(settings.sam_checkpoint)
        )
        sam.to(device=device)
        _predictor = SamPredictor(sam)

    return _predictor, device
