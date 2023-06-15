( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.optinError = function( el, errors ) {

		const message = $( el ),
			$form = message.closest( 'form' );

		if ( ! message.is( '.hustle-error-message' ) ) {
			return;
		}

		function init( errors ) {
			var first = true;
			if ( ! Array.isArray( errors ) ) {
				let newErrors = [];
				$.each( errors, function( index, value ) {
					newErrors.push( value );
				});
				errors = newErrors;
			}
			if ( 'undefined' !== typeof errors && errors.length ) {
				$.each( errors, function( index, element ) {
					if ( 'undefined' === typeof element || ! element ) {
						return true;
					}
					if ( first ) {
						message.append( '<p>' + HUI.escapeJS( element ) + '</p>' );
						first = false;
					} else {
						$( '<div class="hustle-error-message"><p>' + HUI.escapeJS( element ) + '</p></div>' ).appendTo( $form );
					}
				});
			}
			if ( 'undefined' === typeof errors || first ) {
				message.append( '<p>' + HUI.escapeJS( 'default-error' ) + '</p>' );
			}
			message.show();
		}

		init( errors );

		return this;

	};

}( jQuery ) );
