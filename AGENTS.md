# AGENTS.md

Guidance for AI agents and developers working in this repository.

## Project Overview

A modern, professional **dark-mode UI** application built with **Next.js (App Router)** and **Node.js**. The UI is data-dense and centered around **graphs and charts** (analytics dashboards, live data visualization, trend lines, distribution plots, etc.).

## Tech Stack

Use ONLY these technologies. Do not introduce any other frameworks, libraries, or runtimes without explicit approval:

- **Next.js** — App Router, Server Components by default, React 19
- **Node.js** — backend / API routes, utilities, tooling
- **TypeScript** — strict mode, used across the entire codebase
- **CSS Modules / Tailwind CSS** — for styling (whichever is established in the project; keep consistent)
- **Charting** — the project's chosen charting library (e.g. Recharts). Only use the library already in `package.json`. Do not add new chart libraries.

## Commands

| Task | Command |
| --- | --- |
| Install dependencies | `npm install` |
| Run dev server | `npm run dev` |
| Build | `npm run build` |
| Start production | `npm start` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` (if script exists; otherwise `npx tsc --noEmit`) |
| Tests | `npm run test` (if script exists) |

Always run **lint and typecheck** after making changes.

## Project Structure

Follow the established structure. If not yet set up, use this as the target:

```
src/
  app/          # Next.js App Router pages and layouts
    (routes)/   # Route groups
    layout.tsx  # Root layout (dark theme applied here)
    page.tsx
  components/   # Reusable UI components
    charts/     # Chart components (wrappers around the charting library)
    ui/         # Base UI primitives (buttons, cards, tables, etc.)
    layout/     # Sidebar, header, shells
  lib/          # Utilities, hooks, API clients, constants
  hooks/        # Custom React hooks
  types/        # Shared TypeScript types
  styles/       # Global styles, CSS variables / theme tokens
```

## Dark Mode & Design System

- The app is **dark mode by default** and exclusively dark. Do not build light-mode variants.
- Colors, spacing, and typography come from **CSS custom properties (design tokens)** defined centrally (e.g. `styles/tokens.css`). Never hardcode hex colors in components — always reference a token.
- Tokens must use a consistent naming convention, e.g. `--color-bg-surface`, `--color-text-primary`, `--color-border`, `--color-accent`, `--chart-*`.
- Charts must be styled to match the dark theme: dark background fills, readable axis/grid colors, and a cohesive palette for series colors. Use opacity for hover/highlight states.
- Respect the project's established spacing and radius scales. Match the style of existing components — when in doubt, mirror the closest existing component.
- Keep charts accessible: use `aria-label`s, meaningful tooltips, and sufficient color contrast.

## Code Conventions

- **TypeScript strict.** All props, state, and function parameters must be typed. Avoid `any`; use `unknown` + narrowing where needed.
- **Server Components by default.** Mark components with `"use client"` only when they need interactivity (event handlers, hooks, chart interactivity).
- Charts that need interactivity (tooltips, legends, hover) are Client Components; static/SSR charts stay as Server Components.
- Fetch data in Server Components / API routes. Keep client components focused on rendering and interaction.
- **Naming:**
  - Files: `kebab-case.tsx` (e.g. `revenue-chart.tsx`).
  - Components: `PascalCase`.
  - Hooks: `useCamelCase`.
  - Constants, functions, variables: `camelCase`; types/interfaces: `PascalCase`.
- **Import order:** React / framework → third-party → local (relative paths for local imports, or configured alias).
- No `console.log` in committed code. Use a logger from `src/lib` if logging is needed.
- Keep components small and composable. Extract repeated logic into hooks or utilities in `src/lib` / `src/hooks`.
- Do not add code comments unless they explain non-obvious "why" logic.

## State & Data

- Server state lives in the database / API layer. Client state is managed with React state and `useReducer` / Context as needed. Use established patterns already in the repo.
- Do not add global state libraries unless already present.

## Quality Checks

- Always run `npm run lint` and typecheck before finishing.
- Ensure builds succeed with `npm run build` for changes to routing, server components, or APIs.
- If tests exist, update/add tests for changed behavior and run the suite.
- Never commit generated files, build output, or secrets. Keep API keys out of the codebase.
