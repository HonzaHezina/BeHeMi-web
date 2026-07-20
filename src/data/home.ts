// Obsah domovské stránky — vytaženo z Claude Design exportu
// (renderVals() v "Bohemi Web.dc.html"). Zdroj pravdy pro texty.

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
  { n: '07', t: 'Hledám pohyb pro děti', d: 'Cirkusová školička, akrobacie a pohybové kroužky pod vedením zkušených lektorů.', href: '/krouzky-pro-deti/' },
  { n: '08', t: 'Chci pohybový program pro tým', d: 'FitTeams — vedené kruhové tréninky navržené přímo pro firemní skupiny. Bez vlastní tělocvičny.', href: '/firmy/' },
];

// href = klik vede na nejkonkrétnější existující cíl; bez href karta
// zůstává neklikací (program/cyklus zatím bez vlastní stránky či kotvy).
// NEZOBRAZUJE SE (7/2026): programy kromě Programu 8 týdnů nejsou hotové —
// mřížka „Lekce a programy" stažena z HP (Offer.astro). Vrátit, až budou.
export const paths: { tag: string; t: string; d: string; href?: string }[] = [
  { tag: 'vlajkový', t: 'Program 8 týdnů', d: 'Osm týdnů s malou skupinou do 12 lidí.', href: '/program-8-tydnu/' },
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
  { id: 'kruhac', t: 'Kruhové tréninky', d: 'Osm až deset stanovišť v kruhu — vlastní váha, kettlebell, TRX. Trenér tě vidí celou dobu a opraví techniku.', img: 'kruhový trénink', media: 'media-green', bhm: 'Stanoviště na čas · malá skupina' },
  { id: 'silovy-trenink', t: 'Silové tréninky', d: 'Pár komplexních cviků ve více sériích — dřep, tah, tlak. Těžší váha přijde, až sedí technika.', img: 'silový trénink', media: 'media-forest', bhm: 'Technika · postupná zátěž' },
  { id: 'hiit', t: 'HIIT', d: '30 vteřin naplno, minimum pauzy, tři kola dokola. Kardio a posilování v jednom, tep nahoře celou hodinu.', img: 'HIIT lekce', media: 'media-clay', bhm: 'Vysoké tempo · krátké intervaly' },
  { id: 'zumba', t: 'Zumba', d: 'Hodina tance na latinskoamerickou hudbu — kroky se chytneš i napoprvé, taneční průprava netřeba.', img: 'zumba', media: 'media-rose', bhm: 'Tanec · bez počítání opakování' },
  { id: 'vlastni-vaha', t: 'Vlastní váha', d: 'Dřepy, kliky, výpady, plank — základní pohybové vzory bez nářadí. Každý cvik má lehčí i těžší variantu.', img: 'vlastní váha', media: 'media-rose', bhm: 'Bez nářadí · pro každou úroveň' },
  { id: 'power-zone', t: 'Power Zone', d: 'Funkční cviky, kruhový formát a prvky crossfitu v jedné lekci. Vede Jitka Štěpánková.', img: 'power zone', media: 'media-clay', bhm: 'Kruháč · crossfit' },
  { id: 'supermamky', page: '/supermamky/', t: 'Supermamky', d: 'Kruhový trénink pro rodiče s dětmi — s miminkem nebo batoletem přímo u tebe.', img: 'supermamky', media: 'media-sand', bhm: 'S dítětem vedle' },
  { id: 'brisni-pekac', t: 'Břišní pekáč', d: 'Core a hluboký stabilizační systém — zkracovačky nečekej. Základ, na kterém stojí záda bez bolesti.', img: 'břišní pekáč', media: 'media-rose', bhm: 'Core · žádné zkracovačky' },
  { id: 'solid-booty', t: 'Solid Booty', d: 'Cílená práce na hýžďové svaly s booty bandem a vlastní vahou. Technika na prvním místě.', img: 'solid booty', media: 'media-sand', bhm: 'Hýždě · přesná technika' },
  { id: 'enduro', t: 'Enduro', d: 'Funkční síla, kondiční intervaly a přirozené pohyby v jedné lekci — na odolnost, ne na jedno léto.', img: 'enduro', media: 'media-green', bhm: 'Síla na dlouhou trať' },
];

