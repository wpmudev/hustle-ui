( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.slideinLoad = function( el, autohideDelay ) {

		const slidein = $( el );
		const content = slidein.find( '.hustle-slidein-content' );

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

		function init() {

			reset();
			position();

			// Module time.
			setTimeout( function() {
				show();
			}, 800 );

			// Layout time.
			setTimeout( function() {
				animation();
			}, 1000 );

			HUI.slideinClose( el, autohideDelay );
		}

		init();

		return this;
	};

}( jQuery ) );
