( function( $ ) {

	'use strict';

	// Define global DEMO object if it doesn't exist.
	if ( 'object' !== typeof window.DEMO ) {
		window.DEMO = {};
	}

	DEMO.openRandomOptin = function( moduleType, moduleMode ) {

		const button = $( '#show-sample-' + moduleType + '-' + moduleMode );
		const showcase = $( '#sample-' + moduleType + '-' + moduleMode );

		function getRandom( items ) {
			return items[ Math.floor( Math.random() * items.length ) ];
		}

		function popupSettings( element, moduleId ) {

			const popup = element;

			const moduleAnimationIn = [
				'no_animation',
				'bounceIn',
				'bounceInUp',
				'bounceInDown',
				'bounceInLeft',
				'bounceInRight',
				'fadeIn',
				'fadeInUp',
				'fadeInDown',
				'fadeInLeft',
				'fadeInRight',
				'fadeInUpBig',
				'fadeInDownBig',
				'fadeInLeftBig',
				'fadeInRightBig',
				'lightSpeedIn',
				'newspaperIn',
				'rollIn',
				'rotateIn',
				'rotateInUpLeft',
				'rotateInUpRight',
				'rotateInDownLeft',
				'rotateInDownRight',
				'slideInUp',
				'slideInDown',
				'slideInLeft',
				'slideInRight',
				'zoomIn',
				'zoomInUp',
				'zoomInDown',
				'zoomInLeft',
				'zoomInRight'
			];
			const moduleAnimationOut = [
				'no_animation',
				'bounceOut',
				'bounceOutUp',
				'bounceOutDown',
				'bounceOutLeft',
				'bounceOutRight',
				'fadeOut',
				'fadeOutUp',
				'fadeOutDown',
				'fadeOutLeft',
				'fadeOutRight',
				'fadeOutUpBig',
				'fadeOutDownBig',
				'fadeOutLeftBig',
				'fadeOutRightBig',
				'lightSpeedOut',
				'newspaperOut',
				'rollOut',
				'rotateOut',
				'rotateOutUpLeft',
				'rotateOutUpRight',
				'rotateOutDownLeft',
				'rotateOutDownRight',
				'slideOutUp',
				'slideOutDown',
				'slideOutLeft',
				'slideOutRight',
				'zoomOut',
				'zoomOutUp',
				'zoomOutDown',
				'zoomOutLeft',
				'zoomOutRight'
			];
			const modulePalette = [
				'gray-slate',
				'coffee',
				'ectoplasm',
				'blue',
				'sunrise',
				'midnight'
			];

			/**
			 * Assign new settings to sample module
			 */

			// Unique ID
			popup.attr( 'data-id', moduleId );
			popup.addClass( 'hustle-module-' + moduleId );

			// Intro animation
			popup.attr( 'data-intro', getRandom( moduleAnimationIn ) );

			// Exit animation
			popup.attr( 'data-outro', getRandom( moduleAnimationOut ) );

			// Module palette
			popup.attr( 'data-calendar-palette', getRandom( modulePalette ) );
			popup.addClass( 'hustle-palette--' + popup.data( 'calendar-palette' ) );

			// Module mask
			popup.find( '.hustle-popup-mask' ).addClass( 'hustle-' + moduleMode + '-mask' );

		}

		function slideinSettings( element, moduleId ) {

			const slidein = element;

			// Module settings
			const position = [
				'n',
				's',
				'e',
				'w',
				'ne',
				'nw',
				'se',
				'sw'
			];
			const modulePalette = [
				'gray-slate',
				'coffee',
				'ectoplasm',
				'blue',
				'sunrise',
				'midnight'
			];

			/**
			 * Assign new settings to sample module
			 */

			// Unique ID
			slidein.attr( 'data-id', moduleId );
			slidein.addClass( 'hustle-module-' + moduleId );

			// Position
			slidein.attr( 'data-position', getRandom( position ) );

			// Module palette
			slidein.addClass( 'hustle-palette--' + getRandom( modulePalette ) );

		}

		function closesModule( element ) {

			element.find( '.hustle-button-close' ).each( function() {

				const close = $( this );
				const popup = $( this ).closest( '.hustle-popup' );
				const module = $( this ).closest( '.hustle-ui' );
				const checkOutro = popup.data( 'outro' );

				let delay = 1000;
				let animateOut = 'no_animation';

				if ( '' !== checkOutro ) {
					animateOut = checkOutro;
				}

				if ( 'no_animation' === animateOut ) {
					delay = 0;
				}

				if ( 'fadeOut' === animateOut ) {
					delay = 305;
				}

				if ( 'newspaperOut' === animateOut ) {
					delay = 505;
				}

				if ( 'bounceOut' === animateOut ) {
					delay = 755;
				}

				if ( 'popup' === moduleType ) {
					HUI.popupClose( module );
				}

				if ( 'slidein' === moduleType ) {
					HUI.slideinClose( module );
				}

				close.on( 'click', function() {

					setTimeout( function() {
						$( '#sample-' + moduleType + '-' + moduleMode ).empty();
						$( '#show-sample-' + moduleType + '-' + moduleMode ).prop( 'disabled', false );
					}, delay );
				});

				close.closest( '.hustle-ui' ).find( '.hustle-popup-mask' ).on( 'click', function() {

					setTimeout( function() {
						$( '#sample-' + moduleType + '-' + moduleMode ).empty();
						$( '#show-sample-' + moduleType + '-' + moduleMode ).prop( 'disabled', false );
					}, delay );
				});
			});
		}

		function render( moduleId ) {

			const renderModuleType = 'templates/' + moduleType + '-container.html';
			let renderModuleMode = '';

			if ( 'optin' === moduleMode ) {
				renderModuleMode = [
					'templates/opt-in/default.html',
					'templates/opt-in/compact.html',
					'templates/opt-in/focus-optin.html',
					'templates/opt-in/focus-content.html'
				];
			}

			if ( 'info' === moduleMode ) {
				renderModuleMode = [
					'templates/informational/default.html',
					'templates/informational/compact.html',
					'templates/informational/stacked.html'
				];
			}

			showcase.load( renderModuleType, function() {

				const container = $( this ).find( '.hustle-' + moduleType );
				const content = container.find( '.hustle-' + moduleType + '-content' );

				if ( 'popup' === moduleType ) {
					popupSettings( container, moduleId );
				}

				if ( 'slidein' === moduleType ) {
					slideinSettings( container, moduleId );
				}

				content.load( getRandom( renderModuleMode ), function() {

					if ( 'optin' === moduleMode ) {

						HUI.inputFilled();
						HUI.inputRequired();
						HUI.checkboxGdpr();
						HUI.select2();
						HUI.timepicker( '.hustle-time' );
						HUI.datepicker( '.hustle-date' );

						$( this ).find( '.hustle-button-submit' ).each( function() {

							const button = $( this );

							HUI.optinSimulation( button );

						});

					}

					closesModule( $( this ) );

				});

				if ( 'popup' === moduleType ) {
					HUI.popupLoad( container, 0 );
				}

				if ( 'slidein' === moduleType ) {
					HUI.slideinLoad( container, 0 );
				}
			});

		}

		function init() {

			let moduleId = 0;

			button.on( 'click', function() {

				moduleId = Math.floor( ( Math.random() * 100 ) + 1 );

				render( moduleId );

				$( this ).prop( 'disabled', true );

			});
		}

		init();

		return this;
	};

	$( window ).on( 'load', function() {

		$( '.showcase-button-sample' ).each( function() {

			const moduleType = $( this ).data( 'module-type' );
			const moduleMode = $( this ).data( 'module-mode' );

			DEMO.openRandomOptin( moduleType, moduleMode );

		});

	});
}( jQuery ) );
