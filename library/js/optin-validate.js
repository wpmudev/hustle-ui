( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.optinValidate = function( el ) {

		const module = $( el ),
			errors = [],
			form = module.find( '.hustle-layout-form' );

		function resetOnClick() {

			const input = form.find( '.hustle-field' ),
				checkbox = form.find( '.hustle-checkbox' ),
				error = form.find( '.hustle-error-message' );

			form.find( '.hustle-error-message' ).not( ':first' ).remove();

			input.removeClass( 'hustle-field-error' );
			checkbox.removeClass( 'hustle-field-error' );
			error.html( '' ).hide();

		}

		function checkGdpr() {

			const label = form.find( '.hustle-gdpr' ),
				input = label.find( 'input' );

			if ( ! label.length || input.is( ':checked' ) ) {
				label.removeClass( 'hustle-field-error' );
			} else {
				label.addClass( 'hustle-field-error' );
				errors.push( HUI.escapeJS( input.data( 'required-error' ) ) );
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
						errors.push( HUI.escapeJS( field.find( '.hustle-input' ).data( 'required-error' ) ) );
					} else {
						field.removeClass( 'hustle-field-error' );
					}
				}
			});
		}

		function init() {

			resetOnClick();

			checkRequired();
			checkGdpr();
		}

		init();

		return errors;
	};

}( jQuery ) );