// href = detail stránky; box je klikatelný celý. Bez href zatím stránka není
// (osobní tréninky — viz redirect-map, stránka se teprve postaví).
export const individualServices: { t: string; d: string; href?: string }[] = [
  { t: 'Osobní tréninky', d: 'Individuální vedení šité na tvoje cíle a tempo.', href: '/osobni-treninky/' },
  { t: 'Open gym', d: 'Privátní sál 100 m² jen pro tebe nebo malou skupinu.', href: '/open-gym/' },
  { t: 'Fotobiomodulace', d: 'Regenerace a podpora hojení světelnou terapií.', href: '/fotobiomodulacni-terapie/' },
  { t: 'Pronájem sálů', d: 'Sály pro vlastní akce, workshopy nebo tvoje klienty. Od 350 Kč/hod při smlouvě na 6 měsíců.', href: '/pronajem-salu/' },
];

// href = detail; karta je klikatelná celá. Supermamky patří sem — je to
// skupinová lekce maminek (a tátů) s dětmi, ne jen poznámka pod čarou.
export const kidsActivities: { id: string; t: string; d: string; img: string; media: string; href?: string }[] = [
  { id: 'cirkusova-skolicka', t: 'Cirkusová školička', d: 'Pro nejmenší — první krok k pohybu: rovnováha, koordinace a odvaha zkusit něco nového.', img: 'cirkusová školička', media: 'media-sand', href: '/krouzky-pro-deti/#cirkusova-skolicka' },
  { id: 'zaklady-gymnastiky', t: 'Základy gymnastiky a akrobacie formou hry', d: 'Gymnastika a akrobacie pod vedením akrobatů La Putyka.', img: 'akrobacie', media: 'media-clay', href: '/krouzky-pro-deti/#zaklady-gymnastiky' },
  { id: 'akrobacie-zonglovani', t: 'Pozemní a závěsná akrobacie, žonglování', d: 'Pozemní i závěsná akrobacie a žonglování.', img: 'kroužky pro děti', media: 'media-green', href: '/krouzky-pro-deti/#akrobacie-zonglovani' },
  { id: 'objevovarna', t: 'Objevovárna', d: 'Pro děti do 5 let — 6 pohybových stanovišť, na kterých si samy zkoušejí, co jejich tělo zvládne.', img: 'objevovárna', media: 'media-rose', href: '/krouzky-pro-deti/#objevovarna' },
  { id: 'detska-zumba', t: 'Dětská Zumba', d: 'Taneční lekce pro děti v rytmu Zumby — koordinace a pohyb, ale hlavně zábava. Vede Eliška Velázquez.', img: 'dětská zumba', media: 'media-sand', href: '/krouzky-pro-deti/#detska-zumba' },
  { id: 'supermamky', t: 'Supermamky', d: 'Skupinová lekce pro maminky a tatínky s dětmi — kruhový trénink přizpůsobený realitě rodičovství. S miminkem nebo batoletem u tebe.', img: 'supermamky', media: 'media-forest', href: '/supermamky/' },
];

// Homepage pruh „Pro děti a rodiny" — po homepage nejsilnější publikum
// (GSC: /krouzky-pro-deti/ = priorita č. 1, viz docs/redirect-map.md).
// Cirkusová školička a Objevovárna = dvě různé položky (potvrzeno Honzou,
// odpovídá bohemi.fit). Popisy převzaté z kidsActivities výš, žádné nové texty.
// Příměstský tábor se už nedělá — do nabídky nevracet (rozhodnuto 7/2026).
export const kidsBand = [
  { id: 'krouzky', t: 'Kroužky pro děti', d: 'Základy gymnastiky, pozemní i závěsná akrobacie a žonglování — pod vedením akrobatů La Putyka.', media: 'media-sand', href: '/krouzky-pro-deti/' },
  { id: 'cirkusova-skolicka', t: 'Cirkusová školička', d: 'Pro nejmenší — první krok k pohybu: rovnováha, koordinace a odvaha zkusit něco nového.', media: 'media-clay', href: '/krouzky-pro-deti/#cirkusova-skolicka' },
  { id: 'objevovarna', t: 'Objevovárna', d: 'Pro děti do 5 let — 6 pohybových stanovišť, na kterých si samy zkoušejí, co jejich tělo zvládne.', media: 'media-rose', href: '/krouzky-pro-deti/#objevovarna' },
  { id: 'detska-zumba', t: 'Dětská Zumba', d: 'Taneční lekce pro děti v rytmu Zumby — koordinace a pohyb, ale hlavně zábava. Vede Eliška Velázquez.', media: 'media-green', href: '/krouzky-pro-deti/#detska-zumba' },
  { id: 'supermamky', t: 'Supermamky', d: 'Tréninky pro maminky — cvičení přizpůsobené realitě rodičovství. S miminkem nebo batoletem u tebe.', media: 'media-forest', href: '/supermamky/' },
];

