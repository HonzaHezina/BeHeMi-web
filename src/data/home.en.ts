export const marquee = [
  'Circuit Training', 'Bodyweight', 'Functional Movement', 'Strength', 'Conditioning',
  'Back Health', 'Mobility', 'Sleep', 'Routine', 'Endurance', 'Technique', 'Consistency',
];

export const triad = [
  { k: 'Body', cs: 'Tělo', dot: 'bg-accent', d: 'Movement, strength, technique and recovery. A body that serves you at work, in sport, and in everyday life — not just in the mirror.' },
  { k: 'Health', cs: 'Zdraví', dot: 'bg-ink', d: 'A routine you can sustain: sleep, food, water, movement and consistency. No extremes, no complicated theories.' },
  { k: 'Mind', cs: 'Mysl', dot: 'bg-gold', d: 'Your head often clears only when you start doing something regularly, finishing it, and coming back to it after breaks. Less chaos, more energy.' },
];

// href = clickable card leading to the most specific existing target.
// Kids/Supermums detail pages are CS-only for now.
export const approach: { n: string; t: string; d: string; href?: string }[] = [
  { n: '01', t: 'I want to start exercising again', d: 'No burning out at the start. Gradually, regularly, with a coach who corrects you and remembers you.' },
  { n: '02', t: 'I want to tone up and improve my fitness', d: 'Circuit and strength training in a small group. Everyone trains at their own level — but seriously.' },
  { n: '03', t: "I don't want an anonymous gym", d: "You don't need to figure out machines or a plan on your own. Come to class and the coach guides you through the workout." },
  { n: '04', t: 'My back hurts or I feel stiff', d: "We'll help you get moving, improve technique, and gradually build strength for everyday life." },
  { n: '05', t: 'I want more energy and a better routine', d: 'Regular movement, simple habits, and workouts you can sustain long-term.' },
  { n: '06', t: 'I want to train as a mum', d: 'Supermums are classes you can attend with your child. Training adapts to the reality of parenting.', href: '/supermamky/' },
  { n: '07', t: 'I want movement for my kids', d: 'Circus School, acrobatics, and movement clubs led by experienced coaches. Movement through play.', href: '/krouzky-pro-deti/' },
  { n: '08', t: 'I want a movement program for my team', d: 'FitTeams — coached circuit training designed specifically for company groups. No gym required.', href: '/en/classes-and-services/#pro-firmy' },
];

export const audiences = [
  { fig: '01', tagline: 'Individuals', label: 'For you', d: "You want to move, have energy, and better understand your body.", items: ['8-Week Program', 'Group classes', 'Personal training & Open gym', 'Recovery & photobiomodulation'], anchor: '/en/classes-and-services/#pro-tebe' },
  // Kids card links to the dedicated page (strongest audience), not the anchor.
  { fig: '02', tagline: 'Kids & families', label: 'For kids & families', d: "Movement for the youngest and for parents who don't want to stop.", items: ['Circus School', 'Movement clubs & acrobatics', 'Discovery Room & Kids Zumba', 'Supermums — babies welcome'], anchor: '/krouzky-pro-deti/' },
  { fig: '03', tagline: 'Teams & organisations', label: 'For companies', d: 'A healthier and more cohesive team without needing your own gym.', items: ['FitTeams — team training', 'Corporate wellbeing programs', 'Hall rental for events'], anchor: '/en/classes-and-services/#pro-firmy' },
];

// href = clickable card; no href = no dedicated page/anchor yet.
export const paths: { tag: string; t: string; d: string; href?: string }[] = [
  { tag: 'flagship', t: '8-Week Program', d: 'Eight weeks with a small group — not a punch card.', href: '/en/#program' },
  { tag: 'monthly', t: 'Monthly membership', d: 'Regular movement with structure and community.' },
  { tag: '1:1', t: 'Personal restart', d: 'Individual coaching when you need to start fresh.' },
  { tag: 'group', t: 'Mums', d: 'Movement for mums — babies welcome beside you.', href: '/supermamky/' },
  { tag: 'group', t: 'Men 40+', d: 'Strength, back health and energy. No competition, no ego.' },
  { tag: 'cycle', t: 'Healthy back · strength · energy', d: 'Themed cycles focused on a specific goal.' },
];

