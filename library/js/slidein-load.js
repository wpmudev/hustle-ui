( function( $ ) {

	'use strict';

	const HUI = {};

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

			if ( checkPosition.charAt( 0 ).includes( 'n' ) ) {
				positionX = 'north';
			}

			if ( checkPosition.charAt( 0 ).includes( 's' ) ) {
				positionX = 'south';
			}

			if ( checkPosition.charAt( 0 ).includes( 'e' ) ) {
				positionX = 'east';
			}

			if ( checkPosition.charAt( 0 ).includes( 'w' ) ) {
				positionX = 'west';
			}

			if ( checkPosition.charAt( 1 ).includes( 'n' ) ) {
				positionY = 'north';
			}

			if ( checkPosition.charAt( 1 ).includes( 's' ) ) {
				positionY = 'south';
			}

			if ( checkPosition.charAt( 1 ).includes( 'e' ) ) {
				positionY = 'east';
			}

			if ( checkPosition.charAt( 1 ).includes( 'w' ) ) {
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
