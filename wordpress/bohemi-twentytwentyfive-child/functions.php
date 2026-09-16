<?php
/**
 * Header comes from the bohemi-wp-ui plugin's block pattern, not from a
 * parts/header.html here — this child theme intentionally has no header
 * template part, so the site inherits Twenty Twenty-Five's default one
 * until the bohemi-wp-ui pattern is inserted (works the same whether this
 * child theme is active or not). See wordpress/README.md.
 *
 * Footer works the same way NOW (reversed 31. 7. 2026, see wordpress/README.md
 * "Patička — zpět na Část šablony"): the pattern below is meant to be
 * inserted ONCE into the shared Footer template part (Vzhled → Editor →
 * Šablonové části → Patička), exactly like the header goes into the shared
 * Header template part — NOT pasted into individual page templates. Between
 * 20. 7. 2026 and 31. 7. 2026 it was deliberately a per-template pattern
 * (Honza's call, for insertion-UI consistency with the header); he later
 * decided he wanted true one-edit-updates-everywhere behaviour instead, like
 * the header already has, so that trade-off was reverted.
 */

/**
 * `enqueue_block_assets` (not `wp_enqueue_scripts`) on purpose — it fires on
 * BOTH the front end and inside the block editor / Site Editor, same as the
 * bohemi-wp-ui plugin already does for its own header.css (see that plugin's
 * bohemi_wp_ui_enqueue_assets()). Before this fix `bohemi.css` only loaded on
 * the front end, so the Site Editor preview showed the header pattern styled
 * (plugin CSS present) but the footer pattern, `.bohemi-panel` account/
 * reservation patterns, and PMPro/Booking Activities boxes completely
 * unstyled (raw HTML, no bohemi.css) — the two never actually had different
 * design tokens, they just loaded in different places. See wordpress/README.md
 * "Editor preview — theme a plugin CSS nebyly sladěné".
 */
add_action('enqueue_block_assets', function () {
    $path = get_stylesheet_directory() . '/assets/css/bohemi.css';

    wp_enqueue_style(
        'bohemi-style',
        get_stylesheet_directory_uri() . '/assets/css/bohemi.css',
        array(),
        file_exists($path) ? (string) filemtime($path) : '1.1'
    );
});

/**
 * PMPro enqueues WordPress core's password-strength-meter (zxcvbn.min.js,
 * ~400 KB uncompressed) on every front-end page, in case its account
 * shortcode's password-change form appears there — but on this site that
 * shortcode only ever lives on the "Můj účet" page. Dequeue everywhere else
 * (1. 8. 2026, WebPageTest audit flagged it as the single largest asset on
 * pages that don't even have a password field). Priority 100 = after PMPro's
 * own enqueue call, so this actually removes it instead of racing it.
 */
add_action('wp_enqueue_scripts', function () {
    if (is_page('ucet-clenstvi')) {
        return;
    }

    wp_dequeue_script('zxcvbn-async');
    wp_dequeue_script('password-strength-meter');
}, 100);

/**
 * Single login/registration front door for `/ucet-clenstvi/` (5. 8. 2026).
 *
 * Honza had THREE things fighting over the same job: `[pmpro_login]`
 * (login only) and `[bookingactivities_login form="3"]` (Honza confirmed
 * "3" is a REGISTRATION-only form, no login fields — first assumed
 * otherwise) sat together on a standalone "Log In" page, while
 * `[pmpro_account]` on `/ucet-clenstvi/` renders its OWN login form when
 * logged out. Two different login UIs for the same WP session is the
 * "mlátí se to" confusion.
 *
 * Landed design (Honza's call, weighing "BA registration fields are
 * already tuned, don't redo that work" against "I'll likely drop Booking
 * Activities at some point, don't wire login through a plugin I plan to
 * replace"): **login is plugin-independent** (plain WP `wp_signon()`),
 * plus a "lost password" link. **Registration stays on Booking Activities'
 * form "3"** (fields already tuned; if Booking Activities is ever
 * replaced, the registration UI needs redoing anyway regardless of what
 * it's built on today — see wordpress/README.md "Sjednocení loginu" for
 * the full reasoning). PMPro never renders its own login/registration UI
 * anywhere, only the dashboard half of `[pmpro_account]` once logged in.
 *
 * First cut used core `wp_login_form()`, which posts to the real
 * `wp-login.php` — confirmed live (5. 8. 2026) that submitting it with
 * correct credentials on `/login/` never actually logged Honza in, just
 * reloaded the login form. Most likely cause: some "hide/rename
 * wp-login.php" security measure intercepting direct wp-login.php
 * requests (can't confirm without wp-admin access, and it's also exactly
 * why `/login/` existed as a mystery URL in the first place — see
 * README). Rather than chase that down, authentication now happens
 * in-page: the form posts to itself, `wp_signon()` runs on
 * `template_redirect` (before any output), so this never touches
 * wp-login.php at all — immune to whatever that mechanism is doing, and
 * matches Honza's "don't wire login through something I don't control"
 * preference even better than `wp_login_form()` did.
 *
 * Replace `/ucet-clenstvi/`'s page content — currently
 * `[bookingactivities_list ...]` + `[pmpro_account]` — with just
 * `[bohemi_account]`. The standalone "Log In" page becomes redundant once
 * this is live; trash it or 301 it to `/ucet-clenstvi/`.
 */
