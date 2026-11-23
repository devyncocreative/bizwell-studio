import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import { readFileSync } from 'node:fs';
const J = (f) => JSON.parse(readFileSync(new URL('./src/data/' + f, import.meta.url)));
const topics = J('topics.json').map((t) => t.slug), places = J('places.json');
const r = {};
const to = (dest, ...paths) => paths.forEach((p) => (r[p] = dest));
to('/library/?type=podcast', '/podcasts/');
to('/library/?type=video', '/videos/');
to('/film/', '/films/', '/events/');
to('/contact-us/', '/contact/', '/contact-us/support/');
to('/library/', '/media/', '/courses/', '/programs/', '/resources/', '/dashboard/', '/dashboard/my-profile/', '/login/', '/free-registration/', '/founders-club-offer/', '/founders-club-checkout/', '/refer-a-friend/', '/category/community/', '/category/sponsored/');
to('/', '/innhotels-contest/', '/innhotels-contest-rules-2022/');
to('/privacy-policy/', '/terms-conditions/', '/refund_returns/');
to('/library/?topic=business-and-life-coaches', '/category/business-coaches/');
for (const c of ['boating-lifestyle', 'car-dealers', 'government-and-non-profit', 'products', 'rv-lifestyle', 'small-towns', 'trailblazers', 'wellness']) to(`/library/?topic=${c}`, `/category/${c}/`);
for (const t of topics) to(`/library/?topic=${t}`, `/business-topic/${t}/`);
for (const p of places) to(`/library/?q=${p.replace(/-/g, '+')}`, `/place/${p}/`);
for (const t of ['actor', 'authenticity-coach', 'future-of-fungi', 'health', 'human-behaviour-specialist', 'innovation', 'natural-supplements', 'psychedelic-mushroom-experts', 'table-tennis-legend', 'the-butterfly-effect']) to('/library/?type=podcast', `/tag/${t}/`);
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const site = process.env.SITE_URL || env.SITE_URL || 'https://bizwell-astro.1wp.site';
export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: r,
});
