<?php
/**
 * Title: Rezervace lekcí
 * Slug: bohemi-twentytwentyfive-child/reservation-page
 * Categories: bohemi
 * Description: Obsah stránky s rezervačním kalendářem — nadpis + [bookingactivities] shortcode v panelu.
 *
 * Byl to dřív statický reservation-page.html, který WordPress nikdy
 * nenačetl — theme patterns se auto-discoverují jen z .php souborů s tímto
 * hlavičkovým komentářem (viz account-page.php a wordpress/README.md).
 */
?>
<!-- wp:group {"className":"bohemi-container"} -->
<div class="wp-block-group bohemi-container">
<h1 class="bohemi-title">Rezervujte si <span class="bohemi-accent">lekci</span></h1>
<p>Vyberte si termín, rezervujte místo a přijďte si zacvičit.</p>
<div class="bohemi-panel">
[bookingactivities]
</div>
</div>
<!-- /wp:group -->
