( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.optinSubmit = function( el ) {

		const button = $( el );
		const module = button.closest( '.hustle-ui' );
		const optin = module.find( '.hustle-optin' );

		if ( ! button.is( '.hustle-button-submit' ) || ! optin[0] || ! optin.length ) {
			return;
		}

		function init() {

			button.addClass( 'hustle-button-onload' );

			setTimeout( function() {
				button.removeClass( 'hustle-button-onload' );
			}, 1000 );
		}

		init();

		return this;

	};

}( jQuery ) );
