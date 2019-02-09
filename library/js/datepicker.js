( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.datepicker = function( el ) {

		const input = $( el );

		let fullMonths = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		let shortMonths = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];

		let fullDays = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];

		let minDays = [
			'Su',
			'Mo',
			'Tu',
			'We',
			'Th',
			'Fr',
			'Sa'
		];

		let shortDays = [
			'Sun',
			'Mon',
			'Tue',
			'Wed',
			'Thu',
			'Fri',
			'Sat'
		];

		$( '.hustle-ui' ).each( function() {

			const container = $( this );
			const element  = container.find( input );

			element.datepicker({
				monthNames: fullMonths,
				monthNamesShort: shortMonths,
				dayNames: fullDays,
				dayNamesMin: minDays,
				dayNamesShort: shortDays,
				minDate: ( '' !== element.data( 'min-date' ) ) ? element.data( 'min-date' ) : null,
				changeMonth: false,
				changeYear: false,
				isRTL: ( true === element.data( 'rtl-support' ) ) ? true : false,
				showButtonPanel: false,
				beforeShow: function( input, inst ) {

					( inst.dpDiv ).addClass( 'hustle-calendar' );
					( inst.dpDiv ).addClass( 'hustle-module-' + container.data( 'id' ) );

					if ( 'undefined' !== typeof container.data( 'calendar-palette' ) ) {
						( inst.dpDiv ).addClass( 'hustle-palette--' + container.data( 'calendar-palette' ) );
					}
				}
			});
		});
	};

}( jQuery ) );
