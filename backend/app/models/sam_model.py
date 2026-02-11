import torch
from segment_anything import sam_model_registry, SamPredictor

SAM_CHECKPOINT = "weights/sam/sam_vit_b_01ec64.pth"
MODEL_TYPE = "vit_b"

_device = "cuda" if torch.cuda.is_available() else "cpu"

_predictor = None


def get_sam_predictor():
    global _predictor

    if _predictor is None:
        sam = sam_model_registry[MODEL_TYPE](checkpoint=SAM_CHECKPOINT)
        sam.to(device=_device)
        _predictor = SamPredictor(sam)

    return _predictor, _device