import type { APIRoute } from 'astro';
import { films, library, itemHref } from '../lib/site';
export const GET: APIRoute = ({ site }) => {
  const paths = ['/', '/film/', '/library/', '/contact-us/', ...films.map((f) => `/film/${f.slug}/`), ...library.map(itemHref)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `<url><loc>${new URL(p, site)}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
