# BoHeMi — Design System (MASTER)

> Jediný zdroj pravdy pro design. Čte ho Claude Code i Copilot. Tokeny níž
> žijou v kódu jako CSS proměnné v `@theme` v `src/styles/global.css` (Tailwind v4,
> bez `tailwind.config.js`) — komponenty berou hodnoty odsud, ne natvrdo.
>
> ⚠️ **Barvy jsou vědomý startovní směr, ne finál.** Pokud má BoHeMi reálné
> značkové barvy (logo, stávající identitu), nahraď jimi tokeny `--brand-*`.
> Tenhle soubor hlídá *charakter a mantinely*, ne to, že identitu vymyslí nástroj.

## Esence značky

**BoHeMi = Body – Health – Mind.** Komunitní fitness studio na Vinohradech.
Vřelé, lidské, grounded, energické. Tělo jako škola — síla, zdraví, pravidelnost,
klid, odvaha pokračovat.

**Charakter (keywords):** čisté, energické, teplé, důvěryhodné, lidské, lehce
editorial. Blíž k „clean Swiss s teplem" než k „organic spa".

**NENÍ:** spa, wellness-luxus, ezoterika, „sekta", neonová gym-bro estetika,
korporát.

## Pattern (struktura landing page)

Hero-centric + social proof, konverze emocí přes komunitu.

1. **Hero** — věta „BoHeMi = Body, Health, Mind" + 1 obrázek z reálného studia +
   primární CTA „Rezervovat lekci" + sekundární „Zjistit, jak to funguje".
2. **3 pilíře** — Body / Health / Mind, krátce a konkrétně.
3. **Lekce** — přehled (kruhový, silový, vlastní váha, HIIT, jóga…).
4. **Komunita / proč my** — přátelské prostředí, individuální přístup, max 12 lidí.
5. **Pro koho** — dospělí, děti, firmy, senioři.
6. **Social proof** — reference / Multisport & benefity / lokalita.
7. **CTA + kontakt** — opakované „Rezervovat", mapa, doprava.

CTA „Rezervovat" je **vždy odkaz na `rezervace.bohemi.fit`**.

## Barvy (tokeny)

Teplá, grounded paleta s jedním energickým akcentem. Záměrně **mimo** spa-pastel.
Hodnoty převzaty z Claude Design exportu (export = zdroj pravdy). Plná sada tokenů
žije v `src/styles/global.css`; tady jsou klíčové z nich.

| Token | Hex | Použití |
|---|---|---|
| `--color-bg` | `#efe6d6` | písková — hlavní pozadí |
| `--color-surface` | `#fffdf7` | karty, panely |
| `--color-sand` | `#e8dcc6` | pruhy (marquee), sekce trenéři |
| `--color-mint` | `#e7efe8` | jemné zelené pozadí sekcí, hover |
| `--color-ink-dark` | `#20201c` | tmavé sekce (manifesto, footer) |
| `--color-ink` | `#211f1a` | hlavní text / nadpisy |
| `--color-ink-soft` | `#5f594c` | sekundární text |
| `--color-ink-muted` | `#7a7361` | terciární text, popisky |
| `--color-brand` | `#2f5a40` | lesní zelená — struktura, nadpisy, linky |
| `--color-brand-dark`| `#244833` | hover / ztmavení |
| `--color-accent` | `#c2693f` | terakota — **CTA, akcenty, energie** |
| `--color-gold` | `#be9c4f` | třetí akcent (Mind ve Venn) |
| `--color-cream` | `#f3ecdd` | text na tmavém / zeleném pozadí |
| `--color-border` | `#e7dcc6` | linky, oddělovače, karty |

Kontrast hlídej: text na pozadí min. **4.5:1** (WCAG AA).

**Zakázáno:** růžová/šalvějová/zlatá spa kombinace, fialovo-růžové AI gradienty,
čistá černá `#000` jako pozadí, neonové zářivé barvy.

## Typografie

Google Fonts, **jedna rodina** (dle exportu). Akcenty se řeší vahou a kurzívou,
ne druhým fontem — žádný serif.

- **Vše:** `Hanken Grotesk` (400–800) — charakterní humanistický grotesk,
  sportovní a čistý. Nadpisy 700/800, text 400/500, akcentová slova 500 *italic*.
- Scale (desktop): h1 ~clamp(44px,6.6vw,84px) / h2 ~clamp(30px,4vw,48px) /
  h3 ~1.45rem / body 1.0625–1.125rem / small 0.9rem. Line-height body ~1.55.

**Zakázáno:** elegantní serify (Cormorant, Playfair, EB Garamond, Newsreader) —
čtou se jako spa/svatba/ezoterika. Žádné script/handwriting fonty. Akcent =
kurzíva/váha téhož grotesku.

## Spacing & layout

- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px.
- Max šířka obsahu ~1140px, štědrý whitespace.
- Radius: 12–16px na kartách, 999px na pill tlačítkách.
- Breakpointy: 375 / 768 / 1024 / 1440.

## Komponenty

- **Primární tlačítko:** `--accent` pozadí, `--accent-ink` text, pill, hover
  ztmavení ~8 %, `cursor-pointer`, viditelný focus ring.
- **Sekundární:** outline `--brand`, transparentní pozadí.
- **Karta lekce:** `--surface`, jemný stín, foto + název + 1 věta + „Rezervovat".
- Ikony: **SVG (Lucide / Heroicons)**, ne emoji.

## Pohyb

Decentní. Přechody 150–300 ms, jemné hover stavy. Respektuj
`prefers-reduced-motion`. Žádné agresivní/rušivé animace.

## Pre-delivery checklist

- [ ] Barvy a fonty výhradně z tokenů (nic natvrdo)
- [ ] CTA „Rezervovat" míří na `rezervace.bohemi.fit`
- [ ] Slug stránky sedí se současným webem
- [ ] Jeden `<h1>`, `<title>` + `meta description`
- [ ] Kontrast textu ≥ 4.5:1, viditelný focus pro klávesnici
- [ ] `cursor-pointer` na všem klikatelném
- [ ] Ikony jako SVG, ne emoji
- [ ] Responzivní na 375 / 768 / 1024 / 1440
- [ ] `prefers-reduced-motion` respektováno
- [ ] Žádná spa-pastel / serif / AI-gradient stopa
