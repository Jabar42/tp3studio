# Tp3ChatAgent — Skill para editar el agente de chat de Tp3studio

Skill de mantenimiento del agente de servicio al cliente de Tp3studio: un Cloudflare Worker con Agents SDK que corre un chat IA vía DeepSeek y se integra con un widget React en el sitio Astro.

## Prerrequisitos

- Node.js >= 22.12.0
- Wrangler >= 4.97.0 autenticado (cuenta `jaimebarbudomier@gmail.com`)
- El repo de tp3studio clonado en `~/Documents/tp3studio`

## Arquitectura

```
Navegador (ChatWidget.tsx)         Cloudflare Worker (chat-agent.ts)
┌─────────────────────────┐       ┌──────────────────────────────┐
│  WebSocket:              │       │  fetch() handler:            │
│  wss://<host>/agents/    │──────▶│  ├─ OPTIONS → CORS          │
│    tp3-chat-agent/<sid>  │       │  ├─ /health → status        │
│                          │       │  ├─ POST /api/chat → DeepSeek│
│  Mensajes:               │       │  └─ resto → routeAgentRequest│
│  {type:"chat",           │       │       │                      │
│   message, history}      │       │       ▼                      │
│                          │       │  Tp3ChatAgent (Durable Obj)  │
│  Recibe:                 │       │  ├─ onConnect()              │
│  {type:"chat-response"   │◀──────│  └─ onMessage() → DeepSeek   │
│   , message}              │       │                              │
└─────────────────────────┘       └──────────────────────────────┘
```

### Archivos clave

| Archivo | Rol |
|---------|-----|
| `src/workers/chat-agent.ts` | Worker: Agent SDK + fetch handler + DeepSeek |
| `src/components/ChatWidget.tsx` | Widget React: WebSocket + UI del chat |
| `wrangler-chat.jsonc` | Config de Wrangler para este worker (DO, observability) |
| `wrangler.jsonc` | Config del worker principal del sitio Astro |

### Stack

| Capa | Tecnología |
|------|-----------|
| Runtime | Cloudflare Workers |
| Agente | Agents SDK (`agents` ^0.15.0) + Durable Objects |
| LLM | DeepSeek (`deepseek-chat`) vía fetch directo |
| Widget | React + WebSocket nativo |
| Deploy | `wrangler deploy --config wrangler-chat.jsonc src/workers/chat-agent.ts` |

## El patrón más importante (lee esto primero)

### ❌ Incorrecto — NO funciona

```typescript
async onConnect(connection: any) {
  // ESTO NO HACE NADA. addEventListener NO existe en el Connection del SDK.
  connection.addEventListener("message", async (event) => {
    // Nunca se ejecuta. Los mensajes del widget se pierden en el vacío.
  });
}
```

El SDK de Agents **no expone `addEventListener`** en el objeto Connection. Los mensajes enviados por el widget nunca se reciben.

### ✅ Correcto — override de `onMessage()`

```typescript
export class Tp3ChatAgent extends Agent<Env> {
  async onConnect(connection: Connection, ctx: ConnectionContext) {
    // Setup inicial. No enviar welcome (el widget lo muestra).
  }

  async onMessage(connection: Connection, message: string) {
    const data = JSON.parse(message);
    if (data.type === "chat") {
      // Procesar con DeepSeek
      const reply = await chatWithDeepSeek(this.env.DEEPSEEK_API_KEY, history);
      connection.send(JSON.stringify({ type: "chat-response", message: reply }));
    }
  }
}
```

### Formato markdown en respuestas

El agente responde con markdown natural (bold, listas, links). El widget lo renderiza a HTML con la función `renderMarkdown()` en `ChatWidget.tsx`:

```typescript
function renderMarkdown(text: string): string {
  // 1. Escapa HTML (&, <, >) — seguro contra XSS
  // 2. `code` → <code>
  // 3. **bold** → <strong>
  // 4. *italic* → <em>
  // 5. [label](url) → <a>
  // 6. ### Header → <strong> (inline)
  // 7. - item / * item → bullet
  // 8. \n\n → <br><br>, \n → <br>
}
```

Los mensajes del bot usan `dangerouslySetInnerHTML`; los del usuario se muestran como texto plano. **No se debe pedir al LLM que evite markdown** — el widget lo convierte automáticamente.

### Otras methods disponibles

| Method | Cuándo se llama |
|--------|----------------|
| `onConnect(connection, ctx)` | Al establecerse WebSocket |
| `onMessage(connection, message)` | Cada mensaje recibido |
| `onClose(connection, code, reason, wasClean)` | Al cerrarse la conexión |

### Tipos a importar

```typescript
import { Agent, routeAgentRequest, type Connection, type ConnectionContext } from "agents";
```

## Widget — convenciones de mensajes

### Mensajes del widget → Worker

```json
{
  "type": "chat",
  "message": "texto del usuario",
  "history": [
    { "role": "user", "content": "..." },
    { "role": "assistant", "content": "..." }
  ]
}
```

El widget mapea los roles: `"bot"` → `"assistant"`, `"user"` → `"user"`.

