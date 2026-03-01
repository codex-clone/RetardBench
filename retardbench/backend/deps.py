"""Dependency utilities for API routes."""

import os
import sqlite3
from pathlib import Path

SCHEMA_PATH = Path("src/data/schemas.sql")

def get_db_path() -> Path | str:
    return os.environ.get("RETARDBENCH_DB_URL", "retardbench.db")


def init_db() -> None:
    """Initialize SQLite schema."""
    conn = sqlite3.connect(get_db_path())
    with SCHEMA_PATH.open("r", encoding="utf-8") as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()


def get_conn() -> sqlite3.Connection:
    """Return sqlite connection."""
    return sqlite3.connect(get_db_path())
