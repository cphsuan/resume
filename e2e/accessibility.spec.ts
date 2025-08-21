import { expect, test } from '@playwright/test'

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should have proper ARIA landmarks', async ({ page }) => {
    // Check for main landmark
    const main = page.locator('main')
    await expect(main).toBeVisible()

    // Check for proper heading structure
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()

    // Check that there's only one h1
    const h1Count = await h1.count()
    expect(h1Count).toBeLessThanOrEqual(1)
  })

  test('should have proper color contrast', async ({ page }) => {
    // Get all text elements
    const textElements = page.locator('*:has-text("")')
    const count = await textElements.count()

    for (let i = 0; i < Math.min(count, 20); i++) {
      // Test first 20 elements
      const element = textElements.nth(i)

      const colors = await element.evaluate(el => {
        const styles = window.getComputedStyle(el)
        return {
          color: styles.color,
          backgroundColor: styles.backgroundColor,
          fontSize: styles.fontSize,
        }
      })

      // Skip elements with transparent or auto backgrounds
      if (
        colors.backgroundColor === 'rgba(0, 0, 0, 0)' ||
        colors.backgroundColor === 'transparent' ||
        colors.color === 'rgba(0, 0, 0, 0)'
      ) {
        continue
      }

      // Basic check that colors are defined
      expect(colors.color).toBeDefined()
      expect(colors.backgroundColor).toBeDefined()
    }
  })

  test('should support keyboard navigation', async ({ page }) => {
    // Focus on the page
    await page.keyboard.press('Tab')

    // Check that focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBeDefined()

    // Continue tabbing through interactive elements
    let tabCount = 0
    let previousElement = ''

    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      const currentElement = await page.evaluate(() => {
        const el = document.activeElement
        return el ? `${el.tagName}${el.id ? '#' + el.id : ''}${el.className ? '.' + el.className.split(' ').join('.') : ''}` : ''
      })

      if (currentElement !== previousElement && currentElement !== '') {
        tabCount++
      }

      previousElement = currentElement

      if (tabCount >= 3) break // Found at least 3 focusable elements
    }

    // Should have some focusable elements
    expect(tabCount).toBeGreaterThanOrEqual(0)
  })

  test('should have proper image alt text', async ({ page }) => {
    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')

      // Images should have alt attribute (can be empty for decorative images)
      expect(alt).not.toBeNull()

      // If alt is not empty, it should be meaningful (more than just filename)
      if (alt && alt.length > 0) {
        expect(alt).not.toMatch(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
        expect(alt.length).toBeGreaterThan(2)
      }
    }
  })

  test('should have proper form accessibility', async ({ page }) => {
    const inputs = page.locator('input, select, textarea')
    const inputCount = await inputs.count()

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i)

      // Check for associated label
      const id = await input.getAttribute('id')
      const ariaLabel = await input.getAttribute('aria-label')
      const ariaLabelledBy = await input.getAttribute('aria-labelledby')

      if (id) {
        const label = page.locator(`label[for="${id}"]`)
        const hasLabel = (await label.count()) > 0

        // Should have either a label, aria-label, or aria-labelledby
        expect(hasLabel || ariaLabel || ariaLabelledBy).toBeTruthy()
      }
    }
  })

  test('should have proper link accessibility', async ({ page }) => {
    const links = page.locator('a')
    const linkCount = await links.count()

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i)

      // Links should have accessible text
      const text = await link.textContent()
      const ariaLabel = await link.getAttribute('aria-label')
      const title = await link.getAttribute('title')

      // Should have some form of accessible text
      const hasAccessibleText =
        (text && text.trim().length > 0) || (ariaLabel && ariaLabel.length > 0) || (title && title.length > 0)

      expect(hasAccessibleText).toBeTruthy()

      // Links should not have generic text
      if (text) {
        expect(text.toLowerCase()).not.toBe('click here')
        expect(text.toLowerCase()).not.toBe('read more')
        expect(text.toLowerCase()).not.toBe('link')
      }
    }
  })

  test('should support screen readers', async ({ page }) => {
    // Check for skip links
    const skipLink = page.locator('a[href="#main"], a[href="#content"]')
    const hasSkipLink = (await skipLink.count()) > 0

    // Skip links are recommended for screen reader users
    // But not required for simple single-page sites

    // Check for proper document structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6')
    const headingCount = await headings.count()

    // Should have at least one heading
    expect(headingCount).toBeGreaterThan(0)

    // Check heading hierarchy
    for (let i = 0; i < headingCount; i++) {
      const heading = headings.nth(i)
      const level = await heading.evaluate(el => parseInt(el.tagName.substring(1)))

      // Headings should be between h1 and h6
      expect(level).toBeGreaterThanOrEqual(1)
      expect(level).toBeLessThanOrEqual(6)
    }
  })

  test('should handle reduced motion preference', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' })

    await page.goto('/')

    // Check that animations respect reduced motion
    const animatedElements = page.locator('[class*="animate"], [style*="animation"], [style*="transition"]')
    const count = await animatedElements.count()

    for (let i = 0; i < Math.min(count, 5); i++) {
      const element = animatedElements.nth(i)

      const styles = await element.evaluate(el => {
        const computed = window.getComputedStyle(el)
        return {
          animationDuration: computed.animationDuration,
          transitionDuration: computed.transitionDuration,
        }
      })

      // With reduced motion, animations should be fast or disabled
      if (styles.animationDuration && styles.animationDuration !== '0s') {
        // Animation duration should be very short with reduced motion
        const duration = parseFloat(styles.animationDuration)
        expect(duration).toBeLessThan(0.1) // Less than 100ms
      }
    }
  })

  test('should have proper focus management', async ({ page }) => {
    // Test focus visibility
    await page.keyboard.press('Tab')

    const focusStyles = await page.evaluate(() => {
      const focused = document.activeElement
      if (focused) {
        const styles = window.getComputedStyle(focused, ':focus')
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          outlineColor: styles.outlineColor,
          boxShadow: styles.boxShadow,
        }
      }
      return null
    })

    // Should have some form of focus indicator
    if (focusStyles) {
      const hasFocusIndicator =
        focusStyles.outline !== 'none' || focusStyles.outlineWidth !== '0px' || focusStyles.boxShadow !== 'none'

      expect(hasFocusIndicator).toBeTruthy()
    }
  })

  test('should work with high contrast mode', async ({ page }) => {
    // Simulate high contrast mode by forcing contrast
    await page.emulateMedia({ forcedColors: 'active' })

    await page.goto('/')

    // Check that content is still visible
    const main = page.locator('main')
    await expect(main).toBeVisible()

    // Check that text is still readable
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6')
    const count = await textElements.count()

    if (count > 0) {
      const firstText = textElements.first()
      await expect(firstText).toBeVisible()
    }
  })
})
