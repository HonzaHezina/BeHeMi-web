// Obsah domovské stránky — vytaženo z Claude Design exportu
// (renderVals() v "Bohemi Web.dc.html"). Zdroj pravdy pro texty.

export const marquee = [
  'Kruháče', 'Vlastní váha', 'Funkční pohyb', 'Síla', 'Kondice', 'Záda', 'Mobilita', 'Spánek', 'Režim', 'Výdrž', 'Technika', 'Pravidelnost',
];

export const triad = [
  // Triáda (krok 3): Body=červená, Health=neutrál (near-black), Mind=amber
  { k: 'Body', cs: 'Tělo', dot: 'bg-accent', d: 'Pohyb, síla, technika a regenerace. Tělo, které ti slouží v práci, sportu i běžném životě — ne jen v zrcadle.' },
  { k: 'Health', cs: 'Zdraví', dot: 'bg-ink', d: 'Režim, který se dá udržet: spánek, jídlo, voda, pohyb a pravidelnost. Bez extrémů, bez složitých teorií.' },
  { k: 'Mind', cs: 'Mysl', dot: 'bg-gold', d: 'Hlava se často srovná až ve chvíli, kdy začneš pravidelně něco dělat, dokončovat a vracet se k tomu i po pauze. Méně chaosu, víc energie.' },
];

// href = karta je klikací a vede na nejkonkrétnější existující cíl zmíněné
// služby. Bez href zůstává neklikací (obecná situace bez vlastní stránky).
export const approach: { n: string; t: string; d: string; href?: string }[] = [
  { n: '01', t: 'Chci začít znovu cvičit', d: 'Bez přepáleného startu. Postupně, pravidelně a s trenérem, který tě opraví a nezapomene na tebe.' },
  { n: '02', t: 'Chci zpevnit tělo a zlepšit kondici', d: 'Kruhové a silové tréninky v malé skupině. Každý cvičí podle svých možností, ale poctivě.' },
  { n: '03', t: 'Nechci chodit do anonymní posilovny', d: 'Nemusíš řešit stroje ani plán sám/sama. Přijdeš na lekci a trenér tě provede tréninkem.' },
  { n: '04', t: 'Bolí mě záda nebo jsem ztuhlý/á', d: 'Pomůžeme ti rozhýbat tělo, zlepšit techniku a postupně vybudovat sílu pro běžný život.' },
  { n: '05', t: 'Chci mít víc energie a lepší režim', d: 'Pravidelný pohyb, jednoduché návyky a tréninky, které se dají dlouhodobě vydržet.' },
  { n: '06', t: 'Chci cvičit i jako máma', d: 'Supermamky jsou tréninky, kam můžeš přijít i s dítětem. Cvičení se přizpůsobí realitě rodičovství.', href: '/supermamky/' },
  { n: '07', t: 'Hledám pohyb pro děti', d: 'Cirkusová školička, akrobacie a pohybové kroužky pod vedením zkušených lektorů. Pohyb hravou formou.', href: '/krouzky-pro-deti/' },
  { n: '08', t: 'Chci pohybový program pro tým', d: 'FitTeams — vedené kruhové tréninky navržené přímo pro firemní skupiny. Bez vlastní tělocvičny.', href: '/lekce-a-sluzby/#pro-firmy' },
];

export const audiences = [
  { fig: '01', tagline: 'Jednotlivci', label: 'Pro tebe', d: 'Chceš se hýbat, mít energii a líp rozumět svému tělu.', items: ['Program 8 týdnů', 'Skupinové lekce', 'Osobní tréninky a Open gym', 'Regenerace a fotobiomodulace'], anchor: '#pro-tebe' },
  // Dětská karta vede na vlastní stránku (nejsilnější publikum), ne na kotvu.
  { fig: '02', tagline: 'Děti a maminky', label: 'Pro děti a rodiny', d: 'Pohyb pro nejmenší i pro rodiče, co nechtějí přestat.', items: ['Cirkusová školička', 'Pohybové kroužky a akrobacie', 'Objevovárna a Dětská Zumba', 'Supermamky — i s dětmi vedle'], anchor: '/krouzky-pro-deti/' },
  { fig: '03', tagline: 'Týmy a organizace', label: 'Pro firmy', d: 'Zdravější a sehranější tým bez vlastní tělocvičny.', items: ['FitTeams — tréninky pro týmy', 'Firemní wellbeing programy', 'Pronájem sálů na akce'], anchor: '#pro-firmy' },
];

