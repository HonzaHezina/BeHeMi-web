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

## ⚠️ Honza nasazuje ze ZIPu, ne přes FTP soubor-po-souboru (potvrzeno 2. 8. 2026)

**Preferovaný a spolehlivý postup je Pluginy/Vzhled → Nahrát → ZIP soubor**
(`dist/bohemi-wp-ui.zip` / `dist/bohemi-twentytwentyfive-child.zip`), ne
kopírování jednotlivých souborů přes FTP — FTP na tomhle hostingu (Wedos)
opakovaně dávalo novým souborům špatná oprávnění (403), viz kroky 1 a 4
v checklistu níž a „Motiv — audit a oprava". ZIP instalace přes wp-admin
řeší práva správně sama.

**Důsledek pro mě (Claude): kdykoliv upravím cokoliv v `wordpress/bohemi-wp-ui/`
nebo `wordpress/bohemi-twentytwentyfive-child/`, MUSÍM ve stejném kroku
přegenerovat i odpovídající `dist/*.zip`** — jinak Honza nahraje starý kód a
nic se nezmění, bez jakékoli chybové hlášky (přesně se to stalo 2. 8. 2026 s
opravou „Hlavní web" v novém okně — zdrojový `header.php` byl opravený,
ale zapomenutý needitovaný ZIP furt obsahoval starou verzi). `dist/*.zip`
jsou gitignored build artefakty, git diff/status je NEUKÁŽE jako změněné,
takže je snadné na regeneraci zapomenout — kontroluj to ručně.

Tohle prostředí nemá `zip` CLI (Git Bash na Windows) — přegeneruj přes
PowerShell, zip musí mít kořenovou složku pojmenovanou přesně podle slugu
(`bohemi-wp-ui/…`, ne obsah nahozený rovnou do kořene):

```powershell
$tmp = Join-Path $env:TEMP 'bohemi-wp-zip'
Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $tmp | Out-Null
Copy-Item wordpress\bohemi-wp-ui (Join-Path $tmp 'bohemi-wp-ui') -Recurse
Compress-Archive -Path (Join-Path $tmp 'bohemi-wp-ui') -DestinationPath wordpress\dist\bohemi-wp-ui.zip -Force
Copy-Item wordpress\bohemi-twentytwentyfive-child (Join-Path $tmp 'bohemi-twentytwentyfive-child') -Recurse
Compress-Archive -Path (Join-Path $tmp 'bohemi-twentytwentyfive-child') -DestinationPath wordpress\dist\bohemi-twentytwentyfive-child.zip -Force
Remove-Item $tmp -Recurse -Force
```

Po přegenerování ověř, že ZIP fakt obsahuje novou verzi (např.
`unzip -p wordpress/dist/bohemi-wp-ui.zip "bohemi-wp-ui/bohemi-wp-ui.php" | grep Version`)
— nespoléhej jen na to, že se příkaz proběhl bez chyby.

## ⚠️ Nahrání souborů ≠ aktualizace živé stránky (přečti PŘED každou úpravou)

**FTP/plugin-ZIP upload mění jen soubory na disku — CSS/JS se projeví hned
(načítají se čerstvě), ale HTML header/patičky NE.** Obsah, který vidíš na
`studio.bohemi.fit`, je **statická kopie uložená v databázi** z okamžiku,
kdy jsi naposledy v Site Editoru vzor „BoHeMi — Header"/„BoHeMi — Footer"
vložil a uložil (Gutenberg vzory se při vložení zkopírují jako obyčejný
blok, ne jako živý odkaz na PHP zdroj). Aktualizace `header.php`/
`functions.php` v tomhle repu **nikdy sama o sobě nezmění**, co je uložené
v Šablonové části Záhlaví/Patička — dokud tam starý blok ručně nesmažeš a
vzor znovu nevložíš + neuložíš, uvidíš starý HTML stylovaný novým CSS
(typicky vypadá **hůř** než před update — chybí wrappery/třídy, na které
nové CSS spoléhá, viz „Patička natažená přes celou šířku" a jeho oprava
níž pro konkrétní příklad, kdy se přesně tohle stalo).

**Po KAŽDÉ aktualizaci `bohemi-wp-ui` nebo `bohemi-twentytwentyfive-child`,
která mění HTML markup patičky/headeru** (ne jen CSS): znovu otevři
Vzhled → Editor → Šablonové části → Záhlaví (resp. Patička), smaž starý
vložený blok, „+" → najdi aktuální vzor → vlož → Ulož. Je to nutné **při
každé** takové změně, ne jen při prvním nastavení.

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
   [`bohemi-wp-ui/README.md`](bohemi-wp-ui/README.md#instalace). ⚠️ Pokud
   soubory nahráváš přes FTP místo wp-adminí „Nahrát plugin" (např. rychlá
   aktualizace jen `assets/images/`), zkontroluj oprávnění stejně jako u
   motivu v kroku 1 — potvrzeno živě 1. 8. 2026, že nové soubory ve
   `bohemi-wp-ui/assets/images/` dostaly stejný špatný Wedos default a
   vracely 403 (viz „Motiv — audit a oprava" a „WebPageTest audit" níž).