add_action('template_redirect', function () {
    if ('POST' !== $_SERVER['REQUEST_METHOD'] || ! isset($_POST['bohemi_login'])) {
        return;
    }

    if (! isset($_POST['bohemi_login_nonce']) || ! wp_verify_nonce($_POST['bohemi_login_nonce'], 'bohemi_login')) {
        return;
    }

    $redirect_to = ! empty($_POST['redirect_to'])
        ? wp_validate_redirect(wp_unslash($_POST['redirect_to']), home_url('/ucet-clenstvi/'))
        : home_url('/ucet-clenstvi/');

    $user = wp_signon(array(
        'user_login'    => isset($_POST['log']) ? sanitize_user(wp_unslash($_POST['log'])) : '',
        'user_password' => isset($_POST['pwd']) ? wp_unslash($_POST['pwd']) : '',
        'remember'      => ! empty($_POST['rememberme']),
    ));

    if (is_wp_error($user)) {
        wp_safe_redirect(add_query_arg('bohemi_login_error', '1', wp_get_referer() ?: home_url('/ucet-clenstvi/')));
        exit;
    }

    wp_safe_redirect($redirect_to);
    exit;
});

add_shortcode('bohemi_account', function () {
    if (is_user_logged_in()) {
        return do_shortcode('[bookingactivities_list columns="events,quantity,creation_date,status,actions"]')
            . do_shortcode('[pmpro_account]');
    }

    $redirect_to = home_url('/ucet-clenstvi/');
    if (! empty($_GET['redirect_to'])) {
        $redirect_to = wp_validate_redirect(wp_unslash($_GET['redirect_to']), $redirect_to);
    }

    $error_notice = '';
    if (! empty($_GET['bohemi_login_error'])) {
        $error_notice = '<p class="bohemi-login-error">Nesprávné uživatelské jméno nebo heslo.</p>';
    }

    $login_form = sprintf(
        '<form name="loginform" id="loginform" method="post" action="%1$s">
            %2$s
            <p class="login-username">
                <label for="user_login">Uživatelské jméno nebo e-mail</label>
                <input type="text" name="log" id="user_login" autocomplete="username" class="input" value="" size="20" />
            </p>
            <p class="login-password">
                <label for="user_pass">Heslo</label>
                <input type="password" name="pwd" id="user_pass" autocomplete="current-password" class="input" value="" size="20" />
            </p>
            <p class="login-remember">
                <label for="rememberme"><input name="rememberme" type="checkbox" id="rememberme" value="forever" checked="checked" /> Pamatovat si mě</label>
            </p>
            <p class="login-submit">
                <input type="submit" name="wp-submit" id="wp-submit" class="button button-primary" value="Přihlásit se" />
                <input type="hidden" name="redirect_to" value="%3$s" />
                <input type="hidden" name="bohemi_login" value="1" />
                %4$s
            </p>
        </form>',
        esc_url(get_permalink()),
        $error_notice,
        esc_attr($redirect_to),
        wp_nonce_field('bohemi_login', 'bohemi_login_nonce', true, false)
    );

    $lost_password = sprintf(
        '<p class="bohemi-lost-password"><a href="%s">Zapomněli jste heslo?</a></p>',
        esc_url(wp_lostpassword_url())
    );

    return $login_form . $lost_password . do_shortcode('[bookingactivities_login form="3"]');
});

/**
 * Same category slug as the bohemi-wp-ui plugin ("bohemi-header") on
 * purpose — WordPress groups patterns by slug, not by label, so reusing it
 * merges header + footer + content patterns into ONE "BoHeMi" folder in
 * the inserter instead of two confusingly-identical-looking folders.
 */
