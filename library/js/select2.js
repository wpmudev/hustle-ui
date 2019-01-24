( function( $ ) {

	// Enable strict mode
	'use strict';

	// Define global HUI object if it doesn't exist.
	if ( 'object' !== typeof window.HUI ) {
		window.HUI = {};
	}

	HUI.huiSelect2 = function() {

		$( '.hustle-ui' ).each( function() {

			const container = $( this );
			const moduleId = container.data( 'id' );
			const element  = container.find( '.hustle-select2' );

			let dir = 'ltr';
			let language = 'en';
			let placeholder = null;

			if ( true === element.data( 'rtl-support' ) ) {
				dir = 'rtl';
			}

			if ( '' !== element.data( 'placeholder' ) ) {
				placeholder = element.data( 'placeholder' );
			}

			if ( '' !== element.data( 'language' ) ) {
				language = element.data( 'language' );
			}

			element.HUIselect2({
				dir: dir,
				language: language,
				placeholder: placeholder,
				dropdownCssClass: 'hustle-module-' + moduleId + ' hustle-dropdown'
			});
		});
	};

	HUI.huiSelect2();

}( jQuery ) );
