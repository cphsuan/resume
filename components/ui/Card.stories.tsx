import type { Meta, StoryObj } from '@storybook/react'

import Button from './Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component with multiple variants and compound components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'glass'],
      description: 'Visual style variant of the card',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding size of the card',
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Default card
export const Default: Story = {
  args: {
    children: 'This is a default card with some content.',
    variant: 'default',
  },
}

// Outlined card
export const Outlined: Story = {
  args: {
    children: 'This is an outlined card with a border.',
    variant: 'outlined',
  },
}

// Elevated card
export const Elevated: Story = {
  args: {
    children: 'This is an elevated card with a shadow.',
    variant: 'elevated',
  },
}

// Glass card
export const Glass: Story = {
  args: {
    children: 'This is a glass morphism card with blur effect.',
    variant: 'glass',
  },
}

// Complete card with all compound components
export const CompleteCard: Story = {
  render: () => (
    <Card variant="elevated" className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card content that provides more context.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          This is the main content area of the card. You can place any content here including text, images, forms, or other
          components.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">
          Action
        </Button>
        <Button variant="ghost" size="sm" className="ml-2">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  ),
}

// Card with no padding
export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <div>
        <img src="https://via.placeholder.com/400x200" alt="Placeholder" className="w-full" />
        <div className="p-4">
          <h3 className="font-semibold">Card with image</h3>
          <p className="text-muted text-sm">No padding on card, custom padding on content.</p>
        </div>
      </div>
    ),
  },
}

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card variant="default">
        <CardHeader>
          <CardTitle as="h4">Default Card</CardTitle>
        </CardHeader>
        <CardContent>Default variant with standard background.</CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle as="h4">Outlined Card</CardTitle>
        </CardHeader>
        <CardContent>Outlined variant with border.</CardContent>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle as="h4">Elevated Card</CardTitle>
        </CardHeader>
        <CardContent>Elevated variant with shadow effect.</CardContent>
      </Card>

      <Card variant="glass">
        <CardHeader>
          <CardTitle as="h4">Glass Card</CardTitle>
        </CardHeader>
        <CardContent>Glass variant with blur effect.</CardContent>
      </Card>
    </div>
  ),
}

// Different padding sizes
export const PaddingSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card padding="none" variant="outlined">
        <div className="p-2">No padding (custom padding applied)</div>
      </Card>
      <Card padding="sm" variant="outlined">
        Small padding
      </Card>
      <Card padding="md" variant="outlined">
        Medium padding (default)
      </Card>
      <Card padding="lg" variant="outlined">
        Large padding
      </Card>
    </div>
  ),
}

// Interactive card example
export const InteractiveCard: Story = {
  render: () => (
    <Card variant="elevated" className="w-[350px] cursor-pointer transition-transform hover:scale-105">
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Hover over this card to see the effect</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This card responds to hover interactions with a scale transformation.</p>
      </CardContent>
      <CardFooter>
        <span className="text-muted text-xs">Click to select</span>
      </CardFooter>
    </Card>
  ),
}

// Card grid layout
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map(num => (
        <Card key={num} variant="outlined">
          <CardHeader>
            <CardTitle as="h5">Card {num}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Content for card number {num}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
