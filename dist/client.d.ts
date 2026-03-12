/**
 * Ollama HTTP client for embedding generation.
 * Zero external dependencies — uses native fetch.
 */
export interface OllamaClientConfig {
    baseUrl: string;
    model: string;
    timeoutMs: number;
}
export declare function fetchEmbedding(text: string, config: OllamaClientConfig, retries?: number): Promise<number[]>;
//# sourceMappingURL=client.d.ts.map