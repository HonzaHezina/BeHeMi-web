# Changelog

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
