import { Agent, routeAgentRequest } from "agents";

const SYSTEM_PROMPT = `Eres el asistente virtual de **Tp3studio**, una agencia de soluciones IA para negocios.

## Información del negocio
- **Nombre:** Tp3studio
- **Servicios:** chatbots IA, páginas web modernas, automatización WhatsApp Business
- **Precios:** Plan Esencial ($100 USD), Plan Popular ($150 USD), Plan Completo ($200 USD)
- **Web:** https://tp3studio.com
- **Email:** hola@tp3studio.com

## Reglas
1. Responde siempre en el idioma del cliente
2. Sé amable, profesional y resolutivo
3. Si no sabes algo, no inventes — ofrece escalar a un humano
4. NO guardes datos personales de clientes
5. NO asumas que conoces al cliente — cada conversación empieza desde cero`;

export class Tp3ChatAgent extends Agent<Env> {
  async onConnect(connection: any) {
    connection.send(JSON.stringify({
      type: "chat-response",
      message: "👋 ¡Hola! Soy el asistente de Tp3studio. ¿En qué puedo ayudarte?",
    }));

    connection.addEventListener("message", async (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data.toString());
        if (data.type !== "chat" || !data.message) return;
        const history = (data.history || []).map((m: any) => ({ role: m.role, content: m.content }));
        history.push({ role: "user", content: data.message });
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.env.DEEPSEEK_API_KEY}` },
          body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history.slice(-20)], max_tokens: 1024, temperature: 0.7, stream: false }),
        });
        if (!response.ok) { connection.send(JSON.stringify({ type: "chat-response", message: "Lo siento, tuve un problema. Intenta de nuevo." })); return; }
        const result: any = await response.json();
        const reply = result.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu mensaje.";
        connection.send(JSON.stringify({ type: "chat-response", message: reply }));
      } catch { connection.send(JSON.stringify({ type: "chat-response", message: "Ocurrió un error. Por favor intenta de nuevo." })); }
    });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // CORS headers for all responses
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    if (url.pathname === "/health") return Response.json({ status: "ok", agent: "tp3studio-chat" }, { headers: corsHeaders });

    // HTTP chat endpoint
    if (url.pathname === "/api/chat" && request.method === "POST") {
      try {
        const body: any = await request.json();
        const messages = body.messages || [];
        const apiKey = env.DEEPSEEK_API_KEY;
        if (!apiKey) return Response.json({ reply: "Error de configuración." }, { status: 500, headers: corsHeaders });

        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.slice(-20)], max_tokens: 1024, temperature: 0.7, stream: false }),
        });
        if (!response.ok) return Response.json({ reply: "Error del asistente." }, { status: 500, headers: corsHeaders });
        const result: any = await response.json();
        return Response.json({ reply: result.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu mensaje." }, { headers: corsHeaders });
      } catch { return Response.json({ reply: "Error al procesar el mensaje." }, { status: 500, headers: corsHeaders }); }
    }

    const resp = await routeAgentRequest(request, env);
    if (resp) {
      const newResp = new Response(resp.body, resp);
      for (const [k, v] of Object.entries(corsHeaders)) newResp.headers.set(k, v);
      return newResp;
    }
    return new Response("Agent not found", { status: 404, headers: corsHeaders });
  },
};
