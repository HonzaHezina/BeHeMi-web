<?php
/**
 * Header comes from the bohemi-wp-ui plugin's block pattern, not from a
 * parts/header.html here — this child theme intentionally has no header
 * template part, so the site inherits Twenty Twenty-Five's default one
 * until the bohemi-wp-ui pattern is inserted (works the same whether this
 * child theme is active or not). See wordpress/README.md.
 *
 * Footer works the same way, on purpose (consistency requested by Honza,
 * 20. 7. 2026): a plain insertable pattern in the "BoHeMi" category, not a
 * real Template Part — see bohemi_wp_final_child_get_footer_html() below.
 * Trade-off: because it's an unsynced pattern, each page template gets its
 * own independent copy when you insert it — editing one later does NOT
 * update the others. If that becomes annoying, this can be converted to a
 * real shared Template Part later (see wordpress/README.md history).
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
            'title'       => __('BoHeMi — Footer', 'bohemi-twentytwentyfive-child'),
            'description' => __('BoHeMi patička — kontakt, mapa, otevírací doba, odkazy, právní stránky.', 'bohemi-twentytwentyfive-child'),
            'categories'  => array('bohemi-header'),
            'content'     => bohemi_wp_final_child_get_footer_html(),
        )
    );
});

function bohemi_wp_final_child_get_footer_html(): string {
    $html = <<<'HTML'
<footer class="bohemi-footer">
	<div class="bohemi-footer-grid">
		<div class="bohemi-footer-col">
			<p class="bohemi-footer-brand">BoHeMi <span class="bohemi-footer-tagline">Body · Health · Mind</span></p>
			<p>Rezervační a členský systém studia BoHeMi fitness na Vinohradech.</p>
		</div>
		<div class="bohemi-footer-col">
			<p class="bohemi-footer-heading">Kontakt</p>
			<p><a href="tel:+420603989762">+420 603 989 762</a><br><a href="mailto:info@bohemi.fit">info@bohemi.fit</a><br>Vinohradská 1438/70, Praha 3</p>
			<p><a href="https://www.google.com/maps/search/?api=1&amp;query=Vinohradsk%C3%A1%201438%2F70%2C%20Praha%203" target="_blank" rel="noopener noreferrer">Zobrazit na mapě →</a></p>
		</div>
		<div class="bohemi-footer-col">
			<p class="bohemi-footer-heading">Odkazy</p>
			<p><a href="https://bohemi.fit/">Hlavní web</a><br><a href="/">Rezervace lekcí</a><br><a href="/ucet-clenstvi/">Můj účet</a></p>
		</div>
		<div class="bohemi-footer-col">
			<p class="bohemi-footer-heading">Otevírací doba</p>
			<p>Po — Pá: dle rozvrhu</p>
			<p class="bohemi-footer-social"><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a> · <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a></p>
		</div>
	</div>
	<div class="bohemi-footer-bottom">
		<p>© BoHeMi fitness s.r.o. · IČ 19115296 · Všechna práva vyhrazena.</p>
		<p class="bohemi-footer-legal"><a href="/vseobecne-obchodni-podminky/">Obchodní podmínky</a> · <a href="/zpracovani-osobnich-udaju/">Zpracování osobních údajů</a> · <a href="/provozni-rad/">Provozní řád</a></p>
	</div>
</footer>
HTML;

    return "<!-- wp:html -->\n{$html}\n<!-- /wp:html -->";
}
