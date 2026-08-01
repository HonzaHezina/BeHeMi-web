# Changelog

## 1.1.8 — 2026-08-01

Google Fonts request pro Hanken Grotesk zúžen z 8 řezů (`ital,wght@0,400;
0,500;0,600;0,700;0,800;1,400;1,500;1,600`) na 4 (`wght@400;600;700;800`) —
WebPageTest audit potvrdil, že `header.css`/`bohemi.css` používají jen
400/600/700/800 a nikde kurzívu (shoduje se s CLAUDE.md pravidlem „žádná
kurzíva"). Prohlížeč nepoužité řezy stejně nestahoval (font se nenačte, dokud
ho nic v DOM nepoužije), takže jde hlavně o vyčištění deklarace, ne o velkou
úsporu přenosu dat.

## 1.1.7 — 2026-08-01

Odstraněn samostatný textový odkaz **„Přihlásit se" / „Odhlásit se"**
z horní i mobilní navigace (`patterns/header.php`, funkce
`bohemi_wp_ui_auth_link()` v `includes/urls.php` smazána, nepoužité CSS
`.bohemi-header-link--auth` a `.bohemi-header-mobile-divider` smazáno).
Honza nahlásil, že odkaz trvale zobrazoval „Odhlásit se" i pro odhlášené
návštěvníky a klik na něj nefungoval spolehlivě — přesně sedí na
zdokumentované omezení (viz README „Přihlášení / Odhlášení"): odkaz se
do Šablonové části v Site Editoru uloží jako zamrzlý HTML snímek z
okamžiku vložení (tehdy přihlášeného účtu), takže po čase přestane
odpovídat reálnému stavu jednotlivých návštěvníků. Namísto opravy
(vyžadovala by dynamický blok `core/loginout` nebo živé přerenderování)
byl odkaz smazán úplně — „Můj účet" v navigaci vede na PMPro account
stránku, která přihlášení i odhlášení řeší sama a živě, takže funkčně
nic nechybí.

## 1.1.6 — 2026-08-01

Přidán **favicon** (tab ikona v prohlížeči) — stejný červený kettlebell
mark jako na Astro webu (oříznutý z `src/assets/logo_bohemi_trans.png`,
bez postranních činek, aby zůstal čitelný i v 16px). Nová funkce
`bohemi_wp_ui_favicon()` na `wp_head` vypisuje `<link rel="icon">` +
`apple-touch-icon` přímo z `assets/images/` — záměrně ne přes wp-adminí
„Ikona webu" (Nastavení → Obecné), protože to by nebylo ničím
verzované/trackované v repu a favicon by po dalším update pluginu zůstal
neaktuální. Na rozdíl od headeru/patičky (Části šablony) se tenhle způsob
projeví hned po nahrání nové verze — `wp_head` se generuje čerstvě při
každém načtení stránky, žádný re-insert v Site Editoru není potřeba.
Nové soubory: `assets/images/favicon-16x16.png`, `favicon-32x32.png`,
`apple-touch-icon.png` (180×180, krémové pozadí — průhlednost by na iOS
vypadala jako černý čtverec).

## 1.1.5 — 2026-08-01

Dvě Honzovy úpravy nav/loga:

- **Odstraněny odkazy „Rezervace lekcí" a „Členství" z hlavičky** (desktop
  i mobilní panel) — zůstává jen „Hlavní web", „Můj účet" a
  Přihlásit/Odhlásit. `bohemi_wp_ui_booking_url()`/`bohemi_wp_ui_membership_url()`
  v `includes/urls.php` zůstaly beze změny (booking URL pořád používá
  patička a `includes/cache.php`), jen přestaly být volané v headeru.
- **Logo/wordmark teď vede na `home_url('/')` (studio.bohemi.fit), ne na
  `bohemi_wp_ui_main_site_url()` (bohemi.fit).** Klik na logo v hlavičce
  dřív odváděl pryč z webu, na kterém uživatel je — teď se chová jako
  běžné logo (vede na domovskou stránku aktuálního webu). Cesta na
  `bohemi.fit` zůstává přes nav odkaz „Hlavní web".

## 1.1.4 — 2026-07-31

Odstraněno CTA tlačítko **„Rezervovat"** z headeru (desktop i mobilní
cluster) — Honzovo rozhodnutí: na `studio.bohemi.fit` samotném nedávalo
smysl mít v hlavičce tlačítko, které vede zpátky na web, na kterém už
jsi. „Rezervace lekcí" zůstává v obou menu jako běžný nav odkaz a plní
tuhle roli dál. `bohemi_wp_ui_reserve_url()` v `includes/urls.php` beze
změny — používá ji teď jen patička (`bohemi-twentytwentyfive-child`, viz
`wordpress/README.md`). Uklizeny i navazující nepoužívané CSS třídy
(`.bohemi-header-cta`, `.bohemi-header-cta--mobile`) a proměnné
(`--bohemi-header-accent-text`, `--bohemi-header-accent-deep`,
`--bohemi-header-cream`, `--bohemi-header-radius`) v `assets/css/header.css`.

