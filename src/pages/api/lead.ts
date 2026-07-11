import type { APIRoute } from 'astro';

export const prerender = false;

async function notifyTelegram(lead: Record<string, unknown>, leadId: string, env: any) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text = [
    '📬 <b>Nuevo lead</b>',
    '',
    `<b>Nombre:</b> ${lead.name || '—'}`,
    `<b>Negocio:</b> ${lead.business || '—'}`,
    `<b>Email:</b> ${lead.email || '—'}`,
    `<b>Tel:</b> ${lead.phone || '—'}`,
    lead.website ? `<b>Web:</b> ${lead.website}` : '',
    lead.message ? `\n<i>${String(lead.message).slice(0, 200)}</i>` : '',
    '',
    `<code>${leadId}</code>`,
  ].filter(Boolean).join('\n');

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
  } catch {
    // Non-blocking: lead is already stored in KV
  }
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();

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
    await locals.runtime.env.SESSION.put(leadId, JSON.stringify(lead));

    // Instant Telegram notification
    locals.runtime.ctx.waitUntil(notifyTelegram(lead, leadId, locals.runtime.env));

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
