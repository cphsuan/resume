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
    <nav className={cn('relative', className)}>
      <div className="flex items-center justify-between">
        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-1 md:flex">
          {NAVIGATION_ITEMS.map(item => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="relative rounded-md px-3 py-2 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600 focus:bg-gray-100 focus:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-400 dark:focus:bg-gray-800"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />

          {/* Enhanced Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="relative h-10 w-10 p-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <div className="flex h-5 w-5 flex-col items-center justify-center">
              <span
                className={cn(
                  'block h-0.5 w-5 bg-current transition-all duration-300',
                  isOpen ? 'translate-y-0.5 rotate-45' : ''
                )}
              />
              <span className={cn('mt-1 block h-0.5 w-5 bg-current transition-all duration-300', isOpen ? 'opacity-0' : '')} />
              <span
                className={cn(
                  'mt-1 block h-0.5 w-5 bg-current transition-all duration-300',
                  isOpen ? '-translate-y-1.5 -rotate-45' : ''
                )}
              />
            </div>
          </Button>
        </div>
      </div>

      {/* Enhanced Mobile menu */}
      <div
        id="mobile-navigation"
        className={cn(
          'absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border bg-white p-2 shadow-lg transition-all duration-200 md:hidden dark:border-gray-700 dark:bg-gray-900',
          isOpen
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-2 scale-95 opacity-0'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-navigation-heading"
      >
        <div className="sr-only" id="mobile-navigation-heading">
          Navigation Menu
        </div>
        <div className="space-y-1">
          {NAVIGATION_ITEMS.map((item, index) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="flex min-h-[44px] w-full items-center justify-between rounded-md px-3 py-3 text-left font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span>{item.name}</span>
              <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}
