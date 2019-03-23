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

		function resetOnClick() {

			const input = form.find( '.hustle-field' );
			const checkbox = form.find( '.hustle-checkbox' );

			input.removeClass( 'hustle-field-error' );
			checkbox.removeClass( 'hustle-field-error' );
			error.hide();

		}

		function checkGdpr() {

			const label = form.find( '.hustle-gdpr' );
			const input = label.find( 'input' );

			if ( input.is( ':checked' ) ) {
				label.removeClass( 'hustle-field-error' );
			} else {
				label.addClass( 'hustle-field-error' );
			}
		}

		function checkRequired() {

			const input = form.find( '.hustle-input' );
			const label = input.parent();

			label.each( function() {

				const field = $( this );

				if ( field.hasClass( 'hustle-field-required' ) ) {

					if ( '' === field.find( 'input' ).val() ) {
						field.addClass( 'hustle-field-error' );
					} else {
						field.removeClass( 'hustle-field-error' );
					}
				}
			});

		}

		function init() {

			resetOnLoad();

			button.on( 'click', function( e ) {

				resetOnClick();

				checkGdpr();
				checkRequired();

				if ( form.find( '.hustle-field-error' ).length ) {
					HUI.optinError( error );
				} else {
					HUI.optinSubmit( button );

					setTimeout( function() {
						HUI.optinSuccess( success );
					}, 1000 );
				}


				e.preventDefault();
				e.stopPropagation();

			});
		}

		init();

		return this;
	};

}( jQuery ) );
