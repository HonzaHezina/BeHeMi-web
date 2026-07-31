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

add_action('wp_enqueue_scripts', function () {
    $path = get_stylesheet_directory() . '/assets/css/bohemi.css';

    wp_enqueue_style(
        'bohemi-style',
        get_stylesheet_directory_uri() . '/assets/css/bohemi.css',
        array(),
        file_exists($path) ? (string) filemtime($path) : '1.1'
    );
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
            'categories'    => array('bohemi-header'),
            'blockTypes'    => array('core/template-part/footer'),
            'content'       => bohemi_wp_final_child_get_footer_html(),
            'viewportWidth' => 1220,
        )
    );
});

/**
 * Renders a `<a>` list joined by `<br>`, same shape as Astro's Footer.astro
 * `webLinks`/`serviceLinks` columns. `$external = true` marks cross-domain
 * links (target=_blank), used for every link that points at bohemi.fit,
 * since studio.bohemi.fit is a different site.
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
		),
		true
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
		),
		true
	);

	$html = '<footer class="bohemi-footer">' .
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
	'</footer>';

	return "<!-- wp:html -->\n{$html}\n<!-- /wp:html -->";
}
