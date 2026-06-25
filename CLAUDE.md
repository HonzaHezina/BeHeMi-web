# BoHeMi web — pravidla projektu

> Tento soubor je závazný pro Claude Code. GitHub Copilot čte zkrácenou verzi
> v `.github/copilot-instructions.md`. **Design tokeny žijou pouze v
> `design-system/MASTER.md`** — oba nástroje z něj čerpají, aby se barvy a fonty
> nikdy nerozešly.

## Co tohle repo je

Statický prezentační web studia **BoHeMi fitness** (Vinohrady, Praha).
Stack: **Astro + Tailwind CSS v4** (konfigurace přes `@tailwindcss/vite` v
`astro.config.mjs`; tokeny v `@theme` v `src/styles/global.css`, žádný
`tailwind.config.js`). Žádný backend, žádná databáze, žádná build-time
logika navíc, než co Astro generuje.

Tohle repo je **prezentační vrstva vedle WordPressu**, ne náhrada celého webu.
Rezervace, login, členství, platby a admin zůstávají ve WordPressu na subdoméně
`rezervace.bohemi.fit`. Sem nikdy nepatří.

Značka: **BoHeMi = Body – Health – Mind.** Komunitní studio, lidskost, žádná
anonymita ani tlak. Není to spa, není to ezoterika, není to „sekta", není to
luxusní wellness. Tělo jako cesta k síle, zdraví a klidu.

## Tvrdá pravidla (neporušitelná)

1. **Statika only.** Nepiš žádný rezervační/platební/přihlašovací formulář,
   který něco odesílá do systému. Pokud něco potřebuje stav uživatele, kapacitu
   lekce, platbu nebo storno → **to není stránka, to je WordPress.**
2. **Booking = odkaz ven.** Každé tlačítko „Rezervovat" je `<a>` na
   `https://rezervace.bohemi.fit/` (případně konkrétní lekci). Nikdy iframe,
   nikdy vlastní formulář.
3. **URL se nemění.** Slugy musí přesně odpovídat současnému webu (viz seznam
   níž). Nová stránka jen po explicitním rozhodnutí. Změněná URL = 301 redirect,
   ne tichá změna.
4. **Barvy a fonty jen z tokenů.** Nikdy nehardcoduj hex barvu ani název fontu
   přímo do komponenty. Tokeny jsou definované v `design-system/MASTER.md` a
   žijou v kódu jako CSS proměnné v `@theme` bloku v `src/styles/global.css`
   (Tailwind v4 — žádný `tailwind.config.js` se nepoužívá). V komponentách ber
   barvy/fonty přes tyto tokeny / Tailwind utility, ne natvrdo. Když token
   chybí — **zeptej se, nevymýšlej.**
5. **SEO basics na každé stránce.** Jeden `<h1>`, smysluplný `<title>` a
   `meta description`, sémantické nadpisy, alt texty u obrázků.
6. **Jazyk webu je čeština.** (EN mutace případně později, ne teď.)

## Anti-cíle (čeho se vědomě vyvarovat)

- Nevést web žádnou externí knihou, kurzem ani autoritou. Hero = Body–Health–Mind
  a komunita, ne odkaz na cizí zdroj.
- Žádná obranná sekce typu „nejsme sekta" — když web nevede ezoterikou, není co
  obhajovat.
- Žádná spa/wellness pastelová estetika (růžová + šalvějová + zlatá),
  žádné elegantní serify, žádné AI fialové gradienty. Detaily v MASTER.md.

## Inventář stránek (slugy = ponechat)

> ⚠️ Slugy potvrď proti reálné `sitemap.xml` / Google Search Console **dříve**,
> než začneš stavět. Tento seznam je provizorní z indexu.

| Stránka | Slug |
|---|---|
| Homepage | `/` |
| Skupinové lekce | `/skupinove-lekce/` |
| Kroužky pro děti | `/krouzky-pro-deti/` |
| Objevovárna | `/objevovarna/` |
| Fotobiomodulační terapie | `/fotobiomodulacni-terapie/` |
| Osobní trenér | `/osobni-trener/` |
| OpenGym | `/open-gym/` |
| Pronájem sálu | `/pronajem-salu/` |
| FitTym pro firmy | `/firmy/` |
| Ceník („Za kolik to máme") | `/cenik/` *(slug ověřit — možná `/za-kolik-to-mame/`)* |
| Trenéři | `/treneri/` |
| Fotky | `/fotky/` |
| Spolupráce | `/spoluprace/` |
| Kontakt | `/kontakt/` |
| Novinky | `/blog/` |
| Seznamte se s námi | *(slug ověřit)* |

Mimo repo (WordPress, neřešíš tady): `/rezervace/` → 301 na
`rezervace.bohemi.fit`, „Můj účet" / login / členství.

Při redesignu zvaž **redukci menu** — dnes má 20+ položek. Rozhodnutí, co
zůstává v hlavní navigaci, dělá Honza, ne nástroj.

## Jak pracovat

- Stránku po stránce, malé commity, jedna stránka = jeden smysluplný commit.
- Před každou stránkou si přečti `design-system/MASTER.md` a případný
  `design-system/pages/<slug>.md` (override má přednost před MASTER).
- Když narazíš na rozhodnutí o značce, obsahu nebo struktuře menu — **navrhni a
  zeptej se**, nerozhoduj za Honzu.

## Vývoj (Astro)

Dev server spouštěj v background módu, ať neblokuje session:

```
astro dev --background
```

Správa běžícího serveru: `astro dev stop`, `astro dev status`, `astro dev logs`.

## Dokumentace

Plná dokumentace: https://docs.astro.build

Než sáhneš na související oblast, projdi příslušný guide:

- Stránky, dynamické routy, middleware: https://docs.astro.build/en/guides/routing/
- Astro komponenty: https://docs.astro.build/en/basics/astro-components/
- React/Vue/Svelte komponenty uvnitř Astra (islands): https://docs.astro.build/en/guides/framework-components/
- Content collections (správa obsahu): https://docs.astro.build/en/guides/content-collections/
- Styly a Tailwind: https://docs.astro.build/en/guides/styling/
- Vícejazyčnost (případná EN mutace později): https://docs.astro.build/en/guides/internationalization/
