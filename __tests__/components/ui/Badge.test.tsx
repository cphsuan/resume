import { render, screen } from '@testing-library/react'

import Badge from '@/components/ui/Badge'

describe('Badge Component', () => {
  it('renders badge with default props', () => {
    render(<Badge>Default Badge</Badge>)

    const badge = screen.getByText('Default Badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('inline-flex', 'items-center', 'justify-center', 'rounded-full')
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800', 'px-2.5', 'py-1.5', 'text-xs')
  })

  it('applies different variants correctly', () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>)
    expect(screen.getByText('Secondary')).toHaveClass('bg-gray-100', 'text-gray-800')

    rerender(<Badge variant="success">Success</Badge>)
    expect(screen.getByText('Success')).toHaveClass('bg-green-100', 'text-green-800')

    rerender(<Badge variant="warning">Warning</Badge>)
    expect(screen.getByText('Warning')).toHaveClass('bg-yellow-100', 'text-yellow-800')

    rerender(<Badge variant="error">Error</Badge>)
    expect(screen.getByText('Error')).toHaveClass('bg-red-100', 'text-red-800')

    rerender(<Badge variant="outline">Outline</Badge>)
    expect(screen.getByText('Outline')).toHaveClass('border', 'border-gray-300', 'bg-transparent')
  })

  it('applies different sizes correctly', () => {
    const { rerender } = render(<Badge size="sm">Small</Badge>)
    expect(screen.getByText('Small')).toHaveClass('px-2', 'py-1', 'text-xs')

    rerender(<Badge size="lg">Large</Badge>)
    expect(screen.getByText('Large')).toHaveClass('px-3', 'py-2', 'text-sm')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Custom</Badge>)

    expect(screen.getByText('Custom')).toHaveClass('custom-badge')
  })

  it('handles dark mode variants', () => {
    render(<Badge variant="default">Dark Mode</Badge>)

    const badge = screen.getByText('Dark Mode')
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800')
    expect(badge).toHaveClass('dark:bg-blue-900', 'dark:text-blue-200')
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Badge ref={ref}>Ref test</Badge>)

    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('accepts HTML attributes', () => {
    render(
      <Badge data-testid="test-badge" title="Tooltip">
        Badge
      </Badge>
    )

    const badge = screen.getByTestId('test-badge')
    expect(badge).toHaveAttribute('title', 'Tooltip')
  })
})
