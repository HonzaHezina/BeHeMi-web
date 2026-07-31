// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Nutné pro canonical <link>, sitemap a absolutní OG/hreflang URL.
  site: 'https://bohemi.fit',

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'cs',
        locales: { cs: 'cs-CZ', en: 'en-US' },
      },
    }),
  ],

  // ───────────────────────────────────────────────────────────────
  // 301 REDIRECT MAPA — konsolidace menu (staré slugy → nové cíle).
  // TODO(Honza): doplnit, AŽ přijde reálný seznam starých URL ze Search
  // Console / staré sitemap.xml. NEVYMÝŠLET cesty — jen reálně existující.
  //
  // Formát (statický build vygeneruje pro každý záznam přesměrovací stránku):
  //   '/stara-url/': '/novy-cil/',
  //   '/dalsi-stara/': { status: 301, destination: '/lekce-a-sluzby/#pro-deti' },
  //
  // Kandidáti k ověření (z původního indexu v CLAUDE.md — slug i cíl POTVRDIT):
  //   /skupinove-lekce/, /krouzky-pro-deti/, /objevovarna/,
  //   /fotobiomodulacni-terapie/, /osobni-trener/, /open-gym/, /pronajem-salu/,
  //   /firmy/, /treneri/, /fotky/, /spoluprace/, /blog/, /za-kolik-to-mame/
  //
  // Pozn.: /rezervace/ obsluhuje WordPress (studio.bohemi.fit/), NE tady.
  // Pokud poběží redirecty na host-level (nginx v Coolify), tahle mapa zůstane
  // prázdná a místo se přesune do nginx configu — rozhodne se při dodání dat.
  redirects: {
    // zatím prázdné — viz TODO výš
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