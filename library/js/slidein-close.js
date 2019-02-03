( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.slideinClose = function( el ) {

		const slidein = $( el ),
			close = slidein.find( '.hustle-button-close' ),
			content = slidein.find( '.hustle-slidein-content' );

		if ( ! close.length ) {
			return;
		}

		if ( ! slidein.hasClass( 'hustle-slidein' ) ) {
			return;
		}

		function animationOut() {
			content.addClass( 'hustle-animate-out' );
			content.removeClass( 'hustle-animate-in' );
		}

		function init() {

			close.on( 'click', function( e ) {

				slidein.trigger( 'hustle:module:closed', this );
				animationOut();

				setTimeout( function() {
					slidein.removeClass( 'hustle-show' );
					content.removeClass( 'hustle-animate-out' );
				}, 1000 );

				e.preventDefault();

			});
		}

		init();

		return this;
	};

}( jQuery ) );
