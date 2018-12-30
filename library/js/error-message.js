( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.errorMessage = function() {

		$( '.hustle-ui .hustle-button-submit' ).on( 'click', function( event ) {

			const button = $( this );
			const form = button.closest( '.hustle-layout-form' );
			const error = form.find( '.hustle-error-message' );

			if ( form.find( '.hustle-field-error' ).length ) {
				error.show();
			}

			event.preventDefault();

		});
	};

	HUI.errorMessage();

}( jQuery ) );
