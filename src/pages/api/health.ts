import type { APIRoute } from 'astro';

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });

export const GET: APIRoute = () =>
  json(200, {
    ok: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
