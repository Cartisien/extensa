/**
 * @cartisien/extensa
 * Vector infrastructure and Matryoshka embeddings for AI agents.
 *
 * "Res extensa — the body of thought."
 */
export interface ExtensaConfig {
    ollamaUrl?: string;
    model?: string;
    dimensions?: number;
    cache?: boolean;
    cacheSize?: number;
}
export interface MatryoshkaResult {
    full: number[];
    half: number[];
    quarter: number[];
    eighth: number[];
}
/**
 * Extensa — vector infrastructure layer.
 * Full implementation coming in v0.2.
 */
export declare class Extensa {
    private config;
    constructor(config?: ExtensaConfig);
    embed(_text: string): Promise<number[]>;
    embedBatch(_texts: string[]): Promise<number[][]>;
    embedMatryoshka(_text: string): Promise<MatryoshkaResult>;
    cosine(a: number[], b: number[]): number;
    dot(a: number[], b: number[]): number;
    l2(a: number[], b: number[]): number;
    normalize(v: number[]): number[];
}
export default Extensa;
//# sourceMappingURL=index.d.ts.map