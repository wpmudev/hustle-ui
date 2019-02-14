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

		function animation() {

			const checkIntro = popup.data( 'intro' );
			const checkOutro = popup.data( 'outro' );

			let animateIn = 'no_animation';
			let animateOut = 'no_animation';

			if ( '' !== checkIntro ) {
				animateIn = checkIntro;
			}

			if ( '' !== checkOutro ) {
				animateOut = checkOutro;
			}

			if ( 'no_animation' !== animateIn || 'no_animation' !== animateOut ) {
				content.addClass( 'hustle-animate' );
			}

			if ( content.hasClass( 'hustle-animate' ) && 'no_animation' === animateIn ) {
				content.hide();
				content.css({
					opacity: 1
				});
			}
		}

		function animationIn() {

			const checkIntro = popup.data( 'intro' );

			let animateIn = 'no_animation';

			if ( '' !== checkIntro ) {
				animateIn = checkIntro;
			}

			if ( 'no_animation' !== animateIn ) {
				content.addClass( 'hustle-animate-in--' + animateIn );
			} else {

				if ( content.hasClass( 'hustle-animate' ) ) {
					content.show();
				}
			}
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
