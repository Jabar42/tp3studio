import { useState, useRef, useEffect, type KeyboardEvent } from "react";

const AGENT_HOST = "tp3studio-chat.iaforchange.workers.dev";
const AGENT_NAME = "tp3-chat-agent";
const STORAGE_KEY = "tp3chat-session";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role:string;text:string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEnd = useRef<HTMLDivElement>(null);

  // Connect WebSocket when opened
  useEffect(() => {
    if (!open) return;
    const sid = crypto.randomUUID().slice(0, 8);
    setSessionId(sid);
    try { localStorage.setItem(STORAGE_KEY, sid); } catch {}

    const protocol = location.protocol === "https:" ? "wss:" : "ws:";
    const url = `${protocol}//${AGENT_HOST}/agents/${AGENT_NAME}/${sid}`;
    const socket = new WebSocket(url);
    setWs(socket);

    socket.onopen = () => {
      setMessages([{role:"bot",text:"👋 ¡Hola! Soy el asistente de Tp3studio. ¿En qué puedo ayudarte?"}]);
    };
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "state" && data.state?.messages) {
          setMessages(data.state.messages.map((m:any) => ({
            role: m.role === "assistant" ? "bot" : "user",
            text: m.content,
          })));
        }
      } catch {
        // raw text
        setMessages(prev => [...prev, {role:"bot",text:event.data}]);
      }
    };
    socket.onerror = () => {
      setMessages(prev => [...prev, {role:"error",text:"⚠ No se pudo conectar con el asistente."}]);
    };

    return () => { socket.close(); setWs(null); };
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Lock body scroll
  useEffect(() => {
    if (open && !closing) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open, closing]);

  function send() {
    const text = input.trim();
    if (!text || loading || !ws) return;
    setInput("");
    setMessages(prev => [...prev, {role:"user",text}]);
    setLoading(true);
    ws.send(JSON.stringify({ type: "chat", message: text }));
    // The onmessage handler will clear loading when response arrives
    const onMsg = (e: MessageEvent) => {
      setLoading(false);
      ws.removeEventListener("message", onMsg);
    };
    ws.addEventListener("message", onMsg);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      <style>{`
        @keyframes slide-up { from { opacity:0; transform:translateY(100%); } to { opacity:1; transform:translateY(0); } }
        @keyframes slide-down { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(100%); } }
        .animate-slide-up { animation:slide-up .4s ease-out forwards; }
        .animate-slide-down { animation:slide-down .3s ease-in forwards; }
        .chat-btn { position:fixed; bottom:24px; right:24px; z-index:9999; width:56px; height:56px; border-radius:16px; background:#6366F1; color:#fff; box-shadow:0 8px 24px rgba(0,0,0,.12); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all .3s; border:none; }
        .chat-btn:hover { filter:brightness(1.1); transform:scale(1.05); }
        .chat-btn:active { transform:scale(.95); }
        .chat-panel { position:fixed; bottom:0; right:0; z-index:9998; width:100%; height:100%; background:#fff; display:flex; flex-direction:column; box-shadow:0 8px 32px rgba(0,0,0,.12); }
        @media (min-width:640px) { .chat-panel { bottom:24px; right:24px; width:360px; height:520px; max-height:520px; border-radius:24px; border:1px solid #E4E4E7; } }
      `}</style>

      {!open && (
        <button className="chat-btn" onClick={() => setOpen(true)} aria-label="Abrir chat">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}

      {open && (
        <div className={`chat-panel ${closing ? "animate-slide-down" : "animate-slide-up"}`}>
          <div style={{background:"#6366F1",color:"#fff",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",borderRadius:"24px 24px 0 0"}}>
            <div>
              <div style={{fontFamily:"Outfit,sans-serif",fontWeight:600,fontSize:"16px"}}>Tp3studio</div>
              <div style={{fontSize:"12px",opacity:.75,marginTop:"1px"}}>Asistente virtual</div>
            </div>
            <button onClick={()=>{setClosing(true);setTimeout(()=>{setOpen(false);setClosing(false)},300)}} style={{width:32,height:32,borderRadius:12,background:"rgba(255,255,255,.1)",border:"none",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}} aria-label="Cerrar chat">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div style={{flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:"10px"}}>
            {messages.map((m,i) => (
              <div key={i} style={{maxWidth:"85%",padding:"10px 14px",borderRadius:16,fontSize:"14px",lineHeight:1.4,fontFamily:"Nunito,sans-serif",alignSelf:m.role==="user"?"flex-end":"flex-start",background:m.role==="user"?"#6366F1":"#F4F4F5",color:m.role==="user"?"#fff":"#18181B",borderBottomRightRadius:m.role==="user"?4:16,borderBottomLeftRadius:m.role==="user"?16:4}}>
                {m.role==="error"?<span style={{color:"#dc2626"}}>{m.text}</span>:m.text}
              </div>
            ))}
            {loading && <div style={{alignSelf:"flex-start",background:"#F4F4F5",color:"#999",padding:"10px 14px",borderRadius:16,fontSize:"14px"}}>Escribiendo...</div>}
            <div ref={messagesEnd} />
          </div>

          <form onSubmit={(e)=>{e.preventDefault();send()}} style={{display:"flex",gap:8,padding:"12px 16px",borderTop:"1px solid #E4E4E7",background:"rgba(255,255,255,.6)"}}>
            <input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Escribe tu mensaje..." disabled={loading}
              style={{flex:1,padding:"10px 14px",border:"1px solid #E4E4E7",borderRadius:12,fontSize:"14px",outline:"none",color:"#18181B",fontFamily:"Nunito,sans-serif"}}
            />
            <button type="submit" disabled={loading||!input.trim()}
              style={{width:40,height:40,borderRadius:12,background:"#6366F1",color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",opacity:loading||!input.trim()?.4:1,transition:"opacity .2s"}}
              title="Enviar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
