# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and Hermes Agent when working with code in this repository.

## Commands

```bash
npm run dev             # Start dev server at localhost:4321
npm run build           # Build to dist/ (server + client)
npm run preview         # npm run build && wrangler dev
npm run deploy          # npm run build && wrangler deploy
npm run astro           # Run Astro CLI (check, add, etc.)
npm run generate-types  # wrangler types
```

## Arquitectura real

**Astro 6** (v6.4.2) con **@astrojs/cloudflare** en **modo server** (NO static/híbrido) — el endpoint `/api/lead` es server-side (`export const prerender = false`). El sitio se despliega como **Cloudflare Worker**.

### Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Astro 6 (v6.4.2) |
| Hosting | Cloudflare Workers (via @astrojs/cloudflare `^13.6.1`) |
| Output mode | `server` (SSR con rutas prerenderizadas estáticas) |
| Estilos | CSS vanilla con custom properties — paleta indigo/violet (#6366F1) |
| Fuentes | Outfit (headings) + Nunito (body) |
| SEO | Sitemap automático (`@astrojs/sitemap`), canonical tags, Schema.org @graph, OG image |
| RSS | `@astrojs/rss` feed del blog en `/rss.xml` |
| KV Storage | Cloudflare KV namespace `SESSION` para sesiones |
| Observability | Cloudflare Workers observability enabled |
| Dev tooling | Wrangler `^4.97.0`, Vite 7 (overrides) |

### Estructura de directorios

```
/
├── public/                      # Archivos estáticos servidos en /
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── og-image.jpg
│   └── robots.txt
├── src/
│   ├── components/              # 12 componentes .astro reutilizables
│   │   ├── Header.astro         # Nav sticky con menú mobile (zero JS runtime)
│   │   ├── Footer.astro
│   │   ├── HeroSection.astro
│   │   ├── ComparisonSection.astro
│   │   ├── HowItWorks.astro
│   │   ├── PricingCards.astro
│   │   ├── TestimonialsSection.astro
│   │   ├── FAQSection.astro
│   │   ├── CTAFinalSection.astro
│   │   ├── CTAButton.astro
│   │   ├── BlogCard.astro
│   │   └── PortfolioCard.astro
│   ├── content/                 # Content Collections
│   │   ├── config.ts            # (auto-generado por Astro en .astro/)
│   │   ├── blog/                # 5 artículos publicados
│   │   └── portfolio/           # 4 casos de éxito
│   ├── layouts/
│   │   └── BaseLayout.astro     # Layout único con SEO, OG, canonical, grain overlay
│   ├── pages/
│   │   ├── index.astro          # Hero, Comparison, HowItWorks, Pricing, Testimonials, FAQ, CTA
│   │   ├── precios.astro
│   │   ├── about.astro
│   │   ├── portfolio.astro
│   │   ├── portfolio/[slug].astro
│   │   ├── blog/index.astro
│   │   ├── blog/[slug].astro
│   │   ├── audit.astro          # Formulario de auditoría gratuita
│   │   ├── auth.astro           # Login de clientes (placeholder)
│   │   ├── preview.astro        # Preview visual del producto
│   │   ├── 404.astro            # Página 404 personalizada
│   │   ├── rss.xml.ts           # RSS feed
│   │   └── api/
│   │       └── lead.ts          # Endpoint SSR de captura de leads
│   └── styles/
│       └── global.css           # Variables CSS, reset, utilidades
├── wrangler.jsonc               # Config CF Workers (KV, observability)
├── astro.config.mjs
├── package.json
└── tsconfig.json                # Extiende astro/tsconfigs/strict
```

### Páginas del sitio (19 rutas)

- `/` — Homepage con Schema.org LocalBusiness + FAQPage (@graph)
- `/precios` — Planes Esencial $100 / Popular $150 / Completo $200 USD
- `/portfolio` — Grid de 4 casos de éxito: Varsana, Vanta, Outkast, LovelyPet
- `/portfolio/[slug]` — Detalle de cada caso
- `/about` — Historia y stats del proyecto
- `/preview` — Demo visual
- `/audit` — Formulario de auditoría gratuita → POST a `/api/lead`
- `/blog` — 5 artículos publicados
- `/blog/[slug]` — Artículo individual
- `/auth` — Login placeholder
- `/404` — Error personalizado
- `/rss.xml` — Feed RSS

### Schema.org markup

En `src/pages/index.astro` via `<script is:inline>` con `@graph`:
- **LocalBusiness** — nombre, precios, área de servicio (Colombia, México, RD), 3 planes con USD
- **FAQPage** — 6 preguntas/respuestas sobre el servicio

## Skills instaladas

En `.claude/skills/`:

### Framework
- **ui-ux-pro-max** — UI/UX design con 50+ estilos, 161 paletas, 57 fuentes, stacks
- **astro** — Astro 6 patterns, templates, integraciones. `python3 .claude/skills/astro/scripts/search.py "<query>" --domain <domain>`

### Copy & Marketing (v2.0.0 desde coreyhaines31/marketingskills)
- **copywriting** — Copy persuasivo: headlines, landing pages, CTAs, value proposition
- **copy-editing** — Revisión línea por línea: jargon, passive voice, buzzwords
- **cro** — Conversión: value prop, CTAs, trust signals, friction points, A/B tests
- **marketing-psychology** — 50+ principios: anchoring, scarcity, social proof, framing
- **pricing** — Psicología de precios, good-better-best, anchoring
- **content-strategy** — Planificación editorial, topic clusters, SEO briefs
- **seo-audit** — Auditoría SEO técnica y on-page
- **emails** — Secuencias de email multicanal
- **portfolio-copy-strategy** — Estrategia de copy para items del portfolio (audiencia LatAm, plantilla)

## MCP Servers (`.mcp.json`)

- **Supabase** — `https://mcp.supabase.com/mcp`. Database operations si se conecta.
- **Playwright** — Chromium local. Tests UI y verificación del dev server.

## Notas importantes

- El output **no es estático** — usa `mode: server`. `lead.ts` es SSR.
- El build produce `dist/client/` (assets estáticos) y `dist/server/` (worker).
- NO hay analytics instalados aún (pendiente Fase 1).
- Blog tiene 5 artículos publicados, portfolio 4 casos.
- No hay ningún TODO.md (no existe o está vacío).
