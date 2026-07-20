# WordPress (studio.bohemi.fit)

Tenhle adresář **není** buildovaný Astro webem, je to čistě staging/reference
pro `studio.bohemi.fit`. Sledují se tu dvě věci, každá pro jinou práci:
**`bohemi-wp-ui/`** (plugin — header) a **`bohemi-twentytwentyfive-child/`**
(child theme — globální styly, PMPro/Booking Activities boxy, obsahové
patterny). Zbytek stacku (viz níž) na `studio.bohemi.fit` běží, ale tenhle
repo ho nespravuje ani neverzuje.

## Celý obrázek — co běží na studio.bohemi.fit

| Vrstva | Co | Kde to je | Spravuje tenhle repo? |
|---|---|---|---|
| Motiv | **`bohemi-twentytwentyfive-child`** (child theme nad TT5) | ✅ live na produkci, CSS/logo se načítají | ✅ ano — [`bohemi-twentytwentyfive-child/`](bohemi-twentytwentyfive-child/), ZIP v [`dist/bohemi-twentytwentyfive-child.zip`](dist/bohemi-twentytwentyfive-child.zip) |
| Rezervace | **Booking Activities** | WP plugin (booking systém) | ne — vendor, needituje se |
| Členství/platby | **Paid Memberships Pro** | WP plugin | ne — vendor, needituje se |
| Styl formulářů Booking Activities + PMPro | **`bohemi-custom-ui`** v1.16 | vlastní plugin, submit tlačítko/cenové a uživatelské boxy | ne — jen `_raw/bohemi-custom-ui-v116.zip` (gitignored) |
| Hlavička | **`bohemi-wp-ui`** | vlastní plugin | ✅ ano — [`bohemi-wp-ui/`](bohemi-wp-ui/), instalační ZIP v [`dist/bohemi-wp-ui.zip`](dist/bohemi-wp-ui.zip) |

`bohemi-wp-ui`, `bohemi-twentytwentyfive-child` a `bohemi-custom-ui` řeší
**tři různé věci** (header / globální styly + obsahové patterny / styl
formulářů) a běží vedle sebe — žádný nenahrazuje druhý.

## Instalační checklist (v tomhle pořadí)

1. **`bohemi-twentytwentyfive-child`** — aktivuj jako motiv (Vzhled →
   Motivy). Na produkci už běží — stačí **přehrát soubory přes FTP/SFTP**
   stejnou složkou (`wp-content/themes/bohemi-twentytwentyfive-child/`),
   aktivace se nemění, WordPress bere identitu motivu podle názvu složky.
   ⚠️ Po každém přehrání nových/přidaných souborů zkontroluj oprávnění (viz
   „Motiv — audit a oprava" níž, sekce „Oprávnění po nahrání FTP") — nový
   upload může znovu dostat špatná práva.
2. **Booking Activities** + **Paid Memberships Pro** — musí být nainstalované
   a nakonfigurované (stránky pro rezervace/členství/účet, viz
   `bohemi-wp-ui/includes/urls.php` pro to, jak si `bohemi-wp-ui` tyhle
   stránky sám dohledává).
3. **`bohemi-custom-ui`** — pokud chceš stylizované Booking Activities/PMPro
   formuláře (červené tlačítko, teplé boxy), nainstaluj a aktivuj. ZIP je v
   `_raw/bohemi-custom-ui-v116.zip`.
