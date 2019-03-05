( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.sharingSimulation = function( el ) {

		const module = $( el );

		if ( ! module.is( '.hustle-ui' ) ) {
			return;
		}

		function resetOnLoad() {
			module.hide();
		}

		function init() {

			resetOnLoad();

		}

		init();

		return this;
	};

	//HUI.sharingSimulation( '.hustle-float' );
}( jQuery ) );
