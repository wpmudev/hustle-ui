( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.inlineClose = function( el, autohideDelay ) {

		const inline = $( el ),
			content = inline.find( '.hustle-inline-content' )
			;

		let	preventAutohide = false;

		if ( ! inline.hasClass( 'hustle-inline' ) ) {
			return;
		}

		function animationOut() {

			inline.slideUp( 800 );

			setTimeout( function() {
				inline.remove();
			}, 800 );
		}

		function init() {

			if ( 'undefined' !== typeof autohideDelay && false !== autohideDelay ) {

				setTimeout( function() {

					if ( ! preventAutohide ) {
						inline.find( 'iframe' ).each( ( i, el ) => $( el ).attr( 'src', $( el ).attr( 'src' ) ) );
						inline.trigger( 'hustle:module:hidden', this );
						animationOut();
					}

				}, autohideDelay );
			}
		}

		init();

		return this;
	};

}( jQuery ) );