// href = klik vede na nejkonkrétnější existující cíl; bez href karta
// zůstává neklikací (program/cyklus zatím bez vlastní stránky či kotvy).
export const paths: { tag: string; t: string; d: string; href?: string }[] = [
  { tag: 'vlajkový', t: 'Program 8 týdnů', d: 'Osm týdnů s malou skupinou — ne permanentka.', href: '/#program' },
  { tag: 'měsíčně', t: 'Měsíční program', d: 'Pravidelný pohyb se strukturou a komunitou.' },
  { tag: '1:1', t: 'Osobní restart', d: 'Individuální vedení, když potřebuješ začít znovu.' },
  { tag: 'skupina', t: 'Maminky', d: 'Pohyb pro maminky — klidně i s dětmi vedle.', href: '/supermamky/' },
  { tag: 'skupina', t: 'Chlapi 40+', d: 'Síla, záda a energie. Bez soutěžení, bez ega.' },
  { tag: 'cyklus', t: 'Zdravá záda · síla · energie', d: 'Tematické cykly zaměřené na konkrétní cíl.' },
];

// id = stabilní kotva na /skupinove-lekce/#<id> (ASCII bez diakritiky).
// NIKDY neměnit — vedou na ně odkazy z celého webu. Stejná id používá i EN
// mutace (home.en.ts), ať odkazy fungují napříč jazyky.
// page = lekce má vlastní stránku; zmínky pak vedou na ni, ne na kotvu.
export const classes: { id: string; t: string; d: string; img: string; media: string; bhm: string; page?: string }[] = [
  { id: 'kruhac', t: 'Kruhové tréninky', d: 'Funkční trénink v kruhu: střídáš stanoviště, cvičíš s vlastní vahou nebo pomůckami, trénink vede trenér. Vhodné pro všechny úrovně.', img: 'kruhový trénink', media: 'media-green', bhm: 'Tělo · dokončování · komunita' },
  { id: 'silovy-trenink', t: 'Silové tréninky', d: 'Práce s vlastní vahou a jednoduchým nářadím pod vedením trenéra. Zaměřujeme se na techniku a postupné budování síly.', img: 'silový trénink', media: 'media-forest', bhm: 'Tělo · síla · trpělivost' },
  { id: 'hiit', t: 'HIIT', d: 'Vysoce intenzivní intervalový trénink, který kombinuje kardio a posilování. Krátké intervaly, maximální efekt — pro ty, kteří chtějí výsledky bez ztráty času.', img: 'HIIT lekce', media: 'media-clay', bhm: 'Tělo · energie · odolnost' },
  { id: 'supermamky', page: '/supermamky/', t: 'Supermamky', d: 'Tréninky pro maminky s dětmi — cvičení přizpůsobené realitě rodičovství. S miminkem nebo batoletem u tebe.', img: 'supermamky', media: 'media-sand', bhm: 'Tělo · rodina · komunita' },
  { id: 'vlastni-vaha', t: 'Vlastní váha', d: 'Cvičení bez nářadí: ovládneš základní pohybové vzory, zlepšíš koordinaci a sílu. Vhodné i jako první krok pro úplné začátečníky.', img: 'vlastní váha', media: 'media-rose', bhm: 'Tělo · kontrola · pozornost' },
  { id: 'power-zone', t: 'Power Zone', d: 'Funkční trénink kombinující kruháče a prvky crossfitu. Intenzivní, efektivní, vedený trenérem — pro výsledky bez zbytečných řečí.', img: 'power zone', media: 'media-clay', bhm: 'Tělo · síla · výkon' },
  { id: 'zumba', t: 'Zumba', d: 'Taneční fitness v rytmu latinskoamerické hudby — pohyb jako oslava, ne dřina. Vhodné pro všechny, kteří chtějí cvičit a přitom se bavit.', img: 'zumba', media: 'media-rose', bhm: 'Tělo · rytmus · radost' },
  { id: 'brisni-pekac', t: 'Břišní pekáč', d: 'Trénink hlubokého stabilizačního systému a core. Žádné zkracovačky — učíš se ovládat tělo zevnitř. Vhodné pro všechny úrovně.', img: 'břišní pekáč', media: 'media-rose', bhm: 'Tělo · stabilita · kontrola' },
  { id: 'solid-booty', t: 'Solid Booty', d: 'Zaměřeno na hýžďové svaly — správná technika, vědomý pohyb, výsledky. Oblíbená lekce s jasným cílem.', img: 'solid booty', media: 'media-sand', bhm: 'Tělo · síla · pohyb' },
  { id: 'enduro', t: 'Enduro', d: 'Síla, kondice a přirozené pohyby v jedné lekci. Pro ty, kdo chtějí výkonnější a odolnější tělo na dlouho.', img: 'enduro', media: 'media-green', bhm: 'Tělo · výdrž · odolnost' },
];

