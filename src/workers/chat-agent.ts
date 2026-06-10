import { Agent, routeAgentRequest } from "agents";

// ---------------------------------------------------------------------------
// Agent — handles WebSocket chat sessions with DeepSeek
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `Eres el asistente virtual de **Tp3studio**, una agencia de soluciones IA para negocios.`;

export class Tp3ChatAgent extends Agent<Env> {
  async onConnect(connection: any, ctx: any) {
    let history: { role: string; content: string }[] = [];

    connection.addEventListener("message", async (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data.toString());
        if (data.type === "chat" && data.message) {
          // Add user message to history
          history.push({ role: "user", content: data.message });

          // Build messages array
          const msgs = [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.slice(-20),
          ];

          // Call DeepSeek
          const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.env.DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
              model: "deepseek-chat",
              messages: msgs,
              max_tokens: 1024,
              temperature: 0.7,
              stream: false,
            }),
          });

          if (!response.ok) {
            const errText = await response.text();
            connection.send(JSON.stringify({ type: "error", message: "Error del asistente" }));
            return;
          }

          const result: any = await response.json();
          const reply = result.choices?.[0]?.message?.content || "Lo siento, no pude procesar tu mensaje.";

          history.push({ role: "assistant", content: reply });

          // Send response
          connection.send(JSON.stringify({
            type: "chat-response",
            message: reply,
          }));
        }
      } catch {
        connection.send(JSON.stringify({ type: "error", message: "Error al procesar el mensaje." }));
      }
    });
  }
}

// ---------------------------------------------------------------------------
// Worker entry point
// ---------------------------------------------------------------------------

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

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

    if (url.pathname === "/health") {
      return Response.json({ status: "ok", agent: "tp3studio-chat" });
    }

    const resp = await routeAgentRequest(request, env);
    return resp ?? new Response("Agent not found", { status: 404 });
  },
};
