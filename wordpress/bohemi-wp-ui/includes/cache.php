<?php
/**
 * Cache headers for the booking page.
 *
 * Context (diagnosed live on 20. 7. 2026 — see wordpress/README.md): the
 * booking calendar (Booking Activities) is rendered on the FRONT PAGE.
 * `/rezervace/`, which the site nav still links to, is a permanent 301 to
 * the front page. The Booking Activities AJAX endpoint already sends
 * correct no-store headers, and its own JS/CSS are correctly versioned —
 * those are not the problem. The actual risk is the front page's HTML
 * shell sitting behind the host's edge cache (`Cache-Control: max-age=300`,
 * confirmed via response `Age` header) combined with browsers caching the
 * 301 on `/rezervace/` more stickily than a normal page. This file only
 * addresses the first half (server-side cache headers on the booking
 * page) — the 301 itself needs a decision in wp-admin, see README.
 *
 * @package Bohemi_WP_UI
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Is the current request the page that actually renders the booking
 * calendar? Checks both the resolved booking URL (in case a real
 * `/rezervace/` page comes back) and the front page (where the calendar
 * lives today), so this keeps working either way without edits.
 */
function bohemi_wp_ui_is_booking_request(): bool {
	if ( is_admin() ) {
		return false;
	}

	if ( function_exists( 'is_front_page' ) && is_front_page() ) {
		return true;
	}

	$current = untrailingslashit( (string) wp_parse_url( home_url( add_query_arg( array() ) ), PHP_URL_PATH ) );
	$booking = untrailingslashit( (string) wp_parse_url( bohemi_wp_ui_booking_url(), PHP_URL_PATH ) );

	return '' !== $booking && $booking === $current;
}

/**
 * The booking page embeds a live availability calendar, so it shouldn't
 * sit behind a multi-minute edge/browser cache like a static page. This
 * only touches that one page — the rest of the site keeps its normal
 * (faster) caching.
 */
function bohemi_wp_ui_send_booking_cache_headers(): void {
	if ( ! bohemi_wp_ui_is_booking_request() ) {
		return;
	}

	header( 'Cache-Control: no-cache, must-revalidate' );

	bohemi_wp_ui_maybe_send_clear_site_data();
}
add_action( 'send_headers', 'bohemi_wp_ui_send_booking_cache_headers' );

/**
 * One-time `Clear-Site-Data: "cache", "storage"` for visitors stuck on a
 * stale cached response (e.g. an old cached redirect for /rezervace/).
 * Deliberately does NOT include "cookies" — that would log everyone out.
 *
 * OFF by default. To enable temporarily, add to wp-config.php:
 *
 *     define( 'BOHEMI_WP_UI_CLEAR_SITE_DATA_UNTIL', '2026-07-23' );
 *
 * The header stops sending itself the moment that date passes, so if you
 * forget to remove the constant it doesn't keep wiping visitor storage on
 * every visit indefinitely — but remove it once the issue is confirmed
 * fixed anyway, no need to wait out the date.
 */
function bohemi_wp_ui_maybe_send_clear_site_data(): void {
	if ( ! defined( 'BOHEMI_WP_UI_CLEAR_SITE_DATA_UNTIL' ) || ! BOHEMI_WP_UI_CLEAR_SITE_DATA_UNTIL ) {
		return;
	}

	$until = strtotime( (string) BOHEMI_WP_UI_CLEAR_SITE_DATA_UNTIL );
	if ( ! $until || time() > $until ) {
		return;
	}

	header( 'Clear-Site-Data: "cache", "storage"' );
}
