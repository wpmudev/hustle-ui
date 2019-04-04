( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.optinSubmit = function( el, delay = false ) {

		const button = $( el );
		const module = button.closest( '.hustle-ui' );
		const optin = module.find( '.hustle-optin' );

		if ( ! button.is( '.hustle-button-submit' ) || ! optin[0] || ! optin.length ) {
			return;
		}

		function init() {

			let delayValue = ( true === $.isNumeric( delay ) ) ? delay : '1000';

			if ( true === $.isNumeric( delay ) ) {
				delayValue = delay;
			}

			button.addClass( 'hustle-button-onload' );

			if ( false !== delay ) {

				setTimeout( function() {
					button.removeClass( 'hustle-button-onload' );
				}, delayValue );
			}
		}

		init();

		return this;

	};

}( jQuery ) );
