# @cartisien/extensa

> **Vector infrastructure and Matryoshka embeddings for AI agents.**

Part of the [Cartisien Memory Suite](https://github.com/Cartisien) — *res extensa* to Cogito's *res cogitans* and Engram's trace.

[![npm](https://img.shields.io/npm/v/@cartisien/extensa)](https://www.npmjs.com/package/@cartisien/extensa)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## What is Extensa?

Extensa is the vector infrastructure layer for the Cartisien Memory Suite. While [Engram](https://github.com/Cartisien/engram) handles memory storage and retrieval, Extensa manages the raw embedding pipeline:

- **Matryoshka embeddings** — adaptive dimensionality (768 → 512 → 256 → 128) from a single model pass
- **Model management** — Ollama integration, fallback chains, batch embedding
- **Similarity primitives** — cosine, dot product, L2 distance
- **Caching** — LRU cache for repeated embedding calls
- **Normalization** — L2 normalization, whitening

```typescript
import { Extensa } from '@cartisien/extensa';

const vec = new Extensa({ ollamaUrl: 'http://localhost:11434', model: 'nomic-embed-text' });

// Embed a single string
const embedding = await vec.embed('User prefers TypeScript');
// → number[] (768 dims by default)

// Matryoshka — get multiple sizes in one pass
const { full, half, quarter } = await vec.embedMatryoshka('User prefers TypeScript');
// → { full: number[768], half: number[384], quarter: number[192] }

// Batch
const embeddings = await vec.embedBatch(['text one', 'text two', 'text three']);

// Similarity
const score = vec.cosine(embedding, otherEmbedding);
```

---

## Why Matryoshka?

Standard embeddings are fixed-size. Matryoshka Representation Learning (MRL) trains models so that the first N dimensions of a large embedding are themselves a meaningful smaller embedding. This means:

- Store full 768-dim vectors for high-recall search
- Use 128-dim projections for fast candidate filtering
- Adaptive precision — trade accuracy for speed at query time

Extensa handles the dimension slicing, normalization, and storage recommendations automatically.

---

## API (v0.2 — coming soon)

### `new Extensa(config)`

```typescript
const vec = new Extensa({
  ollamaUrl: 'http://localhost:11434',  // local Ollama
  model: 'nomic-embed-text',            // embedding model
  dimensions: 768,                       // output dimensions
  cache: true,                           // LRU cache (default: true)
  cacheSize: 1000,                       // max cached embeddings
});
```

### `embed(text): Promise<number[]>`
Embed a single string. Returns L2-normalized vector.

### `embedBatch(texts): Promise<number[][]>`
Embed multiple strings in parallel with rate limiting.

### `embedMatryoshka(text): Promise<MatryoshkaResult>`
Return multiple dimension slices from a single embedding pass.

### Similarity

```typescript
vec.cosine(a, b)    // cosine similarity → [0, 1]
vec.dot(a, b)       // dot product
vec.l2(a, b)        // L2 distance
```

---

## QA / Smoke test (Alienware RTX 5090)

- Time: Thursday, March 12th, 2026 — 4:02 PM (America/New_York)
- Smoke test: single embed against Ollama @ 192.168.68.73:11434
- Result: dims=768, sample first 5 values = [-0.28037112951278687,-1.0087080001831055,-4.1742777824401855,-0.15757766366004944,0.9060647487640381]

Extensa compiled and returned valid embeddings in a smoke run. Next: run batch benchmarks and add CI tests.

---

## The Cartisien Memory Suite

| Package | Role | Status |
|---------|------|--------|
| [`@cartisien/engram`](https://github.com/Cartisien/engram) | Persistent memory | ✅ Stable |
| [`@cartisien/cogito`](https://github.com/Cartisien/cogito) | Agent lifecycle & identity | 🔧 In development |
| [`@cartisien/extensa`](https://github.com/Cartisien/extensa) | Vector infrastructure | 🔧 In development |

*"Res cogitans meets res extensa."*

---

## Research

This package is part of the Cartisien Memory Suite described in:

> Cartisien. (2026). *Engram: A Local-First Persistent Memory Architecture for Conversational AI Agents*. Zenodo. https://doi.org/10.5281/zenodo.18988892

---

## License

MIT © [Cartisien](https://cartisien.com)
