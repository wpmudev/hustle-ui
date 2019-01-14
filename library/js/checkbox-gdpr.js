( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.checkboxGdpr = function() {

		$( '.hustle-ui .hustle-gdpr input' ).on( 'change', function( e ) {

			const checkbox = $( e.target );
			const label = checkbox.parent();

			if ( checkbox.is( ':checked' ) ) {
				label.removeClass( 'hustle-field-error' );
			} else {
				label.addClass( 'hustle-field-error' );
			}
		});
	};

	HUI.checkboxGdpr();

}( jQuery ) );
