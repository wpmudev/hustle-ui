( function( $ ) {

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.filledClass = function() {

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

	$( 'body' ).ready( function() {
		HUI.filledClass();
	});

}( jQuery ) );
