import { expect, test } from '@playwright/test'

test.describe('Performance Tests', () => {
  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Measure Core Web Vitals
    const webVitals = await page.evaluate(() => {
      return new Promise(resolve => {
        const vitals: Record<string, number> = {}

        // First Contentful Paint (FCP)
        new PerformanceObserver(list => {
          const entries = list.getEntries()
          for (const entry of entries) {
            if (entry.name === 'first-contentful-paint') {
              vitals.fcp = entry.startTime
            }
          }
        }).observe({ type: 'paint', buffered: true })

        // Largest Contentful Paint (LCP)
        new PerformanceObserver(list => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          vitals.lcp = lastEntry.startTime
        }).observe({ type: 'largest-contentful-paint', buffered: true })

        // Cumulative Layout Shift (CLS)
        new PerformanceObserver(list => {
          let clsValue = 0
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          }
          vitals.cls = clsValue
        }).observe({ type: 'layout-shift', buffered: true })

        // First Input Delay would require actual user interaction
        // So we'll skip it for now

        setTimeout(() => resolve(vitals), 2000)
      })
    })

    console.log('Web Vitals:', webVitals)

    // Assert Core Web Vitals thresholds
    // FCP should be under 1.8s (good threshold)
    expect((webVitals as any).fcp).toBeLessThan(1800)

    // LCP should be under 2.5s (good threshold)
    expect((webVitals as any).lcp).toBeLessThan(2500)

    // CLS should be under 0.1 (good threshold)
    expect((webVitals as any).cls).toBeLessThan(0.1)
  })

  test('should have efficient resource loading', async ({ page }) => {
    // Monitor network requests
    const resourceSizes: Record<string, number> = {}
    const resourceCounts: Record<string, number> = {}

    page.on('response', async response => {
      const url = response.url()
      const resourceType = response.request().resourceType()

      if (!resourceCounts[resourceType]) {
        resourceCounts[resourceType] = 0
        resourceSizes[resourceType] = 0
      }

      resourceCounts[resourceType]++

      try {
        const buffer = await response.body()
        resourceSizes[resourceType] += buffer.length
      } catch {
        // Some resources might not be accessible
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    console.log('Resource counts:', resourceCounts)
    console.log('Resource sizes (bytes):', resourceSizes)

    // Assert resource efficiency
    // Should not have too many JavaScript files (bundling efficiency)
    expect(resourceCounts.script || 0).toBeLessThan(10)

    // Should not have excessive CSS files
    expect(resourceCounts.stylesheet || 0).toBeLessThan(5)

    // Total JavaScript size should be reasonable (under 500KB)
    expect(resourceSizes.script || 0).toBeLessThan(500 * 1024)

    // Total CSS size should be reasonable (under 100KB)
    expect(resourceSizes.stylesheet || 0).toBeLessThan(100 * 1024)
  })

  test('should render above-the-fold content quickly', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')

    // Wait for first meaningful content
    await page.waitForSelector('main', { state: 'visible' })

    const renderTime = Date.now() - startTime

    // Above-the-fold content should render within 1 second
    expect(renderTime).toBeLessThan(1000)
  })

  test('should handle slow network conditions', async ({ page }) => {
    // Simulate slow 3G
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100)) // Add 100ms delay
      await route.continue()
    })

    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    const loadTime = Date.now() - startTime

    // Should still be usable within 5 seconds on slow network
    expect(loadTime).toBeLessThan(5000)

    // Content should be visible
    await expect(page.locator('main')).toBeVisible()
  })

  test('should have no memory leaks', async ({ page }) => {
    await page.goto('/')

    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0
    })

    // Simulate some interactions that might cause memory leaks
    for (let i = 0; i < 10; i++) {
      await page.reload()
      await page.waitForLoadState('domcontentloaded')
    }

    // Get final memory usage
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0
    })

    // Memory should not have grown excessively (allow for some variance)
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryGrowth = finalMemory - initialMemory
      expect(memoryGrowth).toBeLessThan(initialMemory * 2) // Should not double
    }
  })

  test('should cache static assets efficiently', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const cacheHeaders: Record<string, string> = {}

    // Check cache headers on second visit
    page.on('response', response => {
      const url = response.url()
      const cacheControl = response.headers()['cache-control']
      if (cacheControl && (url.includes('.js') || url.includes('.css') || url.includes('.woff'))) {
        cacheHeaders[url] = cacheControl
      }
    })

    await page.reload()
    await page.waitForLoadState('networkidle')

    // Static assets should have cache headers
    const staticAssets = Object.keys(cacheHeaders)
    expect(staticAssets.length).toBeGreaterThan(0)

    staticAssets.forEach(asset => {
      const cacheControl = cacheHeaders[asset]
      // Should have some form of caching
      expect(cacheControl).toMatch(/(max-age|immutable|public)/)
    })
  })
})
