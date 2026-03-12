"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embedder = void 0;
const cache_js_1 = require("./cache.js");
const client_js_1 = require("./client.js");
class Embedder {
    constructor(config, dimensions, cacheEnabled, cacheSize) {
        this.config = config;
        this.dimensions = dimensions;
        this.useCache = cacheEnabled;
        this.cache = new cache_js_1.LRUCache(cacheSize);
    }
    async embed(text) {
        if (this.useCache) {
            const cached = this.cache.get(text);
            if (cached) {
                return { embedding: cached, model: this.config.model, dimensions: cached.length, cached: true };
            }
        }
        const embedding = await (0, client_js_1.fetchEmbedding)(text, this.config);
        if (this.useCache) {
            this.cache.set(text, embedding);
        }
        return { embedding, model: this.config.model, dimensions: embedding.length, cached: false };
    }
    async embedBatch(texts, concurrency = 5) {
        const results = new Array(texts.length);
        const queue = texts.map((text, i) => ({ text, i }));
        const running = [];
        const process = async (item) => {
            results[item.i] = await this.embed(item.text);
        };
        for (let i = 0; i < queue.length; i++) {
            const p = process(queue[i]).then(() => { running.splice(running.indexOf(p), 1); });
            running.push(p);
            if (running.length >= concurrency) {
                await Promise.race(running);
            }
        }
        await Promise.all(running);
        return results;
    }
    async embedMatryoshka(text) {
        const { embedding } = await this.embed(text);
        const len = embedding.length;
        return {
            full: embedding,
            half: embedding.slice(0, Math.floor(len / 2)),
            quarter: embedding.slice(0, Math.floor(len / 4)),
            eighth: embedding.slice(0, Math.floor(len / 8)),
        };
    }
    clearCache() { this.cache.clear(); }
    cacheStats() {
        return {
            size: this.cache.size,
            hits: this.cache.hits,
            misses: this.cache.misses,
            hitRate: this.cache.hitRate,
        };
    }
}
exports.Embedder = Embedder;
