<?php
/**
 * Plugin Name:       BoHeMi WP UI
 * Plugin URI:        https://bohemi.fit/
 * Description:       Vlastní hlavička pro studio.bohemi.fit vizuálně sladěná s hlavním Astro webem (bohemi.fit). Dodává block pattern pro šablonovou část Záhlaví, nezasahuje do Twenty Twenty-Five, Booking Activities ani Paid Memberships Pro.
 * Version:           1.1.2
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

define( 'BOHEMI_WP_UI_VERSION', '1.1.2' );
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
 * Enqueue header CSS + JS. `enqueue_block_assets` runs both on the front
 * end and inside the block editor / Site Editor, so the pattern preview
 * matches the live site instead of showing unstyled markup.
 */
function bohemi_wp_ui_enqueue_assets(): void {
	wp_enqueue_style(
		'bohemi-header-font',
		'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'bohemi-header',
		BOHEMI_WP_UI_URL . 'assets/css/header.css',
		array( 'bohemi-header-font' ),
		bohemi_wp_ui_asset_version( 'assets/css/header.css' )
	);

	wp_enqueue_script(
		'bohemi-header',
		BOHEMI_WP_UI_URL . 'assets/js/header.js',
		array(),
		bohemi_wp_ui_asset_version( 'assets/js/header.js' ),
		true
	);
}
add_action( 'enqueue_block_assets', 'bohemi_wp_ui_enqueue_assets' );

/**
 * Preconnect to Google Fonts, same as the Astro site, so the font request
 * doesn't start cold.
 */
function bohemi_wp_ui_resource_hints( array $urls, string $relation_type ): array {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href' => 'https://fonts.googleapis.com',
		);
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
	}

	return $urls;
}
add_filter( 'wp_resource_hints', 'bohemi_wp_ui_resource_hints', 10, 2 );

/**
 * Uninstall/deactivation is intentionally a no-op beyond WordPress' own
 * asset/pattern de-registration — this plugin creates no options, no
 * custom post types and no database tables, so it is safe to delete at
 * any time (see README "Odstranění pluginu").
 */
