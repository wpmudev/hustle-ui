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

		float.css( 'opacity', 1 );

		function reset() {
			float.removeClass( 'hustle-show' );
		}

		function show() {
			float.addClass( 'hustle-show' );
		}

		function animation() {
			content.addClass( 'hustle-animate-in' );
		}

		function init() {

			reset();

			// Module time
			setTimeout( function() {
				show();
			}, 0 );

			// Layout time
			setTimeout( function() {
				animation();
			}, 200 );

		}

		init();

		return this;
	};
}( jQuery ) );
