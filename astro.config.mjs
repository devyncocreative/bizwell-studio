import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
const site = process.env.SITE_URL || env.SITE_URL || 'https://bizwell-astro.1wp.site';
export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: {
    '/podcasts/': '/library/?type=podcast',
    '/videos/': '/library/?type=video',
    '/films/': '/film/',
    '/contact/': '/contact-us/',
  },
});
