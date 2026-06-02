# Astro Skill

Astro 6 implementation patterns, component templates, integration recommendations, and v6-specific features. Contains a searchable knowledge base (CSV), Python search CLI, and reusable `.astro` template files.

## Prerequisites

Python 3 is required for the search CLI. Check if installed:

```bash
python3 --version || python --version
```

## When to Use

This skill must be used when:
- Creating new `.astro` components or pages
- Choosing Astro integrations (Tailwind, MDX, React, adapters, sitemap, RSS)
- Migrating from Astro v5 to v6 (breaking changes, new APIs)
- Implementing Server Islands, ClientRouter, Content Layer API, or Fonts API
- Deciding between static, SSR, or hybrid rendering modes
- Researching Astro component patterns (layout, navigation, cards, forms, SEO)
- Cross-referencing with ui-ux-pro-max Astro guidelines

## How to Use

### Step 1: Search for component patterns

```bash
python3 .claude/skills/astro/scripts/search.py "<keywords>" --domain components
```

**Examples:**
```bash
python3 .claude/skills/astro/scripts/search.py "hero layout" --domain components
python3 .claude/skills/astro/scripts/search.py "pricing card" --domain components
python3 .claude/skills/astro/scripts/search.py "seo head" --domain components
```

### Step 2: Find integration recommendations

```bash
python3 .claude/skills/astro/scripts/search.py "<keywords>" --domain integrations
```

**Examples:**
```bash
python3 .claude/skills/astro/scripts/search.py "tailwind" --domain integrations
python3 .claude/skills/astro/scripts/search.py "cloudflare adapter" --domain integrations
```

### Step 3: Check v6 features and migration

```bash
python3 .claude/skills/astro/scripts/search.py "<keywords>" --domain v6
```

**Examples:**
```bash
python3 .claude/skills/astro/scripts/search.py "server islands" --domain v6
python3 .claude/skills/astro/scripts/search.py "migration breaking" --domain v6
```

### Step 4: Cross-reference ui-ux-pro-max guidelines

```bash
python3 .claude/skills/astro/scripts/search.py "<keywords>" --stack astro
```

### Step 5: Use templates as reference

Templates are canonical `.astro` files in `templates/` derived from official Astro docs. Copy and adapt them:
- `templates/SEOHead.astro` — reusable SEO component
- `templates/BaseLayout.astro` — layout shell with SEO, fonts, design tokens
- `templates/Navigation.astro` — header with active link detection, zero-JS mobile menu
- `templates/ContentCard.astro` — content card with tags, image, date, semantic HTML
- `templates/ServerIsland.astro` — server:defer pattern with fallback slot

## Search Reference

| Domain | Use For | Example Keywords |
|--------|---------|------------------|
| `components` | Component patterns and best practices | layout, hero, card, form, navigation, seo, footer |
| `integrations` | Package recommendations and setup | tailwind, mdx, react, vercel, cloudflare, sitemap, partytown |
| `v6` | Astro 6 features, migration, breaking changes | server islands, client router, content layer, zod 4, migration |

## Available Templates

| Template | When to Use |
|----------|-------------|
| `templates/SEOHead.astro` | Every project — reusable SEO meta tags |
| `templates/BaseLayout.astro` | Starting a new project or refactoring layouts |
| `templates/Navigation.astro` | Building a header with active links and mobile menu |
| `templates/ContentCard.astro` | Blog posts, case studies, product cards |
| `templates/ServerIsland.astro` | Dynamic sections in static pages (pricing, inventory, live data) |

## Quick Reference

- **Zero JS by default** — only add `client:load` to interactive components
- **Fetch in frontmatter** — use top-level `await` in `---` section for build-time data
- **Scoped styles** — `<style>` blocks in `.astro` files are automatically scoped
- **Content Layer API** — use `defineCollection()` with loaders, not legacy `type: 'content'`
- **Hybrid rendering** — default static, opt into SSR per page with `export const prerender = false`
- **ClientRouter** — replaces ViewTransitions in v6; enable for SPA-like navigation
- **Server Islands** — use `server:defer` + fallback slot for dynamic sections in static pages
- **Image optimization** — use `<Image />` from `astro:assets`, not bare `<img>` tags
- **Astro.props** — typed props interface in component frontmatter
- **Astro.url** — current URL for canonical links, active nav detection, OG tags
