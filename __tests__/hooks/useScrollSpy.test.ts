import { act, renderHook } from '@testing-library/react'

import { useScrollSpy } from '@/hooks/useScrollSpy'

describe('useScrollSpy Hook', () => {
  const mockElement = (id: string, absoluteTop: number) => ({
    getBoundingClientRect: () => ({
      top: absoluteTop - (window.scrollY || 0),
    }),
    id,
  })

  beforeEach(() => {
    // Reset window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    })

    // Mock document.getElementById to return elements with proper positioning
    // Elements are positioned at these absolute Y positions on the page
    jest.spyOn(document, 'getElementById').mockImplementation(id => {
      const elements: { [key: string]: any } = {
        about: mockElement('about', 200),
        experience: mockElement('experience', 600),
        skills: mockElement('skills', 1000),
        projects: mockElement('projects', 1400),
        contact: mockElement('contact', 1800),
      }
      return elements[id] || null
    })

    // Mock addEventListener and removeEventListener
    jest.spyOn(window, 'addEventListener').mockImplementation()
    jest.spyOn(window, 'removeEventListener').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('initializes with empty active section when no sections are in view', () => {
    // Set scroll position where no sections are in view yet (before any section minus offset)
    Object.defineProperty(window, 'scrollY', { value: 0 })

    const sectionIds = ['#about', '#experience', '#skills']
    const { result } = renderHook(() => useScrollSpy(sectionIds))

    expect(result.current).toBe('')
  })

  it('adds scroll event listener', () => {
    const sectionIds = ['#about', '#experience']
    renderHook(() => useScrollSpy(sectionIds))

    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true })
  })

  it('removes scroll event listener on unmount', () => {
    const sectionIds = ['#about', '#experience']
    const { unmount } = renderHook(() => useScrollSpy(sectionIds))

    unmount()

    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('updates active section based on scroll position', () => {
    const sectionIds = ['#about', '#experience', '#skills']

    // About section at absolute position 200, with default offset 100
    // scrollY = 120 → 120 + 100 = 220 >= 200 → about section is active
    Object.defineProperty(window, 'scrollY', { value: 120 })

    const { result } = renderHook(() => useScrollSpy(sectionIds))

    expect(result.current).toBe('#about')
  })

  it('handles multiple sections and selects the correct one', () => {
    const sectionIds = ['#about', '#experience', '#skills', '#projects']

    // Experience section at absolute position 600, with default offset 100
    // scrollY = 520 → 520 + 100 = 620 >= 600 → experience section is active
    // This should also satisfy about section (520 + 100 >= 200), but experience comes later in the loop
    Object.defineProperty(window, 'scrollY', { value: 520 })

    const { result } = renderHook(() => useScrollSpy(sectionIds))

    expect(result.current).toBe('#experience')
  })

  it('respects custom offset', () => {
    const sectionIds = ['#about', '#experience']
    const customOffset = 200

    // About section at absolute position 200, with custom offset 200
    // scrollY = 10 → 10 + 200 = 210 >= 200 → about section is active
    Object.defineProperty(window, 'scrollY', { value: 10 })

    const { result } = renderHook(() => useScrollSpy(sectionIds, customOffset))

    expect(result.current).toBe('#about')
  })

  it('handles sections that do not exist in DOM', () => {
    const sectionIds = ['#nonexistent', '#about']

    // About section at absolute position 200, with default offset 100
    // scrollY = 120 → 120 + 100 = 220 >= 200 → about section is active
    Object.defineProperty(window, 'scrollY', { value: 120 })

    const { result } = renderHook(() => useScrollSpy(sectionIds))

    expect(result.current).toBe('#about')
  })

  it('only updates state when active section changes', () => {
    const sectionIds = ['#about', '#experience']

    Object.defineProperty(window, 'scrollY', { value: 120 })

    const { result } = renderHook(() => useScrollSpy(sectionIds))

    const firstResult = result.current

    // Same scroll position - should not change (trigger scroll event manually)
    act(() => {
      const scrollHandler = (window.addEventListener as jest.Mock).mock.calls.find(call => call[0] === 'scroll')[1]
      scrollHandler()
    })

    expect(result.current).toBe(firstResult)
  })

  it('handles hash symbols in section IDs', () => {
    const sectionIds = ['#about', '#experience']

    // Mock getElementById to be called without hash
    const getElementByIdSpy = jest.spyOn(document, 'getElementById')

    renderHook(() => useScrollSpy(sectionIds))

    expect(getElementByIdSpy).toHaveBeenCalledWith('about')
    expect(getElementByIdSpy).toHaveBeenCalledWith('experience')
  })
})