// href = detail stránky; box je klikatelný celý. Bez href zatím stránka není
// (osobní tréninky — viz redirect-map, stránka se teprve postaví).
export const individualServices: { t: string; d: string; href?: string }[] = [
  { t: 'Osobní tréninky', d: 'Individuální vedení šité na tvoje cíle a tempo.' },
  { t: 'Open gym', d: 'Privátní sál 100 m² jen pro tebe nebo malou skupinu.', href: '/open-gym/' },
  { t: 'Fotobiomodulace', d: 'Regenerace a podpora hojení světelnou terapií.', href: '/fotobiomodulacni-terapie/' },
];

// href = detail; karta je klikatelná celá. Supermamky patří sem — je to
// skupinová lekce maminek (a tátů) s dětmi, ne jen poznámka pod čarou.
export const kidsActivities: { t: string; d: string; img: string; media: string; href?: string }[] = [
  { t: 'Cirkusová školička', d: 'Pro nejmenší — základní pohybové dovednosti hravou formou.', img: 'cirkusová školička', media: 'media-sand', href: '/krouzky-pro-deti/#cirkusova-skolicka' },
  { t: 'Základy gymnastiky a akrobacie', d: 'Gymnastika a akrobacie pod vedením akrobatů La Putyka.', img: 'akrobacie', media: 'media-clay', href: '/krouzky-pro-deti/#zaklady-gymnastiky' },
  { t: 'Pozemní a závěsná akrobacie, žonglování', d: 'Pozemní i závěsná akrobacie a žonglování.', img: 'kroužky pro děti', media: 'media-green', href: '/krouzky-pro-deti/#akrobacie-zonglovani' },
  { t: 'Objevovárna', d: 'Pro nejmenší děti do 5 let — 6 pohybových stanovišť, kde děti prozkoumávají svět pohybem hravou formou.', img: 'objevovárna', media: 'media-rose', href: '/krouzky-pro-deti/#objevovarna' },
  { t: 'Dětská Zumba', d: 'Taneční lekce pro děti v rytmu Zumby — zábava, koordinace a pohyb hravou formou. Vede Eliška Velázquez.', img: 'dětská zumba', media: 'media-sand', href: '/krouzky-pro-deti/#detska-zumba' },
  { t: 'Supermamky', d: 'Skupinová lekce pro maminky a tatínky s dětmi — kruhový trénink přizpůsobený realitě rodičovství. S miminkem nebo batoletem u tebe.', img: 'supermamky', media: 'media-forest', href: '/supermamky/' },
];

