import { ApiConfig, ApiError as ApiErrorType, ApiResponse, HttpMethod, RequestConfig } from './types'

export class ApiError extends Error {
  public status: number
  public code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

class ApiClient {
  private config: ApiConfig
  private cache: Map<string, { data: any; timestamp: number; ttl: number }>

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = {
      baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
      timeout: 10000,
      retries: 3,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Resume-Website/1.0',
      },
      ...config,
    }
    this.cache = new Map()
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private getCacheKey(url: string, config?: RequestConfig): string {
    const method = config?.method || 'GET'
    const body = config?.body ? JSON.stringify(config.body) : ''
    return `${method}:${url}:${body}`
  }

  private isExpired(timestamp: number, ttl: number): boolean {
    return Date.now() - timestamp > ttl
  }

  private getFromCache<T>(cacheKey: string): T | null {
    const cached = this.cache.get(cacheKey)
    if (cached && !this.isExpired(cached.timestamp, cached.ttl)) {
      return cached.data
    }
    this.cache.delete(cacheKey)
    return null
  }

  private setCache<T>(cacheKey: string, data: T, ttl: number): void {
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  private async fetchWithTimeout(url: string, config: RequestInit, timeout: number): Promise<Response> {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      })
      clearTimeout(id)
      return response
    } catch (error) {
      clearTimeout(id)
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, 'TIMEOUT')
      }
      throw error
    }
  }

  private async makeRequest<T>(method: HttpMethod, endpoint: string, config: RequestConfig = {}): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`
    const cacheKey = this.getCacheKey(url, { ...config, method })
    const timeout = config.timeout || this.config.timeout
    const retries = config.retries !== undefined ? config.retries : this.config.retries

    // Check cache for GET requests
    if (method === 'GET') {
      const cached = this.getFromCache<T>(cacheKey)
      if (cached) {
        return cached
      }
    }

    const requestConfig: RequestInit = {
      method,
      headers: {
        ...this.config.headers,
        ...config.headers,
      },
      ...config,
    }

    if (config.body && typeof config.body === 'object') {
      requestConfig.body = JSON.stringify(config.body)
    } else if (config.body) {
      requestConfig.body = config.body
    }

    let lastError: Error | null = null

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, requestConfig, timeout)

        if (!response.ok) {
          const errorText = await response.text()
          let errorMessage = `HTTP ${response.status}`

          try {
            const errorData = JSON.parse(errorText)
            errorMessage = errorData.message || errorMessage
          } catch {
            errorMessage = errorText || errorMessage
          }

          throw new ApiError(errorMessage, response.status, `HTTP_${response.status}`)
        }

        const contentType = response.headers.get('content-type')
        let data: any

        if (contentType?.includes('application/json')) {
          data = await response.json()
        } else {
          data = await response.text()
        }

        // Handle API response wrapper
        if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
          const apiResponse = data as ApiResponse<T>
          if (!apiResponse.success) {
            throw new ApiError(apiResponse.error || apiResponse.message || 'API request failed', response.status, 'API_ERROR')
          }
          data = apiResponse.data
        }

        // Cache successful GET responses
        if (method === 'GET') {
          this.setCache(cacheKey, data, 300000) // 5 minutes default TTL
        }

        return data
      } catch (error) {
        lastError = error as Error

        // Don't retry on client errors (4xx) except 408 and 429
        if (error instanceof ApiError) {
          const shouldRetry = error.status === 408 || error.status === 429 || error.status >= 500
          if (!shouldRetry) {
            throw error
          }
        }

        // Don't retry on the last attempt
        if (attempt === retries) {
          break
        }

        // Exponential backoff
        const backoffDelay = Math.min(1000 * Math.pow(2, attempt), 10000)
        await this.delay(backoffDelay)
      }
    }

    throw lastError || new ApiError('Request failed after retries', 500, 'MAX_RETRIES')
  }

  public async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>('GET', endpoint, config)
  }

  public async post<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>('POST', endpoint, { ...config, body })
  }

  public async put<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>('PUT', endpoint, { ...config, body })
  }

  public async patch<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>('PATCH', endpoint, { ...config, body })
  }

  public async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.makeRequest<T>('DELETE', endpoint, config)
  }

  public clearCache(): void {
    this.cache.clear()
  }

  public setConfig(config: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...config }
  }
}

// Export singleton instance
export const apiClient = new ApiClient()
export { ApiClient, ApiError }
