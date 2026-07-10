import type { APIRoute } from 'astro';

export const prerender = false;

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

    // Store in KV (SESSION namespace reused for leads)
    const leadId = `lead:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    await locals.runtime.env.SESSION.put(leadId, JSON.stringify(lead));

    console.log('[LEAD] Stored in KV:', leadId);

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
