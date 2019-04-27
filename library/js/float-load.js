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
			float.remove();
		}

		function loadSelector() {
			let selector = float.data( 'desktop-selector' );

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

			float.css( 'opacity', 1 );

			// Module time
			setTimeout( () => float.addClass( 'hustle-show' ), 0 );

			// Layout time
			setTimeout( () => animation(), 200 );
		}

		function animation() {
			content.addClass( 'hustle-animate-in' );
		}

		function init() {

			reset();

			if ( 'selector' === float.data( 'desktop-offset' ) ) { // TODO: do mobile too.
				loadSelector();

			} else {
				show();
			}

		}

		init();

		return this;
	};
}( jQuery ) );
