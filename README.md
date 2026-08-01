# BoHeMi web

Statický prezentační web studia **BoHeMi fitness** (Vinohrady, Praha).
Stack: **Astro + Tailwind CSS v4**. Pravidla projektu viz [`CLAUDE.md`](./CLAUDE.md),
design tokeny v [`design-system/MASTER.md`](./design-system/MASTER.md).

## Vývoj

```bash
npm install
npm run dev      # dev server
npm run build    # produkční build do dist/
```

## Indexace a prostředí — `PUBLIC_SITE_ENV`

Web je pro vyhledávače **indexovatelný jen v produkci**. Řídí to proměnná
`PUBLIC_SITE_ENV`:

| `PUBLIC_SITE_ENV` | Chování |
|---|---|
| `production` | indexovatelné (bez `robots` meta) |
| cokoliv jiného (`staging`, `preview`, …) | `<meta name="robots" content="noindex,nofollow">` |
| **nenastaveno** | **noindex,nofollow** (bezpečný default) |

Logika je v [`src/layouts/Layout.astro`](./src/layouts/Layout.astro). Default je
záměrně noindex, aby staging (`bohemi.hezina.cz`) nikdy neproklouzl do Googlu.

> ⚠️ **Produkční deploy (`bohemi.fit`) MUSÍ mít `PUBLIC_SITE_ENV=production`,
> jinak bude celý web `noindex` a vypadne z vyhledávání.**
>
> **Tohle není teoretické riziko — přesně tohle bylo živé na produkci
> 1. 8. 2026** (proměnná v Coolify nebyla nastavená jako Build Variable, celý
> `bohemi.fit` vracel `noindex,nofollow`). Po každém redeploy migrace/
> proměnných ověř curlem, že tam `noindex` NENÍ:
> `curl -s https://bohemi.fit/ | grep -i 'name="robots"'` (prázdný výstup = OK).

### Kde to nastavit v Coolify

Coolify → projekt webu → **Environment Variables**:

- **Produkce (`bohemi.fit`):** přidej `PUBLIC_SITE_ENV=production`.
- **Staging (`bohemi.hezina.cz`):** `PUBLIC_SITE_ENV=staging` (nebo nech
  nenastavené — default je stejně noindex).

Proměnná musí být dostupná v **build** kroku (Astro ji zapéká do statického
HTML při `npm run build`). V Coolify proto musí být označená jako **Build
Variable** / „Available at Buildtime" — ne jen runtime. Prefix `PUBLIC_`
zajišťuje, že ji Astro/Vite vůbec vystaví do klientského výstupu.

## Google Analytics 4 — `PUBLIC_GA4_ID`

GA4 (`gtag.js`) se vloží jen když je nastavená `PUBLIC_GA4_ID` (formát
`G-XXXXXXXXXX`) **a zároveň** `PUBLIC_SITE_ENV=production` — stejná Build
Variable logika jako výš. Bez proměnné se nic nenačítá (žádný placeholder ID
v kódu). Logika je v [`src/layouts/Layout.astro`](./src/layouts/Layout.astro).

## Nasazení (Coolify na Hetzneru)

Web běží jako statika (`output: static` → `dist/`). Nastavení viz `CLAUDE.md`
sekce „Nasazení".
