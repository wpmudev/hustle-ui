( function( $ ) {

	'use strict';

	const HUI = {};

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.inputRequired = function() {

		$( '.hustle-ui .hustle-input' ).blur( function() {

			const input = $( this );
			const label = input.parent();

			if ( label.hasClass( 'hustle-field-required' ) ) {

				if ( '' === input.val() ) {
					label.addClass( 'hustle-field-error' );
				} else {
					label.removeClass( 'hustle-field-error' );
				}
			}

		});
	};

}( jQuery ) );
