import { render, screen } from '@testing-library/react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'

describe('Card Components', () => {
  describe('Card', () => {
    it('renders with default props', () => {
      render(<Card>Card content</Card>)

      const card = screen.getByText('Card content')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('rounded-lg', 'transition-all', 'duration-200', 'bg-white', 'p-6')
    })

    it('applies different variants correctly', () => {
      const { rerender } = render(<Card variant="outlined">Outlined</Card>)
      expect(screen.getByText('Outlined')).toHaveClass('border', 'border-gray-200')

      rerender(<Card variant="elevated">Elevated</Card>)
      expect(screen.getByText('Elevated')).toHaveClass('shadow-md', 'hover:shadow-lg')
    })

    it('applies different padding correctly', () => {
      const { rerender } = render(<Card padding="none">No padding</Card>)
      expect(screen.getByText('No padding')).not.toHaveClass('p-4', 'p-6', 'p-8')

      rerender(<Card padding="sm">Small padding</Card>)
      expect(screen.getByText('Small padding')).toHaveClass('p-4')

      rerender(<Card padding="lg">Large padding</Card>)
      expect(screen.getByText('Large padding')).toHaveClass('p-8')
    })

    it('applies custom className', () => {
      render(<Card className="custom-card">Custom</Card>)

      expect(screen.getByText('Custom')).toHaveClass('custom-card')
    })
  })

  describe('CardHeader', () => {
    it('renders correctly', () => {
      render(<CardHeader>Header content</CardHeader>)

      const header = screen.getByText('Header content')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'pb-4')
    })
  })

  describe('CardTitle', () => {
    it('renders with default heading level', () => {
      render(<CardTitle>Title</CardTitle>)

      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('text-xl', 'font-semibold')
    })

    it('renders with custom heading level', () => {
      render(<CardTitle as="h2">Title</CardTitle>)

      const title = screen.getByRole('heading', { level: 2 })
      expect(title).toBeInTheDocument()
    })
  })

  describe('CardDescription', () => {
    it('renders correctly', () => {
      render(<CardDescription>Description text</CardDescription>)

      const description = screen.getByText('Description text')
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-gray-600')
    })
  })

  describe('CardContent', () => {
    it('renders correctly', () => {
      render(<CardContent>Content</CardContent>)

      const content = screen.getByText('Content')
      expect(content).toBeInTheDocument()
    })
  })

  describe('CardFooter', () => {
    it('renders correctly', () => {
      render(<CardFooter>Footer content</CardFooter>)

      const footer = screen.getByText('Footer content')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('flex', 'items-center', 'pt-4')
    })
  })

  describe('Complete Card', () => {
    it('renders all components together', () => {
      render(
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content.</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      )

      expect(screen.getByRole('heading', { name: 'Card Title' })).toBeInTheDocument()
      expect(screen.getByText('Card description')).toBeInTheDocument()
      expect(screen.getByText('This is the card content.')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
    })
  })
})
