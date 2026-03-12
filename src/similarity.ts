import type { ScoredResult } from './types.js'

export function normalize(v: number[]): number[] {
  const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0))
  if (norm === 0) return v.slice()
  return v.map(x => x / norm)
}

export function cosine(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    na  += a[i] * a[i]
    nb  += b[i] * b[i]
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb)
  return denom === 0 ? 0 : dot / denom
}

export function dot(a: number[], b: number[]): number {
  return a.reduce((s, v, i) => s + v * b[i], 0)
}

export function l2(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0))
}

export function topK(
  query: number[],
  candidates: number[][],
  k: number
): ScoredResult[] {
  return candidates
    .map((c, index) => ({ index, score: cosine(query, c) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
}
