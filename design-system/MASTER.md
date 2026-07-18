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

CTA „Rezervovat" je **vždy odkaz na `studio.bohemi.fit/`**.

## Barvy (tokeny)

**Systém WARM-DARK (varianta B):** zdroj pravdy = logo + plakáty (black / white /
red). Černě ukotvené klíčové bloky (hero, manifest, footer, CTA pásy), obsahové
sekce na **teplém světlém** pozadí, **červená = energie** napříč. Pozadí je teplá
near-black (`#14110e`), NE čisté `#000` — drží lidskost. Plná sada tokenů žije
v `src/styles/global.css`; tady jsou klíčové z nich.

> ⚠️ **Červená = PLACEHOLDER `#e2231a`** — čeká na přesný hex z brand manuálu.
> Žije na `--color-accent` (živá, výplně) a `--color-accent-text` (hlubší, text + CTA).
> **Amber pro Mind = TENTATIVE** — triáda Body/Health/Mind se finalizuje (krok 3).

| Token | Hex | Použití |
|---|---|---|
| `--color-bg` | `#f5efe6` | teplá off-white — hlavní pozadí (světlá zóna) |
| `--color-surface` | `#fcf8f2` | karty, panely |
| `--color-sand` | `#ede3d2` | teplý band, jemné pruhy |
| `--color-mint` | `#f1e8db` | jemné teplé tint pozadí sekcí, hover |
| `--color-ink-dark` | `#14110e` | teplá near-black — tmavé sekce (hero, manifest, footer) |
| `--color-surface-dark` | `#1e1a15` | karty/panely na tmavém |
| `--color-ink` | `#16130f` | hlavní text / nadpisy (na světlém) |
| `--color-ink-soft` | `#4a4337` | sekundární text |
| `--color-ink-muted` | `#56503f` | terciární text, popisky |
| `--color-brand` | `#1c1812` | near-black — struktura, nadpisy, linky, tlačítka |
| `--color-brand-dark`| `#000000` | hover / ztmavení struktury |
| `--color-accent` | `#e2231a` | **červená** (PLACEHOLDER) — výplně, tečky, dělící linky, aktivní stavy |
| `--color-accent-text` | `#b71c13` | hlubší červená pro **text** + bg CTA s cream textem — WCAG AA |
| `--color-gold` | `#e0a43a` | třetí akcent — amber (Mind), TENTATIVE |
| `--color-cream` | `#f5f1ea` | text na tmavém pozadí |
| `--color-border` | `#e7dcc8` | linky, oddělovače, karty |

Kontrast hlídej: text na pozadí min. **4.5:1** (WCAG AA). Červená **nikdy** jako
barva běžného (body) textu — jen akcent/CTA/výplň/linky. Bílý (cream) text na
červeném tlačítku ber z `--color-accent-text` (AA projde), ne z živé `--color-accent`.

**Výjimka (rozhodnuto):** akcentové slovo v **display nadpisu** (h1/h2) smí být
červené jako echo loga — i na tmavém pozadí, kde projde jen jako *velký* text
(AA-large ≥ 3:1). Na světlém ber `--color-accent-text`, na tmavém `--color-accent`.
Netýká se to odstavců, popisků ani odkazů v textu — tam červená jako text ne.

**Zakázáno:** růžová/šalvějová/zlatá spa kombinace, fialovo-růžové AI gradienty,
**čistá černá `#000` jako plošné pozadí** (používej teplou near-black `#14110e`),
neonové zářivé barvy, grunge/distressed textury (to je hardcore-gym plakát, ne web).

## Typografie

Google Fonts, **jedna rodina** (dle exportu). Akcenty se řeší **jen barvou**
(`--color-accent-text` / `--color-accent`), ne druhým fontem, ne kurzívou.

- **Vše:** `Hanken Grotesk` (400–800) — charakterní humanistický grotesk,
  sportovní a čistý. Nadpisy 700/800, text 400/500, akcentová slova stejná
  váha jako okolní text, jen jinou barvou.
- Scale (desktop): h1 ~clamp(44px,6.6vw,84px) / h2 ~clamp(30px,4vw,48px) /
  h3 ~1.45rem / body 1.0625–1.125rem / small 0.9rem. Line-height body ~1.55.

**Zakázáno:** elegantní serify (Cormorant, Playfair, EB Garamond, Newsreader) —
čtou se jako spa/svatba/ezoterika. Žádné script/handwriting fonty. **Žádná
kurzíva** (rozhodnuto 7/2026, zpětná vazba copywriterky — mixování řezů fontu
působilo návodně/old-school). Výjimka: kurzíva zůstává u skutečných citací
(`<blockquote>` s citátem člověka) — tam je typograficky na místě.

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
- **Klikací box:** má-li karta/dlaždice cíl (stránku/kotvu), kliká se na CELÝ
  box — žádný nápis „Detail →" uvnitř (rozhodnuto 7/2026). Hover affordance
  (zdvih/stín/bg) patří **jen klikacím boxům**; neklikací `<div>` je bez hoveru.
- Ikony: **SVG (Lucide / Heroicons)**, ne emoji.

## Pohyb

Decentní. Přechody 150–300 ms, jemné hover stavy. Respektuj
`prefers-reduced-motion`. Žádné agresivní/rušivé animace.

## Pre-delivery checklist

- [ ] Barvy a fonty výhradně z tokenů (nic natvrdo)
- [ ] CTA „Rezervovat" míří na `studio.bohemi.fit/`
- [ ] Slug stránky sedí se současným webem
- [ ] Jeden `<h1>`, `<title>` + `meta description`
- [ ] Kontrast textu ≥ 4.5:1, viditelný focus pro klávesnici
- [ ] `cursor-pointer` na všem klikatelném
- [ ] Hover zdvih/stín jen na klikacích boxech; box s cílem klikací celý, bez „Detail →"
- [ ] Ikony jako SVG, ne emoji
- [ ] Responzivní na 375 / 768 / 1024 / 1440
- [ ] `prefers-reduced-motion` respektováno
- [ ] Žádná spa-pastel / serif / AI-gradient stopa
- [ ] Žádná kurzíva (kromě skutečných citací) — akcent jen barvou
- [ ] Copy nezní jako AI (žádné „ne X, ale Y", žádné vatové trojice, žádné „zní ti to povědomě?")
