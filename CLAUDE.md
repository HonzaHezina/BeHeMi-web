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
`studio.bohemi.fit/`. Sem nikdy nepatří.

Značka: **BoHeMi = Body – Health – Mind.** Komunitní studio, lidskost, žádná
anonymita ani tlak. Není to spa, není to ezoterika, není to „sekta", není to
luxusní wellness. Tělo jako cesta k síle, zdraví a klidu.

## Tvrdá pravidla (neporušitelná)

1. **Statika only.** Nepiš žádný rezervační/platební/přihlašovací formulář,
   který něco odesílá do systému. Pokud něco potřebuje stav uživatele, kapacitu
   lekce, platbu nebo storno → **to není stránka, to je WordPress.**
2. **Booking = odkaz ven.** Každé tlačítko „Rezervovat" je `<a>` na
   `https://studio.bohemi.fit/` (případně konkrétní lekci). Nikdy iframe,
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
   **Konkrétní příklad „ne X, ale Y" vzorce, co se přejídal (Honza, 2. 8. 2026):**
   „žádná anonymní posilovna" / „trenér tě zná jménem" — bylo na homepage
   (`hero_body`, meta description) i EN eyebrow trenérů, znělo to jako
   omáčka na konci věty. Nahrazeno konkrétním pozitivním tvrzením (malá
   skupina, trenér tě vidí celou lekci a opravuje techniku) bez kontrastu
   vůči anonymní posilovně jako strawmanovi. Nevracet tenhle vzorec — ani v
   jiné obměně („žádný anonymní řetězec" ap.).

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
| Fotky | `/fotky/` | `fotky.astro` |
| Kurzy | `/kurzy/` | `kurzy.astro` |
| 404 | — | `404.astro` |

EN mutace (`src/pages/en/`): home, classes-and-services, group-classes,
open-gym, photobiomodulation-therapy, pricing, why-bohemi, contact.

Hlavní menu (rozhodnuto Honzou): **Domů · Proč BoHeMi · Lekce a služby · Ceník ·
Kontakt · Rezervovat**. Položka „Lekce a služby" má dropdown s přímými odkazy na
klíčové stránky, seřazené podle síly nabídky/publika, ne abecedně (přeuspořádáno
31. 8. 2026 — viz sekce „Stav implementace" níž): **Skupinové lekce →
`/skupinove-lekce/` · Kroužky pro děti → `/krouzky-pro-deti/` · Kurzy →
`/kurzy/` · Individuální služby → `/osobni-treninky/` · Program 8 týdnů →
`/program-8-tydnu/` · Pro firmy → `/firmy/` · Trenéři → `/treneri/` · Fotky →
`/fotky/`** (data v `navMenu` v `home.ts`/`home.en.ts`, 8 položek).
**Popisek „Individuální služby" (3. 8. 2026, dřív
„Osobní tréninky") platí JEN pro tuhle dropdown položku** — href zůstává
`/osobni-treninky/` beze změny a zbytek webu (page `<title>`/H1 na
`/osobni-treninky/`, Footer sloupec Služby, CTA tlačítko a „Co vede" chip na
`/treneri/`) dál říká „Osobní tréninky", protože tam jde o popis konkrétní
služby v textu, ne o položku menu — nesjednocovat bez nového rozhodnutí Honzy.
**Dropdown smí nést i ne-service odkazy** (Trenéři, od 3. 8. 2026 i Fotky) —
na rozdíl od hlavní lišty (6 pevných položek výš), kterou bez explicitního
rozhodnutí Honzy neroztahovat.
Footer má sloupec **Služby** (Skupinové lekce, Kroužky pro děti, Kurzy,
Supermamky, Open gym, Fotobiomodulace, Osobní tréninky, Pronájem sálů, Pro
firmy) — každá nová service stránka se přidává i sem. Program 8 týdnů a Fotky jsou ve sloupci
**Web** (`/program-8-tydnu/`, `/fotky/`), ne ve Službách — nejsou to služby.
Fotky tak od 3. 8. 2026 mají dva vstupy: Footer sloupec Web (jak bylo) i
dropdown „Lekce a služby" v hlavičce (nově).

**Patička nese kredit „Web postavil Honza Hezina s AI" (5. 8. 2026)** — malý
odkaz vedle copyrightu (`Footer.astro`, i18n klíč `footer_credit`), cílí na
`https://hezina.cz/` s `target="_blank"` (skutečně externí web, ne
bohemi.fit/studio.bohemi.fit pár, takže nová záložka platí normálně). Na
všech stránkách CZ i EN (`Footer` bere `lang` prop).

> ✅ **Slugy jsou ověřené z reálné GSC (12 měsíců).** Zdroj pravdy =
> **`docs/redirect-map.md`** (KEEP / 301 / WP / LEGAL + trailing-slash pravidlo).
> Nové slugy odsud, nevymýšlet. Výjimky mimo GSC (nové produkty, ne migrace
> starého obsahu): `/program-8-tydnu/` (7/2026) a `/kurzy/` (31. 8. 2026) —
> obě explicitně schválené Honzou a zapsané v redirect-map v sekci „Nové
> slugy mimo tuhle GSC tabulku".
> **301 redirecty implementované 1. 8. 2026** v `redirects` bloku
> `astro.config.mjs` (statický meta-refresh + canonical, ne host-level 301 —
> nginx v Coolify není z repa editovatelný). `trailingSlash: 'always'` taky
> nastaveno. Zbývá jen pár položek, kde cíl/rozhodnutí ještě chybí
> (`/hula-hoop/`, `/scioalaputyka/`, legal stránky natrvalo) — detail a stav
> každé položky v `docs/redirect-map.md`.

### Zatím nepostavené (KEEP slugy z redirect-map)

LEGAL stránky (VOP, GDPR, provozní řád…) — **rozhodnuto natrvalo 1. 8. 2026:
zůstávají na `studio.bohemi.fit`, na Astru se nestaví.** 301 na ně je proto
trvalé řešení, ne provizorium. (`/fotky/` postaven 17. 7. 2026 — viz sekce
„Fotky" níž.)

- **Hula hoop skončil (rozhodnuto 7. 7. 2026, cíl potvrzen 1. 8. 2026):**
  stránka se nestaví a lekce se na webu nikde nezmiňuje. `/hula-hoop/` i
  `/hooping/` jsou 301 na `/skupinove-lekce/` (byla to spíš dospělácká/fitness
  lekce, ne dětská aktivita).

- `/objevovarna/` se nestaví — obsah je sekce na `/krouzky-pro-deti/`.
- **Dětské aktivity nemají vlastní stránky (potvrzeno 7/2026):** živé WP stránky
  `/akademie-cirk-la-putyka/`, `/detska-zumba/` a `/hernicka/` mají v GSC ~0
  kliků → obsah žije na `/krouzky-pro-deti/` (sekce + kotvy), staré URL jsou
  301 v redirect-map. Vlastní stránku dostane kroužek, až reálně potáhne v GSC
  (vzor: výjimka Supermamky, 72 kliků).
- **Příměstský tábor se už nedělá (rozhodnuto 7/2026) — nevracet do nabídky.**
  Redirect `/primestsky-tabor/` → `/krouzky-pro-deti/` zůstává v platnosti.
- **301 redirecty implementované (1. 8. 2026):** `/nase-sluzby/osobni-treninky/`
  → `/osobni-treninky/`, `/o-nas/` → `/proc-bohemi/`, staré trenérské profily
  (Šauerová, Nováčková, Bierhausová) → `/treneri/`, `/akademie-cirk-la-putyka/`
  → `/krouzky-pro-deti/`, `/detska-zumba/` → `/krouzky-pro-deti/#detska-zumba`,
  `/hernicka/` → `/krouzky-pro-deti/#objevovarna` a cca 30 dalších — plný
  seznam a stav (implementováno / čeká na Honzu) v `docs/redirect-map.md`.

Mimo repo běží (WordPress): `studio.bohemi.fit/` — rezervace, „Můj účet" /
login / členství, Booking Activities, Paid Memberships Pro. **Ale od
19. 7. 2026 tenhle repo přece jen sleduje kus WP** — adresář `wordpress/`
(staging/reference, ne buildovaný Astrem) drží zdroj pro plugin
`bohemi-wp-ui` (header) a child theme `bohemi-twentytwentyfive-child`
(globální styly, PMPro/Booking Activities boxy, patička), obojí vizuálně
sladěné s Astro headerem/patičkou. **Header i patička se od 31. 7. 2026
vkládají stejným způsobem** — jednorázově do sdílené Části šablony
(Šablonové části → Záhlaví / Patička v Site Editoru), ne do jednotlivých
šablon stránek zvlášť (dřív to u patičky bylo per-template, viz
`wordpress/README.md` „Patička — zpět na Část šablony"). **Patička na WP
má i obsahově stejnou strukturu 4 sloupců jako `Footer.astro`** (Brand+CTA
/ Web / Služby / Kontakt) — jen „Web"/„Služby" míří cross-domain na
`bohemi.fit`, protože ty stránky na WP nejsou, a dva WP-specifické odkazy
(Rezervace lekcí, Můj účet) jsou přibalené do sloupce Kontakt, ne jako
vlastní pátý sloupec. **WP header nemá vlastní CTA „Rezervovat"** (smazáno
31. 7. 2026 — ve vlastním menu `studio.bohemi.fit` nedávalo smysl tlačítko
vedoucí zpátky na web, na kterém už jsi; „Rezervace lekcí" zůstává jako
běžný odkaz). Ekvivalentní CTA zůstává jen v patičce. Nasazení je pořád
ruční (WP admin ZIP upload — preferováno před FTP, který na tomhle
hostingu dával novým souborům špatná oprávnění; žádný SSH ani CI) —
detaily, historie rozhodnutí a instalační checklist v
[`wordpress/README.md`](wordpress/README.md). **⚠️ Po JAKÉKOLIV úpravě
souboru v `wordpress/bohemi-wp-ui/` nebo `wordpress/bohemi-twentytwentyfive-child/`
musíš ve stejném kroku přegenerovat `wordpress/dist/*.zip`** (gitignored,
takže git diff změnu neukáže — snadno se zapomene) — Honza nahrává přesně
ten ZIP, jinak nahraje starý kód beze změny a bez chyby. Postup a příkazy
(žádný `zip` CLI v tomhle prostředí, jen PowerShell `Compress-Archive`) v
`wordpress/README.md` sekce „Honza nasazuje ze ZIPu".
**Přechody mezi bohemi.fit a studio.bohemi.fit zůstávají v jedné záložce,
oběma směry (rozhodnuto Honzou 1. 8. 2026)** — dřív se otvíraly v nové:
na Astru `Button.astro`'s `external` prop (`target="_blank"`) odstraněn ze
všech „Rezervovat"/„Vybrat" odkazů (`RESERVE_URL`, membership `pl.href`
payment linky) — `Header`, `Footer`, `skupinove-lekce.astro`,
`krouzky-pro-deti.astro`, `treneri.astro`, `kontakt.astro`/`en/contact.astro`,
`program-8-tydnu.astro`, `cenik.astro`/`en/pricing.astro`. Na WP straně
(`wordpress/`) odkaz „Hlavní web" v headeru a sloupce Web/Služby v patičce
mají `$external` na `false` místo `true` (`bohemi-wp-ui` → 1.1.9, motiv →
2.2) — **po nahrání vyžaduje re-insert obou Šablonových částí** (Záhlaví
i Patička jsou zamrzlé HTML snapshoty, PHP update je sám nezmění, viz
`wordpress/README.md`). Skutečně externí odkazy (Facebook, Instagram,
Google Maps, obchodní podmínky, Cirk La Putyka) `target="_blank"` dál mají
— pravidlo platí jen pro navigaci mezi bohemi.fit a studio.bohemi.fit.

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
  #power-zone #brisni-pekac #solid-booty #enduro` + blok `#prvni-lekce`
  („Tvoje první lekce" — konverzní jádro stránky, přidáno 7. 7. 2026; vedou na
  něj odkazy „Jdeš poprvé? →" z HP a z dětské stránky). **Move Smart NEJEDE**
  (rozhodnuto Honzou 7. 7. 2026) — lekce visí už jen na starém WP, na nový web
  nepatří a kotva `#move-smart` neexistuje. **Zumba pro dospělé zrušena
  (rozhodnuto Honzou 31. 8. 2026)** — kotva `#zumba` na `/skupinove-lekce/`
  smazána (lekce úplně pryč, ne přesunuta jinam). **Dětská Zumba zůstává beze
  změny** (`#detska-zumba` na `/krouzky-pro-deti/`, Eliška Velázquez ji dál
  vede) — nejde plést dohromady, jde jen o zrušení dospělácké varianty.
- `/krouzky-pro-deti/`: `#cirkusova-skolicka #zaklady-gymnastiky
  #akrobacie-zonglovani #objevovarna #detska-zumba`
- `/treneri/`: `#klara-mechurova #jitka-stepankova #eliska-velazquez #jan-hezina`
  (`trainers[].id` v `home.ts`/`home.en.ts`, přidáno 10. 7. 2026). HP karty
  trenérů (`Trainers.astro`) jsou celé klikací a vedou na `/treneri/#id` —
  stejná logika jako typ lekce → `/skupinove-lekce/#kotva` (trenér nemá
  vlastní stránku, jen kotvu na společném výpisu). `/treneri/` je zatím jen
  česky — EN karty na HP vedou na stejné české kotvy (konvence jako u dětských
  stránek).

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
  ne do odstavce pod mřížkou. **Je to vždy textový odkaz** (`text-base
  font-bold text-accent-text hover:text-ink`, ne `<Button>`) — sjednoceno
  10. 7. 2026 (`KidsBand.astro` měl navíc `<Button>` pod mřížkou, HP i ostatní
  sekce — Offer, Trainers, PricingTeaser — používaly textový odkaz v hlavičce;
  KidsBand upraven, aby seděl). `<Button>` patří na konec sekce jen tam, kde je
  to samostatná finální CTA (rezervace, kontakt), ne jako „zobrazit vše" odkaz.
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
  barvou** (`text-accent` na tmavém pozadí, `text-accent-text` na světlém —
  viz pravidlo u palety níž), ne kurzívou ani odlišnou vahou fontu.
  Výjimka: kurzíva zůstává u **skutečných citací** (blockquote na `/proc-bohemi/`,
  `/en/why-bohemi/`, `/program-8-tydnu/`) — tam je typograficky na místě.
  **Font je od 1. 8. 2026 self-hosted** přes npm balíček
  `@fontsource-variable/hanken-grotesk` (import v `src/styles/global.css`,
  `--font-sans: "Hanken Grotesk Variable"`) — **žádné Google Fonts `<link>` tagy
  v `Layout.astro`.** Důvod: výkon (odpadají 2 cross-origin round-tripy na
  `fonts.googleapis.com`/`fonts.gstatic.com`, font se cachuje se zbytkem
  `_astro/` assetů). Importují se jen `wght.css` (řezy 400–800) + `wght-italic.css`
  (italic 400/500 pro citace výš) — nepřidávat zpátky Google Fonts link, nový
  řez přidat přes balíček, ne přes `<link>`. **Stejný self-hosted přístup
  má od 7. 8. 2026 i `studio.bohemi.fit`** (`wordpress/bohemi-wp-ui/assets/css/fonts.css`
  + `assets/fonts/*.woff2`, kopie souborů ze stejného npm balíčku) — viz
  `wordpress/README.md` sekce „WebPageTest audit".
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
    **Na tmavém pozadí (`bg-ink-dark`) je pro tohle vždy `text-accent`, NIKDY
    `text-accent-text`** — `accent-text` je laděný na kontrast vůči světlému
    pozadí (5,8:1) a na tmavém propadá pod AA-large (2,85:1 — reálný nález z
    performance/a11y auditu 1. 8. 2026, `ApproachGrid.astro` používal
    `text-accent-text` na `bg-ink-dark` a opraveno na `text-accent`, vzor viz
    `Hero.astro`/`HealthTracker.astro`). Zkrátka: **světlé pozadí → `accent-text`,
    tmavé pozadí → `accent`** — nikdy naopak.
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
- **Přímé odkazy na platbu členství (WP „level" produkty) — realizováno 1. 8. 2026:**
  starý web měl u některých kurzů/členství tlačítko rovnou na
  `https://studio.bohemi.fit/ucet-clenstvi/platba-clenstvi/?level=<ID>` místo
  obecného odkazu na `RESERVE_URL`. Kde takový level existuje a jde přihlásit
  online, použij ho místo `RESERVE_URL`/`/kontakt/` — je to pořád „odkaz ven na
  konkrétní lekci" z pravidla 2 výš, jen konkrétnější než generický
  `studio.bohemi.fit/`. Honza dodal plný seznam levelů z WP (Paid Memberships
  Pro), zapojené i vyřazené:
  - **3 = Roční členství, 4 = Měsíční členství** → `href` v `pricing`
    (`src/data/home.ts`/`home.en.ts`), tlačítko „Vybrat"/„Choose this" na
    `/cenik/` a `/en/pricing/` (přes `Button ... external={Boolean(pl.href)}`).
  - **7 = Cirkusová školička, 8 = Základy gymnastiky a akrobacie, 9 = Pozemní
    a závěsná akrobacie/žonglování, 15 = Dětská Zumba** → `signupUrl` v
    `circusCourses` + inline href u Dětské Zumby na `/krouzky-pro-deti/`
    (`Přihlásit →` u každého kurzu).
  - **5 = Jednorázový vstup** — WP má u něj „Povolit registraci: Ne" (nejde
    koupit online), zůstává na `/kontakt/`.
  - **10 = Tříměsíční neomezené členství** — na webu zatím není nabízené
    (chybí v `pricing`), level existuje pro budoucí použití, až se přidá karta.
  - **NEPOUŽÍVAT:** 6 = Kurz Fit Bellydance a 11 = Vánoční měsíční členství
    (nejsou součástí aktuální nabídky webu, žádná stránka je nezmiňuje),
    12–14 = turnusy příměstského tábora (tábor je zrušený, viz „Příměstský
    tábor se už nedělá" výš — level existuje ve WP, ale nikdy ho nepoužívat).
  - Nový kurz/členství s vlastním WP levelem → přidej `href`/`signupUrl`
    stejným způsobem (per-item pole v datech, fallback na `RESERVE_URL` nebo
    `/kontakt/`, ne přepisovat generickou konstantu).
- **Děti a rodiny = po homepage nejsilnější publikum** (GSC: `/krouzky-pro-deti/`
  338 kliků). Realizováno (7/2026): hero má sekundární tlačítko „Hledáš něco pro
  děti?", vysoko na homepage je plný pruh `KidsBand.astro` (sand pozadí, dlaždice
  z `kidsBand` v datech) a dětská karta v „Pro koho tu jsme" vede na
  `/krouzky-pro-deti/`, ne na kotvu. Dospělácká linie webu tím ale zůstává —
  není to dětský web. **Dětské dlaždice jsou na HP JEN v KidsBand** (rozhodnuto
  5. 7. 2026) — sekce 02 v HP nabídce (`Offer.astro`) je zeštíhlená na hlavičku
  + větu + tlačítko na `/krouzky-pro-deti/`, mřížku `kidsActivities` nevracet.
  **`kidsBand[]` nesmí obsahovat souhrnnou dlaždici celé stránky** (rozhodnuto
  20. 7. 2026) — dřívější generická položka `id: 'krouzky'` („Kroužky pro
  děti" s textem opisujícím konkrétní kurzy) byla smazána, protože duplikovala
  texty jednotlivých kurzů a nadpis sekce s odkazem „Vše pro děti a rodiny →"
  už roli „ochutnávka → celá stránka" plní sám. Nová položka do `kidsBand` =
  vždy konkrétní skutečná aktivita, nikdy obecný odkaz na celou stránku
  `/krouzky-pro-deti/`. (Mimochodem tahle položka navíc neměla fotku v
  `photos.ts`, takže padala na placeholder gradient — to ale nebyl důvod
  smazání, jen doprovodný symptom. Fotka do `kidsBand` patří stejně jako u
  ostatních položek, viz „Fotky" níž, ale sama o sobě položku neospravedlní.)
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
  dělá vedlejší sekce „Co u nás lidé nejčastěji řeší" (`ApproachGrid.astro`,
  data `approach` v `home.ts`/`home.en.ts`). **Nepřidávat další karty** do
  „Pro koho tu jsme" — tři vstupy zrcadlí strukturu rozcestníku.
- **`ApproachGrid` zúžen z 8 na 4 karty (31. 7. 2026)** — původní karta
  „Nechci chodit do anonymní posilovny" smazána (zbytečná/obranná), stejně
  „Bolí mě záda" a „Chci pohybový program pro tým" (firmy řeší už samostatná
  sekce „Pro firmy" v `Offer.astro`). Zůstává: start / kondice / máma / děti —
  **všechny 4 mají `href`** (žádná zůstává neklikací `<div>`, to bylo důvodem,
  proč mřížka předtím působila nekonzistentně). Cíle: „Chci začít znovu
  cvičit" → `/skupinove-lekce/#prvni-lekce`, „Zpevnit tělo a kondici" →
  `/skupinove-lekce/`, „Cvičit i jako máma" → `/supermamky/`, „Pohyb pro děti"
  → `/krouzky-pro-deti/`. EN verze: kotva `#prvni-lekce` na EN stránce
  neexistuje (viz komentář v `Offer.astro`), takže první dvě EN karty vedou
  obě na `/en/group-classes/` místo na kotvu — sedí s konvencí „kids/supermums
  jsou CZ-only, EN odkazuje českým slugem".
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
    `Offer.astro` (sekce Pro tebe/Pro firmy — viz níž) ukazuje o kousek výš už
    s konkrétním obsahem (kartami lekcí, službami). Když se bude podobná
    rozcestníková karta chtít vrátit, patří spíš na `/lekce-a-sluzby/` jako
    vstupní jump-links, ne znovu na HP vedle Offer.
  - **Sekce „02 Pro děti a rodiny" v `Offer.astro` smazána (10. 7. 2026)** —
    duplikovala `KidsBand.astro`, který na HP jede o kousek výš se stejným
    nadpisem i odkazem na `/krouzky-pro-deti/`. `Offer.astro` má teď jen dvě
    číslované sekce: **„01 Pro tebe"** (skupinové lekce + individuální služby)
    a **„02 Pro firmy"** (přečíslováno z „03") — `id="pro-deti"` na HP zmizelo
    (nic naň neodkazovalo, na rozdíl od `#pro-deti` na `/lekce-a-sluzby/`
    a `/en/classes-and-services/`, které jsou samostatná stránka a zůstávají
    beze změny). Dětská nabídka na HP žije jen v `KidsBand.astro`.
  - HP teď jede: Hero → ApproachGrid → KidsBand → Offer → LifePracticeFeature
    → ProcTriad → Trainers → PricingTeaser (z původních 12 bloků na 8).
  - Nevracet Marquee, starou dvojici Proc/Triad, Audiences ani „Pro děti"
    sekci v Offer zpět bez nového rozhodnutí Honzy — pokud se HP bude zase
    plnit, řešit to jako nové zvážení obsahu, ne přidáváním starých komponent.
- **Program 8 týdnů (7/2026):** jediný hotový program (Měsíční program, Osobní
  restart, Chlapi 40+ a cykly NEJSOU hotové → mřížka „Lekce a programy" stažena
  z HP). Detail `/program-8-tydnu/`: název **VŽDY „Program 8 týdnů"** (nikdy
  „Life Practice" ani „Cesta"; velké P i uprostřed věty — HP blok, ceník i detail
  musí říkat stejně; název ve WP bookingu = samostatná migrace). Kapacita do
  12 lidí, cena jen v ceníku (na detailu jen odkaz), zdravotní věta „Program
  nenahrazuje lékařskou ani rehabilitační péči." u CTA, sekundární CTA vede na
  `/skupinove-lekce/`. **Cena 7 900 Kč / celý program** (`cenik.astro`, jediné
  místo na webu, kde cena je) — zvýšeno 5. 8. 2026 z původních 3 900 Kč po
  Honzově vlastní pricing analýze (3 900 vycházelo na cenu nejlevnějšího
  jednotlivého vstupu za setkání, levnější než dětský kroužek za semestr —
  neodpovídalo hodnotě: 2 vedené tréninky + praktický blok týdně, měření na
  začátku/konci, uzavřená skupina do 12, 70% vratka po 1. týdnu). Nevracet
  zpět na 3 900 bez nového rozhodnutí Honzy. Interní podklady (osnovy 20min bloků, měřicí protokol,
  plná storno tabulka) = `docs/program-8-tydnu-podklady.md` — **NEPUBLIKOVAT**;
  předstartovní storno pásma patří do budoucích VOP. Termín na webu je záměrně
  „září 2026" (kandidát 14. 9.–8. 11. 2026 čeká na Honzovo potvrzení). EN
  stránka není — EN odkazuje českým slugem.
- **Early-bird sleva pro prvních 5 přihlášených (31. 8. 2026):** 6 900 Kč
  místo 7 900 Kč — cena a přeškrtnutá původní cena jsou (jako jediné místo
  s cenou vůbec) jen v `cenik.astro`; `/program-8-tydnu/` CTA na slevu jen
  upozorňuje větou bez čísla („Prvních 5 přihlášených má slevu.") a odkazuje
  do ceníku — drží se tím pravidlo „cena jen v ceníku". **Sleva se nedá
  vynutit technicky** — Program nemá vlastní WP/PMPro level jako
  Zumba/akademie (viz „WP membership level signup links" výš), rezervace
  jde přes obecný `RESERVE_URL`, takže kdo je „prvních 5" musí Honza hlídat
  ručně. Až sleva doslouží nebo se počet/cena změní, uprav `cenik.astro`
  (badge + oba ceny) a větu v CTA na `/program-8-tydnu/` současně.
- **Program 8 týdnů v hlavičkovém dropdownu (31. 8. 2026):** přidán jako
  položka `07` do `navMenu` (`home.ts`/`home.en.ts`) vedle Trenérů a Fotek —
  do teď byl z hlavního menu dohledatelný jen přes odkazy v obsahu stránek
  (HP, `/lekce-a-sluzby/`, `/proc-bohemi/`, `/cenik/`, footer sloupec Web),
  ne přímo z navigace. Stejný precedent jako Trenéři/Fotky: ne-service odkaz
  v dropdownu je OK, hlavní lišta (6 pevných položek) se bez nového
  rozhodnutí Honzy dál neroztahuje.
- **`/kurzy/` — krátké specializační kurzy (31. 8. 2026, druhá výjimka mimo
  GSC po `/program-8-tydnu/`, schváleno Honzou):** nová vrstva vedle Akademie
  Cirk La Putyka — uzavřené bloky (typicky `4 × 60 min`) zaměřené na JEDNU
  dovednost, otevřené dětem i dospělým, s i bez členství v Akademii. Akademie
  zůstává beze změny (název, obsah, ceny) — `/kurzy/` je čistě přídavná
  vrstva, cross-linkovaná obousměrně (mint banner na `/skupinove-lekce/`
  i `/krouzky-pro-deti/` → `/kurzy/`, odstavec na `/kurzy/` →
  `/krouzky-pro-deti/`). Data v `src/data/specialization-courses.ts`
  (`SpecializationCourse[]`, `id` = stabilní kotva `/kurzy/#<id>`) — **3**
  aktivní MVP kurzy (`*-1`, level 1: kalistenika, žonglování, stojky) plus
  `upcomingCourses[]` jen jako text bez karty/ceny/kotvy pro přímé navazující
  kurzy (level 2). Vzdálenější obory (lidské pyramidy, závěsná akrobacie,
  balanc) se na web zatím vůbec nedávají — jsou jen v interním zadání, ne
  v kódu.
  **„Párová akrobacie I" (base/flyer/spotter zvedačky) záměrně VYNECHÁNA**
  (Honza, 31. 8. 2026) — nejistá vhodnost prostor, výška stropu v sálech
  BoHeMi není potvrzená jako dostatečná pro zvedačky („máme vyšší stropy,
  ale ne zas tak moc — ať si hned nenaběhneme"). Byla součástí prvního
  návrhu jako volitelný 4. MVP kurz, ale nepublikovat, dokud Honza prostory
  neověří — pak přidat zpět stejným vzorem jako ostatní tři.
  **Cena potvrzená (Honza, 31. 8. 2026): 1 290 Kč / 4 lekce, JEDNOTNĚ pro
  všechny tři MVP kurzy** (`price` vyplněno u všech tří v
  `specialization-courses.ts`) — nahrazuje dřívější stav „cena se
  upřesňuje". Zdůvodnění (celé v komentáři v datovém souboru): ~322,5
  Kč/lekci, doloženě uprostřed zjištěného tržního pásma 300–350 Kč, pořád
  pod Programem 8 týdnů (~494 Kč/trénink) — cenová hierarchie sedí,
  vlajkový program zůstává nejdražší na lekci. Zvažovaná alternativa
  1 490 Kč zamítnuta (nad pásmem, jiná pozice „specializované" — Honza to
  nechtěl). Dlaždice s cenou přidané do `cenik.astro` (sekce „Krátké
  kurzy", vzor „Kroužky a cirkus") **i do `en/pricing.astro`** (hardcoded
  anglické tituly + „CZK", stejná konvence jako existující sekce „Clubs &
  circus" tam) — obojí drž v synku, pokud se cena znovu změní. Žádný WP
  membership level pro tyhle kurzy zatím neexistuje, `bookingUrl` je
  všude `undefined` → CTA na `/kurzy/` pořád vede na `/kontakt/` (cena je
  vidět, online koupit zatím nejde).
  **Nahrazuje dřívější krátkodobou implementaci ze stejného dne:**
  kalistenika byla nejdřív přidaná jako běžná opakovaná lekce (`classes[]`
  položka + karta na `/skupinove-lekce/`) a jako samostatný kroužkový blok
  na `/krouzky-pro-deti/` — obojí bylo smazáno a nahrazeno modelem
  „Kalistenika I/II" výš, protože nové zadání (kalistenika = jeden ze tří
  uzavřených specializačních minikurzů, ne ongoing lekce) by jinak vytvořilo
  dva rozporné popisy stejného tématu na webu. Nevracet tu starou verzi
  zpět.
  Stránka je zatím CS-only (žádná EN mutace, stejná konvence jako u
  dětských stránek) — EN `navMenu` (`03`) i tak odkazuje přímo na `/kurzy/`.
  **Cross-linky na `/kurzy/` — stav po třech kolech oprav (31. 8. 2026):**
  `/kurzy/` bez odkazů v obsahu stránek (jen v headeru/footeru) nebyla z HP
  ani z rozcestníku vůbec dohledatelná — nový produkt potřebuje odkaz
  v samotném obsahu, ne jen v navigaci. Finální podoba:
  - **HP (`Offer.astro`)** a **`/skupinove-lekce/`**: krátký mint banner
    (text + `Button`/textový odkaz) na konci relevantní sekce. Copy
    explicitně říká „pro děti i dospělé"/„for kids and adults" — bez toho
    to vedle Individuálních služeb / uvnitř adult-only stránky působilo
    jako adult-only nabídka, přestože kurzy jsou pro obě publika.
  - **`/krouzky-pro-deti/`**: mint banner „Chceš se hýbat i ty?" (dospělí)
    a cross-link na Kurzy jsou sloučené do jednoho boxu, dva odstavce
    oddělené `border-t` — dřív dva stackované mint boxy hned pod sebou
    splývaly/působily jako nedomyšlený přívěsek.
  - **`/lekce-a-sluzby/` a `/en/classes-and-services/`**: **žádný banner** —
    plnohodnotná sekce „Krátké kurzy"/„Short courses" stejným vzorem jako
    „Skupinové lekce" výš na téže stránce (nadpis + „Všechny kurzy →"
    v hlavičce, intro věta, `grid` tří `<ClassCard>` z
    `specializationCourses`, `href={`/kurzy/#${c.id}`}`, `meta={c.duration}`).
    Honza (31. 8. 2026): jednořádkový text v mint boxu byl nesourodý s tím,
    že úplně všechno ostatní na stránce (lekce, kroužky, firmy) má
    plnokrevnou klikací kartu — udělalo to kurzy přehlédnutelné. Sekce žije
    **za mřížkou `kidsActivities` v „02 Pro děti a rodiny"**, ne v „01 Pro
    tebe" — kdyby zůstala u Individuálních služeb, čtenář by si dovodil
    adult-only (Program 8 týdnů zůstal sám v „01", ten je skutečně jen pro
    dospělé). `/en/classes-and-services.astro` má lokální `courseTextEN`
    slovník (jen `title`/`teaser` podle `id`) — `/kurzy/` nemá EN mutaci
    (konvence jako u dětských stránek), takže id/`duration`/`media` zůstávají
    jednozdrojové z `specialization-courses.ts`, lokalizuje se jen text.
  **`SpecializationCourse.teaser` (31. 8. 2026):** krátká věta pro klikací
  dlaždici na rozcestníku, oddělená od `d` (plný text jen na `/kurzy/`) —
  stejné pravidlo jako `kidsActivities[].d` vs. `circusCourses[].d`. Nový
  aktivní kurz potřebuje oboje, jinak `ClassCard` na rozcestníku spadne na
  `undefined`.
  **Datový model do budoucna:** `SpecializationCourse.audience` už dnes
  podporuje rozdělení jednoho kurzu na dětskou a dospělou variantu zvlášť
  (dva objekty, stejná `category`, jiná `id`, `audience: ['deti']` /
  `['dospeli']`) — není to podmínka, tam kde jedna náplň sedí oběma
  (dnešní 3 MVP kurzy), zůstávají sloučené v `audience: ['deti',
  'dospeli']`. Žádná změna typu potřeba, až se první kurz rozdělí — jen
  nové řádky v `specialization-courses.ts`.
  **`navMenu` přeuspořádán (31. 8. 2026, Honza: „Kurzy nemají být tak dole a
  Fotky tak nahoře"):** pořadí teď jde podle síly nabídky/publika, ne podle
  data přidání — Skupinové lekce · Kroužky pro děti · Kurzy (skutečné
  nabídky, kroužky mají v GSC nejvíc kliků ze všech podstránek) ·
  Individuální služby · Program 8 týdnů (vlajkový program) · Pro firmy (menší
  B2B publikum) · Trenéři · Fotky (informační položky, žádná se nedá
  rezervovat, proto úplně dole). `num` v `navMenu` odpovídá pořadí v poli —
  při další změně pořadí přečíslovat `01`–`08` v obou souborech
  (`home.ts`/`home.en.ts`) současně.
- **Praktický blok rozšířen na ~50 minut + AI napříč tématy (5. 8. 2026):**
  dřív 20 minut jen na tělesné téma týdne, teď necelá hodina — druhá
  polovina je AI blok (obecná AI gramotnost + konkrétní use-case podle
  tématu daného týdne, napříč všemi 8 týdny, ne jako samostatné 9. téma).
  Web nese jen souhrn (`weekRhythm[1]` v `program-8-tydnu.astro` + odstavec
  pod „8 týdnů, 8 témat"). Plný rozpis AI bloku po týdnech (formát ukázka +
  hands-on, progrese od „jak s AI mluvit" v týdnu 1 po čtení dat z deníku
  návyků v týdnu 7 a syntézu v týdnu 8) je v
  `docs/program-8-tydnu-podklady.md` — **NEPUBLIKOVAT**, jen pro lektora.
  Časování a přesný obsah AI bloku Honza ještě dolaďuje. `forYou` pole
  (sekce „Pro koho to je") má 4. položku „Chceš se naučit používat AI a s
  její pomocí dotáhnout vlastní cíle." — drž v synku s tímhle rozhodnutím,
  pokud se AI část programu ještě přejmenuje/zmenší.
- **„Jak (a proč) vznikl tenhle web" — sekce na `/proc-bohemi/` + `/en/why-bohemi/`
  (5. 8. 2026):** krátký rámeček mezi „PŘECHOD" a `HealthTracker` — jak byl web
  postavený (Honza + AI, bez agentury, Astro, WordPress na `studio.bohemi.fit`
  nepřepisovaný, jen sladěná hlavička/patička) a odkaz ven na `hezina.cz`
  (`target="_blank"`, skutečně externí). **Vědomě NENÍ nikde jinde na webu** —
  je to jediná stránka s founder hlasem (příběh), jinde (ceník, kontakt, lekce)
  by to bylo mimo kontext a duplikovalo by odstavec (pravidlo „stejný odstavec
  nesmí být na dvou stránkách"). Text v první osobě k návštěvníkovi — vyhýbá se
  tomu, aby AI mluvila samo o sobě/oslovovala čtenáře přímo (zvažovaná varianta
  „tou samou, se kterou si teď čteš tenhle odstavec" byla zamítnuta jako jediné
  místo na webu, kde by text zlomil čtvrtou stěnu — nevracet).
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
  Dětská Zumba (vše „/ semestr"), Objevovárna 250 Kč / vstup. Při změně
  držet v synku tři místa: detail `/krouzky-pro-deti/` + ceník CZ + ceník EN.
  **Dětská Zumba upravena Honzou 25. 8. 2026:** cena 3 400 → **3 100 Kč**,
  start nového semestru **7. 10. 2026** (dřív na webu vůbec neuvedený) —
  přidáno do meta řádku na `/krouzky-pro-deti/#detska-zumba`.
  **Názvy kurzů akademie přejmenované na WP názvy (potvrzeno Honzou 20. 7. 2026):**
  „Základy cirkusového tréninku" → **„Základy gymnastiky a akrobacie formou hry"**,
  „Hlavou ve vzduchu" → **„Pozemní a závěsná akrobacie, žonglování"** — sedí 1:1
  s WP bookingem. Drženo v synku na `/krouzky-pro-deti/`, `home.ts`/`home.en.ts`
  (kotvy `#zaklady-gymnastiky`/`#akrobacie-zonglovani` beze změny) i ceník CZ/EN.
  **Semestr potvrzen (20. 7. 2026):** 16. 9. 2026 – 27. 1. 2027 je zimní semestr
  (WP popisek „letní" byl zavádějící, data zůstávají).
- **Jednorázový vstup má cenu podle typu lekce (ověřeno Klárkou 1. 8. 2026),
  ne jednotnou 199 Kč:** 199 Kč posilovací lekce (kruháč, silový, HIIT,
  vlastní váha, Power Zone, břišní pekáč, Solid Booty, Supermamky), 250 Kč
  Enduro/Objevovárna, 150 Kč Open gym. `pricing[0]` v `home.ts`/
  `home.en.ts` nese breakdown ve `feat`, `cenik.astro`/`en/pricing.astro`
  bar chart i doprovodná věta pod ním jsou dolazené na stejná čísla.
- **Pronájem sálů = 4 sály s novými jmény/cenami/popisy (ověřeno Klárkou
  1.–2. 8. 2026, nahrazuje starší 4sálový seznam s jinými cenami/jmény —
  pozor, mezitím krátce existovala chybná 3sálová verze, opravena zpět na 4
  týž den):** Velký taneční sál 600 Kč, 65 m², zrcadla po jedné celé délce,
  denní světlo, klimatizace, přenosný reproduktor — tanec/jóga/pilates/
  vlastní váha/workshopy. Malý taneční sál 500 Kč, 35 m², stejné vybavení
  jako Velký, jen menší. Funkční sál 700 Kč, 100 m² (náš největší, bývalý
  „Velký taneční sál") — zrcadla, vzduchotechnika, vybavení na posilovací
  lekce (činky, osy, TRX, BOSU, lana, míče, lavice…), i na fly jógu/bungee
  workout. Multifunkční sál 350 Kč, 20 m², tatami + zrcadla, i jako zkušebna
  (elektrické bicí a klávesy). `capacity` pole u všech čtyř teď nese m², ne
  počet osob. Bývalé „Střední sál" a „Fitness sál" jako samostatné položky
  zanikly. Drženo v synku: `pronajem-salu.astro` (`halls`, plné popisy) +
  `cenik.astro` + `en/pricing.astro` (jen krátké dlaždice jméno+cena, beze
  změny). Ke všem sálům + kroužkům Akademie CLP a Dětské Zumbě patří viditelný odkaz na
  obchodní podmínky (`https://studio.bohemi.fit/obchodni-podminky-*`, přímý
  externí odkaz jako u `Footer.astro`, ne lokální redirect route).
- **Přístupnost:** všechny stránky projdou **axe-core (WCAG 2.1 A+AA) = 0 chyb**.
  Drž text ≥ 4.5:1 (velký ≥ 3:1), globální `:focus-visible` ring je v `@layer base`,
  animace respektují `prefers-reduced-motion`. Po změně barev spusť axe znovu.
- **Architektura:** sdílená data v `src/data/home.ts` (lekce, ceník, navigace…),
  stránky jen skládají komponenty z `src/components/`. Obrázky přes `MediaFrame.astro`
  (slot pattern — placeholder se skryje, když je `<Image />` ve slotu). Navigace:
  kotvy formou `/#…` (fungují i z podstránek), aktivní stav přes
  `<Header current="/slug/" />`.
- **⚠️ Nová stránka MUSÍ mít `current="/slug/"` na OBOU místech: `<Layout>` i
  `<Header>`.** `Layout.astro` z `current` počítá canonical URL, `og:url` i
  hreflang — bez něj spadne na default `'/'` a stránka nahlásí Googlu, že je
  homepage (přesně tenhle bug byl 1. 8. 2026 živý na produkci na všech 17 CZ
  stránkách, protože `current` chodilo jen do `<Header>`; opraveno, ale hlídej
  to u každé nové stránky — `check-links.mjs` tenhle typ chyby nezachytí,
  kontroluje jen interní odkazy/kotvy, ne canonical/hreflang).
- **Mobilní menu (`Header.astro`) = nativní `<details>/<summary>`, žádná
  React/Vue island.** Od 31. 7. 2026 má malý inline `<script>` (na konci
  komponenty, cílí `details[data-mobile-menu]`), který menu zavře i kliknutím
  mimo něj nebo na libovolný odkaz uvnitř — dřív šlo zavřít jen křížkem
  (`<summary>` toggle). Nový mobilní panel/dropdown v hlavičce ať respektuje
  stejné chování (buď použij stejný `<details>` vzor, nebo panel taky napoj na
  tenhle listener).
- **Aktivní stav menu opraven (31. 8. 2026, Honza: „menu se chová na každé
  stránce jinak"):** položka „Lekce a služby" v `Header.astro` neměla vůbec
  žádnou aria-current/podtržení logiku — na `/cenik/`, `/kontakt/` apod. se
  aktivní položka podtrhla, ale na `/lekce-a-sluzby/` a všech 8 podstránkách
  jejího dropdownu (`/skupinove-lekce/`, `/kurzy/`, `/treneri/`…) se
  nezvýraznilo nic, takže menu na většině webu vypadalo jinak než na
  zbylých 4 stránkách. Mobilní menu navíc nemělo aktivní stav vůbec nikde.
  Oprava: `isServicesActive = current === servicesHref ||
  navMenu.some((m) => m.href.split('#')[0] === current)` — „Lekce a služby"
  se teď zvýrazní (desktop podtržení i mobilní bg/tučně) na hub stránce i na
  všech dropdown cílech; mobilní hlavní položky (Domů/Ceník/…) i konkrétní
  dropdown položka (např. „Kurzy" na `/kurzy/`) mají teď stejné zvýraznění
  jako desktop. Platí pro CZ i EN (`navMenu`/`servicesHref` jsou lang-aware).
- **Fotky (stav 2. 8. 2026):** Reálné fotky zapojeny na všech klíčových
  stránkách. Zdrojové soubory v `src/assets/`: `lekce/` (kruháč, silový
  trénink, vlastní váha, HIIT, břišní pekáč), `supermamky/`, `deti/`
  (Objevovárna, cirkusová školička), `treneri/` (Klára Měchurová, Jitka
  Štěpánková, Eliška Velázquez, Jan Hezina), `studio/` (pronájem sálů +
  obecná atmosféra studia).
  **HP hero (`Hero.astro`) má od 31. 7. 2026 reálnou fotku** —
  `src/assets/studio/studio-12-hero.jpg` vložená přímo přes `<Image>` do
  slotu `<MediaFrame>` (dřív jen placeholder gradient s alt textem
  „Trénink ve funkčním sále BoHeMi"). Mimo centrální registr `photos.ts`,
  protože jde o jednu konkrétní pozici v jedné komponentě, ne o dlaždici s
  `id` — stejný důvod jako u Supermamek/Objevovárny níž. **Má `loading="eager"
  fetchpriority="high"` na `<Image>` (přidáno 1. 8. 2026, perf audit)** — je to
  LCP element, výchozí Astro `loading="lazy"` ho zbytečně řadil za ostatní
  requesty. Jakýkoliv budoucí above-the-fold hero/LCP obrázek (na jiné stránce
  než HP) potřebuje stejné dva atributy, jinak zůstává default `lazy`.
  **Centrální registr fotek lekcí a dětských aktivit = `src/data/photos.ts`**
  (`photosCS`/`photosEN`, klíč = `id` z `classes[]`/`kidsActivities[]`/
  `kidsBand[]` v `src/data/home.ts`). Fotka se přidává **jen jednou sem** —
  objeví se všude, kde se dané `id` používá (HP, rozcestník, detail, EN
  mutace), místo aby se kopírovala do každé stránky zvlášť. Typ `Photo`:
  - `src`/`alt` — hlavní fotka, používá ji `<ClassCard>` (HP teasery,
    rozcestník) i fallback pro detail.
  - `pos?` — Tailwind `object-*` třída pro ořez.
  - `srcDetail?`/`altDetail?` — volitelná DRUHÁ fotka jen pro skutečnou
    detailní stránku (`/skupinove-lekce/`, `/krouzky-pro-deti/`), aby HP/
    rozcestník a detail neukazovaly identický záběr. Bez `srcDetail` detail
    spadne na `src` (žádná regrese).
  - `extra?` — pole VŠECH zbylých zpracovaných fotek dané aktivity; vykreslí
    se jako malý klikací thumbnail strip (64px, otvírá plnou velikost v nové
    záložce) pod hlavním obsahem detailní stránky. Cíl: žádná fotka
    zpracovaná do `src/assets/` nesmí zůstat nevyužitá — pokud jich pro
    jednu aktivitu je víc, jdou do `extra`, ne se nezahazují.
  **Dlaždice lekcí/aktivit renderuj přes `<ClassCard>`** (`src/components/ClassCard.astro`)
  — sdílená komponenta pro vzor „celý box je `<a>`, `MediaFrame` + fotka z
  `photosCS`/`photosEN`, nadpis, popis, volitelná `meta` řádka“. Používá ji
  `Offer.astro`, `KidsBand.astro`, `lekce-a-sluzby.astro` a
  `en/classes-and-services.astro` — ty vždy čtou jen `src`/`alt` (teaser).
  Bohatší detailní stránky (`skupinove-lekce.astro`, `krouzky-pro-deti.astro`,
  `supermamky.astro`) mají vlastní markup, ale fotky čerpají taky z
  `photos.ts` (`srcDetail ?? src` + `extra`) — ne vlastní kopii mapy.
  `en/group-classes.astro` je svým obsahem teaser (karty jako na rozcestníku,
  ne bohatý detail jako CS `/skupinove-lekce/`) → čte jen `src`/`alt`, ne
  `srcDetail`/`extra`. **Nová fotka lekce/aktivity → přidej `id` do
  `photosCS`/`photosEN` v `photos.ts`, nikdy nevytvářej lokální
  `classPhotos`/`kidsPhotos` mapu v jednotlivé stránce.** Supermamky a
  Objevovárna mají vlastní detailní stránku/sekci s lokálním importem
  extra fotek přímo v `supermamky.astro`/`krouzky-pro-deti.astro` (stejný
  thumbnail-strip vzor, jen mimo centrální registr, protože jejich primární
  foto se čerpá odjinud než `photosCS`).
  **Trenéři mají oddělený vzor:** centrální mapa `src/data/trainer-photos.ts`,
  klíč = přesné jméno trenéra:
  - `trainerPhotos: Record<string, ImageMetadata>` — jedna hlavní portrétní
    fotka, používá `Trainers.astro` (HP), `treneri.astro` i
    `osobni-treninky.astro`.
  - `trainerGallery: Record<string, {src, alt}[]>` — VŠECHNY další zpracované
    fotky trenéra; `/treneri/` je vykreslí jako klikací thumbnail strip pod
    bio (stejný vzor jako `extra` u lekcí). Nový trenér s fotkami → hlavní do
    `trainerPhotos`, zbytek do `trainerGallery`, fotky zpracovat do
    `src/assets/treneri/`.
  **`/treneri/` je bohatý detail, HP (`Trainers.astro`) jen ochutnávka**
  (potvrzeno 17. 7. 2026) — stejné rozdělení jako `/skupinove-lekce/` vs. HP
  `Offer.astro`. **Od 2. 8. 2026 platí totéž i pro bio, ne jen pro fotky:**
  `trainers[]` (`home.ts`/`home.en.ts`) má `bio` (plný text, jen `/treneri/`)
  + volitelné `bioShort` (krátká verze pro HP teaser, `Trainers.astro` čte
  `tr.bioShort ?? tr.bio`). Nový trenér → napiš oboje, ať se stejný odstavec
  neopakuje na HP i detailu (stejné pravidlo jako u lekcí/kroužků).
  Detail má anchor-navigaci na jednotlivé trenéry v hero, řádkový layout (foto vlevo, bio + „Co vede" chipy s odkazy na konkrétní
  kotvy vpravo) místo gridu karet. Chipy „Co vede" psát jen tam, kde je vazba
  trenér→lekce potvrzená (bio nebo atribuce na `/skupinove-lekce/`) —
  nevymýšlet.
  **`/pronajem-salu/`** má jen fotky, které skutečně ukazují pronajímatelný
  prostor (dnes: fitness sál). Cokoliv obecně o atmosféře studia (tým, akce,
  zázemí mimo sály) patří na **`/fotky/`** (rezervovaný KEEP slug z
  redirect-map, postaven 17. 7. 2026) — samostatná galerie, odkaz jen ve
  Footeru (sloupec Web), ne v hlavním menu. Rozhodnutí padlo, protože fotky
  ze štábu měly mix skutečných záběrů sálů a nesouvisející tematické
  oslavy/eventu — ty dvě věci se nemají plést do jedné sekce.
  **Klikací thumbnail strip = obecný vzor** (zaveden 17. 7. 2026, používá ho
  `treneri.astro`, `skupinove-lekce.astro`, `krouzky-pro-deti.astro`,
  `supermamky.astro`, `pronajem-salu.astro`, `fotky.astro`): malý čtvercový
  náhled v `<a href={photo.src.src} target="_blank" rel="noopener noreferrer">`
  (`photo.src.src` je platná URL na plnou velikost zpracovaného Astro Image
  assetu), uvnitř `<Image>` s `object-cover`. Žádná lightbox knihovna —
  stačí to na „chci vidět fotku ve větší velikosti".
  **Staging nových fotek přes `_raw/` (v rootu repa, v `.gitignore`, nikdy se
  necommituje):** má pevnou strukturu podsložek pojmenovaných podle `id` z
  `home.ts` — fotku nahraješ rovnou do správné podsložky, žádné rozhodování
  při zpracování.
  ```
  _raw/lekce/kruhac/          _raw/lekce/silovy-trenink/    _raw/lekce/hiit/
  _raw/lekce/vlastni-vaha/    _raw/lekce/power-zone/
  _raw/lekce/brisni-pekac/    _raw/lekce/solid-booty/       _raw/lekce/enduro/
  _raw/deti/cirkusova-skolicka/    _raw/deti/zaklady-gymnastiky/
  _raw/deti/akrobacie-zonglovani/  _raw/deti/objevovarna/  _raw/deti/detska-zumba/
  _raw/treneri/klara-mechurova/  _raw/treneri/jitka-stepankova/
  _raw/treneri/eliska-velazquez/ _raw/treneri/jan-hezina/
  _raw/supermamky/
  _raw/studio/    (pronájem sálů + obecná atmosféra studia, viz výš — na
                   webu se dnes rozděluje mezi /pronajem-salu/ a /fotky/)
  _raw/galerie/   (cokoliv bez vlastního `id` a bez vazby na studio/sály)
  ```
  Pozor: kruhový trénink má `id: 'kruhac'`, ne „kruhovy-trenink". Než fotku
  nahraješ do `_raw/`, přejmenuj ji na smysluplný ascii název (`kruhac-09.jpg`) —
  výstupní název kopíruje zdrojový, takže je zbytečné přejmenovávat až v
  `src/assets/`.
  Zpracování: `npm run photos -- _raw/<kategorie>/<id> <kategorie>` (skript
  `scripts/prep-photos.mjs`) — `dest` je vždy jen `lekce`/`deti`/`treneri`/…,
  protože výstup v `src/assets/` je plochý (bez podsložek podle `id`). Skript
  zdroj jen čte, nic v `_raw/` nemaže ani neupravuje — po ověření výstupu je
  bezpečné zdrojové soubory z `_raw/` smazat. **Použij VŠECHNY zpracované
  fotky** (rozhodnuto Honzou 17. 7. 2026) — pokud jich pro jeden `id`/trenéra
  je víc než jedna, zbytek nezahazuj, zapoj přes `extra`/`trainerGallery`
  (viz výš), i fotky, které nejsou čistě „profesionální" (event/atmosféra) —
  jediná výjimka je obsah mimo téma webu (viz rozdělení pronájem vs. `/fotky/`
  výš).

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

## DNS (Cloudflare, od 7. 8. 2026)

**DNS zóna `bohemi.fit` běží na Cloudflare** (hosting beze změny — Astro
dál na Hetzneru, `studio.bohemi.fit` dál na Wedosu, jen kdo řídí DNS).
Plná tabulka DNS záznamů (proxy status per záznam), SSL/TLS mód a
rollback postup jsou v
[`docs/cloudflare-dns-migration.md`](docs/cloudflare-dns-migration.md) —
**nikdy neproxovat `ftp` a oba `wedos-dkim` CNAME**, jinak přijde Honza o
FTP přístup / DKIM podpis e-mailu. Motivace i souvislost s
`ERR_HTTP2_PROTOCOL_ERROR` bugem na `studio.bohemi.fit` je v
`wordpress/README.md`.

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
