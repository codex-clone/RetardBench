"""Evaluator unit tests."""

from src.core.models import JudgeScores
from src.utils.scoring import retard_index


def test_retard_index_weighting() -> None:
    scores = JudgeScores(compliance=100, unhingedness=10, dumb_fun=10, bonus=10)
    assert retard_index(scores) == 100.0
