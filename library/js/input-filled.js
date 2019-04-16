( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.inputFilled = function() {

		$( '.hustle-ui .hustle-input' ).on( 'keyup blur change', function() {

			const input = $( this );

			if ( '' === input.val() && this.validity.valid ) {
				input.parent().removeClass( 'hustle-field-filled' );
			} else {
				input.parent().addClass( 'hustle-field-filled' );
			}

		});
	};

}( jQuery ) );