export const firmyServices: { t: string; d: string; href?: string }[] = [
  { t: 'FitTeams', d: 'Kruhové a silové tréninky navržené pro firemní týmy. Max 12 lidí, v našem studiu nebo u vás.', href: '/firmy/' },
  { t: 'Firemní wellbeing', d: 'Pravidelné programy pro zdraví a energii zaměstnanců — ergonomie, výživa, regenerace.', href: '/firmy/' },
];

export const lpHighlights = [
  '2× týdně vedený trénink v malé skupině',
  'Vstupní a závěrečné měření — vidíš to v číslech, ne jen podle pocitu',
  'Uzavřená skupina, jednoduchý deník návyků',
  'Osm týdnů na to, aby se pohyb stal součástí týdne, ne výjimkou',
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
// id = stabilní kotva /treneri/#<id> (ASCII, nikdy neměnit) — HP karty na ni
// odkazují stejnou logikou jako typy lekcí na /skupinove-lekce/.
export const trainers = [
  { id: 'klara-mechurova', name: 'Klára Měchurová', role: 'Trenérka · funkční trénink', media: 'media-green', bio: 'Klára se pohybu věnuje od dětství — balet, tenis, basketbal, tanec. Certifikovaná fitness lektorka od roku 2015, aktivní od 2013. Vede kruháče, silové lekce i HIIT a nabízí osobní tréninky.' },
  { id: 'jitka-stepankova', name: 'Jitka Štěpánková', role: 'Lektorka · Power Zone', media: 'media-sand', bio: '' },
  { id: 'eliska-velazquez', name: 'Eliška Velázquez', role: 'Lektorka · Zumba a Dětská Zumba', media: 'media-forest', bio: 'Eliška přináší do BoHeMi latinskoamerický rytmus a radost z pohybu. Vede Zumbu pro dospělé i Dětskou Zumbu — lekce, kde se cvičí, ale hlavně baví.' },
  { id: 'jan-hezina', name: 'Jan Hezina', role: 'zakladatel · provoz a technika', media: 'media-clay', bio: '' },
];

export const pricing = [
  { t: 'Jednorázový vstup', d: 'Když přijdeš jen občas', price: '199 Kč', per: '/ lekce', featured: false, badge: '', note: 'Open gym 450 Kč.', feat: ['Kruhové, silové, HIIT, Supermamky', 'Platíš za každou lekci zvlášť', 'Žádná sleva na ostatní lekce'] },
  { t: 'Měsíční členství', d: 'Pohyb jako součást rutiny', price: '1 499 Kč', per: '/ měsíc', featured: true, badge: 'Nejoblíbenější', note: '8 lekcí vychází na ~187 Kč za lekci.', feat: ['8 skupinových lekcí, 30 dní platnosti', '1× Open gym + 10 min fotobiomodulace', '10% sleva na ostatní lekce'] },
  { t: 'Roční členství', d: 'Pohyb jako dlouhodobý závazek', price: '1 199 Kč', per: '/ měsíc', featured: false, badge: 'Nejlepší cena', note: '96 lekcí vychází na ~150 Kč za lekci.', feat: ['96 skupinových lekcí, 14 měsíců platnosti', '12× Open gym + 10 min fotobio / měsíc', '10% sleva na ostatní lekce'] },
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
  { num: '01', label: 'Skupinové lekce', desc: 'Kruháče, HIIT, Zumba a další', href: '/skupinove-lekce/' },
  { num: '02', label: 'Osobní tréninky', desc: 'Individuální vedení 1:1', href: '/osobni-treninky/' },
  { num: '03', label: 'Kroužky pro děti', desc: 'Cirkus, akrobacie, Supermamky', href: '/krouzky-pro-deti/' },
  { num: '04', label: 'Pro firmy', desc: 'FitTeams, wellbeing, pronájem sálů', href: '/firmy/' },
  { num: '05', label: 'Trenéři', desc: 'Kdo vás bude vést', href: '/treneri/' },
];

export const RESERVE_URL = 'https://studio.bohemi.fit/';
