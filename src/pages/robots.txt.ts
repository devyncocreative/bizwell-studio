import type { APIRoute } from 'astro';
import { isLive } from '../lib/site';
export const GET: APIRoute = ({ site }) =>
  new Response(isLive(site) ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site)}\n` : 'User-agent: *\nDisallow: /\n');
