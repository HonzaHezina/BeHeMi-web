export type Lang = 'cs' | 'en';

// Maps CS slugs ↔ EN slugs for the language switcher
export const routeMap: Record<string, string> = {
  '/': '/en/',
  '/en/': '/',
  '/proc-bohemi/': '/en/why-bohemi/',
  '/en/why-bohemi/': '/proc-bohemi/',
  '/lekce-a-sluzby/': '/en/classes-and-services/',
  '/en/classes-and-services/': '/lekce-a-sluzby/',
  '/cenik/': '/en/pricing/',
  '/en/pricing/': '/cenik/',
  '/kontakt/': '/en/contact/',
  '/en/contact/': '/kontakt/',
  '/skupinove-lekce/': '/en/group-classes/',
  '/en/group-classes/': '/skupinove-lekce/',
  '/open-gym/': '/en/open-gym/',
  '/en/open-gym/': '/open-gym/',
  '/fotobiomodulacni-terapie/': '/en/photobiomodulation-therapy/',
  '/en/photobiomodulation-therapy/': '/fotobiomodulacni-terapie/',
};

export const hreflangMap: Record<string, { cs: string; en: string }> = {
  '/': { cs: '/', en: '/en/' },
  '/en/': { cs: '/', en: '/en/' },
  '/proc-bohemi/': { cs: '/proc-bohemi/', en: '/en/why-bohemi/' },
  '/en/why-bohemi/': { cs: '/proc-bohemi/', en: '/en/why-bohemi/' },
  '/lekce-a-sluzby/': { cs: '/lekce-a-sluzby/', en: '/en/classes-and-services/' },
  '/en/classes-and-services/': { cs: '/lekce-a-sluzby/', en: '/en/classes-and-services/' },
  '/cenik/': { cs: '/cenik/', en: '/en/pricing/' },
  '/en/pricing/': { cs: '/cenik/', en: '/en/pricing/' },
  '/kontakt/': { cs: '/kontakt/', en: '/en/contact/' },
  '/en/contact/': { cs: '/kontakt/', en: '/en/contact/' },
  '/skupinove-lekce/': { cs: '/skupinove-lekce/', en: '/en/group-classes/' },
  '/en/group-classes/': { cs: '/skupinove-lekce/', en: '/en/group-classes/' },
  '/open-gym/': { cs: '/open-gym/', en: '/en/open-gym/' },
  '/en/open-gym/': { cs: '/open-gym/', en: '/en/open-gym/' },
  '/fotobiomodulacni-terapie/': { cs: '/fotobiomodulacni-terapie/', en: '/en/photobiomodulation-therapy/' },
  '/en/photobiomodulation-therapy/': { cs: '/fotobiomodulacni-terapie/', en: '/en/photobiomodulation-therapy/' },
};

