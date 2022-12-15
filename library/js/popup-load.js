( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.popupLoad = function( el, autohideDelay ) {

		const popup = $( el );
		const content = popup.find( '.hustle-popup-content' );
		const popupId = popup.attr( 'id' );
		const popupWrapper = $( '#' + popupId ).find( '.hustle-layout' );

		if ( ! popup.is( '.hustle-popup' ) ) {
			return;
		}

		popup.css( 'opacity', 1 );

		function animation() {
			content.addClass( 'hustle-animate' );
		}

		function animationIn() {

			const checkIntro = popup.data( 'intro' );
			const animateIn = checkIntro;

			let delay = 1000;

			if ( 'no_animation' === animateIn ) {
				delay = 0;
			}

			if (
				'bounceIn' === animateIn ||
				'bounceInUp' === animateIn ||
				'bounceInDown' === animateIn ||
				'bounceInLeft' === animateIn ||
				'bounceInRight' === animateIn
			) {
				delay = 755;
			}

			if ( 'fadeIn' === animateIn ) {
				delay = 305;
			}

			if ( 'newspaperIn' === animateIn ) {
				delay = 505;
			}

			content.addClass( 'hustle-animate-in--' + animateIn );

			setTimeout( function() {
				popup.addClass( 'hustle-animation-stopped' );
			}, ( delay + 50 ) );
		}

		function resizeObjectsInContent() {
			var containerWidth = popup.find( '.hustle-group-content' ).outerWidth();

			popup.find( 'iframe, object, video' ).each( function() {
				var iframe = $( this );
				var width = iframe.attr( 'width' );
				var height = iframe.attr( 'height' );
				var ratio;

				if ( typeof width !== undefined && typeof height !== undefined && 0 < width ) {
					ratio = containerWidth / width;
					iframe.css({
						'width': containerWidth,
						'height': height * ratio
					});
				}
			});

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

			var focusedElementBeforeModal = document.activeElement;

			popup.removeClass( 'hustle-show' );
			animation();

			// Module time.
			popup.addClass( 'hustle-show' );

			popupWrapper.attr( 'tabindex', '0' );

			// Layout time.
			setTimeout( function() {
				animationIn();
				$( document ).trigger( 'hustle:module:displayed', popup );
				trapFocus( popupId );
			}, 200 );

			popupWrapper.focus();

			// resize iframes, object and videos
			resizeObjectsInContent();

			HUI.popupClose( el, autohideDelay, focusedElementBeforeModal );
		}

		init();

		return this;
	};

}( jQuery ) );
