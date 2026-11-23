# BizWell Studio (Astro)

Static rebuild of bizwellstudio.com for INNHotels and Citrus Pie Media. Home, films, library and contact, in the DeerDesigner Option 2 look (ticket #38841). No membership, login or signup.

- `npm run build` outputs `dist/`. Set `SITE_URL` to the host it is served from. Any host other than bizwellstudio.com builds as noindex with a closed robots.txt.
- Content lives in `src/data/` (library.json, films.json, films_raw.json, topics.json, site.json). `scripts/prep.py` regenerates the library and film data from a harvest of the WordPress site.
- Videos play from YouTube through a click-to-load player. The four full films are not included: the masters were lost when the Bunny Stream library was purged, so film pages show trailers only.
- Old addresses are kept: `/film/<slug>/`, `/videos/<slug>/`, `/podcasts/<slug>/`.

Not built yet: blog, privacy and terms, topic page redirects, contact form.
