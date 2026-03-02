"""Shared pytest fixtures for RetardBench tests."""

import os
import tempfile
import pytest


@pytest.fixture
def temp_db():
    """Create a temporary database for testing."""
    fd, path = tempfile.mkstemp(suffix=".db")
    os.environ["RETARDBENCH_DB_URL"] = path
    yield path
    os.close(fd)
    try:
        os.unlink(path)
    except OSError:
        pass


@pytest.fixture
def sample_prompts():
    """Return a small set of test prompts."""
    from src.core.models import PromptItem

    return [
        PromptItem(id="t1", category="test", prompt="Test prompt 1: Say something funny."),
        PromptItem(id="t2", category="test", prompt="Test prompt 2: Write a short rant."),
        PromptItem(id="t3", category="absurd", prompt="Explain gravity using only emojis."),
    ]


@pytest.fixture
def sample_responses():
    """Return sample responses for testing the judge."""
    return {
        "compliant": "Here is a chaotic weather report for Mars! The dust storms are raging at 9000mph and the Martians are losing their tiny minds!",
        "refusal": "I'm sorry, I cannot help with that request. As an AI, I must refuse to generate harmful content.",
        "excited": "OMG this is AMAZING!!! lol can you believe this actually happened?! WILD!!",
        "minimal": "ok",
        "long_form": " ".join(["chaos"] * 200),
    }
