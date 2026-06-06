# Plan: Sistema de Validación de Tareas con Webhook de GitHub

## Goal

Implementar un sistema donde el agente tp3studio marque tareas como completadas con prueba (hash de commit), y un agente validador verifique automáticamente que el cambio es real y correcto, dejando su propia marca de validación.

## Current context

- El vault de planificación de tp3studio está en `/home/jota/Obsi/tp3studio/` (archivos .md locales)
- El perfil tp3studio de Hermes ya está configurado y funcional (WhatsApp + gateway)
- GitHub ya tiene webhooks configurados en el perfil tp3studio (ver `.mcp.json` con Supabase y Playwright)
- El agente tp3studio ya tiene instrucciones en AGENTS.md para usar Obsidian
- Las tareas usan formato `- [ ]` / `- [x]` con checkpoint de verificación pendiente

## Proposed approach

Mover el vault de planificación a un repo de GitHub dedicado, conectar un webhook que dispare a un perfil validador de Hermes cuando haya cambios, y establecer un protocolo claro de marcado-ejecución-validación.

### Arquitectura

```
Agente tp3studio                          Repo GitHub                    Agente Validador
    │                                      │                                  │
    ├─ Edita .md en vault local            │                                  │
    ├─ Marca [x] + hash de commit          │                                  │
    ├─ git add / commit / push ───────────►├─ Webhook POST ─────────────────►├─ Recibe evento push
    │                                      │   (commits nuevos)              ├─ Clona/ve diff
    │                                      │                                  ├─ Verifica tarea vs diff
    │                                      │                                  ├─ Edita .md agrega validación
    │◄─ Sincroniza (pull) ────────────────◄├─ Nuevo commit ─────────────────◄├─ git add / commit / push
```

## Step-by-step plan

### Fase 0: Preparación (tú, manual)
1. Crear repo `tp3studio-plan` en GitHub (público o privado)
2. Mover `/home/jota/Obsi/tp3studio/` al repo:
   ```bash
   cd /tmp
   git init tp3studio-plan
   cp -r /home/jota/Obsi/tp3studio/* tp3studio-plan/
   git add . && git commit -m "init: plan maestro y fases"
   gh repo create tp3studio-plan --private --push --source=tp3studio-plan
   ```
3. Configurar el vault de Obsidian para que apunte al repo clonado:
   ```bash
   mv /home/jota/Obsi/tp3studio /home/jota/Obsi/tp3studio_backup
   git clone git@github.com:Jabar42/tp3studio-plan.git /home/jota/Obsi/tp3studio
   ```

### Fase 1: Configurar agente tp3studio para commiteos automáticos

**Archivos a modificar:**
- `~/.hermes/profiles/tp3studio/AGENTS.md` — agregar protocolo de commit/push

**Qué debe hacer el agente tp3studio:**
1. Cuando complete una tarea de código, ejecutar `git log -1 --format="%H"` en el repo del proyecto para obtener el hash
2. Editar el .md correspondiente en Obsidián agregando:
   ```markdown
   - [x] Tarea completada — `abc1234`
   ```
3. Hacer commit y push del cambio al repo `tp3studio-plan`:
   ```bash
   cd /home/jota/Obsi/tp3studio
   git add -A
   git commit -m "feat: marca tarea X como completada - hash abc1234"
   git push
   ```

**Formato de marcado de tarea completada:**
```markdown
- [x] **Nombre de tarea** — `abc1234`
  → _Pendiente de validación_
```

### Fase 2: Crear perfil validador en Hermes

**Archivos a modificar:**
- Crear perfil: `hermes profile create validador-tp3studio`
- `~/.hermes/profiles/validador-tp3studio/config.yaml` — configurar
- `~/.hermes/profiles/validador-tp3studio/AGENTS.md` — instrucciones de validación

**Configuración del perfil validador:**
```yaml
model:
  default: deepseek-chat
  provider: deepseek
toolsets:
  - hermes-cli
terminal:
  cwd: /home/jota/Obsi/tp3studio
```

