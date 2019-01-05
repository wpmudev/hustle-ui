( function( $ ) {

	HUI.checkboxGdpr = function( delay ) {

		$( '.hustle-ui .hustle-gdpr input' ).on( 'change', function( e ) {

			const checkbox = $( e.target );
			const label = checkbox.parent();

			if ( checkbox.is( ':checked' ) ) {
				label.removeClass( 'hustle-field-error' );
			} else {
				label.addClass( 'hustle-field-error' );
			}
		});

		$( '.hustle-ui .hustle-button-submit' ).on( 'click', function( e ) {

			const button = $( this );
			const form = button.closest( '.hustle-layout-form' );
			const gdprLabel = form.find( '.hustle-gdpr' );
			const gdprInput = gdprLabel.find( 'input' );

			setTimeout( function() {

				if ( gdprInput.is( ':checked' ) ) {
					gdprLabel.removeClass( 'hustle-field-error' );
				} else {
					gdprLabel.addClass( 'hustle-field-error' );
				}

			}, delay );

			e.preventDefault();

		});
	};

	$( 'body' ).ready( function() {
		HUI.checkboxGdpr( 800 );
	});

}( jQuery ) );
