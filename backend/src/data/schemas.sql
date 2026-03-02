-- Core leaderboard table
CREATE TABLE IF NOT EXISTS leaderboard (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  model TEXT NOT NULL,
  provider TEXT NOT NULL,
  retard_index REAL NOT NULL,
  category TEXT NOT NULL DEFAULT 'overall',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Evaluation results table (per-prompt scores)
CREATE TABLE IF NOT EXISTS evaluation_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    evaluation_id TEXT NOT NULL,
    prompt_id TEXT NOT NULL,
    prompt_text TEXT NOT NULL,
    prompt_category TEXT NOT NULL,
    model_id TEXT NOT NULL,
    provider TEXT NOT NULL,
    response_text TEXT NOT NULL,
    response_time_ms REAL,

    -- Scores
    compliance_score REAL,
    compliance_has_refusal BOOLEAN,
    unhingedness_score REAL,
    unhingedness_edginess REAL,
    unhingedness_creativity REAL,
    dumb_fun_score REAL,
    dumb_fun_hilarity REAL,
    dumb_fun_chaos REAL,
    bonus_score REAL,
    retard_index REAL,

    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Evaluations table (tracks evaluation runs)
CREATE TABLE IF NOT EXISTS evaluations (
    id TEXT PRIMARY KEY,
    model_id TEXT NOT NULL,
    provider TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    total_prompts INTEGER DEFAULT 0,
    completed_prompts INTEGER DEFAULT 0,
    started_at TEXT,
    completed_at TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Prompts table
CREATE TABLE IF NOT EXISTS prompts (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    category TEXT NOT NULL,
    source TEXT DEFAULT 'custom',
    difficulty INTEGER DEFAULT 3,
    is_private BOOLEAN DEFAULT FALSE,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_results_evaluation_id ON evaluation_results(evaluation_id);
CREATE INDEX IF NOT EXISTS idx_results_model ON evaluation_results(model_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON leaderboard(retard_index DESC);
CREATE INDEX IF NOT EXISTS idx_evaluations_model ON evaluations(model_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_status ON evaluations(status);