4. **`bohemi-wp-ui`** — nahraj `dist/bohemi-wp-ui.zip`, aktivuj, vlož pattern
   do šablonové části Záhlaví. Plný postup je v
   [`bohemi-wp-ui/README.md`](bohemi-wp-ui/README.md#instalace).
5. **Patička** — ve Vzorech (`+` → záložka „Vzory" → složka „BoHeMi") najdi
   **„BoHeMi — Footer"** a vlož ho do každé šablony, kde je teď starý
   výchozí vzor („page", „Úvodní stránka webu", „Jednotlivé příspěvky",
   „Stránka 404", „Všechny archivy", „Výsledky vyhledávání") — starý vzor
   nejdřív odeber. Detaily a proč to není jednorázová Část šablony jsou v
   „Patička — zjištění: nebyla to Část šablony" níž.

Po instalaci všech pěti kroků by `studio.bohemi.fit` měl mít: fungující
rezervace a členství, stylizované formuláře, hlavičku i patičku vizuálně
sladěné s `bohemi.fit`, a funkční vlastní styly z child theme.

### ✅ Stav k 20. 7. 2026

- **Header** — live, vizuálně sladěný s `bohemi.fit` (potvrzeno `curl` i
  vizuálně v Site Editoru, i na reálném mobilu).
- **Motiv `bohemi-twentytwentyfive-child`** — live, CSS/logo se načítají
  (viz „Motiv — audit a oprava" níž, oprávnění opravena přes FTP).
- **Patička** — přepracovaná, teď jako Vzor (Pattern) ve stejné složce
  „BoHeMi" jako header, viz „Patička — redesign" a „Patička — zjištění:
  nebyla to Část šablony" níž pro celou historii rozhodování. **Zatím jen
  v repu, čeká na nahrání `functions.php` + `patterns/*.php` na produkci +
  ruční výměnu starého vzoru za nový v každé šabloně** (stejný FTP postup
  jako u předchozích souborů, pozor na oprávnění po uploadu).
- **Otevřené:** `/rezervace/` pořád 301-redirectuje na `/` (viz „Cache
  diagnostika" níž — potřebuje rozhodnutí ve wp-adminu, ne kód), kontrola
  DevTools Service Workers zatím neproběhla.

## Patička — redesign (20. 7. 2026)

Honza chtěl patičku „profi" na obou webech — sladit vzhled aktuální
patičky na `bohemi.fit` (kterou nahrazuje Astro web) s tím, co už bylo
hezké na `studio.bohemi.fit`. Uděláno na obou stranách zvlášť (ne sdílený
kód — Astro a WordPress jsou different runtime), ale se stejným obsahem:

- **Astro (`src/components/Footer.astro`)** — přidány otevírací doba, odkaz
  „Zobrazit na mapě →" (stejný vzor jako `/kontakt/`), sociální sítě
  (Facebook/Instagram — zatím placeholder URL, stejné `// TODO` jako
  `kontakt.astro`), a nový spodní řádek s právními odkazy (Obchodní
  podmínky, Zpracování osobních údajů, Provozní řád). **Právní stránky
  ještě nejsou postavené v Astro** (CLAUDE.md: „Zatím nepostavené"), takže
  odkazy dočasně míří ven na potvrzené WordPress URL
  (`studio.bohemi.fit/vseobecne-obchodni-podminky/` atd.) — až vzniknou
  vlastní Astro stránky, přepsat na interní odkazy. **Žádný kontaktní
  formulář** — CLAUDE.md pravidlo 1 (jen statika, `mailto:`/`tel:`),
  Honza to potvrdil explicitně. Smazán i nepoužívaný a věcně špatný
  i18n klíč `footer_address` („Blanická 25" — stará/mrtvá hodnota, nikde se
  nepoužívala). Build (`npm run build`) i `node scripts/check-links.mjs`
  prošly bez chyb.
- **WordPress** (obsah pak přesunutý z `parts/footer.html` do
  `functions.php` jako Vzor, viz „Patička — zjištění" níž) — stejný obsah
  (kontakt, mapa, otevírací doba, sociální sítě, právní
  odkazy — tady už jako interní `/vseobecne-obchodni-podminky/` atd., je to
  stejná doména), navíc sloupec „Odkazy" (Hlavní web → `bohemi.fit`,
  Rezervace lekcí → `/`, Můj účet → `/ucet-clenstvi/`). Bez kontaktního
  formuláře stejně jako Astro (šlo o jednoduchost/konzistenci, ne o tvrdé
  pravidlo jako u Astra — pokud bys chtěl fungující formulář, potřeboval by
  to plugin jako Contact Form 7/WPForms, není to jen úprava šablony).
  **Bonus oprava:** v `assets/css/bohemi.css` bylo zapomenuté pravidlo
  `.bohemi-header { padding:24px 0; }` ze starého smazaného draftu headeru
  — kolidovalo se stejnojmennou třídou v `bohemi-wp-ui` a přidávalo
  nechtěný padding do živého headeru. Smazáno spolu s dalšími nepoužitými
  třídami (`bohemi-brand-title`, `bohemi-tagline`).

## Patička — zjištění: nebyla to Část šablony (20. 7. 2026)

Po nahrání `parts/footer.html` na produkci se v patičce nic nezměnilo.
Důvod: **live patička na `studio.bohemi.fit` není Část šablony (Template
Part)** jako header, ale ručně vytvořený **synchronizovaný Vzor** (Pattern,
`core/fullwidth-footer-with-background-color-and-three-columns` — výchozí
TT5 ukázkový vzor s placeholder obsahem „2020 Lomita Blvd, Torrance, CA"),
natvrdo vložený přímo do jednotlivých šablon stránek (potvrzeno aspoň v
šabloně „page"). Proto náš `parts/footer.html` nikdo nikdy nenačetl — nic
na webu na tenhle soubor neodkazovalo.

**První pokus:** předělat to na skutečnou Část šablony (`theme.json`
`templateParts` + `parts/footer.html`), stejný mechanismus jako header.
Fungovalo by to, ale ukázalo se to jako matoucí — vkládání Části šablony
jde přes jinou cestu (záložka „Bloky" → „Šablonová část") než vkládání
headeru (záložka „Vzory" → BoHeMi), a Honza chtěl radši mít oboje stejně,
i za cenu menší technické čistoty.

**Finální rozhodnutí (Honza, 20. 7. 2026): patička jako Vzor, stejně jako
header.** `parts/footer.html` i `templateParts` deklarace v `theme.json`
byly odstraněné. Místo toho `functions.php` registruje
`bohemi-twentytwentyfive-child/footer` jako `register_block_pattern()` —
identický vzor přístupu jako `bohemi-wp-ui/patterns/header.php` (jeden
`core/html` blok, žádné riziko „neplatného bloku", stejný jmenný prostor
CSS tříd z `bohemi.css`).

**Bonus oprava při té příležitosti:** zjistilo se, že se ve „Vzorech"
zobrazovaly **dvě různé složky „BoHeMi"** (matoucí samo o sobě) — plugin
`bohemi-wp-ui` registruje kategorii vzorů se slugem `bohemi-header`, ale
motiv dřív používal jiný slug `bohemi` (oba měly stejný **label** „BoHeMi",
ale WordPress skupiny vzorů rozlišuje podle slugu, ne podle labelu, takže
vznikly dvě oddělené složky se stejným jménem). Sjednoceno — motiv teď
používá stejný slug `bohemi-header` jako plugin (`functions.php` i oba
content patterny `reservation-page.php`/`account-page.php`), takže header,
footer i patterny pro rezervace/účet jsou od teď pohromadě v jedné složce
„BoHeMi".

**Vkládání teď funguje stejně jako u headeru:**
1. V každé šabloně, kde je patička natvrdo vložená jako starý Vzor
   (minimálně „page", zkontrolovat i „Úvodní stránka webu", „Jednotlivé
   příspěvky", „Stránka 404", „Všechny archivy", „Výsledky vyhledávání"),
   ten starý vzor **odebrat** (označit blok → Možnosti → Odstranit).
2. **„+" → záložka „Vzory" → složka „BoHeMi" → „BoHeMi — Footer"** — vloží
   se jedním klikem, stejně jako header.
3. Uložit každou upravenou šablonu.

**Vědomý trade-off:** protože je to (stejně jako header) nesynchronizovaný
vzor, každé vložení vytvoří **nezávislou kopii** — budoucí úprava patičky
se neprojeví automaticky všude, kde už byla vložená, musí se to zopakovat
na každé šabloně zvlášť. Pro tenhle web (málo šablon, patička se nemění
často) je to přijatelná cena za jednodušší a konzistentní ovládání. Kdyby
se to v budoucnu ukázalo jako otravné, dá se to kdykoliv vrátit na
sdílenou Část šablony (viz výš, jak na to).

## Motiv — audit a oprava (20. 7. 2026)

Zjištěno při diagnóze cache problému (viz níž): živý `studio.bohemi.fit`
běží na `wp-content/themes/bohemi-twentytwentyfive-child/`, ne na holém
Twenty Twenty-Five, jak jsme předpokládali při návrhu `bohemi-wp-ui`
(rozhodnutí zůstat jen u pluginu). Ukázalo se, že motiv i plugin jsou
potřeba, každý pro jinou práci — plugin pro header, motiv pro globální
styly a obsahové patterny (viz tabulka výš).

**Zdroj tohoto adresáře:** stejný ZIP jako dřívější „inspirace"
`bohemi-wp-final-child.zip` (Honza ho 20. 7. 2026 znovu nahrál do `_raw/`,
identický obsah/velikost jako předtím) — **nebyl to čerstvý export přímo z
produkce**, na skutečné soubory na hostingu jsem se nedostal (žádný
SSH/FTP přístup, jen HTTP, a přímý HTTP přístup do té složky byl tou dobou
navíc zablokovaný 403 — viz „CSS 403" níž). Pracoval jsem s nejlepším
dostupným zdrojem a opravil, co šlo ověřit zvenku:

- **`parts/header.html` smazán** — byl to hrubý pokus o totéž, co dělá
  `bohemi-wp-ui` (prázdný `wp:navigation`, bez loga/stylu). Motiv teď nemá
  vlastní header template part vůbec, dědí default a nahrazuje se stejně
  jako na čistém TT5 — `functions.php` má komentář, co to vysvětluje.
- **`patterns/reservation-page.html` a `patterns/account-page.html`
  převedeny na `.php`** se správnou hlavičkou (`Title:`/`Slug:`/`Categories:`)
  — jako `.html` je WordPress nikdy nenačetl (theme patterns se
  auto-discoverují jen z `.php` souborů s tímhle formátem). Kategorie se
  od té doby ještě jednou změnila (`bohemi` → `bohemi-header`), viz
  „Patička — zjištění" níž. Beze změny obsahu jinak.
- **`parts/footer.html` opraven, později celý odstraněný** — nejdřív
  opraven (odkazy na `/rezervace/` a `/membership-account/`), pak se
  ukázalo, že ho web vůbec nepoužívá (viz „Patička — zjištění" níž), a
  patička skončila jako Vzor v `functions.php` místo souboru v `parts/`.
  Historická oprava odkazů se přenesla do nového `functions.php`.
- **`assets/css/bohemi.css` verzování** — `functions.php` teď používá
  `filemtime()` místo statického `'1.0'`.

### ✅ CSS 403 — vyřešeno 20. 7. 2026 (oprávnění po FTP uploadu)

Po nahrání `bohemi-twentytwentyfive-child` i `bohemi-wp-ui` přes FTP (Total
Commander, Wedos hosting) vracely jejich statické assety (CSS/JS/PNG) `403
Forbidden`, i s reálným browser User-Agentem:

```
curl wp-content/themes/bohemi-twentytwentyfive-child/assets/css/bohemi.css
→ HTTP 403 "Server unable to read htaccess file, denying access to be safe"
```

**Příčina:** nově nahrané složky dostaly přes FTP jiná oprávnění/skupinu
než existující, funkční složky:

```
bohemi-twentytwentyfive-child   drwxr-x---   vlastník 256765   skupina 256765
twentytwentyfive (funkční)      drwxr-xr-x   vlastník 256765   skupina 500
```

Chybělo právo pro „ostatní" (`o+rx`) a nová složka měla skupinu shodnou s
vlastníkem místo skupiny `500`, pod kterou zjevně běží statický webserver
na tomhle Wedos hostingu. PHP soubory tím dotčené nebyly (WordPress/PHP-FPM
čte soubory jako vlastník, ne jako „ostatní") — proto pattern s menu
fungoval (viz Site Editor screenshot), ale CSS/JS/PNG, které si prohlížeč
stahuje napřímo, ne.

**Oprava:** rekurzivní `chmod 755` na složky / `644` na soubory přes FTP
(Total Commander: označit → **Soubory → Změnit atributy...**, ne Ctrl+M —
to je Multi-Rename). Total Commanderova rekurze se navíc ukázala
nespolehlivá u víceúrovňových složek (`assets/css/…`) — musely se projít
i podsložky zvlášť (`assets/`, `assets/css/`, `assets/js/`,
`assets/images/` a soubory v nich jednotlivě). Po opravě `curl -I` na
všechny assety obou balíčků vrací `200 OK` a header i motiv se na
produkci zobrazují správně.

**Pro příště:** stejný postup zopakuj po každém dalším FTP nahrání
nových/přidaných souborů do těchto dvou složek — nejde o nastavení, které
by se zapamatovalo natrvalo, dokud to Wedos podpora neediteje výchozí
skupinu FTP účtu (žádost na to jsme jim zatím neposílali).

## Cache diagnostika — Booking Activities nefunguje pro vracející se návštěvníky

Zadání znělo: „funguje v anonymním okně, ne v běžném profilu prohlížeče".
20. 7. 2026 jsem to prověřil živě (`curl` na `studio.bohemi.fit`, ne
odhad) — zápis kvůli budoucí referenci, kdyby se problém vrátil.

**Ověřeno, není to problém:**
- Verzování assetů (bod „Skripty a CSS správně verzovat") — Booking
  Activities, PMPro i WP core JS/CSS mají správné `?ver=` (`?ver=1.15.20`
  atd.). Cache busting tam funguje.
- AJAX endpoint kalendáře (`admin-ajax.php`) posílá
  `Cache-Control: no-cache, must-revalidate, max-age=0, no-store, private`
  — data o volných termínech se necachují.
- Service worker — v HTML zdroji homepage není žádná registrace
  (`serviceWorker.register`, `manifest.json`, `sw.js`). Nejde to ale 100%
  vyloučit bez DevTools na klientovi (Application → Service Workers) — to
  už musí zkontrolovat někdo s reálným prohlížečem.

**Nejpravděpodobnější příčina — potvrzeno:**
`/rezervace/` (na který odkazuje navigační CTA „Rezervovat") je trvalý
**301 redirect** zpět na `/`:

```
curl -I https://studio.bohemi.fit/rezervace/
HTTP/1.1 301 Moved Permanently
X-Redirect-By: WordPress
Location: https://studio.bohemi.fit/
```

Kalendář (`bookacti-booking-system-container`, reálný formulář) se přitom
vykresluje na `/`. Prohlížeče cachují **301 (trvalé) redirecty** mnohem
tvrdohlavěji než běžné stránky a nezávisle na `Cache-Control` — návštěvník,
jehož prohlížeč si jednou zapamatoval starý/jiný cíl tohoto redirectu (např.
z doby před touhle konfigurací), zůstane na něm zaseknutý, dokud ručně
nevyčistí data prohlížeče. Anonymní okno žádnou takovou historii nemá →
funguje napoprvé. To přesně sedí na popsaný symptom.

Vedlejší zjištění: `Server: ATS` + rostoucí `Age` hlavička potvrzují
edge/CDN cache na hostingu (`Cache-Control: max-age=300`) i bez cache
pluginu ve WordPressu — přesně jak zadání předpokládalo v bodě 1, jen tahle
5minutová cache není sama o sobě dost dlouhá na popsaný symptom.

**Co jsem opravil v `bohemi-wp-ui` (v1.1.0, viz jeho CHANGELOG):**
- `assets/css/header.css` a `assets/js/header.js` se teď verzují přes
  `filemtime()` místo statického čísla.
- Nový `includes/cache.php`: na stránce s kalendářem (dnes front page)
  posílá `Cache-Control: no-cache, must-revalidate`, zbytek webu se
  nedotkne.
- Volitelná, defaultně vypnutá a samo-expirující `Clear-Site-Data`
  hlavička pro jednorázové vyčištění zaseknutých klientů — zapíná se
  konstantou `BOHEMI_WP_UI_CLEAR_SITE_DATA_UNTIL` ve `wp-config.php`,
  nikdy neposílá `"cookies"` (nikoho by to neodhlásilo).

**Co musíš doladit ty ve wp-adminu** (nemám tam přístup):
1. **Hlavní oprava** — rozhodni, co má `/rezervace/` dělat: buď z něj zase
   udělej skutečnou stránku s kalendářem (pokud existovala a omylem se
   smazala), nebo přepni navigační CTA „Rezervovat" tak, aby mířilo rovnou
   na `/` a redirect přes `/rezervace/` úplně obešlo. Zkontroluj taky
   nastavení redirect pluginu (Redirection/Yoast/RankMath), pokud nějaký
   běží — `X-Redirect-By: WordPress` hlavička naznačuje, že to nastavuje
   WP/plugin, ne server/hosting config.
2. Otevři DevTools → Application → Service Workers na `studio.bohemi.fit` a
   ověř, že tam nic neběží (viz výš, nemůžu to zkontrolovat vzdáleně).
3. Po nasazení opravy z bodu 1 zvaž dočasné zapnutí
   `BOHEMI_WP_UI_CLEAR_SITE_DATA_UNTIL` na pár dní, ať se stuck návštěvníci
   sami „opraví" bez nutnosti jim říkat „vymažte cache".

## Historie `_raw/` zdrojů (co zůstalo, co se vrátilo, co je jen vendor)

19. 7. 2026 sem byly krátce přesunuté starší nálezy z `_raw/` (plugin
`bohemi-custom-ui`, child theme `bohemi-wp-final-child`, vendor ZIPy
Booking Activities + Twenty Twenty-Five) jako inspirace při stavbě
`bohemi-wp-ui` a zase smazané, protože v tu chvíli šlo jen o header. O den
později se ukázalo, že ten „child theme inspirace" je ve skutečnosti (starší
verze) toho, co běží živě na produkci — vrátil se zpátky, opravený, viz
„Motiv — audit a oprava" výš. **Nic z tohohle nebylo nikdy commitnuté do
gitu** (`wordpress/` byl celou dobu untracked), takže v historii repa nejsou
— zdrojem pravdy zůstávají ZIPy v `_raw/` (gitignored):

- `_raw/bohemi-custom-ui-v116.zip` — pořád aktivně potřeba, viz checklist výš.
  (Krátce jsem ho omylem smazal beze zálohy při úklidu `wordpress/` — zpátky
  do `_raw/` ho 20. 7. 2026 znovu nahrál Honza.)
- `_raw/booking-activities.zip`, `_raw/twentytwentyfive.zip` — vendor,
  needituje se, jen pro referenci/rychlou instalaci.
- `_raw/bohemi-wp-final-child.zip` — ukázalo se, že to NENÍ jen inspirace,
  ale (nejspíš starší verze) toho, co skutečně běží na produkci jako
  `bohemi-twentytwentyfive-child` — motiv se 20. 7. 2026 vrátil zpátky,
  opravený, jako [`bohemi-twentytwentyfive-child/`](bohemi-twentytwentyfive-child/)
  (viz „Motiv — audit a oprava" výš). Zdrojový ZIP zůstává i v `_raw/`.
