import type { ScoredResult } from './types.js';
export declare function normalize(v: number[]): number[];
export declare function cosine(a: number[], b: number[]): number;
export declare function dot(a: number[], b: number[]): number;
export declare function l2(a: number[], b: number[]): number;
export declare function topK(query: number[], candidates: number[][], k: number): ScoredResult[];
//# sourceMappingURL=similarity.d.ts.map