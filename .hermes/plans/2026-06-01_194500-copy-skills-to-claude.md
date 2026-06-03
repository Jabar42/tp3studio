# Plan: Agregar skills de copywriting a `.claude/skills/`

## Goal
Copiar los 13 skills de marketing/copy instalados en el perfil Hermes tp3studio (`~/.hermes/skills/marketing/`) al directorio `.claude/skills/` del proyecto Tp3studio, para que Claude Code pueda usarlos directamente cuando trabaje en el repo.

## Current context
- Los skills de copywriting ya existen en `~/.hermes/profiles/tp3studio/skills/marketing/` (13 skills: copywriting, copy-editing, cro, marketing-psychology, pricing, content-strategy, seo-audit, ai-seo, emails, competitor-profiling, page-cro, pricing-strategy, competitor-alternatives)
- El proyecto tiene su propio `.claude/skills/` con un skill de `astro/` (SKILL.md + data/ + scripts/ + templates/)
- Los skills de copy necesitan ser copiados **preservando la estructura SKILL.md** que Claude Code entiende (subdirectorio por skill con SKILL.md dentro)

## Proposed approach
Copiar carpeta por carpeta desde `~/.hermes/profiles/tp3studio/skills/marketing/` a `/home/jota/Documents/tp3studio/.claude/skills/copy/`, manteniendo cada skill en su propio subdirectorio con su SKILL.md.

## Step-by-step plan

1. Crear directorio destino `/home/jota/Documents/tp3studio/.claude/skills/copy/`
2. Copiar los 4 skills principales que son directamente relevantes para Claude Code trabajando en copy:
   - `copywriting/` — framework de copy persuasivo
   - `copy-editing/` — revisión línea por línea
   - `cro/` — optimización de conversión
   - `marketing-psychology/` — principios de psicología
3. Copiar skills complementarios:
   - `seo-audit/` — auditoría SEO
   - `pricing/` — psicología de precios
   - `content-strategy/` — planificación de contenido
   - `emails/` — copy para email
4. Verificar que la estructura sea correcta (cada subdirectorio tiene SKILL.md con contenido > 100 bytes)
5. Actualizar `CLAUDE.md` del proyecto para listar los nuevos skills agregados

## Files likely to change
- `/home/jota/Documents/tp3studio/.claude/skills/copy/copywriting/SKILL.md` (nuevo)
- `/home/jota/Documents/tp3studio/.claude/skills/copy/copy-editing/SKILL.md` (nuevo)
- `/home/jota/Documents/tp3studio/.claude/skills/copy/cro/SKILL.md` (nuevo)
- `/home/jota/Documents/tp3studio/.claude/skills/copy/marketing-psychology/SKILL.md` (nuevo)
- `/home/jota/Documents/tp3studio/.claude/skills/copy/seo-audit/SKILL.md` (nuevo)
- `/home/jota/Documents/tp3studio/.claude/skills/copy/pricing/SKILL.md` (nuevo)
- `/home/jota/Documents/tp3studio/.claude/skills/copy/content-strategy/SKILL.md` (nuevo)
- `/home/jota/Documents/tp3studio/.claude/skills/copy/emails/SKILL.md` (nuevo)
- `/home/jota/Documents/tp3studio/CLAUDE.md` (modificado — agregar skills al listado)

## Verification
- `ls -la .claude/skills/copy/*/SKILL.md` debe mostrar 8 archivos existentes
- Cada SKILL.md debe tener más de 1000 bytes
- `hermes -p tp3studio chat -q "listar skills disponibles"` debe reconocer los skills (esto se verifica en Hermes, no en el proyecto)

## Risks & observations
- Los skills de marketing son del repo `coreyhaines31/marketingskills` (v2.0.0) — están diseñados para Claude Code y agentes similares, por lo que deberían funcionar directamente
- El directorio `.claude/skills/` es específico de Claude Code; no afecta a Hermes Agent
- Los aliases (page-cro, pricing-strategy, competitor-alternatives) no se copian porque duplican funcionalidad de cro, pricing y competitor-profiling respectivamente
