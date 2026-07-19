# WordPress (studio.bohemi.fit)

Tenhle adresář **není** buildovaný Astro webem, je to čistě staging/reference
pro `studio.bohemi.fit`. V repu je z něj sledovaný jen **`bohemi-wp-ui/`** —
plugin pro hlavičku, protože to je jediná WP věc, na které se v tomhle repu
aktivně pracuje. Zbytek stacku (viz níž) na `studio.bohemi.fit` běží, ale
tenhle repo ho nespravuje ani neverzuje.

## Celý obrázek — co běží na studio.bohemi.fit

| Vrstva | Co | Kde to je | Spravuje tenhle repo? |
|---|---|---|---|
| Motiv | ⚠️ **`bohemi-twentytwentyfive-child`** (ne čisté TT5, viz „⚠️ Aktivní motiv" níž) | child theme, live na produkci | ne — nesledovaný, viz poznámka |
| Rezervace | **Booking Activities** | WP plugin (booking systém) | ne — vendor, needituje se |
| Členství/platby | **Paid Memberships Pro** | WP plugin | ne — vendor, needituje se |
| Styl formulářů Booking Activities + PMPro | **`bohemi-custom-ui`** v1.16 | vlastní plugin, submit tlačítko/cenové a uživatelské boxy | ne — jen `_raw/bohemi-custom-ui-v116.zip` (gitignored) |
| Hlavička | **`bohemi-wp-ui`** | vlastní plugin | ✅ ano — [`bohemi-wp-ui/`](bohemi-wp-ui/), instalační ZIP v [`dist/bohemi-wp-ui.zip`](dist/bohemi-wp-ui.zip) |

`bohemi-wp-ui` a `bohemi-custom-ui` řeší **různé věci** (hlavička vs. styl
formulářů) a klidně běží vedle sebe — jeden nenahrazuje druhý.

## Instalační checklist (v tomhle pořadí)

1. **Twenty Twenty-Five** — pokud ještě není aktivní motiv, aktivuj ho
   (Vzhled → Motivy). Nic se v něm needituje.
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
rezervace a členství, stylizované formuláře a hlavičku vizuálně sladěnou s
`bohemi.fit`.

## ⚠️ Aktivní motiv na produkci je child theme, ne čisté TT5

Zjištěno 20. 7. 2026 při diagnóze cache problému (viz níž) — živý
`studio.bohemi.fit` běží na `wp-content/themes/bohemi-twentytwentyfive-child/`,
ne na holém Twenty Twenty-Five, jak jsme předpokládali při návrhu
`bohemi-wp-ui` (plugin vs. šablona, rozhodnutí zůstat u pluginu). Tenhle
child theme má skoro identické jméno a účel jako `bohemi-wp-final-child`,
co jsme si prohlédli jako „inspiraci" a z repa smazali — buď je to jeho
starší nasazená verze, nebo samostatný, o kterém nevíme víc, protože do
souborů na produkci nevidím (žádný SSH/FTP přístup, jen HTTP).

**Neřeším to sám** — `bohemi-wp-ui` funguje nezávisle na aktivním motivu,
takže header instalace popsaná výš je platná tak jak je. Ale stojí za to,
abys v `Vzhled → Motivy` na `studio.bohemi.fit` zkontroloval, co přesně ten
child theme dělá (vlastní `header.html`? Koliduje s `bohemi-wp-ui`
patternem?) — dej vědět, co tam najdeš, ať to dorovnáme.

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

## Co tu dřív bylo a proč zmizelo z repa

19. 7. 2026 sem byly krátce přesunuté i starší nálezy z `_raw/` (plugin
`bohemi-custom-ui`, child theme `bohemi-wp-final-child` s vlastním pokusem o
header + patterny pro rezervace/účet, a vendor ZIPy Booking Activities +
Twenty Twenty-Five). Sloužily jen jako inspirace/reference při stavbě
`bohemi-wp-ui` a byly z repa zase smazané, protože tenhle repo má sledovat
jen to, na čem se aktivně pracuje. **Nebyly nikdy commitnuté do gitu**
(`wordpress/` byl celou dobu untracked), takže v historii repa nejsou —
pořád jsou to ale ty samé ZIPy, které jsi nahrával do `_raw/` (gitignored,
zůstávají tam beze změny):

- `_raw/bohemi-custom-ui-v116.zip` — pořád aktivně potřeba, viz checklist výš.
  (Krátce jsem ho omylem smazal beze zálohy při úklidu `wordpress/` — zpátky
  do `_raw/` ho 20. 7. 2026 znovu nahrál Honza.)
- `_raw/booking-activities.zip`, `_raw/twentytwentyfive.zip` — vendor,
  needituje se, jen pro referenci/rychlou instalaci.
- child theme `bohemi-wp-final-child` — nebyl znovu vrácen do `_raw/` (byl
  jen inspirace, jeho header konfliktoval s `bohemi-wp-ui` a byl vyřešen
  jeho smazáním, zbytek — barevná paleta, patterny pro rezervace/účet — se
  nikam nepoužívá).
