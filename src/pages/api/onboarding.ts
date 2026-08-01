import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { onboardingSteps, allFieldIds } from '../../data/onboarding';

export const prerender = false;

const MAX_BODY_BYTES = 25_000;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Lee todas las preguntas en orden con su paso, para armar el resumen Telegram.
function fieldMeta() {
  const meta = new Map<string, { step: number; label: string }>();
  for (const step of onboardingSteps) {
    for (const q of step.questions) {
      meta.set(q.id, { step: step.num, label: q.label });
    }
  }
  return meta;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return new Response(JSON.stringify({ success: false, message: 'Payload too large' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = (await request.json()) as {
      cliente?: string;
      step?: number;
      respuestas?: Record<string, unknown>;
      final?: boolean;
    };

    const cliente = (body.cliente || 'anon').toString().slice(0, 40).toLowerCase();
    const step = Number(body.step) || 0;
    const respuestas = body.respuestas && typeof body.respuestas === 'object' ? body.respuestas : {};
    const isFinal = body.final === true;

    // Sanitiza: solo campos del cuestionario, solo strings o arrays de strings
    const validIds = new Set(allFieldIds());
    const clean: Record<string, string | string[]> = {};
    for (const [key, value] of Object.entries(respuestas)) {
      if (!validIds.has(key)) continue;
      if (typeof value === 'string') {
        clean[key] = value.slice(0, 2000);
      } else if (Array.isArray(value)) {
        clean[key] = value
          .filter((v): v is string => typeof v === 'string')
          .map((v) => v.slice(0, 200))
          .slice(0, 20);
      }
    }

    const kvKey = `onboarding:${cliente}`;

    // Merge con lo ya guardado (persistencia entre pasos y entre visitas)
    let prev: Record<string, unknown> = {};
    try {
      const raw = await env.SESSION.get(kvKey);
      if (raw) prev = JSON.parse(raw);
    } catch {
      /* si falla la lectura, arranca vacío */
    }
    const merged: Record<string, unknown> = { ...prev, ...clean, _meta: { updated_at: new Date().toISOString(), last_step: step } };

    await env.SESSION.put(kvKey, JSON.stringify(merged));

    // Al completar el cuestionario: notificación Telegram (fire and forget)
    if (isFinal) {
      const token = env.TELEGRAM_BOT_TOKEN as string;
      const chatId = env.TELEGRAM_CHAT_ID as string;
      if (token && chatId) {
        const meta = fieldMeta();
        const lines: string[] = [`📋 <b>Onboarding completado</b> — ${escapeHtml(cliente)}`, ''];

        let currentStep = 0;
        for (const id of allFieldIds()) {
          const m = meta.get(id);
          if (!m) continue;
          if (m.step !== currentStep) {
            const stepTitle = onboardingSteps[m.step - 1]?.title;
            if (currentStep > 0) lines.push('');
            lines.push(`<b>— ${stepTitle} —</b>`);
            currentStep = m.step;
          }
          const value = merged[id];
          let text: string;
          if (Array.isArray(value)) {
            text = value.length ? value.join(', ') : '—';
          } else if (typeof value === 'string' && value.trim()) {
            text = value.trim();
          } else {
            text = '—';
          }
          lines.push(`<b>${escapeHtml(m.label)}:</b> ${escapeHtml(text).slice(0, 400)}`);
        }

        lines.push('', `<code>${kvKey}</code>`);
        const text = lines.join('\n').slice(0, 3800);

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
    }

    console.log(`[ONBOARDING] ${cliente} paso ${step}${isFinal ? ' (final)' : ''} guardado en ${kvKey}`);
    return new Response(
      JSON.stringify({ success: true, message: isFinal ? 'Onboarding guardado' : 'Progreso guardado', key: kvKey }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('[ONBOARDING] Error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
