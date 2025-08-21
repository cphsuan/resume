import { type VariantProps, cva } from 'class-variance-authority'

/**
 * Animation variants using CVA
 */
export const animationVariants = cva('', {
  variants: {
    // Fade animations
    fade: {
      in: 'animate-fade-in',
      out: 'animate-fade-out',
      'in-up': 'animate-fade-in-up',
      'in-down': 'animate-fade-in-down',
      'in-left': 'animate-fade-in-left',
      'in-right': 'animate-fade-in-right',
    },

    // Slide animations
    slide: {
      'in-up': 'animate-slide-in-up',
      'in-down': 'animate-slide-in-down',
      'in-left': 'animate-slide-in-left',
      'in-right': 'animate-slide-in-right',
      'out-up': 'animate-slide-out-up',
      'out-down': 'animate-slide-out-down',
      'out-left': 'animate-slide-out-left',
      'out-right': 'animate-slide-out-right',
    },

    // Scale animations
    scale: {
      in: 'animate-scale-in',
      out: 'animate-scale-out',
      'in-center': 'animate-scale-in-center',
      'out-center': 'animate-scale-out-center',
    },

    // Bounce animations
    bounce: {
      in: 'animate-bounce-in',
      out: 'animate-bounce-out',
      gentle: 'animate-bounce-gentle',
    },

    // Rotation animations
    rotate: {
      in: 'animate-rotate-in',
      out: 'animate-rotate-out',
      '90': 'animate-rotate-90',
      '180': 'animate-rotate-180',
      '360': 'animate-rotate-360',
    },

    // Shake animations
    shake: {
      default: 'animate-shake',
      x: 'animate-shake-x',
      y: 'animate-shake-y',
    },

    // Pulse animations
    pulse: {
      default: 'animate-pulse',
      gentle: 'animate-pulse-gentle',
      strong: 'animate-pulse-strong',
    },

    // Duration variants
    duration: {
      '75': 'duration-75',
      '100': 'duration-100',
      '150': 'duration-150',
      '200': 'duration-200',
      '300': 'duration-300',
      '500': 'duration-500',
      '700': 'duration-700',
      '1000': 'duration-1000',
    },

    // Delay variants
    delay: {
      '75': 'delay-75',
      '100': 'delay-100',
      '150': 'delay-150',
      '200': 'delay-200',
      '300': 'delay-300',
      '500': 'delay-500',
      '700': 'delay-700',
      '1000': 'delay-1000',
    },

    // Easing variants
    easing: {
      linear: 'ease-linear',
      in: 'ease-in',
      out: 'ease-out',
      'in-out': 'ease-in-out',
    },
  },
})

export type AnimationVariants = VariantProps<typeof animationVariants>

/**
 * Animation presets for common use cases
 */
export const animationPresets = {
  // Entrance animations
  entrance: {
    fadeIn: 'animate-fade-in duration-500 ease-out',
    slideInUp: 'animate-slide-in-up duration-500 ease-out',
    slideInDown: 'animate-slide-in-down duration-500 ease-out',
    slideInLeft: 'animate-slide-in-left duration-500 ease-out',
    slideInRight: 'animate-slide-in-right duration-500 ease-out',
    scaleIn: 'animate-scale-in duration-300 ease-out',
    bounceIn: 'animate-bounce-in duration-600 ease-out',
  },

  // Exit animations
  exit: {
    fadeOut: 'animate-fade-out duration-300 ease-in',
    slideOutUp: 'animate-slide-out-up duration-300 ease-in',
    slideOutDown: 'animate-slide-out-down duration-300 ease-in',
    slideOutLeft: 'animate-slide-out-left duration-300 ease-in',
    slideOutRight: 'animate-slide-out-right duration-300 ease-in',
    scaleOut: 'animate-scale-out duration-200 ease-in',
  },

  // Attention seekers
  attention: {
    bounce: 'animate-bounce-gentle duration-1000',
    pulse: 'animate-pulse-gentle duration-2000',
    shake: 'animate-shake duration-500',
  },

  // Interactive states
  interactive: {
    hover: 'transition-all duration-200 ease-out hover:scale-105',
    press: 'transition-transform duration-75 active:scale-95',
    focus: 'transition-all duration-200 focus:scale-105 focus:shadow-lg',
  },

  // Loading states
  loading: {
    spin: 'animate-spin duration-1000 linear',
    pulse: 'animate-pulse duration-1500',
    bounce: 'animate-bounce duration-1000',
  },
} as const

/**
 * Stagger animation utilities
 */
export const staggerAnimations = {
  children: 'stagger-children-100',
  'children-150': 'stagger-children-150',
  'children-200': 'stagger-children-200',
  'children-300': 'stagger-children-300',
}

/**
 * Animation timing functions
 */
export const easingFunctions = {
  // Standard easing
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',

  // Custom cubic-bezier functions
  bounceOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  elasticOut: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  backOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  anticipate: 'cubic-bezier(0.25, 0.1, 0.25, 1)',

  // Spring-like animations
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
} as const

/**
 * Generate random animation delays for staggered animations
 */
export function generateStaggerDelay(index: number, baseDelay: number = 100): number {
  return index * baseDelay
}

/**
 * Create a CSS animation keyframe string
 */
export function createKeyframes(name: string, keyframes: Record<string, Record<string, string>>): string {
  const keyframeStrings = Object.entries(keyframes).map(([percentage, styles]) => {
    const styleStrings = Object.entries(styles)
      .map(([property, value]) => `${property}: ${value}`)
      .join('; ')
    return `${percentage} { ${styleStrings} }`
  })

  return `@keyframes ${name} { ${keyframeStrings.join(' ')} }`
}

/**
 * Animation configuration for different contexts
 */
export const animationConfigs = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: easingFunctions.easeOut },
  },

  // Modal animations
  modal: {
    backdrop: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
    },
    content: {
      initial: { opacity: 0, scale: 0.95, y: 10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 10 },
      transition: { duration: 0.2, ease: easingFunctions.easeOut },
    },
  },

  // List item animations
  listItem: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.3, ease: easingFunctions.easeOut },
  },

  // Card animations
  card: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
    transition: { duration: 0.3, ease: easingFunctions.spring },
  },
} as const

/**
 * Performance-optimized animation properties
 * Use these for better performance (GPU acceleration)
 */
export const gpuOptimizedProperties = ['transform', 'opacity', 'filter', 'backdrop-filter'] as const

/**
 * Animation utilities
 */
export const animationUtils = {
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },

  /**
   * Get safe animation duration based on user preferences
   */
  getSafeDuration: (duration: number): number => {
    return animationUtils.prefersReducedMotion() ? 0 : duration
  },

  /**
   * Create intersection observer for scroll animations
   */
  createScrollObserver: (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver => {
    return new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    })
  },
}
