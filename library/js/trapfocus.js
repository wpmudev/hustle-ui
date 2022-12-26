( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.trapFocus = function( el ) {

        var element = document.getElementById( el );
        var focusableEls = element.querySelectorAll( 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])' );
        var firstFocusableEl = focusableEls[0];
        var lastFocusableEl = focusableEls[focusableEls.length - 1];
        var KEYCODE_TAB = 9;

        element.addEventListener( 'keydown', function( e ) {
            var isTabPressed = ( 'Tab' === e.key || e.keyCode === KEYCODE_TAB );

            if ( ! isTabPressed ) {
                return;
            }

            if ( e.shiftKey ) {
                if ( document.activeElement === firstFocusableEl ) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } else {
                if ( document.activeElement === lastFocusableEl ) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        });
	};

}( jQuery ) );
