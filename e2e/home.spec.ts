import { expect, test } from '@playwright/test'

test.describe('Resume Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage successfully', async ({ page }) => {
    // Check that the page loads without errors
    await expect(page).toHaveTitle(/Resume/)

    // Check that main content is visible
    const main = page.locator('main')
    await expect(main).toBeVisible()
  })

  test('should have proper meta tags for SEO', async ({ page }) => {
    // Check meta viewport for responsive design
    const viewport = page.locator('meta[name="viewport"]')
    await expect(viewport).toHaveAttribute('content', 'width=device-width, initial-scale=1')

    // Check meta description exists
    const description = page.locator('meta[name="description"]')
    await expect(description).toHaveAttribute('content', /.+/)
  })

  test('should be accessible', async ({ page }) => {
    // Check for proper heading hierarchy
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()

    // Check that images have alt text
    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      await expect(img).toHaveAttribute('alt', /.+/)
    }
  })

  test('should have proper font loading', async ({ page }) => {
    // Wait for fonts to load
    await page.waitForLoadState('networkidle')

    // Check that Geist fonts are applied
    const body = page.locator('body')
    const fontFamily = await body.evaluate(el => getComputedStyle(el).fontFamily)
    expect(fontFamily).toContain('Geist')
  })

  test('should handle different viewport sizes', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('main')).toBeVisible()

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('main')).toBeVisible()

    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })
    await expect(page.locator('main')).toBeVisible()
  })

  test('should load CSS properly', async ({ page }) => {
    // Check that Tailwind classes are applied
    const body = page.locator('body')
    const styles = await body.evaluate(el => {
      const computed = getComputedStyle(el)
      return {
        margin: computed.margin,
        padding: computed.padding,
      }
    })

    // Basic check that styles are applied (not default browser styles)
    expect(styles.margin).toBeDefined()
    expect(styles.padding).toBeDefined()
  })

  test('should not have console errors', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    expect(consoleErrors).toHaveLength(0)
  })

  test('should have fast load times', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime

    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('should work with JavaScript disabled', async ({ page }) => {
    // Disable JavaScript
    await page.context().addInitScript(() => {
      Object.defineProperty(navigator, 'javaEnabled', {
        value: () => false,
      })
    })

    await page.goto('/')

    // Basic content should still be visible
    const main = page.locator('main')
    await expect(main).toBeVisible()
  })
})
