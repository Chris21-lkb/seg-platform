import numpy as np
import cv2

from app.models.sam_model import get_sam_predictor


def sam_segment_from_box(image_bgr, box):
    predictor, device = get_sam_predictor()

    image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    predictor.set_image(image_rgb)

    box_np = np.array(box)

    masks, scores, _ = predictor.predict(
        box=box_np,
        multimask_output=False
    )

    mask = masks[0].astype(np.uint8) * 255
    return mask
