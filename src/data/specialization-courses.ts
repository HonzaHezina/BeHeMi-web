// Krátké specializační kurzy vedle Akademie Cirk La Putyka (viz
// krouzky-pro-deti.astro) — uzavřené bloky (typicky 4 lekce) zaměřené na
// jednu dovednost, ne dlouhodobý semestrální kroužek. Neplést dohromady:
// Akademie = celý cirkus po dobu semestru, tyhle kurzy = jedna dovednost
// na pár týdnů, otevřené i lidem mimo Akademii a i dospělým.
//
// id = stabilní kotva /kurzy/#<id>, ASCII, nikdy neměnit.
//
// Ceny (rozhodnuto Honzou 31. 8. 2026): "pracovní ceny" z prvního návrhu
// (1 390/1 490/1 190 Kč...) NEJSOU potvrzené k publikaci — price zůstává
// undefined u všech kurzů, dokud Honza nedodá závaznou cenu. Karta pak
// místo částky ukazuje "Cena se upřesňuje" a CTA vede na /kontakt/ (žádný
// WP membership level pro tyhle kurzy zatím neexistuje).
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
    status: 'active',
    d: 'Pro úplné začátečníky. Začneš s jedním míčkem a přesným obloukem, přidáš druhý a rytmus a do konce kurzu uděláš první souvislé pokusy o kaskádu se třemi míčky.',
    teaser: 'Od jednoho míčku k první kaskádě se třemi — čtyři lekce pro úplné začátečníky.',
    skills: [
      'Práce s jedním míčkem a přesný oblouk',
      'Přehazování mezi rukama',
      'Dva míčky a rytmus',
      'První pokusy o kaskádu se třemi míčky',
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
export const upcomingCourses: { title: string; d: string }[] = [
  { title: 'Kalistenika II — síla pro cirkus', d: 'Shyby, L-sit průprava, stojková síla a přechody mezi visem, přítahy a vzpory.' },
  { title: 'Žonglování II — tři míčky a dál', d: 'Stabilizace kaskády, změny výšky a rytmu, žonglování při pohybu.' },
  { title: 'Stojky II — bez opory', d: 'Odlepení od stěny, práce prstů, hledání těžiště, první samostatné výdrže.' },
];
