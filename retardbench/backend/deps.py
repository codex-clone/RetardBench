"""Dependency utilities for API routes."""

import sqlite3
from pathlib import Path

SCHEMA_PATH = Path("src/data/schemas.sql")
DB_PATH = Path("retardbench.db")


def init_db() -> None:
    """Initialize SQLite schema."""
    conn = sqlite3.connect(DB_PATH)
    with SCHEMA_PATH.open("r", encoding="utf-8") as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()


def get_conn() -> sqlite3.Connection:
    """Return sqlite connection."""
    return sqlite3.connect(DB_PATH)
