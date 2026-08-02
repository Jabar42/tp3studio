import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = params.id || '';
    if (!id) {
      return new Response(JSON.stringify({ error: 'id requerido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const result = await env.DB.prepare(
      `UPDATE bookings SET status = 'cancelled' WHERE id = ?`,
    )
      .bind(id)
      .run();
    if (result.meta.changes === 0) {
      return new Response(JSON.stringify({ error: 'booking no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[BOOKINGS] DELETE Error:', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
