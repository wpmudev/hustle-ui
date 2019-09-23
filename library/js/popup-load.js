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

			let delay = 1000;

			if ( 'no_animation' === animateIn ) {
				delay = 0;
			}

			if (
				'bounceIn' === animateIn ||
				'bounceInUp' === animateIn ||
				'bounceInDown' === animateIn ||
				'bounceInLeft' === animateIn ||
				'bounceInRight' === animateIn
			) {
				delay = 755;
			}

			if ( 'fadeIn' === animateIn ) {
				delay = 305;
			}

			if ( 'newspaperIn' === animateIn ) {
				delay = 505;
			}

			content.addClass( 'hustle-animate-in--' + animateIn );

			setTimeout( function() {
				popup.addClass( 'hustle-animation-stopped' );
			}, ( delay + 50 ) );
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
