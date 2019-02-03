( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.optinSimulation = function( el ) {

		const button = $( el );
		const module = button.closest( '.hustle-ui' );
		const optin = module.find( '.hustle-optin' );
		const success = optin.find( '.hustle-success' );
		const layout = optin.find( '.hustle-layout' );
		const form = layout.find( '.hustle-layout-form' );
		const error = form.find( '.hustle-error-message' );

		if ( ! optin.is( '.hustle-optin' ) ) {
			return;
		}

		function resetOnLoad() {
			success.hide();
			error.hide();
		}

		function init() {

			resetOnLoad();

			button.on( 'click', function( e ) {

				resetOnClick();

				HUI.optinSubmit( button );

				setTimeout( function() {

					HUI.optinValidate( module );

					if ( form.find( '.hustle-field-error' ).length ) {
						HUI.optinError( error );
					} else {
						HUI.optinSuccess( success );
					}

				}, 1000 );

				e.preventDefault();
				e.stopPropagation();

			});
		}

		init();

		return this;
	};

}( jQuery ) );
