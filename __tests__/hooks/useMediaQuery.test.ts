import { act, renderHook } from '@testing-library/react'

import { useMediaQuery } from '@/hooks/useMediaQuery'

describe('useMediaQuery Hook', () => {
  let mockMatchMedia: jest.Mock

  beforeEach(() => {
    mockMatchMedia = jest.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })
  })

  it('returns false initially when media query does not match', () => {
    mockMatchMedia.mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    expect(result.current).toBe(false)
  })

  it('returns true initially when media query matches', () => {
    mockMatchMedia.mockImplementation(query => ({
      matches: true,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    expect(result.current).toBe(true)
  })

  it('updates when media query changes', () => {
    let mediaQueryCallback: any
    const mockAddEventListener = jest.fn((event, callback) => {
      if (event === 'change') {
        mediaQueryCallback = callback
      }
    })

    mockMatchMedia.mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: mockAddEventListener,
      removeEventListener: jest.fn(),
    }))

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    expect(result.current).toBe(false)

    // Simulate media query change
    act(() => {
      mediaQueryCallback({ matches: true })
    })

    expect(result.current).toBe(true)
  })

  it('cleans up event listeners on unmount', () => {
    const mockRemoveEventListener = jest.fn()

    mockMatchMedia.mockImplementation(query => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: mockRemoveEventListener,
    }))

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalled()
  })

  it('handles different media queries', () => {
    mockMatchMedia.mockImplementation(query => ({
      matches: query.includes('dark'),
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))

    const { result: darkResult } = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)'))
    const { result: mobileResult } = renderHook(() => useMediaQuery('(max-width: 768px)'))

    expect(darkResult.current).toBe(true)
    expect(mobileResult.current).toBe(false)
  })

  it('updates state only when matches value changes', () => {
    let mediaQueryCallback: any
    const mockAddEventListener = jest.fn((event, callback) => {
      if (event === 'change') {
        mediaQueryCallback = callback
      }
    })

    mockMatchMedia.mockImplementation(query => ({
      matches: true,
      media: query,
      addEventListener: mockAddEventListener,
      removeEventListener: jest.fn(),
    }))

    const { result, rerender } = renderHook(() => useMediaQuery('(min-width: 768px)'))

    expect(result.current).toBe(true)

    // Simulate the same matches value - should not cause re-render
    act(() => {
      mediaQueryCallback({ matches: true })
    })

    expect(result.current).toBe(true)

    // Now change to different value
    act(() => {
      mediaQueryCallback({ matches: false })
    })

    expect(result.current).toBe(false)
  })
})
