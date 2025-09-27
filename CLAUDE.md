# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Conversation rule
Always respond in 日本語

## commit rule
use Conventional Commits

## Project Overview

This is a React Hook Form learning project built with Next.js 15, TypeScript, and Material-UI. The project is designed as an educational platform with step-by-step tutorials for learning React Hook Form fundamentals.

## Key Technologies

- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript
- **Material-UI (MUI) v7** for UI components
- **React Hook Form v7** for form management
- **Biome** for linting and formatting
- **Tailwind CSS v4** for styling
- **pnpm** as package manager

## Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Build for production with Turbopack
pnpm build

# Production server
pnpm start

# Lint code using Biome
pnpm lint

# Format code using Biome
pnpm format
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with MUI AppRouterCacheProvider
│   └── (public)/
│       ├── layout.tsx          # Public pages layout with navigation
│       ├── page.tsx            # Home page
│       └── base/
│           ├── page.tsx        # Base tutorial overview page
│           └── step/
│               └── 1/
│                   └── page.tsx # Step 1: register API tutorial
└── components/
    └── LinkButton.tsx          # MUI Button with Next.js Link integration
```

## Architecture Notes

- Uses Next.js App Router with route groups `(public)` for public pages
- Material-UI integration with `AppRouterCacheProvider` for SSR compatibility
- Custom `LinkButton` component combines MUI Button with Next.js Link
- Consistent Japanese language content for educational materials
- Step-by-step tutorial structure in `/base/step/` routes
- Responsive design using MUI Grid system and Tailwind utilities

## Code Conventions

- Biome for linting and formatting with custom import organization
- 2-space indentation
- React and Next.js recommended rules enabled
- Import order: React packages → npm packages → lib modules → user modules → types
- TypeScript with strict mode enabled
- Path aliases: `@/*` maps to `src/*`

## Form Learning Structure

The project follows a progressive learning approach:
1. **Step 1**: Basic `register` API usage
2. **Step 2**: Advanced validation (planned)
3. **Step 3**: Form submission and dynamic fields (planned)

Each step is a separate page under `/base/step/` with practical examples and explanations.