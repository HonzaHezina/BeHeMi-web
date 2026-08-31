// Krátké specializační kurzy vedle Akademie Cirk La Putyka (viz
// krouzky-pro-deti.astro) — uzavřené bloky (typicky 4 lekce) zaměřené na
// jednu dovednost, ne dlouhodobý semestrální kroužek. Neplést dohromady:
// Akademie = celý cirkus po dobu semestru, tyhle kurzy = jedna dovednost
// na pár týdnů, otevřené i lidem mimo Akademii a i dospělým.
//
// id = stabilní kotva /kurzy/#<id>, ASCII, nikdy neměnit.
//
// Ceny (rozhodnuto Honzou 31. 8. 2026): 1 290 Kč / 4 lekce, JEDNOTNĚ napříč
// všemi třemi MVP kurzy — bez rozdílu podle disciplíny, dokud pro to nebude
// konkrétní důvod (jiné nároky na vybavení/přípravu lektora). Vychází to na
// ~322,5 Kč/lekci, doloženě uprostřed zjištěného tržního pásma 300–350 Kč
// (ne odhad z rukávu) a pořád citelně pod Programem 8 týdnů (~494 Kč/trénink)
// — cenová hierarchie nabídky tak dává smysl, vlajkový program zůstává
// nejdražší na lekci. Zvažovaná alternativa 1 490 Kč zamítnuta — sedí nad
// horní hranicí zjištěného pásma a signalizuje jinou pozici („specializované,
// ne levný přívazek"), kterou Honza vědomě nechtěl; blíž to BoHeMi tónu
// (přístupné, ne prémiové). Odpovídající dlaždice jsou i v `cenik.astro`
// (sekce „Krátké kurzy") — drž v synku, pokud se cena změní. Žádný WP
// membership level pro tyhle kurzy zatím neexistuje, `bookingUrl` proto
// zůstává `undefined` → CTA na `/kurzy/` pořád vede na `/kontakt/`.
// Publiku (31. 8. 2026, Honza): do budoucna se některé kurzy pravděpodobně
// rozdělí na samostatné dětské a dospělé varianty (jiná úroveň/obsah pro
// každou skupinu), ale NENÍ to podmínka — tam, kde jedna náplň sedí oběma
// skupinám (dnešní 3 MVP kurzy), zůstávají sloučené v jednom `audience:
// ['deti', 'dospeli']` záznamu. Model to už podporuje beze změny: rozdělený
// kurz = dva samostatné objekty se stejným `category`, jinými `id`
// (`kalistenika-1-deti`/`kalistenika-1-dospeli` apod.), každý s
// `audience: ['deti']` nebo `['dospeli']` a vlastním obsahem/`skills`.
export type CourseAudience = 'deti' | 'dospeli';
export type CourseStatus = 'active' | 'soon';

export type SpecializationCourse = {
  id: string;
  title: string;
  category: string;
  level: 1 | 2;
  audience: CourseAudience[];
  duration: string;
  price?: string;
  status: CourseStatus;
  d: string;
  /** Krátká věta pro klikací dlaždici na rozcestníku (/lekce-a-sluzby/,
   * /en/classes-and-services/) — MUSÍ být jiný text než `d` (stejné pravidlo
   * jako kidsActivities[].d vs. circusCourses[].d: rozcestník = teaser,
   * detail = plný text). `d` zůstává jen pro bohatou kartu na /kurzy/. */
  teaser: string;
  skills: string[];
  nextCourse?: string;
  bookingUrl?: string;
  media: string;
};

