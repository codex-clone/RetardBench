"""Dependency utilities for API routes."""

import logging
import os
import sqlite3
from pathlib import Path

logger = logging.getLogger(__name__)

# Resolve paths relative to the project root so it works from any directory
BACKEND_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BACKEND_DIR.parent
SCHEMA_PATH = BACKEND_DIR / "src" / "data" / "schemas.sql"
PROMPTS_DIR = BACKEND_DIR / "prompts"


def get_db_path() -> str:
    """Return configured database path, defaulting to project-root retardbench.db."""
    return os.environ.get("RETARDBENCH_DB_URL", str(PROJECT_ROOT / "retardbench.db"))


def init_db() -> None:
    """Initialize SQLite schema using absolute path to schemas.sql."""
    db_path = get_db_path()
    if not SCHEMA_PATH.exists():
        logger.error("schema_not_found", extra={"path": str(SCHEMA_PATH)})
        raise FileNotFoundError(f"Schema file not found: {SCHEMA_PATH}")

    conn = sqlite3.connect(db_path)
    try:
        with SCHEMA_PATH.open("r", encoding="utf-8") as f:
            conn.executescript(f.read())
        conn.commit()
        logger.info("database_initialized", extra={"path": db_path})
    except Exception:
        logger.exception("database_init_failed")
        raise
    finally:
        conn.close()


def get_conn() -> sqlite3.Connection:
    """Return a new sqlite connection."""
    conn = sqlite3.connect(get_db_path())
    conn.row_factory = sqlite3.Row  # Enable dict-like access
    return conn
