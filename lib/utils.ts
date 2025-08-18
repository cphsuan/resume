import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    ...options,
  })
}

export function formatDateRange(startDate: string, endDate: string | null | undefined): string {
  const start = formatDate(startDate, { year: 'numeric', month: 'short' })
  const end = endDate ? formatDate(endDate, { year: 'numeric', month: 'short' }) : 'Present'
  return `${start} - ${end}`
}

export function calculateExperience(startDate: string, endDate?: string | null): string {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()

  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const diffYears = Math.floor(diffDays / 365)
  const diffMonths = Math.floor((diffDays % 365) / 30)

  if (diffYears > 0) {
    if (diffMonths > 0) {
      return `${diffYears}y ${diffMonths}m`
    }
    return `${diffYears}y`
  }

  if (diffMonths > 0) {
    return `${diffMonths}m`
  }

  return '< 1m'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...'
}
