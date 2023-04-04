( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.trapFocus = function() {

		// detect all the modals.
		var modals = [];
		var modalId = '';

		$( '.hustle-show[role="dialog"]' ).each( function() {
			modals.push( '#' + this.id );
		});

		if ( ! modals.length ) {
			return;
		}

		modalId = modals[modals.length - 1];

		$( modalId ).find( 'a[href], button, textarea, input, select' ).filter( ':visible' )[0].focus();

		// Trap focus within the modal when it is open
		$( modalId ).on( 'keydown', function( e ) {

			var focusableElements = $( modalId ).find( 'a[href], button, textarea, input, select' ).filter( ':visible' );
			var firstFocusableElement = focusableElements[0];
			var lastFocusableElement = focusableElements[focusableElements.length - 1];
			var isTabPressed = ( 'Tab' === e.key || 9 === e.keyCode );

			if ( ! isTabPressed ) {
				return;
			}

			if ( e.shiftKey ) {
				if ( document.activeElement === firstFocusableElement ) {
					lastFocusableElement.focus();
					e.preventDefault();
				}
			} else {
				if ( document.activeElement === lastFocusableElement ) {
					firstFocusableElement.focus();
					e.preventDefault();
				}
			}
		});
	};

}( jQuery ) );
