( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.inlineResize = function( el ) {

		const element = $( el );
		const elWidth = element.width();

		if ( ! element.is( '.hustle-inline' ) ) {
			return;
		}

		function init() {

			if ( 783 < Math.max( document.documentElement.clientWidth, window.innerWidth || 0 ) ) {

				if ( element.hasClass( 'hustle-size--small' ) ) {

					if ( 500 < elWidth ) {
						element.removeClass( 'hustle-size--small' );
					}
				} else {

					if ( 500 >= elWidth ) {
						element.addClass( 'hustle-size--small' );
					}
				}
			}

		}

		init();

		return this;
	};

}( jQuery ) );
