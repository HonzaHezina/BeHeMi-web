# Pokyny pro GitHub Copilot — BoHeMi web

Tento soubor čte Copilot ve VS Code automaticky. Plná pravidla jsou v
`/CLAUDE.md`, design tokeny v `/design-system/MASTER.md`. **Při návrhu UI vždy
ber barvy, fonty a spacing z `design-system/MASTER.md`** — nikdy je nehardcoduj.

## Co tohle repo je
Statický prezentační web studia BoHeMi fitness. Stack: **Astro + Tailwind**.
Prezentační vrstva **vedle WordPressu**, ne náhrada. Rezervace, login, členství,
platby = WordPress na `studio.bohemi.fit/`, sem obsahově nepatří — **ale
adresář `wordpress/`** v tomhle repu (od 19/2026) je staging/reference pro
`bohemi-wp-ui` (header plugin) a `bohemi-twentytwentyfive-child` (child
theme, patička+styly). Header i patička mají na WP **stejnou strukturu
i vzhled jako na Astru** (patička doslova stejné 4 sloupce jako
`Footer.astro` — Brand+CTA/Web/Služby/Kontakt), liší se jen cíle odkazů
tam, kde WP danou stránku nemá (cross-domain na `bohemi.fit`). Výjimka:
**WP header nemá CTA „Rezervovat"** (ve vlastním menu rezervačního webu
nedávalo smysl) — patička ho má dál. Nasazuje se ručně (FTP/WP admin,
žádný SSH/CI) — historie a instalační postup v `wordpress/README.md`.

Značka: **BoHeMi = Body – Health – Mind.** Komunitní, lidské, grounded.
Ne spa, ne ezoterika, ne luxusní wellness, ne „sekta".

