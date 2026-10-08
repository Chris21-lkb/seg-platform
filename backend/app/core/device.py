"""Device selection helper (CPU / CUDA / Apple MPS)."""

from app.config import settings


def get_device() -> str:
    """Return the torch device string to run models on.

    Order of precedence:
      1. DEVICE environment variable (via settings), if set
      2. CUDA, if available
      3. Apple MPS, if available
      4. CPU
    """
    if settings.device:
        return settings.device

    # Imported lazily so the API (and /health) can start even if torch is
    # not installed yet.
    try:
        import torch
    except ImportError:
        return "cpu"

    if torch.cuda.is_available():
        return "cuda"

    mps = getattr(torch.backends, "mps", None)
    if mps is not None and mps.is_available():
        return "mps"

    return "cpu"
