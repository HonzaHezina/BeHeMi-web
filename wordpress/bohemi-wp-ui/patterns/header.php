<?php
/**
 * BoHeMi header — block pattern content + registration.
 *
 * The header is shipped as a single core/html block. That is a deliberate
 * choice, not a shortcut: core/html is a native, always-valid Gutenberg
 * block, so the pattern can never render as "invalid block" in the Site
 * Editor regardless of WordPress/theme updates, and it lets us reproduce
 * the Astro header's bespoke <details>/<summary> disclosure menu and exact
 * accessibility behaviour (aria-expanded, aria-controls, Escape-to-close)
 * pixel-for-pixel. The trade-off: the block is edited as raw HTML rather
 * than as separate sub-blocks — documented in README.md.
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
 * Render one nav link (used for both the desktop row and the mobile panel).
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
	$booking   = bohemi_wp_ui_booking_url();
	$members   = bohemi_wp_ui_membership_url();
	$account   = bohemi_wp_ui_account_url();
	$reserve   = bohemi_wp_ui_reserve_url();
	$auth      = bohemi_wp_ui_auth_link();

	$nav_items = array(
		array( $main_site, __( 'Hlavní web', 'bohemi-wp-ui' ), true ),
		array( $booking, __( 'Rezervace lekcí', 'bohemi-wp-ui' ), false ),
		array( $members, __( 'Členství', 'bohemi-wp-ui' ), false ),
		array( $account, __( 'Můj účet', 'bohemi-wp-ui' ), false ),
	);

	$logo_url = trailingslashit( BOHEMI_WP_UI_URL ) . 'assets/images/logo-bohemi.png';

	ob_start();
	?>
<header class="bohemi-header">
	<div class="bohemi-header-inner">
		<a href="<?php echo esc_url( $main_site ); ?>" class="bohemi-header-logo" aria-label="<?php esc_attr_e( 'BoHeMi — přejít na hlavní web', 'bohemi-wp-ui' ); ?>">
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
			<?php foreach ( $nav_items as [ $href, $label, $external ] ) : ?>
				<?php echo bohemi_wp_ui_nav_link( $href, $label, 'bohemi-header-link', $external ); ?>
			<?php endforeach; ?>
			<?php echo bohemi_wp_ui_nav_link( $auth['href'], $auth['label'], 'bohemi-header-link bohemi-header-link--auth' ); ?>
			<a href="<?php echo esc_url( $reserve ); ?>" class="bohemi-header-cta">
				<?php esc_html_e( 'Rezervovat', 'bohemi-wp-ui' ); ?>
			</a>
		</nav>

		<div class="bohemi-header-mobile">
			<a href="<?php echo esc_url( $reserve ); ?>" class="bohemi-header-cta bohemi-header-cta--mobile">
				<?php esc_html_e( 'Rezervovat', 'bohemi-wp-ui' ); ?>
			</a>
			<details class="bohemi-header-toggle">
				<summary
					class="bohemi-header-toggle-btn"
					aria-controls="bohemi-header-menu-panel"
					aria-expanded="false"
					aria-label="<?php esc_attr_e( 'Otevřít menu', 'bohemi-wp-ui' ); ?>"
				>
					<svg class="bohemi-header-icon-open" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
					<svg class="bohemi-header-icon-close" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
				</summary>
				<nav id="bohemi-header-menu-panel" class="bohemi-header-mobile-panel" aria-label="<?php esc_attr_e( 'Hlavní navigace', 'bohemi-wp-ui' ); ?>">
					<?php foreach ( $nav_items as [ $href, $label, $external ] ) : ?>
						<?php echo bohemi_wp_ui_nav_link( $href, $label, 'bohemi-header-mobile-link', $external ); ?>
					<?php endforeach; ?>
					<div class="bohemi-header-mobile-divider"></div>
					<?php echo bohemi_wp_ui_nav_link( $auth['href'], $auth['label'], 'bohemi-header-mobile-link' ); ?>
				</nav>
			</details>
		</div>
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
