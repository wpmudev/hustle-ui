( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.slideinClose = function( el ) {

		const close = $( el );
		const slidein = close.closest( '.hustle-ui' );
		const content = slidein.find( '.hustle-slidein-content' );

		if ( ! close.is( '.hustle-button-close' ) ) {
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

	$( '.hustle-button-close' ).each( function() {

		const close = $( this );

		HUI.slideinClose( close );

	});

}( jQuery ) );
