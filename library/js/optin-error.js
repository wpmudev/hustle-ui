( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.optinError = function( el ) {

		const message = $( el );

		if ( ! message.is( '.hustle-error-message' ) ) {
			return;
		}

		function init() {
			message.show();
		}

		init();

		return this;

	};

}( jQuery ) );
