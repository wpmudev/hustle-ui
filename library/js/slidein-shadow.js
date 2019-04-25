( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	$.fn.hasScrollBar = function() {
		return this.get( 0 ).scrollHeight > this.height();
	};

	HUI.slideinBoxShadow = function( el ) {

		const screen  = $( window );
		const slidein = $( el );
		const content = slidein.find( '.hustle-slidein-content' );

		let layout  = slidein.find( '.hustle-layout-body' );
		let nsaLink = slidein.find( '.hustle-layout-footer' );

		if ( slidein.find( '.hustle-info--default' ).length || slidein.find( '.hustle-info--compact' ).length ) {
			layout = slidein.find( '.hustle-layout' );
		}

		if ( slidein.find( '.hustle-info--default' ).length || slidein.find( '.hustle-info--compact' ).length || slidein.find( '.hustle-info--stacked' ).length ) {
			nsaLink = slidein.find( '.hustle-nsa-link' );
		}

		let shadowBox = '<div class="hustle-slidein-shadow" aria-hidden="true"></div>';

		if ( ! slidein.is( '.hustle-slidein' ) || ! slidein.data( 'has-shadow' ) ) {
			return;
		}

		function detectBrowser() {

			const agent = window.navigator.userAgent;
			const index = agent.indexOf( 'MSIE' );

			let $browser = 0;

			if ( 0 < index ) {

				// If IE, return version number.
				$browser = parseInt(
					agent.substring( index + 5, agent.indexOf( '.', index ) )
				);
			} else if ( !! navigator.userAgent.match( /Trident\/7\./ ) ) {

				// If IE 11 then look for Updated user agent string.
				$browser = 11;
			}

			return $browser;

		}

		function syncShadow() {

			const targetNode = layout[0],
				config = {
					attributes: true,
					attributeFilter: [ 'class' ],
					childList: true,
					subtree: true
				};

			const observer = new MutationObserver( () => {

				shadowBox.animate({
					'height': layout.height() + 'px'
				}, 0 );
			});

			observer.observe( targetNode, config );

			$( document ).on( 'hustle:module:closed', ( e ) => {

				if ( e.target === slidein[0]) {
					observer.disconnect();
				}
			});

			$( document ).on( 'hustle:module:hidden', ( e ) => {

				if ( e.target === slidein[0]) {
					observer.disconnect();
				}
			});
		}

		function shadowSize( size ) {

			let value   = 0;

			if ( 'width' === size ) {
				value = layout.width();
			}

			if ( 'height' === size ) {

				if ( layout.height() > screen.height() ) {
					value = ( content.height() - 30 );
				} else {
					value = layout.height();
				}
			}

			return value;

		}

		function shadowX( element ) {

			const shadow = $( element );

			// Position
			const position  = slidein.data( 'position' );
			const north     = ( 'n' === position );
			const south     = ( 's' === position );
			const east      = ( 'e' === position );
			const west      = ( 'w' === position );
			const northEast = ( 'ne' === position );
			const northWest = ( 'nw' === position );
			const southEast = ( 'se' === position );
			const southWest = ( 'sw' === position );

			// Offset
			let offsetPos = '';
			let offsetVal = 0;

			if ( north || south ) {
				offsetPos = 'left';
				offsetVal = ( screen.width() - shadow.width() ) / 2;
			}

			if ( west || northWest || southWest ) {
				offsetPos = 'left';
				offsetVal = 0;
			}

			if ( east || northEast || southEast ) {
				offsetPos = 'right';
				offsetVal = 0;
			}

			if ( '' === offsetPos ) {
				return;
			}

			return shadow.css( offsetPos, offsetVal + 'px' );
		}

		function shadowY( element ) {

			const shadow = $( element );

			// Layout: Opt-in
			const optinDefault = slidein.find( '.hustle-optin--default' );
			const optinCompact = slidein.find( '.hustle-optin--compact' );
			const optinFocusOp = slidein.find( '.hustle-optin--focus-optin' );
			const optinFocusCo = slidein.find( '.hustle-optin--focus-content' );

			// Layout: Informational
			const infoDefault = slidein.find( '.hustle-info--default' );
			const infoCompact = slidein.find( '.hustle-info--compact' );
			const infoStacked = slidein.find( '.hustle-info--stacked' );

			// Position
			const position  = slidein.data( 'position' );
			const north     = ( 'n' === position );
			const south     = ( 's' === position );
			const east      = ( 'e' === position );
			const west      = ( 'w' === position );
			const northEast = ( 'ne' === position );
			const northWest = ( 'nw' === position );
			const southEast = ( 'se' === position );
			const southWest = ( 'sw' === position );

			// Offset
			let offsetPos = '';
			let offsetVal = 0;

			if ( north || northEast || northWest ) {
				offsetPos = 'top';
				offsetVal = slidein.find( '.hustle-button-icon' ).height();
			}

			if ( east || west ) {

				const heightFull  = screen.height();
				const heightSlide = content.height();

				let calculate = ( ( heightFull - heightSlide ) / 2 ) + 30;

				if ( infoStacked.length ) {
					calculate = ( ( heightFull - heightSlide ) / 2 ) + slidein.find( '.hustle-layout-header' ).outerHeight( true );
				}

				offsetPos = 'top';
				offsetVal = calculate;

			}

			if ( '' === offsetPos ) {
				return;
			}

			return shadow.css( offsetPos, offsetVal + 'px' );

		}

		function stackedShadow( element ) {

			const shadow = $( element );
			const position = slidein.data( 'position' );

			const north = ( 'n' === position );
			const northEast = ( 'ne' === position );
			const northWest = ( 'nw' === position );
			const east = ( 'e' === position );
			const west = ( 'w' === position );

			if ( slidein.find( '.hustle-info--stacked' ).length ) {

				const innerHeight = slidein.find( '.hustle-layout-header' ).height();
				const outerHeight = slidein.find( '.hustle-layout-header' ).outerHeight( true );
				const calcMargin  = outerHeight - innerHeight;
				const calcHeight  = ( outerHeight - ( innerHeight / 2 ) - ( calcMargin / 2 ) );

				if ( north || northEast || northWest ) {
					shadow.css( 'top', outerHeight + 'px' );
				}

				if ( east || west ) {
					shadow.css( 'margin-top', calcHeight + 'px' );
				}
			}
		}

		function positionShadow( element ) {

			const shadow = $( element );
			const screen = $( window );
			const position = slidein.data( 'position' );
			const margins = ( 782 < screen.width() ) ? 20 : 10;

			const north = ( 'n' === position );
			const south = ( 's' === position );
			const east  = ( 'e' === position );
			const west  = ( 'w' === position );
			const northEast = ( 'ne' === position );
			const northWest = ( 'nw' === position );
			const southEast = ( 'se' === position );
			const southWest = ( 'sw' === position );

			let alignment = '';

			if ( north || south ) {
				alignment = ( screen.width() - shadow.width() ) / 2;
				shadow.css( 'left', alignment + 'px' );
			}

			const infoDefault = slidein.find( '.hustle-info--default' );
			const infoCompact = slidein.find( '.hustle-info--compact' );
			const infoStacked = slidein.find( '.hustle-info--stacked' );

			let nsaLink = slidein.find( '.hustle-layout-footer' );

			if ( infoDefault.length || infoCompact.length || infoStacked.length ) {
				nsaLink = slidein.find( '.hustle-nsa-link' );
			}

			if ( south || southEast || southWest ) {

				alignment = ( nsaLink.length ) ? nsaLink.outerHeight( true ) : 0;

				if ( slidein.find( '.hustle-slidein-content' ).height() >= ( screen.height() - margins ) ) {
					alignment = 0;
				}

				shadow.css( 'bottom', alignment + 'px' );
			}

			if ( east || west ) {

				alignment = ( nsaLink.length ) ? nsaLink.outerHeight( true ) : 0;

				shadow.css( 'margin-bottom', ( alignment / 2 ) + 'px' );
			}

			if ( 0 < detectBrowser() && slidein.find( '.hustle-slidein-content' ).hasScrollBar() ) {
				console.log( 'IE detected' );
			}

		}

		function init() {

			// Create box
			if ( ! slidein.find( '.hustle-slidein-shadow' ).length ) {
				slidein.append( shadowBox );
			}

			// Box CSS
			shadowBox = slidein.find( '.hustle-slidein-shadow' );
			shadowBox.css({
				'width': shadowSize( 'width' ) + 'px',
				'height': shadowSize( 'height' ) + 'px'
			});

			// Extras
			shadowX( shadowBox );
			shadowY( shadowBox );

			// stackedShadow( shadowBox );
			// positionShadow( shadowBox );
			syncShadow();
		}

		init();

		return this;

	};

}( jQuery ) );
