import { ComponentPropsWithoutRef, ElementType, ForwardedRef, ReactElement, forwardRef } from 'react'

/**
 * Polymorphic component type definitions
 * Allows components to render as different HTML elements while maintaining type safety
 */

// Type for the "as" prop
export type AsProps<C extends ElementType> = {
  as?: C
}

// Type for props of the element specified by "as"
export type PropsToOmit<C extends ElementType, P> = keyof (AsProps<C> & P)

// Polymorphic component props
export type PolymorphicComponentProps<C extends ElementType, Props = object> = Props &
  AsProps<C> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

// Polymorphic component props with ref
export type PolymorphicComponentPropsWithRef<C extends ElementType, Props = object> = PolymorphicComponentProps<C, Props> & {
  ref?: PolymorphicRef<C>
}

// Polymorphic ref type
export type PolymorphicRef<C extends ElementType> = ComponentPropsWithoutRef<C>['ref']

/**
 * Example: Polymorphic Text Component
 */
type TextProps<C extends ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'muted'
    color?: 'primary' | 'secondary' | 'accent' | 'foreground' | 'muted' | 'error' | 'warning' | 'success'
  }
>

type TextComponent = <C extends ElementType = 'span'>(props: TextProps<C>) => ReactElement | null

const Text: TextComponent = forwardRef(function Text<C extends ElementType = 'span'>(
  { as, variant = 'body', color = 'foreground', className, children, ...props }: TextProps<C>,
  ref: ForwardedRef<Element>
) {
  const Component = as || 'span'

  const variantClasses = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
    h2: 'text-3xl md:text-4xl font-bold tracking-tight',
    h3: 'text-2xl md:text-3xl font-semibold',
    h4: 'text-xl md:text-2xl font-semibold',
    h5: 'text-lg md:text-xl font-medium',
    h6: 'text-base md:text-lg font-medium',
    body: 'text-base',
    small: 'text-sm',
    muted: 'text-sm text-foreground-muted',
  }

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    foreground: 'text-foreground',
    muted: 'text-foreground-muted',
    error: 'text-error',
    warning: 'text-warning',
    success: 'text-success',
  }

  const classes = `${variantClasses[variant]} ${colorClasses[color]} ${className || ''}`

  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  )
})

/**
 * Example: Polymorphic Box Component
 */
type BoxProps<C extends ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    display?: 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex' | 'grid'
  }
>

type BoxComponent = <C extends ElementType = 'div'>(props: BoxProps<C>) => ReactElement | null

const Box: BoxComponent = forwardRef(function Box<C extends ElementType = 'div'>(
  { as, padding = 'none', margin = 'none', display = 'block', className, children, ...props }: BoxProps<C>,
  ref: ForwardedRef<Element>
) {
  const Component = as || 'div'

  const paddingClasses = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  }

  const marginClasses = {
    none: '',
    sm: 'm-2',
    md: 'm-4',
    lg: 'm-6',
    xl: 'm-8',
  }

  const displayClasses = {
    block: 'block',
    'inline-block': 'inline-block',
    inline: 'inline',
    flex: 'flex',
    'inline-flex': 'inline-flex',
    grid: 'grid',
  }

  const classes = `${paddingClasses[padding]} ${marginClasses[margin]} ${displayClasses[display]} ${className || ''}`

  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  )
})

/**
 * Example: Polymorphic Link Component
 */
type LinkProps<C extends ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    variant?: 'default' | 'primary' | 'secondary' | 'underline' | 'hover'
    external?: boolean
  }
>

type LinkComponent = <C extends ElementType = 'a'>(props: LinkProps<C>) => ReactElement | null

const Link: LinkComponent = forwardRef(function Link<C extends ElementType = 'a'>(
  { as, variant = 'default', external = false, className, children, ...props }: LinkProps<C>,
  ref: ForwardedRef<Element>
) {
  const Component = as || 'a'

  const variantClasses = {
    default: 'text-primary hover:text-primary-hover transition-colors',
    primary: 'text-primary font-medium hover:text-primary-hover transition-colors',
    secondary: 'text-secondary hover:text-secondary-hover transition-colors',
    underline: 'underline hover:no-underline transition-all',
    hover: 'hover:underline transition-all',
  }

  const classes = `${variantClasses[variant]} ${className || ''}`

  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}

  return (
    <Component ref={ref} className={classes} {...externalProps} {...props}>
      {children}
    </Component>
  )
})

export { Text, Box, Link }
export type { TextProps, BoxProps, LinkProps }
