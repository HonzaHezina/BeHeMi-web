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
  { n: '07', t: 'I want movement for my kids', d: 'Circus School, acrobatics, and movement clubs led by experienced coaches.', href: '/krouzky-pro-deti/' },
  { n: '08', t: 'I want a movement program for my team', d: 'FitTeams — coached circuit training designed specifically for company groups. No gym required.', href: '/en/classes-and-services/#pro-firmy' },
];


// href = clickable card; no href = no dedicated page/anchor yet.
// NOT RENDERED (7/2026): programs other than the 8-Week Program aren't ready —
// the "Classes & programs" grid was pulled from the homepage (Offer.astro).
export const paths: { tag: string; t: string; d: string; href?: string }[] = [
  { tag: 'flagship', t: '8-Week Program', d: 'Eight weeks with a small group — not a punch card.', href: '/program-8-tydnu/' },
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
  { id: 'kruhac', t: 'Circuit Training', d: 'Eight to ten stations in a circuit — bodyweight, kettlebells, TRX. Your coach watches the whole time and corrects your form.', img: 'circuit training', media: 'media-green', bhm: 'Timed stations · small group' },
  { id: 'silovy-trenink', t: 'Strength Training', d: 'A handful of compound lifts across several sets — squat, pull, push. Heavier weight comes once the technique is solid.', img: 'strength training', media: 'media-forest', bhm: 'Technique · gradual load' },
  { id: 'hiit', t: 'HIIT', d: '30 seconds all-out, barely any rest, three rounds through. Cardio and strength in one, heart rate stays up the whole hour.', img: 'HIIT class', media: 'media-clay', bhm: 'High tempo · short intervals' },
  { id: 'zumba', t: 'Zumba', d: "An hour of dance to Latin rhythms — you'll pick up the steps on your first try, no dance background needed.", img: 'zumba', media: 'media-rose', bhm: 'Dance · no counting reps' },
  { id: 'vlastni-vaha', t: 'Bodyweight', d: 'Squats, push-ups, lunges, planks — fundamental movement patterns, no equipment. Every move has an easier and a harder version.', img: 'bodyweight', media: 'media-rose', bhm: 'No equipment · any level' },
  { id: 'power-zone', t: 'Power Zone', d: 'Functional moves, circuit format and CrossFit elements in one class. Led by Jitka Štěpánková.', img: 'power zone', media: 'media-clay', bhm: 'Circuit · CrossFit' },
  { id: 'supermamky', page: '/supermamky/', t: 'Supermums', d: 'Circuit training for parents with kids — baby or toddler right there with you.', img: 'supermums', media: 'media-sand', bhm: 'Kids welcome' },
  { id: 'brisni-pekac', t: 'Core & Abs', d: "Core and deep stabilisation work — don't expect crunches. The foundation a pain-free back stands on.", img: 'core abs', media: 'media-rose', bhm: 'Core · no crunches' },
  { id: 'solid-booty', t: 'Solid Booty', d: 'Focused glute work with a booty band and bodyweight. Technique comes first.', img: 'solid booty', media: 'media-sand', bhm: 'Glutes · precise form' },
  { id: 'enduro', t: 'Enduro', d: 'Functional strength, conditioning intervals and natural movement in one class — built for the long haul, not one summer.', img: 'enduro', media: 'media-green', bhm: 'Strength for the long run' },
];

// href = detail page; the whole box is clickable. No href = page not built yet.
export const individualServices: { t: string; d: string; href?: string }[] = [
  { t: 'Personal training', d: 'Individual coaching tailored to your goals and pace.' },
  { t: 'Open gym', d: 'Private 100 m² studio just for you or a small group.', href: '/en/open-gym/' },
  { t: 'Photobiomodulation', d: 'Recovery and healing support through light therapy.', href: '/en/photobiomodulation-therapy/' },
  { t: 'Hall rental', d: 'Studios for your own events, workshops or your own clients. From 350 CZK/hr with a 6-month contract.' },
];

