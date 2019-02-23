( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.slideinClose = function( el, autohideDelay ) {

		const slidein = $( el ),
			close = slidein.find( '.hustle-button-close' ),
			content = slidein.find( '.hustle-slidein-content' );

		let	preventAutohide = false;

		if ( ! close.length ) {
			return;
		}

		if ( ! slidein.hasClass( 'hustle-slidein' ) ) {
			return;
		}

		function animationOut() {
			content.addClass( 'hustle-animate-out' );
			content.removeClass( 'hustle-animate-in' );

			setTimeout( function() {
				slidein.removeClass( 'hustle-show' );
				content.removeClass( 'hustle-animate-out' );
			}, 1000 );
		}

		function init() {

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

				e.preventDefault();

			});
		}

		init();

		return this;
	};

}( jQuery ) );
