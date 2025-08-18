'use client'

import { useState } from 'react'

import { Button } from '@/components/ui'
import { NAVIGATION_ITEMS } from '@/data/constants'
import { cn } from '@/lib/utils'

import ThemeToggle from './ThemeToggle'

interface NavigationProps {
  className?: string
}

export default function Navigation({ className }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className={cn('', className)}>
      <div className="flex items-center justify-between">
        <div className="hidden items-center space-x-8 md:flex">
          {NAVIGATION_ITEMS.map(item => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'mt-4 border-t border-gray-200 pb-4 transition-all duration-200 md:hidden dark:border-gray-700',
          isOpen ? 'block opacity-100' : 'hidden opacity-0'
        )}
      >
        <div className="flex flex-col space-y-4 pt-4">
          {NAVIGATION_ITEMS.map(item => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="text-left font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
