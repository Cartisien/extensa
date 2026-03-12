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
export class Extensa {
  private config: Required<ExtensaConfig>;

  constructor(config: ExtensaConfig = {}) {
    this.config = {
      ollamaUrl: config.ollamaUrl ?? 'http://localhost:11434',
      model: config.model ?? 'nomic-embed-text',
      dimensions: config.dimensions ?? 768,
      cache: config.cache ?? true,
      cacheSize: config.cacheSize ?? 1000,
    };
  }

  async embed(_text: string): Promise<number[]> {
    throw new Error('Extensa v0.1 — full embedding pipeline available in v0.2.');
  }

  async embedBatch(_texts: string[]): Promise<number[][]> {
    throw new Error('Extensa v0.1 — batch embedding available in v0.2.');
  }

  async embedMatryoshka(_text: string): Promise<MatryoshkaResult> {
    throw new Error('Extensa v0.1 — Matryoshka embeddings available in v0.2.');
  }

  cosine(a: number[], b: number[]): number {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      na  += a[i] * a[i];
      nb  += b[i] * b[i];
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
  }

  dot(a: number[], b: number[]): number {
    return a.reduce((s, v, i) => s + v * b[i], 0);
  }

  l2(a: number[], b: number[]): number {
    return Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));
  }

  normalize(v: number[]): number[] {
    const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0));
    return v.map(x => x / norm);
  }
}

export default Extensa;
