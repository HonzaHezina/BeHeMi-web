/**
 * BoHeMi header — mobile menu enhancement.
 *
 * The mobile menu is a native <details>/<summary> disclosure, so it works
 * with zero JS (keyboard-operable, no layout shift). This file only adds
 * the three behaviours native <details> doesn't give us for free:
 *   1. keep aria-expanded on the toggle button in sync with open state
 *   2. close the menu after a nav link is clicked
 *   3. close the menu on Escape and return focus to the toggle button
 */
(function () {
	'use strict';

	function init() {
		var toggles = document.querySelectorAll('.bohemi-header-toggle');

		toggles.forEach(function (details) {
			var summary = details.querySelector('.bohemi-header-toggle-btn');
			if (!summary) {
				return;
			}

			var syncExpanded = function () {
				summary.setAttribute('aria-expanded', details.open ? 'true' : 'false');
			};
			syncExpanded();
			details.addEventListener('toggle', syncExpanded);

			details.querySelectorAll('a').forEach(function (link) {
				link.addEventListener('click', function () {
					details.open = false;
				});
			});

			details.addEventListener('keydown', function (event) {
				if (event.key === 'Escape' && details.open) {
					details.open = false;
					summary.focus();
				}
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
