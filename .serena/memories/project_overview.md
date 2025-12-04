# CultureLab project overview
- Next.js 16 (App Router) with TypeScript. React 19, no additional runtime deps yet.
- Styling via Tailwind CSS v4 (uses `@import "tailwindcss"` in `globals.css`) plus custom CSS. PostCSS config loads `@tailwindcss/postcss`.
- Formatting/linting: Biome 2.2 (formatter + linter). Config at `biome.json` uses recommended rules and organizes imports.
- Source lives under `src/app` (App Router). Current files: `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`.
- TS config sets strict mode, path alias `@/*` → `src/*`, JSX runtime `react-jsx`.
- Fonts currently via `next/font` (Geist in `layout.tsx`).
- Repo currently is the default Next template; we will build CultureLab per AGENTS.md spec.