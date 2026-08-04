<?php
/**
 * BoHeMi header — block pattern content + registration.
 *
 * The header is shipped as a single core/html block. That is a deliberate
 * choice, not a shortcut: core/html is a native, always-valid Gutenberg
 * block, so the pattern can never render as "invalid block" in the Site
 * Editor regardless of WordPress/theme updates, and it gives full control
 * over exact markup/spacing/accessibility attributes to match the Astro
 * header's design tokens. The trade-off: the block is edited as raw HTML
 * rather than as separate sub-blocks — documented in README.md.
 *
 * Unlike the Astro site's header, this one has no collapsible mobile menu
 * (removed 4. 8. 2026) — with only two nav items, they stay directly
 * visible in the top bar at every screen width instead of hiding behind a
 * hamburger/disclosure toggle. See the comment above $nav_items below.
 *
 * @package Bohemi_WP_UI
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Is the given URL "the current page" (for aria-current + active underline)?
 */
function bohemi_wp_ui_is_current_url( string $href ): bool {
	$href_path = untrailingslashit( (string) wp_parse_url( $href, PHP_URL_PATH ) );
	$current   = untrailingslashit( (string) wp_parse_url( home_url( add_query_arg( array() ) ), PHP_URL_PATH ) );

	return '' !== $href_path && $href_path === $current;
}

/**
 * Render one nav link.
 */
function bohemi_wp_ui_nav_link( string $href, string $label, string $class, bool $external = false ): string {
	$current_attr = bohemi_wp_ui_is_current_url( $href ) ? ' aria-current="page"' : '';
	$rel_attr     = $external ? ' target="_blank" rel="noopener noreferrer"' : '';

	return sprintf(
		'<a href="%1$s" class="%2$s"%3$s%4$s>%5$s</a>',
		esc_url( $href ),
		esc_attr( $class ),
		$current_attr,
		$rel_attr,
		esc_html( $label )
	);
}

/**
 * Build the full header markup. Called fresh every time the pattern is
 * fetched (registered on `init`), so URLs and login state reflect whatever
 * is true at that moment — see includes/urls.php for caveats once the
 * markup has been saved into a template part.
 */
