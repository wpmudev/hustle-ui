( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.optinValidate = function( el ) {

		const module = $( el ),
			form = module.find( '.hustle-layout-form' );

		function resetOnClick() {

			const input = form.find( '.hustle-field' ),
				checkbox = form.find( '.hustle-checkbox' ),
				error = form.find( '.hustle-error-message' );

			input.removeClass( 'hustle-field-error' );
			checkbox.removeClass( 'hustle-field-error' );
			error.hide();

		}

		function checkGdpr() {

			const label = form.find( '.hustle-gdpr' ),
				input = label.find( 'input' );

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

			resetOnClick();

			checkGdpr();
			checkRequired();
		}

		init();

		return this;
	};

}( jQuery ) );
