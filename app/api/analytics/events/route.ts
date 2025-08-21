import { NextRequest, NextResponse } from 'next/server'

import { AnalyticsEvent, createApiResponse } from '@/lib/api'

// In-memory storage for demo (use a proper database in production)
const analyticsStorage = new Map<string, AnalyticsEvent[]>()

interface AnalyticsEventRequest {
  events: AnalyticsEvent[]
  sessionId: string
  userId?: string
  timestamp: string
}

function validateAnalyticsEvent(event: any): event is AnalyticsEvent {
  return (
    typeof event === 'object' &&
    typeof event.event === 'string' &&
    typeof event.category === 'string' &&
    typeof event.action === 'string' &&
    typeof event.timestamp === 'string' &&
    event.event.length > 0 &&
    event.category.length > 0 &&
    event.action.length > 0
  )
}

function validateAnalyticsRequest(body: any): body is AnalyticsEventRequest {
  return (
    typeof body === 'object' &&
    Array.isArray(body.events) &&
    typeof body.sessionId === 'string' &&
    typeof body.timestamp === 'string' &&
    body.events.every(validateAnalyticsEvent) &&
    body.sessionId.length > 0
  )
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: any
    try {
      body = await request.json()
    } catch (error) {
      return NextResponse.json(createApiResponse(null, false, undefined, 'Invalid JSON in request body'), { status: 400 })
    }

    if (!validateAnalyticsRequest(body)) {
      return NextResponse.json(createApiResponse(null, false, undefined, 'Invalid analytics request'), { status: 400 })
    }

    const { events, sessionId, userId } = body

    // Process events (in production, send to analytics service)
    console.log('Analytics events received:', {
      sessionId,
      userId,
      eventCount: events.length,
      events: events.map((e: AnalyticsEvent) => ({
        event: e.event,
        category: e.category,
        action: e.action,
        label: e.label,
      })),
    })

    // Store events (in production, use proper database)
    const sessionKey = `${sessionId}-${userId || 'anonymous'}`
    const existingEvents = analyticsStorage.get(sessionKey) || []
    analyticsStorage.set(sessionKey, [...existingEvents, ...events])

    // Clean up old sessions (keep last 1000 events per session)
    existingEvents.splice(0, Math.max(0, existingEvents.length - 1000))

    return NextResponse.json(
      createApiResponse({ processed: events.length, sessionId }, true, 'Analytics events processed successfully'),
      { status: 200 }
    )
  } catch (error) {
    console.error('Analytics events API error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Failed to process analytics events'

    return NextResponse.json(createApiResponse(null, false, undefined, errorMessage), { status: 500 })
  }
}

// Get analytics data (for admin/debugging)
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const sessionId = url.searchParams.get('sessionId')

    if (sessionId) {
      const events = Array.from(analyticsStorage.values())
        .flat()
        .filter(event => event.timestamp && event.timestamp.length > 0)
        .slice(-100) // Last 100 events

      return NextResponse.json(createApiResponse({ events, count: events.length }, true), { status: 200 })
    }

    // Return summary statistics
    const totalEvents = Array.from(analyticsStorage.values()).reduce((sum, events) => sum + events.length, 0)

    const activeSessions = analyticsStorage.size

    return NextResponse.json(createApiResponse({ totalEvents, activeSessions }, true, 'Analytics summary retrieved'), {
      status: 200,
    })
  } catch (error) {
    console.error('Analytics GET API error:', error)

    return NextResponse.json(createApiResponse(null, false, undefined, 'Failed to retrieve analytics data'), { status: 500 })
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