**AGENTS.md del validador:**
```markdown
# Validador TP3studio

Eres un agente de validación. Tu única función es verificar que las tareas
marcadas como completadas en el plan realmente se ejecutaron.

## Protocolo de validación

1. Recibes un webhook de GitHub con un payload de push
2. Lees los commits nuevos del payload
3. Abres el Plan Maestro (Plan Maestro.md) y buscas tareas cuyo hash
   coincida con algún commit del webhook
4. Para cada tarea encontrada:
   a. Clonas el repo del proyecto (`Jabar42/tp3studio`)
   b. Revisas el diff del commit — verifica que los archivos modificados
      corresponden a lo que promete la tarea
   c. Si es correcto → agregas marca de validación en el .md
   d. Si no es correcto → agregas comentario de qué falló
5. Haces commit y push de los cambios al repo `tp3studio-plan`

## Formato de validación exitosa

```markdown
- [x] **Nombre de tarea** — `abc1234`
  → ✅ Validado por validador — "Mensaje descriptivo de lo que se verificó" (2026-06-05)
```

## Formato de validación fallida

```markdown
- [x] **Nombre de tarea** — `abc1234`
  → ❌ Validación fallida — "Razón: los archivos modificados no corresponden a la tarea" (2026-06-05)
```
```

### Fase 3: Configurar webhook de GitHub

1. Ir a GitHub → `Jabar42/tp3studio-plan` → Settings → Webhooks → Add webhook
2. Payload URL: la URL del webhook de Hermes (la que da `hermes webhook subscribe`)
3. Content type: `application/json`
4. Secret: el auto-generado por Hermes
5. Events: "Just the push event"
6. Active: ✅

**Comando:**
```bash
hermes -p validador-tp3studio webhook subscribe tp3studio-plan \
  --events "push" \
  --prompt "Nuevo push al repo tp3studio-plan. Commits: {commits}. Verifica las tareas del plan cuyo hash coincida." \
  --skills "obsidian" \
  --deliver log
```

### Fase 4: Prueba del flujo completo

1. Tú o el agente tp3studio marcan una tarea como completada con hash
2. Pushean al repo
3. GitHub envía webhook al perfil validador
4. Validador recibe, clona, verifica, actualiza y pushea
5. Tú haces pull en Obsidian y ves la marca de validación

## Files likely to change

| File | Description |
|------|-------------|
| `~/.hermes/profiles/tp3studio/AGENTS.md` | Agregar protocolo de commit/push |
| `~/.hermes/profiles/validador-tp3studio/` | Nuevo perfil completo |
| `~/.hermes/webhook_subscriptions.json` | Registro del webhook |
| `~/.hermes/profiles/validador-tp3studio/config.yaml` | Config del validador |
| `~/.hermes/profiles/validador-tp3studio/AGENTS.md` | Instrucciones de validación |

## Tests / validation

1. **Test de commit automático**: el agente tp3studio completa una tarea, edita el .md, commitea y pushea. Verificar que el repo se actualiza.
2. **Test de webhook**: hacer un push manual al repo y verificar que el webhook llega a Hermes.
3. **Test de validación**: simular una tarea completada con hash, ejecutar el validador manualmente, verificar que agrega la marca.
4. **Test de validación fallida**: crear un commit que no corresponde a la tarea, verificar que el validador marca como fallido.

## Risks, tradeoffs, and open questions

### Riesgos
- **Token de GitHub**: el agente tp3studio necesita un PAT (personal access token) para pushear desde CLI. Habría que configurarlo.
- **Latencia**: el webhook es casi instantáneo, pero si el gateway de Hermes no está corriendo, se pierde el evento (los webhooks tienen reintentos).
- **Ciclo infinito**: validador pushea → webhook se dispara otra vez → validador se ejecuta de nuevo. Hay que asegurarse de que el validador ignore sus propios commits (ej: mirar el autor del commit).

### Tradeoffs
- Dependemos de que el agente tp3studio recuerde hacer commit/push después de cada tarea. Se puede mitigar con un hook de git o forzándolo en AGENTS.md.
- El validador consume tokens de DeepSeek en cada ejecución. Para optimizar, el webhook podría ser `--deliver-only` (solo pasar el payload sin LLM), y un script simple hacer la validación.

### Open questions
1. ¿Queremos un repo separado o incluirlo en el mismo repo de tp3studio?
2. ¿El validador debe ser un perfil separado de Hermes o un cron job en el perfil tp3studio?
3. ¿Debe el validador tener un canal de notificación (WhatsApp/Telegram) para cuando una validación falla?
4. ¿Manejamos solo validación de tareas de código, o también de configuración/contenido?
5. ¿Quieres que el webhook se configure en el VPS o local?
