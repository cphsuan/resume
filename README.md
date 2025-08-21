# Resume Website

A modern, high-performance resume website built with Next.js 15, featuring enterprise-grade architecture, comprehensive testing, and advanced performance monitoring.

## ✨ Features

### 🎨 Modern Design System
- **Tailwind CSS v4** with custom design tokens
- **Class-variance-authority (CVA)** for consistent component variants  
- **Responsive design** with mobile-first approach
- **Dark/light theme** support with system preference detection
- **Smooth animations** with CSS transitions and Intersection Observer

### 🏗️ Enterprise Architecture
- **TypeScript** for type safety throughout
- **Component-driven development** with atomic design principles
- **Custom hooks library** for reusable logic
- **Error boundaries** for graceful error handling
- **Modular API layer** with caching and retry logic

### 🧪 Comprehensive Testing
- **Jest + React Testing Library** for unit and integration tests
- **Playwright** for end-to-end testing across multiple browsers
- **Accessibility testing** with jest-axe
- **Visual testing** with Storybook
- **Performance testing** with Core Web Vitals monitoring

### 🚀 Performance Optimized
- **Lighthouse CI** with automated performance audits
- **Core Web Vitals** monitoring (FCP, LCP, CLS)
- **Bundle analysis** with size monitoring
- **Image optimization** with Next.js Image component
- **Lazy loading** for off-screen components
- **Performance budgets** with enforced limits

### 🔒 Security & Best Practices
- **Input validation** and sanitization
- **Rate limiting** for API endpoints
- **CORS configuration** for secure API access
- **CSP headers** and security middleware
- **Environment variable** management

## 🚀 Quick Start

### Prerequisites
- Node.js 22+ (LTS recommended)
- pnpm (recommended package manager)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd resume

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Development Commands

```bash
# Development
pnpm dev                 # Start dev server with Turbopack
pnpm build              # Build for production
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run ESLint
pnpm format             # Format code with Prettier
pnpm format:check       # Check formatting
pnpm type-check         # TypeScript type checking

# Testing
pnpm test               # Run unit tests
pnpm test:watch         # Run tests in watch mode
pnpm test:coverage      # Generate coverage report
pnpm e2e                # Run E2E tests
pnpm e2e:ui             # Run E2E tests with UI
pnpm e2e:headed         # Run E2E tests in headed mode

# Performance & Monitoring
pnpm lighthouse         # Run Lighthouse audit
pnpm analyze            # Analyze bundle size

# Documentation
pnpm docs:generate      # Generate all documentation
pnpm docs:api           # Generate API documentation only
pnpm docs:serve         # Serve documentation locally

# Component Development
pnpm storybook          # Start Storybook dev server
pnpm build-storybook    # Build Storybook for production
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── common/           # Shared components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── ui/               # UI primitives
├── lib/                   # Utility libraries
│   ├── api/              # API client and services
│   ├── design-tokens.ts  # Design system tokens
│   ├── variants.ts       # Component variants (CVA)
│   └── utils.ts          # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── data/                  # Static data and constants
├── __tests__/            # Unit and integration tests
├── e2e/                  # Playwright E2E tests  
├── stories/              # Storybook stories
├── docs/                 # Auto-generated documentation
└── .github/workflows/    # CI/CD workflows
```

## 🧪 Testing Strategy

### Unit & Integration Testing
- **Framework**: Jest 30 with React Testing Library
- **Coverage**: Comprehensive component and utility testing
- **Accessibility**: Automated a11y testing with jest-axe
- **Location**: `__tests__/` directory

### End-to-End Testing
- **Framework**: Playwright with multi-browser support
- **Tests**: User journeys, accessibility, performance
- **Browsers**: Chromium, Firefox, WebKit + Mobile variants
- **Location**: `e2e/` directory

### Visual Testing
- **Tool**: Storybook for component development
- **Coverage**: All UI components with multiple variants
- **Interaction**: Component behavior testing

