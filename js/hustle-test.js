( function( $ ) {

	const focusField = function() {

		$( '.hustle-ui .hustle-field' ).each( function() {

			console.log( 'exists' ); // Test

		});

	};

	const HUI = {
		focusField: focusField()
	};

	HUI.focusField();

}( jQuery ) );
