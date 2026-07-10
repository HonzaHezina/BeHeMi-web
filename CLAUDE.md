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
7. **Copy tón: věcný, ne duchovní.** Zakázaná slova (platí všude, nula):
   „energie" (woo smysl), „signály těla", „holistické", „samoregulace",
   „prodáváme cestu", „duše" + rozšířeno 7/2026: „harmonie", „transformace",
   „vědomí". Fráze na homepage jen z `docs/fraze-pool.md` (max 5–6), nové
   nevymýšlet. **Fráze použité na `/program-8-tydnu/` se NESMÍ opakovat na
   HP** — HP smí z poolu nést jen slogan „Neber nic jako svaté…" (zatím
   nenasazen). Stav nasazení frází je vedený v `docs/fraze-pool.md`.
   **Nepiš jako AI (zpětná vazba copywriterky, 7/2026):** vyhýbej se vzorci
   „ne X, ale Y", trojicím podstatných jmen na sílu (síla/kondice/pohyb),
   frázím „zní ti to povědomě?" a obecně větám, které znějí spíš jako
   marketingová šablona než jako člověk. Piš kratší věty, konkrétní detaily
   místo obecných tvrzení. Při pochybnosti o textu na klíčové stránce
   navrhni a nech zkontrolovat copywriterkou, nerozhoduj to sám za Honzu.

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
| Osobní tréninky | `/osobni-treninky/` | `osobni-treninky.astro` |
| Program 8 týdnů | `/program-8-tydnu/` | `program-8-tydnu.astro` |
| Pronájem sálů | `/pronajem-salu/` | `pronajem-salu.astro` |
| Pro firmy | `/firmy/` | `firmy.astro` |
| Trenéři | `/treneri/` | `treneri.astro` |
| Ceník | `/cenik/` | `cenik.astro` |
| Kontakt | `/kontakt/` | `kontakt.astro` |
| 404 | — | `404.astro` |

EN mutace (`src/pages/en/`): home, classes-and-services, group-classes,
open-gym, photobiomodulation-therapy, pricing, why-bohemi, contact.

Hlavní menu (rozhodnuto Honzou): **Domů · Proč BoHeMi · Lekce a služby · Ceník ·
Kontakt · Rezervovat**. Položka „Lekce a služby" má dropdown s přímými odkazy na
klíčové stránky: **Skupinové lekce → `/skupinove-lekce/` · Osobní tréninky →
`/osobni-treninky/` · Kroužky pro děti → `/krouzky-pro-deti/` · Pro firmy →
`/firmy/` · Trenéři → `/treneri/`** (data v `navMenu` v `home.ts`).
Footer má sloupec **Služby** (Skupinové lekce, Kroužky pro děti, Supermamky,
Open gym, Fotobiomodulace, Osobní tréninky, Pronájem sálů, Pro firmy) — každá
nová service stránka se přidává i sem. Program 8 týdnů je ve sloupci **Web**
(`/program-8-tydnu/`), ne ve Službách — je to program, ne služba.

> ✅ **Slugy jsou ověřené z reálné GSC (12 měsíců).** Zdroj pravdy =
> **`docs/redirect-map.md`** (KEEP / 301 / WP / LEGAL + trailing-slash pravidlo).
> Nové slugy odsud, nevymýšlet. Jediná výjimka mimo GSC: `/program-8-tydnu/`
> (nový produkt, explicitně schváleno 7/2026 — zapsán i v redirect-map).
> **301 redirecty zbývá implementovat**
> (Astro config vs. nginx/Coolify — zatím nerozhodnuto).

### Zatím nepostavené (KEEP slugy z redirect-map)

`/fotky/`, LEGAL stránky (VOP, GDPR, provozní řád…).

- **Hula hoop skončil (rozhodnuto 7. 7. 2026):** stránka se nestaví a lekce se
  na webu nikde nezmiňuje. `/hula-hoop/` i `/hooping/` jsou 301; cíl čeká na
  potvrzení Honzou (`/skupinove-lekce/` vs. `/krouzky-pro-deti/` — viz
  redirect-map, poptávka 824 zobr. existuje).

