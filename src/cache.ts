/**
 * LRU Cache — Map-based, O(1) get/set, evicts oldest on overflow.
 */
export class LRUCache<K, V> {
  private map: Map<K, V>
  private readonly maxSize: number
  private _hits = 0
  private _misses = 0

  constructor(maxSize = 1000) {
    this.maxSize = maxSize
    this.map = new Map()
  }

  get(key: K): V | undefined {
    if (!this.map.has(key)) {
      this._misses++
      return undefined
    }
    // Move to end (most recently used)
    const val = this.map.get(key)!
    this.map.delete(key)
    this.map.set(key, val)
    this._hits++
    return val
  }

  set(key: K, value: V): void {
    if (this.map.has(key)) {
      this.map.delete(key)
    } else if (this.map.size >= this.maxSize) {
      // Evict oldest (first entry)
      const oldest = this.map.keys().next().value
      if (oldest !== undefined) this.map.delete(oldest)
    }
    this.map.set(key, value)
  }

  has(key: K): boolean {
    return this.map.has(key)
  }

  clear(): void {
    this.map.clear()
    this._hits = 0
    this._misses = 0
  }

  get size(): number { return this.map.size }
  get hits(): number { return this._hits }
  get misses(): number { return this._misses }
  get hitRate(): number {
    const total = this._hits + this._misses
    return total === 0 ? 0 : this._hits / total
  }
}
