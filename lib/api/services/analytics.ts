import { apiClient } from '../client'
import { AnalyticsEvent, PageViewData } from '../types'

export interface AnalyticsConfig {
  trackingId?: string
  enableDevMode: boolean
  sampleRate: number
  cookieConsent: boolean
}

export class AnalyticsService {
  private static instance: AnalyticsService
  private config: AnalyticsConfig
  private queue: AnalyticsEvent[] = []
  private pageViews: PageViewData[] = []
  private sessionId: string
  private userId?: string

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }

  constructor() {
    this.config = {
      enableDevMode: process.env.NODE_ENV === 'development',
      sampleRate: 1.0,
      cookieConsent: false,
    }

    this.sessionId = this.generateSessionId()
    this.initializeUser()

    // Flush queue periodically
    if (typeof window !== 'undefined') {
      setInterval(() => this.flushQueue(), 30000) // Every 30 seconds
    }
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private generateUserId(): string {
    return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private initializeUser(): void {
    if (typeof window !== 'undefined') {
      // Try to get existing user ID from localStorage
      const existingUserId = localStorage.getItem('analytics_user_id')
      if (existingUserId) {
        this.userId = existingUserId
      } else {
        this.userId = this.generateUserId()
        localStorage.setItem('analytics_user_id', this.userId)
      }
    }
  }

  public setConfig(config: Partial<AnalyticsConfig>): void {
    this.config = { ...this.config, ...config }
  }

  public setCookieConsent(consent: boolean): void {
    this.config.cookieConsent = consent
    if (consent) {
      this.flushQueue()
    } else {
      this.clearData()
    }
  }

  private shouldTrack(): boolean {
    // Don't track in development unless explicitly enabled
    if (this.config.enableDevMode && process.env.NODE_ENV === 'development') {
      return true
    }

    // Don't track without cookie consent
    if (!this.config.cookieConsent) {
      return false
    }

    // Sample rate filtering
    return Math.random() <= this.config.sampleRate
  }

  private createBaseEvent(): Partial<AnalyticsEvent> {
    return {
      timestamp: new Date().toISOString(),
    }
  }

  public trackPageView(page: string, title: string): void {
    if (!this.shouldTrack()) return

    const pageView: PageViewData = {
      page,
      title,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      timestamp: new Date().toISOString(),
    }

    this.pageViews.push(pageView)

    // Also track as an event
    this.trackEvent('page_view', 'navigation', page, undefined, { page, title })
  }

  public trackEvent(
    event: string,
    category: string,
    action: string,
    label?: string,
    value?: number,
    customData?: Record<string, any>
  ): void {
    if (!this.shouldTrack()) return

    const analyticsEvent: AnalyticsEvent = {
      ...this.createBaseEvent(),
      event,
      category,
      action,
      label,
      value,
      timestamp: new Date().toISOString(),
      ...customData,
    }

    this.queue.push(analyticsEvent)

    // Log in development
    if (this.config.enableDevMode) {
      console.log('Analytics Event:', analyticsEvent)
    }

    // Flush immediately for important events
    if (category === 'error' || event === 'conversion') {
      this.flushQueue()
    }
  }

  public trackClick(element: string, location?: string): void {
    this.trackEvent('click', 'engagement', 'click', element, undefined, { location })
  }

  public trackDownload(filename: string, type: string): void {
    this.trackEvent('download', 'engagement', 'file_download', filename, undefined, { type })
  }

  public trackFormSubmission(formName: string, success: boolean): void {
    this.trackEvent(success ? 'form_submit_success' : 'form_submit_error', 'form', 'submit', formName)
  }

  public trackError(error: Error, context?: string): void {
    this.trackEvent('error', 'error', error.name, error.message, undefined, {
      stack: error.stack,
      context,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    })
  }

  public trackTiming(name: string, duration: number, category = 'performance'): void {
    this.trackEvent('timing', category, name, undefined, duration)
  }

  public trackCustomEvent(eventData: Partial<AnalyticsEvent>): void {
    if (!this.shouldTrack()) return

    const event: AnalyticsEvent = {
      ...this.createBaseEvent(),
      event: 'custom',
      category: 'custom',
      action: 'custom',
      ...eventData,
      timestamp: new Date().toISOString(),
    }

    this.queue.push(event)
  }

  private async flushQueue(): Promise<void> {
    if (this.queue.length === 0 || !this.config.cookieConsent) {
      return
    }

    const events = [...this.queue]
    this.queue = []

    try {
      await apiClient.post('/api/analytics/events', {
        events,
        sessionId: this.sessionId,
        userId: this.userId,
        timestamp: new Date().toISOString(),
      })

      if (this.config.enableDevMode) {
        console.log(`Flushed ${events.length} analytics events`)
      }
    } catch (error) {
      // Re-queue events on failure
      this.queue.unshift(...events)

      if (this.config.enableDevMode) {
        console.error('Failed to flush analytics events:', error)
      }
    }
  }

  public async flushPageViews(): Promise<void> {
    if (this.pageViews.length === 0 || !this.config.cookieConsent) {
      return
    }

    const pageViews = [...this.pageViews]
    this.pageViews = []

    try {
      await apiClient.post('/api/analytics/pageviews', {
        pageViews,
        sessionId: this.sessionId,
        userId: this.userId,
      })
    } catch (error) {
      // Re-queue page views on failure
      this.pageViews.unshift(...pageViews)

      if (this.config.enableDevMode) {
        console.error('Failed to flush page views:', error)
      }
    }
  }

  public clearData(): void {
    this.queue = []
    this.pageViews = []
    if (typeof window !== 'undefined') {
      localStorage.removeItem('analytics_user_id')
    }
  }

  // Web Vitals tracking
  public trackWebVitals(): void {
    if (typeof window === 'undefined') return

    // First Contentful Paint
    new PerformanceObserver(list => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.trackTiming('first_contentful_paint', entry.startTime)
        }
      }
    }).observe({ type: 'paint', buffered: true })

    // Largest Contentful Paint
    new PerformanceObserver(list => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      this.trackTiming('largest_contentful_paint', lastEntry.startTime)
    }).observe({ type: 'largest-contentful-paint', buffered: true })

    // Cumulative Layout Shift
    new PerformanceObserver(list => {
      let clsValue = 0
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value
        }
      }
      this.trackTiming('cumulative_layout_shift', clsValue * 1000) // Convert to ms-like value
    }).observe({ type: 'layout-shift', buffered: true })
  }

  // Cleanup on page unload
  public setupUnloadHandler(): void {
    if (typeof window === 'undefined') return

    window.addEventListener('beforeunload', () => {
      // Use sendBeacon for reliable delivery
      if (navigator.sendBeacon && this.queue.length > 0) {
        const payload = JSON.stringify({
          events: this.queue,
          sessionId: this.sessionId,
          userId: this.userId,
        })

        navigator.sendBeacon('/api/analytics/events', payload)
      }
    })
  }
}

export const analyticsService = AnalyticsService.getInstance()
