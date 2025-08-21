/**
 * Design Token System
 * Centralized design tokens for consistent theming across the application
 */

export const tokens = {
  // Color Tokens
  colors: {
    // Brand colors
    primary: {
      DEFAULT: 'var(--primary)',
      foreground: 'var(--primary-foreground)',
      hover: 'var(--primary-hover)',
      subtle: 'var(--primary-subtle)',
    },
    secondary: {
      DEFAULT: 'var(--secondary)',
      foreground: 'var(--secondary-foreground)',
      hover: 'var(--secondary-hover)',
      subtle: 'var(--secondary-subtle)',
    },
    accent: {
      DEFAULT: 'var(--accent)',
      foreground: 'var(--accent-foreground)',
      hover: 'var(--accent-hover)',
      subtle: 'var(--accent-subtle)',
    },

    // Semantic colors
    success: {
      DEFAULT: 'var(--success)',
      foreground: 'var(--success-foreground)',
      hover: 'var(--success-hover)',
      subtle: 'var(--success-subtle)',
    },
    warning: {
      DEFAULT: 'var(--warning)',
      foreground: 'var(--warning-foreground)',
      hover: 'var(--warning-hover)',
      subtle: 'var(--warning-subtle)',
    },
    error: {
      DEFAULT: 'var(--error)',
      foreground: 'var(--error-foreground)',
      hover: 'var(--error-hover)',
      subtle: 'var(--error-subtle)',
    },
    info: {
      DEFAULT: 'var(--info)',
      foreground: 'var(--info-foreground)',
      hover: 'var(--info-hover)',
      subtle: 'var(--info-subtle)',
    },

    // Base colors
    background: {
      DEFAULT: 'var(--background)',
      elevated: 'var(--background-elevated)',
      alt: 'var(--background-alt)',
      overlay: 'var(--background-overlay)',
    },
    foreground: {
      DEFAULT: 'var(--foreground)',
      muted: 'var(--foreground-muted)',
      alt: 'var(--foreground-alt)',
    },
    border: {
      DEFAULT: 'var(--border)',
      hover: 'var(--border-hover)',
      subtle: 'var(--border-subtle)',
    },
  },

  // Spacing Tokens
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '2.5rem', // 40px
    '3xl': '3rem', // 48px
    '4xl': '4rem', // 64px
    '5xl': '5rem', // 80px
    '6xl': '6rem', // 96px
  },

  // Typography Tokens
  typography: {
    fontFamily: {
      sans: 'var(--font-geist-sans)',
      mono: 'var(--font-geist-mono)',
    },
    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '3.75rem', // 60px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Border Tokens
  borders: {
    radius: {
      none: '0',
      sm: '0.125rem', // 2px
      DEFAULT: '0.25rem', // 4px
      md: '0.375rem', // 6px
      lg: '0.5rem', // 8px
      xl: '0.75rem', // 12px
      '2xl': '1rem', // 16px
      '3xl': '1.5rem', // 24px
      full: '9999px',
    },
    width: {
      none: '0',
      DEFAULT: '1px',
      '2': '2px',
      '4': '4px',
      '8': '8px',
    },
  },

  // Shadow Tokens
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // Animation Tokens
  animation: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      DEFAULT: '200ms',
      moderate: '300ms',
      slow: '500ms',
      slower: '700ms',
      slowest: '1000ms',
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Z-index Tokens
  zIndex: {
    base: '0',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modalBackdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
    toast: '1080',
  },

  // Breakpoint Tokens
  breakpoints: {
    xs: '375px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const

// Type exports for TypeScript support
export type ColorToken = typeof tokens.colors
export type SpacingToken = typeof tokens.spacing
export type TypographyToken = typeof tokens.typography
export type BorderToken = typeof tokens.borders
export type ShadowToken = typeof tokens.shadows
export type AnimationToken = typeof tokens.animation
export type ZIndexToken = typeof tokens.zIndex
export type BreakpointToken = typeof tokens.breakpoints

// Helper function to get CSS variable value
export function getCSSVariable(variable: string): string {
  if (typeof window === 'undefined') return variable
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
}

// Helper function to set CSS variable value
export function setCSSVariable(variable: string, value: string): void {
  if (typeof window === 'undefined') return
  document.documentElement.style.setProperty(variable, value)
}

// Export default for easier importing
export default tokens
