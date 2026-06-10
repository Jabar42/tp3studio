import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { useAgent } from "agents/react";
import { useAgentChat } from "@cloudflare/ai-chat/react";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const AGENT_NAME = "Tp3ChatAgent";
const STORAGE_KEY = "tp3chat-session";
const AGENT_HOST = import.meta.env.PUBLIC_CHAT_AGENT_HOST ?? "localhost:8788";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState("");
  const messagesEnd = useRef<HTMLDivElement>(null);
  const openOnce = useRef(false);

  const agent = useAgent({
    agent: AGENT_NAME,
    host: AGENT_HOST,
    name: crypto.randomUUID().slice(0, 8),
    onStateUpdate: () => {},
  });

  const chat = useAgentChat({ agent });

  // Restore session ID — only once
  useEffect(() => {
    if (openOnce.current) return;
    openOnce.current = true;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        // session restored — agent reconnects automatically
      }
    } catch {}
  }, []);

  // Save session
  useEffect(() => {
    if (agent.name) {
      try {
        localStorage.setItem(STORAGE_KEY, agent.name);
      } catch {}
    }
  }, [agent.name]);

  // Auto-scroll
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  // Lock body scroll
  useEffect(() => {
    if (open && !closing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, closing]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      chat.handleSubmit();
    }
  }

  return (
    <>
      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(100%); }
        }
        .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
        .animate-slide-down { animation: slide-down 0.3s ease-in forwards; }
      `}</style>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-[#6366F1] text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:brightness-110 hover:scale-105 active:scale-95"
          aria-label="Abrir chat"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {open && (
        <div
          className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[360px] h-full sm:max-h-[520px] sm:h-[520px] sm:rounded-3xl bg-white shadow-lg border border-[#E4E4E7] flex flex-col ${
            closing ? "animate-slide-down" : "animate-slide-up"
          }`}
        >
          <div className="bg-[#6366F1] text-white px-5 py-3.5 shrink-0 flex items-center justify-between sm:rounded-t-3xl">
            <div>
              <h3 className="font-outfit font-semibold text-base">Tp3studio</h3>
              <p className="text-xs text-white/75 mt-0.5">Asistente virtual</p>
            </div>
            <button
              onClick={() => {
                setClosing(true);
                setTimeout(() => { setOpen(false); setClosing(false); }, 300);
              }}
              aria-label="Cerrar chat"
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
            {chat.error && (
              <div className="self-start bg-red-50 text-red-700 text-sm px-3.5 py-2.5 rounded-2xl rounded-bl-md max-w-[85%]">
                ⚠ No se pudo conectar con el asistente.
              </div>
            )}
            {chat.messages.length === 0 && !chat.isLoading && (
              <div className="self-start bg-[#F4F4F5] text-[#18181B] px-3.5 py-2.5 rounded-2xl rounded-bl-md text-sm leading-relaxed font-nunito max-w-[85%]">
                👋 ¡Hola! Soy el asistente de Tp3studio. ¿En qué puedo ayudarte?
              </div>
            )}
            {chat.messages.map((m: any, i: number) => (
              <div
                key={i}
                className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed font-nunito ${
                  m.role === "user"
                    ? "self-end bg-[#6366F1] text-white rounded-br-md"
                    : "self-start bg-[#F4F4F5] text-[#18181B] rounded-bl-md"
                }`}
              >
                {m.content}
              </div>
            ))}
            {chat.isLoading && (
              <div className="self-start bg-[#F4F4F5] text-gray-400 text-sm px-3.5 py-2.5 rounded-2xl rounded-bl-md">
                Escribiendo...
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); chat.handleSubmit(e); }} className="shrink-0 flex gap-2 px-4 py-3 border-t border-[#E4E4E7] bg-white/60">
            <input
              type="text"
              inputMode="text"
              name="chat"
              autoComplete="off"
              data-1p-ignore
              data-lpignore="true"
              data-form-type="other"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              value={chat.input}
              onChange={chat.handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              disabled={chat.isLoading}
              className="flex-1 px-3.5 py-2.5 bg-white border border-[#E4E4E7] rounded-xl text-sm text-[#18181B] placeholder-gray-400 focus:outline-none focus:border-[#6366F1] disabled:opacity-50 transition-colors font-nunito"
            />
            <button
              type="submit"
              disabled={chat.isLoading || !chat.input.trim()}
              title="Enviar"
              className="shrink-0 w-10 h-10 bg-[#6366F1] text-white rounded-xl hover:brightness-110 disabled:opacity-40 transition-all flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
