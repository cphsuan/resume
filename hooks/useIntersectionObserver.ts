import { RefObject, useEffect, useState } from 'react'

interface IntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
}

/**
 * Hook to observe element intersection with viewport
 * @param ref - Reference to the element to observe
 * @param options - Intersection observer options
 * @returns Object with intersection state
 */
export function useIntersectionObserver(
  ref: RefObject<Element>,
  options: IntersectionObserverOptions = {}
): {
  isIntersecting: boolean
  entry?: IntersectionObserverEntry
} {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
      setEntry(entry)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, options.threshold, options.rootMargin, options.root])

  return { isIntersecting, entry }
}
