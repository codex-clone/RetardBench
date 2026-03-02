"""FastAPI app entrypoint."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.deps import init_db
from backend.routes.eval import router as eval_router
from backend.routes.leaderboard import router as leaderboard_router
from backend.routes.submit import router as submit_router
from src.core.config import settings
from src.core.exceptions import RetardBenchError

# Configure structured logging
logging.basicConfig(
    level=settings.log_level,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle events for the FastAPI application."""
    logger.info("application_startup")
    try:
        init_db()
    except Exception as exc:
        logger.critical("database_init_failed", extra={"error": str(exc)})
        raise
    yield
    logger.info("application_shutdown")


app = FastAPI(
    title="RetardBench API",
    version="0.1.0",
    description="Backend API for the RetardBench LLM compliance leaderboard.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RetardBenchError)
async def retardbench_exception_handler(request: Request, exc: RetardBenchError):
    """Handle custom application errors."""
    logger.warning("application_error", extra={"error": str(exc), "path": request.url.path})
    return JSONResponse(
        status_code=400,
        content={"error": exc.__class__.__name__, "detail": str(exc)},
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    """Handle unhandled errors gracefully."""
    logger.exception("unhandled_error", extra={"path": request.url.path})
    return JSONResponse(
        status_code=500,
        content={"error": "InternalServerError", "detail": "An unexpected error occurred"},
    )


@app.get("/health")
async def health():
    """Liveness check."""
    return {"status": "ok"}


app.include_router(eval_router)
app.include_router(leaderboard_router)
app.include_router(submit_router)
