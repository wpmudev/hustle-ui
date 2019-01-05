( function( $ ) {

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof HUI ) {
		window.HUI = {};
	}

	HUI.buttonSubmit = function( delay ) {

		$( '.hustle-ui .hustle-button-submit' ).on( 'click', function( e ) {

			const button = $( this );
			const form = button.closest( '.hustle-layout-form' );
			const gdpr = form.find( '.hustle-gdpr input' );
			const reqField = form.find( '.hustle-field-required' );
			const errorField = form.find( '.hustle-field-error' );
			const errorMessage = form.find( '.hustle-error-message' );

			errorMessage.hide();
			button.addClass( 'hustle-button-onload' );

			setTimeout( function() {

				if (
					gdpr.is( ':checked' ) &&
					0 === errorField.length &&
					'' !== reqField.find( 'input' ).val()
				) {
					errorMessage.hide();
				} else {
					errorMessage.show();
				}

				button.removeClass( 'hustle-button-onload' );

			}, delay );

			e.preventDefault();

		});
	};

	$( 'body' ).ready( function() {
		HUI.buttonSubmit( 800 );
	});

}( jQuery ) );
