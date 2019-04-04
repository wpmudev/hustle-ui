( function( $ ) {

	'use strict';

	const HUI = {};

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.timepicker = function( el ) {

		const select = $( el );

		$( '.hustle-ui' ).each( function() {

			const container = $( this );
			const moduleId = container.data( 'id' );
			const element  = container.find( select );

			element.timepicker({
				timeFormat: ( '' !== element.data( 'time-format' ) ) ? element.data( 'time-format' ) : 'h:mm p',
				interval: ( '' !== element.data( 'time-interval' ) ) ? element.data( 'time-interval' ) : 60,
				minTime: '0',
				maxTime: '11:59pm',
				defaultTime: ( '' !== element.data( 'time-default' ) ) ? element.data( 'time-default' ) : null,
				startTime: '00:00',
				dynamic: false,
				dropdown: ( true === element.data( 'time-dropdown' ) ) ? true : false,
				scrollbar: ( true === element.data( 'time-dropdown' ) ) ? true : false
			});
		});
	};

}( jQuery ) );
