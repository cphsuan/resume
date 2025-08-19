import { ButtonHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseClasses =
      'relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] touch-manipulation'

    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 active:shadow-sm focus:ring-blue-500',
      secondary:
        'bg-gray-100 text-gray-900 hover:bg-gray-200 active:shadow-sm focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
      outline:
        'border border-gray-300 bg-white text-gray-700 shadow-sm hover:shadow-md active:shadow-sm focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
      ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-400 dark:hover:bg-gray-800',
    }

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm min-h-[36px] min-w-[36px] @media (hover: none) and (pointer: coarse)',
      md: 'px-4 py-2.5 text-sm min-h-[40px] min-w-[40px] @media (hover: none) and (pointer: coarse)',
      lg: 'px-6 py-3 text-base min-h-[44px] @media (hover: none) and (pointer: coarse)',
    }

    return (
      <button
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {/* Overlay for enhanced interactions */}
        <span className="absolute inset-0 overflow-hidden rounded-lg">
          <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-200 hover:opacity-100" />
        </span>

        <span className="relative z-10 flex items-center">
          {isLoading && (
            <svg className="mr-2 -ml-1 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
