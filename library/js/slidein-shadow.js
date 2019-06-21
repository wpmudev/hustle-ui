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

		let layout   = slidein.find( '.hustle-layout-body' );
		let nsaLink  = slidein.find( '.hustle-layout-footer' );
		let closeBtn = slidein.find( '.hustle-button-close' );

		if ( ! slidein.is( '.hustle-slidein' ) || ! slidein.data( 'has-shadow' ) ) {
			return;
		}

		if ( slidein.find( '.hustle-info--default' ).length || slidein.find( '.hustle-info--compact' ).length ) {
			layout = slidein.find( '.hustle-layout' );
		}

		if ( slidein.find( '.hustle-info--default' ).length || slidein.find( '.hustle-info--compact' ).length || slidein.find( '.hustle-info--stacked' ).length ) {
			nsaLink = slidein.find( '.hustle-nsa-link' );
		}

		let shadowBox = '<div class="hustle-slidein-shadow" aria-hidden="true"></div>';

		// Create box
		if ( ! slidein.find( '.hustle-slidein-shadow' ).length ) {
			slidein.append( shadowBox );
		}

		// Get box
		shadowBox = slidein.find( '.hustle-slidein-shadow' );

		function detectBrowser() {

			/**
			 * DO NOT REMOVE
			 * We will need this later for IE fixes.
			 */

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

		function scrollBarWidth() {

			let inner = document.createElement( 'p' );

			inner.style.width = '100%';
			inner.style.height = '200px';

			let outer = document.createElement( 'div' );

			outer.style.width = '200px';
			outer.style.height = '150px';
			outer.style.overflow = 'hidden';
			outer.style.visibility = 'hidden';
			outer.style.position = 'absolute';
			outer.style.top = '0px';
			outer.style.left = '0px';

			outer.appendChild( inner );
			document.body.appendChild( outer );

			let w1 = inner.offsetWidth;
			outer.style.overflow = 'scroll';

			let w2 = inner.offsetWidth;

			if ( w1 === w2 ) {
				w2 = outer.clientWidth;
			}

			document.body.removeChild( outer );

			return ( w1 - w2 );

		}

		function syncShadow() {

			let targetNode = layout.is( ':visible' ) ? layout[0] : slidein.find( '.hustle-success' )[0];

			const config = {
					attributes: true,
					attributeFilter: [ 'class' ],
					childList: true,
					subtree: true
				};

			let observer = new MutationObserver( () => {

				shadowBox.animate({
					'height': shadowSize( 'height' ) + 'px'
				}, 0 );
				shadowY( shadowBox );
			});

			observer.observe( targetNode, config );

			$( document ).on( 'hustle:module:submit:success', function( e ) {

				if ( $( e.target )[0] === slidein.find( '.hustle-layout-form' )[0]) {

					shadowBox.css({
						top: 'auto',
						bottom: 'auto'
					});

					observer.disconnect();

					const success = slidein.find( '.hustle-success' );

					targetNode = success[0];

					observer = new MutationObserver( function() {
						shadowBox.animate({
						'height': success.outerHeight() + 'px'
						}, 0 );
					});

					observer.observe( targetNode, config );

				}

			});

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

			let value = 0;

			if ( 'width' === size ) {
				if ( layout.is( ':visible' ) ) {
					value = layout.width() > layout.parent().width() ? layout.parent.width() : layout.width();
				} else {
					value = slidein.find( '.hustle-success' ).outerWidth();
				}
			}

			if ( 'height' === size ) {
				let layoutHeight = layout.height() > layout.parent().height() ? layout.parent.height() : layout.height();

				if ( layoutHeight > screen.height() ) {
					value = ( content.height() - 30 );
				} else {
					if ( layout.is( ':visible' ) ) {
						value = layoutHeight;
					} else {
						value = slidein.find( '.hustle-success' ).outerHeight();
					}
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

				let calculate = closeBtn.height();

				if ( infoStacked.length ) {
					calculate = slidein.find( '.hustle-layout-header' ).outerHeight( true );
				}

				offsetPos = 'top';
				offsetVal = calculate;

			}

			if ( south || southEast || southWest ) {

				let spacing = ( nsaLink.length ) ? nsaLink.outerHeight( true ) : 0;

				if ( content.hasScrollBar() ) {
					spacing = 0;
				}

				offsetPos = 'bottom';
				offsetVal = spacing;

			}

			if ( east || west ) {

				let heightFull  = screen.height();
				let heightSlide = content.height();
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

		function init() {

			// Box CSS
			shadowBox.css({
				'width': shadowSize( 'width' ) + 'px',
				'height': shadowSize( 'height' ) + 'px',
				'margin-right': ( content.hasScrollBar() && ( 0 < scrollBarWidth() ) ) ? scrollBarWidth() + 'px' : '0'
			});

			// Extras
			shadowX( shadowBox );
			shadowY( shadowBox );
			syncShadow();
		}

		init();

		return this;

	};

}( jQuery ) );
