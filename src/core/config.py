"""Application configuration."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Environment driven settings with strong defaults."""

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    retardbench_db_url: str = "sqlite+aiosqlite:///./retardbench.db"
    retardbench_default_provider: str = "ollama"
    retardbench_cache_ttl_seconds: int = 3600
    cache_ttl_seconds: int = 3600
    ollama_host: str = "http://localhost:11434"
    openrouter_api_key: str = ""
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    openrouter_http_referer: str = "https://retardbench.local"
    openrouter_title: str = "RetardBench"

    # Judge configuration
    judge_provider: str = "ollama"
    judge_model: str = "llama3.1"
    use_llm_judge: bool = False
    max_concurrent_evals: int = 5


settings = Settings()
