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
Rezervace, login, členství, platby a admin zůstávají ve WordPressu pod
`bohemi.fit/rezervace/`. Sem nikdy nepatří.

Značka: **BoHeMi = Body – Health – Mind.** Komunitní studio, lidskost, žádná
anonymita ani tlak. Není to spa, není to ezoterika, není to „sekta", není to
luxusní wellness. Tělo jako cesta k síle, zdraví a klidu.

## Tvrdá pravidla (neporušitelná)

1. **Statika only.** Nepiš žádný rezervační/platební/přihlašovací formulář,
   který něco odesílá do systému. Pokud něco potřebuje stav uživatele, kapacitu
   lekce, platbu nebo storno → **to není stránka, to je WordPress.**
2. **Booking = odkaz ven.** Každé tlačítko „Rezervovat" je `<a>` na
   `https://bohemi.fit/rezervace/` (případně konkrétní lekci). Nikdy iframe,
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
6. **Jazyk webu je čeština.** EN mutace existuje pod `/en/` pro část stránek
   (texty v `src/data/home.en.ts` + `src/i18n/ui.ts`). Dětské stránky jsou zatím
   jen česky — EN na ně odkazuje českým slugem. Novou stránku stav česky, EN
   protějšek jen když dává smysl.
7. **Copy tón: věcný, ne duchovní.** Zakázaná slova: „energie" (woo smysl),
   „signály těla", „holistické", „samoregulace", „prodáváme cestu", „duše".
   Fráze na homepage jen z `docs/fraze-pool.md` (max 5–6), nové nevymýšlet.

## Anti-cíle (čeho se vědomě vyvarovat)

- Nevést web žádnou externí knihou, kurzem ani autoritou. Hero = Body–Health–Mind
  a komunita, ne odkaz na cizí zdroj.
- Žádná obranná sekce typu „nejsme sekta" — když web nevede ezoterikou, není co
  obhajovat.
- Žádná spa/wellness pastelová estetika (růžová + šalvějová + zlatá),
  žádné elegantní serify, žádné AI fialové gradienty. Detaily v MASTER.md.

## Inventář stránek

### Postavené (Astro `src/pages/`)

| Stránka | Slug | Soubor |
|---|---|---|
| Homepage | `/` | `index.astro` |
| Proč BoHeMi | `/proc-bohemi/` | `proc-bohemi.astro` |
| Lekce a služby (hub) | `/lekce-a-sluzby/` | `lekce-a-sluzby.astro` |
| Skupinové lekce | `/skupinove-lekce/` | `skupinove-lekce.astro` |
| Kroužky pro děti | `/krouzky-pro-deti/` | `krouzky-pro-deti.astro` |
| Supermamky | `/supermamky/` | `supermamky.astro` |
| Open gym | `/open-gym/` | `open-gym.astro` |
| Fotobiomodulace | `/fotobiomodulacni-terapie/` | `fotobiomodulacni-terapie.astro` |
| Ceník | `/cenik/` | `cenik.astro` |
| Kontakt | `/kontakt/` | `kontakt.astro` |
| 404 | — | `404.astro` |

EN mutace (`src/pages/en/`): home, classes-and-services, group-classes,
open-gym, photobiomodulation-therapy, pricing, why-bohemi, contact.

Hlavní menu (rozhodnuto Honzou): **Domů · Proč BoHeMi · Lekce a služby · Ceník ·
Kontakt · Rezervovat**. Položka „Lekce a služby" má dropdown na kotvy
`#pro-tebe / #pro-deti / #pro-firmy`.

> ✅ **Slugy jsou ověřené z reálné GSC (12 měsíců).** Zdroj pravdy =
> **`docs/redirect-map.md`** (KEEP / 301 / WP / LEGAL + trailing-slash pravidlo).
> Nové slugy odsud, nevymýšlet. **301 redirecty zbývá implementovat**
> (Astro config vs. nginx/Coolify — zatím nerozhodnuto).

### Zatím nepostavené (KEEP slugy z redirect-map)

