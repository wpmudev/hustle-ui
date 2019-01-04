( function( $ ) {

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.errorMessage = function() {

		$( '.hustle-ui .hustle-button-submit' ).on( 'click', function( e ) {

			const button = $( this );
			const form = button.closest( '.hustle-layout-form' );
			const error = form.find( '.hustle-error-message' );

			error.hide();

			if ( form.find( '.hustle-field-error' ).length ) {
				error.show();
			} else {
				error.hide();
			}

			e.preventDefault();

		});
	};

	$( 'body' ).ready( function() {
		HUI.errorMessage();
	});

}( jQuery ) );