// id = stable anchor on /en/group-classes/#<id> — SAME slugs as Czech
// (home.ts), never change them; links across the site point at them.
// page = class has its own page (CS-only for now); mentions link there.
export const classes: { id: string; t: string; d: string; img: string; media: string; bhm: string; page?: string }[] = [
  { id: 'kruhac', t: 'Circuit Training', d: 'Functional training in a circuit: you rotate between stations, training with bodyweight or equipment, led by a coach. Suitable for all levels.', img: 'circuit training', media: 'media-green', bhm: 'Body · follow-through · community' },
  { id: 'silovy-trenink', t: 'Strength Training', d: 'Bodyweight and simple equipment work under a coach. We focus on technique and gradual strength building.', img: 'strength training', media: 'media-forest', bhm: 'Body · strength · patience' },
  { id: 'hiit', t: 'HIIT', d: 'High-intensity interval training combining cardio and strength. Short intervals, maximum effect — for those who want results without wasting time.', img: 'HIIT class', media: 'media-clay', bhm: 'Body · energy · resilience' },
  { id: 'supermamky', page: '/supermamky/', t: 'Supermums', d: 'Classes for mums with children — training adapted to the reality of parenthood. With a baby or toddler beside you.', img: 'supermums', media: 'media-sand', bhm: 'Body · family · community' },
  { id: 'vlastni-vaha', t: 'Bodyweight', d: 'Training without equipment: master fundamental movement patterns, improve coordination and strength. Great as a first step for complete beginners.', img: 'bodyweight', media: 'media-rose', bhm: 'Body · control · focus' },
  { id: 'power-zone', t: 'Power Zone', d: 'Functional training combining circuits and CrossFit elements. Intense, effective, coach-led — for results without fuss.', img: 'power zone', media: 'media-clay', bhm: 'Body · strength · performance' },
  { id: 'zumba', t: 'Zumba', d: 'Dance fitness to Latin rhythms — movement as celebration, not a chore. For anyone who wants to exercise and have fun at the same time.', img: 'zumba', media: 'media-rose', bhm: 'Body · rhythm · joy' },
  { id: 'brisni-pekac', t: 'Core & Abs', d: 'Deep stabilisation and core training. No crunches — you learn to control your body from the inside. Suitable for all levels.', img: 'core abs', media: 'media-rose', bhm: 'Body · stability · control' },
  { id: 'solid-booty', t: 'Solid Booty', d: 'Focused on glute muscles — correct technique, mindful movement, results. A popular class with a clear goal.', img: 'solid booty', media: 'media-sand', bhm: 'Body · strength · movement' },
  { id: 'enduro', t: 'Enduro', d: 'Strength, conditioning, and natural movement patterns in one class. For those who want a more capable and resilient body long-term.', img: 'enduro', media: 'media-green', bhm: 'Body · endurance · resilience' },
];

// href = detail page; the whole box is clickable. No href = page not built yet.
export const individualServices: { t: string; d: string; href?: string }[] = [
  { t: 'Personal training', d: 'Individual coaching tailored to your goals and pace.' },
  { t: 'Open gym', d: 'Private 100 m² studio just for you or a small group.', href: '/en/open-gym/' },
  { t: 'Photobiomodulation', d: 'Recovery and healing support through light therapy.', href: '/en/photobiomodulation-therapy/' },
];

// href = detail page; the whole card is clickable. Kids detail pages are CS-only for now.
export const kidsActivities: { t: string; d: string; img: string; media: string; href?: string }[] = [
  { t: 'Circus School', d: 'For the youngest — basic movement skills through play.', img: 'circus school', media: 'media-sand', href: '/krouzky-pro-deti/#cirkusova-skolicka' },
  { t: 'Gymnastics & Acrobatics basics', d: 'Gymnastics and acrobatics led by La Putyka acrobats.', img: 'acrobatics', media: 'media-clay', href: '/krouzky-pro-deti/#zaklady-gymnastiky' },
  { t: 'Floor & aerial acrobatics, juggling', d: 'Floor and aerial acrobatics and juggling.', img: 'kids clubs', media: 'media-green', href: '/krouzky-pro-deti/#akrobacie-zonglovani' },
  { t: 'Discovery Room', d: 'For the youngest children up to age 5 — 6 movement stations where children explore the world through movement.', img: 'discovery room', media: 'media-rose', href: '/krouzky-pro-deti/#objevovarna' },
  { t: 'Kids Zumba', d: 'Dance classes for children in Zumba style — fun, coordination, and movement through play. Led by Eliška Velázquez.', img: 'kids zumba', media: 'media-sand', href: '/krouzky-pro-deti/#detska-zumba' },
  { t: 'Supermums', d: 'A group class for mums and dads with kids — circuit training adapted to the reality of parenthood. With your baby or toddler right beside you.', img: 'supermums', media: 'media-forest', href: '/supermamky/' },
];

// Homepage "For kids & families" band — mirrors kidsBand in home.ts.
export const kidsBand = [
  { t: 'Kids clubs', d: 'Gymnastics basics, floor and aerial acrobatics, and juggling — led by La Putyka acrobats.', href: '/krouzky-pro-deti/' },
  { t: 'Circus School', d: 'For the youngest — basic movement skills through play.', href: '/krouzky-pro-deti/#cirkusova-skolicka' },
  { t: 'Discovery Room', d: 'For the youngest children up to age 5 — 6 movement stations where children explore the world through movement.', href: '/krouzky-pro-deti/#objevovarna' },
  { t: 'Kids Zumba', d: 'Dance classes for children in Zumba style — fun, coordination, and movement through play. Led by Eliška Velázquez.', href: '/krouzky-pro-deti/#detska-zumba' },
  { t: 'Supermums', d: 'Training for mums — adapted to the reality of parenthood. With your baby or toddler right beside you.', href: '/supermamky/' },
];