add_action('init', function () {
    register_block_pattern_category('bohemi-header', array(
        'label' => __('BoHeMi', 'bohemi-twentytwentyfive-child'),
    ));

    register_block_pattern(
        'bohemi-twentytwentyfive-child/footer',
        array(
            'title'         => __('BoHeMi — Footer', 'bohemi-twentytwentyfive-child'),
            'description'   => __('BoHeMi patička — kontakt, mapa, otevírací doba, odkazy, právní stránky. Vlož do šablonové části Patička (stejně jako header).', 'bohemi-twentytwentyfive-child'),
            'categories'    => array('bohemi-header', 'footer'),
            'blockTypes'    => array('core/template-part/footer'),
            'content'       => bohemi_wp_final_child_get_footer_html(),
            'viewportWidth' => 1220,
        )
    );
});

/**
 * Renders a `<a>` list joined by `<br>`, same shape as Astro's Footer.astro
 * `webLinks`/`serviceLinks` columns. `$external` used to mark cross-domain
 * links (target=_blank) for every link pointing at bohemi.fit — dropped
 * 1. 8. 2026 (Honza: cross-domain navigation should stay in one tab in both
 * directions, same as the Astro-side "Rezervovat" links to studio.bohemi.fit).
 * Parameter kept for future reuse, just unused by current call sites below.
 *
 * @param array<array{0:string,1:string}> $links Pairs of [label, href].
 */
function bohemi_wp_final_child_footer_link_list( array $links, bool $external = false ): string {
	$rel_attr = $external ? ' target="_blank" rel="noopener noreferrer"' : '';

	return implode(
		'<br>',
		array_map(
			function ( array $link ) use ( $rel_attr ): string {
				[ $label, $href ] = $link;
				return sprintf( '<a href="%s"%s>%s</a>', esc_url( $href ), $rel_attr, esc_html( $label ) );
			},
			$links
		)
	);
}

/**
 * Footer markup — column-for-column mirror of `src/components/Footer.astro`
 * (Brand+CTA / Web / Služby / Kontakt), so both sites *look and behave* the
 * same (Honza, 31. 7. 2026). Only the link TARGETS differ: "Web" and
 * "Služby" point at `bohemi.fit` (those marketing pages don't exist on this
 * WP install), and "Kontakt" gets two extra WP-only lines (Můj účet,
 * Rezervace lekcí) folded in rather than a separate 5th column, so the grid
 * stays 4 columns like Astro's.
 */
