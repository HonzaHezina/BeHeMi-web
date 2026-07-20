<?php
/**
 * URL resolvers for the BoHeMi WP header.
 *
 * Every URL used by the header goes through one of these functions so it
 * can be overridden without touching plugin code: define a constant in
 * wp-config.php, or hook the matching filter from a (mu-)plugin.
 *
 * None of these functions ever hardcode a random guess as the final answer —
 * each one prefers: constant -> filter -> real WP page lookup -> filtered
 * fallback. Page slugs are best-effort guesses (Booking Activities / Paid
 * Memberships Pro don't expose a single canonical slug) and MUST be
 * verified against the live WordPress install; see README "Co nelze ověřit".
 *
 * @package Bohemi_WP_UI
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Marketing Astro site ("Hlavní web").
 */
function bohemi_wp_ui_main_site_url(): string {
	if ( defined( 'BOHEMI_MAIN_SITE_URL' ) && BOHEMI_MAIN_SITE_URL ) {
		$url = BOHEMI_MAIN_SITE_URL;
	} else {
		$url = 'https://bohemi.fit/';
	}

	return apply_filters( 'bohemi_wp_ui_main_site_url', $url );
}

/**
 * Find the first published page matching one of the given slugs.
 *
 * @param string[] $slugs Candidate slugs, checked in order.
 */
function bohemi_wp_ui_find_page_url( array $slugs ): ?string {
	foreach ( $slugs as $slug ) {
		$page = get_page_by_path( $slug );
		if ( $page instanceof WP_Post && 'publish' === $page->post_status ) {
			return get_permalink( $page );
		}
	}

	return null;
}

/**
 * Booking Activities page ("Rezervace lekcí").
 *
 * Booking Activities has no single canonical option for "the booking page" —
 * it's whichever page carries the [bookingactivities] shortcode. We try the
 * common slugs used on BoHeMi-style installs and fall back to the site home.
 */
function bohemi_wp_ui_booking_url(): string {
	if ( defined( 'BOHEMI_BOOKING_URL' ) && BOHEMI_BOOKING_URL ) {
		$url = BOHEMI_BOOKING_URL;
	} else {
		$url = bohemi_wp_ui_find_page_url( array( 'rezervace-lekci', 'rezervace', 'booking', 'lekce', 'kalendar' ) )
			?? home_url( '/' );
	}

	return apply_filters( 'bohemi_wp_ui_booking_url', $url );
}

/**
 * Paid Memberships Pro levels page ("Členství").
 *
 * `pmpro_url()` returns an EMPTY STRING (not null/false) when PMPro's own
 * "Levels Page" setting isn't configured — `??` doesn't catch that (empty
 * string isn't null), so we check `!empty()` explicitly before trusting it.
 * Same pattern in bohemi_wp_ui_account_url() and bohemi_wp_ui_reserve_url()
 * below — this exact bug caused a dead `href=""` on "Můj účet" in the
 * header, confirmed live 20. 7. 2026 (footer had it hardcoded, so it was
 * fine there — only the dynamic resolver was affected).
 */
function bohemi_wp_ui_membership_url(): string {
	if ( defined( 'BOHEMI_MEMBERSHIP_URL' ) && BOHEMI_MEMBERSHIP_URL ) {
		$url = BOHEMI_MEMBERSHIP_URL;
	} else {
		$pmpro_url = function_exists( 'pmpro_url' ) ? pmpro_url( 'levels' ) : '';
		$url       = ! empty( $pmpro_url ) ? $pmpro_url : (
			bohemi_wp_ui_find_page_url( array( 'clenstvi', 'membership', 'membership-levels', 'cenik-clenstvi' ) )
				?? home_url( '/' )
		);
	}

	return apply_filters( 'bohemi_wp_ui_membership_url', $url );
}

/**
 * Paid Memberships Pro account page ("Můj účet").
 *
 * PMPro's account shortcode already handles both auth states (login form
 * when logged out, account dashboard + logout link when logged in), so this
 * single link intentionally also carries most of the "Přihlášení / Odhlášení"
 * job — see bohemi_wp_ui_auth_link() below for the dedicated text link.
 *
 * Hardcoded on purpose (20. 7. 2026, Honza's call): `pmpro_url('account')`
 * was returning an empty string on studio.bohemi.fit for reasons we
 * couldn't pin down live (upload vs. OPcache vs. PMPro config — never
 * confirmed which), which produced a dead `href=""` in the header. Rather
 * than keep debugging blind, the confirmed-working URL is now the direct
 * default. `BOHEMI_ACCOUNT_URL` in wp-config.php still overrides this if
 * the URL ever needs to change without a plugin update.
 */
function bohemi_wp_ui_account_url(): string {
	if ( defined( 'BOHEMI_ACCOUNT_URL' ) && BOHEMI_ACCOUNT_URL ) {
		$url = BOHEMI_ACCOUNT_URL;
	} else {
		$url = 'https://studio.bohemi.fit/ucet-clenstvi/';
	}

	return apply_filters( 'bohemi_wp_ui_account_url', $url );
}

/**
 * Real WordPress page used for the "Rezervovat" CTA.
 *
 * Falls back through the booking page, then PMPro checkout, then home.
 */
function bohemi_wp_ui_reserve_url(): string {
	if ( defined( 'BOHEMI_RESERVE_URL' ) && BOHEMI_RESERVE_URL ) {
		$url = BOHEMI_RESERVE_URL;
	} else {
		$page_url  = bohemi_wp_ui_find_page_url( array( 'rezervace-lekci', 'rezervace', 'booking' ) );
		$pmpro_url = function_exists( 'pmpro_url' ) ? pmpro_url( 'checkout' ) : '';
		$url       = $page_url ?? ( ! empty( $pmpro_url ) ? $pmpro_url : home_url( '/' ) );
	}

	return apply_filters( 'bohemi_wp_ui_reserve_url', $url );
}

/**
 * Login / logout text link.
 *
 * Baked at the moment the header pattern content is generated (see
 * README "Přihlášení / Odhlášení — známé omezení" for why this is a
 * point-in-time snapshot, not a live per-visitor state, once the pattern
 * has been inserted into a template part).
 *
 * @return array{label:string,href:string}
 */
function bohemi_wp_ui_auth_link(): array {
	if ( is_user_logged_in() ) {
		return array(
			'label' => __( 'Odhlásit se', 'bohemi-wp-ui' ),
			'href'  => wp_logout_url( home_url( '/' ) ),
		);
	}

	return array(
		'label' => __( 'Přihlásit se', 'bohemi-wp-ui' ),
		'href'  => wp_login_url(),
	);
}