export const specializationCourses: SpecializationCourse[] = [
  {
    id: 'kalistenika-1',
    title: 'Kalistenika I – Síla vlastního těla',
    category: 'kalistenika',
    level: 1,
    audience: ['deti', 'dospeli'],
    duration: '4 × 60 min',
    price: '1 290 Kč',
    status: 'active',
    d: 'Základy práce s vlastním tělem — správný vis, aktivní ramena, lopatkové přítahy, klik i jeho lehčí varianty, zpevnění středu těla. Lektor u každého cviku hlídá provedení, tempo a zátěž si volíš podle sebe.',
    teaser: 'Vis, ramena, klik a zpevnění středu — základy práce s vlastním tělem ve čtyřech lekcích.',
    skills: [
      'Správný vis a aktivní ramena',
      'Lopatkové přítahy a příprava na shyb',
      'Klik a jeho varianty podle úrovně',
      'Zpevnění středu těla (hollow body)',
    ],
    nextCourse: 'Kalistenika II — síla pro cirkus',
    media: 'media-sand',
  },
  {
    id: 'zonglovani-1',
    title: 'Žonglování I – Od prvního míčku ke třem',
    category: 'zonglovani',
    level: 1,
    audience: ['deti', 'dospeli'],
    duration: '4 × 60 min',
    price: '1 290 Kč',
    status: 'active',
    d: 'Pro úplné začátečníky. Začneš s jedním míčkem a přesným obloukem, přes druhý míček a rytmus dojdeš až ke kaskádě se třemi míčky, kterou na konci kurzu zvládneš.',
    teaser: 'Od jednoho míčku ke kaskádě se třemi — čtyři lekce pro úplné začátečníky.',
    skills: [
      'Práce s jedním míčkem a přesný oblouk',
      'Přehazování mezi rukama',
      'Dva míčky a rytmus',
      'Kaskáda se třemi míčky',
    ],
    nextCourse: 'Žonglování II — tři míčky a dál',
    media: 'media-clay',
  },
  {
    id: 'stojky-1',
    title: 'Stojky I – Vzhůru nohama',
    category: 'stojky',
    level: 1,
    audience: ['deti', 'dospeli'],
    duration: '4 × 60 min',
    price: '1 290 Kč',
    status: 'active',
    d: 'Po čtyřech lekcích budeš znát techniku stojky a mít bezpečný základ pro další trénink — jak přenést váhu na ruce, jak pracovat s rameny a jak bezpečně vykopnout i sestoupit. Samotná stojka bez opory přijde s časem.',
    teaser: 'Bezpečná technika stojky — od přenášení váhy na ruce až po výkop a sestup.',
    skills: [
      'Přenášení váhy na ruce',
      'Práce ramen a základní opory',
      'Stojka u stěny a stojka L',
      'Bezpečný výkop a sestup',
    ],
    nextCourse: 'Stojky II — bez opory',
    media: 'media-green',
  },
];

// Párová akrobacie (base/flyer/spotter zvedačky) VYNECHÁNA (Honza,
// 31. 8. 2026) — nejistá vhodnost prostor (výška stropu v sálech BoHeMi
// není potvrzená jako dostatečná pro zvedačky). Nepřidávat zpět bez
// ověření prostorových možností — ani do aktivních kurzů, ani do
// upcomingCourses výhledu níž.
//
// Přímé navazující kurzy (úroveň II) — zatím jen výhled, bez karty, ceny
// nebo kotvy. Vzdálenější obory (lidské pyramidy, závěsná akrobacie,
// balanc — viz interní zadání) se na web zatím nedávají vůbec.
//
// Kalistenika (rozhodnuto Honzou 31. 8. 2026): jednotlivé navazující kurzy
// jdou první, případný velký průběžný program (obdoba Akademie Cirk La
// Putyka / cirkusové školy — jedna ucelená disciplína) se zatím nezveřejňuje
// ani nenaznačuje na webu — nejdřív se ověří zájem přes tyhle kratší kurzy.
// Platí jen pro kalisteniku (má na to potenciál jako vlastní obor), ne pro
// žonglování/stojky — ty zůstávají jen sekvence I→II bez vyhlídky na velký
// program. Planche (nejpokročilejší dovednost, „král kalisteniky") se do
// veřejného výhledu zatím nedává vůbec — je moc vzdálená, zůstává jen jako
// interní poznámka pro budoucí uvažování.
export const upcomingCourses: { title: string; d: string }[] = [
  { title: 'Kalistenika II — síla pro cirkus', d: 'Shyby, negativní shyby, L-sit průprava a přechody mezi visem, přítahy a vzpory.' },
  { title: 'Muscle-up — cesta k prvnímu přetahu', d: 'Nejžádanější jednotlivá dovednost v kalistenice — navazuje na shyb, spojuje tah a tlak do jednoho plynulého pohybu.' },
  { title: 'Přední váha (Front lever)', d: 'Pokročilá tahová dovednost — držet tělo vodorovně ve visu vyžaduje sílu i kontrolu středu.' },
  { title: 'Vlajka (Human Flag)', d: 'Jeden z nejvíc ikonických prvků kalisteniky — síla, rovnováha a stabilizace celého těla ve vodorovné poloze.' },
  { title: 'Pistol squat — síla na jedné noze', d: 'Jednonohý dřep od základů: rovnováha, mobilita kotníku a síla nohou bez opory.' },
  { title: 'Stojky II — bez opory', d: 'Odlepení od stěny, práce prstů, hledání těžiště, první samostatné výdrže.' },
  { title: 'Ruční stojný tlak (Handstand push-up)', d: 'Tlaková síla vzhůru nohama — navazuje na samostatnou stojku ze Stojek II.' },
  { title: 'Žonglování II — tři míčky a dál', d: 'Stabilizace kaskády, změny výšky a rytmu, žonglování při pohybu.' },
];