function bohemi_wp_final_child_get_footer_html(): string {
	$main_site = function_exists( 'bohemi_wp_ui_main_site_url' ) ? bohemi_wp_ui_main_site_url() : 'https://bohemi.fit/';
	$reserve   = function_exists( 'bohemi_wp_ui_reserve_url' ) ? bohemi_wp_ui_reserve_url() : home_url( '/' );
	$booking   = function_exists( 'bohemi_wp_ui_booking_url' ) ? bohemi_wp_ui_booking_url() : home_url( '/' );
	$account   = function_exists( 'bohemi_wp_ui_account_url' ) ? bohemi_wp_ui_account_url() : home_url( '/' );

	// Same 6 items, same order as Astro Footer.astro `webLinks` (CZ).
	$web_links = bohemi_wp_final_child_footer_link_list(
		array(
			array( 'Proč BoHeMi', $main_site . 'proc-bohemi/' ),
			array( 'Lekce a služby', $main_site . 'lekce-a-sluzby/' ),
			array( 'Program 8 týdnů', $main_site . 'program-8-tydnu/' ),
			array( 'Ceník', $main_site . 'cenik/' ),
			array( 'Fotky', $main_site . 'fotky/' ),
			array( 'Kontakt', $main_site . 'kontakt/' ),
		)
	);

	// Same 8 items, same order as Astro Footer.astro `serviceLinks` (CZ).
	$service_links = bohemi_wp_final_child_footer_link_list(
		array(
			array( 'Skupinové lekce', $main_site . 'skupinove-lekce/' ),
			array( 'Kroužky pro děti', $main_site . 'krouzky-pro-deti/' ),
			array( 'Supermamky', $main_site . 'supermamky/' ),
			array( 'Open gym', $main_site . 'open-gym/' ),
			array( 'Fotobiomodulace', $main_site . 'fotobiomodulacni-terapie/' ),
			array( 'Osobní tréninky', $main_site . 'osobni-treninky/' ),
			array( 'Pronájem sálů', $main_site . 'pronajem-salu/' ),
			array( 'Pro firmy', $main_site . 'firmy/' ),
		)
	);

	$html = '<footer class="bohemi-footer">' .
		'<div class="bohemi-footer-inner">' .
		'<div class="bohemi-footer-grid">' .
			'<div class="bohemi-footer-col bohemi-footer-col--brand">' .
				'<p class="bohemi-footer-brand">BoHeMi <span class="bohemi-footer-tagline">Body · Health · Mind</span></p>' .
				'<p>Rezervační a členský systém studia BoHeMi fitness na Vinohradech.</p>' .
				sprintf( '<a href="%s" class="bohemi-footer-cta">Rezervovat lekci →</a>', esc_url( $reserve ) ) .
			'</div>' .
			'<div class="bohemi-footer-col">' .
				'<p class="bohemi-footer-heading">Web</p>' .
				"<p>{$web_links}</p>" .
			'</div>' .
			'<div class="bohemi-footer-col">' .
				'<p class="bohemi-footer-heading">Služby</p>' .
				"<p>{$service_links}</p>" .
			'</div>' .
			'<div class="bohemi-footer-col">' .
				'<p class="bohemi-footer-heading">Kontakt</p>' .
				'<p><a href="tel:+420603989762">+420 603 989 762</a><br><a href="mailto:info@bohemi.fit">info@bohemi.fit</a><br>Vinohradská 1438/70, Praha 3</p>' .
				'<p><a href="https://www.google.com/maps/search/?api=1&amp;query=Vinohradsk%C3%A1%201438%2F70%2C%20Praha%203" target="_blank" rel="noopener noreferrer">Zobrazit na mapě →</a></p>' .
				sprintf(
					'<p><a href="%s">Rezervace lekcí</a><br><a href="%s">Můj účet</a></p>',
					esc_url( $booking ),
					esc_url( $account )
				) .
				'<p class="bohemi-footer-heading bohemi-footer-heading--sub">Otevírací doba</p>' .
				'<p>Po — Pá: dle rozvrhu</p>' .
				'<p class="bohemi-footer-social"><a href="https://www.facebook.com/people/Bohemi-fitness/100090517103019/" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.instagram.com/bohemi.fit/" target="_blank" rel="noopener noreferrer">Instagram</a></p>' .
			'</div>' .
		'</div>' .
		'<div class="bohemi-footer-bottom">' .
			'<p>© BoHeMi fitness s.r.o. · IČ 19115296 · Všechna práva vyhrazena.</p>' .
			'<p class="bohemi-footer-legal"><a href="/vseobecne-obchodni-podminky/">Obchodní podmínky</a> · <a href="/zpracovani-osobnich-udaju/">Zpracování osobních údajů</a> · <a href="/provozni-rad/">Provozní řád</a></p>' .
		'</div>' .
		'<p class="bohemi-footer-credits">Rezervace a členství tu běží na <a href="https://wordpress.org/" target="_blank" rel="noopener">WordPressu</a>. Kalendář obstarává <a href="https://wordpress.org/plugins/booking-activities/" target="_blank" rel="noopener">Booking Activities</a>, členství <a href="https://www.paidmembershipspro.com/" target="_blank" rel="noopener">Paid Memberships Pro</a>. Oboje doporučujeme.</p>' .
		'</div>' .
	'</footer>';

	return "<!-- wp:html -->\n{$html}\n<!-- /wp:html -->";
}

