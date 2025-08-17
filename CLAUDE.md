# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 resume website built with TypeScript, React 19, and Tailwind CSS v4. The project was bootstrapped with `create-next-app` and uses the App Router architecture.

## Development Commands

- `pnpm dev` - Start development server with Turbopack (available at http://localhost:3000)
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality
- `pnpm test` - Run Jest tests
- `pnpm test:watch` - Run Jest tests in watch mode
- `pnpm test:coverage` - Run Jest tests with coverage report
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check if code is formatted correctly

## Architecture

### App Router Structure

- Uses Next.js App Router with the `app/` directory structure
- `app/layout.tsx` - Root layout with Geist fonts and global CSS
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles with Tailwind CSS v4 and CSS custom properties

### Styling

- Tailwind CSS v4 with `@import "tailwindcss"` syntax
- Custom CSS properties for theming (light/dark mode support)
- Geist Sans and Geist Mono fonts loaded from Google Fonts

### TypeScript Configuration

- Path aliases configured with `@/*` pointing to root directory
- Strict TypeScript settings enabled
- Next.js plugin integration for enhanced TypeScript support

### Testing

- Jest 30 configured for Next.js with TypeScript support
- React Testing Library for component testing
- Test files located in `__tests__/` directory
- Jest setup file: `jest.setup.ts` with `@testing-library/jest-dom`
- Configuration: `jest.config.ts` with Next.js integration

### Code Formatting

- Prettier 3.6 configured with ESLint integration
- Tailwind CSS class sorting via `prettier-plugin-tailwindcss`
- Import sorting via `@trivago/prettier-plugin-sort-imports`
- Configuration: `.prettierrc` with 130 character line width
- Import order: React → Next.js → internal (@/) → relative imports

### Key Dependencies

- Next.js 15.4.6 with App Router
- React 19.1.0
- Tailwind CSS v4
- TypeScript 5
- ESLint with Next.js configuration
- Jest 30 with React Testing Library
- Prettier 3.6 with Tailwind CSS and import sorting plugins

## CI/CD

### GitHub Actions

- **Workflow**: `.github/workflows/ci.yml`
- **Triggers**: Push/PR to main branch, manual dispatch
- **Node.js**: Version 22
- **Package Manager**: pnpm with caching
- **Jobs**:
  - **Test**: Runs `pnpm test` (Jest tests must pass)
  - **Format Check**: Runs `pnpm format:check` (Prettier formatting must be correct)
  - **Lint**: Runs `pnpm lint` (ESLint rules must pass)

## Development Notes

- The project uses pnpm as the package manager
- The project uses Turbopack for faster development builds
- ESLint is configured with Next.js core web vitals, TypeScript, and Prettier rules
- Jest is configured with TypeScript support and Next.js integration
- Prettier formats code automatically with Tailwind CSS class sorting and import organization
- Static assets are served from the `public/` directory
- All commits to main branch are validated by CI pipeline

## Git Commit Rules

When committing changes, always follow these rules:

- Use Commitizen-style commit messages with format: `type: description`
- Include detailed bullet points explaining all changes
- **NEVER** include "Generated with Claude Code" or similar attribution
- Commit messages should be clean and professional
- Example format:

  ```
  feat: add new feature

  - Add specific functionality A
  - Update configuration B
  - Fix issue C
  ```
