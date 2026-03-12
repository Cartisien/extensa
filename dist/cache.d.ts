/**
 * LRU Cache — Map-based, O(1) get/set, evicts oldest on overflow.
 */
export declare class LRUCache<K, V> {
    private map;
    private readonly maxSize;
    private _hits;
    private _misses;
    constructor(maxSize?: number);
    get(key: K): V | undefined;
    set(key: K, value: V): void;
    has(key: K): boolean;
    clear(): void;
    get size(): number;
    get hits(): number;
    get misses(): number;
    get hitRate(): number;
}
//# sourceMappingURL=cache.d.ts.map