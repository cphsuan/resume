import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseClasses = 'rounded-lg transition-all duration-200'

    const variantClasses = {
      default: 'bg-background-elevated',
      outlined: 'bg-background-elevated border border-border',
      elevated: 'bg-background-elevated shadow-md hover:shadow-lg',
      glass: 'bg-background-overlay backdrop-blur-md border border-border-subtle',
    }

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div className={cn(baseClasses, variantClasses[variant], paddingClasses[padding], className)} ref={ref} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

type CardHeaderProps = HTMLAttributes<HTMLDivElement>

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props} />
))
CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(({ className, as: Component = 'h3', ...props }, ref) => (
  <Component ref={ref} className={cn('text-foreground text-xl font-semibold', className)} {...props} />
))
CardTitle.displayName = 'CardTitle'

type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-foreground-muted', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

type CardContentProps = HTMLAttributes<HTMLDivElement>

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
))
CardContent.displayName = 'CardContent'

type CardFooterProps = HTMLAttributes<HTMLDivElement>

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center pt-4', className)} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