// Homepage pruh „Pro děti a rodiny" — po homepage nejsilnější publikum
// (GSC: /krouzky-pro-deti/ = priorita č. 1, viz docs/redirect-map.md).
// Cirkusová školička a Objevovárna = dvě různé položky (potvrzeno Honzou,
// odpovídá bohemi.fit). Popisy převzaté z kidsActivities výš, žádné nové texty.
// Příměstský tábor se už nedělá — do nabídky nevracet (rozhodnuto 7/2026).
export const kidsBand = [
  { t: 'Kroužky pro děti', d: 'Základy gymnastiky, pozemní i závěsná akrobacie a žonglování — pod vedením akrobatů La Putyka.', href: '/krouzky-pro-deti/' },
  { t: 'Cirkusová školička', d: 'Pro nejmenší — základní pohybové dovednosti hravou formou.', href: '/krouzky-pro-deti/#cirkusova-skolicka' },
  { t: 'Objevovárna', d: 'Pro nejmenší děti do 5 let — 6 pohybových stanovišť, kde děti prozkoumávají svět pohybem.', href: '/krouzky-pro-deti/#objevovarna' },
  { t: 'Dětská Zumba', d: 'Taneční lekce pro děti v rytmu Zumby — zábava, koordinace a pohyb hravou formou. Vede Eliška Velázquez.', href: '/krouzky-pro-deti/#detska-zumba' },
  { t: 'Supermamky', d: 'Tréninky pro maminky — cvičení přizpůsobené realitě rodičovství. S miminkem nebo batoletem u tebe.', href: '/supermamky/' },
];

export const firmyServices = [
  { t: 'FitTeams', d: 'Kruhové a silové tréninky navržené pro firemní týmy. Max 12 lidí, v našem studiu nebo u vás.' },
  { t: 'Firemní wellbeing', d: 'Pravidelné programy pro zdraví a energii zaměstnanců — ergonomie, výživa, regenerace.' },
  { t: 'Pronájem sálů', d: 'Sály pro vlastní akce, teambuilding nebo workshopy. Od 350 Kč/hod při smlouvě na 6 měsíců.' },
];

export const lpHighlights = [
  '2× týdně vedený trénink v malé skupině',
  'Vstupní a závěrečné měření — viditelný posun, ne jen pocit',
  'Uzavřená skupina, jednoduchý deník návyků',
  'Postupné zlepšení síly, kondice a režimu — žádné zázraky',
];

export const bodyPurpose = [
  'Lépe spíš a vstáváš s víc energií',
  'Míň tě bolí záda a pohybuješ se bez omezení',
  'Zvládáš náročné dny bez vyčerpání',
  'Cítíš se jistěji ve vlastní kůži',
  'Máš stabilnější náladu a méně stresu',
  'Jsi příkladem pohybu pro lidi kolem tebe',
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
  { name: 'Klára Měchurová', role: 'Trenérka · funkční trénink', media: 'media-green', bio: 'Klára se pohybu věnuje od dětství — balet, tenis, basketbal, tanec. Certifikovaná fitness lektorka od roku 2015, aktivní od 2013. Vede kruháče, silové lekce i HIIT a nabízí osobní tréninky.' },
  { name: 'Jitka Štěpánková', role: 'Lektorka · Power Zone', media: 'media-sand', bio: '' },
  { name: 'Eliška Velázquez', role: 'Lektorka · Zumba a Dětská Zumba', media: 'media-forest', bio: 'Eliška přináší do BoHeMi latinskoamerický rytmus a radost z pohybu. Vede Zumbu pro dospělé i Dětskou Zumbu — lekce, kde se cvičí, ale hlavně baví.' },
  { name: 'Jan Hezina', role: 'zakladatel · provoz a technika', media: 'media-clay', bio: '' },
];

export const pricing = [
  { t: 'Jednorázový vstup', d: 'Když přijdeš jen občas', price: '250 Kč', per: '/ lekce', featured: false, badge: '', note: '', feat: ['Platíš za každou lekci zvlášť', 'Žádná sleva na služby', 'Nejdražší varianta za lekci'] },
  { t: 'Členství', d: 'Když je pohyb součást života', price: '1 499 Kč', per: '/ 8 lekcí', featured: true, badge: 'Nejvýhodnější', note: '8 lekcí vychází na ~187 Kč za lekci.', feat: ['8 skupinových lekcí', 'Lekce ~187 Kč / lekce', 'Sleva 30 % na osobní tréninky', 'Komunita a akce v ceně'] },
  { t: 'Program 8 týdnů', d: 'Když to chceš vzít vážně', price: '3 900 Kč', per: '/ 8 týdnů', featured: false, badge: 'Vlajkový program', note: '', feat: ['2× pohyb + 1× praktický blok týdně', 'Měření na začátku a na konci', 'Uzavřená skupina 10–20 lidí', 'Vedení trenérem celých 8 týdnů'] },
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

export const RESERVE_URL = 'https://bohemi.fit/rezervace/';
