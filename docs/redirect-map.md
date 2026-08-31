# Migrační tabulka — z reálných dat Search Console (12 měsíců)

Sestaveno z kliků/zobrazení, ne z odhadu. Akce: KEEP = nová stránka na stejném
slugu · 301 = přesměrovat na nový cíl · WP = nechat ve WordPressu (booking/účet) ·
LEGAL = právní stránka, zachovat slug (nízký provoz, ale nutná) · IGNORE = asset,
neřešit.

## ✅ Stav (1. 8. 2026): bohemi.fit běží na Astru, redirecty implementované

`bohemi.fit` je od 1. 8. 2026 v provozu na Astru (potvrzeno curl testem —
`/`, `/krouzky-pro-deti/` atd. vrací 200 z nové stránky). Všechny 301 řádky
níže označené **IMPLEMENTOVÁNO** jsou zapsané v `redirects` bloku
`astro.config.mjs` (generují statickou HTML stránku s meta-refresh +
`<link rel="canonical">` na cíl — ne skutečnou host-level 301, protože nginx
config v Coolify není v tomto repu editovatelný; pokud se to změní, přesunout
tam). `trailingSlash: 'always'` je nastaveno taky.

**Druhý zdroj dat** (`_raw/bohemi-migrace.zip`, 31. 7. 2026 — nezávislý
refresh GSC exportu) potvrdil čísla i seznam níž, žádné nové položky navíc
kromě toho, co už bylo zapsané.

### ✅ Rozhodnuto Honzou 1. 8. 2026
- **`/hula-hoop/` + `/hooping/`** → `/skupinove-lekce/` (byla to spíš
  dospělácká/fitness lekce než dětská aktivita) — implementováno.
- **Právní stránky** zůstávají natrvalo na `studio.bohemi.fit` — 301 tam je
  trvalé řešení, ne provizorium. Astro vlastní právní stránky stavět nebude.

### ❓ Pořád čeká na Honzu (nevymýšlet, jen zapsat rozhodnutí)
- **`/scioalaputyka/`** — pořád nevíme, co to bylo (spolupráce se Scio
  školou?). Zatím 404 na produkci.
- **`/blog/` → `/`** — IMPLEMENTOVÁNO jako bezpečný default (nový web blog
  nemá), ale pokud existovaly jednotlivé indexované články
  (`/blog/nazev-clanku/`), ty tahle mapa nezachytává — potvrdit, jestli
  nějaké byly.
- **Obrázky `/wp-content/uploads/*`** — staré obrázky mají vlastní pozici v
  Google Images a odkazy z Facebooku/Instagramu. Potřeba zkopírovat složku ze
  zálohy staré WP instalace do `public/wp-content/uploads/` — čeká na zálohu
  od Honzy, nejde udělat bez souborů.
- **GA4 měřicí ID** — kód je připravený (`PUBLIC_GA4_ID` env var, viz
  `README.md`), ale samotné ID nikdo nezadal, takže se zatím nic neposílá.
- **`/feed/` (RSS)** a query-string URL (`/?page_id=3`,
  `.../platba-clenstvi/?level=4`) — nejde vyřešit v Astro `redirects` (neumí
  410 ani match na query string), nízký dopad (0 kliků), řešit až při
  host-level redirectech.

## KEEP — vlastní stránka, stejný slug (reálný provoz)
| Stará URL | Kliky | Akce |
|---|---|---|
| / | 896 | KEEP (homepage) |
| /krouzky-pro-deti/ | 338 | KEEP — priorita č. 1, tvůj největší tahák |
| /pronajem-salu/ | 142 | KEEP |
| /supermamky/ | 72 | KEEP (výjimka: typ lekce s vlastním provozem) |
| /skupinove-lekce/ | 50 | KEEP — rozcestník; OPRAVIT title/snippet (8 252 zobr., mizerné CTR) |
| /fotobiomodulacni-terapie/ | 30 | KEEP |
| /kontakt/ | 20 | KEEP |
| /cenik/ | 19 | KEEP |
| /open-gym/ | 12 | KEEP |
| /firmy/ | 7 | KEEP |
| /fotky/ | 3 | KEEP (659 zobr.) |

### Nové sluby MIMO tuhle GSC tabulku (schváleno Honzou, ne z historického provozu)
Žádný z těchhle slugů nemá historii kliků — je to nová nabídka, ne migrace
starého obsahu. Zapsáno sem, aby platilo pravidlo „nové slugy odsud,
nevymýšlet" i pro ně.
| Slug | Schváleno | Poznámka |
|---|---|---|
| /program-8-tydnu/ | 7/2026 | Vlajkový program, samostatná stránka |
| /kurzy/ | 31. 8. 2026 | Krátké specializační kurzy (kalistenika, žonglování, stojky) vedle Akademie Cirk La Putyka |

