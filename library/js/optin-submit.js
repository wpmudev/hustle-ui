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
			button
				.addClass( 'hustle-button-onload' )
				.attr( 'aria-label', button.attr( 'data-loading-text' ) );

			if ( false !== delay ) {
				const delayValue = ( ! isNaN( parseInt( delay ) ) ) ? delay : '1000';

				setTimeout( function() {
					button
						.removeClass( 'hustle-button-onload' )
						.removeAttr( 'aria-label' );
				}, delayValue );
			}
		}

		init();

		return this;

	};

}( jQuery ) );
