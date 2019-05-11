( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.popupLoad = function( el, autohideDelay ) {

		const popup = $( el );
		const content = popup.find( '.hustle-popup-content' );

		if ( ! popup.is( '.hustle-popup' ) ) {
			return;
		}

		popup.css( 'opacity', 1 );

		function animation() {
			content.addClass( 'hustle-animate' );
		}

		function animationIn() {

			const checkIntro = popup.data( 'intro' );
			const animateIn = checkIntro;

			content.addClass( 'hustle-animate-in--' + animateIn );

		}

		function init() {

			popup.removeClass( 'hustle-show' );
			animation();

			// Module time.
			popup.addClass( 'hustle-show' );

			// Layout time.
			setTimeout( function() {
				animationIn();
			}, 200 );

			HUI.popupClose( el, autohideDelay );
		}

		init();

		return this;
	};

}( jQuery ) );
