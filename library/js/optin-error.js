( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.optinError = function( el, errors ) {

		const message = $( el );

		if ( ! message.is( '.hustle-error-message' ) ) {
			return;
		}

		function init( errors ) {
			var first = true;
			if ( ! $.isArray( errors ) ) {
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
						message.append( '<p>' + element + '</p>' );
						first = false;
					} else {
						$( '<div class="hustle-error-message"><p>' + element + '</p></div>' ).insertAfter( message );
					}
				});
			}
			if ( 'undefined' === typeof errors && errors.length || first ) {
				message.append( '<p>' + message.data( 'default-error' ) + '</p>' );
			}
			message.show();
		}

		init( errors );

		return this;

	};

}( jQuery ) );
