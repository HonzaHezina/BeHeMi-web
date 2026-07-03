# Pokyny pro GitHub Copilot — BoHeMi web

Tento soubor čte Copilot ve VS Code automaticky. Plná pravidla jsou v
`/CLAUDE.md`, design tokeny v `/design-system/MASTER.md`. **Při návrhu UI vždy
ber barvy, fonty a spacing z `design-system/MASTER.md`** — nikdy je nehardcoduj.

## Co tohle repo je
Statický prezentační web studia BoHeMi fitness. Stack: **Astro + Tailwind**.
Prezentační vrstva **vedle WordPressu**, ne náhrada. Rezervace, login, členství,
platby = WordPress na `bohemi.fit/rezervace/`, sem nepatří.

Značka: **BoHeMi = Body – Health – Mind.** Komunitní, lidské, grounded.
Ne spa, ne ezoterika, ne luxusní wellness, ne „sekta".

## Tvrdá pravidla
1. **Statika only.** Žádný formulář, který odesílá rezervaci, platbu nebo login.
2. **Booking = odkaz ven** na `https://bohemi.fit/rezervace/`. Nikdy iframe, nikdy
   vlastní rezervační formulář.
3. **URL/slugy se nemění** — zdroj pravdy je `docs/redirect-map.md` (reálná GSC
   data). Nové slugy nevymýšlet.
4. **Barvy a fonty jen z `design-system/MASTER.md`.** Chybí token → zeptej se.
5. **SEO basics:** jeden `<h1>`, `<title>` + `meta description`, sémantické
   nadpisy, alt texty.
6. Jazyk webu = čeština (EN mutace pod `/en/`, texty v `src/data/home.en.ts`
   + `src/i18n/ui.ts`).
7. **Copy tón věcný, ne duchovní.** Zakázaná slova: „energie" (woo), „signály
   těla", „holistické", „samoregulace", „duše". Fráze jen z `docs/fraze-pool.md`.

## Anti-cíle
Žádná spa-pastel paleta (růžová/šalvějová/zlatá), žádné elegantní serify, žádné
AI fialové gradienty, žádné vedení webu externí knihou/autoritou, žádná sekce
„nejsme sekta". Hero = Body–Health–Mind + komunita.

## Stav & konvence (drž konzistenci)
- **Postaveno:** `/`, `/proc-bohemi/`, `/lekce-a-sluzby/`, `/skupinove-lekce/`,
  `/krouzky-pro-deti/`, `/supermamky/`, `/open-gym/`, `/fotobiomodulacni-terapie/`,
  `/cenik/`, `/kontakt/`, 404 + EN mutace v `src/pages/en/`.
  Menu: Domů · Proč BoHeMi · Lekce a služby · Ceník · Kontakt · Rezervovat.
- **Děti = po homepage nejsilnější publikum:** hero má dětské tlačítko, homepage
  pruh `KidsBand.astro`, dětská karta vede na `/krouzky-pro-deti/`. Příměstský
  tábor se už nedělá — nevracet.
- **Klikatelné karty:** detail služby = klik na celý box (volitelné `href`
  v datech → `<a>` s „Detail →"; bez `href` `<div>` = stránka ještě není).
- **Font:** jen **Hanken Grotesk** (bez serifu) — akcenty kurzívou + vahou.
- **Paleta = WARM-DARK (black/white/red).** Černá je kotva, ne dominanta: obsah na
  teplém světlém `bg #f5efe6`, tmavé kotvy na `ink-dark #14110e` (ne `#000`).
  `brand #1c1812` = struktura/near-black (nadpisy, tlačítka, badge — žádné velké
  červené plochy). Červená `accent #e2231a` (PLACEHOLDER) = výplň/tečky/linky;
  `accent-text #b71c13` = červený **text** + bg CTA; `accent-deep` = hover CTA.
  `gold` = amber (Mind, TENTATIVE). Triáda = červená / neutrál / amber.
- **Červená nikdy jako body text** — jen akcent/CTA/výplň. Výjimka: akcentové slovo
  v display nadpisu smí být červené (echo loga; na tmavém AA-large). Kontrast ≥ 4.5:1.
- **Kontakt:** přímé akce `mailto:`/`tel:`, žádný `<form>`.
- **Data** sdílená v `src/data/home.ts`, stránky skládají `src/components/`.
- **Tailwind v4:** reset patří do `@layer base`; zlomky spacing (4.5/5.5/6.5/7.5)
  nejdou — piš `[18px]/[22px]/[26px]/[30px]`; po nové stránce restartuj dev server.
- **Deploy:** Coolify statika — `dist/`, „Is it a static site?" ON, SPA OFF.
