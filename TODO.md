# Tp3studio — Plan de Acción

> Diagnóstico CEO y plan de crecimiento para llevar el proyecto al siguiente nivel.

---

## FASE 1 — Fundación 🔧 (prioridad máxima)

- [x] **Sitemap XML** — generado con @astrojs/sitemap (14 rutas)
- [x] **robots.txt** — en /public apuntando al sitemap
- [x] **Canonical tags** — en todas las páginas via BaseLayout
- [x] **Schema.org LocalBusiness** — markup estructurado en homepage con precios
- [x] **OG image local** — descargada y convertida a JPEG 1200x630, ya no depende de Google Storage
- [x] **README.md completo** — reemplazado con descripción real del proyecto
- [ ] **Analytics** — instalar Plausible o Umami (self-hosted ligero) o Google Analytics
- [x] **Formulario de auditoría funcional** — endpoint /api/lead funcionando. Para persistencia local: `node scripts/lead-saver.mjs`
- [x] **Página 404 personalizada** — con diseño tp3studio y enlace a inicio/precios

## FASE 2 — Conversión 🚀 (próximas 2 semanas)

- [ ] **Funnel de pricing real** — los CTAs de /precios deben llevar a un formulario de lead o checkout, no a /auth decorativo
- [ ] **Landing page: /web-profesional** — página dedicada para el servicio de páginas web
- [ ] **Landing page: /chatbot-ia** — página dedicada para el agente virtual
- [ ] **Landing page: /agente-virtual-whatsapp** — página dedicada para el plan completo
- [ ] **Imágenes reales en portfolio** — screenshots de los sitios en lugar de iframes
- [ ] **Testimonios con datos reales** — foto, nombre, negocio y resultado numérico (+X% ventas)
- [ ] **CRO setup** — instalar Microsoft Clarity (gratis) para heatmaps y grabaciones
- [ ] **Formulario de /audit conectado a backend** — leads reales almacenados

## FASE 3 — Contenido 📝 (en marcha)

- [ ] **Artículo: cómo crear página web para negocio pequeño**
- [ ] **Artículo: cuánto cuesta un chatbot para WhatsApp**
- [ ] **Artículo: página web vs redes sociales para vender**
- [ ] **Artículo: mejores plataformas para web de negocio en Colombia**
- [ ] **Artículo: cómo funciona un agente IA para atención al cliente**
- [ ] **Artículo: guía para elegir entre Wix, WordPress y Tp3studio**
- [ ] **Artículo: qué es SEO local y por qué lo necesita tu negocio**
- [ ] **Artículo: mitos sobre páginas web para pequeños negocios**
- [ ] **Artículo: cómo convertir visitas en clientes con chatbot**
- [ ] **Artículo: caso de estudio — restaurante que triplicó reservas**
- [ ] **Lead magnet** — guía descargable "Cómo elegir web para tu negocio"
- [ ] **Página de comparación** — Tp3studio vs Wix / WordPress / agencia tradicional

## FASE 4 — Crecimiento 📈

- [ ] **Schema FAQ** en homepage (preguntas frecuentes como datos estructurados)
- [ ] **Breadcrumbs** estructurados en todas las páginas
- [ ] **Test A/B** en CTAs principales (texto, color, posición)
- [ ] **Auditoría Lighthouse** — medir performance, accesibilidad, best practices
- [ ] **PageSpeed Insights** — apuntar a 95+ en mobile y desktop
- [ ] **i18n** — preparar estructura para otros países fuera de LatAm (opcional)
- [ ] **CLAUDE.md/AGENTS.md actualizado** — reflejar estado real del proyecto
- [ ] **Script de deploy automático** — CI/CD para build + deploy a Cloudflare

---

## Estados

- `[ ]` Pendiente
- `[/]` En progreso
- `[x]` Completado

Última actualización: 2026-06-05
