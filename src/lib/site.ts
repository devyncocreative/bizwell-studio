import site from '../data/site.json';
import filmsMeta from '../data/films.json';
import filmsRaw from '../data/films_raw.json';
import library from '../data/library.json';
import topics from '../data/topics.json';
import blog from '../data/blog.json';
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('../assets/img/*', { eager: true, import: 'default' });
export function img(name?: string): ImageMetadata | undefined {
  if (!name) return undefined;
  return files[`../assets/img/${name}`];
}
export const isLive = (u?: URL) => !!u && u.host === site.liveHost;
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const films = filmsMeta.map((m) => ({ ...filmsRaw.find((r) => r.slug === m.slug)!, ...m }));
export const itemHref = (i: { kind: string; slug: string }) =>
  i.kind === 'post' ? `/${i.slug}/` : i.kind === 'film' ? `/film/${i.slug}/` : i.kind === 'podcast' ? `/podcasts/${i.slug}/` : `/videos/${i.slug}/`;
export const fmtDate = (d: string) =>
  new Date(d + 'T12:00:00Z').toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
export const kindLabel = (k: string) => (k === 'post' ? 'Article' : k === 'podcast' ? 'Interview' : k === 'film' ? 'Film' : 'Business story');
export { site, library, topics, blog };
