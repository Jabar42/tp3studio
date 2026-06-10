import { routeAgentRequest } from "agents";
import { AIChatAgent } from "@cloudflare/ai-chat";

// ---------------------------------------------------------------------------
// State persisted per session (Durable Object)
// ---------------------------------------------------------------------------

export interface ChatState {
  messages: { role: "user" | "assistant"; content: string }[];
  name?: string;
  email?: string;
}

// ---------------------------------------------------------------------------
// Agent — one Durable Object instance per chat session
// ---------------------------------------------------------------------------

export class Tp3ChatAgent extends AIChatAgent<Env, ChatState> {
  // Default state for brand-new sessions
  initialState: ChatState = { messages: [] };

  // System prompt — the agent's persona
  // Injected once per connection, cached by the SDK
  systemPrompt = `Eres el asistente virtual de **Tp3studio**, una agencia de soluciones IA para negocios.

## Información del negocio
- **Nombre:** Tp3studio
- **Servicios:** chatbots IA, páginas web modernas, automatización WhatsApp Business, soluciones multi-tenant con Hermes Agent
- **Precios:** Plan Esencial ($100 USD), Plan Popular ($150 USD), Plan Completo ($200 USD)
- **Ubicación:** Colombia, con servicio en Latinoamérica
- **Web:** https://tp3studio.com
- **Email:** hola@tp3studio.com

## Reglas
1. Responde siempre en el idioma del cliente (español o inglés)
2. Sé amable, profesional y resolutivo
3. Si no sabes algo, no inventes — ofrece escalar a un humano
4. NO guardes datos personales de clientes en memoria
5. NO asumas que conoces al cliente aunque tengas session_id — cada conversación empieza desde cero

## Lo que puedes hacer
- Informar sobre servicios y precios
- Ayudar a elegir el plan adecuado
- Responder preguntas frecuentes
- Agendar una llamada con el equipo
- Escalar consultas complejas a un humano`;
}

// ---------------------------------------------------------------------------
// Worker entry point
// ---------------------------------------------------------------------------

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Max-Age": "86400",
        },
      });
    }

    // Health check
    if (url.pathname === "/health") {
      return Response.json({ status: "ok", agent: "tp3studio-chat" });
    }

    // Route to agent
    const resp = await routeAgentRequest(request, env);
    return resp ?? new Response("Agent not found", { status: 404 });
  },
};
