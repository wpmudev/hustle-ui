( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.slideinClose = function( el, autohideDelay ) {

		const slidein = $( el ),
			close = slidein.find( '.hustle-button-close' ),
			content = slidein.find( '.hustle-slidein-content' )
			;

		let	preventAutohide = false;

		if ( ! close.length ) {
			return;
		}

		if ( ! slidein.hasClass( 'hustle-slidein' ) ) {
			return;
		}

		function escapeKeyClose( e ) {

			if ( 27 === e.keyCode ) {
				animationOut();
			}
		}

		function animationOut() {
			content.addClass( 'hustle-animate-out' );
			content.removeClass( 'hustle-animate-in' );

			slidein.find( '.hustle-slidein-shadow' ).addClass( 'hustle-animate-out' );
			slidein.find( '.hustle-slidein-shadow' ).removeClass( 'hustle-animate-in' );

			setTimeout( function() {
				slidein.removeClass( 'hustle-show' );
				content.removeClass( 'hustle-animate-out' );
				slidein.find( '.hustle-slidein-shadow' ).removeClass( 'hustle-animate-out' );
			}, 1000 );
		}

		function init() {

			$( document ).off( 'keydown.hustle.escKey', escapeKeyClose );
			$( document ).on( 'keydown.hustle.escKey', escapeKeyClose );

			slidein.on( 'click', function() {
				preventAutohide = true;
			});

			if ( 'undefined' !== typeof autohideDelay && false !== autohideDelay ) {

				setTimeout( function() {

					if ( ! preventAutohide ) {
						slidein.trigger( 'hustle:module:hidden', this );
						animationOut();
					}

				}, autohideDelay );

			}

			close.on( 'click', function( e ) {

				slidein.trigger( 'hustle:module:closed', this );

				animationOut();

			});
		}

		init();

		return this;
	};

}( jQuery ) );
