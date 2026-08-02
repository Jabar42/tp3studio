import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

// Horario de atención: lunes a viernes 09:00 - 18:00, bloques de 30 min.
const WEEKDAYS = [1, 2, 3, 4, 5];
const START_MIN = 9 * 60;
const END_MIN = 18 * 60;
const SLOT_MIN = 30;
const MAX_BODY_BYTES = 25_000;

const SERVICES = ['landing', 'sitio-completo', 'ecommerce', 'agente-ia', 'auditoria', 'otro'];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSlotTime(t: string): boolean {
  const m = /^(\d{2}):(\d{2})$/.exec(t);
  if (!m) return false;
  const mins = Number(m[1]) * 60 + Number(m[2]);
  return mins >= START_MIN && mins + SLOT_MIN <= END_MIN && Number(m[2]) % 30 === 0;
}

async function notifyTelegram(name: string, email: string, phone: string, service: string, date: string, time: string, notes: string) {
  const token = env.TELEGRAM_BOT_TOKEN as string;
  const chatId = env.TELEGRAM_CHAT_ID as string;
  if (!token || !chatId) {
    console.warn('[BOOKINGS] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID no configurados — se omite notificación');
    return;
  }
  const text = [
    `📅 <b>Nueva cita</b>`,
    `👤 ${escapeHtml(name)}`,
    `✉️ ${escapeHtml(email)}`,
    `📱 WhatsApp: ${escapeHtml(phone || '—')}`,
    `💼 ${escapeHtml(service)}`,
    `🗓 ${escapeHtml(date)} ${escapeHtml(time)}`,
    `📝 ${escapeHtml(notes || '—')}`,
  ].join('\n');

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    signal: controller.signal,
  }).catch((e) => console.error('[BOOKINGS] Telegram error:', e));
  clearTimeout(timeout);
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const status = url.searchParams.get('status') || '';
    const date = url.searchParams.get('date') || '';
    let sql = 'SELECT * FROM bookings WHERE 1=1';
    const params: string[] = [];
    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }
    if (date) {
      sql += ' AND date = ?';
      params.push(date);
    }
    sql += ' ORDER BY date DESC, time DESC LIMIT 100';

    const { results } = await env.DB.prepare(sql)
      .bind(...params)
      .all();

    return new Response(JSON.stringify({ bookings: results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[BOOKINGS] GET Error:', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return new Response(JSON.stringify({ error: 'Payload too large' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      service?: string;
      date?: string;
      time?: string;
      notes?: string;
    };

    const name = (body.name || '').toString().trim().slice(0, 120);
    const email = (body.email || '').toString().trim().slice(0, 200);
    const phone = (body.phone || '').toString().trim().slice(0, 40);
    const service = (body.service || '').toString().trim().toLowerCase().slice(0, 40);
    const date = (body.date || '').toString().trim();
    const time = (body.time || '').toString().trim();
    const notes = (body.notes || '').toString().trim().slice(0, 500);

    // Validaciones
    const problems: string[] = [];
    if (!name) problems.push('name es obligatorio');
    if (!email) problems.push('email es obligatorio');
    else if (!isValidEmail(email)) problems.push('email con formato inválido');
    if (!SERVICES.includes(service)) problems.push(`service debe ser uno de: ${SERVICES.join(', ')}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) problems.push('date en formato YYYY-MM-DD');
    else {
      const d = new Date(`${date}T12:00:00-05:00`);
      if (Number.isNaN(d.getTime())) problems.push('date inválida');
      else if (!WEEKDAYS.includes(d.getDay())) problems.push('solo lunes a viernes');
    }
    if (!isSlotTime(time)) problems.push('time debe ser HH:MM en bloques de 30 min dentro de 09:00-17:30');

    if (problems.length) {
      return new Response(JSON.stringify({ error: problems.join('; ') }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Slot libre
    const existing = await env.DB.prepare(
      `SELECT id FROM bookings WHERE date = ? AND time = ? AND status = 'confirmed'`,
    )
      .bind(date, time)
      .first();
    if (existing) {
      return new Response(JSON.stringify({ error: `el horario ${date} ${time} ya está reservado` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Crear cita (uuid v4 simple sin dependencias)
    const id = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO bookings (id, name, email, phone, service, date, time, notes, source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'webchat')`,
    )
      .bind(id, name, email, phone, service, date, time, notes)
      .run();

    // Notificación Telegram — await obligatorio (Cloudflare cancela promesas no esperadas)
    await notifyTelegram(name, email, phone, service, date, time, notes);

    console.log(`[BOOKINGS] ${id} — ${name} ${date} ${time} ${service}`);
    return new Response(JSON.stringify({ success: true, booking: { id, name, email, phone, service, date, time, notes } }),
      { status: 201, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('[BOOKINGS] POST Error:', error);
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
