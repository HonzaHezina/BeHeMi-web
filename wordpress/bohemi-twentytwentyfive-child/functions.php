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
		'</div>' .
	'</footer>';

	return "<!-- wp:html -->\n{$html}\n<!-- /wp:html -->";
}
