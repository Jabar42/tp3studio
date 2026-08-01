// Cuestionario de onboarding de clientes — Tp3studio
// Single source of truth: la página /onboarding y el endpoint /api/onboarding
// leen esta definición. Agregar preguntas aquí actualiza ambas.

export interface Question {
  id: string;
  label: string;
  hint?: string;
  type: 'text' | 'tel' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox';
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export interface Step {
  num: number;
  slug: string;
  title: string;
  icon: string;
  desc: string;
  questions: Question[];
}

export interface ClientDefaults {
  [fieldId: string]: string | string[];
}

export const onboardingSteps: Step[] = [
  {
    num: 1,
    slug: 'contacto',
    title: 'Contacto y negocio',
    icon: '👋',
    desc: 'Quién es la persona a cargo y los datos base del negocio.',
    questions: [
      { id: 'contacto_nombre', label: 'Nombre de la persona de contacto', type: 'text', required: true, placeholder: 'Nombre y apellido' },
      { id: 'contacto_cargo', label: 'Cargo', type: 'text', placeholder: 'Ej: dueño, gerente, encargado digital' },
      { id: 'whatsapp', label: 'WhatsApp / teléfono', type: 'tel', required: true, placeholder: 'Ej: 312 720 1279' },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'ventas@tunegocio.com' },
      { id: 'decision', label: '¿Quién toma las decisiones de este proyecto?', hint: 'Si sos vos, escribí tu nombre igual — sirve para saber a quién pedirle el sí final.', type: 'text', placeholder: 'Ej: Jonathan (dueño)' },
      { id: 'razon_social', label: '¿Facturan con NIT? Si sí, ¿cuál es la razón social?', type: 'text', placeholder: 'Opcional — solo si facturan' },
      { id: 'ubicacion', label: 'Dirección y ciudad', type: 'text', required: true, placeholder: 'Ej: Cl. 7 # 7-6, Sandoná, Nariño' },
      { id: 'local_fisico', label: '¿Tienen local físico o es 100% digital?', type: 'radio', options: ['Local físico', '100% digital', 'Ambos'] },
      { id: 'equipo', label: '¿Cuántas personas integran el equipo?', type: 'number', placeholder: 'Ej: 6' },
    ],
  },
  {
    num: 2,
    slug: 'producto',
    title: 'Producto y catálogo',
    icon: '🧵',
    desc: 'Qué venden, cuánto manejan y cómo producen.',
    questions: [
      { id: 'lineas', label: '¿Qué líneas manejan?', hint: 'Ej: hombre, mujer, niños, unisex, accesorios…', type: 'text', placeholder: 'Ej: mujer, hombre, accesorios' },
      { id: 'referencias', label: '¿Cuántas referencias/productos tienen aprox.?', type: 'text', placeholder: 'Ej: 80 referencias' },
      { id: 'tallas', label: '¿Qué tallas ofrecen?', type: 'text', placeholder: 'Ej: XS–XXL, tallas numéricas' },
      { id: 'rango_precios', label: 'Rango de precios de sus prendas', type: 'text', placeholder: 'Ej: $40.000 – $180.000' },
      { id: 'produccion', label: '¿Confeccionan a pedido o manejan stock?', type: 'select', options: ['A pedido', 'Stock', 'Ambos'], placeholder: 'Seleccionar…' },
      { id: 'capacidad', label: 'Capacidad de producción mensual aprox.', type: 'text', placeholder: 'Ej: 200 prendas/mes' },
      { id: 'tiempo_produccion', label: '¿Cuánto tarda producir una prenda?', type: 'text', placeholder: 'Ej: 3 días' },
    ],
  },
  {
    num: 3,
    slug: 'ventas',
    title: 'Canales de venta y marca',
    icon: '🛍️',
    desc: 'Dónde venden hoy, cómo quieren vender y qué material de marca tienen.',
    questions: [
      { id: 'canales_actuales', label: '¿Dónde venden hoy?', type: 'checkbox', options: ['Local físico', 'WhatsApp', 'Instagram', 'Facebook', 'TikTok', 'Marketplace', 'Otro'] },
      { id: 'canal_principal', label: '¿Qué canal les genera más ventas hoy?', type: 'text', placeholder: 'Ej: el local' },
      { id: 'venta_online', label: '¿Qué quieren en el sitio web?', type: 'select', options: ['Solo mostrar el catálogo', 'Tienda con carrito y pago en línea', 'Ambos'], placeholder: 'Seleccionar…' },
      { id: 'medios_pago', label: '¿Qué medios de pago usan / aceptarían?', type: 'checkbox', options: ['Nequi', 'Bold', 'Tarjeta de crédito/débito', 'Efectivo', 'Contraentrega', 'Otro'] },
      { id: 'envios', label: '¿Cómo manejan los envíos?', hint: 'Transportadora, cobertura, ¿cobran al cliente o los asumen ustedes?', type: 'textarea', placeholder: 'Ej: envíos por Servientrega a nivel nacional, cobramos $12.000 al cliente' },
      { id: 'marca_logo', label: '¿Tienen logo y colores definidos?', type: 'radio', options: ['Sí', 'No', 'A medio camino'] },
      { id: 'fotos', label: '¿Tienen fotos de producto? ¿Cuántas y en qué calidad?', hint: 'Celular sirve — solo queremos saber qué hay.', type: 'textarea', placeholder: 'Ej: 30 fotos de prendas, tomadas con celular' },
      { id: 'copy', label: '¿Tienen descripciones/taglines escritos?', type: 'radio', options: ['Sí', 'No', 'Algunos'] },
      { id: 'redes', label: 'Redes sociales actuales', type: 'checkbox', options: ['Instagram', 'TikTok', 'Facebook', 'Ninguna'] },
    ],
  },
  {
    num: 4,
    slug: 'alcance',
    title: 'Alcance, presupuesto y agente IA',
    icon: '🚀',
    desc: 'Qué necesitan primero, qué presupuesto manejan y los datos para el agente.',
    questions: [
      { id: 'alcance', label: '¿Qué necesitan? (marquen lo que quieran)', type: 'checkbox', options: ['Página web de presencia (catálogo + info)', 'Tienda online completa (carrito + pagos)', 'Agente IA de atención al cliente', 'Todo lo anterior'] },
      { id: 'urgencia', label: '¿Qué es lo que más les urge resolver?', type: 'text', placeholder: 'Ej: tener la tienda operativa' },
      { id: 'fecha_limite', label: '¿Tienen fecha límite o expectativa de lanzamiento?', type: 'text', placeholder: 'Ej: en 1 mes / sin fecha' },
      { id: 'plan', label: '¿Qué plan se ajusta a lo que buscan?', hint: 'Básico $200.000 · Estándar $450.000 (incluye agente IA) · Premium $800.000 (agente + soporte prioritario)', type: 'select', options: ['Básico — $200.000/mes', 'Estándar — $450.000/mes', 'Premium — $800.000/mes', 'Aún no lo sé'], placeholder: 'Seleccionar…' },
      { id: 'setup_fee', label: '¿Aceptan un costo único de implementación además de la mensualidad?', type: 'radio', options: ['Sí', 'No', 'Depende'] },
      { id: 'otras_aprobaciones', label: '¿Hay alguien más que deba aprobar el presupuesto?', type: 'text', placeholder: 'Ej: no, decido yo / sí, mi socio' },
      { id: 'dominio', label: 'Estado del dominio', hint: '¿Ya está registrado? ¿Dónde? ¿Está caído?', type: 'text', placeholder: 'Ej: lopcort.com — está caído, hay que comprarlo' },
      { id: 'hosting', label: '¿Tienen hosting o correo corporativo actual?', type: 'text', placeholder: 'Ej: no / sí, con GoDaddy' },
      { id: 'google', label: '¿Cuenta de Google (Business / Analytics)?', type: 'radio', options: ['Sí', 'No — lo creamos desde cero'] },
      { id: 'preguntas_frecuentes', label: '¿Qué preguntas les hacen más seguido los clientes?', hint: 'Tallas, precios, envíos, cambios…', type: 'textarea', placeholder: 'Ej: ¿hacen domicilios?, ¿hay cambios de talla?' },
      { id: 'politicas', label: 'Políticas: cambios, devoluciones, tallas, formas de pago', type: 'textarea', placeholder: 'Ej: cambios solo con etiqueta, no hay devolución de dinero' },
      { id: 'horarios', label: 'Horarios de atención', type: 'text', placeholder: 'Ej: lunes a sábado, 9am – 6pm' },
      { id: 'tono', label: '¿Qué tono prefieren para el agente?', type: 'radio', options: ['Formal', 'Cercano', 'Juvenil', 'No lo sé — recomienden ustedes'] },
    ],
  },
];

