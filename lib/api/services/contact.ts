import { apiClient } from '../client'
import { ApiResponse, ContactFormData, ContactFormResponse } from '../types'

// Validation schemas
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE_LENGTH = 2000
const MAX_NAME_LENGTH = 100
const MAX_SUBJECT_LENGTH = 200

export class ContactValidationError extends Error {
  public field: string

  constructor(message: string, field: string) {
    super(message)
    this.name = 'ContactValidationError'
    this.field = field
  }
}

export class ContactService {
  private static instance: ContactService

  public static getInstance(): ContactService {
    if (!ContactService.instance) {
      ContactService.instance = new ContactService()
    }
    return ContactService.instance
  }

  private validateContactForm(data: ContactFormData): void {
    if (!data.name || data.name.trim().length === 0) {
      throw new ContactValidationError('Name is required', 'name')
    }

    if (data.name.length > MAX_NAME_LENGTH) {
      throw new ContactValidationError(`Name must be less than ${MAX_NAME_LENGTH} characters`, 'name')
    }

    if (!data.email || !EMAIL_REGEX.test(data.email)) {
      throw new ContactValidationError('Valid email is required', 'email')
    }

    if (!data.subject || data.subject.trim().length === 0) {
      throw new ContactValidationError('Subject is required', 'subject')
    }

    if (data.subject.length > MAX_SUBJECT_LENGTH) {
      throw new ContactValidationError(`Subject must be less than ${MAX_SUBJECT_LENGTH} characters`, 'subject')
    }

    if (!data.message || data.message.trim().length === 0) {
      throw new ContactValidationError('Message is required', 'message')
    }

    if (data.message.length > MAX_MESSAGE_LENGTH) {
      throw new ContactValidationError(`Message must be less than ${MAX_MESSAGE_LENGTH} characters`, 'message')
    }

    // Honeypot field should be empty (bot detection)
    if (data.honeypot && data.honeypot.trim().length > 0) {
      throw new ContactValidationError('Invalid submission', 'honeypot')
    }
  }

  private sanitizeInput(input: string): string {
    return input.trim().replace(/[<>]/g, '')
  }

  public async submitContactForm(data: ContactFormData): Promise<ContactFormResponse> {
    // Validate input
    this.validateContactForm(data)

    // Sanitize data
    const sanitizedData: ContactFormData = {
      name: this.sanitizeInput(data.name),
      email: this.sanitizeInput(data.email),
      subject: this.sanitizeInput(data.subject),
      message: this.sanitizeInput(data.message),
      honeypot: data.honeypot || '',
    }

    try {
      const response = await apiClient.post<ContactFormResponse>('/api/contact', sanitizedData, {
        timeout: 15000, // Longer timeout for email sending
      })

      return response
    } catch (error) {
      // Add additional context for contact form errors
      if (error instanceof Error) {
        throw new Error(`Failed to send message: ${error.message}`)
      }
      throw new Error('Failed to send message. Please try again later.')
    }
  }

  // Mock implementation for development/demo
  public async submitContactFormMock(data: ContactFormData): Promise<ContactFormResponse> {
    this.validateContactForm(data)

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulate occasional failures for testing
    if (Math.random() < 0.1) {
      throw new Error('Simulated network error')
    }

    return {
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      success: true,
    }
  }

  // Rate limiting check (client-side basic implementation)
  private isRateLimited(): boolean {
    const lastSubmission = localStorage.getItem('lastContactSubmission')
    if (lastSubmission) {
      const timeDiff = Date.now() - parseInt(lastSubmission)
      return timeDiff < 60000 // 1 minute cooldown
    }
    return false
  }

  public async submitWithRateLimit(data: ContactFormData): Promise<ContactFormResponse> {
    if (this.isRateLimited()) {
      throw new Error('Please wait before sending another message')
    }

    const result = await this.submitContactForm(data)
    localStorage.setItem('lastContactSubmission', Date.now().toString())

    return result
  }
}

export const contactService = ContactService.getInstance()
