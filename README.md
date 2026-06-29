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

### Kde to nastavit v Coolify

Coolify → projekt webu → **Environment Variables**:

- **Produkce (`bohemi.fit`):** přidej `PUBLIC_SITE_ENV=production`.
- **Staging (`bohemi.hezina.cz`):** `PUBLIC_SITE_ENV=staging` (nebo nech
  nenastavené — default je stejně noindex).

Proměnná musí být dostupná v **build** kroku (Astro ji zapéká do statického
HTML při `npm run build`). V Coolify proto musí být označená jako **Build
Variable** / „Available at Buildtime" — ne jen runtime. Prefix `PUBLIC_`
zajišťuje, že ji Astro/Vite vůbec vystaví do klientského výstupu.

## Nasazení (Coolify na Hetzneru)

Web běží jako statika (`output: static` → `dist/`). Nastavení viz `CLAUDE.md`
sekce „Nasazení".
