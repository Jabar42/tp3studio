#!/usr/bin/env node
/**
 * Local lead server — proxy que recibe POST de leads y los guarda en disco.
 * Corre en segundo plano mientras desarrollas.
 *
 * Uso: node scripts/lead-server.mjs
 * Luego configura el formulario para POSTear a http://localhost:3456/api/lead
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

const server = http.createServer((req, res) => {
  // CORS para desarrollo
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/lead') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    try {
      const data = JSON.parse(body);

      if (!data.name || !data.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Name and email required' }));
        return;
      }

      const lead = {
        ...data,
        timestamp: new Date().toISOString(),
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
      };

      // Append to leads.json
      const filePath = path.join(leadsDir, 'leads.json');
      let leads = [];
      if (fs.existsSync(filePath)) {
        try {
          leads = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch {
          leads = [];
        }
      }
      leads.push(lead);
      fs.writeFileSync(filePath, JSON.stringify(leads, null, 2));

      // Individual file
      const slug = new Date().toISOString().replace(/[:.]/g, '-');
      fs.writeFileSync(
        path.join(leadsDir, `lead-${slug}.json`),
        JSON.stringify(lead, null, 2),
      );

      console.log(`[LEAD] ${data.name} — ${data.email} — ${data.business || 'N/A'}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Lead captured' }));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
});

const PORT = 3456;
server.listen(PORT, () => {
  console.log(`[Lead Server] Running on http://localhost:${PORT}`);
  console.log(`[Lead Server] Leads saved to ${leadsDir}`);
});
