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
			form.find( '.hustle-error-message' ).not( ':first' ).remove();
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
				var errors;

				e.preventDefault();
				e.stopPropagation();

				errors = HUI.optinValidate( module );

				if ( errors.length ) {
					HUI.optinError( error, errors );
				} else {
					HUI.optinSubmit( this, 1000 );

					setTimeout( function() {
						HUI.optinSuccess( success, success.data( 'close-delay' ) );
					}, 1000 );
				}

			});
		}

		init();

		return this;
	};

}( jQuery ) );
