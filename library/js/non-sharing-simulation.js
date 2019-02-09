( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.nonSharingSimulation = function( el ) {

		const module = $( el );

		if ( ! module.is( '.hustle-ui' ) ) {
			return;
		}

		const optin = module.find( '.hustle-optin' ),
			button = module.find( '.hustle-button-submit' ),
			cta = module.find( '.hustle-button-cta' ),
			success = optin.find( '.hustle-success' ),
			layout = optin.find( '.hustle-layout' ),
			form = layout.find( '.hustle-layout-form' ),
			error = form.find( '.hustle-error-message' );

		function resetOnLoad() {
			success.hide();
			error.hide();
		}

		function init() {

			resetOnLoad();

			// Prevent CTA from working.
			if ( cta.length ) {
				cta.on( 'click', function( e ) {
					e.preventDefault();
				});
			}

			button.on( 'click', function( e ) {

				e.preventDefault();
				e.stopPropagation();

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
