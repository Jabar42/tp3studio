#!/usr/bin/env node
/**
 * Lead Saver — proceso en segundo plano que lee el log de Astro y guarda leads.
 *
 * Como el endpoint de Astro funciona pero en Cloudflare Workers no hay
 * filesystem persistente, este script es para desarrollo local.
 * En producción, los leads se pueden leer desde Cloudflare Logs o
 * migrar a KV/supabase.
 *
 * USO:
 *   1. npm run dev    (en otra terminal)
 *   2. node scripts/lead-saver.mjs
 *   3. Los leads se guardan en leads/leads.json
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const leadsDir = path.resolve(__dirname, '..', 'leads');

if (!fs.existsSync(leadsDir)) {
  fs.mkdirSync(leadsDir, { recursive: true });
}

function saveLead(lead) {
  const filePath = path.join(leadsDir, 'leads.json');
  let leads = [];
  if (fs.existsSync(filePath)) {
    try {
      leads = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch { leads = []; }
  }
  leads.push(lead);
  fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));

  const slug = new Date().toISOString().replace(/[:.]/g, '-');
  fs.writeFileSync(
    path.join(leadsDir, `lead-${slug}.json`),
    JSON.stringify(lead, null, 2),
  );

  console.log(`[Lead Saver] ${lead.name} — ${lead.email} (${new Date().toLocaleString('es-CO')})`);
}

// Si recibe un argumento JSON por línea de comandos, guarda y sale
const input = process.argv[2];
if (input) {
  try {
    saveLead(JSON.parse(input));
  } catch {
    console.error('Usage: node lead-saver.mjs \'{"name":"...","email":"..."}\'');
  }
  process.exit(0);
}

// Modo servidor HTTP
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
  if (req.method !== 'POST' || req.url !== '/api/lead') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' })); return;
  }

  let body = '';
  req.on('data', c => body += c);
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      if (!data.name || !data.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Name and email required' }));
        return;
      }
      saveLead({
        ...data,
        timestamp: new Date().toISOString(),
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
});

const PORT = 3456;
server.listen(PORT, () => {
  console.log(`[Lead Saver] Server on http://localhost:${PORT}`);
  console.log(`[Lead Saver] Saving to ${leadsDir}`);
});
