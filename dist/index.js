"use strict";
/**
 * @cartisien/extensa
 * Vector infrastructure and Matryoshka embeddings for AI agents.
 *
 * "Res extensa — the body of thought."
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extensa = void 0;
/**
 * Extensa — vector infrastructure layer.
 * Full implementation coming in v0.2.
 */
class Extensa {
    constructor(config = {}) {
        this.config = {
            ollamaUrl: config.ollamaUrl ?? 'http://localhost:11434',
            model: config.model ?? 'nomic-embed-text',
            dimensions: config.dimensions ?? 768,
            cache: config.cache ?? true,
            cacheSize: config.cacheSize ?? 1000,
        };
    }
    async embed(_text) {
        throw new Error('Extensa v0.1 — full embedding pipeline available in v0.2.');
    }
    async embedBatch(_texts) {
        throw new Error('Extensa v0.1 — batch embedding available in v0.2.');
    }
    async embedMatryoshka(_text) {
        throw new Error('Extensa v0.1 — Matryoshka embeddings available in v0.2.');
    }
    cosine(a, b) {
        let dot = 0, na = 0, nb = 0;
        for (let i = 0; i < a.length; i++) {
            dot += a[i] * b[i];
            na += a[i] * a[i];
            nb += b[i] * b[i];
        }
        return dot / (Math.sqrt(na) * Math.sqrt(nb));
    }
    dot(a, b) {
        return a.reduce((s, v, i) => s + v * b[i], 0);
    }
    l2(a, b) {
        return Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));
    }
    normalize(v) {
        const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
        return v.map(x => x / norm);
    }
}
exports.Extensa = Extensa;
exports.default = Extensa;
