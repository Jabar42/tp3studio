import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

// Horario de atención: lunes a viernes 09:00 - 18:00, bloques de 30 min.
const WEEKDAYS = [1, 2, 3, 4, 5]; // 1=Monday ... 5=Friday
const START_MIN = 9 * 60; // 09:00
const END_MIN = 18 * 60; // 18:00 (último slot empieza 17:30)
const SLOT_MIN = 30;

function slotTimes(): string[] {
  const slots: string[] = [];
  for (let m = START_MIN; m + SLOT_MIN <= END_MIN; m += SLOT_MIN) {
    const hh = String(Math.floor(m / 60)).padStart(2, '0');
    const mm = String(m % 60).padStart(2, '0');
    slots.push(`${hh}:${mm}`);
  }
  return slots;
}

export const GET: APIRoute = async ({ url }) => {
  try {
    const date = url.searchParams.get('date') || '';
    // Validar formato YYYY-MM-DD y día hábil
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!match) {
      return new Response(JSON.stringify({ error: 'date requerido en formato YYYY-MM-DD' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const d = new Date(`${date}T12:00:00-05:00`); // mediodía evita edge cases de DST
    if (Number.isNaN(d.getTime())) {
      return new Response(JSON.stringify({ error: 'fecha inválida' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!WEEKDAYS.includes(d.getDay())) {
      return new Response(JSON.stringify({ error: 'solo se atiende lunes a viernes' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Ocupados de D1
    const { results } = await env.DB.prepare(
      `SELECT time FROM bookings WHERE date = ? AND status = 'confirmed'`,
    )
      .bind(date)
      .all<{ time: string }>();

    const taken = new Set(results.map((r) => r.time));
    const available = slotTimes().filter((t) => !taken.has(t));

    return new Response(JSON.stringify({ date, available }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[SLOTS] Error:', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