## Tvrdá pravidla
1. **Statika only.** Žádný formulář, který odesílá rezervaci, platbu nebo login.
2. **Booking = odkaz ven** na `https://studio.bohemi.fit/`. Nikdy iframe, nikdy
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
   **Nepiš jako AI** (7/2026, zpětná vazba copywriterky): žádné „ne X, ale Y",
   žádné vatové trojice podstatných jmen, žádné „zní ti to povědomě?". Kratší
   věty, konkrétní detaily. U klíčových stránek nech zkontrolovat copywriterkou.
   **Konkrétní příklad, co přejídal (Honza, 2. 8. 2026): „žádná anonymní
   posilovna" / „trenér tě zná jménem"** — zrušeno na celém webu (hero_body,
   meta description, trainers eyebrow), nahrazeno pozitivním tvrzením bez
   kontrastu vůči strawmanovi („trenér tě celou lekci vidí a opravuje
   techniku"). Nevracet, ani v obměně. Detail: `/CLAUDE.md`.

## Anti-cíle
Žádná spa-pastel paleta (růžová/šalvějová/zlatá), žádné elegantní serify, žádné
AI fialové gradienty, žádné vedení webu externí knihou/autoritou, žádná sekce
„nejsme sekta". Hero = Body–Health–Mind + komunita.

## Stav & konvence (drž konzistenci)
- **Postaveno:** `/`, `/proc-bohemi/`, `/lekce-a-sluzby/`, `/skupinove-lekce/`,
  `/krouzky-pro-deti/`, `/supermamky/`, `/open-gym/`, `/fotobiomodulacni-terapie/`,
  `/osobni-treninky/`, `/pronajem-salu/`, `/firmy/`, `/treneri/`, `/fotky/`,
  `/program-8-tydnu/`, `/cenik/`, `/kontakt/`, 404 + EN mutace v `src/pages/en/`.
  Menu: Domů · Proč BoHeMi · Lekce a služby · Ceník · Kontakt · Rezervovat.
  `/treneri/` je bohatý detail (řádkový layout, anchor nav, „Co vede" chipy) —
  HP `Trainers.astro` zůstává jen ochutnávka, stejný vzor jako
  `/skupinove-lekce/` vs. `Offer.astro`. `/fotky/` = obecná galerie atmosféry
  studia (Footer sloupec Web, ne hlavní menu) — odděleně od `/pronajem-salu/`,
  který má jen fotky skutečného pronajímatelného prostoru.
- **Program 8 týdnů:** název VŽDY „Program 8 týdnů" (nikdy „Life Practice"/„Cesta";
  velké P i uprostřed věty). Zmínky vedou na `/program-8-tydnu/`. Cena
  **7 900 Kč / celý program** (jen v `cenik.astro`, zvýšeno 5. 8. 2026 z
  3 900 Kč — nevracet zpět bez rozhodnutí Honzy). Interní podklady
  `docs/program-8-tydnu-podklady.md` NEPUBLIKOVAT. Mřížka `paths` („Lekce a
  programy") je stažená z HP — ostatní programy nejsou hotové.
  **Praktický blok 20→50 min (5. 8. 2026)**, 2. půlka je AI výuka napříč
  všemi 8 týdny (obecná AI gramotnost + use-case podle tématu týdne, ne
  samostatné 9. téma) — souhrn na webu, plný rozpis pro lektora v
  `docs/program-8-tydnu-podklady.md`. `forYou` má 4. položku o učení AI.
- **„Jak vznikl web" sekce** (5. 8. 2026): jen na `/proc-bohemi/` +
  `/en/why-bohemi/` (founder story stránky), odkaz ven na `hezina.cz`. Patička
  na všech stránkách má kredit „Web postavil Honza Hezina s AI" → `hezina.cz`
  (`footer_credit` klíč). Nekopírovat „Jak vznikl web" na jiné stránky —
  duplikovalo by odstavec.
- **Lokalita ≠ značka:** hero H1/tagline bez „Vinohrady" (BoHeMi = myšlenka,
  časem víc míst); lokalita jen v hero badge, SEO titles a kontaktech, dokud
  je jedno studio.
- **Homepage zjednodušena (7/2026):** `Marquee.astro` (scrollující pruh slov)
  smazán — nevracet. `ProcTeaser.astro` + `TriadVenn.astro` sloučené do
  `ProcTriad.astro`. **`Audiences.astro` smazána úplně** (dublovala Offer's
  Pro tebe/Pro firmy). **Sekce „Pro děti a rodiny" v `Offer.astro` smazána
  (10/2026)** — dublovala `KidsBand.astro` výš na HP; `Offer.astro` má teď
  jen „01 Pro tebe" a „02 Pro firmy", dětská nabídka na HP jen v KidsBand.
  HP sekce: Hero → ApproachGrid → KidsBand → Offer → LifePracticeFeature →
  ProcTriad → Trainers → PricingTeaser.
- **`ApproachGrid` (sekce „Co u nás lidé nejčastěji řeší") = 4 karty, ne 8**
  (zúženo 31/2026) — start / kondice / máma / děti, všechny klikací (`href`
  v `approach` datech). Nepřidávat zpět zrušené („anonymní posilovna", „bolí
  záda", firmy — ty řeší `Offer.astro`).
- **Mobilní menu (`Header.astro`) = `<details>` se zavírá i klikem mimo něj**
  (inline `<script>`, `data-mobile-menu` atribut) — nový mobilní panel napoj na
  stejné chování, nevracet menu zavíratelné jen křížkem.
- **Navigace = tři vrstvy** (HP ochutnávka → rozcestník → detail): každý klik
  vede na **nejkonkrétnější existující stránku**. Služba → vlastní stránka; typ
  lekce → `/skupinove-lekce/#kotva` (typy lekcí nemají vlastní stránky); dětská
  aktivita → `/krouzky-pro-deti/#kotva`; trenér → `/treneri/#kotva` (`trainers[].id`
  v datech, `/treneri/` je jen CZ — EN karty na HP vedou na stejné české kotvy).
  **Kotvy (`classes[].id`/`trainers[].id` v datech + dětské `#cirkusova-skolicka`
  ap.) se NIKDY nemění**; cíl kotvy má `scroll-mt-24`.
  Provozní údaje (rozvrh, kapacita) jen na detailu, ne v dlaždicích; stejný
  odstavec nesmí být na rozcestníku i detailu. **HP nabídka i rozcestníky (CZ/EN)
  ukazují 6 karet lekcí** (`classes.slice(0, 6)`), všech 10 jen na
  `/skupinove-lekce/`. Detaily v `/CLAUDE.md`.
- **Děti = po homepage nejsilnější publikum:** hero má dětské tlačítko, homepage
  pruh `KidsBand.astro`, dětská karta i menu dropdown vedou na
  `/krouzky-pro-deti/`. **Dětské dlaždice jsou na HP jen v KidsBand** — sekce 02
  v `Offer.astro` je jen hlavička + věta + tlačítko, mřížku `kidsActivities`
  na HP nevracet. Příměstský tábor se už nedělá — nevracet.
- **Klikatelné karty:** detail služby = klik na celý box (volitelné `href`
  v datech → celý box `<a>`; bez `href` `<div>` = stránka ještě není).
  **Žádný nápis „Detail →" v boxech (rozhodnuto 7/2026)** — klikatelnost nese
  celý box (hover zdvih), ne popisek.
  `classes[].page` = lekce s vlastní stránkou (Supermamky). Nová service
  stránka → doplnit `href`/`page` v datech + footer sloupec „Služby".
  Platí všude (i ceník): box s detailem/kotvou = klikací celý, nikdy textový
  odkaz „… — detail →" vedle boxu; odkaz sekce na detail patří do hlavičky
  sekce vedle `<h2>`, **vždy jako textový odkaz** (`text-accent-text`), nikdy
  `<Button>` — `<Button>` jen pro samostatnou finální CTA na konci sekce.
  Cenové dlaždice variant jedné služby neklikací.
  **Hover efekt (zdvih/stín/bg) jen na klikacích boxech** — neklikací `<div>`
  bez hoveru, ať nevypadá klikací. Druhý odkaz uvnitř klikacího boxu (např.
  „Rezervovat →") = overlay `<a>` `absolute inset-0` + `aria-label`, druhý
  odkaz `relative` nad ním (vnořené `<a>` jsou nevalidní).
- **Font:** jen **Hanken Grotesk** (bez serifu) — akcenty **jen barvou**, žádná
  kurzíva (zrušena 7/2026, mixování řezů fontu; výjimka: skutečné citace).
- **Paleta = WARM-DARK (black/white/red).** Černá je kotva, ne dominanta: obsah na
  teplém světlém `bg #f5efe6`, tmavé kotvy na `ink-dark #14110e` (ne `#000`).
  `brand #1c1812` = struktura/near-black (nadpisy, tlačítka, badge — žádné velké
  červené plochy). Červená `accent #e2231a` (PLACEHOLDER) = výplň/tečky/linky;
  `accent-text #b71c13` = červený **text** + bg CTA; `accent-deep` = hover CTA.
  `gold` = amber (Mind, TENTATIVE). Triáda = červená / neutrál / amber.
- **Červená nikdy jako body text** — jen akcent/CTA/výplň. Výjimka: akcentové slovo
  v display nadpisu smí být červené (echo loga; na tmavém AA-large). Kontrast ≥ 4.5:1.
- **Kontakt:** přímé akce `mailto:`/`tel:`, žádný `<form>`.
- **Přímé odkazy na platbu členství (1. 8. 2026):** kde WP „level" produkt
  jde koupit online, veď tam přímo (`.../ucet-clenstvi/platba-clenstvi/?level=<ID>`)
  místo obecného `RESERVE_URL`/`/kontakt/` — level 3/4 (roční/měsíční členství,
  `/cenik/`), 7/8/9/15 (kroužky + Dětská Zumba, `/krouzky-pro-deti/`). Level 5
  (jednorázový vstup) nejde koupit online → zůstává `/kontakt/`. Levely 6/11/12–14
  (Bellydance, Vánoční členství, tábor) **nepoužívat** — nejsou v nabídce webu
  nebo je produkt zrušený. Plný seznam a zdůvodnění: `/CLAUDE.md`.
- **Jednorázový vstup NENÍ jednotná cena (opraveno Klárkou 1. 8. 2026):** 199 Kč
  posilovací lekce, 250 Kč Zumba/Enduro/Objevovárna, 150 Kč Open gym — breakdown
  v `pricing[0].feat` (`home.ts`/`home.en.ts`), sync v `cenik.astro`/`en/pricing.astro`.
  **Pronájem sálů = 4 sály s novými jmény/cenami** (opraveno 1. 8. 2026):
  Velký taneční 600 Kč, Malý taneční 500 Kč, Funkční sál 700 Kč (největší,
  TRX), Multifunkční sál (nyní tatami) 350 Kč (max 3 osoby, i zkušebna) —
  `halls` v `pronajem-salu.astro`, sync v `cenik.astro`/`en/pricing.astro`.
  Ke kroužkům Akademie CLP, Dětské Zumbě a pronájmu patří viditelný odkaz na
  obchodní podmínky (přímé `https://studio.bohemi.fit/obchodni-podminky-*` URL,
  stejný vzor jako `Footer.astro`). Detaily: `/CLAUDE.md`.
- **Data** sdílená v `src/data/home.ts`, stránky skládají `src/components/`.
- **⚠️ Nová stránka MUSÍ mít `current="/slug/"` na OBOU místech: `<Layout>` i
  `<Header>`.** `Layout.astro` z `current` počítá canonical/`og:url`/hreflang —
  bez něj spadne na default `'/'` a stránka se Googlu tváří jako homepage
  (reálný bug live na produkci 1. 8. 2026 na všech 17 CZ stránkách, protože
  `current` chodilo jen do `<Header>`). `check-links.mjs` tohle nezachytí.
- **Fotky lekcí/dětských aktivit:** centrální registr `src/data/photos.ts`
  (`photosCS`/`photosEN`, klíč = `id` z `classes[]`/`kidsActivities[]`/
  `kidsBand[]`) — fotka se přidává jednou tam, ne po stránkách. Dlaždice
  renderuj přes `<ClassCard>` (`src/components/ClassCard.astro`), nepiš
  vlastní box + lokální fotku-mapu znovu. `Photo` typ má i `srcDetail?`
  (druhá fotka jen pro bohatou detailní stránku, HP/rozcestník dál ukazují
  `src`) a `extra?` (pole VŠECH zbylých zpracovaných fotek — klikací
  thumbnail strip, otvírá plnou velikost v nové záložce). **Žádná fotka
  zpracovaná do `src/assets/` nesmí zůstat nevyužitá.** Trenéři mají vlastní
  `src/data/trainer-photos.ts` (`trainerPhotos` = hlavní portrét, klíč =
  jméno; `trainerGallery` = stejný „extra" vzor pro zbylé fotky). Detaily
  a historie rozhodnutí: `/CLAUDE.md` sekce „Fotky". **Stejný teaser/detail
  vzor platí od 2. 8. 2026 i na bio:** `trainers[]` má `bio` (plný, jen
  `/treneri/`) + volitelné `bioShort` (HP teaser, `Trainers.astro` čte
  `tr.bioShort ?? tr.bio`) — nový trenér potřebuje oboje.
- **Tailwind v4:** reset patří do `@layer base`; zlomky spacing (4.5/5.5/6.5/7.5)
  nejdou — piš `[18px]/[22px]/[26px]/[30px]`; po nové stránce restartuj dev server.
- **Deploy:** Coolify statika — `dist/`, „Is it a static site?" ON, SPA OFF.
