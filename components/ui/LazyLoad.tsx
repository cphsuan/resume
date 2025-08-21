'use client'

import { ComponentType, ReactNode, Suspense, lazy, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

interface LazyLoadProps {
  children: ReactNode
  fallback?: ReactNode
  threshold?: number
  rootMargin?: string
  className?: string
}

/**
 * LazyLoad component using Intersection Observer
 * Renders children only when they come into viewport
 */
export function LazyLoad({
  children,
  fallback = <LoadingPlaceholder />,
  threshold = 0.1,
  rootMargin = '50px',
  className,
}: LazyLoadProps) {
  const [isInView, setIsInView] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold, rootMargin])

  return (
    <div ref={setRef} className={className}>
      {isInView ? children : fallback}
    </div>
  )
}

/**
 * Default loading placeholder
 */
function LoadingPlaceholder() {
  return <div className="bg-muted h-32 w-full animate-pulse rounded-lg" />
}

/**
 * Lazy component loader with error boundary
 */
export function lazyLoadComponent<T extends ComponentType<any>>(importFunc: () => Promise<{ default: T }>, fallback?: ReactNode) {
  const LazyComponent = lazy(importFunc)

  return function LazyLoadedComponent(props: React.ComponentProps<T>) {
    return (
      <Suspense fallback={fallback || <ComponentSkeleton />}>
        <LazyComponent {...props} />
      </Suspense>
    )
  }
}

/**
 * Component skeleton loader
 */
export function ComponentSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="bg-muted h-4 w-3/4 rounded"></div>
      <div className="bg-muted mt-2 h-4 w-1/2 rounded"></div>
    </div>
  )
}

/**
 * Section lazy loader for heavy sections
 */
export function LazySectionLoader({
  children,
  skeleton,
  delay = 0,
  className,
}: {
  children: ReactNode
  skeleton?: ReactNode
  delay?: number
  className?: string
}) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!shouldRender) {
    return skeleton || <SectionSkeleton className={className} />
  }

  return <div className={className}>{children}</div>
}

/**
 * Section skeleton loader
 */
export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('w-full py-12', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          {/* Title skeleton */}
          <div className="bg-muted mx-auto h-8 w-48 rounded-lg"></div>

          {/* Content skeleton */}
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-muted h-48 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Progressive enhancement wrapper
 * Shows basic content immediately, then enhances with JS
 */
export function ProgressiveEnhancement({
  basic,
  enhanced,
  delay = 100,
}: {
  basic: ReactNode
  enhanced: ReactNode
  delay?: number
}) {
  const [isEnhanced, setIsEnhanced] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEnhanced(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return <>{isEnhanced ? enhanced : basic}</>
}

/**
 * Virtualized list for long lists
 */
export function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight,
  containerHeight,
  className,
}: {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  itemHeight: number
  containerHeight: number
  className?: string
}) {
  const [scrollTop, setScrollTop] = useState(0)

  const startIndex = Math.floor(scrollTop / itemHeight)
  const endIndex = Math.min(items.length - 1, Math.ceil((scrollTop + containerHeight) / itemHeight))

  const visibleItems = items.slice(startIndex, endIndex + 1)
  const totalHeight = items.length * itemHeight
  const offsetY = startIndex * itemHeight

  return (
    <div
      className={cn('relative overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Lazy image gallery component
 */
export function LazyImageGallery({
  images,
  columns = 3,
  gap = 4,
  className,
}: {
  images: { src: string; alt: string }[]
  columns?: number
  gap?: number
  className?: string
}) {
  return (
    <div
      className={cn('grid', className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap * 0.25}rem`,
      }}
    >
      {images.map((image, index) => (
        <LazyLoad
          key={index}
          fallback={<div className="bg-muted aspect-square animate-pulse rounded-lg" />}
          threshold={0.01}
          rootMargin="100px"
        >
          <img src={image.src} alt={image.alt} className="h-full w-full rounded-lg object-cover" loading="lazy" />
        </LazyLoad>
      ))}
    </div>
  )
}
