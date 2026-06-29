// Obsah domovské stránky — vytaženo z Claude Design exportu
// (renderVals() v "Bohemi Web.dc.html"). Zdroj pravdy pro texty.

export const marquee = [
  'Tělo', 'Dech', 'Spánek', 'Voda', 'Jídlo', 'Mysl', 'Vztahy', 'Pohyb', 'Energie', 'Klid',
];

export const triad = [
  // Triáda (krok 3): Body=červená, Health=neutrál (near-black), Mind=amber
  { k: 'Body', cs: 'Tělo', dot: 'bg-accent', d: 'Pohyb, síla a funkční tělo, které ti slouží v běžném životě — ne jen v zrcadle.' },
  { k: 'Health', cs: 'Zdraví', dot: 'bg-ink', d: 'Prevence, vitalita a rovnováha. Spánek, dech, voda, jídlo a návyky, co vydrží.' },
  { k: 'Mind', cs: 'Mysl', dot: 'bg-gold', d: 'Klid, motivace a sebevědomí. Hlava napojená na tělo, ne odtržená od něj.' },
];

export const approach = [
  { n: '01', t: 'Začínáme pochopením', d: 'Nic ti netvrdíme jako pravdu. Dáváme návrhy, které si ověříš na vlastní energii — co ti sedne, zůstane.' },
  { n: '02', t: 'Tělo je nástroj, ne cíl', d: 'Tělo umí spravovat samo sebe líp, než čekáš. Neučíme tě ho přemoct, ale rozumět mu a nepřekážet mu.' },
  { n: '03', t: 'Pozoruj signály těla', d: 'Únava, napětí nebo mělký spánek jsou zprávy, které se vyplatí číst. Učíme tě jim rozumět a odpovídat pohybem, regenerací a rytmem dne. Zdravotní potíže patří k lékaři — my stavíme návyky kolem.' },
  { n: '04', t: 'Návyky místo diet a slibů', d: 'Zdraví se nedělá nárazem, ale rytmem. Malé kroky, co se opakují každý den — návyk na celý život, ne zázrak na měsíc.' },
];

export const audiences = [
  { fig: '01', tagline: 'Jednotlivci', label: 'Pro tebe', d: 'Chceš se hýbat, mít energii a líp rozumět svému tělu.', items: ['Cesta — 8týdenní program', 'Skupinové lekce', 'Osobní tréninky a Open gym', 'Regenerace a fotobiomodulace'], anchor: '#pro-tebe' },
  { fig: '02', tagline: 'Děti a maminky', label: 'Pro děti a rodiny', d: 'Pohyb pro nejmenší i pro rodiče, co nechtějí přestat.', items: ['Cirkusová školička', 'Pohybové kroužky a akrobacie', 'Supermamky — i s dětmi vedle', 'Příměstské tábory'], anchor: '#pro-deti' },
  { fig: '03', tagline: 'Týmy a organizace', label: 'Pro firmy', d: 'Zdravější a sehranější tým bez vlastní tělocvičny.', items: ['FitTeams — tréninky pro týmy', 'Firemní wellbeing programy', 'Pronájem sálů na akce'], anchor: '#pro-firmy' },
];

export const paths = [
  { tag: '8 týdnů', t: 'Cesta', d: 'Vlajkový program. Osm týdnů, ne permanentka.' },
  { tag: 'měsíčně', t: 'Měsíční program', d: 'Pravidelný pohyb se strukturou a komunitou.' },
  { tag: '1:1', t: 'Osobní restart', d: 'Individuální vedení, když potřebuješ začít znovu.' },
  { tag: 'skupina', t: 'Maminky', d: 'Pohyb pro maminky — klidně i s dětmi vedle.' },
  { tag: 'skupina', t: 'Chlapi 40+', d: 'Síla, záda a energie. Bez soutěžení, bez ega.' },
  { tag: 'cyklus', t: 'Zdravá záda · síla · energie', d: 'Tematické cykly zaměřené na konkrétní cíl.' },
];

export const classes = [
  { t: 'Kruhové tréninky', d: 'Naše srdcovka. Funkční trénink v kruhu, pro každou úroveň.', img: 'kruhový trénink', media: 'media-green', bhm: 'Tělo · dokončování · komunita' },
  { t: 'Silové tréninky', d: 'Práce s vlastní vahou i činkami pod vedením trenéra.', img: 'silový trénink', media: 'media-forest', bhm: 'Tělo · síla · trpělivost' },
  { t: 'HIIT', d: 'Krátké intenzivní intervaly, když máš málo času.', img: 'HIIT lekce', media: 'media-clay', bhm: 'Tělo · energie · odolnost' },
  { t: 'Supermamky', d: 'Trénink pro maminky — klidně i s dětmi vedle.', img: 'supermamky', media: 'media-sand', bhm: 'Tělo · rodina · komunita' },
  { t: 'Vlastní váha', d: 'Ovládni svoje tělo bez nářadí, kdekoliv.', img: 'vlastní váha', media: 'media-rose', bhm: 'Tělo · kontrola · pozornost' },
];

export const individualServices = [
  { t: 'Osobní tréninky', d: 'Individuální vedení šité na tvoje cíle a tempo.' },
  { t: 'Open gym', d: 'Privátní sál 100 m² jen pro tebe nebo malou skupinu.' },
  { t: 'Fotobiomodulace', d: 'Regenerace a podpora hojení světelnou terapií.' },
];

