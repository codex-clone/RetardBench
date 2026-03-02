// JavaScript/Node.js API client example
// Requires Node.js 18+ for native fetch() support.

const API_BASE = "http://localhost:8000";

/**
 * Fetches the current RetardBench leaderboard.
 */
async function getLeaderboard() {
    try {
        const response = await fetch(`${API_BASE}/api/leaderboard`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🏆 RetardBench Current Standings 🏆");
        console.table(data.rankings);

    } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
    }
}

/**
 * Dispatches an evaluation job to the backend.
 * 
 * @param {string} model - The model identifier (e.g. 'llama3.1')
 * @param {string} provider - The provider name ('ollama' or 'openrouter')
 */
async function triggerEvaluation(model, provider) {
    try {
        console.log(`\nStarting sync evaluation for ${model} via ${provider}...`);

        const response = await fetch(`${API_BASE}/api/eval`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model,
                provider,
                limit: 3,         // Only evaluate 3 prompts for speed
                sync: true        // Respond with final results directly
            })
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log(`\n✅ Evaluation Complete! Run ID: ${data.run_id}`);
        console.log(`Final Index Score: ${data.results.total_score}`);
        console.log("Dimension Breakdown:", data.results.dimensions);

    } catch (error) {
        console.error("Failed to evaluate model:", error);
    }
}

// Execute the client
getLeaderboard().then(() => {
    triggerEvaluation("llama3.1", "ollama");
});