// Respuestas ya conocidas por cliente (se precargan en el formulario).
// Lo que el cliente respondió en chat se edita directo en el sitio y se
// persiste en KV con prioridad sobre estos defaults.
export const clientDefaults: Record<string, ClientDefaults> = {
  lopcort: {
    contacto_nombre: 'Jonathan López',
    contacto_cargo: 'Dueño',
    whatsapp: '3127201279',
    email: 'ventas@lopcort.com',
    decision: 'Jonathan (dueño)',
    ubicacion: 'Cl. 7 # 7-6, Sandoná, Nariño',
    local_fisico: 'Local físico',
    equipo: '6',
    canales_actuales: ['Local físico', 'WhatsApp'],
    canal_principal: 'El local',
    venta_online: 'Tienda con carrito y pago en línea',
    medios_pago: ['Nequi', 'Bold'],
    marca_logo: 'Sí',
    redes: ['Ninguna'],
    alcance: ['Todo lo anterior'],
    urgencia: 'Tener la tienda operativa',
    fecha_limite: 'Sin fecha límite',
    plan: 'Premium — $800.000/mes',
    setup_fee: 'Sí',
    otras_aprobaciones: 'No, decide Jonathan',
    dominio: 'lopcort.com — está caído, hay que comprarlo de nuevo',
    hosting: 'No',
    google: 'No — lo creamos desde cero',
  },
};

export function allFieldIds(): string[] {
  return onboardingSteps.flatMap((s) => s.questions.map((q) => q.id));
}
