# Import z Claude Design → Astro

Znovupoužitelný prompt pro Claude Code. Postup:

1. Z Claude Design vyexportuj **Project archive .zip** (víc obrazovek jako
   oddělené soubory) a/nebo **Standalone HTML** (vše v jednom).
2. Ulož do `imports/` v repu (je gitignorovaný, viz níž):
   - zip rozbal do `imports/bohemi-design/`
   - standalone HTML jako `imports/homepage.html`
3. V Claude Code vlož prompt níž a doplň **SLUG**.

> Máš-li obojí, prompt to řeší: **zip = primární zdroj, HTML = vizuální reference
> a fallback**. Není to dvojí práce, je to jeden zdroj a jedno ověření.

> Přidej `imports/` do `.gitignore` — je to dočasný zdroj, ne součást webu.

---

## Prompt (zkopíruj do Claude Code)

```
Než cokoliv uděláš, přečti si `CLAUDE.md` a `design-system/MASTER.md`.

Mám DVA exporty TÉHOŽ designu z Claude Design:
- imports/bohemi-design/   (rozbalený Project archive .zip — víc souborů)
- imports/homepage.html    (Standalone HTML — vše v jednom, obrázky base64)

Cílová stránka: slug `/`  (Astro: src/pages/index.astro)

NEJDŘÍV prozkoumej oba a řekni mi: co je ve složce bohemi-design (struktura),
který zdroj použiješ jako primární a proč. Pak mi ukaž PLÁN (jaké sekce, jaké
komponenty). Počkej na moje OK, teprve pak stav.

Úkol: přepiš design do Astro stránky, ne jako kopii HTML, ale jako čistou
Astro + Tailwind implementaci.

Pravidla:

0. ZDROJE — primární je rozbalený zip (imports/bohemi-design/), pokud obsahuje
   čitelné HTML/CSS jednotlivých obrazovek. Standalone HTML ber jako autoritativní
   VIZUÁLNÍ referenci a fallback pro cokoliv, co v zipu chybí nebo je nečitelné.
   NEslučuj je a nediffuj mezi nimi — vyber čistší zdroj, druhý použij jen na
   ověření vzhledu. (Obrázky: ze zipu většinou jako soubory, ze standalone HTML
   jako base64 → viz pravidlo 3.)

1. TOKENY — export je zdroj pravdy pro reálné značkové barvy a fonty BoHeMi.
   - Vytáhni skutečně použité barvy, fonty a spacing z exportu.
   - Porovnej je s `design-system/MASTER.md`. Kde se liší, AKTUALIZUJ MASTER.md
     podle exportu (export vyhrává) a promítni do tailwind.config.
   - Kde export použije barvu/font mimo logiku MASTER.md, NEVYMÝŠLEJ — vypiš mi
     konflikt a zeptej se.
   - V komponentách používej výhradně tokeny, nikdy hardcoded hex/font.

2. STRUKTURA — opakující se UI rozsekej do komponent v src/components/
   (Hero, PillarsBHM, LekceCard, CTASection, Footer…). index.astro jen skládá.

3. OBRÁZKY — ze zipu většinou přijdou jako soubory: zkopíruj do public/.
   Ze standalone HTML jsou base64 inline: vytáhni je do souborů v public/.
   Ve výsledném Astro kódu nenechávej žádné inline data-URI.

4. FONTY — napoj přes Google Fonts <link> nebo @fontsource, ne inline.

5. REZERVACE — každé tlačítko „Rezervovat" je <a href="https://rezervace.bohemi.fit/">.
   Žádný formulář, žádný iframe, žádná booking logika. Statika only.

6. SEO — jeden <h1>, smysluplný <title> + <meta name="description">, sémantické
   nadpisy, alt texty u obrázků.

7. VĚRNOST — vizuálně to má sedět s exportem (layout, rozestupy, barvy).
   Když něco z exportu neumíš čistě přenést (CSP-only triky, inline JS), řekni mi
   to a navrhni alternativu, neimprovizuj potichu.

8. Responzivně na 375 / 768 / 1024 / 1440, respektuj prefers-reduced-motion.

Na konci mi řekni: které tokeny ses změnil v MASTER.md, jaké komponenty vznikly,
a co (pokud něco) se nedalo z exportu přenést 1:1.
```

---

## Pro další stránky

Stejný prompt, jen změň cestu k exportu a slug, např.:
- `imports/lekce.html` → slug `/skupinove-lekce/` → `src/pages/skupinove-lekce.astro`
- `imports/cenik.html` → slug `/cenik/` → `src/pages/cenik.astro`

Komponenty z první stránky se mají recyklovat, ne psát znovu.
