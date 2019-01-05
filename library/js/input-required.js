( function( $ ) {

	HUI.inputRequired = function( delay ) {

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

		$( '.hustle-ui .hustle-button-submit' ).on( 'click', function( e ) {

			const button = $( this );
			const form = button.closest( '.hustle-layout-form' );
			const input = form.find( '.hustle-input' );
			const label = input.parent();

			setTimeout( function() {

				label.each( function() {

					if ( $( this ).hasClass( 'hustle-field-required' ) ) {

						if ( '' === $( this ).find( 'input' ).val() ) {
							$( this ).addClass( 'hustle-field-error' );
						} else {
							$( this ).removeClass( 'hustle-field-error' );
						}
					}
				});

			}, delay );

			e.preventDefault();

		});
	};

	$( 'body' ).ready( function() {
		HUI.inputRequired( 800 );
	});

}( jQuery ) );
