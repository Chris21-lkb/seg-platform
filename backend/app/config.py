"""Central configuration for the segmentation API.

All values can be overridden with environment variables so the same code
runs locally, in Docker, and on a server without edits.
"""

import os
from dataclasses import dataclass, field
from pathlib import Path

# backend/ directory (two levels above this file: backend/app/config.py)
BACKEND_DIR = Path(__file__).resolve().parent.parent


def _split_csv(value: str) -> list[str]:
    """Turn 'a,b, c' into ['a', 'b', 'c'], ignoring empty items."""
    return [item.strip() for item in value.split(",") if item.strip()]


@dataclass(frozen=True)
class Settings:
    # Human readable name shown in the OpenAPI docs
    app_title: str = "Segmentation Platform API"

    # Origins allowed to call the API from a browser (React dev server by default)
    cors_origins: list[str] = field(
        default_factory=lambda: _split_csv(
            os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
        )
    )

    # Segment Anything (SAM) model settings
    sam_model_type: str = os.getenv("SAM_MODEL_TYPE", "vit_b")
    sam_checkpoint: Path = Path(
        os.getenv(
            "SAM_CHECKPOINT",
            str(BACKEND_DIR / "weights" / "sam" / "sam_vit_b_01ec64.pth"),
        )
    )

    # Force a device ("cpu", "cuda", "mps"). Empty string means auto-detect.
    device: str = os.getenv("DEVICE", "")


settings = Settings()
