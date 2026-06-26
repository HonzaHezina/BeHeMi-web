# Pokyny pro GitHub Copilot — BoHeMi web

Tento soubor čte Copilot ve VS Code automaticky. Plná pravidla jsou v
`/CLAUDE.md`, design tokeny v `/design-system/MASTER.md`. **Při návrhu UI vždy
ber barvy, fonty a spacing z `design-system/MASTER.md`** — nikdy je nehardcoduj.

## Co tohle repo je
Statický prezentační web studia BoHeMi fitness. Stack: **Astro + Tailwind**.
Prezentační vrstva **vedle WordPressu**, ne náhrada. Rezervace, login, členství,
platby = WordPress na `rezervace.bohemi.fit`, sem nepatří.

Značka: **BoHeMi = Body – Health – Mind.** Komunitní, lidské, grounded.
Ne spa, ne ezoterika, ne luxusní wellness, ne „sekta".

## Tvrdá pravidla
1. **Statika only.** Žádný formulář, který odesílá rezervaci, platbu nebo login.
2. **Booking = odkaz ven** na `https://rezervace.bohemi.fit/`. Nikdy iframe, nikdy
   vlastní rezervační formulář.
3. **URL/slugy se nemění** — musí sedět se současným webem (viz `/CLAUDE.md`).
4. **Barvy a fonty jen z `design-system/MASTER.md`.** Chybí token → zeptej se.
5. **SEO basics:** jeden `<h1>`, `<title>` + `meta description`, sémantické
   nadpisy, alt texty.
6. Jazyk webu = čeština.

## Anti-cíle
Žádná spa-pastel paleta (růžová/šalvějová/zlatá), žádné elegantní serify, žádné
AI fialové gradienty, žádné vedení webu externí knihou/autoritou, žádná sekce
„nejsme sekta". Hero = Body–Health–Mind + komunita.

## Stav & konvence (drž konzistenci)
- **Postaveno:** `/`, `/proc-bohemi/`, `/cenik/`, `/kontakt/`, `/lekce-a-sluzby/`.
  Menu: Domů · Proč BoHeMi · Lekce a služby · Ceník · Kontakt · Rezervovat.
- **Font:** jen **Hanken Grotesk** (bez serifu) — akcenty kurzívou + vahou.
- **Barvy textu:** terakotový/zlatý **text** ber přes `accent-text` / `gold-dark`
  (tmavší, WCAG AA); `accent`/`gold` jen na výplně/tečky. Drž kontrast ≥ 4.5:1.
- **Kontakt:** přímé akce `mailto:`/`tel:`, žádný `<form>`.
- **Data** sdílená v `src/data/home.ts`, stránky skládají `src/components/`.
- **Tailwind v4:** reset patří do `@layer base`; zlomky spacing (4.5/5.5/6.5/7.5)
  nejdou — piš `[18px]/[22px]/[26px]/[30px]`; po nové stránce restartuj dev server.
- **Deploy:** Coolify statika — `dist/`, „Is it a static site?" ON, SPA OFF.
