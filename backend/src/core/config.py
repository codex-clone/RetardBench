"""Application configuration with validation."""

from typing import Optional
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Environment-driven settings with strong defaults and validation."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # Database
    retardbench_db_url: str = "retardbench.db"

    # Provider settings
    retardbench_default_provider: str = "ollama"
    ollama_host: str = "http://localhost:11434"
    openrouter_api_key: str = ""
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    openrouter_http_referer: str = "https://retardbench.local"
    openrouter_title: str = "RetardBench"

    # Judge configuration
    judge_provider: str = "ollama"
    judge_model: str = "llama3.1"
    use_llm_judge: bool = False

    # Performance settings
    max_concurrent_evals: int = 5
    cache_ttl_seconds: int = 3600
    request_timeout_seconds: int = 60

    # Security settings
    submit_api_key: Optional[str] = None
    cors_origins: list[str] = ["*"]

    # Logging
    log_level: str = "INFO"

    # Paths
    prompts_dir: str = "prompts"
    default_prompt_file: str = "custom-retarded.jsonl"

    @field_validator("log_level")
    @classmethod
    def validate_log_level(cls, v: str) -> str:
        valid = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
        if v.upper() not in valid:
            raise ValueError(f"log_level must be one of {valid}")
        return v.upper()

    @field_validator("max_concurrent_evals")
    @classmethod
    def validate_concurrency(cls, v: int) -> int:
        if v < 1 or v > 20:
            raise ValueError("max_concurrent_evals must be between 1 and 20")
        return v


settings = Settings()
