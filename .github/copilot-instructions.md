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
   data). Nové slugy nevymýšlet. Jediná schválená výjimka: `/program-8-tydnu/`.
4. **Barvy a fonty jen z `design-system/MASTER.md`.** Chybí token → zeptej se.
5. **SEO basics:** jeden `<h1>`, `<title>` + `meta description`, sémantické
   nadpisy, alt texty.
6. Jazyk webu = čeština (EN mutace pod `/en/`, texty v `src/data/home.en.ts`
   + `src/i18n/ui.ts`).
7. **Copy tón věcný, ne duchovní.** Zakázaná slova (nula, všude): „energie" (woo),
   „signály těla", „holistické", „samoregulace", „duše", „harmonie",
   „transformace", „vědomí". Fráze jen z `docs/fraze-pool.md` — fráze použité na
   `/program-8-tydnu/` se nesmí opakovat na homepage (stav → fraze-pool.md).

## Anti-cíle
Žádná spa-pastel paleta (růžová/šalvějová/zlatá), žádné elegantní serify, žádné
AI fialové gradienty, žádné vedení webu externí knihou/autoritou, žádná sekce
„nejsme sekta". Hero = Body–Health–Mind + komunita.

## Stav & konvence (drž konzistenci)
- **Postaveno:** `/`, `/proc-bohemi/`, `/lekce-a-sluzby/`, `/skupinove-lekce/`,
  `/krouzky-pro-deti/`, `/supermamky/`, `/open-gym/`, `/fotobiomodulacni-terapie/`,
  `/osobni-treninky/`, `/pronajem-salu/`, `/firmy/`, `/treneri/`,
  `/program-8-tydnu/`, `/cenik/`, `/kontakt/`, 404 + EN mutace v `src/pages/en/`.
  Menu: Domů · Proč BoHeMi · Lekce a služby · Ceník · Kontakt · Rezervovat.
- **Program 8 týdnů:** název VŽDY „Program 8 týdnů" (nikdy „Life Practice"/„Cesta";
  velké P i uprostřed věty). Zmínky vedou na `/program-8-tydnu/`. Interní podklady
  `docs/program-8-tydnu-podklady.md` NEPUBLIKOVAT. Mřížka `paths` („Lekce a
  programy") je stažená z HP — ostatní programy nejsou hotové.
- **Lokalita ≠ značka:** hero H1/tagline bez „Vinohrady" (BoHeMi = myšlenka,
  časem víc míst); lokalita jen v hero badge, SEO titles a kontaktech, dokud
  je jedno studio.
- **Navigace = tři vrstvy** (HP ochutnávka → rozcestník → detail): každý klik
  vede na **nejkonkrétnější existující stránku**. Služba → vlastní stránka; typ
  lekce → `/skupinove-lekce/#kotva` (typy lekcí nemají vlastní stránky); dětská
  aktivita → `/krouzky-pro-deti/#kotva`. **Kotvy (`classes[].id` v datech +
  dětské `#cirkusova-skolicka` ap.) se NIKDY nemění**; cíl kotvy má `scroll-mt-24`.
  Provozní údaje (rozvrh, kapacita) jen na detailu, ne v dlaždicích; stejný
  odstavec nesmí být na rozcestníku i detailu. Detaily v `/CLAUDE.md`.
- **Děti = po homepage nejsilnější publikum:** hero má dětské tlačítko, homepage
  pruh `KidsBand.astro`, dětská karta i menu dropdown vedou na
  `/krouzky-pro-deti/`. Příměstský tábor se už nedělá — nevracet.
- **Klikatelné karty:** detail služby = klik na celý box (volitelné `href`
  v datech → celý box `<a>`; bez `href` `<div>` = stránka ještě není).
  **Žádný nápis „Detail →" v boxech (rozhodnuto 7/2026)** — klikatelnost nese
  celý box (hover zdvih), ne popisek.
  `classes[].page` = lekce s vlastní stránkou (Supermamky). Nová service
  stránka → doplnit `href`/`page` v datech + footer sloupec „Služby".
  Platí všude (i ceník): box s detailem/kotvou = klikací celý, nikdy textový
  odkaz „… — detail →" vedle boxu; odkaz sekce na detail patří do hlavičky
  sekce vedle `<h2>`. Cenové dlaždice variant jedné služby neklikací.
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
