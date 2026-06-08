# 📊 Informe Semanal Umami — Semana del 1 al 8 de junio de 2026

**Generado:** 8 de junio de 2026  
**Período analizado:** 7 días (última semana)  
**Sitios monitoreados:** Tp3studio, Varsana

---

## Resumen Ejecutivo

La actividad de la semana es baja pero esperable para sitios en etapa inicial sin campañas activas de tráfico. **Tp3studio** registró 7 páginas vistas con 2 visitantes únicos, con picos de actividad el lunes (6 pageviews vs 1 del domingo). **Varsana** apenas registró 1 visita referida desde el propio tp3studio. Ambos sitios no tenían datos en la semana anterior, lo que indica que Umami fue instalado recientemente.

---

## Tp3studio

### 📈 Métricas principales

| Métrica | Valor | vs Semana Anterior |
|---------|-------|--------------------|
| Páginas vistas | 7 | — (nuevo) |
| Visitantes únicos | 2 | — |
| Visitas | 4 | — |
| Tasa de rebote | 50% | — |
| Duración media de sesión | 2m 44s | — |
| Visitantes activos ahora | 0 | — |

### 📅 Tendencia diaria

| Día | Pageviews | Sesiones |
|-----|-----------|----------|
| Domingo 7 jun | 1 | 1 |
| Lunes 8 jun | 6 | 2 |

> **Tendencia destacada:** El lunes concentró el 85% de las visitas de la semana. Posible correlación con inicio de semana laboral o publicación reciente.

### 🔗 Fuentes de tráfico

- **Directo / Sin referrer** — 100%

> Todo el tráfico fue directo. No hay referrers externos registrados, lo cual es normal sin campañas activas ni backlinks significativos.

### 📄 Páginas visitadas

⚠️ No se pudieron obtener las URLs específicas vía API (la instancia Umami no expone el endpoint `metrics` con `type=url`). Se recomienda configurar el MCP server para acceso más granular.

---

## Varsana

### 📈 Métricas principales

| Métrica | Valor | vs Semana Anterior |
|---------|-------|--------------------|
| Páginas vistas | 1 | — (nuevo) |
| Visitantes únicos | 1 | — |
| Visitas | 1 | — |
| Tasa de rebote | 100% | — |
| Duración media de sesión | 0s | — |
| Visitantes activos ahora | 0 | — |

### 🔗 Fuentes de tráfico

| Fuente | Visitas |
|--------|---------|
| `tp3studio.iaforchange.workers.dev` | 1 |

> La única visita provino del propio sitio tp3studio, probablemente desde la página de portfolio o enlace directo.

### 📅 Tendencia diaria

| Día | Pageviews | Sesiones |
|-----|-----------|----------|
| Lunes 8 jun | 1 | 1 |

---

## 🔍 Diagnóstico y Recomendaciones

### 🟡 Observaciones

1. **Datos insuficientes para comparativa** — No hay datos de la semana anterior porque Umami se instaló muy recientemente. La próxima semana tendremos datos comparables.
2. **Rebote alto (50% Tp3studio, 100% Varsana)** — Normal en sitios sin estrategia de retención. Se recomienda revisar call-to-action y contenido interno.
3. **Sin tráfico referido** — No hay campañas activas, backlinks ni estrategia de outreach.

### ✅ Recomendaciones accionables

1. **Activar Plausible o Umami Cloud** — La instancia actual parece tener limitaciones en la API (`/metrics` endpoint devuelve 400 para tipos `url`/`page`). Considerar actualizar a una versión más reciente de Umami o migrar a Plausible.
2. **Configurar metas (events/goals)** — Definir eventos clave en Umami: clics en CTA, envíos de formulario `/api/lead`, descargas.
3. **Campaña de contenido** — Publicar 1-2 artículos de blog a la semana y monitorear el impacto en pageviews.
4. **Revisar enlaces internos** — Asegurar que el blog y portfolio tengan navegación que fomente múltiples páginas por sesión (reducir rebote).
5. **Backlinks desde Varsana** — Varsana ya envió 1 visita → considerar añadir enlace recíproco en tp3studio hacia Varsana.

---

## 📋 Plan para próxima semana

- [ ] Publicar al menos 1 artículo en el blog
- [ ] Monitorear si el tráfico directo se mantiene o aumenta
- [ ] Revisar instalación de Umami y considerar actualización
- [ ] Obtener top pages manualmente desde la UI de Umami
