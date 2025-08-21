import { NextRequest, NextResponse } from 'next/server'

import { ContactFormData, ContactFormResponse, createApiResponse } from '@/lib/api'

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3

function getRateLimitKey(request: NextRequest): string {
  // In production, you might want to use a more sophisticated approach
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return `contact:${ip}`
}

function isRateLimited(key: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(key)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  if (limit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }

  limit.count++
  return false
}

function validateContactForm(data: any): data is ContactFormData {
  return (
    typeof data === 'object' &&
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.subject === 'string' &&
    typeof data.message === 'string' &&
    data.name.trim().length > 0 &&
    data.email.includes('@') &&
    data.subject.trim().length > 0 &&
    data.message.trim().length > 0 &&
    data.name.length <= 100 &&
    data.subject.length <= 200 &&
    data.message.length <= 2000 &&
    (!data.honeypot || data.honeypot.length === 0) // Honeypot should be empty
  )
}

async function sendEmail(data: ContactFormData): Promise<void> {
  // Mock email sending implementation
  // In production, integrate with SendGrid, AWS SES, or similar service

  console.log('Sending email:', {
    to: process.env.CONTACT_EMAIL || 'admin@example.com',
    from: data.email,
    subject: `Contact Form: ${data.subject}`,
    message: data.message,
    senderName: data.name,
  })

  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Simulate occasional failures for testing
  if (Math.random() < 0.05) {
    // 5% failure rate
    throw new Error('Email service temporarily unavailable')
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(createApiResponse(null, false, undefined, 'Too many requests. Please try again later.'), {
        status: 429,
      })
    }

    // Parse and validate request body
    let body: any
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(createApiResponse(null, false, undefined, 'Invalid JSON in request body'), { status: 400 })
    }

    if (!validateContactForm(body)) {
      return NextResponse.json(createApiResponse(null, false, undefined, 'Invalid contact form data'), { status: 400 })
    }

    const contactData: ContactFormData = body

    // Additional server-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactData.email)) {
      return NextResponse.json(createApiResponse(null, false, undefined, 'Invalid email address'), { status: 400 })
    }

    // Send email
    await sendEmail(contactData)

    // Create response
    const response: ContactFormResponse = {
      id: `contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      success: true,
    }

    return NextResponse.json(createApiResponse(response, true, 'Message sent successfully'), { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to send message'

    return NextResponse.json(createApiResponse(null, false, undefined, errorMessage), { status: 500 })
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
