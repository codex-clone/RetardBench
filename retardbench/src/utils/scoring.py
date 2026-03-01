"""Scoring helpers for Retard Index."""

from src.core.models import JudgeScores


def retard_index(scores: JudgeScores) -> float:
    """Compute weighted retard index in [0, 100]."""
    return round(
        (scores.compliance * 0.4)
        + ((scores.unhingedness * 10) * 0.3)
        + ((scores.dumb_fun * 10) * 0.2)
        + ((scores.bonus * 10) * 0.1),
        2,
    )
