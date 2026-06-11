import { useState, useRef, useEffect } from "react";

const AGENT_HOST = "tp3studio-chat.iaforchange.workers.dev";
const AGENT_NAME = "tp3-chat-agent";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role:string;text:string}[]>([]);
  const [loading, setLoading] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEnd.current?.scrollIntoView({behavior:"smooth"}); }, [messages]);

  function connectWs() {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;
    const sid = crypto.randomUUID().slice(0, 8);
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";
    const ws = new WebSocket(`${protocol}//${AGENT_HOST}/agents/${AGENT_NAME}/${sid}`);
    wsRef.current = ws;

    let currentBotMsg = "";

    ws.onopen = () => {
      if (messages.length === 0) {
        setMessages([{role:"bot",text:"👋 ¡Hola! Soy el asistente de Tp3studio. ¿En qué puedo ayudarte?"}]);
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "chat-response") {
          setMessages(prev => [...prev, {role:"bot",text:data.message}]);
          setLoading(false);
        } else if (data.type === "chat-chunk") {
          if (data.done) {
            setMessages(prev => {
              const next = [...prev];
              if (next.length > 0 && next[next.length - 1].role === "bot") {
                next[next.length - 1] = {role:"bot",text: data.full || currentBotMsg};
              }
              return next;
            });
            currentBotMsg = "";
            setLoading(false);
          } else if (data.text) {
            currentBotMsg += data.text;
            setMessages(prev => {
              const next = [...prev];
              const last = next[next.length - 1];
              if (last && last.role === "bot") {
                next[next.length - 1] = {role:"bot",text: currentBotMsg};
              } else {
                next.push({role:"bot",text: currentBotMsg});
              }
              return next;
            });
          }
        }
      } catch {}
    };

    ws.onerror = () => {
      setMessages(prev => [...prev, {role:"bot",text:"⚠ Error al conectar con el asistente."}]);
      setLoading(false);
    };

    ws.onclose = () => {
      wsRef.current = null;
    };
  }

  function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages(prev => [...prev, {role:"user",text}]);
    setLoading(true);

    const trySend = () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        const history = messages
          .filter(m => m.role !== "error")
          .slice(-20)
          .map(m => ({role: m.role === "bot" ? "assistant" : "user", content: m.text}));
        wsRef.current.send(JSON.stringify({ type: "chat", message: text, history }));
      } else {
        setTimeout(trySend, 200);
      }
    };
    trySend();
  }

  const chatWidth = 380;
  const chatHeight = 540;

  return (
    <>
      <style>{`
        @keyframes slide-up { from { opacity:0; transform:translateY(16px) scale(0.96); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes slide-down { from { opacity:1; transform:translateY(0) scale(1); } to { opacity:0; transform:translateY(16px) scale(0.96); } }
        .chat-window { animation:slide-up .35s cubic-bezier(.16,1,.3,1) forwards; }
        .chat-window-out { animation:slide-down .25s ease-in forwards; }
        @keyframes typing-dot { 0%,60% { opacity:.2; transform:translateY(0); } 30% { opacity:1; transform:translateY(-6px); } 100% { opacity:.2; transform:translateY(0); } }
        .typing-indicator { display:flex; align-items:center; gap:4px; padding:8px 14px; }
        .typing-indicator span { width:7px; height:7px; border-radius:50%; background:#6366F1; animation:typing-dot 1.4s infinite ease-in-out; }
        .typing-indicator span:nth-child(2) { animation-delay:.15s; }
        .typing-indicator span:nth-child(3) { animation-delay:.3s; }
        @media (max-width: 480px) {
          .chat-window, .chat-window-out {
            width: 100% !important; height: 100% !important;
            max-width: 100% !important; max-height: 100% !important;
            bottom: 0 !important; right: 0 !important;
            border-radius: 0 !important;
          }
        }
      `}</style>

      {!open && (
        <button onClick={() => {connectWs(); setOpen(true);}}
          style={{position:"fixed",bottom:24,right:24,zIndex:9999,width:56,height:56,borderRadius:16,background:"#6366F1",color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(0,0,0,.12)"}}
          aria-label="Abrir chat">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      )}

      {open && (
        <div className={closing ? "chat-window-out" : "chat-window"}
          style={{position:"fixed",bottom:24,right:24,zIndex:9998,width:chatWidth,maxWidth:"calc(100vw - 48px)",height:chatHeight,maxHeight:"calc(100vh - 48px)",background:"#fff",display:"flex",flexDirection:"column",borderRadius:16,overflow:"hidden",boxShadow:"0 12px 48px rgba(0,0,0,.18)"}}>
          <div style={{background:"#6366F1",color:"#fff",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
            <div>
              <div style={{fontFamily:"Outfit,sans-serif",fontWeight:600,fontSize:16}}>Tp3studio</div>
              <div style={{fontSize:12,opacity:.75,marginTop:1}}>Asistente virtual</div>
            </div>
            <button onClick={()=>{wsRef.current?.close(); setClosing(true);setTimeout(()=>{setOpen(false);setClosing(false)},250)}}
              style={{width:32,height:32,borderRadius:12,background:"rgba(255,255,255,.1)",border:"none",color:"#fff",cursor:"pointer"}} aria-label="Cerrar chat">✕</button>
          </div>

          <div style={{flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:10,fontFamily:"Nunito,sans-serif"}}>
            {messages.map((m,i) => (
              <div key={i} style={{maxWidth:"85%",padding:"10px 14px",borderRadius:16,fontSize:14,lineHeight:1.4,
                alignSelf:m.role==="user"?"flex-end":"flex-start",
                background:m.role==="user"?"#6366F1":"#F4F4F5",
                color:m.role==="user"?"#fff":"#18181B",
                borderBottomRightRadius:m.role==="user"?4:16,
                borderBottomLeftRadius:m.role==="user"?16:4}}>
                {m.text}
              </div>
            ))}
            {loading && <div className="typing-indicator" style={{alignSelf:"flex-start",background:"#F4F4F5",borderRadius:16,borderBottomLeftRadius:4}}><span></span><span></span><span></span></div>}
            <div ref={messagesEnd}/>
          </div>

          <form onSubmit={e=>{e.preventDefault();send()}} style={{display:"flex",gap:8,padding:"12px 16px 16px",borderTop:"1px solid #E4E4E7",flexShrink:0}}>
            <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Escribe tu mensaje..." disabled={loading}
              style={{flex:1,padding:"10px 14px",border:"1px solid #E4E4E7",borderRadius:12,fontSize:14,outline:"none",fontFamily:"Nunito,sans-serif"}}/>
            <button type="submit" disabled={loading||!input.trim()}
              style={{width:40,height:40,borderRadius:12,background:"#6366F1",color:"#fff",border:"none",cursor:"pointer",opacity:loading||!input.trim()?.4:1}} title="Enviar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
