# Tp3studio

**Páginas web profesionales con chatbot de WhatsApp — en 48 horas, desde $100 USD.**

Sitio corporativo de Tp3studio, un estudio de diseño web y agentes de IA para pequeños negocios en Colombia, México y República Dominicana. Desarrollado con **Astro 6**, desplegado en **Cloudflare** y optimizado para rendimiento máximo (zero JS en runtime).

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| **Framework** | Astro 6 (v6.4+, output estático) |
| **Hosting** | Cloudflare (via @astrojs/cloudflare) |
| **Estilos** | CSS vanilla con custom properties |
| **Fuentes** | Outfit (headings) + Nunito (body) |
| **SEO** | Sitemap automático, canonical tags, Schema.org, Open Graph |
| **RSS** | Feed RSS del blog |
| **JS runtime** | Cero — 100% HTML/CSS estático |

---

## Estructura del proyecto

```
/
├── public/                  # Archivos estáticos servidos en /
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── og-image.jpg         # OG image para redes sociales
│   └── robots.txt
├── src/
│   ├── components/          # Componentes reutilizables .astro
│   │   ├── Header.astro     # Nav sticky con menú mobile (zero JS)
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
│   ├── content/             # Content collections (blog + portfolio)
│   │   ├── blog/
│   │   └── portfolio/
│   ├── layouts/
│   │   └── BaseLayout.astro # Layout principal con SEO, OG, canonical
│   ├── pages/
│   │   ├── index.astro      # Homepage (hero, pricing, faq, etc.)
│   │   ├── precios.astro
│   │   ├── about.astro
│   │   ├── portfolio.astro  # Grid de casos de éxito
│   │   ├── portfolio/[slug].astro
│   │   ├── audit.astro      # Formulario de auditoría gratuita
│   │   ├── auth.astro       # Login (placeholder)
│   │   ├── preview.astro    # Preview visual de web
│   │   ├── blog/index.astro
│   │   ├── blog/[slug].astro
│   │   ├── 404.astro        # Página de error personalizada
│   │   └── rss.xml.ts       # RSS feed
│   └── styles/
│       └── global.css       # Variables CSS, reset, utilidades
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── wrangler.jsonc           # Configuración Cloudflare
└── TODO.md                  # Plan de acción (siguiente nivel)
```

---

## Comandos

```bash
npm run dev          # Dev server en localhost:4321
npm run build        # Build producción en dist/
npm run preview      # Preview del build local
npm run deploy       # Build + deploy a Cloudflare
npm run astro        # CLI de Astro (check, add, etc.)
```

---

## Planes y precios

| Plan | Precio | Incluye |
|---|---|---|
| **Esencial** | $100 USD | Web responsive, SEO, hosting 1 año |
| **Popular** | $150 USD | Todo lo anterior + agente virtual IA + dominio |
| **Completo** | $200 USD | Todo + WhatsApp Business + Calendly + revisiones ilimitadas |

Pago único. Sin mensualidades.

---

## Páginas del sitio

- `/` — Hero, Comparación, Cómo funciona, Precios, Testimonios, FAQ, CTA
- `/precios` — Planes detallados
- `/portfolio` — Casos de éxito (4 clientes reales)
- `/about` — Historia del proyecto
- `/preview` — Demo visual de lo que recibe el cliente
- `/audit` — Formulario de auditoría gratuita
- `/blog` — Blog de contenido
- `/auth` — Login de clientes

---

## Desarrollado por

[Tp3studio](https://tp3studio.com) — Potenciando negocios con soluciones de IA.
