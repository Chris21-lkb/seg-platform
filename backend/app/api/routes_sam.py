from fastapi import APIRouter, UploadFile, File, Form
import numpy as np
import cv2

from app.services.inference_sam import sam_segment_from_box

router = APIRouter()


@router.post("/sam/segment")
async def sam_segment(
    image: UploadFile = File(...),
    x1: int = Form(...),
    y1: int = Form(...),
    x2: int = Form(...),
    y2: int = Form(...)
):
    data = await image.read()
    arr = np.frombuffer(data, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)

    mask = sam_segment_from_box(img, [x1, y1, x2, y2])

    ok, png = cv2.imencode(".png", mask)

    return {
        "mask_png": png.tobytes().hex()
    }