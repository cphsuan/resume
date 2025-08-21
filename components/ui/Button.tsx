import { ButtonHTMLAttributes, forwardRef, memo } from 'react'

import { cn } from '@/lib/utils'
import { type ButtonVariants, buttonVariants } from '@/lib/variants'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size }), className)} disabled={disabled || isLoading} ref={ref} {...props}>
        {/* Overlay for enhanced interactions */}
        <span className="absolute inset-0 overflow-hidden rounded">
          <span className="bg-overlay-hover absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
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

export default memo(Button)
export { buttonVariants, type ButtonVariants }
