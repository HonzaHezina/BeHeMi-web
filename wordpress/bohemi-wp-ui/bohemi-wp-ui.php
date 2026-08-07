<?php
/**
 * Plugin Name:       BoHeMi WP UI
 * Plugin URI:        https://bohemi.fit/
 * Description:       Vlastní hlavička pro studio.bohemi.fit vizuálně sladěná s hlavním Astro webem (bohemi.fit). Dodává block pattern pro šablonovou část Záhlaví, nezasahuje do Twenty Twenty-Five, Booking Activities ani Paid Memberships Pro.
 * Version:           1.2.2
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            BoHeMi
 * Text Domain:       bohemi-wp-ui
 *
 * @package Bohemi_WP_UI
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

define( 'BOHEMI_WP_UI_VERSION', '1.2.2' );
define( 'BOHEMI_WP_UI_FILE', __FILE__ );
define( 'BOHEMI_WP_UI_DIR', plugin_dir_path( __FILE__ ) );
define( 'BOHEMI_WP_UI_URL', plugin_dir_url( __FILE__ ) );

require_once BOHEMI_WP_UI_DIR . 'includes/urls.php';
require_once BOHEMI_WP_UI_DIR . 'includes/cache.php';
require_once BOHEMI_WP_UI_DIR . 'patterns/header.php';

/**
 * filemtime() of a plugin asset, used as the cache-busting `$ver` — changes
 * automatically the moment the file on disk changes, instead of requiring
 * someone to remember to bump BOHEMI_WP_UI_VERSION by hand. Falls back to
 * the plugin version if the file can't be stat'd (should never happen).
 */
function bohemi_wp_ui_asset_version( string $relative_path ): string {
	$path = BOHEMI_WP_UI_DIR . ltrim( $relative_path, '/' );
	$mtime = file_exists( $path ) ? filemtime( $path ) : false;

	return $mtime ? (string) $mtime : BOHEMI_WP_UI_VERSION;
}

/**
 * Enqueue header CSS. `enqueue_block_assets` runs both on the front end and
 * inside the block editor / Site Editor, so the pattern preview matches the
 * live site instead of showing unstyled markup.
 *
 * No JS enqueue here anymore (4. 8. 2026) — the mobile hamburger/disclosure
 * menu it used to drive was removed, see patterns/header.php.
 *
 * Font self-hosted since 7. 8. 2026 (WebPageTest waterfall on studio.bohemi.fit
 * showed fonts.googleapis.com → fonts.gstatic.com as a cold cross-origin
 * round-trip loading in late, plausible cause of the measured CLS 0.315 —
 * same fix already applied to the Astro site 1. 8. 2026, see CLAUDE.md
 * "Font je od 1. 8. 2026 self-hosted"). Files copied byte-for-byte from
 * node_modules/@fontsource-variable/hanken-grotesk/files/ (latin + latin-ext
 * only — no cyrillic/vietnamese text anywhere on the site) into
 * assets/fonts/, declared in assets/css/fonts.css. Family name is "Hanken
 * Grotesk Variable" (fontsource's name, not "Hanken Grotesk") — header.css
 * and bohemi.css were updated to match, otherwise text would silently fall
 * back to system-ui.
 *
 * Font weights: this is a variable font (weight 100–900 in one file), so
 * unlike the old Google Fonts request there's no separate weight list to
 * maintain — 400/600/700/800 (the only weights header.css/bohemi.css set)
 * all come from the same two files. No italic — neither file ever uses it.
 */
function bohemi_wp_ui_enqueue_assets(): void {
	wp_enqueue_style(
		'bohemi-header-font',
		BOHEMI_WP_UI_URL . 'assets/css/fonts.css',
		array(),
		bohemi_wp_ui_asset_version( 'assets/css/fonts.css' )
	);

	wp_enqueue_style(
		'bohemi-header',
		BOHEMI_WP_UI_URL . 'assets/css/header.css',
		array( 'bohemi-header-font' ),
		bohemi_wp_ui_asset_version( 'assets/css/header.css' )
	);
}
add_action( 'enqueue_block_assets', 'bohemi_wp_ui_enqueue_assets' );

/**
 * Favicon — same kettlebell mark as the Astro site's `public/favicon-*` /
 * `apple-touch-icon.png` (generated together from `src/assets/logo_bohemi_trans.png`,
 * copied byte-for-byte into assets/images/ here for visual parity).
 *
 * Deliberately NOT the wp-admin "Site Icon" setting (Nastavení → Obecné) —
 * that requires a manual upload+crop in wp-admin with nothing tracked in
 * this repo. Printing the tags ourselves on `wp_head` means the icon ships
 * with the plugin like everything else here, and — unlike the header/footer
 * Template Parts — takes effect immediately on every page load with no
 * "re-insert the pattern in Site Editor" step, since `wp_head` always runs
 * fresh. If a Site Icon is ALSO set in wp-admin, WordPress prints its own
 * icon tags too (duplicate, harmless, but pointless) — leave that setting
 * empty.
 */
function bohemi_wp_ui_favicon(): void {
	$base = trailingslashit( BOHEMI_WP_UI_URL ) . 'assets/images/';
	?>
	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo esc_url( $base . 'favicon-32x32.png' ); ?>">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo esc_url( $base . 'favicon-16x16.png' ); ?>">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php echo esc_url( $base . 'apple-touch-icon.png' ); ?>">
	<?php
}
add_action( 'wp_head', 'bohemi_wp_ui_favicon', 1 );

/**
 * Uninstall/deactivation is intentionally a no-op beyond WordPress' own
 * asset/pattern de-registration — this plugin creates no options, no
 * custom post types and no database tables, so it is safe to delete at
 * any time (see README "Odstranění pluginu").
 */
