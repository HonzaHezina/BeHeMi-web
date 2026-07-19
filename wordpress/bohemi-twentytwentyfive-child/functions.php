<?php
/**
 * Header comes from the bohemi-wp-ui plugin's block pattern, not from a
 * parts/header.html here — this child theme intentionally has no header
 * template part, so the site inherits Twenty Twenty-Five's default one
 * until the bohemi-wp-ui pattern is inserted (works the same whether this
 * child theme is active or not). See wordpress/README.md.
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

add_action('init', function () {
    register_block_pattern_category('bohemi', array(
        'label' => __('BoHeMi', 'bohemi-twentytwentyfive-child'),
    ));
});
