( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.slideinBoxShadow = function( el ) {

		const slidein = $( el );

		const layout = ( slidein.find( '.hustle-info--stacked' ).length ) ? slidein.find( '.hustle-layout-body' ) : slidein.find( '.hustle-layout' );
		const width  = layout.width();
		const height = layout.height();

		let shadowBox = '<div class="hustle-slidein-shadow"></div>';

		if ( ! slidein.is( '.hustle-slidein' ) ) {
			return;
		}

		if ( 'true' !== slidein.data( 'shadow' ) ) {
			return;
		}

		function init() {

			if ( layout.length ) {

				// Create box
				if ( ! slidein.find( '.hustle-slidein-shadow' ).length ) {
					slidein.append( shadowBox );
				}

				// Box CSS
				shadowBox = slidein.find( '.hustle-slidein-shadow' );
				shadowBox.css({
					'width': width + 'px',
					'height': height + 'px'
				});

				if ( slidein.find( '.hustle-info--stacked' ).length ) {

					const innerHeight = slidein.find( '.hustle-layout-header' ).height();
					const outerHeight = slidein.find( '.hustle-layout-header' ).outerHeight( true );
					const calcMargin = outerHeight - innerHeight;

					if ( 'n' === slidein.data( 'position' ) || 'ne' === slidein.data( 'position' ) || 'nw' === slidein.data( 'position' ) ) {
						shadowBox.css( 'top', outerHeight + 'px' );
					}

					if ( 'e' === slidein.data( 'position' ) || 'w' === slidein.data( 'position' ) ) {
						shadowBox.css( 'margin-top', ( outerHeight - ( innerHeight / 2 ) - ( calcMargin / 2 ) ) + 'px' );
					}
				}
			}
		}

		init();

		return this;

	};

}( jQuery ) );
