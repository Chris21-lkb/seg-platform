# Segmentation Platform – Backend

FastAPI service that runs image segmentation models. Currently implemented:

- `GET /health` – status, selected device, and whether the SAM checkpoint is present
- `POST /sam/segment` – box-prompted segmentation with Segment Anything (SAM)

Semantic segmentation and change detection endpoints are planned (see `app/api/routes_seg.py` and `routes_change.py`).

## Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Download the SAM weights

The checkpoint is large and is not committed to git. Download the ViT-B model from the
[Segment Anything repository](https://github.com/facebookresearch/segment-anything#model-checkpoints)
and place it at:

```
backend/weights/sam/sam_vit_b_01ec64.pth
```

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

Interactive API docs are at http://localhost:8000/docs.

## Configuration

All settings are optional environment variables (see `app/config.py`):

| Variable | Default | Purpose |
|---|---|---|
| `CORS_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | Comma-separated browser origins allowed to call the API |
| `SAM_MODEL_TYPE` | `vit_b` | SAM variant (`vit_b`, `vit_l`, `vit_h`) |
| `SAM_CHECKPOINT` | `backend/weights/sam/sam_vit_b_01ec64.pth` | Path to the SAM checkpoint |
| `DEVICE` | auto | Force `cpu`, `cuda` or `mps`; empty means auto-detect |

## Example request

```bash
curl -X POST http://localhost:8000/sam/segment \
  -F image=@sample.jpg -F x1=50 -F y1=50 -F x2=300 -F y2=300
```

The response contains `mask_base64`, a base64-encoded PNG mask.
