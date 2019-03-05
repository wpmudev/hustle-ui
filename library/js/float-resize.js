( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.floatResize = function( el ) {

		const breakpoint = 783;

		const container = $( el );
		const list = container.find( 'ul' );
		const items = list.find( 'li' );
		const parent = container.closest( '.hustle-ui' );
		const parentWidth = parent.width();

		if ( ! parent.is( '.hustle-float' ) ) {
			return;
		}

		if ( ! container.is( '.hustle-social' ) ) {
			return;
		}

		function reset() {
			list.css( 'width', '' );
		}

		function resize( screen, grid ) {

			const listWidth = list.width();
			const listHeight = list.height();

			const itemsHeight = items.find( 'a' ).outerHeight();

			const getIconsSize = parseInt( itemsHeight );
			const getIconsGrid = getIconsSize + ( grid * 2 );
			const getIconsLength = items.length;
			const getIconsTotal = getIconsGrid * getIconsLength;

			const getIconsCol = getIconsTotal / parseInt( listHeight );
			const getIconsWidth = parseInt( listWidth ) * Math.ceil( getIconsCol );

			if ( 'center' !== parent.attr( 'data-position-horizontal-' + screen ) ) {

				if ( listHeight < getIconsTotal ) {
					list.css( 'width', getIconsWidth + 'px' );
				}

			}
		}

		function init() {

			reset();

			if ( parentWidth < breakpoint ) {
				resize( 'mobiles', 5 );
			} else {
				resize( 'desktop', 10 );
			}

		}

		init();

		return this;

	};
}( jQuery ) );
