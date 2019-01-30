( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.inlineLoad = function( el ) {

		const element = $( el );
		const content = element.find( '.hustle-inline-content' );

		const windowHeight = $( window ).height();
		const elementPosition = element.offset().top;

		if ( ! element.is( '.hustle-inline' ) ) {
			return;
		}

		function reset() {
			element.removeClass( 'hustle-show' );
		}

		function animation() {

			const checkIntro = element.data( 'intro' );

			let animateIn = 'no_animation';

			if ( '' !== checkIntro ) {
				animateIn = checkIntro;
			}

			if ( 'no_animation' !== animateIn ) {
				content.addClass( 'hustle-animate' );
			}
		}

		function animationIn() {

			const checkIntro = element.data( 'intro' );

			let animateIn = 'no_animation';

			if ( '' !== checkIntro ) {
				animateIn = checkIntro;
			}

			if ( 'no_animation' !== animateIn ) {
				content.addClass( 'hustle-animate-in--' + animateIn );
			}
		}

		function load( delay ) {

			element.addClass( 'hustle-show' );

			setTimeout( function() {
				animationIn();
			}, delay );
		}

		function init() {

			reset();
			animation();

			if ( windowHeight > elementPosition ) {

				load( 200 );

			} else {

				$( window ).scroll( function() {

					const windowPosition = $( window ).scrollTop() + windowHeight;

					if ( windowPosition >= elementPosition ) {
						load( 100 );
					}
				});
			}
		}

		init();

		return this;
	};

}( jQuery ) );