## 1.1.3 — 2026-07-31

Sladěno s Astro headerem po jeho úpravě téhož dne (`src/components/Header.astro`):
mobilní menu se teď zavírá i **kliknutím kamkoliv mimo něj**, ne jen křížkem/
odkazem/Escape jako dřív. Přidán `document` click listener v
`assets/js/header.js`, který zavře `<details>`, pokud je otevřený a klik
nespadá do jeho `contains()`. Beze změny v CSS ani markupu.

## 1.1.2 — 2026-07-20

`bohemi_wp_ui_account_url()` už nezkouší `pmpro_url('account')` ani
page-lookup — vrací natvrdo `https://studio.bohemi.fit/ucet-clenstvi/`
(pořád přepsatelné konstantou `BOHEMI_ACCOUNT_URL`). Dynamický resolver
(oprava v 1.1.1) na produkci nevrátil opravenou hodnotu ani po nahrání
souboru a znovu-vložení patternu — nepodařilo se živě určit, jestli
příčinou bylo nenahrání souboru, PHP OPcache, nebo konfigurace PMPro.
Honza se rozhodl to nedebugovat naslepo dál a hardcodovat ověřenou URL
místo toho.

## 1.1.1 — 2026-07-20

Oprava chyby: **„Můj účet" v headeru měl prázdný `href=""`** (potvrzeno
živě na `studio.bohemi.fit`). Příčina: `pmpro_url()` vrací prázdný řetězec
(ne `null`/`false`), když PMPro nemá ve svém nastavení vyplněnou vlastní
stránku pro danou roli — `??` operátor prázdný řetězec nezachytí (není to
`null`), takže se nepoužil žádný fallback. Opraveno v `includes/urls.php`
explicitní kontrolou `!empty()` na výsledek `pmpro_url()` ve všech třech
místech, kde se používá: `bohemi_wp_ui_account_url()`,
`bohemi_wp_ui_membership_url()`, `bohemi_wp_ui_reserve_url()`. Teď správně
spadnou na vyhledání stránky podle slugu (`ucet-clenstvi` u účtu) a nakonec
na `home_url()`.

## 1.1.0 — 2026-07-20

Cache/versioning fixy — diagnostika popsaná ve `wordpress/README.md`
(„Booking Activities funguje v anonymním okně, ne pro vracející se
návštěvníky").

- `assets/css/header.css` a `assets/js/header.js` se teď verzují přes
  `filemtime()` (nová `bohemi_wp_ui_asset_version()`), ne statickým
  `BOHEMI_WP_UI_VERSION` — každá úprava souboru automaticky dostane nové
  `?ver=`, není potřeba pamatovat na ruční bump verze.
- Nový `includes/cache.php`: na stránce, kde se skutečně vykresluje
  rezervační kalendář (dnes front page, viz README), posílá
  `Cache-Control: no-cache, must-revalidate`, aby ta jedna dynamická
  stránka neseděla za víceminutovou edge/browser cache jako zbytek webu.
- Volitelná, defaultně vypnutá, samo-expirující hlavička
  `Clear-Site-Data: "cache", "storage"` (nikdy `"cookies"` — nikoho
  neodhlašuje) — zapíná se jen konstantou `BOHEMI_WP_UI_CLEAR_SITE_DATA_UNTIL`
  s datem ve `wp-config.php`, po tom datu se sama přestane posílat i kdyby
  na ni někdo zapomněl.

## 1.0.0 — 2026-07-19

První kompletní verze.

- Block pattern `bohemi-wp-ui/header` (kategorie „BoHeMi" + „Header") pro
  šablonovou část Záhlaví v Site Editoru (Twenty Twenty-Five).
- Hlavička vizuálně sladěná s `src/components/Header.astro` a design tokeny
  z `src/styles/global.css`: barvy, font (Hanken Grotesk 400–800), CTA
  tlačítko, aktivní podtržení, sticky + blur pozadí, max-width 1220px.
- Logo převzaté z `src/assets/logo_bohemi_trans.png`, vede na hlavní Astro
  web (`https://bohemi.fit/`).
- WP-specifické menu: Hlavní web, Rezervace lekcí, Členství, Můj účet,
  Přihlásit se/Odhlásit se, CTA Rezervovat — všechny URL řešeny přes
  konstanta → filtr → WP lookup → fallback (`includes/urls.php`), žádná
  natvrdo zapsaná náhodná adresa.
- Přístupné mobilní menu (`<details>/<summary>`, žádný JS framework):
  aria-expanded, aria-controls, zavření po kliknutí na odkaz, zavření na
  Escape s návratem fokusu.
- CSS proměnné `--bohemi-header-*` odvozené z Astro tokenů, jmenný prostor
  `.bohemi-header-*` / `bohemi_wp_ui_*` — bez kolize s Twenty Twenty-Five,
  Booking Activities nebo Paid Memberships Pro.
- Plugin nevytváří žádné WP options, custom post types ani DB tabulky —
  bezpečně odstranitelný kdykoliv.
