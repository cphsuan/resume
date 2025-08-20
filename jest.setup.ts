import '@testing-library/jest-dom'

// Mock browser APIs
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value:
    (global as any).jest?.fn()?.mockImplementation?.((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: (global as any).jest?.fn?.(), // Deprecated
      removeListener: (global as any).jest?.fn?.(), // Deprecated
      addEventListener: (global as any).jest?.fn?.(),
      removeEventListener: (global as any).jest?.fn?.(),
      dispatchEvent: (global as any).jest?.fn?.(),
    })) ||
    (() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    })),
})

// Mock localStorage
const localStorageMock = {
  getItem: (global as any).jest?.fn?.() || (() => null),
  setItem: (global as any).jest?.fn?.() || (() => {}),
  removeItem: (global as any).jest?.fn?.() || (() => {}),
  clear: (global as any).jest?.fn?.() || (() => {}),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock IntersectionObserver
global.IntersectionObserver =
  (global as any).jest?.fn()?.mockImplementation?.(() => ({
    observe: (global as any).jest?.fn?.(),
    unobserve: (global as any).jest?.fn?.(),
    disconnect: (global as any).jest?.fn?.(),
  })) ||
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: (global as any).jest?.fn?.() || (() => {}),
  writable: true,
})
