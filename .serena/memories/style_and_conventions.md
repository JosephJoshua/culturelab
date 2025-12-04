# Style and conventions
- TypeScript with strict mode; JSX runtime via `react-jsx`.
- Tailwind CSS v4 for layout/styling; globals defined in `src/app/globals.css`. Use CSS variables for background/foreground; prefer dark theme friendly palette per AGENTS spec.
- Fonts loaded via `next/font` (Geist sans/mono) in `layout.tsx`; antialiased body classes.
- Use Biome formatter/linter (2-space spaces). Run `npm run format` before commit.
- Path alias `@/*` maps to `src/*`.
- App Router structure; define routes via folder/file under `src/app`.
- Keep text primarily Simplified Chinese per product brief; combine bilingual headings where needed.
