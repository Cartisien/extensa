/**
 * @cartisien/extensa
 * Vector infrastructure and Matryoshka embeddings for AI agents.
 *
 * "Res extensa — the body of thought."
 */

import { Embedder } from './embedder.js'
import { cosine, dot, l2, normalize, topK } from './similarity.js'
import type {
  ExtensaConfig,
  EmbedResult,
  MatryoshkaResult,
  CacheStats,
  ScoredResult,
} from './types.js'

export type { ExtensaConfig, EmbedResult, MatryoshkaResult, CacheStats, ScoredResult }

const DEFAULTS: Required<ExtensaConfig> = {
  ollamaUrl:   'http://localhost:11434',
  model:       'nomic-embed-text',
  dimensions:  768,
  cache:       true,
  cacheSize:   1000,
  concurrency: 5,
  timeoutMs:   30_000,
}

export class Extensa {
  private embedder: Embedder

  constructor(config: ExtensaConfig = {}) {
    const cfg = { ...DEFAULTS, ...config }
    this.embedder = new Embedder(
      { baseUrl: cfg.ollamaUrl, model: cfg.model, timeoutMs: cfg.timeoutMs },
      cfg.dimensions,
      cfg.cache,
      cfg.cacheSize
    )
  }

  /** Embed a single string. */
  embed(text: string): Promise<EmbedResult> {
    return this.embedder.embed(text)
  }

  /** Embed multiple strings in parallel (respects concurrency limit). */
  embedBatch(texts: string[], concurrency?: number): Promise<EmbedResult[]> {
    return this.embedder.embedBatch(texts, concurrency)
  }

  /** Embed and return Matryoshka slices (full/half/quarter/eighth). */
  embedMatryoshka(text: string): Promise<MatryoshkaResult> {
    return this.embedder.embedMatryoshka(text)
  }

  /** Cosine similarity between two vectors. Returns [0, 1]. */
  cosine(a: number[], b: number[]): number { return cosine(a, b) }

  /** Dot product of two vectors. */
  dot(a: number[], b: number[]): number { return dot(a, b) }

  /** L2 (Euclidean) distance between two vectors. */
  l2(a: number[], b: number[]): number { return l2(a, b) }

  /** L2-normalize a vector to unit length. */
  normalize(v: number[]): number[] { return normalize(v) }

  /** Return top-k candidates by cosine similarity to a query vector. */
  topK(query: number[], candidates: number[][], k: number): ScoredResult[] {
    return topK(query, candidates, k)
  }

  /** Clear the embedding cache. */
  clearCache(): void { this.embedder.clearCache() }

  /** Return cache hit/miss stats. */
  cacheStats(): CacheStats { return this.embedder.cacheStats() }
}

export default Extensa