/**
 * ---------------------------------------------------------------------------
 * Read-only rozvrh pro bohemi.fit (15. 9. 2026)
 * ---------------------------------------------------------------------------
 * GET https://studio.bohemi.fit/wp-json/bohemi/v1/schedule?days=8
 *
 * Vrací lekce na příštích N dní přesně tak, jak je vidí veřejný rezervační
 * kalendář (formulář Booking Activities č. 1 — stejné kalendáře, stejný filtr
 * aktivit, stejná pravidla „kdy se dá ještě rezervovat"). Astro web na
 * bohemi.fit z toho na /skupinove-lekce/ vykresluje rozvrh na příštích
 * 7 dní s počtem volných míst a odkazem přímo na konkrétní událost. Nic
 * nezapisuje, žádný stav uživatele — rezervace samotná dál probíhá jen tady
 * na WordPressu.
 *
 * Deep-link na událost NEPOTŘEBUJE žádný vlastní kód: Booking Activities už
 * čte `$_REQUEST['selected_events']` v
 * bookacti_get_calendar_field_booking_system_attributes(), takže
 *   /?selected_events[0][id]=4116&selected_events[0][start]=2026-09-16 07:00:00&selected_events[0][end]=2026-09-16 08:00:00
 * otevře kalendář s tou lekcí už vybranou (ověřeno živě 15. 9. 2026, BA 1.15.20).
 * Endpoint tuhle URL rovnou vrací v poli `url`, ať ji Astro neskládá samo.
 *
 * Odpověď je 60 s v transientu (Wedos hosting je nestabilní, DB dotazů BA
 * není málo) + `Cache-Control: public, max-age=120`, takže i Cloudflare /
 * prohlížeč ji chvíli podrží. Stejná data jsou už dnes veřejně v HTML
 * homepage (inline JSON booking systému) — endpoint nic nového neodhaluje.
 */
const BOHEMI_SCHEDULE_FORM_ID = 1;

add_action('rest_api_init', function () {
    register_rest_route('bohemi/v1', '/schedule', array(
        'methods'             => 'GET',
        'permission_callback' => '__return_true',
        'args'                => array(
            'days' => array(
                'default'           => 8,
                'sanitize_callback' => function ($value) {
                    return max(1, min(31, intval($value)));
                },
            ),
        ),
        'callback'            => 'bohemi_wp_final_child_rest_schedule',
    ));
});

function bohemi_wp_final_child_rest_schedule(WP_REST_Request $request) {
    $days = (int) $request->get_param('days');

    if (! function_exists('bookacti_get_booking_system_data') || ! function_exists('bookacti_get_calendar_field_booking_system_attributes')) {
        return new WP_Error('bohemi_ba_missing', 'Booking Activities není aktivní.', array('status' => 503));
    }

    $cache_key = 'bohemi_schedule_' . $days;
    $payload   = get_transient($cache_key);

    if (! is_array($payload)) {
        $payload = bohemi_wp_final_child_build_schedule($days);
        set_transient($cache_key, $payload, MINUTE_IN_SECONDS);
    }

    $response = new WP_REST_Response($payload, 200);
    $response->header('Cache-Control', 'public, max-age=120');
    return $response;
}

function bohemi_wp_final_child_build_schedule(int $days): array {
    $tz_name  = bookacti_get_setting_value('bookacti_general_settings', 'timezone');
    $timezone = new DateTimeZone($tz_name ? $tz_name : 'Europe/Prague');
    $now      = new DateTime('now', $timezone);
    $from     = (clone $now)->setTime(0, 0, 0);
    $to       = (clone $from)->modify('+' . ($days - 1) . ' days')->setTime(23, 59, 59);
    $from_str = $from->format('Y-m-d H:i:s');
    $to_str   = $to->format('Y-m-d H:i:s');

    // Stejné atributy jako veřejný kalendář ve formuláři č. 1 (kalendáře,
    // aktivity, trim, past_events…) — jediný zdroj pravdy, nic se tu neopisuje.
    $calendar_field = function_exists('bookacti_get_form_field_data_by_name')
        ? bookacti_get_form_field_data_by_name(BOHEMI_SCHEDULE_FORM_ID, 'calendar')
        : array();
    $atts = bookacti_get_calendar_field_booking_system_attributes(is_array($calendar_field) ? $calendar_field : array());

    $atts['auto_load']           = 1;
    $atts['past_events']         = 0;
    $atts['events_min_interval'] = array('start' => $from_str, 'end' => $to_str);

    $data = bookacti_get_booking_system_data($atts);

    $events = array();
    foreach ((array) (isset($data['events']) ? $data['events'] : array()) as $event) {
        if (empty($event['id']) || empty($event['start'])) {
            continue;
        }
        if ($event['start'] < $from_str || $event['start'] > $to_str) {
            continue;
        }

        $event_data = isset($data['events_data'][$event['id']]) ? $data['events_data'][$event['id']] : array();
        $capacity   = isset($event_data['availability']) ? (int) $event_data['availability'] : 0;
        // Kapacita 0 = událost, která se přes kalendář rezervovat nedá
        // (pronájmy sálů, semestrální kroužky přes členství) — na web nepatří.
        if ($capacity <= 0) {
            continue;
        }

        $booking = isset($data['bookings'][$event['id']][$event['start']]) ? $data['bookings'][$event['id']][$event['start']] : null;
        if (is_array($booking)) {
            $available = isset($booking['availability']) ? (int) $booking['availability'] : $capacity;
            $capacity  = isset($booking['total_availability']) ? (int) $booking['total_availability'] : $capacity;
        } else {
            $available = $capacity;
        }

        $end = isset($event['end']) ? (string) $event['end'] : '';

        $events[] = array(
            'id'          => (int) $event['id'],
            'activity_id' => isset($event['activity_id']) ? (int) $event['activity_id'] : 0,
            'title'       => isset($event['title']) ? (string) $event['title'] : '',
            'start'       => (string) $event['start'],
            'end'         => $end,
            'capacity'    => $capacity,
            'available'   => max(0, $available),
            'bookable'    => ! empty($event['is_available']) && $available > 0,
            // http_build_query, ne add_query_arg — to hodnoty neenkóduje (mezera
            // v datu by zůstala v URL syrová); enkódované závorky BA čte v pohodě.
            'url'         => home_url('/') . '?' . http_build_query(array(
                'selected_events' => array(array(
                    'id'    => (int) $event['id'],
                    'start' => (string) $event['start'],
                    'end'   => $end,
                )),
            )),
        );
    }

    usort($events, function ($a, $b) {
        return strcmp($a['start'], $b['start']);
    });

    $activities = array();
    foreach ((array) (isset($data['activities_data']) ? $data['activities_data'] : array()) as $id => $activity) {
        $activities[(int) $id] = isset($activity['title']) ? (string) $activity['title'] : '';
    }

    return array(
        'generated_at' => $now->format(DATE_ATOM),
        'timezone'     => $timezone->getName(),
        'from'         => $from->format('Y-m-d'),
        'to'           => $to->format('Y-m-d'),
        'calendar_url' => home_url('/'),
        'activities'   => $activities,
        'events'       => $events,
    );
}