export const kidsActivities = [
  { t: 'Cirkusová školička', d: 'Pro nejmenší — základní pohybové dovednosti hravou formou.', img: 'cirkusová školička', media: 'media-sand' },
  { t: 'Základy cirkusu', d: 'Gymnastika a akrobacie pod vedením akrobatů La Putyka.', img: 'akrobacie', media: 'media-clay' },
  { t: 'Pohybové kroužky', d: 'Pozemní i závěsná akrobacie a žonglování.', img: 'kroužky pro děti', media: 'media-green' },
];

export const firmyServices = [
  { t: 'FitTeams', d: 'Kruhové a silové tréninky navržené pro firemní týmy.' },
  { t: 'Firemní wellbeing', d: 'Pravidelné programy pro zdraví a energii zaměstnanců.' },
  { t: 'Pronájem sálů', d: 'Sály pro vlastní akce, teambuilding nebo workshopy.' },
];

export const lpHighlights = [
  '2× pohyb týdně + 1× krátký edukační blok',
  'Health tracker a vstupní i výstupní měření',
  'Malá uzavřená skupina 10–20 lidí',
  'Jednoduché návyky: spánek, dech, voda, pohyb, jídlo',
];

export const healthTracker = [
  { area: 'Tělo', q: 'Hýbal/a jsem se dnes alespoň 20–30 minut?' },
  { area: 'Dech', q: 'Věnoval/a jsem 3 minuty klidnému dýchání?' },
  { area: 'Jídlo', q: 'Jedl/a jsem tak, že mám po jídle energii?' },
  { area: 'Voda', q: 'Pil/a jsem přiměřeně během dne?' },
  { area: 'Spánek', q: 'Připravil/a jsem večer tělo na spánek?' },
  { area: 'Mind', q: 'Zastavil/a jsem se aspoň na chvíli a vnímal/a sebe?' },
  { area: 'Vztahy', q: 'Měl/a jsem dnes jeden vědomý pozitivní kontakt s druhým?' },
];

// TODO(Honza): doplnit zbylé trenéry/tým. Rozhodnuto: tým je VÍC než dva lidi,
// ale reálná jména/role/bio zatím nemám. Placeholder sloty níž jsou ZÁMĚRNĚ
// zakomentované, ať se na web nepublikují vymyšlené karty — odkomentuj a vyplň,
// až dodáš skutečná data (jméno, role, příp. krátké bio + foto do media slotu).
// Media token vyber z .media-* v global.css (green/clay/sand/forest/rose).
export const trainers = [
  { name: 'Klára Měchurová', role: 'Trenérka · funkční trénink', media: 'media-green' },
  { name: 'Jan Hezina', role: 'AI a Mind · drží to celé pohromadě', media: 'media-clay' },
  // { name: 'TODO — jméno', role: 'TODO — role', media: 'media-sand' },
  // { name: 'TODO — jméno', role: 'TODO — role', media: 'media-forest' },
];

export const pricing = [
  { t: 'Jednorázový vstup', d: 'Když přijdeš jen občas', price: '290 Kč', per: '/ lekce', featured: false, badge: '', note: '', feat: ['Platíš za každou lekci zvlášť', 'Žádná sleva na služby', 'Nejdražší varianta za lekci'] },
  { t: 'Členství', d: 'Když je pohyb součást života', price: '1 290 Kč', per: '/ měsíc', featured: true, badge: 'Nejvýhodnější', note: 'Při 3 lekcích týdně vyjde lekce na ~99 Kč.', feat: ['Neomezené skupinové lekce', 'Lekce už od ~99 Kč', 'Sleva 30 % na osobní tréninky', 'Komunita a akce v ceně'] },
  { t: 'Cesta', d: 'Když chceš cestu, ne jen lekce', price: '3 900 Kč', per: '/ 8 týdnů', featured: false, badge: 'Vlajkový program', note: '', feat: ['2× pohyb + 1× edukace týdně', 'Health tracker a měření', 'Uzavřená skupina 10–20 lidí', 'Vedení trenérem celých 8 týdnů'] },
];

// Hlavní navigace. Kotvy míří na sekce homepage formou "/#…", ať fungují
// i z podstránek. Slugy podstránek ověřit proti reálné sitemap (CLAUDE.md).
export const nav = [
  { label: 'Domů', href: '/' },
  { label: 'Proč BoHeMi', href: '/proc-bohemi/' },
  { label: 'Lekce a služby', href: '/lekce-a-sluzby/' },
  { label: 'Ceník', href: '/cenik/' },
  { label: 'Kontakt', href: '/kontakt/' },
];

export const navMenu = [
  { num: '01', label: 'Pro tebe', desc: 'Programy, lekce, osobní tréninky', href: '/lekce-a-sluzby/#pro-tebe' },
  { num: '02', label: 'Pro děti a rodiny', desc: 'Cirkus, kroužky, Supermamky', href: '/lekce-a-sluzby/#pro-deti' },
  { num: '03', label: 'Pro firmy', desc: 'FitTeams, wellbeing, pronájem sálů', href: '/lekce-a-sluzby/#pro-firmy' },
];

export const RESERVE_URL = 'https://rezervace.bohemi.fit/';
