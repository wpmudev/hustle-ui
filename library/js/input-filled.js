( function( $ ) {

	// Enable strict mode.
	'use strict';

	focusClass = function() {

		$( '.hustle-ui .hustle-input' ).blur( function() {

			const input = $( this );
			const label = input.parent();

			if ( label.hasClass( 'hustle-field' ) ) {

				if ( '' !== input.val() ) {
					label.addClass( 'hustle-field-filled' );
				} else {
					label.removeClass( 'hustle-field-filled' );
				}
			}
		});
	};

	focusClass();

}( jQuery ) );
