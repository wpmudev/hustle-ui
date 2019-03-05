( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.floatResize = function() {

		const container = $( el );
		const parent = container.closest( '.hustle-ui' );

		const list = container.find( 'ul' );
		const listHeight = list.height();

		const items = list.find( 'li' );
		const itemsHeight = items.outerHeight();

		if ( ! parent.is( '.hustle-float' ) ) {
			return;
		}

		if ( ! container.is( '.hustle-social' ) ) {
			return;
		}

		function init() {
			console.log( itemsHeight ); // test
		}

		init();

		return this;

	};
}( jQuery ) );
