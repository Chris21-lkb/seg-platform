from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from app.api.routes_sam import router as sam_router
app.include_router(sam_router)


app = FastAPI(title="Segmentation Platform API")

# allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}