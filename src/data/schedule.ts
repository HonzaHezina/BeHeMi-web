// Rozvrh lekcí z rezervačního kalendáře (Booking Activities na
// studio.bohemi.fit) — read-only feed, zapojeno 15. 9. 2026 po externím
// auditu prodejní cesty („rozvrh je nákupní informace číslo jedna a byla
// schovaná za kalendářem").
//
// Endpoint dodává child theme `wordpress/bohemi-twentytwentyfive-child`
// (`bohemi_wp_final_child_rest_schedule()` ve `functions.php`). Web z něj
// NIC nezapisuje ani neodesílá — jen čte termíny + volná místa a odkazuje
// na konkrétní událost v kalendáři (`url` = deep-link přes
// `?selected_events[0][id]=…`, ověřeno živě 15. 9. 2026). Rezervace dál
// probíhá jen na WordPressu — pravidlo „statika only" z CLAUDE.md platí.
//
// Proč to nejde staticky: rozvrh se týden od týdne mění (St/Čt sloty 7:00,
// 8:00, 17:00, 18:00 rotují mezi Břišním pekáčem, Silovým, HIIT a Vlastní
// vahou — zjištěno z dat BA za září 2026), takže pevná tabulka „HIIT =
// Čt 7:00" by většinu týdnů lhala.

export const SCHEDULE_API = 'https://studio.bohemi.fit/wp-json/bohemi/v1/schedule';

/** Kolik dní dopředu (dnes + 7). */
export const SCHEDULE_DAYS = 8;

/**
 * BA `activity_id` → `classes[].id` (kotva na /skupinove-lekce/ i na
 * /en/group-classes/). Aktivity, které tu nejsou (Open gym 8, kroužky
 * 25–27, pronájem 21…), rozvrh skupinových lekcí vůbec nevykreslí.
 * ID aktivit odečtené z `activities_data` živého kalendáře 15. 9. 2026 —
 * nová lekce ve WP potřebuje nový řádek tady, jinak se v rozvrhu neobjeví.
 */
export const baActivityToClass: Record<number, string> = {
  1: 'kruhac',
  2: 'hiit',
  3: 'silovy-trenink',
  4: 'vlastni-vaha',
  9: 'supermamky',
  32: 'brisni-pekac',
  34: 'power-zone',
  36: 'solid-booty',
  37: 'enduro',
};

export type ScheduleEvent = {
  id: number;
  activity_id: number;
  title: string;
  /** Lokální čas studia, formát `YYYY-MM-DD HH:MM:SS` (bez zóny). */
  start: string;
  end: string;
  capacity: number;
  available: number;
  bookable: boolean;
  /** Deep-link do kalendáře s touhle událostí už vybranou. */
  url: string;
};

export type ScheduleResponse = {
  generated_at: string;
  timezone: string;
  from: string;
  to: string;
  calendar_url: string;
  activities: Record<string, string>;
  events: ScheduleEvent[];
};
