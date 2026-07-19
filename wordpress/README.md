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
| Motiv | **`bohemi-twentytwentyfive-child`** (child theme nad TT5) | live na produkci, ⚠️ CSS aktuálně 403 — viz níž | ✅ ano — [`bohemi-twentytwentyfive-child/`](bohemi-twentytwentyfive-child/), ZIP v [`dist/bohemi-twentytwentyfive-child.zip`](dist/bohemi-twentytwentyfive-child.zip) |
| Rezervace | **Booking Activities** | WP plugin (booking systém) | ne — vendor, needituje se |
| Členství/platby | **Paid Memberships Pro** | WP plugin | ne — vendor, needituje se |
| Styl formulářů Booking Activities + PMPro | **`bohemi-custom-ui`** v1.16 | vlastní plugin, submit tlačítko/cenové a uživatelské boxy | ne — jen `_raw/bohemi-custom-ui-v116.zip` (gitignored) |
| Hlavička | **`bohemi-wp-ui`** | vlastní plugin | ✅ ano — [`bohemi-wp-ui/`](bohemi-wp-ui/), instalační ZIP v [`dist/bohemi-wp-ui.zip`](dist/bohemi-wp-ui.zip) |

`bohemi-wp-ui`, `bohemi-twentytwentyfive-child` a `bohemi-custom-ui` řeší
**tři různé věci** (header / globální styly + obsahové patterny / styl
formulářů) a běží vedle sebe — žádný nenahrazuje druhý.

## Instalační checklist (v tomhle pořadí)

1. **`bohemi-twentytwentyfive-child`** — aktivuj jako motiv (Vzhled →
   Motivy). Na produkci pravděpodobně už běží (viz „⚠️ CSS 403" níž) —
   pokud ano, jen **přehraj soubory přes FTP/SFTP** stejnou složkou
   (`wp-content/themes/bohemi-twentytwentyfive-child/`), aktivace se
   nemění, WordPress bere identitu motivu podle názvu složky.
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

Po instalaci všech čtyř kroků by `studio.bohemi.fit` měl mít: fungující
rezervace a členství, stylizované formuláře, hlavičku vizuálně sladěnou s
`bohemi.fit` a funkční vlastní styly z child theme.

## Motiv — audit a oprava (20. 7. 2026)

Zjištěno při diagnóze cache problému (viz níž): živý `studio.bohemi.fit`
běží na `wp-content/themes/bohemi-twentytwentyfive-child/`, ne na holém
Twenty Twenty-Five, jak jsme předpokládali při návrhu `bohemi-wp-ui`
(rozhodnutí zůstat jen u pluginu). Ukázalo se, že motiv i plugin jsou
potřeba, každý pro jinou práci — plugin pro header, motiv pro globální
styly a obsahové patterny (viz tabulka výš).

**Zdroj tohoto adresáře:** stejný ZIP jako dřívější „inspirace"
`bohemi-wp-final-child.zip` (Honza ho 20. 7. 2026 znovu nahrál do `_raw/`,
identický obsah/velikost jako předtím) — **není to čerstvý export přímo z
produkce**, na skutečné soubory na hostingu se nedostanu (viz „⚠️ CSS 403"
níž, přímý HTTP přístup do té složky je zablokovaný a SSH/FTP nemám).
Pracuju s nejlepším dostupným zdrojem a opravil jsem, co šlo ověřit zvenku:

- **`parts/header.html` smazán** — byl to hrubý pokus o totéž, co dělá
  `bohemi-wp-ui` (prázdný `wp:navigation`, bez loga/stylu). Motiv teď nemá
  vlastní header template part vůbec, dědí default a nahrazuje se stejně
  jako na čistém TT5 — `functions.php` má komentář, co to vysvětluje.
- **`patterns/reservation-page.html` a `patterns/account-page.html`
  převedeny na `.php`** se správnou hlavičkou (`Title:`/`Slug:`/`Categories:`)
  — jako `.html` je WordPress nikdy nenačetl (theme patterns se
  auto-discoverují jen z `.php` souborů s tímhle formátem). `functions.php`
  navíc registruje pattern kategorii `bohemi`, kterou používají.
  Beze změny obsahu jinak.
- **`parts/footer.html` opraven** — odkazoval na `/rezervace/` (potvrzeno
  jako trvalý 301 na `/`, viz „Cache diagnostika" níž) a na
  `/membership-account/` (nikdy neexistoval). Opraveno na `/` a na skutečný
  ověřený slug `/ucet-clenstvi/`. „Členství" zůstalo beze změny — nemáme
  ověřený slug PMPro levels stránky.
- **`assets/css/bohemi.css` verzování** — `functions.php` teď používá
  `filemtime()` místo statického `'1.0'`.

### ⚠️ CSS 403 — potřebuje zásah na hostingu, ne v kódu

Ověřeno `curl` (i s reálným browser User-Agentem, kontrolní request na
plugin CSS ve stejnou chvíli vrátil 200 OK):

```
curl wp-content/themes/bohemi-twentytwentyfive-child/assets/css/bohemi.css
→ HTTP 403 "Server unable to read htaccess file, denying access to be safe"
```

Celá složka motivu je takhle zablokovaná (i `style.css`, `theme.json`,
`parts/header.html` — jen tahle jedna složka, pluginy fungují normálně).
**Znamená to, že vlastní BoHeMi styly z tohohle motivu se na produkci teď
vůbec nenačítají.** Hláška „Server unable to read htaccess file" ukazuje na
problém s oprávněními/čitelností `.htaccess` souboru někde v cestě k té
složce na úrovni souborového systému — to není něco, co opraví jiný obsah
motivu, potřebuje to zásah přes hosting (zkontrolovat/opravit oprávnění,
případně kontaktovat podporu hostingu). Doporučený postup: přes FTP/SFTP
zkontrolovat `chmod` složky `wp-content/themes/bohemi-twentytwentyfive-child/`
(očekávané 755 pro složky, 644 pro soubory) a případný `.htaccess` v ní
nebo nad ní.

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
