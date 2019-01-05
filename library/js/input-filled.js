( function( $ ) {

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

	$( 'body' ).ready( function() {
		HUI.inputFilled();
	});

}( jQuery ) );
