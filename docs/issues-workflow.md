# Zpracování GitHub issues (fotky + obsah)

Fronta: kolega (i Honza) zakládá issues přes šablony (.github/ISSUE_TEMPLATE).
Zpracovává se dávkově v pracovním okně — lokálně, přes Claude Code.

Předpoklady (jednorázově): `gh auth login` · `npm i -D sharp` ·
v package.json script `"photos": "node scripts/prep-photos.mjs"`.

Rozdělení:
- štítek **obsah** → může řešit i GitHub Copilot agent (PR flow)
- štítek **fotky** → VŽDY lokálně přes tento postup (brána: resize + EXIF/GPS strip)

---

## Prompt pro Claude Code (zkopíruj v pracovním okně)

```
Zpracuj frontu foto-issues:

1. `gh issue list --label fotky --state open` — vypiš mi frontu.
2. Pro každé issue (`gh issue view <n>`):
   a) stáhni přiložené fotky z odkazů v issue do dočasné složky
   b) prožeň je: `npm run photos -- <dočasná_složka> <cíl>` — cíl urči z pole
      „Kam fotky patří" (lekce / treneri / deti / studio / galerie)
   c) z pole „Co je na fotkách" udělej alt texty
   d) zapoj fotky do příslušné stránky přes <Image /> z astro:assets
      (kde nevíš kam přesně, zeptej se — nezapojuj naslepo)
   e) OVĚŘ, že u issue se štítkem deti je zaškrtnutý souhlas — bez něj fotky
      NEZPRACOVÁVEJ a napiš mi to
3. Ukaž mi, co jsi zapojil a kam. Po mém OK: commit „Fotky z issue (closes #<n>)"
   a push.
4. Na konci: souhrn — zpracovaná issues, přeskočená (a proč), nové soubory.
```

Pozn.: HEIC z iPhonu skript neumí — když v issue budou .heic přílohy, řekni
autorovi, ať přepne iPhone na „Nejkompatibilnější" (Nastavení → Fotoaparát →
Formáty), nebo je zkonvertuj před zpracováním.
