'use client'

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react'

import { useIntersectionObserver } from '@/hooks'
import { animationPresets, animationUtils } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface AnimatedContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  animation?: keyof typeof animationPresets.entrance | keyof typeof animationPresets.attention | 'none'
  delay?: number
  duration?: number
  threshold?: number
  triggerOnce?: boolean
  stagger?: boolean
  staggerDelay?: number
  className?: string
}

export default function AnimatedContainer({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration,
  threshold = 0.1,
  triggerOnce = true,
  stagger = false,
  staggerDelay = 100,
  className,
  ...props
}: AnimatedContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const { isIntersecting } = useIntersectionObserver(ref, { threshold })

  const shouldAnimate = isIntersecting && (!triggerOnce || !hasAnimated)

  useEffect(() => {
    if (shouldAnimate && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [shouldAnimate, hasAnimated])

  // Check for reduced motion preference
  const prefersReducedMotion = animationUtils.prefersReducedMotion()

  // Get animation classes
  const getAnimationClasses = () => {
    if (animation === 'none' || prefersReducedMotion) {
      return ''
    }

    const baseAnimation =
      animationPresets.entrance[animation as keyof typeof animationPresets.entrance] ||
      animationPresets.attention[animation as keyof typeof animationPresets.attention] ||
      ''

    const staggerClass = stagger ? 'stagger-children-100' : ''

    return `${baseAnimation} ${staggerClass}`
  }

  // Apply stagger delays to children
  useEffect(() => {
    if (stagger && ref.current && shouldAnimate) {
      const children = Array.from(ref.current.children)
      children.forEach((child, index) => {
        if (child instanceof HTMLElement) {
          child.style.setProperty('--stagger-delay', index.toString())
        }
      })
    }
  }, [stagger, shouldAnimate])

  return (
    <div
      ref={ref}
      className={cn(shouldAnimate ? getAnimationClasses() : 'opacity-0', className)}
      style={{
        animationDelay: `${animationUtils.getSafeDuration(delay)}ms`,
        animationDuration: duration ? `${animationUtils.getSafeDuration(duration)}ms` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Staggered list animation component
 */
export function StaggeredList({
  children,
  animation = 'fadeInUp',
  staggerDelay = 100,
  className,
  ...props
}: {
  children: ReactNode
  animation?: 'fadeInUp' | 'fadeInLeft' | 'scaleIn'
  staggerDelay?: number
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <AnimatedContainer animation={animation} stagger staggerDelay={staggerDelay} className={className} {...props}>
      {children}
    </AnimatedContainer>
  )
}

/**
 * Hover animation wrapper
 */
export function HoverAnimatedCard({
  children,
  className,
  ...props
}: {
  children: ReactNode
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('transition-all duration-300 ease-out', 'hover:scale-105 hover:shadow-lg', 'active:scale-95', className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Loading animation component
 */
export function LoadingSpinner({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <div
      className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', sizeClasses[size], className)}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

/**
 * Floating action button with animation
 */
export function FloatingButton({
  children,
  className,
  ...props
}: {
  children: ReactNode
} & HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'fixed right-6 bottom-6 z-50',
        'flex h-14 w-14 items-center justify-center',
        'bg-primary text-primary-foreground rounded-full shadow-lg',
        'transition-all duration-300 ease-out',
        'hover:scale-110 hover:shadow-xl',
        'active:scale-95',
        'animate-float',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Page transition wrapper
 */
export function PageTransition({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('animate-fade-in-up', className)} style={{ animationDuration: '300ms' }}>
      {children}
    </div>
  )
}
