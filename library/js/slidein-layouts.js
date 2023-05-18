( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.slideinLayouts = function( el ) {

		const slidein = $( el );
		const wrapper = slidein.find( '.hustle-slidein-content' );
		const content = slidein.find( '.hustle-slidein-content > div' );
		const maincontent = slidein.find( '.hustle-main-wrapper' );

		let header = slidein.find( '.hustle-layout-header' );
		let footer = slidein.find( '.hustle-layout-footer' );
		let close  = slidein.find( '.hustle-button-close' );

		// Check if element exists.
		if ( ! slidein.length ) {
			return;
		}

		// Check if element is an slide-in.
		if ( ! slidein.hasClass( 'hustle-slidein' ) ) {
			return;
		}

		// Check if element module is informational.
		if ( content.hasClass( 'hustle-info' ) ) {
			footer = slidein.find( '.hustle-nsa-link' );
		}

		// Check if footer exists.
		//if ( ! footer.length ) {
		//	return;
		//}

		function headerHeight() {
			return header.outerHeight( true );
		}

		function footerHeight() {

			// Check if footer exists.
			if ( footer.length ) {
				return footer.outerHeight( true );
			}

			return 0;
		}

		function closeHeight() {
			return close.outerHeight( false );
		}

		function init() {

			if ( content.hasClass( 'hustle-info--stacked' ) ) {

				slidein.css({
					'padding-top': headerHeight() + 'px'
				});

				maincontent.css({
					'max-height': 'calc(100vh - ' + ( footerHeight() + headerHeight() ) + 'px)'
				});

				header.css({
					'top': '-' + headerHeight() + 'px'
				});
			} else {

				maincontent.css({
					'max-height': 'calc(100vh - ' + ( footerHeight() + closeHeight() ) + 'px)'
				});
			}

			slidein.css({
				'padding-bottom': footerHeight() + 'px'
			});

			footer.css({
				'bottom': '-' + footerHeight() + 'px'
			});

			// Check for all slide-ins placed on south.
			const atSouth = ( 's' === slidein.attr( 'data-position' ) );
			const atSouthWest = ( 'sw' === slidein.attr( 'data-position' ) );
			const atSouthEast = ( 'se' === slidein.attr( 'data-position' ) );

			if ( atSouth || atSouthWest || atSouthEast ) {
				wrapper.css({
					'bottom': footerHeight() + 'px'
				});
			}
		}

		init();

		return this;

	};
}( jQuery ) );
