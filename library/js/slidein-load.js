( function( $ ) {

	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.slideinLoad = function( el, delay ) {

		const slidein = $( el );
		const content = slidein.find( '.hustle-slidein-content' );
		const moduleTime = delay - 200;
		const layoutTime = delay;

		if ( ! slidein.is( '.hustle-slidein' ) ) {
			return;
		}

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

			setTimeout( function() {
				show();
			}, moduleTime );

			setTimeout( function() {
				animation();
			}, layoutTime );

		}

		init();

		return this;
	};

	$( '.hustle-slidein' ).each( function() {

		const slidein = $( this );
		const delay = $( this ).data( 'delay' );

		HUI.slideinLoad( slidein, delay );

	});

}( jQuery ) );
