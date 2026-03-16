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
		var focusableElements;

		$( '.hustle-show[role="dialog"]' ).each( function() {
			modals.push( '#' + this.id );
		});

		if ( ! modals.length ) {
			return;
		}

		modalId = modals[modals.length - 1];

		focusableElements = $( modalId ).find( 'a[href], button, textarea, input, select' ).filter( ':visible' );
		if ( focusableElements.length ) {
			focusableElements[0].focus();
		}

		// Trap focus within the modal when it is open
		$( modalId ).on( 'keydown', function( e ) {

			var focusableElements;
			var firstFocusableElement;
			var lastFocusableElement;
			var isTabPressed;

			focusableElements = $( modalId ).find( 'a[href], button, textarea, input, select' ).filter( ':visible' );
			if ( ! focusableElements.length ) {
				return;
			}

			firstFocusableElement = focusableElements[0];
			lastFocusableElement = focusableElements[focusableElements.length - 1];
			isTabPressed = ( 'Tab' === e.key || 9 === e.keyCode );

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
