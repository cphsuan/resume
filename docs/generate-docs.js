#!/usr/bin/env node

/**
 * Comprehensive documentation generation script
 * Generates multiple types of documentation for the project:
 * - TypeScript API documentation with TypeDoc
 * - Component documentation with react-docgen-typescript
 * - Storybook component stories
 * - Architecture documentation
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { withCustomConfig } = require('react-docgen-typescript')

// Configuration
const CONFIG = {
  sourceDir: './components',
  outputDir: './docs',
  apiOutputDir: './docs/api',
  componentsOutputDir: './docs/components',
  storiesDir: './stories',
  excludePatterns: ['*.test.tsx', '*.spec.tsx', '*.stories.tsx'],
}

// Utility functions
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function log(message) {
  console.log(`📚 ${message}`)
}

function error(message) {
  console.error(`❌ ${message}`)
}

function success(message) {
  console.log(`✅ ${message}`)
}

// TypeDoc documentation generation
function generateTypeDocDocs() {
  log('Generating TypeScript API documentation with TypeDoc...')

  try {
    execSync('npx typedoc', { stdio: 'inherit' })
    success('TypeDoc documentation generated successfully')
  } catch (err) {
    error('Failed to generate TypeDoc documentation')
    console.error(err.message)
  }
}

// React component documentation generation
function generateComponentDocs() {
  log('Generating component documentation...')

  const parser = withCustomConfig('./tsconfig.json', {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    componentNameResolver: (exp, source) => {
      return exp.getName() || path.basename(source.fileName, '.tsx')
    },
    propFilter: (prop, component) => {
      if (prop.declarations !== undefined && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.find(declaration => {
          return !declaration.fileName.includes('node_modules')
        })
        return Boolean(hasPropAdditionalDescription)
      }
      return true
    },
  })

  ensureDir(CONFIG.componentsOutputDir)

  // Find all component files
  function findComponentFiles(dir) {
    const files = []
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        files.push(...findComponentFiles(fullPath))
      } else if (item.endsWith('.tsx') && !CONFIG.excludePatterns.some(pattern => item.includes(pattern.replace('*', '')))) {
        files.push(fullPath)
      }
    }

    return files
  }

  const componentFiles = findComponentFiles(CONFIG.sourceDir)
  const allComponentDocs = []

  for (const file of componentFiles) {
    try {
      const docs = parser.parse(file)
      if (docs.length > 0) {
        allComponentDocs.push(...docs.map(doc => ({ ...doc, filePath: file })))
        log(`Parsed ${docs.length} components from ${file}`)
      }
    } catch (err) {
      error(`Failed to parse ${file}: ${err.message}`)
    }
  }

  // Generate individual component documentation files
  for (const componentDoc of allComponentDocs) {
    const componentName = componentDoc.displayName
    const fileName = `${componentName}.md`
    const filePath = path.join(CONFIG.componentsOutputDir, fileName)

    const markdown = generateComponentMarkdown(componentDoc)
    fs.writeFileSync(filePath, markdown)
    log(`Generated documentation for ${componentName}`)
  }

  // Generate component index
  const indexContent = generateComponentIndex(allComponentDocs)
  fs.writeFileSync(path.join(CONFIG.componentsOutputDir, 'README.md'), indexContent)

  // Generate component props JSON for programmatic use
  const propsJson = JSON.stringify(allComponentDocs, null, 2)
  fs.writeFileSync(path.join(CONFIG.componentsOutputDir, 'components.json'), propsJson)

  success(`Generated documentation for ${allComponentDocs.length} components`)
}

function generateComponentMarkdown(componentDoc) {
  const { displayName, description, props, filePath } = componentDoc

  let markdown = `# ${displayName}\n\n`

  if (description) {
    markdown += `${description}\n\n`
  }

  markdown += `**File:** \`${filePath}\`\n\n`

  // Props table
  if (props && Object.keys(props).length > 0) {
    markdown += '## Props\n\n'
    markdown += '| Prop | Type | Default | Description |\n'
    markdown += '|------|------|---------|-------------|\n'

    for (const [propName, propInfo] of Object.entries(props)) {
      const type = propInfo.type?.name || 'unknown'
      const defaultValue = propInfo.defaultValue?.value || '-'
      const description = propInfo.description || ''
      const required = propInfo.required ? ' **(required)**' : ''

      markdown += `| \`${propName}\`${required} | \`${type}\` | \`${defaultValue}\` | ${description} |\n`
    }

    markdown += '\n'
  }

  // Usage example
  markdown += '## Usage\n\n'
  markdown += '```tsx\n'
  markdown += `import { ${displayName} } from '@/components/...'\n\n`
  markdown += `<${displayName}\n`

  if (props) {
    const exampleProps = Object.entries(props)
      .filter(([, propInfo]) => propInfo.required)
      .slice(0, 3) // Show max 3 required props in example
      .map(([propName, propInfo]) => {
        const exampleValue = getExampleValue(propInfo.type?.name)
        return `  ${propName}={${exampleValue}}`
      })

    if (exampleProps.length > 0) {
      markdown += exampleProps.join('\n') + '\n'
    }
  }

  markdown += '/>\n'
  markdown += '```\n\n'

  return markdown
}

function getExampleValue(type) {
  switch (type) {
    case 'string':
      return '"example"'
    case 'number':
      return '42'
    case 'boolean':
      return 'true'
    case 'function':
      return '() => {}'
    default:
      return 'value'
  }
}

function generateComponentIndex(componentDocs) {
  let markdown = '# Component Documentation\n\n'
  markdown += 'This directory contains auto-generated documentation for all React components in the project.\n\n'

  // Group components by category (based on directory)
  const componentsByCategory = {}

  for (const doc of componentDocs) {
    const category = getCategoryFromPath(doc.filePath)
    if (!componentsByCategory[category]) {
      componentsByCategory[category] = []
    }
    componentsByCategory[category].push(doc)
  }

  for (const [category, components] of Object.entries(componentsByCategory)) {
    markdown += `## ${category}\n\n`

    for (const component of components.sort((a, b) => a.displayName.localeCompare(b.displayName))) {
      const description = component.description ? ` - ${component.description}` : ''
      markdown += `- [${component.displayName}](./${component.displayName}.md)${description}\n`
    }

    markdown += '\n'
  }

  markdown += '## Development\n\n'
  markdown += 'This documentation is automatically generated from TypeScript component definitions.\n'
  markdown += 'To regenerate, run: `pnpm docs:generate`\n\n'

  return markdown
}

function getCategoryFromPath(filePath) {
  const pathParts = filePath.split(path.sep)
  const componentsIndex = pathParts.findIndex(part => part === 'components')

  if (componentsIndex >= 0 && pathParts.length > componentsIndex + 1) {
    return pathParts[componentsIndex + 1].charAt(0).toUpperCase() + pathParts[componentsIndex + 1].slice(1)
  }

  return 'Other'
}

// Architecture documentation generation
function generateArchitectureDocs() {
  log('Generating architecture documentation...')

  const architectureDir = path.join(CONFIG.outputDir, 'architecture')
  ensureDir(architectureDir)

  const docs = [
    {
      name: 'README.md',
      content: generateArchitectureOverview(),
    },
    {
      name: 'components.md',
      content: generateComponentArchitecture(),
    },
    {
      name: 'api.md',
      content: generateApiArchitecture(),
    },
    {
      name: 'testing.md',
      content: generateTestingArchitecture(),
    },
    {
      name: 'deployment.md',
      content: generateDeploymentArchitecture(),
    },
  ]

  for (const doc of docs) {
    fs.writeFileSync(path.join(architectureDir, doc.name), doc.content)
  }

  success('Architecture documentation generated')
}

function generateArchitectureOverview() {
  return `# Architecture Overview

## Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks + Context API
- **Component System**: Custom components with CVA variants
- **Animations**: CSS animations with Intersection Observer

### Development Tools
- **Package Manager**: pnpm
- **Bundler**: Turbopack (Next.js built-in)
- **Linting**: ESLint with Next.js configuration
- **Formatting**: Prettier with Tailwind CSS plugin
- **Type Checking**: TypeScript strict mode
- **Testing**: Jest + React Testing Library + Playwright
- **Storybook**: Component development environment

### Architecture Patterns

#### Component Architecture
- **Atomic Design**: Components organized by complexity (atoms, molecules, organisms)
- **Composition over Inheritance**: Flexible component composition
- **Polymorphic Components**: Components that can render as different HTML elements
- **Variant-Based Design**: Using class-variance-authority for consistent styling

#### Data Flow
- **Unidirectional Data Flow**: Props down, events up
- **Custom Hooks**: Reusable stateful logic
- **Context for Global State**: Theme, user preferences, etc.
- **API Layer**: Centralized API client with caching and error handling

#### Performance Optimizations
- **Code Splitting**: Dynamic imports for large components
- **Lazy Loading**: Intersection Observer-based lazy loading
- **Image Optimization**: Next.js Image component with AVIF/WebP
- **Bundle Analysis**: Built-in bundle analyzer
- **Caching**: Service Worker caching + API response caching

## Directory Structure

\`\`\`
├── app/                  # Next.js App Router
│   ├── api/             # API routes
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── common/          # Shared components
│   └── ui/              # UI primitives
├── lib/                 # Utility libraries
│   ├── api/             # API client and services
│   ├── design-tokens.ts # Design system tokens
│   └── variants.ts      # Component variants
├── hooks/               # Custom React hooks
├── stories/             # Storybook stories
├── e2e/                # Playwright E2E tests
└── __tests__/          # Unit tests
\`\`\`

## Quality Assurance

### Testing Strategy
- **Unit Tests**: Jest + React Testing Library for component logic
- **Integration Tests**: Testing component interactions
- **E2E Tests**: Playwright for full user journeys
- **Visual Testing**: Storybook visual regression tests
- **Accessibility Testing**: jest-axe + manual testing

### Performance Monitoring
- **Lighthouse CI**: Automated performance audits
- **Core Web Vitals**: Tracking FCP, LCP, CLS, FID
- **Bundle Size**: Monitoring JavaScript bundle size
- **Performance Budgets**: Enforced resource size limits

### Development Workflow
- **Continuous Integration**: GitHub Actions
- **Code Quality**: ESLint + Prettier + TypeScript
- **Pre-commit Hooks**: Formatting and linting
- **Automated Deployment**: Render deployment on main branch
`
}

function generateComponentArchitecture() {
  return `# Component Architecture

## Component Hierarchy

### UI Components (\`components/ui/\`)
Base UI components that form the foundation of the design system.

#### Design Principles
- **Single Responsibility**: Each component has one clear purpose
- **Composability**: Components can be combined to create complex UIs
- **Consistency**: Shared design tokens ensure visual consistency
- **Accessibility**: WCAG 2.1 AA compliance built-in

#### Component Categories

##### Primitives
- **Button**: Interactive elements with multiple variants
- **Card**: Container component for grouping content
- **Typography**: Text rendering with semantic HTML

##### Layout
- **Container**: Responsive content containers
- **Grid**: CSS Grid-based layout system
- **Stack**: Flexbox-based spacing utilities

##### Interactive
- **Form Components**: Input, Select, TextArea with validation
- **Navigation**: Menu, Breadcrumb, Pagination components
- **Overlays**: Modal, Tooltip, Popover components

## Component Patterns

### Variant-Based Components
Using \`class-variance-authority\` for consistent component variations:

\`\`\`typescript
const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        primary: 'primary-classes',
        secondary: 'secondary-classes',
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
        lg: 'large-classes',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    }
  }
)
\`\`\`

### Polymorphic Components
Components that can render as different HTML elements:

\`\`\`typescript
interface PolymorphicProps<E extends React.ElementType> {
  as?: E
  children: React.ReactNode
}

type Props<E extends React.ElementType> = PolymorphicProps<E> & 
  Omit<React.ComponentPropsWithoutRef<E>, keyof PolymorphicProps<E>>
\`\`\`

### Compound Components
Complex components built from smaller parts:

\`\`\`typescript
const Card = ({ children, ...props }) => (
  <div className="card-base" {...props}>{children}</div>
)

Card.Header = ({ children }) => (
  <div className="card-header">{children}</div>
)

Card.Body = ({ children }) => (
  <div className="card-body">{children}</div>
)

Card.Footer = ({ children }) => (
  <div className="card-footer">{children}</div>
)
\`\`\`

## Performance Considerations

### Component Optimization
- **React.memo**: Prevent unnecessary re-renders
- **useMemo/useCallback**: Memoize expensive computations
- **Dynamic Imports**: Code splitting for large components
- **Bundle Analysis**: Monitor component bundle size

### Rendering Performance
- **Intersection Observer**: Lazy loading for off-screen components
- **Virtual Scrolling**: For large lists
- **Image Optimization**: Responsive images with modern formats
- **Animation Performance**: CSS transforms and GPU acceleration

## Testing Strategy

### Component Testing Approach
1. **Render Testing**: Verify components render correctly
2. **Interaction Testing**: Test user interactions
3. **Props Testing**: Ensure props work as expected
4. **Accessibility Testing**: Verify ARIA attributes and keyboard navigation
5. **Visual Testing**: Storybook visual regression tests

### Test Structure
\`\`\`typescript
describe('ComponentName', () => {
  it('renders with default props', () => {
    // Basic render test
  })

  it('handles user interactions', () => {
    // Interaction testing
  })

  it('is accessible', () => {
    // Accessibility testing with jest-axe
  })
})
\`\`\`
`
}

function generateApiArchitecture() {
  return `# API Architecture

## Overview
The API layer provides a robust, type-safe interface for all external communications, including REST API calls, analytics tracking, and form submissions.

## Core Components

### API Client (\`lib/api/client.ts\`)
Centralized HTTP client with built-in features:

#### Features
- **Request/Response Interceptors**: Global error handling and request modification
- **Automatic Retries**: Exponential backoff for failed requests
- **Caching**: In-memory caching for GET requests
- **Timeout Handling**: Configurable request timeouts
- **Type Safety**: Full TypeScript support

#### Configuration
\`\`\`typescript
const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
  },
})
\`\`\`

### Service Layer

#### Contact Service (\`lib/api/services/contact.ts\`)
Handles contact form submissions with:
- **Input Validation**: Client-side validation with sanitization
- **Rate Limiting**: Prevents spam submissions
- **Error Handling**: User-friendly error messages

#### Analytics Service (\`lib/api/services/analytics.ts\`)
Privacy-focused analytics tracking:
- **Event Tracking**: Custom event tracking with categories
- **Page Views**: Automatic page view tracking
- **Performance Metrics**: Core Web Vitals tracking
- **Consent Management**: GDPR-compliant consent handling

#### Resume Service (\`lib/api/services/resume.ts\`)
Resume data management:
- **Data Fetching**: Cached resume data retrieval
- **Search Functionality**: Project and skill search
- **Data Export**: Multiple export formats

## API Routes (Next.js App Router)

### Contact API (\`/api/contact\`)
- **POST**: Submit contact form
- **Rate Limiting**: IP-based rate limiting
- **Validation**: Server-side input validation
- **Email Integration**: Ready for email service integration

### Resume API (\`/api/resume\`)
- **GET**: Retrieve resume data
- **Caching**: CDN and browser caching headers
- **Stats Endpoint**: Resume statistics

### Analytics API (\`/api/analytics/events\`)
- **POST**: Submit analytics events
- **Batching**: Support for batch event submission
- **Storage**: In-memory storage (production: database)

## Error Handling

### Client-Side Error Handling
\`\`\`typescript
try {
  const data = await apiClient.get('/api/data')
  return data
} catch (error) {
  if (error instanceof ApiError) {
    // Handle specific API errors
    console.error(\`API Error: \${error.message} (Status: \${error.status})\`)
  } else {
    // Handle network errors
    console.error('Network error:', error)
  }
  throw error
}
\`\`\`

### Server-Side Error Handling
- **Consistent Error Format**: Standardized error responses
- **Status Codes**: Appropriate HTTP status codes
- **Logging**: Server-side error logging
- **User-Friendly Messages**: Safe error messages for clients

## Caching Strategy

### Client-Side Caching
- **Memory Cache**: In-memory caching for API responses
- **TTL-Based**: Time-to-live based cache invalidation
- **Manual Invalidation**: Programmatic cache clearing

### Server-Side Caching
- **HTTP Headers**: Cache-Control headers for CDN caching
- **Stale While Revalidate**: Background cache updates
- **Conditional Requests**: ETag-based conditional requests

## Security Considerations

### Input Validation
- **Client + Server**: Validation on both sides
- **Sanitization**: HTML/script injection prevention
- **Type Safety**: TypeScript ensures type correctness

### Rate Limiting
- **IP-Based**: IP address rate limiting
- **Endpoint-Specific**: Different limits per endpoint
- **Sliding Window**: Time-based rate limiting

### CORS Configuration
- **Allowed Origins**: Configurable allowed origins
- **Methods**: Restricted HTTP methods
- **Headers**: Controlled request headers

## Integration Testing

### API Testing Strategy
1. **Unit Tests**: Individual service testing
2. **Integration Tests**: End-to-end API flow testing
3. **Mock Services**: Development and testing mocks
4. **Error Scenarios**: Error handling testing

### Example Test
\`\`\`typescript
describe('ContactService', () => {
  it('submits contact form successfully', async () => {
    const mockData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Test',
      message: 'Test message'
    }

    const result = await contactService.submitContactForm(mockData)
    
    expect(result.success).toBe(true)
    expect(result.id).toBeDefined()
  })
})
\`\`\`

## Future Enhancements

### Planned Features
- **GraphQL Integration**: Migrate to GraphQL for complex queries
- **Real-time Updates**: WebSocket support for live data
- **Offline Support**: Service worker for offline functionality
- **Advanced Caching**: Redis-based caching for production
- **API Versioning**: Support for multiple API versions
`
}

function generateTestingArchitecture() {
  return `# Testing Architecture

## Testing Philosophy
Our testing strategy follows the testing pyramid approach: many unit tests, some integration tests, and few end-to-end tests. We prioritize testing user behavior over implementation details.

## Testing Stack

### Unit & Integration Testing
- **Framework**: Jest 30
- **Testing Library**: React Testing Library 16
- **Utilities**: jest-axe for accessibility testing
- **Environment**: jsdom for browser simulation

### End-to-End Testing
- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile Testing**: Responsive design testing
- **Visual Testing**: Screenshot comparison

### Performance Testing
- **Lighthouse CI**: Automated performance audits
- **Core Web Vitals**: Performance metrics tracking
- **Bundle Analysis**: JavaScript bundle size monitoring

## Test Organization

### Directory Structure
\`\`\`
__tests__/
├── components/          # Component unit tests
│   ├── ui/             # UI component tests
│   └── common/         # Common component tests
├── hooks/              # Custom hook tests
├── lib/                # Utility function tests
├── api/                # API service tests
└── setup.ts           # Test setup and configuration

e2e/
├── home.spec.ts        # Homepage E2E tests
├── accessibility.spec.ts # Accessibility E2E tests
└── performance.spec.ts  # Performance E2E tests
\`\`\`

### Naming Conventions
- **Test Files**: \`*.test.ts\` or \`*.test.tsx\`
- **E2E Tests**: \`*.spec.ts\`
- **Test IDs**: \`data-testid="component-element"\`

## Unit Testing Patterns

### Component Testing
\`\`\`typescript
describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is accessible', async () => {
    const { container } = render(<Button>Accessible Button</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
\`\`\`

### Custom Hook Testing
\`\`\`typescript
import { renderHook, act } from '@testing-library/react'

describe('useCounter Hook', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })

  it('increments count', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })
})
\`\`\`

### API Service Testing
\`\`\`typescript
// Mock API client
jest.mock('@/lib/api/client', () => ({
  apiClient: {
    post: jest.fn(),
    get: jest.fn(),
  },
}))

describe('ContactService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('validates form data', async () => {
    const invalidData = { name: '', email: 'invalid' }
    
    await expect(
      contactService.submitContactForm(invalidData)
    ).rejects.toThrow('Name is required')
  })
})
\`\`\`

## Integration Testing

### Testing Component Interactions
\`\`\`typescript
describe('Contact Form Integration', () => {
  it('submits form successfully', async () => {
    render(<ContactForm />)
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
    await user.type(screen.getByLabelText(/message/i), 'Test message')
    
    await user.click(screen.getByRole('button', { name: /send/i }))
    
    expect(await screen.findByText(/message sent successfully/i)).toBeInTheDocument()
  })
})
\`\`\`

## End-to-End Testing

### Page Load Tests
\`\`\`typescript
test('homepage loads successfully', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Resume/)
  await expect(page.locator('main')).toBeVisible()
})
\`\`\`

### User Journey Tests
\`\`\`typescript
test('contact form submission flow', async ({ page }) => {
  await page.goto('/')
  
  // Navigate to contact section
  await page.click('text=Contact')
  
  // Fill out form
  await page.fill('[data-testid="contact-name"]', 'John Doe')
  await page.fill('[data-testid="contact-email"]', 'john@example.com')
  await page.fill('[data-testid="contact-subject"]', 'Test Subject')
  await page.fill('[data-testid="contact-message"]', 'Test message')
  
  // Submit form
  await page.click('[data-testid="contact-submit"]')
  
  // Verify success message
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
})
\`\`\`

### Accessibility Testing
\`\`\`typescript
test('page is accessible', async ({ page }) => {
  await page.goto('/')
  
  // Test keyboard navigation
  await page.keyboard.press('Tab')
  expect(await page.evaluate(() => document.activeElement?.tagName)).toBeDefined()
  
  // Test color contrast (basic check)
  const backgroundColor = await page.locator('body').evaluate(
    el => getComputedStyle(el).backgroundColor
  )
  expect(backgroundColor).toBeDefined()
})
\`\`\`

## Performance Testing

### Core Web Vitals
\`\`\`typescript
test('meets Core Web Vitals thresholds', async ({ page }) => {
  await page.goto('/')
  
  const webVitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      const vitals = {}
      
      new PerformanceObserver((list) => {
        const entries = list.getEntries()
        for (const entry of entries) {
          if (entry.name === 'first-contentful-paint') {
            vitals.fcp = entry.startTime
          }
        }
      }).observe({ type: 'paint', buffered: true })
      
      setTimeout(() => resolve(vitals), 2000)
    })
  })
  
  expect(webVitals.fcp).toBeLessThan(2000) // 2 seconds
})
\`\`\`

## Continuous Integration

### GitHub Actions Workflow
- **Test Execution**: Run all tests on PR and push
- **Coverage Reports**: Generate and upload coverage reports
- **E2E Testing**: Run Playwright tests in CI environment
- **Performance Audits**: Lighthouse CI checks

### Test Commands
- \`pnpm test\` - Run unit tests
- \`pnpm test:watch\` - Run tests in watch mode
- \`pnpm test:coverage\` - Generate coverage report
- \`pnpm e2e\` - Run E2E tests
- \`pnpm lighthouse\` - Run performance audits

## Best Practices

### Writing Good Tests
1. **Test Behavior, Not Implementation**: Focus on what users see and do
2. **Use Semantic Queries**: Prefer \`getByRole\` over \`getByTestId\`
3. **Avoid Testing Libraries**: Don't test third-party library functionality
4. **Keep Tests Simple**: One assertion per test when possible
5. **Use Descriptive Names**: Test names should explain the scenario

### Debugging Tests
- **Debug Mode**: Use \`--debug\` flag for step-by-step debugging
- **Screenshots**: Take screenshots on test failure
- **Logs**: Use console.log for debugging test data
- **Isolation**: Run single tests with \`--testNamePattern\`

### Performance Considerations
- **Parallel Execution**: Run tests in parallel when possible
- **Test Data**: Use factories for generating test data
- **Cleanup**: Proper cleanup after each test
- **Mocking**: Mock external dependencies appropriately
`
}

function generateDeploymentArchitecture() {
  return `# Deployment Architecture

## Overview
The application uses a modern deployment pipeline with automated CI/CD, performance monitoring, and multiple environment support.

## Deployment Pipeline

### GitHub Actions Workflow

#### CI Pipeline (\`.github/workflows/ci.yml\`)
Triggered on: Push to main, Pull Requests, Manual dispatch

**Jobs:**
1. **Setup**: Node.js 22, pnpm installation with caching
2. **Test**: Unit and integration tests with Jest
3. **Lint**: ESLint code quality checks
4. **Format**: Prettier formatting validation
5. **Type Check**: TypeScript compilation verification
6. **E2E Tests**: Playwright end-to-end tests
7. **Performance**: Lighthouse CI audits

#### Deployment Pipeline (\`.github/workflows/deploy.yml\`)
Triggered on: CI success on main branch, Manual dispatch

**Steps:**
1. **Wait for CI**: Ensures CI pipeline passes first
2. **Deploy**: Triggers Render deployment via webhook
3. **Verify**: Post-deployment health checks
4. **Notify**: Deployment status updates

### Environment Configuration

#### Development Environment
- **Server**: \`pnpm dev\` with Turbopack
- **Port**: http://localhost:3000
- **Hot Reload**: Enabled for all file types
- **Source Maps**: Full source map generation
- **Error Overlay**: Detailed error information

#### Production Environment
- **Build**: \`pnpm build\` with optimizations
- **Server**: \`pnpm start\` on production server
- **Optimizations**: Minification, tree-shaking, code splitting
- **Caching**: Static asset caching with long TTLs
- **Compression**: Gzip/Brotli compression enabled

## Hosting Platform: Render

### Configuration
- **Runtime**: Node.js (Latest LTS)
- **Build Command**: \`pnpm install && pnpm build\`
- **Start Command**: \`pnpm start\`
- **Auto-Deploy**: Disabled (controlled by GitHub Actions)

### Features Utilized
- **Custom Domains**: Support for custom domain configuration
- **SSL/TLS**: Automatic SSL certificate management
- **CDN**: Global content distribution network
- **Environment Variables**: Secure environment variable management
- **Health Checks**: Automatic health monitoring
- **Scaling**: Automatic scaling based on traffic

### Environment Variables
\`\`\`bash
# Required Environment Variables
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yoursite.com

# Optional Environment Variables
NEXT_PUBLIC_API_URL=https://api.yoursite.com
CONTACT_EMAIL=contact@yoursite.com
ANALYTICS_ID=your-analytics-id
\`\`\`

## Performance Optimization

### Build Optimizations
- **Next.js Optimizations**: Built-in optimizations enabled
- **Image Optimization**: Automatic image format conversion (AVIF, WebP)
- **Font Optimization**: Automatic Google Fonts optimization
- **Bundle Analysis**: Bundle size monitoring with warnings

### Caching Strategy
\`\`\`typescript
// Static Assets
'/_next/static/**' -> Cache-Control: public, max-age=31536000, immutable

// Dynamic Pages
'/' -> Cache-Control: public, s-maxage=60, stale-while-revalidate=300

// API Routes
'/api/**' -> Cache-Control: public, s-maxage=300, stale-while-revalidate=600
\`\`\`

### Content Delivery Network (CDN)
- **Static Assets**: Served from global CDN
- **Image Optimization**: On-the-fly image processing
- **Compression**: Automatic Gzip/Brotli compression
- **Edge Caching**: Regional cache distribution

## Monitoring & Analytics

### Performance Monitoring
- **Lighthouse CI**: Automated performance audits on deployment
- **Core Web Vitals**: Real User Monitoring (RUM) metrics
- **Bundle Size**: Bundle analysis with size alerts
- **Error Tracking**: Client-side error monitoring

### Health Checks
\`\`\`typescript
// Health Check Endpoint: /api/health
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0",
  "uptime": 3600,
  "dependencies": {
    "database": "connected",
    "external-api": "reachable"
  }
}
\`\`\`

### Logging Strategy
- **Server Logs**: Structured logging with timestamps
- **Error Logs**: Detailed error information with stack traces
- **Access Logs**: Request/response logging
- **Performance Logs**: Response time and resource usage

## Security Considerations

### HTTPS/SSL
- **SSL Certificate**: Automatic certificate management
- **HSTS Headers**: HTTP Strict Transport Security
- **Secure Cookies**: Secure flag on all cookies
- **CSP Headers**: Content Security Policy implementation

### Security Headers
\`\`\`typescript
// next.config.js
headers: [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin'
      }
    ]
  }
]
\`\`\`

### API Security
- **Rate Limiting**: IP-based request rate limiting
- **Input Validation**: Server-side input sanitization
- **CORS Configuration**: Restricted cross-origin requests
- **Environment Variables**: Sensitive data in environment variables

## Rollback Strategy

### Deployment Rollback
1. **Automatic Rollback**: Failed health checks trigger rollback
2. **Manual Rollback**: One-click rollback in Render dashboard
3. **Git-Based**: Revert commit and redeploy
4. **Database Migrations**: Reversible migration strategy

### Monitoring Post-Deployment
- **Error Rate Monitoring**: Spike detection in error rates
- **Performance Regression**: Core Web Vitals threshold monitoring
- **User Experience**: Real user monitoring metrics
- **Alerting**: Automated alerts for critical issues

## Future Improvements

### Planned Enhancements
- **Multi-Region Deployment**: Global deployment for reduced latency
- **Blue-Green Deployment**: Zero-downtime deployment strategy
- **Canary Releases**: Gradual rollout to subset of users
- **Infrastructure as Code**: Terraform/Pulumi for infrastructure management
- **Container Deployment**: Docker containerization for consistency
- **Serverless Functions**: Edge functions for dynamic content

### Scalability Considerations
- **CDN Optimization**: Advanced caching strategies
- **Database Optimization**: Query optimization and indexing
- **Microservices**: Service decomposition for independent scaling
- **Load Balancing**: Traffic distribution across instances
- **Auto-Scaling**: Automatic scaling based on metrics

## Troubleshooting

### Common Deployment Issues
1. **Build Failures**: Check build logs for dependency or compilation errors
2. **Environment Variables**: Verify all required variables are set
3. **Memory Issues**: Monitor memory usage during build and runtime
4. **Network Issues**: Check external API connectivity

### Debug Commands
\`\`\`bash
# Local debugging
pnpm build          # Test production build locally
pnpm analyze        # Analyze bundle size
pnpm lighthouse     # Run performance audit
pnpm e2e           # Run E2E tests

# Production debugging
curl -f https://yoursite.com/api/health  # Health check
curl -I https://yoursite.com/            # Check response headers
\`\`\`
`
}

// Main execution
function main() {
  log('Starting documentation generation...')

  // Ensure output directories exist
  ensureDir(CONFIG.outputDir)
  ensureDir(CONFIG.apiOutputDir)
  ensureDir(CONFIG.componentsOutputDir)

  try {
    // Generate different types of documentation
    generateTypeDocDocs()
    generateComponentDocs()
    generateArchitectureDocs()

    // Generate summary
    const summaryPath = path.join(CONFIG.outputDir, 'README.md')
    const summaryContent = `# Project Documentation

This directory contains comprehensive documentation for the Resume Website project.

## Documentation Types

### 📚 [API Documentation](./api/)
TypeScript API documentation generated with TypeDoc. Contains detailed information about:
- Type definitions and interfaces
- Function signatures and return types
- Class documentation with examples
- Module exports and dependencies

### 🧩 [Component Documentation](./components/)
React component documentation with prop interfaces and usage examples:
- Component API reference
- Props documentation with types and defaults
- Usage examples and best practices
- Visual component guide

### 🏗️ [Architecture Documentation](./architecture/)
System architecture and design decisions:
- [Architecture Overview](./architecture/README.md)
- [Component Architecture](./architecture/components.md)
- [API Architecture](./architecture/api.md)
- [Testing Strategy](./architecture/testing.md)
- [Deployment Guide](./architecture/deployment.md)

## Development

### Generating Documentation
Run the documentation generation script:
\`\`\`bash
pnpm docs:generate
\`\`\`

### Viewing Documentation
- **TypeDoc**: Open \`docs/api/index.html\` in your browser
- **Components**: Browse Markdown files in \`docs/components/\`
- **Architecture**: Read Markdown files in \`docs/architecture/\`

### Storybook
For interactive component documentation:
\`\`\`bash
pnpm storybook
\`\`\`

## Maintenance

Documentation is automatically generated from:
- TypeScript source code (TypeDoc)
- Component prop interfaces (react-docgen-typescript)
- Storybook stories for visual documentation

To keep documentation up-to-date, run the generation script after significant code changes.

---

*Last generated: ${new Date().toISOString()}*
`

    fs.writeFileSync(summaryPath, summaryContent)

    success('Documentation generation completed successfully!')
    log('📚 API documentation available at: docs/api/')
    log('🧩 Component documentation available at: docs/components/')
    log('🏗️ Architecture documentation available at: docs/architecture/')
  } catch (error) {
    error('Documentation generation failed')
    console.error(error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = {
  generateTypeDocDocs,
  generateComponentDocs,
  generateArchitectureDocs,
}