## 📊 Performance Monitoring

### Lighthouse CI
- **Automated audits** on every deployment
- **Performance budget** enforcement
- **Accessibility** and SEO scoring
- **Core Web Vitals** threshold monitoring

### Performance Budgets
- JavaScript bundles: < 500KB
- CSS files: < 100KB  
- Images: < 200KB per image
- Total resources: < 1MB

### Metrics Tracked
- **First Contentful Paint (FCP)**: < 2s
- **Largest Contentful Paint (LCP)**: < 3s  
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3s

## 🏗️ Architecture Decisions

### Component Design
- **Atomic Design**: Organized by complexity (atoms → molecules → organisms)
- **Composition**: Flexible, composable component API
- **Variants**: Consistent styling with class-variance-authority
- **Polymorphism**: Components that can render as different elements

### State Management
- **React Hooks**: Built-in state management for local state
- **Context API**: Global state for themes and user preferences  
- **Custom Hooks**: Reusable stateful logic extraction
- **No External Libraries**: Avoiding unnecessary dependencies

### API Architecture
- **Type-Safe Client**: Full TypeScript API client with caching
- **Service Layer**: Organized by domain (contact, analytics, resume)
- **Error Handling**: Comprehensive error boundaries and logging
- **Rate Limiting**: Protection against abuse and spam

## 🚀 Deployment

### Continuous Integration
- **GitHub Actions** for automated testing and deployment
- **Multiple environments**: Development, staging, production
- **Quality gates**: All tests must pass before deployment

### Production Deployment
- **Platform**: Render (configurable for other platforms)
- **Build**: Optimized production builds with Next.js
- **Caching**: CDN caching with appropriate cache headers
- **Monitoring**: Real-time performance and error monitoring

### Environment Variables
```bash
# Required
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yoursite.com

# Optional
NEXT_PUBLIC_API_URL=https://api.yoursite.com
CONTACT_EMAIL=contact@yoursite.com
ANALYTICS_ID=your-analytics-id
```

## 📚 Documentation

### Auto-Generated Documentation
- **API Documentation**: TypeDoc for TypeScript APIs
- **Component Docs**: React component prop interfaces
- **Architecture Docs**: System design and decisions
- **Generate**: Run `pnpm docs:generate`

### Manual Documentation
- **CLAUDE.md**: Development guidelines and project context
- **Architecture**: Detailed system architecture in `docs/architecture/`

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`
3. **Write tests** for new functionality
4. **Run quality checks**: `pnpm lint && pnpm test`
5. **Commit** changes with conventional commit messages
6. **Push** to branch: `git push origin feature/amazing-feature`
7. **Create** Pull Request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js + Prettier configuration
- **Testing**: Minimum 80% code coverage
- **Commits**: Conventional commit format
- **Documentation**: Update docs for new features

## 📈 Performance Metrics

Current performance scores (Lighthouse):
- **Performance**: 95+/100
- **Accessibility**: 100/100  
- **Best Practices**: 95+/100
- **SEO**: 100/100

## 🛠️ Tech Stack

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - UI library with concurrent features
- **TypeScript 5** - Type safety and developer experience
- **Tailwind CSS v4** - Utility-first CSS framework

### Development Tools
- **Turbopack** - Fast bundler for development
- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Jest** - Unit testing framework  
- **Playwright** - End-to-end testing

### Performance & Monitoring
- **Lighthouse CI** - Performance auditing
- **Bundle Analyzer** - Bundle size analysis
- **Core Web Vitals** - User experience metrics

### Component Development
- **Storybook** - Component development environment
- **Class Variance Authority** - Component variant management
- **React Testing Library** - Component testing utilities

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the excellent framework
- **Vercel** for fonts and hosting platform  
- **Tailwind CSS** for the utility-first CSS framework
- **Open Source Community** for the amazing tools and libraries

---

Built with ❤️ using modern web technologies and best practices.