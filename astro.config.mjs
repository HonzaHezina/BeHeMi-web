// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Nutné pro canonical <link>, sitemap a absolutní OG/hreflang URL.
  site: 'https://bohemi.fit',

  // Google zná URL s lomítkem i bez (viz docs/redirect-map.md) — sjednoceno
  // na variantu s lomítkem, ať nevznikají nové duplicity v indexu.
  trailingSlash: 'always',

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'cs',
        locales: { cs: 'cs-CZ', en: 'en-US' },
      },
    }),
  ],

  // ───────────────────────────────────────────────────────────────
  // 301 REDIRECT MAPA — implementováno 1. 8. 2026 z reálné GSC mapy
  // (docs/redirect-map.md + _raw/bohemi-migrace.zip). Astro static output
  // generuje pro každý záznam HTML stránku s meta-refresh + canonical, ne
  // skutečnou host-level 301 — nginx v Coolify to zatím neřeší (repo tam
  // nemá přístup), takže tohle je aktuálně jediná realizovatelná cesta.
  // Zdroj pravdy zůstává `docs/redirect-map.md` — NEVYMÝŠLET nové položky,
  // jen reálně potvrzené staré URL.
  //
  // ZÁMĚRNĚ VYNECHÁNO (cíl ještě není rozhodnutý/ověřitelný, viz redirect-map.md):
  //   /scioalaputyka/            — neznámý obsah, čeká na Honzu
  //   /feed/                     — má být 410, Astro redirects neumí jiný status než 3xx
  //   /?page_id=3, .../?level=4  — Astro redirects matchuje jen cestu, ne query string
  //   /wp-content/uploads/*      — potřeba zkopírovat starou složku do public/, čeká na zálohu
  redirects: {
    '/rezervace/': 'https://studio.bohemi.fit/',
    '/login/': 'https://studio.bohemi.fit/login/',
    '/ucet-clenstvi/platba-clenstvi/': 'https://studio.bohemi.fit/ucet-clenstvi/platba-clenstvi/',
    '/provozni-rad': 'https://studio.bohemi.fit/provozni-rad/',
    '/vseobecne-obchodni-podminky/': 'https://studio.bohemi.fit/vseobecne-obchodni-podminky/',
    '/zpracovani-osobnich-udaju/': 'https://studio.bohemi.fit/zpracovani-osobnich-udaju/',
    '/privacy-policy/': 'https://studio.bohemi.fit/zpracovani-osobnich-udaju/',
    '/obchodni-podminky-pronajmu-prostor/': 'https://studio.bohemi.fit/obchodni-podminky-pronajmu-prostor/',
    '/obchodni-podminky-akademie-clp/': 'https://studio.bohemi.fit/obchodni-podminky-akademie-clp/',

    '/o-nas/': '/proc-bohemi/',
    '/nase-sluzby/': '/lekce-a-sluzby/',
    '/nase-sluzby/osobni-treninky/': '/osobni-treninky/',
    '/nase-sluzby/skupinove-lekce/': '/skupinove-lekce/',
    '/nase-sluzby/skupinove-lekce/hiit/': '/skupinove-lekce/#hiit',
    '/nase-sluzby/meditace/': '/lekce-a-sluzby/',
    '/pripravujeme/': '/lekce-a-sluzby/',
    '/mkb/': '/lekce-a-sluzby/',
    '/spoluprace/': '/kontakt/',
    '/blog/': '/',
    '/ai-a-bohemi/': '/',
    '/informace/vylepsujeme/': '/',
    '/informace/benefity/': '/cenik/',
    '/informace/fotobiomodulacni-terapie/': '/fotobiomodulacni-terapie/',
    '/fitteams-program-pro-firmy/': '/firmy/',
    '/kalendar/': '/skupinove-lekce/',
    '/ucet-clenstvi/cenik/': '/cenik/',
    '/ucet-clenstvi/urovne-clenstvi/': '/cenik/',

    // Trenéři — staré profily bývalých trenérek, kotva jen tam, kde je trenér/ka pořád v týmu
    '/lenka-novackova/': '/treneri/',
    '/klara-sauerova/': '/treneri/',
    '/lucie-bierhausova/': '/treneri/',
    '/treneri-2/': '/treneri/',
    '/klara-mechurova/': '/treneri/#klara-mechurova',

    // Kroužky pro děti — žádná z aktivit nemá vlastní stránku, jen kotvy
    '/informace/cirkusova-skola/': '/krouzky-pro-deti/',
    '/akademie-cirk-la-putyka/': '/krouzky-pro-deti/',
    '/informace/kurzy-pro-deti/': '/krouzky-pro-deti/',
    '/detska-zumba/': '/krouzky-pro-deti/#detska-zumba',
    '/hernicka/': '/krouzky-pro-deti/#objevovarna',
    '/primestsky-tabor/': '/krouzky-pro-deti/',
    '/primestsky-tabor-aktivitaci/': '/krouzky-pro-deti/',

    // Hula hoop skončil natrvalo (rozhodnuto 7. 7. 2026, cíl potvrzen 1. 8. 2026)
    '/hula-hoop/': '/skupinove-lekce/',
    '/hooping/': '/skupinove-lekce/',
  },

  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()]
  }
});