5. **Patička** — od 31. 7. 2026 se vkládá **stejně jako header** (viz
   „Patička — zpět na Část šablony" níž): **Vzhled → Editor → Šablonové
   části → Patička**, smaž starý výchozí obsah, „+" → najdi **„BoHeMi —
   Footer"** (kategorie „BoHeMi" nebo „Zápatí") a vlož. Ulož. Sdílená
   Část šablony se propíše do všech šablon, které na ni odkazují,
   **pokud** tyhle šablony skutečně odkazují na sdílenou Část šablony
   Patička (výchozí chování Twenty Twenty-Five). Pokud v nějaké konkrétní
   šabloně (page, Úvodní stránka webu, 404, archivy, výsledky vyhledávání)
   pořád vidíš starou/jinou patičku i po tomhle kroku, ta šablona má
   nejspíš ještě nezávislou vloženou kopii z předchozího postupu (viz
   „Patička — zjištění" níž) — otevři ji, smaž vloženou patičku a nech tam
   jen výchozí odkaz na Část šablony (nebo znovu vlož „BoHeMi — Footer" tam,
   je to jednorázová oprava jen pro tu jednu šablonu).
6. **Login/registrace/účet — DVĚ stránky, stejný shortcode** (viz
   „Sjednocení loginu" níž pro celé zdůvodnění, včetně proč to nejde
   sloučit do jedné): obě mají obsah jen `[bohemi_account]`
   (definovaný v `bohemi-twentytwentyfive-child/functions.php`) — žádný
   jiný login/registrační shortcode nikam jinam na web nepatří.
   - **„Můj účet" (`/ucet-clenstvi/`)** — v PMPro nastavená jako
     **„Stránka účtu" (Account Page)**. „Require Membership" na téhle
     stránce nechat prázdné (nikdy nebyl problém), PMPro ji stejně sama
     gatuje vestavěně podle role Account Page.
   - **„Log In" (`/login/`)** — v PMPro nastavená jako **„Přihlašovací
     stránka" (Login Page)**. ⚠️ **Nikdy nenastavovat „Přihlašovací
     stránka" na `/ucet-clenstvi/`** — PMPro pak přesměrovává Account
     Page na sebe sama = nekonečná smyčka (`ERR_TOO_MANY_REDIRECTS`,
     živě potvrzeno 5. 8. 2026).

Po instalaci všech šesti kroků by `studio.bohemi.fit` měl mít: fungující
rezervace, členství a přihlášení/registraci, stylizované formuláře,
hlavičku i patičku vizuálně sladěné s `bohemi.fit`, a funkční vlastní
styly z child theme.

### ✅ Stav k 20. 7. 2026

- **Header** — live, vizuálně sladěný s `bohemi.fit`, všechny odkazy
  ověřené `curl` (Hlavní web, Rezervace lekcí, Můj účet, Rezervovat) —
  viz „Header — mrtvý odkaz „Můj účet"" níž pro historii jedné opravy.
- **Motiv `bohemi-twentytwentyfive-child`** — live, CSS/logo se načítají
  (viz „Motiv — audit a oprava" níž, oprávnění opravena přes FTP).
- **Patička** — live, jako Vzor (Pattern) ve stejné složce „BoHeMi" jako
  header, viz „Patička — redesign" a „Patička — zjištění: nebyla to Část
  šablony" níž pro celou historii rozhodování.
- **Otevřené:**
  - „Členství" v headeru/patičce vede jen na homepage (fallback), ne na
    konkrétní PMPro „levels" stránku — chybí potvrzená URL, viz „Header —
    mrtvý odkaz" níž.
  - `/rezervace/` pořád 301-redirectuje na `/` (viz „Cache diagnostika"
    níž — potřebuje rozhodnutí ve wp-adminu, ne kód).
  - Kontrola DevTools Service Workers zatím neproběhla.

## Sladění s Astro po drift kontrole (31. 7. 2026)

Honza si všiml, že se `studio.bohemi.fit` „chová a vypadá hodně odlišně" od
`bohemi.fit` a požádal o srovnání. Ověřil jsem živý stav přes `curl` (žádný
SSH/FTP přístup, jen HTTP — stejné omezení jako celý zbytek téhle historie)
a porovnal s `src/components/Header.astro`/`Footer.astro`. Vizuální styl
(barvy, font, spacing, CTA, sticky/blur header) sedí 1:1 — to se nerozešlo.
Rozdílný obsah navigace (WP: Hlavní web/Rezervace lekcí/Členství/Můj účet
vs. Astro: Proč BoHeMi/Lekce a služby/Ceník/Kontakt) je **záměrný**, ne
drift — `studio.bohemi.fit` je rezervační/členský portál, ne druhá kopie
marketingového webu, viz tabulka „Celý obrázek" výš. Reálný drift byl jen
ve dvou věcech:

1. **Mobilní menu šlo zavřít jen křížkem/odkazem/Escape, ne kliknutím mimo
   něj.** Astro dostal tohle chování týž den (`Header.astro`, viz
   `CLAUDE.md`) a WP na to zapomnělo dorovnat. Opraveno v
   `bohemi-wp-ui/assets/js/header.js` (`document` click listener, zavře
   `<details>`, pokud klik nespadá do jeho `contains()`) — plugin
   `bohemi-wp-ui` → **1.1.3**, viz jeho `CHANGELOG.md`.
2. **Sociální sítě v patičce byly na placeholder URL** (`facebook.com/`,
   `instagram.com/` bez cesty na profil) — Astro `Footer.astro` dávno ukazuje
   reálné odkazy (`facebook.com/people/Bohemi-fitness/100090517103019/`,
   `instagram.com/bohemi.fit/`), patička ve `bohemi-twentytwentyfive-child`
   se za tím prostě opozdila. Opraveno v `functions.php`
   (`bohemi_wp_final_child_get_footer_html()`) — motiv → **1.3**.

Oba `dist/*.zip` přegenerované (`Compress-Archive`, top-level složka
odpovídá názvu pluginu/motivu, ověřeno rozbalením). **Nic z tohohle není
živě nasazené** — stejně jako celá historie níž, tenhle adresář je jen
staging, potřebuje ruční nahrání:

- `dist/bohemi-wp-ui.zip` → Pluginy → Nahrát plugin → aktivovat (přepíše
  starou verzi 1.1.2).
- `bohemi-twentytwentyfive-child/` → přehrát přes FTP/SFTP stejnou složkou
  jako dřív (`wp-content/themes/bohemi-twentytwentyfive-child/`) — motiv se
  nemusí znovu aktivovat, jen se změní soubor na disku. Po přehrání zkontroluj
  oprávnění (viz „CSS 403" níž — nové FTP uploady občas dostanou špatná
  práva).
- Patička je vložená jako nesynchronizovaný Vzor (viz „Patička — zjištění"
  níž) — po přehrání `functions.php` **znovu vlož** „BoHeMi — Footer" do
  každé šablony, kde už je, jinak si stránky drží starou vloženou kopii se
  starými placeholder odkazy.

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

## Patička — zpět na Část šablony (31. 7. 2026)

Honza si po nasazení všiml, že patička „nefunguje stejně jako header" —
myslel tím konkrétně: po úpravě patičky očekával, že se změna propíše
všude, tak jako u headeru, ne že ji musí znovu vkládat do každé šablony
zvlášť. To je přesně ten trade-off, který si sám vybral 20. 7. 2026 (viz
zápis výš) — tehdy prioritou byla konzistence ovládání (obojí přes záložku
„Vzory"), teď prioritou je funkčnost (propagace jako u headeru). Vrácena
tedy funkcionalita, ne kód patičky samotné — obsah patičky (kontakt, mapa,
otevírací doba, odkazy, právní stránky, teď i opravené Facebook/Instagram
odkazy, viz „Sladění s Astro" výš) zůstává stejný.

**Co se změnilo v `functions.php`:** vzor `bohemi-twentytwentyfive-child/footer`
dostal `'blockTypes' => array('core/template-part/footer')` — stejný hint,
jaký `bohemi-wp-ui/patterns/header.php` dávno používá pro header
(`core/template-part/header`). Nic jiného v PHP se neměnilo — pattern pořád
existuje, generuje stejné HTML, jen se WordPressu řekne, že patří do
Části šablony Patička, takže se v inserteru nabídne přednostně i tam.
Motiv → **1.4** (`style.css`).

**Co musí Honza udělat živě (nemám tam přístup, nejde to automatizovat):**
1. **Vzhled → Editor → Šablonové části → Patička** — otevři, smaž
   jakýkoliv starý obsah, „+" → najdi „BoHeMi — Footer" (kategorie
   „BoHeMi") → vlož → Ulož. Todle je teď JEDINÉ místo, které se do
   budoucna edituje.
2. Zkontroluj živě aspoň jednu stránku každého typu (obyčejná stránka,
   úvodní stránka webu, 404) — pokud patička sedí všude, šablony správně
   dědí ze sdílené Části šablony a krok 3 níž není potřeba.
3. **Pokud** se v nějaké konkrétní šabloně pořád zobrazuje stará/jiná
   patička (typicky proto, že do ní byla 20.–31. 7. 2026 vložená
   nezávislá kopie vzoru, viz zápis výš) — otevři tu jednu šablonu ve
   Site Editoru, smaž vloženou patičku (blok → Možnosti → Odstranit) a
   nech tam jen to, co zůstane po smazání (výchozí odkaz na sdílenou Část
   šablony by se měl znovu ukázat sám). Tohle je oprava **jen pro tu
   jednu šablonu, jen jednou** — ne nový trvalý zdroj údržby.

**Proč jsem to nemohl ověřit sám:** žádný SSH/FTP/WP-admin přístup, jen
`curl` na veřejné URL (viz „Sladění s Astro" výš) — jestli konkrétní
šablony `page`/`front-page`/`404`/atd. skutečně obsahují
`wp:template-part {"slug":"footer"}`, nebo mají footer pořád natvrdo
vložený, musí ověřit Honza přímo v Site Editoru.

## Patička — obsah sjednocen na 4 sloupce jako Astro (31. 7. 2026)

Honza upřesnil zadání: header i patička mají na obou webech **vypadat a
chovat se stejně**, jen budou mít jinde jiné odkazy (WP je jiný web s jinou
nabídkou stránek). U patičky to znamená doslova stejnou strukturu sloupců
jako `src/components/Footer.astro`, ne jen podobný vizuál. Potvrzeno přes
AskUserQuestion (varianta „4 sloupce jako Astro, WP-odkazy do Kontaktu").

**Staré rozvržení WP patičky:** Brand (bez CTA) / Kontakt / Odkazy (Hlavní
web, Rezervace lekcí, Můj účet — 3 položky) / Otevírací doba + sociální
sítě. **Nové (`functions.php`, `bohemi_wp_final_child_get_footer_html()`):**

1. **Brand** — stejné „BoHeMi · Body · Health · Mind" + popisek (WP-specifický
   text zůstal, popisuje samotný rezervační systém, ne marketing) + **nové
   CTA tlačítko „Rezervovat lekci →"** (Astro ho má, WP dřív ne) — vede na
   `bohemi_wp_ui_reserve_url()` z pluginu (fallback `home_url('/')`, kdyby
   plugin nebyl aktivní).
2. **Web** — stejných **6 položek ve stejném pořadí** jako Astro
   (`webLinks`): Proč BoHeMi, Lekce a služby, Program 8 týdnů, Ceník, Fotky,
   Kontakt. Protože tyhle stránky na `studio.bohemi.fit` neexistují, každá
   míří na `bohemi.fit` (cross-domain) — jediný rozdíl oproti Astro je cíl
   odkazu, ne jeho existence/pořadí/label. **Otevírá se ve stejné záložce**
   (`target="_blank"` odstraněn 1. 8. 2026, viz níž) — jediný rozdíl je cíl.
3. **Služby** — stejných **8 položek ve stejném pořadí** jako Astro
   (`serviceLinks`): Skupinové lekce, Kroužky pro děti, Supermamky, Open
   gym, Fotobiomodulace, Osobní tréninky, Pronájem sálů, Pro firmy — stejně
   cross-domain na `bohemi.fit`, stejně ve stejné záložce.
4. **Kontakt** — beze změny (telefon/e-mail/adresa/mapa/hodiny/sociální
   sítě), **plus dvě WP-only položky přibalené dovnitř** (Rezervace lekcí,
   Můj účet — přes `bohemi_wp_ui_booking_url()`/`bohemi_wp_ui_account_url()`
   z pluginu), aby zůstal **stejný počet sloupců (4)** jako na Astru místo
   přidávání pátého jen pro WP-specifika.

Spodní řádek (copyright + právní odkazy) beze změny — ten už sedí.

**CSS (`assets/css/bohemi.css`):** přidán token `--bohemi-accent-deep:#8f150d`
(chyběl, Astro ho má jako `accent-deep` pro hover CTA), nová třída
`.bohemi-footer-cta` (červené pilulkovité tlačítko, stejné barvy jako Astro
`Button.astro` variant="brand") a `.bohemi-footer-col--brand` (širší první
sloupec, `flex:1.4` — odpovídá Astro `lg:grid-cols-[1.4fr_1fr_1fr_1fr]`).
Motiv → **1.5**. Nová sdílená funkce `bohemi_wp_final_child_footer_link_list()`
generuje `<a>` seznamy pro Web/Služby sloupce (`$external` parametr od
1. 8. 2026 nepoužitý — viz sekce „Odkazy mezi bohemi.fit a studio.bohemi.fit
zůstávají v jedné záložce" níž).

**Nic dalšího se nemění na instalaci** — pořád platí postup ze sekce
„Patička — zpět na Část šablony" výš (vlož do Šablonové části → Patička,
jednou). `dist/bohemi-twentytwentyfive-child.zip` přegenerovaný.

## Patička — vizuální doladění + odstranění CTA z headeru (31. 7. 2026)

Honza porovnal screenshoty obou paticěk vedle sebe („skoro jo, ještě to
trochu poladit") a zároveň požádal o odstranění tlačítka „Rezervovat"
z WP hlavičky, protože ve vlastním menu `studio.bohemi.fit` nedávalo smysl
(vede zpátky na web, na kterém už jsi).

**Patička — tři vizuální nesrovnalosti proti Astro `Footer.astro` opravené:**

1. **Tagline „Body · Health · Mind" byla navíc VELKÝMI PÍSMENY** — WP CSS
   (`.bohemi-footer-tagline`) měla `text-transform: uppercase`, Astro tenhle
   text nechává v původním zápisu. Pravidlo odstraněno.
2. **Chyběl nadpis „Otevírací doba"** — při přestavbě na 4 sloupce (viz
   sekce výš) se omylem smazal, zůstala jen samotná hodnota „Po — Pá: dle
   rozvrhu" bez nadpisu. Vrácen jako `.bohemi-footer-heading.bohemi-footer-heading--sub`
   (stejný styl jako ostatní nadpisy sloupců, jen s `margin-top`, protože
   sedí uprostřed sloupce Kontakt, ne na jeho vrcholu).
3. **Facebook/Instagram byly odděleny tečkou „·"** — Astro je odděluje jen
   mezerou (`flex gap-x-4`), bez tečky. Nahrazeno `margin-right` na
   `.bohemi-footer-social a`. Zároveň se pořadí uvnitř sloupce Kontakt
   přeskládalo tak, aby OTEVÍRACÍ DOBA + sociální sítě zůstaly na úplném
   konci sloupce (přesně jako v Astru) a WP-specifické odkazy (Rezervace
   lekcí, Můj účet) se vložily těsně za mapu, ne až za hodiny.

`bohemi-twentytwentyfive-child` → **1.6** (`functions.php`, `assets/css/bohemi.css`).

**Header — CTA „Rezervovat" odstraněno** (`bohemi-wp-ui/patterns/header.php`):
smazán jak z desktopové navigace, tak z mobilního clusteru vedle hamburgeru.
`bohemi_wp_ui_reserve_url()` v `includes/urls.php` zůstala — teď ji volá
jen patička (viz výš), header ji přestal potřebovat. Uklizeny navazující
nepoužívané CSS třídy/proměnné v `assets/css/header.css`
(`.bohemi-header-cta`, `.bohemi-header-cta--mobile`,
`--bohemi-header-accent-text`, `--bohemi-header-accent-deep`,
`--bohemi-header-cream`, `--bohemi-header-radius`). „Rezervace lekcí"
zůstává v obou menu jako běžný odkaz — plní stejnou roli bez CTA stylu.
`bohemi-wp-ui` → **1.1.4** (`CHANGELOG.md`).

Oba `dist/*.zip` přegenerované.

## Vzory ve wp-adminu — kategorie + „proč se to nezobrazuje" (1. 8. 2026)

Honza procházel **Vzhled → Editor → Vzory** ve wp-adminu (screenshoty) a
narazil na dvě věci:

1. **Vestavěná kategorie „Zápatí" ukazuje jen výchozí TT5 vzory** (Zápatí
   vycentrované, se sloupci, …), „BoHeMi — Footer" tam nebylo — najde se
   jen ve vlastní složce „BoHeMi". **Skutečná mezera v kódu**, ne jen
   nedorozumění: `bohemi-wp-ui/patterns/header.php` registruje header do
   **dvou** kategorií (`array( 'bohemi-header', 'header' )`), takže se
   ukáže jak v „BoHeMi", tak ve vestavěné „Záhlaví". Footer v
   `functions.php` měl jen jednu (`array('bohemi-header')`) — chybějící
   `'footer'`. **Opraveno** (`categories => array('bohemi-header',
   'footer')`) — od teď „BoHeMi — Footer" najdeš i ve vestavěné složce
   „Zápatí", stejná parita jako u headeru. Motiv → **1.7**.
2. **„Header/footer se mi nezobrazuje v záhlaví/zápatí šablon, jen ve
   vzorech BoHeMi — je to OK?"** — **ano, přesně tak to má být** v tomhle
   bodě instalace. Vzor ve složce „BoHeMi" = **jen dostupný k vložení**,
   ne automaticky použitý nikde. Dokud ho fyzicky nevložíš do sdílené
   Části šablony, žádná stránka ho nepoužije — přesně proto instalační
   checklist (výš) i sekce „Patička — zpět na Část šablony" popisují
   krok **„Vzhled → Editor → Šablonové části → Záhlaví/Patička → + →
   najdi BoHeMi — Header/Footer → vlož → Ulož"**. Bez tohohle
   jednorázového kroku zůstane vzor navždy jen v knihovně, viditelný a
   připravený, ale nikde živě použitý.

**„Obrázek 2 vypadá divně"** (thumbnaily „BoHeMi — Header" mají černé
pruhy, „BoHeMi — Footer" nemá tmavé pozadí jako živý web) — nejpravdě-
podobnější vysvětlení: náhledy vzorů ve „Vzorech" se dokreslují
asynchronně (WP je renderuje zvlášť přes iframe/AJAX až po načtení
stránky) a screenshot padl doprostřed toho renderování — proto
neobarvené pozadí a placeholder pruhy místo textu. **Nemám jak si to
ověřit živě** (žádný přístup do wp-adminu) — zkus stránku „Vzory" tvrdě
obnovit (Ctrl/Shift+R) a počkat pár vteřin, než se náhledy dokreslí; živý
`curl` na homepage z dřívějška (viz „Sladění s Astro" výš) potvrzuje, že
skutečně vykreslený header na produkci má správné CSS/pozadí, takže jde
nejspíš jen o kosmetiku náhledu ve wp-adminu, ne o reálně rozbitý vzor.
Pokud po obnovení stránky pořád vidíš černé pruhy, napiš přesněji, co je
na nich vidět (text? úplně černá plocha? jen v Header, nebo i ve Footer?),
ověřím to podle toho, co doopravdy generuje `header.php`.

## Patička natažená přes celou šířku stránky (1. 8. 2026)

Honza nahlásil, že patička na WP je „furt přes celou stránku, ne jako v
Astro". Skutečná chyba, ne jen vizuální dojem: `.bohemi-footer` v
`assets/css/bohemi.css` mělo jen `background`/`color`/`padding` — **žádné
`max-width` + `margin-inline:auto`**. Header tohle řeší přes vlastní
vnitřní wrapper (`.bohemi-header-inner { max-width: 1220px; margin-inline:
auto; }`), ale footer žádný ekvivalentní vnitřní wrapper neměl — mřížka
sloupců i spodní řádek seděly přímo v `.bohemi-footer`, takže se
roztahovaly přes celou šířku obrazovky na širokých monitorech (přesně
jako Astro `Footer.astro`: **vnější `<footer>` je full-bleed tmavé pozadí,
ale vnitřní `<div class="mx-auto max-w-[1220px] ...">` drží obsah na
1220px vycentrovaný** — na WP tahle vnitřní vrstva chyběla úplně).

**Oprava:** nový wrapper `<div class="bohemi-footer-inner">` v
`functions.php` obaluje `.bohemi-footer-grid` i `.bohemi-footer-bottom`
dohromady (stejně jako Astro obaluje obojí jedním `<div>`). CSS
(`.bohemi-footer-inner { max-width:1220px; margin-inline:auto; padding:56px
24px 32px; }`) — padding se přesunul z `.bohemi-footer` sem, `.bohemi-footer`
teď drží jen tmavé pozadí přes celou šířku. Motiv → **1.8**, ZIP
přegenerovaný.

**Bezprostřední follow-up téhož dne — „teď je to ještě horší":** Honza
nahrál 1.8 přes FTP, ale **nevrátil se do Šablonové části → Patička znovu
vzor vložit a uložit**. Výsledek přesně sedí na mechaniku popsanou v nové
sekci „⚠️ Nahrání souborů ≠ aktualizace živé stránky" úplně nahoře: nové
CSS (padding/max-width teď na `.bohemi-footer-inner`) se aplikovalo na
**starý uložený HTML bez tohohle wrapperu** → patička byla najednou úplně
bez paddingu (nalepená na okraje) a pořád přes celou šířku, tedy hůř než
předtím. Diagnostikováno přes AskUserQuestion (potvrdil: „jen jsem nahrál
soubory přes FTP"). Řešení není další kód — je to re-insert: smazat starou
vloženou patičku a znovu vložit + uložit čerstvý „BoHeMi — Footer". Tahle
zkušenost je přesně důvod, proč teď celá sekce s varováním existuje hned
na začátku souboru — ať se stejná past nezopakuje u příští změny.

## Header — zúžení nav + logo vede domů, ne na bohemi.fit (1. 8. 2026)

Dvě Honzovy úpravy `bohemi-wp-ui/patterns/header.php`:

1. **„Rezervace lekcí" a „Členství" pryč z nav** (desktop i mobilní panel) —
   zůstává „Hlavní web", „Můj účet", Přihlásit/Odhlásit se. Resolvery
   `bohemi_wp_ui_booking_url()`/`bohemi_wp_ui_membership_url()` v
   `includes/urls.php` zůstaly nedotčené (booking URL pořád potřebuje
   patička a `includes/cache.php` pro detekci rezervační stránky) — jen
   přestaly být volané v headeru. Detaily viz `bohemi-wp-ui/README.md`
   „Menu ve WordPressu".
2. **Logo/wordmark v hlavičce vedlo na `bohemi.fit` i na `studio.bohemi.fit`
   samotném** — Honza: „když kliknu na ikonu na studio.bohemi.fit, měl bych
   se dostat na studio.bohemi.fit, ne na bohemi.fit". Logika předtím byla
   „logo = hlavní web" všude; teď je to „logo = domů na webu, kde právě
   jsi" (běžná konvence) — `href` změněn z `bohemi_wp_ui_main_site_url()`
   na `home_url('/')`. Cesta na `bohemi.fit` zůstává přes nav odkaz
   „Hlavní web", ten se neměnil.

`bohemi-wp-ui` → **1.1.5** (`CHANGELOG.md`), ZIP přegenerovaný.

## Favicon — tab ikona sladěná s Astro (1. 8. 2026)

Honza chtěl, aby ikonka v tabu prohlížeče byla na obou webech logo BoHeMi.
**Astro měl ještě placeholder** (`public/favicon.svg` — Astro starter
raketka, ne naše logo) a **WP neměl žádnou** vlastní ikonu vůbec.

**Zdrojový soubor** je stejný jako pro header logo,
`src/assets/logo_bohemi_trans.png` (164×102, kettlebell + dvě boční
činky) — pro favicon se ale ukázalo, že celý lockup včetně činek při
16–32px splihne do nečitelné červené šmouhy. Oříznuto na **jen
kettlebell** (střední ~64 px šířky zdroje), vypadované na čtverec — jedna
tučná značka, čitelná i v nejmenší velikosti. Vygenerováno skriptem
(sharp, jednorázově, nezůstal v repu) do:

- `public/favicon-16x16.png`, `favicon-32x32.png` — průhledné PNG
- `public/favicon.ico` — ručně sestavený minimální ICO kontejner
  obalující 32×32 PNG (PNG-in-ICO je platné od Windows Vista, bez
  potřeby další knihovny — `sharp` samo o sobě ICO exportovat neumí)
- `public/apple-touch-icon.png` — 180×180, na **krémovém pozadí**
  (`#f5efe6`, brand token), ne průhledné — iOS by průhlednost vykreslilo
  jako černý čtverec

Stejné soubory (byte-for-byte) zkopírované i do
`wordpress/bohemi-wp-ui/assets/images/`, aby favicon vypadal identicky na
`bohemi.fit` i `studio.bohemi.fit`.

**Astro** (`src/layouts/Layout.astro`): staré `<link rel="icon"
type="image/svg+xml" href="/favicon.svg">` nahrazeno standardní čtveřicí
(`favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`,
`apple-touch-icon.png`); `businessJsonLd.logo` přesměrován z
`/favicon.svg` na `/apple-touch-icon.png` (opaque, vhodnější pro
schema.org). Starý `public/favicon.svg` smazán jako nepoužívaný.

**WP** (`bohemi-wp-ui.php`): nová funkce `bohemi_wp_ui_favicon()` na
`wp_head`, vypisuje stejné `<link>` tagy přímo z `assets/images/`.
**Záměrně NE přes wp-adminí „Ikona webu"** (Nastavení → Obecné) — to by
vyžadovalo ruční upload/ořez ve wp-adminu bez jakékoliv stopy v repu.
Bonus: na rozdíl od headeru/patičky (Části šablony, viz varování nahoře
souboru) se favicon přes `wp_head` **projeví hned po nahrání nové verze
pluginu** — žádný re-insert v Site Editoru není potřeba, protože `wp_head`
se generuje čerstvě při každém načtení stránky. Pokud by Honza přesto
někdy nastavil i wp-adminí Ikonu webu, vypíšou se oba zdroje najednou
(neškodná duplicita) — radši to pole nechat prázdné. `bohemi-wp-ui` →
**1.1.6**, ZIP přegenerovaný.

## WebPageTest audit studio.bohemi.fit (1. 8. 2026)

Honza přinesl externí WebPageTest report. Ověřeno živě přes `curl` proti
`studio.bohemi.fit` (1. 8. 2026, ~12:20) — všechna zjištění potvrzena, ne
zastaralá. **Tenhle repo nemá SSH ani FTP přístup na server** (viz „Celý
obrázek" výš), takže co šlo opravit v kódu, je opravené a čeká na nahrání;
zbytek je čistě manuální zásah na serveru/ve wp-adminu, který musí udělat
Honza.

### Opraveno v repu

1. **Google Fonts zúžen ze 8 řezů na 4** (`wght@400;600;700;800`, bez
   kurzívy) — `bohemi-wp-ui.php`, `bohemi-wp-ui` → **1.1.8**. Detaily
   `CHANGELOG.md`.
2. **`zxcvbn`/password-strength-meter (~400 KB) dequeued mimo `/ucet-clenstvi/`**
   — WordPress core skript, který PMPro věší na každou stránku pro případ,
   že by na ní byl formulář změny hesla, i když ho tam nikdy není. Nový hook
   v `bohemi-twentytwentyfive-child/functions.php` (`wp_enqueue_scripts`,
   priorita 100, `is_page('ucet-clenstvi')` výjimka).
3. **Kontrast kalendáře (WCAG)** — FullCalendar v6 (knihovna, kterou
   Booking Activities používá) defaultně nastavuje text události na bílou
   přes svou vlastní CSS proměnnou `--fc-event-text-color` (zdokumentovaný
   FullCalendar theming mechanismus). Booking Activities přebarvuje jen
   pozadí podle kategorie/aktivity a tuhle proměnnou nikdy nepřepisuje — u
   světlých pastelových kategorií (audit naměřil např. `#badf9a` s bílým
   textem = kontrast 1,48:1, `#d8ecf0` = 1,22:1; norma WCAG AA chce 4,5:1)
   z toho vyjde prakticky nečitelný text. Oprava přepisuje tu samou
   proměnnou na tmavou barvu (`--bohemi-ink`) v `bohemi.css`, scoped na
   `.fc` (FullCalendar root), takže platí pro všechny kategorie najednou bez
   ohledu na to, jak přesně je Booking Activities barví. **Nutná vizuální
   kontrola po nasazení** — pokud by někdy vznikla kategorie s tmavým
   pozadím, dostala by tmavý text na tmavém a byla by nečitelná obráceně;
   zatím audit zmiňuje jen světlé pastely.

   **Dodatek (1. 8. 2026, později týž den):** samotná proměnná nestačila —
   Honza po nasazení 2.0 nahlásil, že text je pořád „sešedlý", hůř vidět
   na barevném podkladu. Ověřeno živě, že CSS z bodu 3 opravdu běží (`curl`
   na `bohemi.css?ver=…`, timestamp odpovídal), takže to nebyl problém
   nasazení. Skutečná příčina: FullCalendar v6 nemá samostatný `.css`
   soubor, svoje výchozí styly (včetně `.fc { --fc-event-text-color: #fff;
   … }`) vkládá do stránky přes JavaScript za běhu — to se do DOMu dostane
   AŽ PO `bohemi.css`, a při stejné specifitě selektoru (`.fc`) vyhrává,
   co přišlo později. Naše přepsání proměnné tak prohrávalo tenhle souboj
   o pořadí a bílá zůstávala; k tomu Booking Activities navíc přidává
   `.fc-event-main { background: hsla(0,0%,100%,.15) }` (jemný bílý
   poloprůhledný přelivu přes barvu kategorie), což z bílé udělalo přesně
   ten „sešedlý" dojem, který Honza popsal. **Oprava:** místo (resp. vedle)
   CSS proměnné teď `color` na `.fc-event`/`.fc-event-main`/
   `.fc-event-title`/`.fc-event-time` nastavený přímo s `!important` —
   to souboj o pořadí vkládání obchází úplně, protože `!important`
   pravidlo porazí pozdější `!important`-prosté pravidlo bez ohledu na
   pořadí. `bohemi-twentytwentyfive-child` → **2.1**.

Oba `dist/*.zip` přegenerované. Nasazení stejné jako vždy: `bohemi-wp-ui.zip`
přes Pluginy → Nahrát plugin (aktivuje se nová verze automaticky, žádný
re-insert patternu není potřeba — mění se jen enqueue kód a CSS, ne
uložený HTML header); `bohemi-twentytwentyfive-child/` přes FTP/SFTP
přehráním složky (taky žádný re-insert, jde jen o CSS/PHP).

### Vyžaduje manuální zásah (mimo dosah repa)

Ověřeno živě, oprava vyžaduje SSH/FTP shell nebo wp-admin klikání:

1. **🔴 Kritické — 19 souborů vrací 403** (potvrzeno `curl`em: všechny
   `ba-prices-and-credits`/`ba-display-pack`/`ba-notification-pack`/
   `ba-advanced-forms` CSS/JS + `bohemi-wp-ui/assets/images/favicon-16x16.png`
   a `favicon-32x32.png` a `apple-touch-icon.png`). **Není to nová záhada —
   je to přesně ten samý bug jako „Motiv — audit a oprava" níž (20. 7. 2026):
   Wedos hosting dává nově nahraným souborům/složkám přes FTP jinou skupinu
   než mají existující funkční soubory (chybí `o+rx` pro „ostatní", pod
   kterou zjevně běží statický webserver), takže PHP se k nim dostane
   (proto pattern/menu fungují), ale přímé HTTP požadavky na CSS/JS/PNG
   dostanou 403.** Favicon soubory jsou z dnešního (1. 8. 2026) FTP uploadu
   v tomhle sezení — přesně proto padají a `logo-bohemi.png` ve stejné
   složce (starší upload, práva už opravená) je 200 OK. `ba-*` pluginy jsou
   nejspíš starší instance stejného problému. **Oprava = zopakovat postup
   z „Motiv — audit a oprava"** (chmod 755 na složky / 644 na soubory,
   případně přes Total Commander „Soubory → Změnit atributy...", ne jen
   Ctrl+M), tentokrát na `wp-content/plugins/bohemi-wp-ui/assets/images/`
   i na `wp-content/plugins/ba-*/`. Na serveru se SSH je to jednorázově:
   ```bash
   find wp-content -type d -exec chmod 755 {} \;
   find wp-content -type f -exec chmod 644 {} \;
   chown -R <uživatel-webserveru>:<skupina> wp-content
   ```
   Bez SSH: přes hostingový File Manager/FTP klienta na
   `wp-content/plugins/ba-*/` a `wp-content/plugins/bohemi-wp-ui/assets/images/`.
   **Dlouhodobě:** dokud Wedos podpora needituje výchozí skupinu FTP účtu
   (žádost jsme jim zatím neposílali, viz „Motiv — audit a oprava"), bude
   se tohle opakovat po každém FTP uploadu nových souborů — viz aktualizovaný
   „Instalace" krok u `bohemi-wp-ui` i instalační checklist výš, oba teď na
   to výslovně upozorňují.
2. **Chybějící Site Icon** — `wp-content/uploads/2023/02/cropped-cropped-logo-32x32.png`
   a `-192x192.png` vrací 404 (potvrzeno). Nahraj znovu ve Vzhled →
   Přizpůsobit → Identita webu.
3. **Žádná page cache** — HTML se vrací s `no-cache, must-revalidate`,
   TTFB 2,23 s. Nainstalovat WP Super Cache nebo LiteSpeed Cache (podle
   toho, co hosting podporuje) ve wp-adminu.
4. **Cache hlavičky na verzovaných assetech** (`max-age=259200` / 3 dny)
   — assety mají `?ver=` cache-busting, mohly by mít roční cache. Řeší se
   v Apache/nginx configu hostingu, ne v tomhle repu.
5. **Bez CDN** — Cloudflare (zdarma) by při TTFB 2 s dost pomohl. Rozhodnutí
   a nastavení DNS je mimo repo.
6. **`fullcalendar/locales-all.global.min.js` (25 KB)** — Booking Activities
   sám interně používá jen `cs` (potvrzeno v `bookacti_localized.fullcalendar_locale`),
   ale enqueuje celý soubor se všemi jazyky. Nízká priorita (25 KB), navíc
   vyžaduje filtr na vendor plugin, který jsme needitovali — needěláno.

Honzovo doporučené pořadí (souhlasím): práva souborů → chybějící ikona →
(už hotovo: dequeue zxcvbn) → page cache → (už hotovo: kontrast kalendáře)
→ zbytek.

## Editor preview — theme a plugin CSS nebyly sladěné (1. 8. 2026)

Honza si všiml, že header a patička v editoru WordPressu (Site Editor)
nevypadají, jak mají — přišlo mu, že motiv (`bohemi-twentytwentyfive-child`)
a plugin (`bohemi-wp-ui`) nejsou sladěné.

**Diagnóza:** design tokeny (barvy, font) v `bohemi.css` i `header.css` byly
ve skutečnosti totožné (oba čerpají ze stejných hexů jako Astro
`src/styles/global.css`, žádný drift v hodnotách) — problém byl v tom, KDY
se který soubor načítá. `bohemi-wp-ui.php` enqueuje `header.css` na
`enqueue_block_assets`, což běží na frontendu **i uvnitř Site Editoru**,
takže header pattern se v editoru vždycky vykresloval nastylovaný. Motiv ale
enqueueval `bohemi.css` jen na `wp_enqueue_scripts`, což běží **pouze na
frontendu** — v editoru tak zůstal úplně bez stylu: patička (`.bohemi-footer`
a spol.), `.bohemi-panel` (účet/rezervace patterny) i styly PMPro/Booking
Activities tlačítek se v náhledu Site Editoru zobrazovaly jako holé
nenastylované HTML, zatímco header vedle nich vypadal hotově — přesně ten
dojem „nejsou sladěné".

**Oprava:** `bohemi-twentytwentyfive-child/functions.php` — hook pro
`bohemi.css` přepnutý z `wp_enqueue_scripts` na `enqueue_block_assets`,
stejný hook, jaký už používá plugin pro `header.css`. Na frontendu se nic
nemění (`enqueue_block_assets` tam běží taky), jen se navíc stejné CSS
začne načítat i v editoru.

`bohemi-twentytwentyfive-child` → **1.9** (`style.css`), ZIP přegenerovaný.
**Nahraď přes FTP/SFTP celou složku** `wp-content/themes/bohemi-twentytwentyfive-child/`
(jde jen o změnu v `functions.php` + `style.css`, žádný markup se neměnil,
takže na rozdíl od header/footer změn **není potřeba re-insert** patternů
v Site Editoru — jen refresh stránky/editoru po nahrání souborů).

## Header — odstraněn nefunkční odkaz Přihlásit/Odhlásit se (1. 8. 2026)

Honza nahlásil, že samostatný textový odkaz „Přihlásit se" / „Odhlásit se"
vedle „Můj účet" v horním menu trvale svítí „Odhlásit se" i pro odhlášené
návštěvníky a klik na něj nefunguje spolehlivě — matoucí pro návštěvníky.

Přesně sedí na už dřív zdokumentované omezení tohohle odkazu (bývalá
sekce „Přihlášení / Odhlášení — známé omezení" v `bohemi-wp-ui/README.md`):
odkaz se vypočítal v okamžiku vložení patternu v Site Editoru (pod Honzovým
přihlášeným účtem) a od té chvíle zůstal zamrzlý statický HTML snapshot —
stejná mechanika jako „⚠️ Nahrání souborů ≠ aktualizace živé stránky" výš,
jen aplikovaná na dynamický obsah uvnitř patternu, ne na CSS/markup kolem
něj. Místo opravy (vyžadovala by dynamický blok `core/loginout`) byl odkaz
**odstraněn úplně** z `patterns/header.php` (desktop i mobilní panel) —
`bohemi_wp_ui_auth_link()` v `includes/urls.php` smazána, nepoužité CSS
`.bohemi-header-link--auth`/`.bohemi-header-mobile-divider` smazáno.
„Můj účet" v navigaci vede na PMPro account stránku, která přihlášení i
odhlášení řeší sama a živě, takže funkčně nic nechybí. Detaily viz
`bohemi-wp-ui/README.md` „Přihlášení / Odhlášení".

`bohemi-wp-ui` → **1.1.7** (`CHANGELOG.md`), ZIP přegenerovaný. **Po
nahrání nutný re-insert** patternu „BoHeMi — Header" v Site Editoru (smazat
starý blok v Šablonové části Záhlaví, vložit + uložit znovu) — jinak zůstane
starý (rozbitý) odkaz dál viset ve stávajícím uloženém HTML, viz varování
úplně nahoře tohoto souboru.

## Header — mrtvý odkaz „Můj účet" (20. 7. 2026)

Po nasazení headeru se ukázalo, že **„Můj účet" má `href=""`** (odkaz na
sebe sama — klikneš a nic se nestane, resp. na homepage to vypadá jako
nefunkční, na `/ucet-clenstvi/` samotné to vypadalo „funkčně" jen proto,
že `href=""` tam náhodou vedlo tam, kde už uživatel byl). „Členství" mělo
stejnou chybu.

**Příčina:** `bohemi_wp_ui_account_url()` (a `_membership_url()`,
`_reserve_url()`) věřily `pmpro_url()` bez kontroly — ta ale vrací **prázdný
řetězec** (ne `null`/`false`), když PMPro nemá ve svém nastavení vyplněnou
vlastní stránku pro danou roli. Operátor `??` prázdný řetězec nezachytí
(není to `null`), takže se nepoužil žádný fallback a `href` zůstal prázdný.

**První oprava (v1.1.1):** přidána explicitní kontrola `!empty()` na
výsledek `pmpro_url()` ve všech třech funkcích, s fallbackem na vyhledání
stránky podle slugu. Po nahrání na produkci a znovu-vložení header patternu
se ale výsledek nezměnil — nepodařilo se live rozlišit, jestli byl problém
v nenahraném souboru, PHP OPcache na Wedos hostingu, nebo něčem jiném (žádné
z toho jsme nemohli ověřit zvenku, na server nemám přístup).

**Finální oprava (v1.1.2, Honzovo rozhodnutí):** `bohemi_wp_ui_account_url()`
nezkouší `pmpro_url()` ani page-lookup vůbec — vrací natvrdo
`https://studio.bohemi.fit/ucet-clenstvi/` (pořád přepsatelné konstantou
`BOHEMI_ACCOUNT_URL`, kdyby se URL v budoucnu změnila). Ověřeno `curl`
20. 7. 2026 — funguje na desktopu, mobilu i v patičce.

**`bohemi_wp_ui_membership_url()` zůstala beze změny** (pořád má tu
`!empty()` opravu z 1.1.1, ne hardcoded hodnotu) — proto teď „Členství"
nemá prázdný `href`, ale spadne na fallback `home_url('/')`, protože
nemáme potvrzenou URL PMPro „levels" stránky. Až ji Honza dohledá, dá se
stejným způsobem hardcodovat jako účet.

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

## Odkazy mezi bohemi.fit a studio.bohemi.fit zůstávají v jedné záložce (1. 8. 2026)

Honza nahlásil, že klik na „Rezervovat" (bohemi.fit → studio.bohemi.fit) i
cesta zpátky (studio.bohemi.fit → bohemi.fit) mají zůstat ve stejné záložce,
ne otvírat nové okno/kartu. Astro stranu (`Button.astro` `external` prop,
`target="_blank"` na `RESERVE_URL`/membership odkazech) opraveno stejný den,
viz `CLAUDE.md`. Na WP straně:

- **Header** (`bohemi-wp-ui/patterns/header.php`, `$nav_items`) — odkaz
  „Hlavní web" měl `$external = true` (třetí prvek pole), přepnuto na
  `false`. „Můj účet" byl `false` už předtím, beze změny.
- **Patička** (`bohemi-twentytwentyfive-child/functions.php`,
  `bohemi_wp_final_child_footer_link_list()`) — sloupce „Web" a „Služby"
  (obě mířící cross-domain na `bohemi.fit`) volaly funkci s `$external =
  true`, teď bez parametru (default `false`). Samotný `$external` parametr
  ve funkci zůstal (může se hodit příště pro jiný typ odkazu), jen ho tyhle
  dva volání přestaly nastavovat na `true`.
- **Beze změny zůstávají** — Google Maps, Facebook, Instagram (skutečně
  externí služby, ne cross-domain BoHeMi odkaz) mají `target="_blank"` dál.

`bohemi-wp-ui` → **1.1.9** (`CHANGELOG.md`), motiv → **2.2** (`style.css`).
ZIPy je potřeba přegenerovat před nahráním (`dist/` v obou složkách zatím
neaktualizovaný — stejný ruční postup jako u předchozích verzí, viz
checklist na začátku souboru).

**Po nahrání nutný re-insert obou vzorů v Site Editoru** (stejná mechanika
jako u každé předchozí úpravy headeru/patičky výš — Šablonová část je
zamrzlý HTML snapshot z okamžiku vložení, PHP update sám o sobě nic
nezmění): **Vzhled → Editor → Šablonové části → Záhlaví** i **→ Patička** —
u obou smazat starý vložený blok, „+" → najít „BoHeMi — Header"/„BoHeMi —
Footer" (kategorie „BoHeMi") → vložit znovu → Uložit.

## Header — mobilní hamburger menu odstraněn (4. 8. 2026)

Honza poslal screenshot z telefonu (`studio.bohemi.fit`, přihlašovací
stránka) s kroužkem kolem rozbaleného mobilního menu headeru a zpětnou
vazbou: „nemělo by být v rozbalovací menu, ale být na horní liště viditelné
na 1. dobrou". V tu chvíli menu obsahovalo jen dvě položky — „Hlavní web" a
„Můj účet" — takže schovávat je za hamburger/`<details>` panel byl zbytečný
extra klik navíc, na rozdíl od Astro webu, kde má mobilní menu 6 položek +
CTA + jazykový přepínač a kolaps dává smysl.

Řešení: `.bohemi-header-nav` (dva odkazy) je teď vidět na všech šířkách
obrazovky, ne jen od 1024px. Padding/font-size odkazů postupně roste přes
tři breakpointy (mobile → 480px → 768px), aby se oba odkazy vešly vedle loga
i na nejužší telefony. Hamburger markup (`.bohemi-header-mobile`, `<details>/
<summary>` toggle + panel) byl z `patterns/header.php` smazaný celý, stejně
jako navazující CSS třídy a `assets/js/header.js` (řešil jen
aria-expanded/Escape/klik-mimo pro tenhle hamburger — bez něj už nemá co
dělat, enqueue v `bohemi-wp-ui.php` odstraněn).

`bohemi-wp-ui` → **1.2.0** (`CHANGELOG.md`). ZIP je potřeba přegenerovat
před nahráním (viz checklist na začátku souboru). **Po nahrání nutný
re-insert** vzoru „BoHeMi — Header" v **Vzhled → Editor → Šablonové části →
Záhlaví** (stejná mechanika jako u každé předchozí úpravy HTML markupu
headeru výš — jen CSS by se projevilo samo, ale tahle změna maže i markup).

**Doplněno týž den (1.2.1):** Honza chtěl „Hlavní web" ještě vizuálně
odlišit — „něco podobného jako je na tom Astro webu Rezervovat, ale zase ne
tak moc". Dostal lehký button/pill vzhled (`.bohemi-header-link--home`):
zaoblená pilulka s obrysem, ale bez výplně/červené barvy (ta zůstává
vyhrazená skutečným CTA, CLAUDE.md pravidlo 4) — jen `patterns/header.php`
(nový 4. prvek `$is_home` v `$nav_items`) a CSS, žádná změna v hamburger
logice výš. „Můj účet" zůstává prostý textový odkaz. Stejný re-insert postup
platí i pro tuhle verzi.

## Sjednocení loginu — dvě stránky, jeden shortcode, vlastní `wp_signon()` handler (5. 8. 2026, ✅ hotovo a nasazeno)

**Stav: uzavřeno a funkčně otestováno živě.** `studio.bohemi.fit` mělo tři
kolidující login vstupy (core WP `/login/`, samostatnou stránku „Log In",
a `/ucet-clenstvi/`, jejíž `[pmpro_account]` navíc sám vykresloval vlastní
login formulář). **Finální řešení NENÍ jedna sloučená stránka** — první
verze o to usilovala a narazila na vestavěné PMPro chování (viz „Proč dvě
stránky, ne jedna" níž) — je to **dvě stránky se stejným shortcode**:

- **`/ucet-clenstvi/`** — PMPro „Stránka účtu" (Account Page). Obsah
  `[bohemi_account]`. V praxi ji vidí jen přihlášení (PMPro sem
  nepřihlášené sama přesměruje pryč, viz níž), takže reálně vždy ukazuje
  dashboard (`[bookingactivities_list …]` + `[pmpro_account]`).
- **`/login/`** (post id 26, „Log In" — obnovená, viz historie níž) —
  PMPro „Přihlašovací stránka" (Login Page). Obsah **stejný shortcode**
  `[bohemi_account]`. Protože sem přijde vždy jen nepřihlášený návštěvník,
  reálně vždy ukazuje login formulář + registraci.

**Shortcode `[bohemi_account]`** (`bohemi-twentytwentyfive-child/functions.php`,
motiv **2.6**) sám rozhoduje podle `is_user_logged_in()`, takže obě
stránky můžou nést identický obsah a chovat se správně podle toho, kdo na
ně přijde — žádná duplicitní logika, žádné dvě sady kódu k údržbě:
- **Odhlášený vidí:** vlastní login formulář (POSTuje sám na sebe, ne na
  `wp-login.php` — viz „Proč vlastní `wp_signon()` handler" níž) + odkaz
  „Zapomněli jste heslo?" (`wp_lostpassword_url()`) + registrace přes
  `[bookingactivities_login form="3"]` (Honza potvrdil živě, že "3" je
  čistě registrační formulář, žádná login pole).
- **Přihlášený vidí:** `[bookingactivities_list …]` (rezervace) +
  `[pmpro_account]` (dashboard členství) — `[pmpro_account]` v
  přihlášeném stavu login formulář nevykresluje, žádná kolize.
- **PMPro nikdy nevykresluje vlastní login/registraci** samostatně, jen
  tenhle dashboard.
- Přihlášení zpracovává vlastní hook na `template_redirect` —
  `wp_signon()` přímo, nonce ověřený, redirect cíl validovaný přes
  `wp_validate_redirect()` (z `redirect_to` parametru, fallback
  `/ucet-clenstvi/`), chybné údaje vrátí `?bohemi_login_error=1` (červená
  hláška na stránce). Žádná závislost na `wp-login.php`.

**Proč dvě stránky, ne jedna — PMPro „Stránka účtu" má vestavěné
přesměrování, nezávislé na „Require Membership":** první verze dala
`[bohemi_account]` jen na `/ucet-clenstvi/`, smazala „Log In" jako
zbytečnou a přesměrovala globální PMPro „Přihlašovací stránka" nastavení
zpátky na `/ucet-clenstvi/` (logicky — proč potřebovat samostatnou login
stránku, když jedna stránka umí obojí?). **Výsledek: nekonečná
přesměrovací smyčka** (`/ucet-clenstvi/` → `/ucet-clenstvi/?redirect_to=…`
→ pořád dokola, `ERR_TOO_MANY_REDIRECTS`), protože PMPro má u své
„Account Page" **vestavěné** chování „nepřihlášený sem nesmí, přesměruj
na Přihlašovací stránku" — úplně nezávislé na checkboxu „Require
Membership" (ten byl celou dobu prázdný, nebyl to zdroj problému).
Přesměrování na sebe sama = smyčka. I po dočasném nastavení „Přihlašovací
stránka" = „Use WordPress Default" (smyčka zmizela, ale nepřihlášené to
posílalo na holý `wp-login.php` místo na `[bohemi_account]`) zůstávalo
jasné, že `/ucet-clenstvi/` jako PMPro Account Page **nikdy neuvidí
odhlášený návštěvník**, ať je v jejím obsahu cokoliv — PMPro ho přesměruje
pryč dřív, než se stránka vykreslí. Řešení: pracovat s tímhle PMPro
vzorcem (samostatná Login Page + gatovaná Account Page), ne proti němu —
obnovit `/login/` a nastavit ji jako PMPro „Přihlašovací stránku".

**Proč vlastní `wp_signon()` handler místo core `wp_login_form()`:** první
verze používala `wp_login_form()`, což POSTuje na skutečné `wp-login.php`.
Živě se ukázalo, že správné přihlašovací údaje přes tenhle formulář
nikdy nezalogovaly — nejpravděpodobnější příčina je nějaký bezpečnostní
mechanismus blokující/přesměrovávající přímé požadavky na `wp-login.php`
(nejde ověřit bez wp-admin přístupu; přímá návštěva `wp-login.php` mimo
formulář funguje Honzovi normálně, takže konkrétní mechanismus zůstává
neznámý). Řešení obchází `wp-login.php` úplně — sedí to navíc lépe na
Honzovo přání „login nechci vázaný na mechanismus, který nekontroluju".

**Rozhodnutí "BA jen pro registraci, ne pro login":** Honza zvažoval
„buď jen Booking Activities, nebo jen PMPro" a nakonec zvolil rozdělení —
registrační pole u BA má už vyladěná (nemá smysl je psát znovu), ale
login chtěl nezávislý na pluginu, protože BA časem pravděpodobně
opustí/vymění. Účty samotné jsou stejně jen obyčejní `wp_users`, takže i
při budoucí výměně booking systému zůstává přihlášení funkční — jen
registrační formulář by se musel předělat, ať by byl postavený na
čemkoliv dnes.

**Dokončeno přímo Honzou ve wp-adminu (finální stav):**
1. ✅ `/ucet-clenstvi/` má obsah `[bohemi_account]`, PMPro „Stránka účtu"
   = tahle stránka, „Require Membership" prázdné (nikdy nebyl problém).
2. ✅ `/login/` (post id 26) obnovena/existuje, obsah `[bohemi_account]`.
3. ✅ PMPro „Přihlašovací stránka" nastavená na `/login/` (ne na
   `/ucet-clenstvi/` — to byl zdroj smyčky, ne na „Use WordPress Default"
   — to obcházelo náš formulář).
4. ✅ Login živě otestovaný a funkční (`wp_signon()` verze), redirect
   smyčka potvrzeně pryč (`curl` trasování čisté, jeden hop na `/login/`).
5. ✅ Vizuální styl `#loginform` (červené pilulkovité tlačítko, krémové
   inputy) potvrzený na screenshotu, sedí se zbytkem panelu.

**Zbývá jen jedna neověřená věc:** jestli Booking Activities sám
nevynucuje vlastní login/registrační box i jinde na webu (např. na
kalendáři `/rezervace/` pro nepřihlášené) — nebylo výslovně
zkontrolováno, nízká priorita, protože se to nikde neprojevilo.

**Vedlejší nález, zatím neopravený:** DevTools hlásil "A `<label>` isn't
associated with a form field" (10×) na `/ucet-clenstvi/`. Naše
`#loginform` markup má `for`/`id` správně spárované (core WP vzor), takže
jde skoro jistě o markup uvnitř `[bookingactivities_login form="3"]"`
(cizí plugin, needitujeme) — nepotvrzeno vizuální kontrolou konkrétního
elementu v DevTools, nízká priorita (nebrání použití formuláře).

## `ERR_HTTP2_PROTOCOL_ERROR` na `/ucet-clenstvi/` — dlouhodobý Wedos ATS bug, nesouvisí s loginem/kódem (5. 8. 2026)

**Stav: diagnostikováno a uzavřeno na naší straně, čeká se na Wedos.**
Honza při testování loginu narážel na nahodilé (~1×/10, občas častěji)
`ERR_HTTP2_PROTOCOL_ERROR` a prázdnou stránku na `/ucet-clenstvi/`.
Časová shoda s testováním `[bohemi_account]` vypadala podezřele, ale
**tohle je dlouho existující problém Wedos infrastruktury, ne důsledek
naší práce** — Honza si dodatečně vzpomněl, že si na podobné chování
stěžovali návštěvníci webu už dřív (jen jemu osobně to předtím fungovalo,
typické pro nahodilý HTTP/2 proxy bug závislý na síti/trase).

**Důkazy, že to není aplikace/DB/kód:**
- Autentizovaný `curl --http1.1` (10 opakování na `/ucet-clenstvi/`)
  prošel **10/10 čistě**, `200`, ~0,6–1 s, konzistentní ~480 KB.
- Query Monitor na živém requestu: **159 DB dotazů za 0,0398 s celkem**
  (40 ms), hook timing (`init` 75 ms, `template_redirect` 29 ms) v normě.
  „5 Doing it Wrong" jsou jen neškodné standardní hlášky WP 6.7+ o
  pozdním načtení překladů v Booking Activities pluginech (`ba-*`) —
  netýkají se výkonu.
- Odpověď serveru nese `Server: ATS` (Apache Traffic Server — proxy/cache
  vrstva Wedosu před samotným PHP), chyba se projevuje jen přes HTTP/2.
- Rešerše na help.wedos.cz našla **dvě starší vlákna od jiných
  zákazníků** se stejnou chybou
  ([104908](https://help.wedos.cz/otazka/neterr_http2_protocol_error/104908/),
  [98521](https://help.wedos.cz/otazka/neterr_http2_protocol_error-200/98521/) —
  druhé má dokonce stejnou kombinaci „ERR_HTTP2_PROTOCOL_ERROR" + status
  200 jako u nás). V obou případech Wedos podpora eskalovala na technické
  oddělení a chtěla testovací účet + dočasný FTP přístup — **veřejně
  publikované řešení/příčina nikde**, potvrzený delší dobu neřešený
  problém na jejich straně.
- Diagnostický mu-plugin (`bohemi-profiler.php`) byl kvůli tomuhle krátce
  přidaný a zase smazaný ze staging repa ve stejný den, dřív než ho Honza
  vůbec nahrál na server — jakmile `curl` test ukázal čistých 10/10,
  neměl už co zachytit.

**Ověřeno, že Wedos administrace nemá self-service HTTP/2 přepínač** —
zkontrolováno Honzou přímo v „Nástroje", „Konfigurace PHP" i „HTTPS"
(jen výběr varianty certifikátu; **pozor, změna varianty HTTPS tam
nevratně smaže nastavení certifikátu**, neexperimentovat kvůli tomuhle).

**Další kroky (v tomhle pořadí, žádný zatím proveden):**
1. **Nahlásit Wedos podpoře** — text hlášení byl připravený v konverzaci
   (mimo repo, čistě podpůrný text pro tiket), odkazuje i na obě starší
   help.wedos.cz vlákna výš, ať Wedos neopakuje diagnostiku od nuly.
   **Honza se rozhodl počkat na jejich odpověď**, než sahat po dalších
   krocích.
2. **🟡 Realizuje se od 7. 8. 2026: Cloudflare (zdarma) před doménu.**
   Nameservery přepnuté ve Wedosu na `ridge.ns.cloudflare.com` /
   `vera.ns.cloudflare.com`, čeká se na propagaci (Wedos avizuje min. 6 h).
   Terminace HTTP/2 s návštěvníkem se přesune na Cloudflare edge (zralá
   implementace); spojení Cloudflare → Wedos origin jede na free plánu
   defaultně přes HTTP/1.1 (HTTP/2-to-origin je placená/pokročilá funkce,
   musela by se zapínat ručně) — a HTTP/1.1 vůči Wedosu už máme ověřené
   jako čisté 10/10. Čistě DNS změna, žádný zásah do WordPressu, plně
   reverzibilní. Bonus: řeší i starší doporučení z WebPageTest auditu níž
   („Bez CDN"). Plný záznam migrace (DNS tabulka, SSL/TLS mód, rollback
   postup) v [`docs/cloudflare-dns-migration.md`](../docs/cloudflare-dns-migration.md).
   **Až propagace doběhne, ověřit znovu `curl --http1.1`/živý test na
   `/ucet-clenstvi/` a zapsat sem výsledek — teprve to potvrdí, jestli
   to bug skutečně vyřešilo.**
3. **Migrace celého `studio.bohemi.fit` na Hetzner** (kde už běží Astro
   `bohemi.fit`) — těžší, invazivnější plán C, jen kdyby Cloudflare
   nepomohl. Riziko pro platby/rezervace (PMPro/Booking Activities), ne
   první volba.

**Dva vedlejší nálezy z procházení Wedos administrace** (nesouvisí s
HTTP/2, ale stojí za zapamatování):
- **Webhosting → Nástroje → „Oprava práv u souborů"** — jedním klikem
  řeší přesně ten opakovaný 403 bug zdokumentovaný níž („Motiv — audit a
  oprava", „WebPageTest audit" bod 1), který jsme dřív museli opravovat
  ručně přes SSH/FTP `chmod`. **Použít při každém budoucím výskytu 403**
  na nově nahraných souborech (motiv, `bohemi-wp-ui`, `ba-*` pluginy)
  místo manuálního postupu. „Obnovení výchozího .htaccessu" ve stejné
  sekci nepoužívat bez rozmyslu — mohlo by smazat WordPress permalink
  pravidla.
- **Konfigurace PHP:** `display_errors: zapnuto` + `log_errors: vypnuto`
  — obráceně, než by mělo být na produkci s platbami/členstvím (chyby se
  zobrazují návštěvníkům, nikam se neukládají). Doporučeno prohodit,
  není naléhavé.

**Cena omylu, než se tohle vyjasnilo:** Honza dřív kvůli týhle chybě
opakovaně měnil/přeinstalovával pluginy v domnění, že příčina je někde
v aplikaci — byla to ale celou dobu Wedos infrastruktura. Stojí za to mít
na paměti při jakémkoliv budoucím podivném/nekonzistentním chování na
`studio.bohemi.fit`: nejdřív zvážit hosting/proxy vrstvu (Wedos ATS), než
sahat po změnách pluginů.
