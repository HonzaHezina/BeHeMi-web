# Migrační tabulka — z reálných dat Search Console (12 měsíců)

Sestaveno z kliků/zobrazení, ne z odhadu. Akce: KEEP = nová stránka na stejném
slugu · 301 = přesměrovat na nový cíl · WP = nechat ve WordPressu (booking/účet) ·
LEGAL = právní stránka, zachovat slug (nízký provoz, ale nutná) · IGNORE = asset,
neřešit.

## KEEP — vlastní stránka, stejný slug (reálný provoz)
| Stará URL | Kliky | Akce |
|---|---|---|
| / | 896 | KEEP (homepage) |
| /krouzky-pro-deti/ | 338 | KEEP — priorita č. 1, tvůj největší tahák |
| /pronajem-salu/ | 142 | KEEP |
| /supermamky/ | 72 | KEEP (výjimka: typ lekce s vlastním provozem) |
| /skupinove-lekce/ | 50 | KEEP — rozcestník; OPRAVIT title/snippet (8 252 zobr., mizerné CTR) |
| /hula-hoop/ | 46 | KEEP (výjimka: typ lekce s vlastním provozem) |
| /fotobiomodulacni-terapie/ | 30 | KEEP |
| /kontakt/ | 20 | KEEP |
| /cenik/ | 19 | KEEP |
| /open-gym/ | 12 | KEEP |
| /firmy/ | 7 | KEEP |
| /fotky/ | 3 | KEEP (659 zobr.) |

## 301 — přesměrovat starou URL na nový cíl
| Stará URL | Kliky | → Cíl |
|---|---|---|
| /o-nas/ | 18 | → /proc-bohemi/  (1 333 zobr. — důležité) |
| /nase-sluzby/osobni-treninky/ | 18 | → nová stránka osobních tréninků |
| /treneri/ | 16 | → /proc-bohemi/#treneri (nebo samostatná /treneri/) |
| /lenka-novackova/ | 15 | → trenéři (starý trenér, už u vás není) |
| /scioalaputyka/ | 14 | → ? POTVRDIT co to je, pak cíl |
| /klara-sauerova/ | 10 | → trenéři (starý trenér) |
| /primestsky-tabor/ | 9 | → /krouzky-pro-deti/ (nebo sekce tábor) |
| /informace/cirkusova-skola/ | 5 | → /krouzky-pro-deti/ |
| /lucie-bierhausova/ | 2 | → trenéři (starý trenér) |
| /ucet-clenstvi/cenik/ | 2 | → /cenik/ (duplicita) |
| /mkb/ | 0 (565 zobr.) | → / nebo /proc-bohemi/ |
| /nase-sluzby/ | 0 (405 zobr.) | → /lekce-a-sluzby/ |
| /ai-a-bohemi/ | 0 | → /proc-bohemi/ |
| /blog/ | 0 | → / (nebo ponechat, jestli chceš blogovat) |
| /pripravujeme/ | 1 | → / |
| /hernicka/ | 1 | → /krouzky-pro-deti/ |
| /spoluprace/ | 1 | → / nebo /firmy/ |
| /informace/kurzy-pro-deti/ | 1 | → /krouzky-pro-deti/ |
| /nase-sluzby/meditace/ | 0 | → / (služba zrušena) |
| /informace/fotobiomodulacni-terapie/ | 0 | → /fotobiomodulacni-terapie/ (duplicita) |
| /informace/benefity/ | 0 | → /cenik/ |
| /informace/vylepsujeme/ | 0 | → / |

## 301 — druhá vlna: staré duplicity a legacy struktura (z indexace GSC)
Tyhle v prvním exportu nebyly (Google je zná, ale neindexuje). Po přechodu by
spadly do 404 — každá potřebuje 301 na aktuální cíl.
| Stará URL | → Cíl |
|---|---|
| /nase-sluzby/skupinove-lekce/ | → /skupinove-lekce/ |
| /nase-sluzby/skupinove-lekce/hiit/ | → /skupinove-lekce/ |
| /hooping/ | → /hula-hoop/ |
| /fitteams-program-pro-firmy/ | → /firmy/ |
| /primestsky-tabor-aktivitaci/ | → /krouzky-pro-deti/ (nebo sekce tábor) |
| /treneri-2/ | → /proc-bohemi/#treneri |
| /klara-mechurova/ | → /proc-bohemi/#treneri (aktuální trenérka) |
| /ucet-clenstvi/urovne-clenstvi/ | → /cenik/ |
| /kalendar/ | → /skupinove-lekce/ (nebo rozvrh) |

## Globální pravidlo — trailing slash (JEDNO nastavení, ne po stránkách)
Google zná URL s lomítkem i bez (`/krouzky-pro-deti` vs `/krouzky-pro-deti/`,
`/kontakt` vs `/kontakt/`, `/provozni-rad`). Vyber JEDNU variantu (Astro default =
s lomítkem, `trailingSlash: 'always'`) a druhou nech 301 přesměrovat na ni.
Nastav globálně, ať nevznikají nové duplicity.

## WP — nechat ve WordPressu (booking / účet)
| Stará URL | Akce |
|---|---|
| /rezervace/ | WP (56 kliků — funkční booking) |
| /login/ | WP |
| /ucet-clenstvi/platba-clenstvi/ (i ?level=4) | WP |
| /?page_id=3 | WP interní, ignore |

## LEGAL — zachovat slug (nutné, i když provoz ~0)
- /vseobecne-obchodni-podminky/
- /zpracovani-osobnich-udaju/
- /provozni-rad
- /obchodni-podminky-pronajmu-prostor/
- /privacy-policy/  (možná duplicita se zpracovani-osobnich-udaju — sjednotit)
- /obchodni-podminky-akademie-clp/  (zachovat jen pokud akademie běží)

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
3. **Vlastní stránky:** krouzky-pro-deti, pronajem-salu, supermamky, hula-hoop,
   skupinove-lekce (hub), fotobiomodulace, open-gym, firmy, osobni-treninky.
4. **Typy lekcí (kruháč, HIIT…)** v datech nejsou → zůstávají v rozvrhu.
5. **Nastav globální trailing-slash pravidlo** (`trailingSlash: 'always'`) —
   jinak si duplicity vyrobíš nanovo.
6. **Potvrdit:** co je /scioalaputyka/ · zda /blog/ chceš živý · které legal
   stránky ještě platí · běží ještě akademie CLP?
