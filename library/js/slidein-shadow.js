( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.slideinBoxShadow = function( el ) {

		const slidein = $( el );

		if ( ! slidein.is( '.hustle-slidein' ) || ! slidein.data( 'has-shadow' ) ) {
			return;
		}

		const layout = ( slidein.find( '.hustle-info--stacked' ).length ) ? slidein.find( '.hustle-layout-body' ) : slidein.find( '.hustle-layout' );

		let width = layout.width(),
			height = 0;

		if ( layout.is( ':visible' ) ) {
			height = layout.height();
		} else {
			layout = slidein.find( '.success-message' );
			height = layout.outerHeight();
		}

		let shadowBox = '<div class="hustle-slidein-shadow" aria-hidden="true"></div>';

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

				syncShadow();
			}
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

			$( document ).on( 'hustle:module:submit:success', function( e ) {

				if ( $( e.target )[0] === slidein.find( '.hustle-layout-form' )[0]) {

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

		init();

		return this;

	};

}( jQuery ) );
