# CLAUDE.md — Monadeum Project Conventions

## Project Overview

Monadeum is an autonomous AI agent coliseum on the Monad blockchain. NPCs controlled by AI agents fight in turn-based combat for real stakes. Currently in early stage with a landing page.

## Package Manager

Use **Bun** exclusively. Never use npm, yarn, or pnpm.

```bash
bun install        # Install dependencies
bun dev            # Start dev server
bun run build      # Production build
bun run lint       # Run ESLint
```

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript 5 (strict mode)
- Tailwind CSS v4 (with `@theme inline` in globals.css)
- Lucide React for icons

## Project Structure

- `src/app/` — App Router pages and layouts
- `src/app/(landing)/` — Landing page route group
- `src/components/landing/` — Landing page components
- `src/lib/config/` — Configuration files (site.ts)
- `public/images/` — Static images

## Code Conventions

- Named exports for components: `export function ComponentName()`
- Function declarations, not arrow functions, for components
- Only use `"use client"` when the component needs client-side interactivity
- Path alias: `@/*` maps to `./src/*`
- Site config imported from `@/lib/config/site`

## Styling Conventions

- Dark theme only (`<html className="dark">`)
- Tailwind v4 custom colors defined in `src/app/globals.css` under `@theme inline`
- Primary purple gradient: `from-[#7C3AED] to-[#A855F7]`
- Card pattern: `rounded-[16px] border border-[#2E1065] bg-[#0B0B14] p-7`
- Glow shadows: `shadow-[0_0_28px_#7C3AED50]`
- Muted text: `text-[#6B6B80]`
- Section padding: `px-[120px] py-20`
- Prefer Tailwind theme tokens when available: `text-monad`, `bg-bg-card`, `border-border-purple`

## Fonts

- **Display**: Orbitron — `var(--font-orbitron)` / `font-display`
- **Body**: Inter — `var(--font-inter)` / `font-sans`
- **Mono**: Geist Mono — `var(--font-geist-mono)` / `font-mono`

## File Naming

- Components: kebab-case (`how-it-works.tsx`)
- Config files: kebab-case (`site.ts`)
- Directories: kebab-case

## Component Patterns

- `SectionBadge` for section labels
- `Divider` between major sections
- `Starfield` for animated background (accepts `dense` prop)

## Notes

- No testing framework configured yet
- No CI/CD pipeline yet
- ESLint with Next.js core-web-vitals + TypeScript rules
- PostCSS configured with `@tailwindcss/postcss`
- `next.config.ts` uses default configuration