export const firmyServices = [
  { t: 'FitTeams', d: 'Circuit and strength training designed for company teams. Max 12 people, at our studio or yours.' },
  { t: 'Corporate wellbeing', d: 'Regular programs for employee health and energy — ergonomics, nutrition, recovery.' },
  { t: 'Hall rental', d: 'Studios for your own events, team-building or workshops. From 350 CZK/hr with a 6-month contract.' },
];

export const lpHighlights = [
  'Coached training 2× per week in a small group',
  'Initial and final measurements — visible progress, not just a feeling',
  'Closed group with a simple habit journal',
  'Gradual improvement in strength, fitness and routine — no miracles',
];

export const bodyPurpose = [
  'You sleep better and wake up with more energy',
  'Your back hurts less and you move without restrictions',
  'You handle demanding days without exhaustion',
  'You feel more confident in your own skin',
  'You have a more stable mood and less stress',
  'You set an example of movement for people around you',
];

export const healthTracker = [
  { area: 'Body', q: 'Did I move for at least 20–30 minutes today?' },
  { area: 'Breath', q: 'Did I spend 3 minutes breathing calmly?' },
  { area: 'Food', q: 'Did I eat in a way that left me with energy?' },
  { area: 'Water', q: 'Did I drink enough throughout the day?' },
  { area: 'Sleep', q: 'Did I prepare my body for sleep this evening?' },
  { area: 'Mind', q: 'Did I pause and check in with myself, even briefly?' },
  { area: 'Relations', q: 'Did I have one mindful positive contact with another person today?' },
];

export const trainers = [
  { name: 'Klára Měchurová', role: 'Coach · functional training', media: 'media-green', bio: 'Klára has been active since childhood — ballet, tennis, basketball, dance. Certified fitness instructor since 2015, active since 2013. She leads circuit, strength and HIIT classes and offers personal training.' },
  { name: 'Jitka Štěpánková', role: 'Instructor · Power Zone', media: 'media-sand', bio: '' },
  { name: 'Eliška Velázquez', role: 'Instructor · Zumba and Kids Zumba', media: 'media-forest', bio: 'Eliška brings Latin rhythm and the joy of movement to BoHeMi. She leads Zumba for adults and Kids Zumba — classes where you exercise but most of all have fun.' },
  { name: 'Jan Hezina', role: 'founder · operations & tech', media: 'media-clay', bio: '' },
];

export const pricing = [
  { t: 'Single entry', d: 'When you come just occasionally', price: '250 CZK', per: '/ class', featured: false, badge: '', note: '', feat: ['Pay per class separately', 'No discount on services', 'Most expensive per-class option'] },
  { t: 'Membership', d: 'When movement is part of life', price: '1,499 CZK', per: '/ 8 classes', featured: true, badge: 'Best value', note: '8 classes works out to ~187 CZK per class.', feat: ['8 group classes', 'Classes ~187 CZK / class', '30% discount on personal training', 'Community and events included'] },
  { t: '8-Week Program', d: 'When you want to take it seriously', price: '3,900 CZK', per: '/ 8 weeks', featured: false, badge: 'Flagship program', note: '', feat: ['2× movement + 1× workshop per week', 'Measurements at start and end', 'Closed group of 10–20 people', 'Coach-led for the full 8 weeks'] },
];

export const nav = [
  { label: 'Home', href: '/en/' },
  { label: 'Why BoHeMi', href: '/en/why-bohemi/' },
  { label: 'Classes & services', href: '/en/classes-and-services/' },
  { label: 'Pricing', href: '/en/pricing/' },
  { label: 'Contact', href: '/en/contact/' },
];

// Kids, trainers and company pages are CS-only for now — links go to CS pages.
export const navMenu = [
  { num: '01', label: 'Group classes', desc: 'Circuits, HIIT, Zumba & more', href: '/en/group-classes/' },
  { num: '02', label: 'Personal training', desc: 'Individual coaching 1:1', href: '/en/classes-and-services/#pro-tebe' },
  { num: '03', label: 'Kids clubs', desc: 'Circus, acrobatics, Supermums', href: '/krouzky-pro-deti/' },
  { num: '04', label: 'For companies', desc: 'FitTeams, wellbeing, hall rental', href: '/en/classes-and-services/#pro-firmy' },
  { num: '05', label: 'Trainers', desc: 'Who will guide you', href: '/treneri/' },
];

export const RESERVE_URL = 'https://bohemi.fit/rezervace/';
