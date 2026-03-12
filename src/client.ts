/**
 * Ollama HTTP client for embedding generation.
 * Zero external dependencies — uses native fetch.
 */

export interface OllamaClientConfig {
  baseUrl: string
  model: string
  timeoutMs: number
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function fetchEmbedding(
  text: string,
  config: OllamaClientConfig,
  retries = 3
): Promise<number[]> {
  let lastError: Error | undefined

  for (let attempt = 1; attempt <= retries; attempt++) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), config.timeoutMs)

    try {
      const res = await fetch(`${config.baseUrl}/api/embeddings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: config.model, prompt: text }),
        signal: controller.signal,
      })

      clearTimeout(timer)

      if (!res.ok) {
        throw new Error(`Ollama HTTP ${res.status}: ${await res.text()}`)
      }

      const data = await res.json() as { embedding: number[] }
      if (!data.embedding || !Array.isArray(data.embedding)) {
        throw new Error('Ollama returned no embedding in response')
      }

      return data.embedding

    } catch (err) {
      clearTimeout(timer)
      lastError = err instanceof Error ? err : new Error(String(err))

      if (attempt < retries) {
        await sleep(200 * attempt) // 200ms, 400ms backoff
      }
    }
  }

  throw new Error(`Extensa: embedding failed after ${retries} attempts: ${lastError?.message}`)
}
