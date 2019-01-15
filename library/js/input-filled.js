( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.inputFilled = function() {

		$( '.hustle-ui .hustle-input' ).blur( function() {

			const input = $( this );

			if ( '' !== input.val() ) {
				input.parent().addClass( 'hustle-field-filled' );
			} else {
				input.parent().removeClass( 'hustle-field-filled' );
			}

		});
	};

	HUI.inputFilled();

}( jQuery ) );