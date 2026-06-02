# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev      # Start dev server at localhost:4321
npm run build    # Build to dist/
npm run preview  # Preview the production build locally
npm run astro    # Run Astro CLI (e.g., npm run astro -- check, npm run astro -- add <integration>)
```

## Architecture

This is an **Astro 6** project (v6.4+) using zero-JS static output by default. The template follows Astro's standard directory convention:

- `src/pages/` — file-based routing; each `.astro` file becomes a page
- `src/layouts/` — page shell components (HTML boilerplate, `<slot />` for content)
- `src/components/` — reusable `.astro` components
- `src/assets/` — images, SVGs, and other static assets imported by components
- `public/` — files served as-is at the root path (favicon, robots.txt, etc.)

TypeScript config extends `astro/tsconfigs/strict` and includes auto-generated `.astro/types.d.ts`.

## Skills

Installed skills in `.claude/skills/`:

- **astro** — Astro 6 implementation patterns, component templates, integration recommendations, and v6-specific features. Contains `data/` (CSV knowledge base: components, integrations, v6), `scripts/` (Python BM25 search CLI), and `templates/` (reusable `.astro` component snippets derived from official Astro docs). Use `python3 .claude/skills/astro/scripts/search.py "<query>" --domain components|integrations|v6` or `--stack astro` to cross-reference ui-ux-pro-max.
- **ui-ux-pro-max** — UI/UX design and frontend assistance skill. Contains `data/` and `scripts/` directories with 50+ styles, 161 color palettes, 57 font pairings, and 10 tech stacks including Astro via `stacks/astro.csv`.

## MCP Servers

Two MCP servers are configured in `.mcp.json`:

- **Supabase** — HTTP-based server at `https://mcp.supabase.com/mcp`. Available for database operations if the project connects to Supabase.
- **Playwright** — local browser automation using Chromium at `/home/jota/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome`. Use for UI testing and browser-based verification of the dev server.
