# /skupinove-lekce/ — sekce pro jednotlivé lekce (návrh + prompt)

ROZHODNUTO Z DAT (redirect-map.md): typy lekcí NEMAJÍ vlastní stránky — každá je
bohatá sekce s kotvou na /skupinove-lekce/. Výjimky s vlastní stránkou: supermamky,
hula-hoop. Stránka /skupinove-lekce/ má 8 252 zobrazení a CTR 0,6 % — cíl je
z ní udělat silnou stránku, která tu spící poptávku proměňuje.

## Šablona sekce jedné lekce (každá stejně, ~120–180 slov)

**[Název lekce]**  (kotva #ascii-nazev)
- Hook — 1 věta, co si člověk odnese („Za 45 minut celé tělo, žádné čekání na stroje.")
- Jak lekce probíhá — 2–3 věty: struktura (rozehřátí → bloky → dojezd), co se dělá
- Pro koho — 1–2 věty vč. „zvládne i začátečník?" (škálování na úroveň)
- Prakticky — délka · intenzita (1–3 škála) · co s sebou
- CTA — „Rezervovat →" (https://studio.bohemi.fit/, ideálně rovnou filtr lekce)

TÓN: konkrétní, civilní, žádné nálady. Co se v sále DĚJE, ne jak se u toho člověk
CÍTÍ. Rozdíly mezi lekcemi musí být jasné — když si po přečtení dvou sekcí nejsem
jistý, čím se liší, je to špatně napsané.

## Ukázka — kruháč (vzor, podle kterého psát ostatní)

**Kruhový trénink** (#kruhac)
Za 45 minut projedeš celé tělo — stanoviště, intervaly, žádné čekání.
Lekce jede v kruhu: 8–10 stanovišť (vlastní váha, kettlebell, TRX…), na každém
pracuješ na čas, pak přesun. Trenér tě celou dobu vidí a opravuje techniku —
skupina je malá, nikdo se neschová a nikdo se neztratí.
Pro koho: pro každého, kdo se chce hýbat efektivně. Zátěž se škáluje — vedle
sebe cvičí začátečník i mazák, každý na svém.
45 min · intenzita ●●○ · ručník a pití
[Rezervovat →]

## Struktura celé stránky /skupinove-lekce/
1. Hero: H1 + 2 věty (malé skupiny, trenér opravuje, vyber si lekci) + kotvy-menu
   (pill odkazy na všechny lekce — rychlá navigace)
2. Rozvrh / odkaz na rezervace (viditelně nahoře — kdo ví, co chce, nemusí číst)
3. **Blok „Tvoje první lekce" (#prvni-lekce)** — odbourání strachu, psáno z reálných
   dotazů lidí. Obsah: přijď ~10 min předem · řekni trenérovi, že jsi poprvé ·
   všechno se škáluje na tvou úroveň · nikdo nesleduje, jestli stačíš · co s sebou
   (ručník, pití, boty do sálu) · jak to vypadá po lekci. Tón: věcný, uklidňující
   bez chlácholení. TOHLE JE KONVERZNÍ JÁDRO STRÁNKY — lidi nebrzdí cena, brzdí je
   strach z první návštěvy.
4. Sekce lekcí (šablona výše), pořadí: od nejnavštěvovanějších
5. Blok „Nevíš, kterou vybrat?" — 3 řádky: „Chceš všechno najednou → kruháč ·
   Chceš se zpotit → HIIT · Začínáš → vlastní váha" (doplnit dle reálné nabídky)
6. Odkaz na výjimku s vlastní stránkou: Supermamky →
   (Hula-hoop UŽ NEJEDE — žádná dlaždice, žádná sekce; /hula-hoop/ je 301 dle
   redirect-map.md)
7. CTA + zmínka jednorázového vstupu (nízký práh)

---

## Prompt pro Claude Code

```
Než cokoliv: přečti `CLAUDE.md`, `design-system/MASTER.md`, `docs/fraze-pool.md`
a tenhle soubor `docs/skupinove-lekce-sekce.md`.

Úkol: přestav /skupinove-lekce/ podle struktury výše — každá lekce = bohatá
sekce dle šablony, se stabilní kotvou (ASCII bez diakritiky, už zavedené kotvy
NEMĚŇ). Vzorová sekce = kruháč výše; ostatní piš stejným stylem a hloubkou.

ZDROJ SEZNAMU LEKCÍ: reálná aktuální nabídka — vytáhni ji z existujícího obsahu
webu (/lekce-a-sluzby/, rozvrh, staré texty). NEVYMÝŠLEJ lekce, které nejedou,
a NEVYNECH ty, co jedou. Vypiš mi nejdřív seznam lekcí, který jsi našel, +
u každé co o ní víš — POČKEJ NA MOJE POTVRZENÍ, teprve pak piš sekce.

Pro každou lekci, kde neznáš fakta (délka, intenzita, vybavení, struktura):
viditelný placeholder + otázka na mě. Hook a „jak probíhá" piš jen z toho, co
o lekci reálně víš — obecné vaty se vyvaruj.

Pravidla:
- Rozdíly mezi lekcemi musí být čitelné — žádné dvě sekce nesmí říkat totéž.
- Blok „Tvoje první lekce" (#prvni-lekce) postav dle bodu 3 struktury — věcný,
  konkrétní, žádné chlácholení. Z HP i dětské stránky na něj může vést odkaz
  „Jdeš poprvé? Přečti si, jak to probíhá →".
- Supermamky tu mají jen krátkou dlaždici s odkazem na /supermamky/ — plný text
  patří tam (žádná duplicita). Hula-hoop NIKDE nezmiňuj — služba skončila,
  stará URL je 301 (redirect-map.md).
- Zakázaná slova (nula): energie woo, signály těla, holistické, samoregulace,
  harmonie, transformace, vědomí. Z fraze-pool.md sem NIC — fráze žijí na HP
  a /program-8-tydnu/, tady mluví konkrétnost sama.
- SEO: title „Skupinové lekce Praha Vinohrady — kruhový trénink, HIIT a další
  | BoHeMi" (přesné typy dle reálné nabídky), meta description s názvy lekcí,
  jeden H1. Tahle stránka má 8 252 zobrazení a mizerné CTR — title a description
  jsou tu důležitější než kde jinde.
- Kotvy: scroll-margin-top kvůli sticky headeru; kotvy-menu nahoře na všechny
  sekce.
- CTA Rezervovat → https://studio.bohemi.fit/ (pokud booking umí deep-link
  na konkrétní lekci, zeptej se mě na formát URL).
- Po dokončení: audit odkazů — všechny zmínky typů lekcí kdekoli na webu (HP,
  ceník, program, děti) vedou na /skupinove-lekce/#kotva. Spusť check-links.

Na konci: seznam sekcí + kotev, placeholdery čekající na moje data, a potvrzení
nulové duplicity se stránkami supermamky/hula-hoop.
```

---

## Čeká na Honzu
- Umí booking deep-link na konkrétní lekci? (formát URL)
- Pořadí lekcí na stránce (od nejnavštěvovanějších — ty víš, které to jsou)

## Hotovo (20. 7. 2026)
- Seznam lekcí potvrzen (co jede / nejede).
- Fakta k lekcím doplněna do `src/pages/skupinove-lekce.astro`: kruhový trénink
  a silový trénink mají strukturu 10 min warm up → hlavní trénink → 10 min
  protažení (silový navíc finisher; vybavení: činky, kettlebelly, osy,
  slambally). Silový trénink potvrzen jako nevhodný pro úplné začátečníky.
  Power Zone má potvrzenou blokovou strukturu (rozehřátí/aktivace → technika
  a síla → kondiční kruh → protažení) a je škálovatelný i pro začátečníky.
  Enduro je příprava na závody typu BCross Run (Hyrox se NEJMENUJE — je to
  ochranná známka), stejná struktura 10/35–40/10 min; jednorázový vstup je
  199 Kč stejně jako ostatní lekce (žádná zvláštní cena, opraveno i v
  `src/data/home.ts`/`home.en.ts`, pole `note` u ceníku).
- Intenzita ●●● u Power Zone a Enduro potvrzena jako odhad, ponechána beze
  změny (obě jsou vysoce intenzivní hybridní formáty).
