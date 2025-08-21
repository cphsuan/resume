// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface ApiError {
  message: string
  status: number
  code?: string
}

// Contact Form Types
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string // For bot detection
}

export interface ContactFormResponse {
  id: string
  timestamp: string
  success: boolean
}

// Analytics Types
export interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  timestamp: string
}

export interface PageViewData {
  page: string
  title: string
  referrer?: string
  userAgent: string
  timestamp: string
}

// Resume Data Types
export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone?: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  summary: string
  avatar?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  technologies: string[]
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  current: boolean
  gpa?: number
  honors?: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
  featured: boolean
  startDate: string
  endDate?: string
}

export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other'
  proficiency: 1 | 2 | 3 | 4 | 5
  yearsOfExperience: number
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  projects: Project[]
  skills: Skill[]
  lastUpdated: string
}

// API Configuration Types
export interface ApiConfig {
  baseUrl: string
  timeout: number
  retries: number
  headers: Record<string, string>
}

export interface RequestConfig extends Omit<RequestInit, 'body'> {
  timeout?: number
  retries?: number
  body?: any
}

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

// Cache Types
export interface CacheConfig {
  ttl: number // Time to live in milliseconds
  key: string
  refresh?: boolean
}

export interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}
