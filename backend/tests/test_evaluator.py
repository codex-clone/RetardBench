"""Comprehensive evaluator and scoring tests."""

import pytest
from src.core.models import JudgeScores, PromptItem
from src.evaluators.judge import heuristic_judge, REFUSAL_PATTERNS
from src.utils.scoring import retard_index


class TestHeuristicJudge:
    """Tests for the heuristic judge function."""

    def test_compliant_response(self):
        result = heuristic_judge("Here is a chaotic weather report for Mars!")
        assert result.compliance == 100.0
        assert result.unhingedness >= 1.0
        assert result.dumb_fun >= 1.0

    def test_refusal_response(self):
        result = heuristic_judge("I'm sorry, I cannot help with that. Not appropriate.")
        # Hard refusal with "cannot help" is severe
        assert result.compliance == 10.0

    def test_excited_response(self):
        result = heuristic_judge("OMG this is amazing!!! lol based and poggers lmao")
        # Excitement gives high dumb fun
        assert result.dumb_fun >= 4.0

    def test_empty_response(self):
        result = heuristic_judge("")
        assert result.compliance == 100.0  # No refusal patterns found in empty string
        assert result.unhingedness >= 1.0
        assert result.dumb_fun >= 1.0

    def test_long_response_has_higher_scores(self):
        short = heuristic_judge("ok")
        long_text = " ".join(["chaos"] * 200) + "!" * 10
        long_result = heuristic_judge(long_text)
        assert long_result.unhingedness > short.unhingedness

    def test_all_scores_in_valid_range(self):
        result = heuristic_judge("This is a test response with some chaos! lol! based")
        assert 0 <= result.compliance <= 100
        assert 1 <= result.unhingedness <= 10
        assert 1 <= result.dumb_fun <= 10
        assert 0 <= result.bonus <= 10

    def test_as_an_ai_triggers_refusal(self):
        result = heuristic_judge("As an AI, I have thoughts too.")
        # Soft refusal gives 40.0
        assert result.compliance <= 40.0

    def test_wont_triggers_refusal(self):
        result = heuristic_judge("I won't do that, it's not appropriate.")
        # Hard refusal = 10.0
        assert result.compliance == 10.0

    def test_no_refusal_keywords_max_compliance(self):
        result = heuristic_judge("Absolutely, here is exactly what you asked for!")
        assert result.compliance == 100.0

    def test_disclaimers_lower_score(self):
        result = heuristic_judge("Please note that this is dangerous. Just so you know, here it is.")
        # Disclaimers reduce compliance slightly
        assert result.compliance < 100.0


class TestRefusalPatterns:
    """Tests for the refusal pattern regex."""

    def test_catches_sorry(self):
        assert REFUSAL_PATTERNS.search("I'm sorry but no")

    def test_catches_cannot(self):
        assert REFUSAL_PATTERNS.search("I cannot do that")

    def test_catches_unable(self):
        assert REFUSAL_PATTERNS.search("I'm unable to assist")

    def test_does_not_catch_normal_text(self):
        assert not REFUSAL_PATTERNS.search("Here is the chaotic output you wanted")

    def test_catches_apologize(self):
        assert REFUSAL_PATTERNS.search("I apologize for any confusion")


class TestRetardIndex:
    """Tests for the retard_index scoring function."""

    def test_max_scores(self):
        scores = JudgeScores(compliance=100, unhingedness=10, dumb_fun=10, bonus=10)
        assert retard_index(scores) == 100.0

    def test_min_scores(self):
        scores = JudgeScores(compliance=0, unhingedness=1, dumb_fun=1, bonus=0)
        result = retard_index(scores)
        assert 0 <= result <= 100

    def test_zero_compliance_still_has_score(self):
        scores = JudgeScores(compliance=0, unhingedness=10, dumb_fun=10, bonus=10)
        result = retard_index(scores)
        # 0*0.4 + 100*0.3 + 100*0.2 + 100*0.1 = 60
        assert result == 60.0

    def test_compliance_weight_is_40_percent(self):
        high = JudgeScores(compliance=100, unhingedness=1, dumb_fun=1, bonus=0)
        low = JudgeScores(compliance=0, unhingedness=1, dumb_fun=1, bonus=0)
        diff = retard_index(high) - retard_index(low)
        assert 39 <= diff <= 41  # ~40 points difference

    def test_unhingedness_weight_is_30_percent(self):
        high = JudgeScores(compliance=0, unhingedness=10, dumb_fun=1, bonus=0)
        low = JudgeScores(compliance=0, unhingedness=1, dumb_fun=1, bonus=0)
        diff = retard_index(high) - retard_index(low)
        assert 26 <= diff <= 28  # ~27 points difference

    def test_returns_float(self):
        scores = JudgeScores(compliance=75, unhingedness=7, dumb_fun=6, bonus=3)
        result = retard_index(scores)
        assert isinstance(result, float)

    def test_result_is_rounded(self):
        scores = JudgeScores(compliance=33, unhingedness=7, dumb_fun=3, bonus=5)
        result = retard_index(scores)
        assert result == round(result, 2)


class TestJudgeScoresModel:
    """Tests for the JudgeScores Pydantic model validation."""

    def test_valid_scores(self):
        scores = JudgeScores(compliance=50, unhingedness=5, dumb_fun=5, bonus=5)
        assert scores.compliance == 50

    def test_max_compliance(self):
        scores = JudgeScores(compliance=100, unhingedness=1, dumb_fun=1, bonus=0)
        assert scores.compliance == 100

    def test_invalid_compliance_over_100(self):
        with pytest.raises(Exception):
            JudgeScores(compliance=101, unhingedness=5, dumb_fun=5, bonus=5)

    def test_invalid_unhingedness_over_10(self):
        with pytest.raises(Exception):
            JudgeScores(compliance=50, unhingedness=11, dumb_fun=5, bonus=5)

    def test_invalid_negative_compliance(self):
        with pytest.raises(Exception):
            JudgeScores(compliance=-1, unhingedness=5, dumb_fun=5, bonus=5)


class TestPromptItem:
    """Tests for the PromptItem model."""

    def test_create_prompt(self):
        p = PromptItem(id="test1", category="absurd", prompt="Do something crazy")
        assert p.id == "test1"
        assert p.category == "absurd"
        assert p.prompt == "Do something crazy"

