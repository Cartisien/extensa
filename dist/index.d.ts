/**
 * @cartisien/extensa
 * Vector infrastructure and Matryoshka embeddings for AI agents.
 *
 * "Res extensa — the body of thought."
 */
import type { ExtensaConfig, EmbedResult, MatryoshkaResult, CacheStats, ScoredResult } from './types.js';
export type { ExtensaConfig, EmbedResult, MatryoshkaResult, CacheStats, ScoredResult };
export declare class Extensa {
    private embedder;
    constructor(config?: ExtensaConfig);
    /** Embed a single string. */
    embed(text: string): Promise<EmbedResult>;
    /** Embed multiple strings in parallel (respects concurrency limit). */
    embedBatch(texts: string[], concurrency?: number): Promise<EmbedResult[]>;
    /** Embed and return Matryoshka slices (full/half/quarter/eighth). */
    embedMatryoshka(text: string): Promise<MatryoshkaResult>;
    /** Cosine similarity between two vectors. Returns [0, 1]. */
    cosine(a: number[], b: number[]): number;
    /** Dot product of two vectors. */
    dot(a: number[], b: number[]): number;
    /** L2 (Euclidean) distance between two vectors. */
    l2(a: number[], b: number[]): number;
    /** L2-normalize a vector to unit length. */
    normalize(v: number[]): number[];
    /** Return top-k candidates by cosine similarity to a query vector. */
    topK(query: number[], candidates: number[][], k: number): ScoredResult[];
    /** Clear the embedding cache. */
    clearCache(): void;
    /** Return cache hit/miss stats. */
    cacheStats(): CacheStats;
}
export default Extensa;
//# sourceMappingURL=index.d.ts.map