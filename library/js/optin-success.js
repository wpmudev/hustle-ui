( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.optinSuccess = function( el ) {

		const success = $( el );
		const container = success.closest( '.hustle-ui' );
		const layout = container.find( '.hustle-layout' );

		if ( ! success.is( '.hustle-success' ) ) {
			return;
		}

		function successMessage() {

			layout.slideUp( 800 );

			setTimeout( function() {
				success.slideDown();
			}, 800 );
		}

		function init() {
			successMessage();
		}

		init();

		return this;

	};

}( jQuery ) );
