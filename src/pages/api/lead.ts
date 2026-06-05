import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
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

    console.log('[LEAD] Captured:', JSON.stringify(lead));

    return new Response(
      JSON.stringify({ success: true, message: 'Lead captured' }),
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
