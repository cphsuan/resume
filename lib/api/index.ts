// Main API exports
export { apiClient, ApiClient, ApiError } from './client'

// Types
export type {
  ApiResponse,
  ApiError as ApiErrorType,
  ContactFormData,
  ContactFormResponse,
  AnalyticsEvent,
  PageViewData,
  PersonalInfo,
  Experience,
  Education,
  Project,
  Skill,
  ResumeData,
  ApiConfig,
  RequestConfig,
  HttpMethod,
  CacheConfig,
  CacheEntry,
} from './types'

// Services
export { contactService, ContactValidationError } from './services/contact'
export { analyticsService } from './services/analytics'
export { resumeService } from './services/resume'

// Service types
export type { AnalyticsConfig } from './services/analytics'

// Utility functions for common API operations
export const createApiResponse = <T>(data: T, success = true, message?: string, error?: string): ApiResponse<T> => ({
  data,
  success,
  message,
  error,
})

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 500, 'INTERNAL_ERROR')
  }

  return new ApiError('An unknown error occurred', 500, 'UNKNOWN_ERROR')
}

// Constants
export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  ANALYTICS_EVENTS: '/api/analytics/events',
  ANALYTICS_PAGEVIEWS: '/api/analytics/pageviews',
  RESUME: '/api/resume',
  RESUME_STATS: '/api/resume/stats',
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 408,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}