export const ui = {
  cs: {
    // Header
    nav_reserve: 'Rezervovat',
    nav_open_menu: 'Otevřít menu',
    nav_close_menu: 'Zavřít menu',
    nav_menu_label: 'Hlavní navigace',
    // Footer
    footer_tagline: 'Skupinové lekce a komunita. Body – Health – Mind.',
    footer_reserve: 'Rezervovat lekci →',
    footer_web: 'Web',
    footer_services: 'Služby',
    footer_contact: 'Kontakt',
    footer_address: 'Blanická 25, Praha 2',
    footer_rights: 'Všechna práva vyhrazena.',
    footer_lang_label: 'Jazyk',
    // Hero
    hero_badge: 'Fitness studio na Vinohradech',
    hero_h1: 'Vedené tréninky, kruháče\na vlastní váha',
    hero_h1_accent: 'pro tělo, zdraví i hlavu.',
    hero_body: 'Fitness studio na Vinohradech se skupinovými lekcemi a funkčním pohybem. Žádný anonymní řetězec ani samoobsluha u strojů — na lekci tě vede trenér a opravuje techniku.',
    hero_cta_primary: 'Zkus první lekci →',
    hero_cta_secondary: 'Podívat se na lekce',
    hero_social_proof: 'Malé skupiny —\ntrenér ví, jak na tebe.',
    hero_float_1: '● Funkční trénink bez strojů',
    hero_float_2: '● Trenér tě opraví',
    hero_float_3: '● Vlastní váha a pomůcky',
    hero_img_alt: 'Trénink ve funkčním sále BoHeMi',
    hero_kids_link: 'Hledáš něco pro děti? →',
    // ApproachGrid
    approach_eyebrow: 'Začínáš? Vracíš se? Hledáš komunitu?',
    approach_h2_a: 'Co u nás lidé nejčastěji',
    approach_h2_b: 'řeší.',
    approach_body: 'Každý přichází s jinými cílem — ale vždycky jde o to, aby pohyb byl pravidelný, trenér znal tvoje jméno a ty viděl/a výsledky.',
    approach_footer: 'Nic ti na tomhle webu neprodáme — jen ukážeme cestu.',
    // Audiences
    audiences_eyebrow: 'Pro koho tu jsme',
    audiences_h2_a: 'BoHeMi není',
    audiences_h2_b: 'jen posilovna.',
    audiences_body: 'Máme programy pro jednotlivce, rodiny i firmy — vždy s trenérem, v malé skupině, kde každý ví, jak se jmenuješ.',
    audiences_cta: 'Co nabízíme →',
    // LifePracticeFeature
    lp_eyebrow: '8 týdnů · malá skupina · vedený program',
    lp_h2_a: 'Program 8 týdnů:',
    lp_h2_b: 'pohyb se základy,\nkteré vydrží.',
    lp_body_1: 'Osm týdnů s malou skupinou, vedený trenérem. Každý týden dvě pohybové lekce a jeden praktický blok.',
    lp_body_2: 'Vstupní i závěrečné měření — aby sis mohl/a porovnat, kde jsi začínal/a a kde jsi teď.',
    lp_cta: 'Přijít na Program 8 týdnů →',
    // Trainers
    trainers_eyebrow: 'Lidé, které znáš jménem',
    trainers_h2: 'Naši trenéři',
    // PricingTeaser
    pricing_eyebrow: 'Ceník',
    pricing_h2_a: 'Jasné ceny,',
    pricing_h2_b: 'žádné překvapení.',
    pricing_link: 'Celý ceník →',
    // HealthTracker
    ht_badge: 'Proč to děláme',
    ht_h2_a: 'Tělo není cíl.',
    ht_h2_b: 'Je to základ pro život.',
    ht_body_1: 'Pohyb nás nezměnil tím, že bychom zhubli nebo nabrali svaly. Změnil to, jak se o sebe staráme — a že se k tomu vracíme i po pauze.',
    ht_body_2: 'Každá lekce v BoHeMi je jeden krok k životu, který ti sedí.',
    ht_tracker_label: 'Jak to vypadá v praxi',
    // Common
    reserve: 'Rezervovat',
    contact_us: 'Napsat nám',
    learn_more: 'Více informací',
    // Offer / classes section labels
    offer_pro_tebe: 'Pro tebe',
    offer_pro_deti: 'Pro děti a rodiny',
    offer_pro_firmy: 'Pro firmy',
    offer_bhm_label: 'Body · Health · Mind v lekci',
    offer_individual_label: 'Individuální',
    offer_programs_label: 'Programy',
    offer_cta_reserve: 'Rezervovat lekci',
    offer_cta_contact: 'Napsat na FitTeams',
  },
  en: {
    // Header
    nav_reserve: 'Book a class',
    nav_open_menu: 'Open menu',
    nav_close_menu: 'Close menu',
    nav_menu_label: 'Main navigation',
    // Footer
    footer_tagline: 'Group classes and community. Body – Health – Mind.',
    footer_reserve: 'Book a class →',
    footer_web: 'Website',
    footer_services: 'Services',
    footer_contact: 'Contact',
    footer_address: 'Blanická 25, Prague 2',
    footer_rights: 'All rights reserved.',
    footer_lang_label: 'Language',
    // Hero
    hero_badge: 'Fitness studio in Vinohrady, Prague',
    hero_h1: 'Coached workouts, circuits\nand bodyweight training',
    hero_h1_accent: 'for body, health and mind.',
    hero_body: "A fitness studio in Vinohrady with group classes and functional movement. No anonymous gym chain, no self-service machines — the coach leads the class and corrects your form.",
    hero_cta_primary: 'Try your first class →',
    hero_cta_secondary: 'See the classes',
    hero_social_proof: 'Small groups —\nyour coach knows your name.',
    hero_float_1: '● Functional training, no machines',
    hero_float_2: '● Coach corrects your form',
    hero_float_3: '● Bodyweight & equipment',
    hero_img_alt: 'Training in the BoHeMi functional studio',
    hero_kids_link: 'Looking for something for kids? →',
    // ApproachGrid
    approach_eyebrow: 'Starting out? Coming back? Looking for community?',
    approach_h2_a: "What people most often",
    approach_h2_b: 'work on here.',
    approach_body: 'Everyone arrives with different goals — but it always comes down to making movement regular, having a coach who knows your name, and seeing real results.',
    approach_footer: "We won't sell you anything on this site — we'll just show you the way.",
    // Audiences
    audiences_eyebrow: "Who we're here for",
    audiences_h2_a: 'BoHeMi is more than',
    audiences_h2_b: 'just a gym.',
    audiences_body: 'We have programs for individuals, families and companies — always with a coach, in a small group where everyone knows your name.',
    audiences_cta: 'What we offer →',
    // LifePracticeFeature
    lp_eyebrow: '8 weeks · small group · coached program',
    lp_h2_a: '8-Week Program:',
    lp_h2_b: 'movement fundamentals\nthat last.',
    lp_body_1: 'Eight weeks with a small group, led by a coach. Each week: two movement sessions and one practical workshop.',
    lp_body_2: 'Measurements at the start and end — so you can compare where you started and where you are now.',
    lp_cta: 'Join the 8-Week Program →',
    // Trainers
    trainers_eyebrow: 'People you know by name',
    trainers_h2: 'Our coaches',
    // PricingTeaser
    pricing_eyebrow: 'Pricing',
    pricing_h2_a: 'Clear prices,',
    pricing_h2_b: 'no surprises.',
    pricing_link: 'Full pricing →',
    // HealthTracker
    ht_badge: 'Why we do this',
    ht_h2_a: 'The body is not the goal.',
    ht_h2_b: "It's the foundation for life.",
    ht_body_1: "Movement didn't change us by making us lose weight or build muscle. It changed how we take care of ourselves — and that we come back to it after a break.",
    ht_body_2: 'Every class at BoHeMi is one step toward a life that actually fits you.',
    ht_tracker_label: 'What it looks like in practice',
    // Common
    reserve: 'Book',
    contact_us: 'Contact us',
    learn_more: 'Learn more',
    // Offer / classes section labels
    offer_pro_tebe: 'For you',
    offer_pro_deti: 'For kids & families',
    offer_pro_firmy: 'For companies',
    offer_bhm_label: 'Body · Health · Mind in the class',
    offer_individual_label: 'Individual',
    offer_programs_label: 'Programs',
    offer_cta_reserve: 'Book a class',
    offer_cta_contact: 'Write about FitTeams',
  },
} as const;

export type UIKey = keyof typeof ui.cs;

export function t(lang: Lang, key: UIKey): string {
  return ui[lang][key] ?? ui.cs[key];
}
