import { useState, useRef, useEffect } from "react";

const CHAT_API = "https://tp3studio-chat.iaforchange.workers.dev";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role:string;text:string}[]>([
    {role:"bot",text:"👋 ¡Hola! Soy el asistente de Tp3studio. ¿En qué puedo ayudarte?"}
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEnd.current?.scrollIntoView({behavior:"smooth"}); }, [messages]);
  useEffect(() => {
    if (open && !closing) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open, closing]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages(prev => [...prev, {role:"user",text}]);
    setLoading(true);

    // Build context from current conversation
    const history = messages.map(m => ({role: m.role === "bot" ? "assistant" : "user", content: m.text}));
    history.push({role: "user", content: text});

    try {
      const res = await fetch(`${CHAT_API}/api/chat`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ messages: history })
      });
      if (!res.ok) throw new Error("Error");
      const data = await res.json();
      setMessages(prev => [...prev, {role:"bot",text: data.reply}]);
    } catch {
      setMessages(prev => [...prev, {role:"bot",text:"⚠ Error al conectar. Intenta de nuevo."}]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes slide-up { from { opacity:0; transform:translateY(100%); } to { opacity:1; transform:translateY(0); } }
        @keyframes slide-down { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(100%); } }
        .anim-up { animation:slide-up .4s ease-out forwards; }
        .anim-down { animation:slide-down .3s ease-in forwards; }
      `}</style>

      {!open && (
        <button onClick={() => setOpen(true)}
          style={{position:"fixed",bottom:24,right:24,zIndex:9999,width:56,height:56,borderRadius:16,background:"#6366F1",color:"#fff",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 24px rgba(0,0,0,.12)"}}
          aria-label="Abrir chat">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      )}

      {open && (
        <div className={closing ? "anim-down" : "anim-up"}
          style={{position:"fixed",bottom:0,right:0,zIndex:9998,width:"100%",height:"100%",background:"#fff",display:"flex",flexDirection:"column",boxShadow:"0 8px 32px rgba(0,0,0,.12)"}}>
          <div style={{background:"#6366F1",color:"#fff",padding:"14px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontFamily:"Outfit,sans-serif",fontWeight:600,fontSize:16}}>Tp3studio</div>
              <div style={{fontSize:12,opacity:.75,marginTop:1}}>Asistente virtual</div>
            </div>
            <button onClick={()=>{setClosing(true);setTimeout(()=>{setOpen(false);setClosing(false)},300)}}
              style={{width:32,height:32,borderRadius:12,background:"rgba(255,255,255,.1)",border:"none",color:"#fff",cursor:"pointer"}} aria-label="Cerrar chat">
              ✕
            </button>
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
            {loading && <div style={{alignSelf:"flex-start",background:"#F4F4F5",color:"#999",padding:"10px 14px",borderRadius:16,fontSize:14}}>Escribiendo...</div>}
            <div ref={messagesEnd}/>
          </div>

          <form onSubmit={e=>{e.preventDefault();send()}} style={{display:"flex",gap:8,padding:"12px 16px 20px",borderTop:"1px solid #E4E4E7"}}>
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
