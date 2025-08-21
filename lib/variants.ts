import { type VariantProps, cva } from 'class-variance-authority'

// Button variants using cva
export const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded font-medium transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-ring-offset disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] touch-manipulation',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover active:shadow-sm shadow-sm',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:shadow-sm shadow-sm',
        accent: 'bg-accent text-accent-foreground hover:bg-accent-hover active:shadow-sm shadow-sm',
        outline:
          'border border-border bg-background-elevated text-foreground hover:bg-background-alt hover:border-border-hover active:shadow-sm shadow-sm',
        ghost: 'text-foreground-alt hover:bg-background-alt hover:text-foreground active:bg-background-elevated',
        success: 'bg-success text-success-foreground hover:bg-success-hover active:shadow-sm shadow-sm',
        warning: 'bg-warning text-warning-foreground hover:bg-warning-hover active:shadow-sm shadow-sm',
        error: 'bg-error text-error-foreground hover:bg-error-hover active:shadow-sm shadow-sm',
      },
      size: {
        sm: 'px-3 py-2 text-sm min-h-[36px] min-w-[36px]',
        md: 'px-4 py-2.5 text-sm min-h-[40px] min-w-[40px]',
        lg: 'px-6 py-3 text-base min-h-[44px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

// Card variants using cva
export const cardVariants = cva('rounded-lg transition-all duration-200', {
  variants: {
    variant: {
      default: 'bg-background-elevated',
      outlined: 'bg-background-elevated border border-border',
      elevated: 'bg-background-elevated shadow-md hover:shadow-lg',
      glass: 'bg-background-overlay backdrop-blur-md border border-border-subtle',
    },
    padding: {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
})

export type CardVariants = VariantProps<typeof cardVariants>

// Badge variants using cva
export const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all', {
  variants: {
    variant: {
      default: 'bg-background-elevated text-foreground border border-border',
      primary: 'bg-primary/10 text-primary border border-primary/20',
      secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
      success: 'bg-success/10 text-success border border-success/20',
      warning: 'bg-warning/10 text-warning border border-warning/20',
      error: 'bg-error/10 text-error border border-error/20',
      info: 'bg-info/10 text-info border border-info/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type BadgeVariants = VariantProps<typeof badgeVariants>

// Section variants for consistent spacing and layout
export const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      none: '',
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-16 md:py-24',
      xl: 'py-20 md:py-32',
    },
    container: {
      full: '',
      default: 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
      narrow: 'mx-auto max-w-4xl px-4 sm:px-6 lg:px-8',
      wide: 'mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8',
    },
  },
  defaultVariants: {
    spacing: 'md',
    container: 'default',
  },
})

export type SectionVariants = VariantProps<typeof sectionVariants>

// Typography variants for consistent text styling
export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
      h2: 'text-3xl md:text-4xl font-bold tracking-tight',
      h3: 'text-2xl md:text-3xl font-semibold',
      h4: 'text-xl md:text-2xl font-semibold',
      h5: 'text-lg md:text-xl font-medium',
      h6: 'text-base md:text-lg font-medium',
      body: 'text-base',
      small: 'text-sm',
      muted: 'text-foreground-muted',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

export type TypographyVariants = VariantProps<typeof typographyVariants>
