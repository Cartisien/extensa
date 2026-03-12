"use strict";
/**
 * @cartisien/extensa
 * Vector infrastructure and Matryoshka embeddings for AI agents.
 *
 * "Res extensa — the body of thought."
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extensa = void 0;
const embedder_js_1 = require("./embedder.js");
const similarity_js_1 = require("./similarity.js");
const DEFAULTS = {
    ollamaUrl: 'http://localhost:11434',
    model: 'nomic-embed-text',
    dimensions: 768,
    cache: true,
    cacheSize: 1000,
    concurrency: 5,
    timeoutMs: 30000,
};
class Extensa {
    constructor(config = {}) {
        const cfg = { ...DEFAULTS, ...config };
        this.embedder = new embedder_js_1.Embedder({ baseUrl: cfg.ollamaUrl, model: cfg.model, timeoutMs: cfg.timeoutMs }, cfg.dimensions, cfg.cache, cfg.cacheSize);
    }
    /** Embed a single string. */
    embed(text) {
        return this.embedder.embed(text);
    }
    /** Embed multiple strings in parallel (respects concurrency limit). */
    embedBatch(texts, concurrency) {
        return this.embedder.embedBatch(texts, concurrency);
    }
    /** Embed and return Matryoshka slices (full/half/quarter/eighth). */
    embedMatryoshka(text) {
        return this.embedder.embedMatryoshka(text);
    }
    /** Cosine similarity between two vectors. Returns [0, 1]. */
    cosine(a, b) { return (0, similarity_js_1.cosine)(a, b); }
    /** Dot product of two vectors. */
    dot(a, b) { return (0, similarity_js_1.dot)(a, b); }
    /** L2 (Euclidean) distance between two vectors. */
    l2(a, b) { return (0, similarity_js_1.l2)(a, b); }
    /** L2-normalize a vector to unit length. */
    normalize(v) { return (0, similarity_js_1.normalize)(v); }
    /** Return top-k candidates by cosine similarity to a query vector. */
    topK(query, candidates, k) {
        return (0, similarity_js_1.topK)(query, candidates, k);
    }
    /** Clear the embedding cache. */
    clearCache() { this.embedder.clearCache(); }
    /** Return cache hit/miss stats. */
    cacheStats() { return this.embedder.cacheStats(); }
}
exports.Extensa = Extensa;
exports.default = Extensa;
