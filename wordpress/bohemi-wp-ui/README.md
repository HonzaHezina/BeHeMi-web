# BoHeMi WP UI

Vlastní hlavička pro `studio.bohemi.fit` (WordPress / Twenty Twenty-Five,
resp. jeho child theme `bohemi-twentytwentyfive-child` — viz
`wordpress/README.md` / Booking Activities / Paid Memberships Pro),
vizuálně sladěná s hlavičkou hlavního marketingového webu postaveného v
Astro (`bohemi.fit`).

Plugin **neupravuje žádný soubor Twenty Twenty-Five ani child theme nad ním**.
Funguje nezávisle na aktivním motivu (viz „Proč core/html" níž).
Dodává vlastní block pattern (`bohemi-wp-ui/header`), vlastní CSS/JS a
vlastní logo — vše pod jmenným prostorem `bohemi-header-*` / `bohemi_wp_ui_*`.

## Zdroj designu

Všechny hodnoty (barvy, fonty, rozměry, breakpointy, chování CTA a menu)
byly převzaty přímo z Astro projektu, ne odhadnuty:

| Co | Odkud |
|---|---|
| Struktura hlavičky, breakpointy, mobilní menu | `src/components/Header.astro` |
| Barvy, font, border-radius (design tokeny) | `src/styles/global.css` (`@theme` blok) |
| Vzhled CTA tlačítka „Rezervovat" | `src/components/Button.astro` (`variant="brand"`) |
| Logo | `src/assets/logo_bohemi_trans.png` (zkopírováno do `assets/images/logo-bohemi.png`) |
| Font (Hanken Grotesk, řezy 400–800) | `src/layouts/Layout.astro` (stejná Google Fonts URL) |

CSS proměnné v `assets/css/header.css` (`--bohemi-header-bg`,
`--bohemi-header-text`, `--bohemi-header-accent`, `--bohemi-header-max-width`,
`--bohemi-header-height`, `--bohemi-header-radius`, …) mají v komentáři u
každé přesně napsáno, ze kterého Astro tokenu vychází.

**Poznámka k barvě:** `--color-accent` je v Astro projektu aktuálně
placeholder (`#e2231a`, čeká na přesný hex z brand manuálu — viz
`src/styles/global.css`). Tento plugin ji přebírá 1:1. Až se v Astro
projektu placeholder nahradí finálním hexem, aktualizuj i
`assets/css/header.css` (a vydej novou verzi pluginu, viz níže).

## Menu ve WordPressu ≠ menu na marketingovém webu

WordPress instalace slouží jen jako rezervační/členská část, takže header
zde má jiný obsah než na `bohemi.fit`:

- **Hlavní web** → `bohemi.fit` (marketingový Astro web)
- **Rezervace lekcí** → stránka s Booking Activities (aktuálně front page
  `/`, viz „⚠️ `/rezervace/`" níž)
- **Členství** → PMPro „levels" stránka
- **Můj účet** → PMPro „account" stránka (řeší přihlášení i odhlášení sama —
  PMPro shortcode na této stránce zobrazuje login formulář odhlášeným a
  dashboard přihlášeným uživatelům)
- **Přihlásit se / Odhlásit se** → samostatný textový odkaz vedle „Můj účet"
- **Rezervovat** (CTA) → skutečná rezervační stránka

Dropdown „Lekce a služby" z marketingového webu se do WP hlavičky záměrně
nepřenáší — WP nabídka je jiná (viz výše), ne rozcestník lekcí.

### Jak plugin hledá URL (v tomto pořadí)

1. PHP konstanta ve `wp-config.php` (nejvyšší priorita, nikdy nepřepsána update pluginu)
2. WordPress filtr (z motivu nebo mu-pluginu)
3. Vyhledání skutečné WP stránky podle běžných slugů
4. Bezpečný fallback (`home_url('/')`, případně PMPro API)

| Konstanta | Filtr | Účel | Výchozí hodnota |
|---|---|---|---|
| `BOHEMI_MAIN_SITE_URL` | `bohemi_wp_ui_main_site_url` | Hlavní web | `https://bohemi.fit/` |
| `BOHEMI_BOOKING_URL` | `bohemi_wp_ui_booking_url` | Rezervace lekcí | hledá stránku `rezervace-lekci` / `rezervace` / `booking` / `lekce` / `kalendar` |
| `BOHEMI_MEMBERSHIP_URL` | `bohemi_wp_ui_membership_url` | Členství | `pmpro_url('levels')`, pokud je PMPro aktivní |
| `BOHEMI_ACCOUNT_URL` | `bohemi_wp_ui_account_url` | Můj účet | `pmpro_url('account')`, jinak stránka `ucet-clenstvi` (potvrzeno živě 20. 7. 2026) |
| `BOHEMI_RESERVE_URL` | `bohemi_wp_ui_reserve_url` | CTA „Rezervovat" | stránka rezervací → PMPro checkout → home |

Příklad přepsání ve `wp-config.php`:

```php
define( 'BOHEMI_BOOKING_URL', 'https://studio.bohemi.fit/' );
```

nebo filtrem (např. z mu-pluginu):

```php
add_filter( 'bohemi_wp_ui_booking_url', fn () => 'https://studio.bohemi.fit/' );
```

**⚠️ `/rezervace/` aktuálně NENÍ funkční cíl** — je to trvalý (301) redirect
zpět na `/`, kde se kalendář ve skutečnosti vykresluje (ověřeno 20. 7. 2026,
viz `wordpress/README.md`). Proto výchozí lookup výš (a příklad nad tímto
odstavcem) míří na `home_url('/')`, ne na `/rezervace/`. Až se tenhle redirect
ve WP admin vyřeší (buď se `/rezervace/` stane zase skutečnou stránkou s
kalendářem, nebo se nav odkaz „Rezervovat" přepne rovnou na `/`), přepiš
`BOHEMI_BOOKING_URL`/`BOHEMI_RESERVE_URL` zpátky na `/rezervace/`.

### Přihlášení / Odhlášení — známé omezení

Odkaz „Přihlásit se" / „Odhlásit se" se vypočítá v okamžiku, kdy pattern
otevřeš nebo znovu vložíš v Site Editoru — Site Editor v tu chvíli běží pod
tvým (přihlášeným) účtem, takže se do šablonové části uloží statický snapshot
(nejčastěji „Odhlásit se" s nonce vázaným na tvou tehdejší session). Pro
běžné návštěvníky to funguje bezpečně (WP u neplatného nonce jen zobrazí
potvrzovací stránku odhlášení, nic se nerozbije), ale text/odkaz nereaguje
živě na stav KAŽDÉHO konkrétního návštěvníka po uložení.

Pokud je potřeba plně živý stav (jiný text pro přihlášené/nepřihlášené
návštěvníky), nahraď po vložení patternu jen tento jeden odkaz nativním
blokem **„Log In/Out"** (`core/loginout`) — je to standardní dynamický blok
WordPressu, funguje v Site Editoru bez úprav. Případně napiš, ať doplníme
plnohodnotný dynamický blok v další verzi.

### Cache hlavičky (od v1.1.0)

Přidáno kvůli diagnóze „Booking Activities funguje v anonymním okně, ne pro
vracející se návštěvníky" (plný popis a naměřené hodnoty ve `wordpress/README.md`).
`includes/cache.php` řeší jen server-side polovinu:

- Na stránce, kde se skutečně vykresluje rezervační kalendář (dnes front
  page, detekce viz `bohemi_wp_ui_is_booking_request()`), posílá
  `Cache-Control: no-cache, must-revalidate` — ta jedna dynamická stránka
  nemá sedět za víceminutovou edge cache jako zbytek webu. Zbytek webu se
  nedotkne, cachuje se dál normálně.
- Volitelná, defaultně vypnutá `Clear-Site-Data: "cache", "storage"`
  (nikdy `"cookies"`) pro jednorázové vyčištění u návštěvníků zaseknutých na
  staré cache. Zapíná se ve `wp-config.php`:

  ```php
  define( 'BOHEMI_WP_UI_CLEAR_SITE_DATA_UNTIL', '2026-07-23' );
  ```

  Po tom datu se sama přestane posílat, i kdyby na ni někdo zapomněl — ale
  jakmile je jasné, že problém zmizel, konstantu radši smaž hned, nečekej na
  vypršení.

Asset verze (`?ver=` u `header.css`/`header.js`) se od téhle verze počítá
z `filemtime()` (`bohemi_wp_ui_asset_version()` v `bohemi-wp-ui.php`), ne ze
statického čísla — každá úprava souboru na disku automaticky dostane nové
`?ver=` bez ručního bumpu verze pluginu.

**Tohle neřeší samotný `/rezervace/` 301 redirect** (nejpravděpodobnější
kořen problému) — to je potřeba opravit ve wp-admin, viz
`wordpress/README.md`.

## Instalace

1. Nahraj `dist/bohemi-wp-ui.zip` do **Pluginy → Přidat nový → Nahrát plugin** a klikni **Instalovat**.
2. **Aktivuj** plugin.
3. Jdi do **Vzhled → Editor** (Site Editor — funguje stejně na čistém Twenty
   Twenty-Five i na `bohemi-twentytwentyfive-child`, protože ten motiv
   žádnou vlastní hlavičku nedodává, viz `wordpress/README.md`).
4. V levém menu zvol **Šablony** → nebo přímo **Vzory** (Site Editor je
   verzí od verze k verzi trochu jinak pojmenovává — hledej „Template Parts"
   / „Části šablony").
5. Otevři **Části šablony → Záhlaví** (Header).
6. V editoru klikni na **„+"** (Přidat blok) a najdi vzor **„BoHeMi — Header"**
   v kategorii **„BoHeMi"** (pattern je i v kategorii „Header", takže se
   nabídne i tam, kde WP standardně nabízí hlavičky).
7. Vlož ho **nad/místo** stávající kombinace `site-title` + `navigation`
   bloku a starou dvojici smaž (označ ji a stiskni Delete, nebo přes
   „Možnosti bloku → Odstranit").
8. Ulož (**Uložit**, případně znovu potvrď uložení šablony záhlaví).

### Pokud se pattern v inserteru neukáže automaticky

WordPress cachuje seznam vzorů per-request; pokud po aktivaci pluginu vzor
chybí, tvrdě obnov stránku Site Editoru (Ctrl/Cmd+Shift+R). Pattern lze také
najít přes vyhledávací pole v inserteru — napiš „BoHeMi".

### Odstranění pluginu

Bezpečné kdykoliv — plugin nevytváří žádné WP options, custom post types ani
databázové tabulky. Po deaktivaci/smazání zůstane ve stránce Záhlaví jen
statická HTML kopie hlavičky, kterou jsi tam v kroku 7 vložil (protože Site
Editor při uložení šablony vždy uloží kopii obsahu bloku) — pokud chceš i tu
pryč, smaž ji ručně ve Vzhled → Editor → Části šablony → Záhlaví.

## Struktura pluginu

```
bohemi-wp-ui/
├── bohemi-wp-ui.php       # bootstrap: konstanty, enqueue CSS/JS (filemtime verze), resource hints
├── includes/
│   ├── urls.php           # resolvery URL (konstanta → filtr → WP lookup → fallback)
│   └── cache.php          # Cache-Control na stránce s kalendářem + volitelné Clear-Site-Data
├── patterns/
│   └── header.php         # generuje HTML hlavičky + registruje block pattern
├── assets/
│   ├── css/header.css     # veškerý styl, jmenný prostor .bohemi-header-*
│   ├── js/header.js       # ~40 řádků: aria-expanded, zavření po kliku, Escape
│   └── images/
│       └── logo-bohemi.png
├── README.md
└── CHANGELOG.md
```

## Proč core/html a ne Navigation blok

Zadání preferuje nativní Navigation blok, pokud dovolí zachovat požadovaný
vzhled a přístupnost. Hlavička na `bohemi.fit` ale používá bezešvý
`<details>/<summary>` disclosure vzor bez JS frameworku a přesné
aria-expanded/aria-controls/Escape chování, které WP Navigation blok (jeho
vlastní overlay/modal mobilní menu) nereplikuje 1:1. Použili jsme proto
jeden `core/html` blok — je to **nativní, vždy platný** Gutenberg blok
(nemůže se zobrazit jako „neplatný blok" bez ohledu na verzi WP/šablony) a
dává nám plnou kontrolu nad přesným markupem. Cena: blok se v editoru edituje
jako syrové HTML, ne jako jednotlivé pod-bloky — v Site Editoru je ale
vizuální náhled identický s produkcí (stejné CSS se načítá i v editoru přes
`enqueue_block_assets`).

## Co nelze ověřit bez běžícího WordPressu

- **Přesné slugy stránek** pro rezervace/členství/účet — `includes/urls.php`
  zkouší nejběžnější varianty a PMPro API (`pmpro_url()`), ale finální adresy
  je potřeba potvrdit na živém `studio.bohemi.fit` a případně přepsat
  konstantou/filtrem (viz tabulka výše).
- **Zobrazení v reálném Site Editoru** (žádný „neplatný blok", správné
  našeptávání patternu v inserteru, chování při uložení šablony) — ověřeno
  jen staticky (PHP lint, kontrola block-comment syntaxe), ne živým WP.
- **PHP syntax check přes `php -l`** se v tomto prostředí nepodařilo spustit
  (PHP CLI není v systému nainstalováno) — soubory byly místo toho ručně
  zkontrolovány (vyvážené `<?php`/uzávěrky, escaping, typované návratové
  hodnoty). Doporučujeme spustit `php -l` na všech `.php` souborech před
  nasazením na produkci.
- **Skutečné PMPro nastavení** (jsou stránky `levels`/`account` vůbec
  nakonfigurované?) — pokud PMPro není aktivní nebo tyto stránky nemá
  nastavené, plugin spadne na page-lookup/`home_url()` fallback.

## URL, které je potřeba případně upravit

- `BOHEMI_MAIN_SITE_URL` — pokud produkční Astro doména nebude `bohemi.fit`.
- `BOHEMI_BOOKING_URL`, `BOHEMI_MEMBERSHIP_URL`, `BOHEMI_ACCOUNT_URL`,
  `BOHEMI_RESERVE_URL` — jakmile jsou známé přesné WP slugy.

## Verzování

Každá nová verze je kompletní — obsahuje vše z předchozích verzí, žádné
„experimentální" mezistavy. Viz `CHANGELOG.md`.
