( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.select2 = function() {

		$( '.hustle-ui' ).each( function() {

			const container = $( this );
			const moduleId = container.data( 'id' );
			const element  = container.find( '.hustle-select2' );

			element.HUIselect2({
				dir: ( true === element.data( 'rtl-support' ) ) ? 'rtl' : 'ltr',
				language: ( '' !== element.data( 'language' ) ) ? element.data( 'language' ) : 'en',
				placeholder: ( '' !== element.data( 'placeholder' ) ) ? element.data( 'placeholder' ) : null,
				dropdownCssClass: 'hustle-module-' + moduleId + ' hustle-dropdown',
				minimumResultsForSearch: Infinity
			});
		});
	};

}( jQuery ) );