## 301 — přesměrovat starou URL na nový cíl
| Stará URL | Kliky | → Cíl | Stav |
|---|---|---|---|
| /o-nas/ | 18 | → /proc-bohemi/  (1 333 zobr. — důležité) | ✅ implementováno |
| /hula-hoop/ | 46 | → /skupinove-lekce/ (hula hoop skončil natrvalo, cíl potvrzen 1. 8. 2026) | ✅ implementováno |
| /nase-sluzby/osobni-treninky/ | 18 | → /osobni-treninky/ | ✅ implementováno |
| /lenka-novackova/ | 15 | → /treneri/ (starý trenér, už u vás není) | ✅ implementováno |
| /scioalaputyka/ | 14 | → ? POTVRDIT co to je, pak cíl | ❌ čeká na Honzu, dosud 404 |
| /klara-sauerova/ | 10 | → /treneri/ (starý trenér) | ✅ implementováno |
| /primestsky-tabor/ | 9 | → /krouzky-pro-deti/ (tábor zrušen natrvalo, rozhodnuto 7/2026) | ✅ implementováno |
| /informace/cirkusova-skola/ | 5 | → /krouzky-pro-deti/ | ✅ implementováno |
| /lucie-bierhausova/ | 2 | → /treneri/ (starý trenér) | ✅ implementováno |
| /ucet-clenstvi/cenik/ | 2 | → /cenik/ (duplicita) | ✅ implementováno |
| /mkb/ | 0 (565 zobr.) | → /lekce-a-sluzby/ | ✅ implementováno |
| /nase-sluzby/ | 0 (405 zobr.) | → /lekce-a-sluzby/ | ✅ implementováno |
| /ai-a-bohemi/ | 0 | → / | ✅ implementováno |
| /blog/ | 0 | → / | ✅ implementováno (viz „čeká na Honzu" výš — jednotlivé články nezachyceny) |
| /pripravujeme/ | 1 | → /lekce-a-sluzby/ | ✅ implementováno |
| /hernicka/ | 1 | → /krouzky-pro-deti/#objevovarna | ✅ implementováno |
| /spoluprace/ | 1 | → /kontakt/ | ✅ implementováno |
| /informace/kurzy-pro-deti/ | 1 | → /krouzky-pro-deti/ | ✅ implementováno |
| /nase-sluzby/meditace/ | 0 | → /lekce-a-sluzby/ (služba zrušena) | ✅ implementováno |
| /informace/fotobiomodulacni-terapie/ | 0 | → /fotobiomodulacni-terapie/ (duplicita) | ✅ implementováno |
| /informace/benefity/ | 0 | → /cenik/ | ✅ implementováno |
| /informace/vylepsujeme/ | 0 | → / | ✅ implementováno |

**Pozn. k /treneri/:** stará i nová URL jsou stejné (`/treneri/` je od
17. 7. 2026 reálná KEEP stránka, ne redirect) — žádný redirect tu není
potřeba, jen se od té doby nemá vracet stará myšlenka „→ /proc-bohemi/#treneri".

## 301 — druhá vlna: staré duplicity a legacy struktura (z indexace GSC)
Tyhle v prvním exportu nebyly (Google je zná, ale neindexuje). Po přechodu by
spadly do 404 — každá potřebuje 301 na aktuální cíl.
| Stará URL | → Cíl | Stav |
|---|---|---|
| /nase-sluzby/skupinove-lekce/ | → /skupinove-lekce/ | ✅ implementováno |
| /nase-sluzby/skupinove-lekce/hiit/ | → /skupinove-lekce/#hiit | ✅ implementováno |
| /hooping/ | → /skupinove-lekce/ | ✅ implementováno |
| /fitteams-program-pro-firmy/ | → /firmy/ | ✅ implementováno |
| /primestsky-tabor-aktivitaci/ | → /krouzky-pro-deti/ | ✅ implementováno |
| /treneri-2/ | → /treneri/ | ✅ implementováno |
| /klara-mechurova/ | → /treneri/#klara-mechurova (aktuální trenérka) | ✅ implementováno |
| /ucet-clenstvi/urovne-clenstvi/ | → /cenik/ | ✅ implementováno |
| /kalendar/ | → /skupinove-lekce/ | ✅ implementováno |
| /akademie-cirk-la-putyka/ | → /krouzky-pro-deti/ | ✅ implementováno |
| /detska-zumba/ | → /krouzky-pro-deti/#detska-zumba | ✅ implementováno |

## Globální pravidlo — trailing slash (JEDNO nastavení, ne po stránkách)
Google zná URL s lomítkem i bez (`/krouzky-pro-deti` vs `/krouzky-pro-deti/`,
`/kontakt` vs `/kontakt/`, `/provozni-rad`). Vyber JEDNU variantu (Astro default =
s lomítkem, `trailingSlash: 'always'`) a druhou nech 301 přesměrovat na ni.
Nastav globálně, ať nevznikají nové duplicity. **✅ implementováno** 1. 8. 2026
(`trailingSlash: 'always'` v `astro.config.mjs`).

## WP — nechat ve WordPressu (booking / účet)
| Stará URL | Akce | Stav |
|---|---|---|
| /rezervace/ | WP (56 kliků — funkční booking) | ✅ implementováno (301 na studio.bohemi.fit) |
| /login/ | WP | ✅ implementováno |
| /ucet-clenstvi/platba-clenstvi/ | WP | ✅ implementováno |
| /ucet-clenstvi/platba-clenstvi/?level=4 | WP | ❌ Astro redirects neumí match na query string, nízký dopad (1 zobr.) |
| /?page_id=3 | WP interní, ignore | ❌ totéž, irelevantní (odkaz ze staré cookie lišty) |

## LEGAL — zachovat slug (nutné, i když provoz ~0)
**✅ implementováno jako trvalý 301 na `studio.bohemi.fit`** (ekvivalentní
stránky tam existují a vrací 200) — potvrzeno Honzou 1. 8. 2026, Astro vlastní
právní stránky stavět nebude.
- /vseobecne-obchodni-podminky/
- /zpracovani-osobnich-udaju/
- /provozni-rad
- /obchodni-podminky-pronajmu-prostor/
- /privacy-policy/  → přesměrováno rovnou na /zpracovani-osobnich-udaju/ cíl (duplicita sjednocena)
- /obchodni-podminky-akademie-clp/  (akademie stále běží, takže zachováno)

## IGNORE — WP šum, neřešit (nevznikne na novém webu)
- /wp-content/uploads/*.jpg — obrázky
- /*/embed/ (o-nas/embed, skupinove-lekce/embed, pripravujeme/embed…) — WP oEmbed
- /pgc_simply_gallery/…/attachment/img_… — přílohy galerie
- ?utm_source=… · ?s={search_term_string} · ?page_id=… — parametry a interní WP
- /login/?action=… · /login/?redirect_to=… — WP auth (zůstává ve WP)
- /img_20230413_174059/ apod. — attachment stránky WP

## ⚠️ noindex — kamarád na stagingu, nepřítel na produkci
Google už tvůj staging noindex viděl. Na PRODUKCI musí `PUBLIC_SITE_ENV=production`
fungovat, jinak vyšleš noindex i na ostrý web a 896 kliků na homepage zmizí.
Po nasazení produkce ověř ve zdroji stránky, že tam NENÍ `noindex`.

---

## Co z toho plyne pro stavbu
1. **Děti a rodina = priorita.** /krouzky-pro-deti/ je po homepage tvá nejsilnější
   stránka. Postav ji pořádně a vytáhni dopředu i na homepage.
2. **Oprav /skupinove-lekce/ snippet** — 8 252 zobrazení, 0,6 % CTR = spící
   poptávka, kterou stránka neproměňuje.
3. **Vlastní stránky:** krouzky-pro-deti, pronajem-salu, supermamky,
   skupinove-lekce (hub), fotobiomodulace, open-gym, firmy, osobni-treninky.
   (Hula-hoop vypadl 7. 7. 2026 — služba skončila, URL je 301 na /skupinove-lekce/.)
4. **Typy lekcí (kruháč, HIIT…)** v datech nejsou → zůstávají v rozvrhu.
5. **Nastav globální trailing-slash pravidlo** (`trailingSlash: 'always'`) —
   jinak si duplicity vyrobíš nanovo. ✅ hotovo.
6. **Potvrdit:** co je /scioalaputyka/ · existují jednotlivé články na starém
   /blog/? Zbytek (trailing slash, redirecty na všechno rozhodnuté vč.
   hula-hoop a legal stránek) je hotový, viz stavová sekce nahoře.
