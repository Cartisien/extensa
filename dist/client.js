"use strict";
/**
 * Ollama HTTP client for embedding generation.
 * Zero external dependencies — uses native fetch.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEmbedding = fetchEmbedding;
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function fetchEmbedding(text, config, retries = 3) {
    let lastError;
    for (let attempt = 1; attempt <= retries; attempt++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), config.timeoutMs);
        try {
            const res = await fetch(`${config.baseUrl}/api/embeddings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: config.model, prompt: text }),
                signal: controller.signal,
            });
            clearTimeout(timer);
            if (!res.ok) {
                throw new Error(`Ollama HTTP ${res.status}: ${await res.text()}`);
            }
            const data = await res.json();
            if (!data.embedding || !Array.isArray(data.embedding)) {
                throw new Error('Ollama returned no embedding in response');
            }
            return data.embedding;
        }
        catch (err) {
            clearTimeout(timer);
            lastError = err instanceof Error ? err : new Error(String(err));
            if (attempt < retries) {
                await sleep(200 * attempt); // 200ms, 400ms backoff
            }
        }
    }
    throw new Error(`Extensa: embedding failed after ${retries} attempts: ${lastError?.message}`);
}