`/pronajem-salu/` (142 kliků), `/hula-hoop/`, `/firmy/`, `/fotky/`,
osobní tréninky (nová stránka; 301 z `/nase-sluzby/osobni-treninky/`),
trenéři (`/proc-bohemi/#treneri` nebo samostatná `/treneri/` — rozhodne Honza),
LEGAL stránky (VOP, GDPR, provozní řád…).

- `/objevovarna/` se nestaví — obsah je sekce na `/krouzky-pro-deti/`.
- **Příměstský tábor se už nedělá (rozhodnuto 7/2026) — nevracet do nabídky.**
  Redirect `/primestsky-tabor/` → `/krouzky-pro-deti/` zůstává v platnosti.

Mimo repo (WordPress, neřešíš tady): `bohemi.fit/rezervace/` — rezervace,
„Můj účet" / login / členství.

## Jak pracovat

- Stránku po stránce, malé commity, jedna stránka = jeden smysluplný commit.
- Před každou stránkou si přečti `design-system/MASTER.md` a případný
  `design-system/pages/<slug>.md` (override má přednost před MASTER).
- Když narazíš na rozhodnutí o značce, obsahu nebo struktuře menu — **navrhni a
  zeptej se**, nerozhoduj za Honzu.

## Stav implementace & rozhodnutí (drž konzistenci)

Realizovaná rozhodnutí — nová stránka ať je dělá taky, ať se web nerozejde:

- **Font:** jediná rodina **Hanken Grotesk** (400–800). **Žádný serif** — akcentová
  slova/eyebrow řešíme kurzívou + vahou téhož grotesku. (Export měl Newsreader;
  Honza ho zamítl. MASTER.md serify zakazuje.)
