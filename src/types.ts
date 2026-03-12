export interface ExtensaConfig {
  ollamaUrl?: string
  model?: string
  dimensions?: number
  cache?: boolean
  cacheSize?: number
  concurrency?: number
  timeoutMs?: number
}

export interface MatryoshkaResult {
  full: number[]
  half: number[]
  quarter: number[]
  eighth: number[]
}

export interface EmbedResult {
  embedding: number[]
  model: string
  dimensions: number
  cached: boolean
}

export interface CacheStats {
  size: number
  hits: number
  misses: number
  hitRate: number
}

export interface ScoredResult {
  index: number
  score: number
}
