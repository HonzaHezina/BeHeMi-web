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

| Token | Hex | Použití |
|---|---|---|
| `--bg` | `#FBF8F3` | teplá bone — hlavní pozadí |
| `--surface` | `#FFFFFF` | karty, panely |
| `--ink` | `#1C1C1A` | hlavní text |
| `--ink-soft` | `#4A4A45` | sekundární text |
| `--brand` | `#15524A` | hluboká pinie/teal — struktura, nadpisy, linky („health", grounded) |
| `--brand-soft`| `#E3ECE8` | jemné pozadí sekcí, hover |
| `--accent` | `#EE6A45` | teplý korál — **CTA, akcenty, energie** |
| `--accent-ink`| `#FFFFFF` | text na akcentu |
| `--border` | `#E7E1D7` | linky, oddělovače |

Kontrast hlídej: text na pozadí min. **4.5:1** (WCAG AA).

**Zakázáno:** růžová/šalvějová/zlatá spa kombinace, fialovo-růžové AI gradienty,
čistá černá `#000` jako pozadí, neonové zářivé barvy.

## Typografie

Google Fonts, dvě rodiny. Charakterní grotesk na nadpisy, humanistický sans na text.

- **Nadpisy:** `Archivo` (700/800) — pevné, sportovní, ne nablýskané.
  *Alternativa:* `Space Grotesk`.
- **Text:** `Inter` (400/500/600) — čistý, výborně čitelný.
- Scale (desktop): h1 ~clamp(2.5rem,5vw,4rem) / h2 ~2rem / h3 ~1.375rem /
  body 1.0625rem / small 0.9rem. Line-height body ~1.6.

**Zakázáno:** elegantní serify (Cormorant, Playfair, EB Garamond) — čtou se jako
spa/svatba/ezoterika. Žádné script/handwriting fonty.

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
