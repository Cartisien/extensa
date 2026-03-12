import { LRUCache } from './cache.js'
import { fetchEmbedding, type OllamaClientConfig } from './client.js'
import type { EmbedResult, MatryoshkaResult } from './types.js'

export class Embedder {
  private cache: LRUCache<string, number[]>
  private readonly config: OllamaClientConfig
  private readonly dimensions: number
  private readonly useCache: boolean

  constructor(
    config: OllamaClientConfig,
    dimensions: number,
    cacheEnabled: boolean,
    cacheSize: number
  ) {
    this.config = config
    this.dimensions = dimensions
    this.useCache = cacheEnabled
    this.cache = new LRUCache<string, number[]>(cacheSize)
  }

  async embed(text: string): Promise<EmbedResult> {
    if (this.useCache) {
      const cached = this.cache.get(text)
      if (cached) {
        return { embedding: cached, model: this.config.model, dimensions: cached.length, cached: true }
      }
    }

    const embedding = await fetchEmbedding(text, this.config)

    if (this.useCache) {
      this.cache.set(text, embedding)
    }

    return { embedding, model: this.config.model, dimensions: embedding.length, cached: false }
  }

  async embedBatch(texts: string[], concurrency = 5): Promise<EmbedResult[]> {
    const results: EmbedResult[] = new Array(texts.length)
    const queue = texts.map((text, i) => ({ text, i }))
    const running: Promise<void>[] = []

    const process = async (item: { text: string; i: number }): Promise<void> => {
      results[item.i] = await this.embed(item.text)
    }

    for (let i = 0; i < queue.length; i++) {
      const p = process(queue[i]).then(() => { running.splice(running.indexOf(p), 1) })
      running.push(p)
      if (running.length >= concurrency) {
        await Promise.race(running)
      }
    }

    await Promise.all(running)
    return results
  }

  async embedMatryoshka(text: string): Promise<MatryoshkaResult> {
    const { embedding } = await this.embed(text)
    const len = embedding.length
    return {
      full:    embedding,
      half:    embedding.slice(0, Math.floor(len / 2)),
      quarter: embedding.slice(0, Math.floor(len / 4)),
      eighth:  embedding.slice(0, Math.floor(len / 8)),
    }
  }

  clearCache(): void { this.cache.clear() }

  cacheStats() {
    return {
      size:    this.cache.size,
      hits:    this.cache.hits,
      misses:  this.cache.misses,
      hitRate: this.cache.hitRate,
    }
  }
}
