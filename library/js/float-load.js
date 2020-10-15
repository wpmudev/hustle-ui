( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.floatLoad = function( el ) {

		const float = $( el );
		const content = float.find( '.hustle-float-content' );

		if ( ! float.is( '.hustle-float' ) ) {
			return;
		}

		function abortLoad() {
			float.hide();
		}

		function loadSelector() {

			// TODO: set the correct breakpoint.
			let selector = 600 < $( window ).width() ? float.data( 'desktop-selector' ) : float.data( 'mobiles-selector' );

			if ( ! selector.length ) {
				abortLoad();
				return;
			}

			selector = $( selector );

			if ( ! selector.length ) {
				abortLoad();
				return;
			}

			selector.css( 'position', 'relative' );
			float.appendTo( selector );
			show();

		}

		function reset() {
			float.removeClass( 'hustle-show' );
		}

		function show() {

			float.css( 'display', '' );
			float.css( 'opacity', 1 );

			// Module time
			setTimeout( () => float.addClass( 'hustle-show' ), 0 );

			// Layout time
			setTimeout( () => animation(), 200 );
		}

		function animation() {
			content.addClass( 'hustle-animate-in' );
			$( document ).trigger( 'hustle:module:displayed', content );
		}

		function init() {

			let offset = '';
			if ( 600 < $( window ).width() ) { // TODO: set the correct breakpoint.
				if ( float.hasClass( 'hustle-displaying-in-large' ) ) {
					return;
				}
				offset = float.data( 'desktop-offset' );
				float.addClass( 'hustle-displaying-in-large' );
				float.removeClass( 'hustle-displaying-in-small' );

			} else {
				if ( float.hasClass( 'hustle-displaying-in-small' ) ) {
					return;
				}
				offset = float.data( 'mobiles-offset' );
				float.addClass( 'hustle-displaying-in-small' );
				float.removeClass( 'hustle-displaying-in-large' );

			}

			reset();

			if ( 'selector' === offset ) {
				loadSelector();

			} else {
				show();
			}

		}

		init();

		return this;
	};
}( jQuery ) );
