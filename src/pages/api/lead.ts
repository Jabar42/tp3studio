import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    let body: Record<string, unknown> = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await request.json() as Record<string, unknown>;
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => { body[key] = value; });
    }

    if (!body || !body.name || !body.email) {
      return new Response(
        JSON.stringify({ success: false, message: 'Name and email required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const lead = {
      ...body,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Store in KV
    const leadId = `lead:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    await env.SESSION.put(leadId, JSON.stringify(lead));

    // Telegram notification (fire and forget)
    const token = env.TELEGRAM_BOT_TOKEN as string;
    const chatId = env.TELEGRAM_CHAT_ID as string;
    if (token && chatId) {
      const text = [
        '\u{1F4EC} <b>Nuevo lead</b>',
        '',
        `<b>Nombre:</b> ${lead.name || '\u2014'}`,
        `<b>Negocio:</b> ${lead.business || '\u2014'}`,
        `<b>Email:</b> ${lead.email || '\u2014'}`,
        `<b>Tel:</b> ${lead.phone || '\u2014'}`,
        lead.website ? `<b>Web:</b> ${lead.website}` : '',
        lead.message ? `\n<i>${String(lead.message).slice(0, 200)}</i>` : '',
        '',
        `<code>${leadId}</code>`,
      ].filter(Boolean).join('\n');

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
        signal: controller.signal,
      }).catch(() => {});
      clearTimeout(timeout);
    }

    console.log('[LEAD] Stored:', leadId);

    return new Response(
      JSON.stringify({ success: true, message: 'Lead stored', id: leadId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('[LEAD] Error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    );
  }
};
