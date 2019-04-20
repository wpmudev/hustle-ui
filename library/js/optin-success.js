( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.optinSuccess = function( el ) {

		const success = $( el );
		const container = success.closest( '.hustle-ui' );
		const layout = container.find( '.hustle-layout' );
		const shadow = container.find( '.hustle-slidein-shadow' );
		const shadowH = success.innerHeight();
		const closeDelay = success.data( 'close-delay' );

		if ( ! success.is( '.hustle-success' ) ) {
			return;
		}

		function successMessage() {

			layout.slideUp( 800 );
			shadow.slideUp( 800, function() {
				$( this ).css({
					'height': shadowH + 'px'
				});
			});

			setTimeout( function() {
				success.slideDown( 500 );
				shadow.slideDown( 500 );
			}, 800 );

			if ( closeDelay || 0 === closeDelay ) {

				let closeModule = null;

				if ( container.is( '.hustle-slidein' ) ) {
					closeModule = HUI.slideinClose;
				} else if ( container.is( '.hustle-popup' ) ) {
					closeModule = HUI.popupClose;
				} else if ( container.is( '.hustle-inline' ) ) {
					closeModule = HUI.inlineClose;
				}

				setTimeout( () => closeModule( container, 0 ), closeDelay );
			}
		}

		function init() {
			successMessage();
		}

		init();

		return this;

	};

}( jQuery ) );