function bohemi_wp_ui_get_header_html(): string {
	$main_site = bohemi_wp_ui_main_site_url();
	$account   = bohemi_wp_ui_account_url();

	// "Rezervace lekcí" a "Členství" odstraněny z nav 1. 8. 2026 (Honzovo
	// rozhodnutí) — zůstávají jen jako resolvery v includes/urls.php
	// (booking_url pořád používá patička a includes/cache.php, membership_url
	// zatím nikde jinde), jen v tomhle menu se nezobrazují.
	//
	// Samostatný textový odkaz "Přihlásit se / Odhlásit se" odstraněn
	// 1. 8. 2026 (Honzovo hlášení: v horním menu trvale svítilo "Odhlásit
	// se" i pro odhlášené návštěvníky a klik nefungoval spolehlivě) — jde
	// o zdokumentované omezení, viz README "Přihlášení / Odhlášení":
	// tenhle odkaz se do Šablonové části uloží jako zamrzlý HTML snímek z
	// okamžiku vložení v Site Editoru, takže po čase přestane odpovídat
	// skutečnému stavu přihlášení návštěvníka. "Můj účet" (PMPro account
	// stránka) řeší přihlášení i odhlášení sám a je vykreslovaný živě při
	// každém načtení, takže zůstává jediná (funkční) cesta k oběma akcím.
	// "Hlavní web" otevírá bohemi.fit ve STEJNÉ záložce (1. 8. 2026, Honzovo
	// hlášení — cross-domain odkazy v obou směrech mají zůstat v jedné
	// záložce, ne otvírat nová okna) — proto `false`, ne `true`.
	//
	// Oba odkazy jsou od 4. 8. 2026 natrvalo vidět v horní liště na všech
	// šířkách obrazovky (viz .bohemi-header-nav v header.css) — dřív byly na
	// mobilu schované za hamburger/rozbalovací panel (<details>). Honza
	// nahlásil (screenshot z telefonu), že se dvě tak krátké položky nemají
	// schovávat za extra klik, mají být vidět "na první dobrou". Hamburger
	// markup (.bohemi-header-mobile, <details>) i jeho JS (header.js) byly
	// proto smazané, ne jen skryté — s jedním viditelným <nav> pro obě šířky
	// nemá co dělat.
	//
	// "Hlavní web" dostal navíc (4. 8. 2026, Honzovo přání) lehký button/pill
	// look, aby vizuálně vynikl jako cesta ZPÁTKY z portálu na marketingový
	// web — inspirováno tvarem Astro "Rezervovat" CTA (`Button.astro`
	// variant="brand": plná pilulka), ale záměrně tlumenější: jen obrys,
	// bez červené výplně, protože tohle není konverzní CTA a červená na webu
	// patří jen skutečným akcím (CLAUDE.md pravidlo 4). "Můj účet" zůstává
	// prostý textový odkaz jako dřív — modifier `bohemi-header-link--home`
	// se přidává jen k prvnímu odkazu, ne k oběma.
	$nav_items = array(
		array( $main_site, __( 'Hlavní web', 'bohemi-wp-ui' ), false, true ),
		array( $account, __( 'Můj účet', 'bohemi-wp-ui' ), false, false ),
	);

	$logo_url = trailingslashit( BOHEMI_WP_UI_URL ) . 'assets/images/logo-bohemi.png';

	ob_start();
	?>
<header class="bohemi-header">
	<div class="bohemi-header-inner">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="bohemi-header-logo" aria-label="<?php esc_attr_e( 'BoHeMi — domů', 'bohemi-wp-ui' ); ?>">
			<img
				src="<?php echo esc_url( $logo_url ); ?>"
				width="164" height="102"
				alt="BoHeMi fitness"
				class="bohemi-header-logo-img"
				loading="eager" decoding="async"
			/>
			<span class="bohemi-header-wordmark">BoHeMi</span>
		</a>

		<span class="bohemi-header-tagline">Body · Health · Mind</span>

		<nav class="bohemi-header-nav" aria-label="<?php esc_attr_e( 'Hlavní navigace', 'bohemi-wp-ui' ); ?>">
			<?php foreach ( $nav_items as [ $href, $label, $external, $is_home ] ) : ?>
				<?php
				$link_class = 'bohemi-header-link' . ( $is_home ? ' bohemi-header-link--home' : '' );
				echo bohemi_wp_ui_nav_link( $href, $label, $link_class, $external );
				?>
			<?php endforeach; ?>
		</nav>
	</div>
</header>
	<?php
	return trim( (string) ob_get_clean() );
}

/**
 * Register the pattern + its category on init (per-request, so the markup
 * above always reflects live URLs/login state at insertion time).
 */
function bohemi_wp_ui_register_pattern(): void {
	if ( ! function_exists( 'register_block_pattern' ) ) {
		return;
	}

	register_block_pattern_category(
		'bohemi-header',
		array( 'label' => __( 'BoHeMi', 'bohemi-wp-ui' ) )
	);

	$html = bohemi_wp_ui_get_header_html();

	register_block_pattern(
		'bohemi-wp-ui/header',
		array(
			'title'         => __( 'BoHeMi — Header', 'bohemi-wp-ui' ),
			'description'   => __( 'BoHeMi header vizuálně sladěný s hlavním Astro webem. Vlož do šablonové části Záhlaví.', 'bohemi-wp-ui' ),
			'categories'    => array( 'bohemi-header', 'header' ),
			'blockTypes'    => array( 'core/template-part/header' ),
			'content'       => "<!-- wp:html -->\n{$html}\n<!-- /wp:html -->",
			'viewportWidth' => 1220,
		)
	);
}
add_action( 'init', 'bohemi_wp_ui_register_pattern' );
