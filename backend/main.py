"""FastAPI app entrypoint."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.deps import init_db
from backend.routes.eval import router as eval_router
from backend.routes.leaderboard import router as leaderboard_router
from backend.routes.submit import router as submit_router

app = FastAPI(title="RetardBench API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup() -> None:
    """Initialize DB schema at app startup."""
    init_db()


@app.get("/health")
async def health():
    """Liveness check."""
    return {"status": "ok"}


app.include_router(eval_router)
app.include_router(leaderboard_router)
app.include_router(submit_router)
