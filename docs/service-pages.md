# Service stránky — plán + prompt

Cíl: z rozcestníku `/lekce-a-sluzby/` vytáhnout jednotlivé service stránky na
STARÉ WP slugy (ožijí zaindexované URL, nepotřebují 301). Menu zůstává
konsolidované — service stránky jsou hloubkové, linkované z rozcestníku.

## Zdroj textu (priorita)
1. Konkrétní odstavec, který už je na stagingu `/lekce-a-sluzby/` pro tu službu
   → rozbal do plné stránky.
2. Reálné bony od Honzy (ceny, rozvrh, nářadí, kdo vede) — když chybí, ZEPTAT SE.
3. Internet JEN na neutrální faktické pozadí (např. co fotobiomodulace obecně je).
   Nikdy ne na vymyšlené funkce, formáty nebo vybavení.

## Stránky a slugy (potvrď proti Search Console)
| Služba | Starý slug (ověřit) |
|---|---|
| Skupinové lekce (rozcestník + rozvrh) | /skupinove-lekce/ |
| Fotobiomodulační terapie | /fotobiomodulacni-terapie/ |
| Osobní tréninky | /osobni-trener/ (ověřit) |
| Open gym | /open-gym/ |
| Pronájem sálu | /pronajem-salu/ |
| Kroužky pro děti | /krouzky-pro-deti/ |
| Objevovárna | /objevovarna/ |
| Firmy / FitTeams | /firmy/ |

---

## Prompt (jedna stránka — zkopíruj, doplň SLUŽBU a SLUG)

```
Než cokoliv: přečti `CLAUDE.md`, `design-system/MASTER.md` a `docs/fraze-pool.md`.

Stav service stránku: SLUŽBA = …  ·  SLUG = /…/  (stejný jako starý web)

ZDROJ textu, v tomhle pořadí:
1. najdi odstavec pro tuhle službu na stránce /lekce-a-sluzby/ a rozbal ho
2. doplň jen to, co ti dám já (ceny, rozvrh, kdo vede); co nevíš, NEVYMÝŠLEJ —
   zeptej se mě a nech placeholder
3. internet jen na neutrální fakt (co služba obecně je), opatrně

STRUKTURA stránky (konkrétní, ne esej):
- H1 = název služby, civilně
- 1–2 odstavce: co to je, jak to u nás probíhá
- pro koho / pro koho ne
- prakticky: kde, jak dlouho, co si vzít, kapacita
- cena (jen pokud ji mám potvrzenou; jinak placeholder + dotaz)
- CTA „Rezervovat" → https://bohemi.fit/rezervace/

TVRDÁ PRAVIDLA:
- Service stránka je BETON, ne filozofie. ŽÁDNÝ knižní rámec, žádná „holistic
  human health" struktura, žádné mapování na principy.
- Zakázaná slova (nula): „energie" jako woo, „signály těla", „tělo se spravuje
  samo", „holistické", „samoregulace", „přirozené hojení/detox", „prodáváme cestu".
- Z fraze-pool.md smíš vzít MAX 1 větu, jen pokud na stránku sedí. Ne zeď.
- Nevymýšlej nářadí, formáty, certifikace, ceny ani rozvrh — to jsou data ode mě.
- SEO: jeden H1, vlastní <title> + meta description, sémantické nadpisy, alt texty.
- Slug přesně dle zadání (= stará WP URL).

SPECIÁLNĚ FOTOBIOMODULACE (zdravotní tvrzení — pozor):
- Popiš, co to je a na co se běžně používá (regenerace, podpora hojení) NEUTRÁLNĚ.
- ŽÁDNÉ sliby léčby/vyléčení, žádné konkrétní zdravotní záruky.
- Když si nejsi jistý tvrzením, vynech ho. Radši míň a pravda.
- Přidej větu, že nenahrazuje lékařskou péči.

Na konci: ukaž text, vypiš čím jsi co doložil (staging / moje data / net) a kde máš
placeholder čekající na moje doplnění.
```

---

## Checklist po postavení stránky (napojení na navigaci — 7/2026)

Web má sjednocenou třívrstvou navigaci (HP → rozcestník → detail; pravidla
v `CLAUDE.md`, sekce „Navigační logika"). Nová service stránka se napojuje takto:

1. **Data:** doplň `href` (u `individualServices` / `kidsActivities` / …)
   nebo `page` (u `classes`) v `src/data/home.ts` + `home.en.ts` — dlaždice
   na HP a rozcestníku se tím samy stanou klikací.
2. **Text:** plný odstavec služby PŘESUŇ z rozcestníku na detail; na
   rozcestníku nech jen krátkou dlaždici. Stejný odstavec nesmí zůstat dvakrát.
3. **Footer:** přidej stránku do sloupce „Služby" (`Footer.astro`, CS + EN).
4. **Ceník:** má-li služba sekci v ceníku, odkaz na detail patří do hlavičky
   sekce vedle `<h2>` (vzor: fotobiomodulace, kroužky). Odpovídá-li dlaždice
   v ceníku konkrétní stránce/kotvě, je klikací celá (vzor: dlaždice kroužků);
   dlaždice cenových variant jedné služby zůstávají neklikací.
5. **Speciálně `/firmy/`:** přepnout dropdown „Pro firmy" a kartu 08
   v „Vyber, co teď potřebuješ" z kotvy `/lekce-a-sluzby/#pro-firmy` na `/firmy/`.
6. Spusť build a zkontroluj odkazy a kotvy: `npm run build && node scripts/check-links.mjs`
   (0 chyb; hlásí i duplicitní odstavce rozcestník × detail).

## Co potřebuju od Honzy, než se rozjedeme
- Potvrdit seznam stránek + reálné staré slugy (ideálně ze Search Console).
- Reálné bony tam, kde staging odstavec nestačí: ceny, rozvrh, kdo vede,
  u fotobiomodulace konkrétní využití (a čeho se vyhnout v tvrzeních).