/**
 * CORS pro endpoint výš: WP posílá `Access-Control-Allow-Origin` jen pro
 * originy z `allowed_http_origins` (default = jen vlastní home/site URL).
 * bohemi.fit je stejný provozovatel, localhost:4321 je Astro dev server.
 */
add_filter('allowed_http_origins', function (array $origins): array {
    return array_merge($origins, array(
        'https://bohemi.fit',
        'https://www.bohemi.fit',
        'http://localhost:4321',
    ));
});

/**
 * noindex na celém studio.bohemi.fit kromě právních stránek (15. 9. 2026,
 * podnět z externího auditu prodejní cesty). studio.bohemi.fit je rezervační
 * aplikace, ne prezentace — když ho Google indexuje, posílá lidi z brandových
 * dotazů rovnou do kalendáře místo na bohemi.fit, kde je popis lekcí, ceník
 * a rozvrh. Právní stránky (VOP, GDPR, provozní řád, obchodní podmínky
 * pronájmu/akademie) zůstávají indexovatelné — bohemi.fit na ně 301kuje
 * (docs/redirect-map.md, sekce LEGAL) a jinde neexistují.
 */
add_filter('wp_robots', function (array $robots): array {
    if (is_admin()) {
        return $robots;
    }

    $legal_slugs = array(
        'vseobecne-obchodni-podminky',
        'zpracovani-osobnich-udaju',
        'provozni-rad',
        'obchodni-podminky-pronajmu-prostor',
        'obchodni-podminky-akademie-clp',
    );

    $post = get_queried_object();
    $slug = ($post instanceof WP_Post) ? $post->post_name : '';

    if ($slug && (in_array($slug, $legal_slugs, true) || 0 === strpos($slug, 'obchodni-podminky'))) {
        return $robots;
    }

    $robots['noindex'] = true;
    unset($robots['max-image-preview']);
    return $robots;
});

/**
 * Poslední anglické zbytky Booking Activities, které český jazykový balíček
 * nepokrývá (ověřeno v `bookacti_localized` na živém webu 15. 9. 2026).
 * Ostatní BA řetězce („Načítání", „Položky", „Cena"…) už česky jsou.
 */
add_filter('gettext', function (string $translation, string $text, string $domain): string {
    if ('booking-activities' !== $domain) {
        return $translation;
    }

    $map = array(
        'Send'                                  => 'Odeslat',
        'Please enter {nb} or more characters.' => 'Zadejte alespoň {nb} znaky.',
    );

    return (isset($map[$text]) && $translation === $text) ? $map[$text] : $translation;
}, 10, 3);