### Respuestas del Worker → Widget

**Respuesta completa:**
```json
{ "type": "chat-response", "message": "texto de DeepSeek" }
```

**Streaming (preparado en el widget, pendiente en backend):**
```json
{ "type": "chat-chunk", "text": "fragmento", "done": false }
{ "type": "chat-chunk", "full": "texto completo", "done": true }
```

### Protocolo interno del SDK

El SDK envía automáticamente al conectar:
- `cf_agent_identity` — nombre y tipo del agente
- `cf_agent_state` — estado actual
- `cf_agent_mcp_servers` — servidores MCP registrados

El widget ignora estos mensajes (no matchean `chat-response` ni `chat-chunk`).

## DeepSeek — integración

```typescript
async function chatWithDeepSeek(apiKey: string, messages: {role:string;content:string}[]): Promise<string|null> {
  const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-20),  // ← último contexto como historial
      ],
      max_tokens: 1024,
      temperature: 0.7,
      stream: false,  // ← cambiar a true para habilitar streaming
    }),
    signal: AbortSignal.timeout(25000),  // 25s timeout
  });
  if (!response.ok) return null;
  const result = await response.json();
  return result.choices?.[0]?.message?.content || null;
}
```

- **System prompt**: definido en `SYSTEM_PROMPT` al inicio del archivo. Contiene info del negocio, servicios, precios y reglas de comportamiento.
- **Timeout**: 25 segundos. Si DeepSeek no responde a tiempo, se devuelve mensaje de error genérico.
- **API key**: viene de `env.DEEPSEEK_API_KEY` (secreto configurado via `wrangler secret put`).

## CORS

El worker incluye CORS en TODAS las respuestas — tanto las manejadas directamente como las que pasan por `routeAgentRequest`:

```typescript
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": "86400",
};
```

## Deploy

### Chat worker (tp3studio-chat)

```bash
npm run deploy:chat
# Internamente: wrangler deploy --config wrangler-chat.jsonc src/workers/chat-agent.ts
```

URL: `https://tp3studio-chat.iaforchange.workers.dev`

### Sitio principal (incluye el widget)

```bash
npm run deploy
# Internamente: npm run build && wrangler deploy
```

URL: `https://tp3studio.iaforchange.workers.dev` y `https://tp3studio.com`

### Secretos

```bash
npx wrangler --config wrangler-chat.jsonc secret list   # Ver secretos
echo "valor" | npx wrangler --config wrangler-chat.jsonc secret put DEEPSEEK_API_KEY
```

## Pruebas

### Test del WebSocket con Node.js

```bash
node -e "
const WebSocket = require('ws');
const ws = new WebSocket('wss://tp3studio-chat.iaforchange.workers.dev/agents/tp3-chat-agent/test001');
ws.on('open', () => {
  console.log('Conectado');
  ws.send(JSON.stringify({ type: 'chat', message: 'Hola, plan mas barato?', history: [] }));
});
ws.on('message', (d) => {
  const m = JSON.parse(d.toString());
  if (m.type === 'chat-response') console.log('Respuesta:', m.message);
});
ws.on('close', () => process.exit(0));
setTimeout(() => process.exit(1), 15000);
"
```

### Test del HTTP endpoint

```bash
curl -X POST https://tp3studio-chat.iaforchange.workers.dev/api/chat \
  -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"Hola"}]}'
```

### Health check

```bash
curl https://tp3studio-chat.iaforchange.workers.dev/health
# → {"status":"ok","agent":"tp3studio-chat"}
```

## Variables de entorno necesarias

| Variable | Tipo | Dónde |
|----------|------|-------|
| `DEEPSEEK_API_KEY` | Secret | `wrangler-chat.jsonc` via `wrangler secret put` |

El worker usa `this.env.DEEPSEEK_API_KEY` en el Agent (DO) y `env.DEEPSEEK_API_KEY` en el fetch handler.

## Errores comunes

| Error | Causa | Solución |
|-------|-------|----------|
| Widget conecta pero no responde a mensajes | `onMessage` no está implementado | Implementar `onMessage(connection, message)` |
| `TS2304: Cannot find name 'Env'` | Falta la interfaz `Env` | Agregar `interface Env { ... }` en `chat-agent.ts` |
| WebSocket `1006` / "Not implemented" | `routeAgentRequest` no encuentra el DO | Verificar que el binding name en `wrangler-chat.jsonc` coincida con el class name |
| `Property 'env' does not exist` | Falta `@cloudflare/workers-types` | `/// <reference types="@cloudflare/workers-types" />` |
| "Not found" en ruta de agentes | `routeAgentRequest` devuelve null | Verificar que `wrangler-chat.jsonc` tenga `durable_objects.bindings` |

## Para habilitar streaming (tarea pendiente)

1. Cambiar `stream: false` → `stream: true` en `chatWithDeepSeek()`
2. Leer el body como stream con `response.body.getReader()`
3. Parsear cada chunk SSE (`data: {...}`)
4. Enviar al widget como `{ type: "chat-chunk", text: delta, done: false }`
5. El widget ya maneja `chat-chunk` — solo falta el backend
