( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.slideinLoad = function( el, autohideDelay ) {

		const slidein = $( el );
		const content = slidein.find( '.hustle-slidein-content' );
		const focusedElementBeforeModal = document.activeElement;
		const slideinId = slidein.attr( 'id' );
		const slideinWrapper = $( '#' + slideinId ).find( '.hustle-layout' );

		if ( ! slidein.is( '.hustle-slidein' ) ) {
			return;
		}

		slidein.css( 'opacity', 1 );

		function reset() {
			slidein.removeClass( 'hustle-show' );
		}

		function show() {
			slidein.addClass( 'hustle-show' );
		}

		function position() {

			const checkPosition = slidein.data( 'position' );

			let positionX = '';
			let positionY = '';

			if ( -1 !== checkPosition.charAt( 0 ).indexOf( 'n' ) ) {
				positionX = 'north';
			}

			if ( -1 !== checkPosition.charAt( 0 ).indexOf( 's' ) ) {
				positionX = 'south';
			}

			if ( -1 !== checkPosition.charAt( 0 ).indexOf( 'e' ) ) {
				positionX = 'east';
			}

			if ( -1 !== checkPosition.charAt( 0 ).indexOf( 'w' ) ) {
				positionX = 'west';
			}

			if ( -1 !== checkPosition.charAt( 1 ).indexOf( 'n' ) ) {
				positionY = 'north';
			}

			if ( -1 !== checkPosition.charAt( 1 ).indexOf( 's' ) ) {
				positionY = 'south';
			}

			if ( -1 !== checkPosition.charAt( 1 ).indexOf( 'e' ) ) {
				positionY = 'east';
			}

			if ( -1 !== checkPosition.charAt( 1 ).indexOf( 'w' ) ) {
				positionY = 'west';
			}

			if ( 1 === checkPosition.length ) {
				slidein.addClass( 'hustle-slidein-position--' + positionX );
			} else {
				slidein.addClass( 'hustle-slidein-position--' + positionX + '-' + positionY );
			}
		}

		function animation() {
			content.addClass( 'hustle-animate-in' );
		}

		function trapFocus( elem ) {
			var element = document.getElementById( elem );
			var focusableEls = element.querySelectorAll( 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])' );
			var firstFocusableEl = focusableEls[0];
			var lastFocusableEl = focusableEls[focusableEls.length - 1];
			var KEYCODE_TAB = 9;

			element.addEventListener( 'keydown', function( e ) {
				var isTabPressed = ( 'Tab' === e.key || e.keyCode === KEYCODE_TAB );

			if ( ! isTabPressed ) {
				return;
			}

			if ( e.shiftKey ) /* shift + tab */ {
					if ( document.activeElement === firstFocusableEl ) {
						lastFocusableEl.focus();
						e.preventDefault();
					}
				} else /* tab */ {
					if ( document.activeElement === lastFocusableEl ) {
						firstFocusableEl.focus();
						e.preventDefault();
					}
				}
			});
		}

		function init() {

			reset();
			position();

			// Module time.
			setTimeout( function() {
				jQuery( window ).trigger( 'resize' );
				show();
			}, 800 );

			slideinWrapper.attr( 'tabindex', '0' );

			// Layout time.
			setTimeout( function() {
				animation();
				$( document ).trigger( 'hustle:module:displayed', slidein );
				trapFocus( slideinId );
				slideinWrapper.focus();
			}, 1000 );

			HUI.slideinClose( el, autohideDelay, focusedElementBeforeModal );
		}

		init();

		return this;
	};

}( jQuery ) );
