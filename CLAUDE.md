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

### Key Dependencies
- Next.js 15.4.6 with App Router
- React 19.1.0
- Tailwind CSS v4
- TypeScript 5
- ESLint with Next.js configuration
- Jest 30 with React Testing Library

## Development Notes

- The project uses pnpm as the package manager
- The project uses Turbopack for faster development builds
- ESLint is configured with Next.js core web vitals and TypeScript rules
- Jest is configured with TypeScript support and Next.js integration
- Static assets are served from the `public/` directory

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