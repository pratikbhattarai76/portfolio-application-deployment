import { defineMiddleware } from 'astro:middleware';

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
} as const;

export const onRequest = defineMiddleware(async (_, next) => {
  const response = await next();

  Object.entries(securityHeaders).forEach(([header, value]) => {
    if (!response.headers.has(header)) {
      response.headers.set(header, value);
    }
  });

  return response;
});
