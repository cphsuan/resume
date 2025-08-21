'use client'

import { Component, ErrorInfo, ReactNode } from 'react'

import Button from '@/components/ui/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // You can log the error to an error reporting service here
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Log to error tracking service (e.g., Sentry, LogRocket)
      console.error('Error logged to tracking service:', {
        error: error.toString(),
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      })
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
          <div className="bg-background-elevated border-border max-w-md rounded-lg border p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <div className="bg-error/10 flex h-16 w-16 items-center justify-center rounded-full">
                <svg className="text-error h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-foreground mb-2 text-xl font-semibold">Something went wrong</h2>
            <p className="text-foreground-muted mb-6 text-sm">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4 text-left">
                <summary className="text-foreground-alt cursor-pointer text-sm font-medium">
                  Error details (Development only)
                </summary>
                <pre className="bg-background-alt text-foreground-muted mt-2 overflow-auto rounded p-2 text-xs">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            <Button onClick={() => window.location.reload()} variant="primary" size="md">
              Refresh Page
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
