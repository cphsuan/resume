import { act, renderHook } from '@testing-library/react'

import { useTheme } from '@/hooks/useTheme'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock matchMedia
const mockMatchMedia = jest.fn()
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
})

describe('useTheme Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Default matchMedia mock
    mockMatchMedia.mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    // Mock document.documentElement
    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: {
          remove: jest.fn(),
          add: jest.fn(),
        },
      },
      writable: true,
    })
  })

  it('initializes with system theme by default', () => {
    localStorageMock.getItem.mockReturnValue(null)
    mockMatchMedia.mockImplementation(query => ({
      matches: false, // Light mode preferred
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('system')
    expect(result.current.resolvedTheme).toBe('light')
  })

  it('loads theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark')

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('dark')
  })

  it('sets theme and saves to localStorage', () => {
    localStorageMock.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useTheme())

    act(() => {
      result.current.setTheme('dark')
    })

    expect(result.current.theme).toBe('dark')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('resolves system theme correctly when light preferred', () => {
    mockMatchMedia.mockImplementation(query => ({
      matches: false, // Light mode preferred
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    localStorageMock.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useTheme())

    expect(result.current.resolvedTheme).toBe('light')
  })

  it('resolves system theme correctly when dark preferred', () => {
    mockMatchMedia.mockImplementation(query => ({
      matches: true, // Dark mode preferred
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    localStorageMock.getItem.mockReturnValue(null)

    const { result } = renderHook(() => useTheme())

    expect(result.current.resolvedTheme).toBe('dark')
  })

  it('applies theme classes to documentElement', () => {
    const mockClassList = {
      remove: jest.fn(),
      add: jest.fn(),
    }

    Object.defineProperty(document, 'documentElement', {
      value: {
        classList: mockClassList,
      },
      writable: true,
    })

    localStorageMock.getItem.mockReturnValue('dark')

    renderHook(() => useTheme())

    expect(mockClassList.remove).toHaveBeenCalledWith('light', 'dark')
    expect(mockClassList.add).toHaveBeenCalledWith('dark')
  })

  it('handles system theme changes', () => {
    let mediaQueryCallback: any

    const mockAddEventListener = jest.fn((event, callback) => {
      if (event === 'change') {
        mediaQueryCallback = callback
      }
    })

    mockMatchMedia.mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: mockAddEventListener,
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }))

    localStorageMock.getItem.mockReturnValue(null) // system theme

    const { result } = renderHook(() => useTheme())

    expect(result.current.resolvedTheme).toBe('light')

    // Simulate system theme change to dark
    act(() => {
      mediaQueryCallback({ matches: true })
    })

    expect(result.current.resolvedTheme).toBe('dark')
  })

  it('cleans up event listeners on unmount', () => {
    const mockRemoveEventListener = jest.fn()

    mockMatchMedia.mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: jest.fn(),
    }))

    localStorageMock.getItem.mockReturnValue(null)

    const { unmount } = renderHook(() => useTheme())

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalled()
  })
})
