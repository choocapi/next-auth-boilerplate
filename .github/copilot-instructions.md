# Copilot Instructions for next-auth-boilerplate

## Project Overview

This is a Next.js (App Router) boilerplate with NextAuth.js v5 (Auth.js) for authentication. It uses TypeScript, Tailwind CSS, and a modern, minimalist UI/UX approach.

## Architecture & Structure

- **App Router:** All routing is in `src/app/` using Next.js App Router conventions.
- **Authentication:** Auth flows are in `src/app/auth/` and use NextAuth.js v5. Login UI is in `src/app/auth/login/page.tsx`.
- **Feature Folders:** Storefront and dashboard features are separated in `src/app/(storefront)/` and `src/app/dashboard/`.
- **Shared Components:** Place reusable UI in `components/`.
- **Utilities:** Shared logic in `src/lib/`.
- **Global Styles:** Tailwind CSS is configured in `src/app/globals.css` and `postcss.config.mjs`.

## Developer Workflows

- **Build:** Use `npm run build` to build the project.
- **Dev Server:** Use `npm run dev` for local development.
- **Linting:** Use `npm run lint` (ESLint config in `eslint.config.mjs`).
- **Type Checking:** Use `npm run typecheck` if available.

## Patterns & Conventions

- **Client/Server Components:** Use `'use client'` for interactive components. Default to server components for data fetching and static UI.
- **Colocation:** Place styles and tests next to components when possible.
- **Naming:**
  - Components: `PascalCase`
  - Hooks/utilities: `camelCase`
  - Folders: `kebab-case`
- **Route Groups:** Use parentheses in `app/` for grouping (e.g., `(storefront)`).
- **Private Folders:** Prefix with `_` for implementation details.

## Integration Points

- **NextAuth.js:** See `src/app/auth/` for configuration and usage.
- **Tailwind CSS:** All styling uses Tailwind utility classes.
- **Static Assets:** Place images/icons in `public/`.

## Examples

- **Login Page:** `src/app/auth/login/page.tsx` shows a typical auth flow and UI pattern.
- **Dashboard:** `src/app/dashboard/` for authenticated user features.

## Tips for AI Agents

- Always use the App Router (`src/app/`), not legacy `pages/`.
- Follow Tailwind and Next.js best practices (see `.github/instructions/`).
- Reference UI/UX standards in `.github/instructions/ui-ux.instructions.md`.
- Document new patterns in README or component-level docs.

---

For questions or unclear conventions, ask the user for clarification or examples.
