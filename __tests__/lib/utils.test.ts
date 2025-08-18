import { calculateExperience, cn, formatDate, formatDateRange, slugify, truncateText } from '@/lib/utils'

describe('Utils Functions', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      const result = cn('text-red-500', 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })

    it('handles conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class')
      expect(result).toBe('base-class conditional-class')
    })

    it('handles empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })
  })

  describe('formatDate', () => {
    it('formats date with default options', () => {
      const result = formatDate('2023-06-15')
      expect(result).toBe('June 2023')
    })

    it('formats date with custom options', () => {
      const result = formatDate('2023-06-15', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      expect(result).toBe('June 15, 2023')
    })

    it('handles invalid date gracefully', () => {
      expect(() => formatDate('invalid-date')).not.toThrow()
    })
  })

  describe('formatDateRange', () => {
    it('formats date range with end date', () => {
      const result = formatDateRange('2023-01-15', '2023-06-15')
      expect(result).toBe('Jan 2023 - Jun 2023')
    })

    it('formats date range without end date', () => {
      const result = formatDateRange('2023-01-15', null)
      expect(result).toBe('Jan 2023 - Present')
    })

    it('handles undefined end date', () => {
      const result = formatDateRange('2023-01-15', undefined)
      expect(result).toBe('Jan 2023 - Present')
    })

    it('formats same month range', () => {
      const result = formatDateRange('2023-06-01', '2023-06-15')
      expect(result).toBe('Jun 2023 - Jun 2023')
    })
  })

  describe('calculateExperience', () => {
    // Mock current date for consistent testing
    beforeAll(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2024-01-15'))
    })

    afterAll(() => {
      jest.useRealTimers()
    })

    it('calculates experience in years and months', () => {
      const result = calculateExperience('2022-01-01', '2023-03-15')
      expect(result).toBe('1y 2m')
    })

    it('calculates experience in years only', () => {
      const result = calculateExperience('2022-01-01', '2024-01-01')
      expect(result).toBe('2y')
    })

    it('calculates experience in months only', () => {
      const result = calculateExperience('2023-09-01', '2023-12-01')
      expect(result).toBe('3m')
    })

    it('calculates ongoing experience (no end date)', () => {
      const result = calculateExperience('2023-01-01')
      expect(result).toBe('1y')
    })

    it('handles very short duration', () => {
      const result = calculateExperience('2024-01-01', '2024-01-15')
      expect(result).toBe('< 1m')
    })
  })

  describe('slugify', () => {
    it('converts text to slug', () => {
      const result = slugify('Hello World!')
      expect(result).toBe('hello-world')
    })

    it('handles special characters', () => {
      const result = slugify('React & TypeScript: Advanced Patterns!')
      expect(result).toBe('react-typescript-advanced-patterns')
    })

    it('handles multiple spaces and underscores', () => {
      const result = slugify('Multiple   Spaces__And_Underscores')
      expect(result).toBe('multiple-spaces-and-underscores')
    })

    it('removes leading and trailing hyphens', () => {
      const result = slugify('---Leading and Trailing---')
      expect(result).toBe('leading-and-trailing')
    })

    it('handles empty string', () => {
      const result = slugify('')
      expect(result).toBe('')
    })
  })

  describe('truncateText', () => {
    it('truncates long text', () => {
      const text = 'This is a very long text that should be truncated'
      const result = truncateText(text, 20)
      expect(result).toBe('This is a very long...')
    })

    it('returns original text if under limit', () => {
      const text = 'Short text'
      const result = truncateText(text, 20)
      expect(result).toBe('Short text')
    })

    it('handles text at exact limit', () => {
      const text = 'Exact twenty chars!!'
      const result = truncateText(text, 20)
      expect(result).toBe('Exact twenty chars!!')
    })

    it('truncates at word boundary', () => {
      const text = 'This is a complete sentence with more words'
      const result = truncateText(text, 25)
      expect(result).toBe('This is a complete...')
    })

    it('handles empty string', () => {
      const result = truncateText('', 10)
      expect(result).toBe('')
    })
  })
})
