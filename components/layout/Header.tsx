'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import Navigation from './Navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 transition-all duration-300',
        isScrolled
          ? 'border-b border-gray-200/50 bg-white/90 shadow-sm backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-900/90'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center space-x-2 rounded-md px-2 py-1 text-xl font-bold text-gray-900 transition-all duration-200 hover:text-blue-600 focus:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:text-white dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              <span>Your Name</span>
              <div
                className={cn(
                  'h-2 w-2 rounded-full bg-green-500 transition-all duration-200',
                  isScrolled ? 'animate-pulse opacity-100' : 'opacity-0'
                )}
              />
            </button>
          </div>

          <Navigation />
        </div>
      </div>
    </header>
  )
}