- `/objevovarna/` se nestaví — obsah je sekce na `/krouzky-pro-deti/`.
- **Dětské aktivity nemají vlastní stránky (potvrzeno 7/2026):** živé WP stránky
  `/akademie-cirk-la-putyka/`, `/detska-zumba/` a `/hernicka/` mají v GSC ~0
  kliků → obsah žije na `/krouzky-pro-deti/` (sekce + kotvy), staré URL jsou
  301 v redirect-map. Vlastní stránku dostane kroužek, až reálně potáhne v GSC
  (vzor: výjimka Supermamky, 72 kliků).
- **Příměstský tábor se už nedělá (rozhodnuto 7/2026) — nevracet do nabídky.**
  Redirect `/primestsky-tabor/` → `/krouzky-pro-deti/` zůstává v platnosti.
- **301 redirecty čekají:** `/nase-sluzby/osobni-treninky/` → `/osobni-treninky/`,
  `/o-nas/` → `/proc-bohemi/`, `/treneri/` staré profily (Šauerová, Nováčková,
  Bierhausová) → `/treneri/`, `/akademie-cirk-la-putyka/` → `/krouzky-pro-deti/`,
  `/detska-zumba/` → `/krouzky-pro-deti/#detska-zumba`, `/hernicka/` →
  `/krouzky-pro-deti/#objevovarna`. Plný seznam v redirect-map. Implementace
  zatím nerozhodnutá (Astro vs. nginx).

Mimo repo (WordPress, neřešíš tady): `bohemi.fit/rezervace/` — rezervace,
„Můj účet" / login / členství.

## Navigační logika — tři vrstvy (sjednoceno 7/2026, drž ji)

**HP (ochutnávka) → rozcestník (přehled) → detailní stránka (vše).**
Pravidlo pro celý web: **každý klik vede na NEJKONKRÉTNĚJŠÍ existující stránku.**

- služba s vlastní stránkou → její stránka (KEEP sekce v `docs/redirect-map.md`)
- typ lekce (kruháč, HIIT…) → `/skupinove-lekce/#kotva` — **typy lekcí NEMAJÍ
  vlastní stránky (rozhodnuto z dat), vždy kotva**
- dětská aktivita bez vlastní stránky → `/krouzky-pro-deti/#kotva`
- kategorie → rozcestník (`/lekce-a-sluzby/`, příp. jeho sekce)

**Stabilní kotvy (NIKDY neměnit — vedou na ně odkazy z celého webu; EN používá
stejné slugy, jen cestu `/en/group-classes/#…`):**

- `/skupinove-lekce/`: `#kruhac #silovy-trenink #hiit #supermamky #vlastni-vaha
  #power-zone #zumba #brisni-pekac #solid-booty #enduro` + blok `#prvni-lekce`
  („Tvoje první lekce" — konverzní jádro stránky, přidáno 7. 7. 2026; vedou na
  něj odkazy „Jdeš poprvé? →" z HP a z dětské stránky). **Move Smart NEJEDE**
  (rozhodnuto Honzou 7. 7. 2026) — lekce visí už jen na starém WP, na nový web
  nepatří a kotva `#move-smart` neexistuje.
- `/krouzky-pro-deti/`: `#cirkusova-skolicka #zaklady-gymnastiky
  #akrobacie-zonglovani #objevovarna #detska-zumba`

**Jak se to drží v kódu** (data v `src/data/home.ts` + `home.en.ts`):

- `classes[].id` = kotva; `classes[].page` = lekce má vlastní stránku (dnes jen
  Supermamky) → zmínky vedou na ni, kotva ale dál existuje.
- Volitelné `href` u `paths`, `approach`, `individualServices`, `kidsActivities`,
  `kidsBand`: šablona vykreslí celý box jako `<a>`, bez `href`
  zůstává `<div>` = stránka/kotva ještě neexistuje. Nikdy textový odkaz
  „… — detail →" uvnitř neklikací karty. Mřížka `paths` („Lekce a programy")
  je od 7/2026 **stažená z HP** — programy kromě Programu 8 týdnů nejsou
  hotové; data v `home.ts` zůstala, vrátit až budou.
