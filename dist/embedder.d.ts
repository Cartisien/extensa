import { type OllamaClientConfig } from './client.js';
import type { EmbedResult, MatryoshkaResult } from './types.js';
export declare class Embedder {
    private cache;
    private readonly config;
    private readonly dimensions;
    private readonly useCache;
    constructor(config: OllamaClientConfig, dimensions: number, cacheEnabled: boolean, cacheSize: number);
    embed(text: string): Promise<EmbedResult>;
    embedBatch(texts: string[], concurrency?: number): Promise<EmbedResult[]>;
    embedMatryoshka(text: string): Promise<MatryoshkaResult>;
    clearCache(): void;
    cacheStats(): {
        size: number;
        hits: number;
        misses: number;
        hitRate: number;
    };
}
//# sourceMappingURL=embedder.d.ts.map