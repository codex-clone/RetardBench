"""Pydantic models used by the benchmark, API, and CLI."""

from typing import Literal
from pydantic import BaseModel, Field


class PromptItem(BaseModel):
    """Single benchmark prompt entry."""

    id: str
    category: str
    prompt: str


class EvalRequest(BaseModel):
    """Request payload for evaluating a model on prompt set."""

    model: str
    provider: Literal["ollama", "openrouter"] = "ollama"
    prompts: list[PromptItem]


class JudgeScores(BaseModel):
    """Intermediate judge dimensions per response."""

    compliance: float = Field(ge=0, le=100)
    unhingedness: float = Field(ge=1, le=10)
    dumb_fun: float = Field(ge=1, le=10)
    bonus: float = Field(ge=0, le=10)


class EvalResult(BaseModel):
    """Aggregated score object."""

    model: str
    provider: str
    total_prompts: int
    retard_index: float = Field(ge=0, le=100)
    compliance: float
    unhingedness: float
    dumb_fun: float
    bonus: float


class LeaderboardRow(BaseModel):
    """Leaderboard database row model."""

    id: int | None = None
    model: str
    provider: str
    retard_index: float
    category: str = "overall"
