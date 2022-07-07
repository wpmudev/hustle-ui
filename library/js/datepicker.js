( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.datepicker = function( el, fullDays, shortDays, minDays, fullMonths, shortMonths ) {

		const input = $( el );

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
				changeMonth: true === element.data('change-month'),
				changeYear: true === element.data('change-year'),
				yearRange: element.data('year-range'),
				dateFormat: ( '' !== element.data( 'format' ) ) ? element.data( 'format' ) : 'yy-mm-dd',
				isRTL: ( true === element.data( 'rtl-support' ) ) ? true : false,
				showButtonPanel: false,
				beforeShow: function( input, inst ) {

					// Remove all Hustle UI related classes
					( inst.dpDiv ).removeClass( function( index, css ) {
						return ( css.match ( /\bhustle-\S+/g ) || []).join( ' ' );
					});

					// Remove all Forminator UI related classes
					( inst.dpDiv ).removeClass( function( index, css ) {
						return ( css.match ( /\bforminator-\S+/g ) || []).join( ' ' );
					});

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
