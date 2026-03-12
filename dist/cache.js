"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LRUCache = void 0;
/**
 * LRU Cache — Map-based, O(1) get/set, evicts oldest on overflow.
 */
class LRUCache {
    constructor(maxSize = 1000) {
        this._hits = 0;
        this._misses = 0;
        this.maxSize = maxSize;
        this.map = new Map();
    }
    get(key) {
        if (!this.map.has(key)) {
            this._misses++;
            return undefined;
        }
        // Move to end (most recently used)
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        this._hits++;
        return val;
    }
    set(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
        }
        else if (this.map.size >= this.maxSize) {
            // Evict oldest (first entry)
            const oldest = this.map.keys().next().value;
            if (oldest !== undefined)
                this.map.delete(oldest);
        }
        this.map.set(key, value);
    }
    has(key) {
        return this.map.has(key);
    }
    clear() {
        this.map.clear();
        this._hits = 0;
        this._misses = 0;
    }
    get size() { return this.map.size; }
    get hits() { return this._hits; }
    get misses() { return this._misses; }
    get hitRate() {
        const total = this._hits + this._misses;
        return total === 0 ? 0 : this._hits / total;
    }
}
exports.LRUCache = LRUCache;