- **Paleta = WARM-DARK (varianta B), black/white/red.** Zdroj pravdy je logo +
  plakáty, ne starý teplý export. Černá je **kotva, ne dominanta** — většina
  obsahu na teplém světlém pozadí (`bg #f5efe6`), tmavé kotvy (hero, manifest,
  footer, vybrané feature pásy) na teplé near-black (`ink-dark #14110e`, ne `#000`).
  Plná tabulka tokenů v `design-system/MASTER.md`. Klíčové role:
  - `brand #1c1812` = **struktura** (near-black: nadpisy, linky, sekundární
    tlačítka, badge). **Žádné velké červené plochy** — to je hardcore-gym, zakázané.
  - `accent #e2231a` (PLACEHOLDER, čeká přesný hex) = **červená výplň** (tečky,
    dělící linky, aktivní stavy, glow). `accent-text #b71c13` = červená pro **text**
    + bg červeného CTA s cream textem (WCAG AA). `accent-deep #8f150d` = hover CTA.
  - **Červená = CTA/akcent/výplň, NIKDY barva běžného (body) textu.** Výjimka:
    **akcentové slovo v display nadpisu smí být červené** (echo loga) — i na tmavém,
    kde projde jen jako *velký* text (AA-large ≥ 3:1). Rozhodnuto Honzou (hero „škola").
  - `gold #e0a43a` / `gold-dark #8a5e0e` = amber, třetí akcent (Mind). **TENTATIVE.**
  - Triáda Body/Health/Mind = **červená / neutrál (cream·ink) / amber**.
  Tokeny jsou AA-laděné — neber zpět původní teplé (pískové/zelené/terakotové) hodnoty.
- **Žádná externí kniha/autorita** (anti-cíl): v exportu byla sekce o knize
  „Holistic Human Health" + odkaz na PDF (uhv.org.in). Zmírněno — myšlenka
  („nic neber jako dogma, ověř si to") zůstává, **název knihy a odkazy pryč**.
- **Kontakt = statika:** export měl odesílací formulář → nahrazen přímými akcemi
  (`mailto:` / `tel:`) + odkaz ven na rezervaci. Žádný `<form>`/`<input>`.
- **Děti a rodiny = po homepage nejsilnější publikum** (GSC: `/krouzky-pro-deti/`
  338 kliků). Realizováno (7/2026): hero má sekundární tlačítko „Hledáš něco pro
  děti?", vysoko na homepage je plný pruh `KidsBand.astro` (sand pozadí, dlaždice
  z `kidsBand` v datech) a dětská karta v „Najdi se v tom" vede na
  `/krouzky-pro-deti/`, ne na kotvu. Dospělácká linie webu tím ale zůstává —
  není to dětský web.
- **Klikatelné karty služeb:** detail se otvírá klikem na celý box, ne textovým
  odkazem pod mřížkou. Vzor: volitelné `href` v datech (`individualServices`,
  `kidsActivities`, `kidsBand`), šablona renderuje `<a>` s „Detail →", bez
  `href` zůstává `<div>` (= stránka ještě není, např. osobní tréninky).
- **Obsah z WordPressu ověřovat — je místy zastaralý.** Př.: lektorka Supermamek
  na WP (Klára Šauerová) už v týmu není; termíny semestru kroužků („letní
  16. 9. 2026 – 27. 1. 2027") vypadají jako zimní — čeká na Honzovo potvrzení.
  Dynamické údaje (volná místa) na statický web nepatří.
- **Přístupnost:** všechny stránky projdou **axe-core (WCAG 2.1 A+AA) = 0 chyb**.
  Drž text ≥ 4.5:1 (velký ≥ 3:1), globální `:focus-visible` ring je v `@layer base`,
  animace respektují `prefers-reduced-motion`. Po změně barev spusť axe znovu.
- **Architektura:** sdílená data v `src/data/home.ts` (lekce, ceník, navigace…),
  stránky jen skládají komponenty z `src/components/`. Obrázky jsou zatím
  gradientové placeholdery (`MediaFrame.astro`) — reálný `<img>` do slotu sám
  skryje placeholder. Navigace: kotvy formou `/#…` (fungují i z podstránek),
  aktivní stav přes `<Header current="/slug/" />`.

## Tailwind v4 — vývojové gotchy (ušetří hodiny)

- **Reset patří do `@layer base`.** Nezařazené `* { margin:0; padding:0 }` v
  Tailwindu v4 **přebije všechny utility** margin/padding (rozbije `mx-auto` i
  paddingy). Box-sizing/reset řeší preflight — vlastní base styly dávej do
  `@layer base { … }`.
- **Zlomkové spacing 4.5/5.5/6.5/7.5 se NEgenerují** (jen vestavěné
  .5/1.5/2.5/3.5). Místo `gap-4.5` piš `gap-[18px]` atd. (4.5→18px, 5.5→22px,
  6.5→26px, 7.5→30px).
- **Po přidání NOVÉ stránky/souboru restartuj dev server** — content-scan
  Tailwindu bývá stale a nové utility (např. `grid-cols-2` na nové stránce) se
  nevygenerují. `astro build` je vždy správně; dev může lhát.

## Nasazení (Coolify na Hetzneru)

Web běží jako **statika** (Astro `output: static` → složka `dist/`). V Coolify:

- **Build Pack:** Nixpacks · **Is it a static site? = ON** · **Is it a SPA? = OFF**
  (multipage web — SPA by přesměroval vše na `index.html` a rozbil podstránky).
- **Publish Directory:** `/dist` (s lomítkem) · **Build Command:** `npm run build`
- **Static Image:** `nginx:alpine` + default Coolify nginx config (`try_files
  $uri $uri.html $uri/index.html …` — sedí na složkový výstup Astra).
- Pre-deployment commands nech prázdné. Port 3000 je po zapnutí statiky
  irelevantní. Bez static toggle se to chová jako Node server → restart smyčka.

## Vývoj (Astro)

Dev server: `npm run dev` (běží na pozadí; správa `astro dev stop/status/logs`).
**Po přidání nové stránky restartuj** (viz Tailwind gotchy výš).

## Dokumentace

Plná dokumentace: https://docs.astro.build

Než sáhneš na související oblast, projdi příslušný guide:

- Stránky, dynamické routy, middleware: https://docs.astro.build/en/guides/routing/
- Astro komponenty: https://docs.astro.build/en/basics/astro-components/
- React/Vue/Svelte komponenty uvnitř Astra (islands): https://docs.astro.build/en/guides/framework-components/
- Content collections (správa obsahu): https://docs.astro.build/en/guides/content-collections/
- Styly a Tailwind: https://docs.astro.build/en/guides/styling/
- Vícejazyčnost (EN mutace v `/en/`): https://docs.astro.build/en/guides/internationalization/
