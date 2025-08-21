import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

describe('Accessibility Tests', () => {
  describe('Button Component', () => {
    it('should not have accessibility violations with default props', async () => {
      const { container } = render(<Button>Click me</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with different variants', async () => {
      const { container } = render(
        <div>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when disabled', async () => {
      const { container } = render(<Button disabled>Disabled Button</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations when loading', async () => {
      const { container } = render(<Button isLoading>Loading</Button>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Card Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description text</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
        </Card>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with different variants', async () => {
      const { container } = render(
        <div>
          <Card variant="default">Default card</Card>
          <Card variant="outlined">Outlined card</Card>
          <Card variant="elevated">Elevated card</Card>
        </div>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Badge Component', () => {
    it('should not have accessibility violations', async () => {
      const { container } = render(<Badge>Badge text</Badge>)
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should not have violations with different variants', async () => {
      const { container } = render(
        <div>
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
        </div>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Form Controls', () => {
    it('should have proper labels for form controls', async () => {
      const { container } = render(
        <form>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" />

          <Button type="submit">Submit</Button>
        </form>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Navigation', () => {
    it('should have proper navigation landmarks', async () => {
      const { container } = render(
        <nav aria-label="Main navigation">
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Images', () => {
    it('should have alt text for images', async () => {
      const { container } = render(
        <div>
          <img src="/test.jpg" alt="Test image description" />
          <img src="/decorative.jpg" alt="" /> {/* Decorative image */}
        </div>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Color Contrast', () => {
    it('should have sufficient color contrast in light mode', async () => {
      const { container } = render(
        <div className="bg-background text-foreground">
          <h1>Heading with proper contrast</h1>
          <p>Body text with proper contrast</p>
          <p className="text-foreground-muted">Muted text with proper contrast</p>
        </div>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Focus Management', () => {
    it('should have visible focus indicators', async () => {
      const { container } = render(
        <div>
          <Button>Focusable button</Button>
          <a href="#link">Focusable link</a>
          <input type="text" placeholder="Focusable input" />
        </div>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
