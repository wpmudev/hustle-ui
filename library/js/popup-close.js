( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.popupClose = function( el, autohideDelay ) {

		const popup = $( el ),
			close = popup.find( '.hustle-button-close' ),
			overlay = popup.find( '.hustle-popup-mask' ),
			content = popup.find( '.hustle-popup-content' ),
			neverSee = popup.find( '.hustle-nsa-link' )
			;

		let	preventAutohide = false;

		if ( ! close.length ) {
			return;
		}

		if ( ! popup.hasClass( 'hustle-popup' ) ) {
			return;
		}

		function removeIntro() {

			const checkIntro = popup.data( 'intro' );
			const animateIn = checkIntro;

			content.removeClass( 'hustle-animate-in--' + animateIn );

		}

		function animationOut() {

			const checkOutro = popup.data( 'outro' );
			const animateOut = checkOutro;

			content.addClass( 'hustle-animate-out--' + animateOut );

		}

		function escapeKeyClose( e ) {

			if ( 27 === e.keyCode ) {
				closePopup();
			}
		}

		function closePopup() {

			const checkOutro = popup.data( 'outro' );

			let delay = 1000;
			let animateOut = 'no_animation';

			if ( '' !== checkOutro ) {
				animateOut = checkOutro;
			}

			if ( 'no_animation' === animateOut ) {
				delay = 0;
			}

			if ( 'fadeOut' === animateOut ) {
				delay = 305;
			}

			if ( 'newspaperOut' === animateOut ) {
				delay = 505;
			}

			if ( 'bounceOut' === animateOut ) {
				delay = 755;
			}

			popup.removeClass( 'hustle-animation-stopped' );

			animationOut();
			removeIntro();

			setTimeout( function() {
				popup.removeClass( 'hustle-show' );
				content.removeClass( 'hustle-animate-out--' + animateOut );

				$( 'html' ).removeClass( 'hustle-no-scroll' );
			}, delay );
		}

		function init() {

			$( document ).off( 'keydown.hustle.escKey', escapeKeyClose );
			$( document ).on( 'keydown.hustle.escKey', escapeKeyClose );

			popup.on( 'click', function() {
				preventAutohide = true;
			});

			if ( 'undefined' !== typeof autohideDelay && false !== autohideDelay ) {

				setTimeout( function() {

					if ( ! preventAutohide ) {
						popup.trigger( 'hustle:module:hidden', this );
						closePopup();
					}

				}, autohideDelay );

			}

			close.on( 'click', function( e ) {

				popup.trigger( 'hustle:module:closed', this );
				closePopup();

				e.preventDefault();
				e.stopPropagation();

			});

			neverSee.on( 'click', function( e ) {
				e.preventDefault();

				popup.trigger( 'hustle:module:clicked_never_see', this );
				closePopup();
			});

			if ( 1 === popup.data( 'overlay-close' ) ) {

				overlay.on( 'click', function( e ) {

					popup.trigger( 'hustle:module:click_outside', this );
					closePopup();

					e.preventDefault();
					e.stopPropagation();

				});
			}
		}

		init();

		return this;
	};

}( jQuery ) );
