( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.timepicker = function() {

		$( '.hustle-ui' ).each( function() {

			const container = $( this );
			const moduleId = container.data( 'id' );
			const element  = container.find( '.hustle-time' );

			element.timepicker({
				timeFormat: 'h:mm p',
				interval: 30,
				minTime: '0',
				maxTime: '11:59pm',
				defaultTime: null,
				startTime: '00:00',
				dynamic: false,
				dropdown: true,
				scrollbar: true
			});
		});
	};

	HUI.timepicker();

}( jQuery ) );