- **Zmínky Programu 8 týdnů vedou na `/program-8-tydnu/`** (footer, rozcestník,
  Proč BoHeMi, HP CTA „Jak program funguje →"). HP sekce s kotvou `#program`
  zůstává jen jako ochutnávka — kotvu neměnit.
- **`Audiences.astro` smazána (7/2026)** — dublovala trojici Pro tebe/Pro děti/
  Pro firmy, kterou `Offer.astro` už ukazuje přímo na HP s konkrétním obsahem
  (viz „Homepage zjednodušena" níž). Pokud se bude rozcestníková karta
  „Ty/Tvoje děti/Tvoje firma" vracet (např. na `/lekce-a-sluzby/`), platí totéž
  pravidlo jako dřív: `anchor` musí být absolutní cesta, nikdy samotný `#hash`
  (lokální hash na jiné stránce, než kde sekce žije, nikam nevede).
- **Pravidlo boxů (platí všude, i v ceníku):** má-li obsah boxu/dlaždice
  detailní stránku nebo kotvu, je klikací CELÝ box (`<a>`, hover zdvih),
  ne textový odkaz vedle. **Žádný nápis „Detail →" v boxech (rozhodnuto
  7/2026)** — klikatelnost nese box sám. Pro dlaždice lekcí/dětských aktivit
  (box = fotka + nadpis + popis, celý klikací) použij `<ClassCard>`
  (`src/components/ClassCard.astro`) s fotkou z `src/data/photos.ts` —
  nepiš vlastní markup ani lokální fotku-mapu znovu (viz „Fotky" níž). Př.: dlaždice kroužků v ceníku →
  `/krouzky-pro-deti/#kotva`. Musí-li box obsahovat i druhý odkaz (např.
  „Rezervovat →" na `/skupinove-lekce/`), řeší se overlay `<a>` (`absolute
  inset-0` + `aria-label`, kontejner `relative`, druhý odkaz `relative` nad
  ním) — vnořené `<a>` jsou nevalidní. Cenové dlaždice *variant jedné služby*
  (fotobiomodulace 13 Kč/min…) zůstávají neklikací — na detail vede sekce.
  **Hover affordance (zdvih/stín/bg) jen na klikacích boxech** — neklikací
  `<div>` nesmí mít hover efekt, aby nevypadal klikací (sladěno 7/2026:
  ceník membership dlaždice, karty kroužků, „Tělo jako učitel", fallbacky
  bez `href`).
- **Odkaz sekce na detail patří do hlavičky sekce** (flex řádek vedle `<h2>`,
  vzor „Všechny lekce →" na rozcestníku, fotobiomodulace/kroužky v ceníku),
  ne do odstavce pod mřížkou.
- Cíl kotvy potřebuje `scroll-mt-24` (sticky header).
- **Provozní údaje (rozvrh, kapacita, ceny) jen na detailu, ne v dlaždicích** —
  jeden zdroj pravdy (viz Objevovárna).
- Rozcestník = krátké dlaždice, detail = plný text. **Stejný odstavec nesmí být
  na rozcestníku i detailu** (SEO + údržba).

**Až vznikne nová service stránka** (LEGAL stránky apod.): doplnit
`href`/`page` do dat, přidat do footer sloupce Služby (kde relevantní).

Kontrola po změnách odkazů: `npm run build && node scripts/check-links.mjs`
(mrtvé odkazy, mrtvé kotvy, duplicitní odstavce — má hlásit 0 chyb).

## Jak pracovat

- Stránku po stránce, malé commity, jedna stránka = jeden smysluplný commit.
- Před každou stránkou si přečti `design-system/MASTER.md` a případný
  `design-system/pages/<slug>.md` (override má přednost před MASTER).
- Když narazíš na rozhodnutí o značce, obsahu nebo struktuře menu — **navrhni a
  zeptej se**, nerozhoduj za Honzu.

## Stav implementace & rozhodnutí (drž konzistenci)

Realizovaná rozhodnutí — nová stránka ať je dělá taky, ať se web nerozejde:

- **Font:** jediná rodina **Hanken Grotesk** (400–800). **Žádný serif** (Export měl
  Newsreader; Honza ho zamítl. MASTER.md serify zakazuje.) **Žádná kurzíva**
  (rozhodnuto 7/2026 podle zpětné vazby copywriterky — mixování řezů fontu
  působilo návodně/old-school). Akcentová slova/eyebrow se odlišují **jen
  barvou** (`text-accent-text` apod.), ne kurzívou ani odlišnou vahou fontu.
  Výjimka: kurzíva zůstává u **skutečných citací** (blockquote na `/proc-bohemi/`,
  `/en/why-bohemi/`, `/program-8-tydnu/`) — tam je typograficky na místě.
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
  Platí i pro `/program-8-tydnu/`: obsah čerpá myšlenky přes `docs/fraze-pool.md`,
  kniha se na webu nejmenuje ani neodkazuje.
- **Kontakt = statika:** export měl odesílací formulář → nahrazen přímými akcemi
  (`mailto:` / `tel:`) + odkaz ven na rezervaci. Žádný `<form>`/`<input>`.
- **Děti a rodiny = po homepage nejsilnější publikum** (GSC: `/krouzky-pro-deti/`
  338 kliků). Realizováno (7/2026): hero má sekundární tlačítko „Hledáš něco pro
  děti?", vysoko na homepage je plný pruh `KidsBand.astro` (sand pozadí, dlaždice
  z `kidsBand` v datech) a dětská karta v „Pro koho tu jsme" vede na
  `/krouzky-pro-deti/`, ne na kotvu. Dospělácká linie webu tím ale zůstává —
  není to dětský web. **Dětské dlaždice jsou na HP JEN v KidsBand** (rozhodnuto
  5. 7. 2026) — sekce 02 v HP nabídce (`Offer.astro`) je zeštíhlená na hlavičku
  + větu + tlačítko na `/krouzky-pro-deti/`, mřížku `kidsActivities` nevracet.
- **Lokalita ≠ značka (7/2026):** BoHeMi se má časem rozšířit o další místa —
  „BoHeMi je myšlenka, může být kdekoliv". Značková vrstva je bez Vinohrad:
  hero H1 akcent „pro tělo, zdraví i hlavu.", footer tagline „…Body – Health –
  Mind." Lokalita zůstává v hero badge a v SEO titles („— BoHeMi fitness
  Vinohrady") + meta/kontaktu, **dokud existuje jedno studio** — je to lokální
  SEO hodnota z GSC, nevyhazovat předčasně. Až bude druhé místo konkrétní:
  `locations` pole v `src/data/`, Footer/Kontakt renderovat z něj, titles
  přehodnotit.
- **HP sekce „Pro koho tu jsme" (dřív „Najdi se v tom", přerámováno 7/2026):**
  je to rozcestník, ne osobní identifikace — eyebrow „Pro koho tu jsme", H2
  „Ty. Tvoje děti. Tvoje firma.", karta 01 štítek „Dospělí". Osobní identifikaci
  dělá vedlejší sekce „Co u nás lidé nejčastěji řeší" (8 situací). **Nepřidávat
  další karty** — tři vstupy zrcadlí strukturu rozcestníku.
- **Homepage zjednodušena (7/2026, dle opakované zpětné vazby copywriterky —
  „hodně zahuštěné, spousta duplicit", i po prvním kole úprav pořád „hodně
  nacpaná"):**
  - Smazán `Marquee.astro` (scrollující pruh slov, působil jako teleshopping —
    smazán i z dat `home.ts`/`home.en.ts` a z `ui.ts`).
  - Smazána duplicitní inline sekce „Jak se u nás cvičí" v `index.astro`
    (dublovala `ApproachGrid` + Hero).
  - `ProcTeaser.astro` + `TriadVenn.astro` sloučené do **`ProcTriad.astro`**
    (mint karta s textem „Proč BoHeMi" + venn diagram Body/Health/Mind vpravo,
    bez samostatného odstavce popisu ke každé z trojice — ten zůstává na
    `/proc-bohemi/`).
  - **`Audiences.astro` smazána úplně** (komponenta i data `audiences` v
    `home.ts`/`home.en.ts` i i18n klíče `audiences_*`) — trojice „Ty. Tvoje
    děti. Tvoje firma." s odrážkami byla item-for-item duplicát toho, co
    `Offer.astro` (sekce Pro tebe/Pro děti/Pro firmy) ukazuje o kousek výš už
    s konkrétním obsahem (kartami lekcí, službami). Když se bude podobná
    rozcestníková karta chtít vrátit, patří spíš na `/lekce-a-sluzby/` jako
    vstupní jump-links, ne znovu na HP vedle Offer.
  - HP teď jede: Hero → ApproachGrid → KidsBand → Offer → LifePracticeFeature
    → ProcTriad → Trainers → PricingTeaser (z původních 12 bloků na 8).
  - Nevracet Marquee, starou dvojici Proc/Triad ani Audiences zpět bez
    nového rozhodnutí Honzy — pokud se HP bude zase plnit, řešit to jako
    nové zvážení obsahu, ne přidáváním starých komponent.
- **Program 8 týdnů (7/2026):** jediný hotový program (Měsíční program, Osobní
  restart, Chlapi 40+ a cykly NEJSOU hotové → mřížka „Lekce a programy" stažena
  z HP). Detail `/program-8-tydnu/`: název **VŽDY „Program 8 týdnů"** (nikdy
  „Life Practice" ani „Cesta"; velké P i uprostřed věty — HP blok, ceník i detail
  musí říkat stejně; název ve WP bookingu = samostatná migrace). Kapacita do
  12 lidí, cena jen v ceníku (na detailu jen odkaz), zdravotní věta „Program
  nenahrazuje lékařskou ani rehabilitační péči." u CTA, sekundární CTA vede na
  `/skupinove-lekce/`. Interní podklady (osnovy 20min bloků, měřicí protokol,
  plná storno tabulka) = `docs/program-8-tydnu-podklady.md` — **NEPUBLIKOVAT**;
  předstartovní storno pásma patří do budoucích VOP. Termín na webu je záměrně
  „září 2026" (kandidát 14. 9.–8. 11. 2026 čeká na Honzovo potvrzení). EN
  stránka není — EN odkazuje českým slugem.
- **Klikatelné karty:** detail se otvírá klikem na celý box, ne textovým
  odkazem pod mřížkou. Vzor a cíle odkazů → sekce **Navigační logika** výš.
- **Lekce a služby (rozcestník `/lekce-a-sluzby/`) — rozhodnutá struktura (7/2026):**
  Jump links = self-identifikační jazyk („Chci cvičit / Hledám pro dítě / Jsem z firmy"),
  každá ze tří kategorií má 1–2 věty intro pod nadpisem, skupinové lekce limitované
  na 6 karet (→ „Všechny lekce →" na `/skupinove-lekce/`). Stejný odstavec
  nesmí být na rozcestníku i detailu. **HP nabídka (`Offer.astro`) i EN rozcestník
  ukazují stejných 6 karet lekcí** (`classes.slice(0, 6)`, rozhodnuto 5. 7. 2026) —
  všech 10 má jen detail `/skupinove-lekce/`.
- **Obsah z WordPressu ověřovat — je místy zastaralý.** Př.: lektorka Supermamek
  na WP (Klára Šauerová) už v týmu není; termíny semestru kroužků („letní
  16. 9. 2026 – 27. 1. 2027") vypadají jako zimní — čeká na Honzovo potvrzení.
  Dynamické údaje (volná místa) na statický web nepatří — WP u kurzů akademie
  ukazuje „kapacitu" 10/9/11 míst, což jsou volná místa z bookingu, nepřenášet.
- **Ceny kroužků sjednocené s WP 5. 7. 2026:** akademie 4 000 / 4 600 / 5 500 Kč,
  Dětská Zumba 3 400 Kč (vše „/ semestr"), Objevovárna 250 Kč / vstup. Při změně
  držet v synku tři místa: detail `/krouzky-pro-deti/` + ceník CZ + ceník EN.
  Otevřené (čeká na Honzu): názvy kurzů akademie se na webu liší od WP — web má
  „Základy cirkusového tréninku" a „Hlavou ve vzduchu", WP „Základy gymnastiky
  a akrobacie formou hry" a „Pozemní a závěsná akrobacie, žonglování". Jestli
  mají sedět s WP bookingem 1:1, rozhodne Honza — zatím nechat webové názvy.
- **Přístupnost:** všechny stránky projdou **axe-core (WCAG 2.1 A+AA) = 0 chyb**.
  Drž text ≥ 4.5:1 (velký ≥ 3:1), globální `:focus-visible` ring je v `@layer base`,
  animace respektují `prefers-reduced-motion`. Po změně barev spusť axe znovu.
- **Architektura:** sdílená data v `src/data/home.ts` (lekce, ceník, navigace…),
  stránky jen skládají komponenty z `src/components/`. Obrázky přes `MediaFrame.astro`
  (slot pattern — placeholder se skryje, když je `<Image />` ve slotu). Navigace:
  kotvy formou `/#…` (fungují i z podstránek), aktivní stav přes
  `<Header current="/slug/" />`.
- **Fotky (stav 10. 7. 2026):** Reálné fotky zapojeny na klíčových stránkách.
  Zdrojové soubory v `src/assets/`: `lekce/` (kruhač, silový trénink, vlastní váha),
  `supermamky/`, `deti/` (Objevovárna), `treneri/` (Klára Měchurová).
  **Centrální registr fotek lekcí a dětských aktivit = `src/data/photos.ts`**
  (`photosCS`/`photosEN`, `Record<string, {src, alt, pos?}>`, klíč = `id` z
  `classes[]`/`kidsActivities[]`/`kidsBand[]` v `src/data/home.ts`). Fotka se
  přidává **jen jednou sem** — objeví se všude, kde se dané `id` používá (HP,
  rozcestník, detail, EN mutace), místo aby se kopírovala do každé stránky
  zvlášť (tak vznikaly mezery — fotka byla zapojená na jedné stránce, na jiné
  s týmž boxem chyběla). `pos` je Tailwind `object-*` třída pro ořez.
  **Dlaždice lekcí/aktivit renderuj přes `<ClassCard>`** (`src/components/ClassCard.astro`)
  — sdílená komponenta pro vzor „celý box je `<a>`, `MediaFrame` + fotka z
  `photosCS`/`photosEN`, nadpis, popis, volitelná `meta` řádka“. Používá ji
  `Offer.astro`, `KidsBand.astro`, `lekce-a-sluzby.astro` a
  `en/classes-and-services.astro`. Bohatší/odlišné layouty (`skupinove-lekce.astro`
  detail, `en/group-classes.astro` s dvěma odkazy v boxu) mají vlastní markup,
  ale fotku čerpají taky z `photos.ts` — ne vlastní kopii mapy. **Nová fotka
  lekce/aktivity → přidej `id` do `photosCS`/`photosEN` v `photos.ts`, nikdy
  nevytvářej lokální `classPhotos`/`kidsPhotos` mapu v jednotlivé stránce.**
  Vzor pro trenéry zůstává oddělený: **centrální mapa `src/data/trainer-photos.ts`**
  (`Record<string, ImageMetadata>`, klíč = přesné jméno trenéra) — importovat v
  `Trainers.astro`, `treneri.astro` i `osobni-treninky.astro`. Nový trenér
  s fotkou = přidat do `trainer-photos.ts`, fotku zpracovat do
  `src/assets/treneri/`. Nepoužité fotky (`kruhac-06–08`, `silovy-trenink-04/06/10`)
  jsou připravené pro sekce na `/skupinove-lekce/` (placeholder boxy čekají na
  Honzova data).
  Zpracování nových fotek: `npm run photos -- _raw/<složka> <cíl>` (skript
  `scripts/prep-photos.mjs`, staging přes `_raw/` podsložky v rootu repa).

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