// href = detail page; the whole card is clickable. Kids detail pages are CS-only for now.
export const kidsActivities: { id: string; t: string; d: string; img: string; media: string; href?: string }[] = [
  { id: 'cirkusova-skolicka', t: 'Circus School', d: 'For the youngest — a first step into movement: balance, coordination, and the confidence to try something new.', img: 'circus school', media: 'media-sand', href: '/krouzky-pro-deti/#cirkusova-skolicka' },
  { id: 'zaklady-gymnastiky', t: 'Gymnastics & Acrobatics basics', d: 'Gymnastics and acrobatics led by La Putyka acrobats.', img: 'acrobatics', media: 'media-clay', href: '/krouzky-pro-deti/#zaklady-gymnastiky' },
  { id: 'akrobacie-zonglovani', t: 'Hlavou ve vzduchu', d: 'Floor and aerial acrobatics and juggling.', img: 'kids clubs', media: 'media-green', href: '/krouzky-pro-deti/#akrobacie-zonglovani' },
  { id: 'objevovarna', t: 'Discovery Room', d: 'For kids up to age 5 — 6 movement stations where they figure out on their own what their body can do.', img: 'discovery room', media: 'media-rose', href: '/krouzky-pro-deti/#objevovarna' },
  { id: 'detska-zumba', t: 'Kids Zumba', d: 'Dance classes for children in Zumba style — coordination and movement, but mostly fun. Led by Eliška Velázquez.', img: 'kids zumba', media: 'media-sand', href: '/krouzky-pro-deti/#detska-zumba' },
  { id: 'supermamky', t: 'Supermums', d: 'A group class for mums and dads with kids — circuit training adapted to the reality of parenthood. With your baby or toddler right beside you.', img: 'supermums', media: 'media-forest', href: '/supermamky/' },
];

// Homepage "For kids & families" band — mirrors kidsBand in home.ts.
export const kidsBand = [
  { id: 'krouzky', t: 'Kids clubs', d: 'Gymnastics basics, floor and aerial acrobatics, and juggling — led by La Putyka acrobats.', media: 'media-sand', href: '/krouzky-pro-deti/' },
  { id: 'cirkusova-skolicka', t: 'Circus School', d: 'For the youngest — a first step into movement: balance, coordination, and the confidence to try something new.', media: 'media-clay', href: '/krouzky-pro-deti/#cirkusova-skolicka' },
  { id: 'objevovarna', t: 'Discovery Room', d: 'For kids up to age 5 — 6 movement stations where they figure out on their own what their body can do.', media: 'media-rose', href: '/krouzky-pro-deti/#objevovarna' },
  { id: 'detska-zumba', t: 'Kids Zumba', d: 'Dance classes for children in Zumba style — coordination and movement, but mostly fun. Led by Eliška Velázquez.', media: 'media-green', href: '/krouzky-pro-deti/#detska-zumba' },
  { id: 'supermamky', t: 'Supermums', d: 'Training for mums — adapted to the reality of parenthood. With your baby or toddler right beside you.', media: 'media-forest', href: '/supermamky/' },
];

export const firmyServices = [
  { t: 'FitTeams', d: 'Circuit and strength training designed for company teams. Max 12 people, at our studio or yours.' },
  { t: 'Corporate wellbeing', d: 'Regular programs for employee health and energy — ergonomics, nutrition, recovery.' },
];

export const lpHighlights = [
  'Coached training 2× per week in a small group',
  'Measurements at the start and the end — you see it in numbers, not just how you feel',
  'Closed group with a simple habit journal',
  'Eight weeks to make movement part of your week, not the exception',
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
  { t: 'Single entry', d: 'When you come just occasionally', price: '199 CZK', per: '/ class', featured: false, badge: '', note: 'Enduro 250 CZK · Open gym 450 CZK.', feat: ['Circuit, strength, HIIT, Supermums', 'Pay per class separately', 'No discount on other classes'] },
  { t: 'Monthly membership', d: 'Movement as part of your routine', price: '1,499 CZK', per: '/ month', featured: true, badge: 'Most popular', note: '8 classes works out to ~187 CZK per class.', feat: ['8 group classes, 30-day validity', '1× Open gym + 10 min photobiomodulation', '10% off other classes'] },
  { t: 'Annual membership', d: 'Movement as a long-term commitment', price: '1,199 CZK', per: '/ month', featured: false, badge: 'Best value', note: '96 classes works out to ~150 CZK per class.', feat: ['96 group classes, 14-month validity', '12× Open gym + 10 min photobio / month', '10% off other classes'] },
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
